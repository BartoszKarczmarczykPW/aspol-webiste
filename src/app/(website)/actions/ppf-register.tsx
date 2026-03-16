"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { Resend } from "resend";
import { nanoid } from "nanoid";
import { PPFAdminNotificationTemplate } from "@/components/emails/PPFAdminNotificationTemplate";
import {
  addPPFRegistration,
  getPPFRegistrationCounts,
  isPPFEmailRegistered,
} from "@/lib/google-sheets";
import type { PPFRegistration, PPFRegistrationState, TicketType } from "@/types/ppf";

// --- Configuration ---
const MAX_FRIDAY = 70;
const MAX_SATURDAY = 300;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5; // 5 attempts per window
const MIN_FORM_FILL_MS = 2000; // 2 seconds minimum

// --- Rate limiting (in-memory) ---
type RateLimitEntry = { count: number; resetAt: number };
const rateLimitStore = new Map<string, RateLimitEntry>();

const getClientIp = async () => {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return (
    requestHeaders.get("x-real-ip") ||
    requestHeaders.get("cf-connecting-ip") ||
    requestHeaders.get("true-client-ip") ||
    "unknown"
  );
};

const isRateLimited = (key: string) => {
  const now = Date.now();
  const entry = rateLimitStore.get(key);
  if (!entry || now > entry.resetAt) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) return true;
  entry.count += 1;
  rateLimitStore.set(key, entry);
  return false;
};

// --- Validation schema ---
const PPFSchema = z.object({
  firstName: z.string().min(2, "Minimum 2 characters"),
  lastName: z.string().min(2, "Minimum 2 characters"),
  email: z.string().email("Invalid email address"),
  ticketType: z.enum(["saturday-only", "both-days"], {
    error: "Please select a ticket type",
  }),
  phone: z.string().optional(),
  university: z.string().optional(),
  fieldOfStudy: z.string().optional(),
  howDidYouHear: z.string().optional(),
  citizenship: z.string().min(1, "Please select your citizenship"),
  professionalStatus: z.string().min(1, "Please select your professional status"),
  returnPlans: z.string().min(1, "Please answer this question"),
  gdprConsent: z.literal("accept", {
    error: "You must accept the GDPR consent to register",
  }),
  attendanceConfirmed: z.literal("on", {
    error: "You must confirm attendance to register",
  }),
});

// --- Server action ---
export async function registerForPPF(
  prevState: PPFRegistrationState,
  formData: FormData
): Promise<PPFRegistrationState> {
  // Anti-spam: honeypot
  const honeypot = String(formData.get("company") || "").trim();
  if (honeypot) {
    return { success: true, errors: {} };
  }

  // Anti-spam: timing
  const formStartRaw = Number(formData.get("formStart") || 0);
  if (Number.isFinite(formStartRaw) && formStartRaw > 0) {
    const elapsed = Date.now() - formStartRaw;
    if (elapsed < MIN_FORM_FILL_MS) {
      return {
        success: false,
        errors: { _form: ["Please wait a moment before submitting."] },
      };
    }
  }

  // Validate fields
  const validatedFields = PPFSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    ticketType: formData.get("ticketType"),
    phone: formData.get("phone") || undefined,
    university: formData.get("university") || undefined,
    fieldOfStudy: formData.get("fieldOfStudy") || undefined,
    howDidYouHear: formData.get("howDidYouHear") || undefined,
    citizenship: formData.get("citizenship"),
    professionalStatus: formData.get("professionalStatus"),
    returnPlans: formData.get("returnPlans"),
    gdprConsent: formData.get("gdprConsent"),
    attendanceConfirmed: formData.get("attendanceConfirmed"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Check if registration is open
  if (process.env.PPF_REGISTRATION_OPEN === "false") {
    return {
      success: false,
      errors: { _form: ["Registration is currently closed."] },
    };
  }

  // Rate limit by IP + email
  const clientIp = await getClientIp();
  const rateLimitKey = `ppf:${clientIp}:${validatedFields.data.email.toLowerCase()}`;
  if (isRateLimited(rateLimitKey)) {
    return {
      success: false,
      errors: { _form: ["Too many requests. Please try again in a few minutes."] },
    };
  }

  const {
    firstName, lastName, email, ticketType,
    phone, university, fieldOfStudy, howDidYouHear,
    citizenship, professionalStatus, returnPlans,
  } = validatedFields.data;

  try {
    // Check spot availability
    const counts = await getPPFRegistrationCounts();
    const fridaySpotsLeft = MAX_FRIDAY - counts.totalFriday;
    const saturdaySpotsLeft = MAX_SATURDAY - counts.totalSaturday;

    if (saturdaySpotsLeft <= 0) {
      return {
        success: false,
        errors: { _form: ["Sorry, all Saturday spots are taken. / Sobota — brak wolnych miejsc."] },
      };
    }

    if (ticketType === "both-days" && fridaySpotsLeft <= 0) {
      return {
        success: false,
        errors: {
          _form: [
            "Sorry, all Friday spots are taken. You can still register for Saturday only. / Piątek — brak wolnych miejsc. Możesz zapisać się na samą sobotę.",
          ],
        },
      };
    }

    const alreadyRegistered = await isPPFEmailRegistered(email);
    if (alreadyRegistered) {
      return {
        success: false,
        errors: { _form: ["This email is already registered. / Ten email jest już zarejestrowany."] },
      };
    }

    const ticketId = `PPF26-${nanoid(8).toUpperCase()}`;

    const registration: PPFRegistration = {
      firstName,
      lastName,
      email,
      ticketType: ticketType as TicketType,
      phone,
      university,
      fieldOfStudy,
      howDidYouHear,
      citizenship,
      professionalStatus,
      returnPlans,
      gdprConsent: true,
      attendanceConfirmed: true,
      acceptTerms: true,
      registrationDate: new Date().toISOString(),
      ticketId,
    };

    // Write to Google Sheets — "Status wysyłki" is set to "Oczekuje"
    // Ticket email will be sent by organizers via the sheet trigger
    await addPPFRegistration(registration);

    // Notify admins of the new registration
    try {
      if (process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL) {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const newSaturdaySpots = saturdaySpotsLeft - 1;
        const newFridaySpots = ticketType === "both-days" ? fridaySpotsLeft - 1 : fridaySpotsLeft;

        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL,
          to: [process.env.ADMIN_EMAIL || "aspolwebsitehosting@gmail.com"],
          subject: `🎟️ PPF 2026: ${firstName} ${lastName} (${ticketType}) — ${newFridaySpots} piątek / ${newSaturdaySpots} sobota left`,
          react: (
            <PPFAdminNotificationTemplate
              firstName={firstName}
              lastName={lastName}
              email={email}
              ticketId={ticketId}
              ticketType={ticketType as TicketType}
              phone={phone}
              university={university}
              fieldOfStudy={fieldOfStudy}
              howDidYouHear={howDidYouHear}
              fridaySpots={newFridaySpots}
              saturdaySpots={newSaturdaySpots}
            />
          ),
        });
      } else {
        console.warn("Skipping PPF admin notification: missing RESEND_API_KEY or RESEND_FROM_EMAIL");
      }
    } catch (adminEmailError) {
      console.error("PPF admin notification error:", adminEmailError);
    }

    return { success: true, ticketId, errors: {} };
  } catch (error) {
    console.error("PPF registration error:", error);
    return {
      success: false,
      errors: {
        _form: [
          "An unexpected error occurred. Please try again. / Wystąpił błąd, spróbuj ponownie.",
        ],
      },
    };
  }
}
