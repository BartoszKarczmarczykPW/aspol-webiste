"use server";

import { z } from "zod";
import { Resend } from "resend";
import { headers } from "next/headers";
import { NewsletterEmailTemplate } from "@/components/emails/NewsletterEmailTemplate";
import { NewsletterConfirmationTemplate } from "@/components/emails/NewsletterConfirmationTemplate";
import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "@/sanity/env";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 5;
const MIN_FORM_FILL_MS = 1500;

type RateLimitEntry = {
    count: number;
    resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const getClientIp = async () => {
    const requestHeaders = await headers();
    const forwarded = requestHeaders.get("x-forwarded-for");
    if (forwarded) {
        return forwarded.split(",")[0]?.trim() || "unknown";
    }
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

    if (entry.count >= RATE_LIMIT_MAX) {
        return true;
    }

    entry.count += 1;
    rateLimitStore.set(key, entry);
    return false;
};

const NewsletterSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export type NewsletterState = {
    success?: boolean;
    errors?: {
        email?: string[];
        _form?: string[];
    };
};

export async function subscribeToNewsletter(prevState: NewsletterState, formData: FormData): Promise<NewsletterState> {
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
                errors: {
                    _form: ["Please wait a moment before submitting."]
                }
            };
        }
    }

    const validatedFields = NewsletterSchema.safeParse({
        email: formData.get("email"),
    });

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            success: false,
        };
    }

    // validate API Key availability
    if (!process.env.RESEND_API_KEY) {
        console.error("RESEND_API_KEY is missing");
        return {
            success: false,
            errors: {
                _form: ["Server configuration error. Please contact support."]
            }
        };
    }

    if (!process.env.RESEND_FROM_EMAIL) {
        console.error("RESEND_FROM_EMAIL is missing");
        return {
            success: false,
            errors: {
                _form: ["Email sender is not configured. Please contact support."]
            }
        };
    }

    const clientIp = await getClientIp();
    const rateLimitKey = `${clientIp}:${validatedFields.data.email.toLowerCase()}`;
    if (isRateLimited(rateLimitKey)) {
        return {
            success: false,
            errors: {
                _form: ["Too many requests. Please try again in a few minutes."]
            }
        };
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { email } = validatedFields.data;

        // Send notification email to Admin
        const { error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: [process.env.ADMIN_EMAIL || 'aspolwebsitehosting@gmail.com'],
            subject: `New Newsletter Subscriber: ${email}`,
            react: <NewsletterEmailTemplate email={email} />,
        });

        if (error) {
            console.error("Resend API Error:", error);
            return {
                success: false,
                errors: {
                    _form: [error.message]
                }
            };
        }

        try {
            await resend.emails.send({
                from: process.env.RESEND_FROM_EMAIL,
                to: [email],
                subject: "You’re subscribed to ASPOL updates",
                react: <NewsletterConfirmationTemplate />,
            });
        } catch (confirmError) {
            console.error("Resend Confirmation Error:", confirmError);
        }

        if (process.env.SANITY_WRITE_TOKEN) {
            try {
                const writeClient = createClient({
                    projectId,
                    dataset,
                    apiVersion,
                    token: process.env.SANITY_WRITE_TOKEN,
                    useCdn: false,
                });

                await writeClient.create({
                    _type: "newsletterSignup",
                    email,
                    createdAt: new Date().toISOString(),
                });
            } catch (sanityError) {
                console.error("Sanity Log Error:", sanityError);
            }
        }

        return {
            success: true,
            errors: {},
        };
    } catch (error) {
        console.error("Resend Unexpected Error:", error);
        return {
            success: false,
            errors: {
                _form: [`An unexpected error occurred: ${error instanceof Error ? error.message : String(error)}`]
            }
        };
    }
}
