"use server";

import { z } from "zod";
import { Resend } from "resend";
import { ContactEmailTemplate } from "@/components/emails/ContactEmailTemplate";
import { ContactConfirmationTemplate } from "@/components/emails/ContactConfirmationTemplate";
import { createClient } from "@sanity/client";
import { apiVersion, dataset, projectId } from "@/sanity/env";

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

    if (!process.env.RESEND_FROM_EMAIL) {
        console.error("RESEND_FROM_EMAIL is missing");
        return {
            success: false,
            errors: {
                _form: ["Email sender is not configured. Please contact support."]
            }
        };
    }

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const { name, email, message } = validatedFields.data;

        // Send email using Resend
        const { data, error } = await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL,
            to: [process.env.ADMIN_EMAIL || 'aspolwebsitehosting@gmail.com'], // Deliver to admin
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

        try {
            await resend.emails.send({
                from: process.env.RESEND_FROM_EMAIL,
                to: [email],
                subject: "Thanks for contacting ASPOL",
                react: <ContactConfirmationTemplate name={name} />,
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
                    _type: "contactMessage",
                    name,
                    email,
                    message,
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
