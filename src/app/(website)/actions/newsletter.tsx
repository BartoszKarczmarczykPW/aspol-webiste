"use server";

import { z } from "zod";
import { Resend } from "resend";
import { NewsletterEmailTemplate } from "@/components/emails/NewsletterEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

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

    try {
        const { email } = validatedFields.data;

        // Send notification email to Admin
        const { data, error } = await resend.emails.send({
            from: 'ASPOL Newsletter <onboarding@resend.dev>',
            to: [process.env.ADMIN_EMAIL || 'ketrabczyk@gmail.com'],
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

        // TODO: In a real app, you would also add the email to a database (e.g. Supabase, MongoDB)
        // or a marketing platform (e.g. Mailchimp, Resend Audiences).
        // For now, we just notify the admin.

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
