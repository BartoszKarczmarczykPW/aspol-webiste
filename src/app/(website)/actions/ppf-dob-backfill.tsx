"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { backfillPPFDateOfBirthForAcceptedRegistration } from "@/lib/google-sheets";
import type { PPFDobBackfillState } from "@/types/ppf";
import countriesData from "world-countries";

const MIN_FORM_FILL_MS = 1200;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 8;

type RateLimitEntry = { count: number; resetAt: number };
const rateLimitStore = new Map<string, RateLimitEntry>();

function normalizeCountryName(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

const ALLOWED_COUNTRY_NAMES = new Set<string>(
  countriesData.flatMap((country) => {
    const names = [country.name?.common, country.name?.official];

    if (country.translations && typeof country.translations === "object") {
      for (const translation of Object.values(country.translations)) {
        if (translation && typeof translation === "object") {
          names.push(translation.common, translation.official);
        }
      }
    }

    return names
      .filter((name): name is string => typeof name === "string" && name.trim().length > 0)
      .map(normalizeCountryName);
  })
);

const DobBackfillSchema = z.object({
  ticketId: z.string().trim().min(5, "Podaj poprawny numer biletu"),
  firstName: z.string().trim().min(2, "Podaj imię"),
  lastName: z.string().trim().min(2, "Podaj nazwisko"),
  email: z.string().trim().email("Podaj poprawny adres email"),
  dateOfBirth: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Podaj poprawną datę urodzenia"),
  countryOfBirth: z
    .string()
    .trim()
    .min(2, "Podaj kraj urodzenia")
    .refine((value) => ALLOWED_COUNTRY_NAMES.has(normalizeCountryName(value)), "Wybierz kraj z listy"),
  dataProcessingConsent: z.literal("on", {
    error: "Aby kontynuować, zaakceptuj zgodę na przetwarzanie danych.",
  }),
});

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

export async function backfillPPFDateOfBirth(
  _prevState: PPFDobBackfillState,
  formData: FormData
): Promise<PPFDobBackfillState> {
  const honeypot = String(formData.get("company") || "").trim();
  if (honeypot) {
    return { success: true, errors: {} };
  }

  const formStartRaw = Number(formData.get("formStart") || 0);
  if (Number.isFinite(formStartRaw) && formStartRaw > 0) {
    const elapsed = Date.now() - formStartRaw;
    if (elapsed < MIN_FORM_FILL_MS) {
      return {
        success: false,
        errors: { _form: ["Spróbuj ponownie za chwilę."] },
      };
    }
  }

  const validated = DobBackfillSchema.safeParse({
    ticketId: formData.get("ticketId"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    dateOfBirth: formData.get("dateOfBirth"),
    countryOfBirth: formData.get("countryOfBirth"),
    dataProcessingConsent: formData.get("dataProcessingConsent"),
  });

  if (!validated.success) {
    return {
      success: false,
      errors: validated.error.flatten().fieldErrors,
    };
  }

  const clientIp = await getClientIp();
  const rateLimitKey = `ppf-dob:${clientIp}:${validated.data.ticketId.toLowerCase()}`;
  if (isRateLimited(rateLimitKey)) {
    return {
      success: false,
      errors: { _form: ["Zbyt wiele prób. Spróbuj ponownie za kilka minut."] },
    };
  }

  try {
    const result = await backfillPPFDateOfBirthForAcceptedRegistration(validated.data);

    if (!result.ok) {
      return {
        success: false,
        errors: {
          _form: [
            "Nie udało się zweryfikować danych. Sprawdź numer biletu i dane wpisane w rejestracji.",
          ],
        },
      };
    }

    return {
      success: true,
      errors: {},
    };
  } catch (error) {
    console.error("PPF DOB backfill error:", error);
    return {
      success: false,
      errors: { _form: ["Wystąpił błąd. Spróbuj ponownie później."] },
    };
  }
}
