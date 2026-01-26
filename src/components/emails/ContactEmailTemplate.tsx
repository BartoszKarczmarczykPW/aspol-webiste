import * as React from 'react';

interface ContactEmailTemplateProps {
    name: string;
    email: string;
    message: string;
}

export const ContactEmailTemplate: React.FC<Readonly<ContactEmailTemplateProps>> = ({
    name,
    email,
    message,
}) => (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#333' }}>
        <h1 style={{ color: '#d32f2f' }}>New Message from ASPOL Website</h1>
        <p>You have received a new contact form submission:</p>
        <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />
        <div style={{ marginBottom: '20px' }}>
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Message:</strong></p>
            <blockquote style={{ background: '#f9f9f9', padding: '15px', borderLeft: '4px solid #d32f2f', margin: '0' }}>
                {message}
            </blockquote>
        </div>
        <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />
        <p style={{ fontSize: '12px', color: '#666' }}>
            This email was sent from the ASPOL website contact form.
        </p>
    </div>
);
