"use server";

import { z } from "zod";
import { Resend } from "resend";
import { ContactEmailTemplate } from "@/components/emails/ContactEmailTemplate";

const resend = new Resend(process.env.RESEND_API_KEY);

const ContactSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    message: z.string().min(10, "Message must be at least 10 characters").max(1000, "Message too long"),
});

export type ContactState = {
    success?: boolean;
    errors?: {
        name?: string[];
        email?: string[];
        message?: string[];
        _form?: string[];
    };
};

export async function sendContactEmail(prevState: ContactState, formData: FormData): Promise<ContactState> {
    const validatedFields = ContactSchema.safeParse({
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
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
        const { name, email, message } = validatedFields.data;

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: 'ASPOL Website <onboarding@resend.dev>', // Use onboarding domain for testing
            to: [process.env.ADMIN_EMAIL || 'bartosz.karczmarczyk@sciencespo.fr'], // Deliver to admin
            replyTo: email, // Allow replying directly to the sender
            subject: `New Contact Form Submission from ${name}`,
            react: <ContactEmailTemplate name={name} email={email} message={message} />,
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
