import * as React from 'react';

interface NewsletterEmailTemplateProps {
    email: string;
}

export const NewsletterEmailTemplate: React.FC<Readonly<NewsletterEmailTemplateProps>> = ({
    email,
}) => (
    <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#333' }}>
        <h1 style={{ color: '#143D73' }}>New Newsletter Subscriber! 🚀</h1>
        <p>Someone just subscribed to the ASPOL newsletter.</p>
        <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />
        <div style={{ padding: '20px', background: '#f0f4f8', borderRadius: '8px' }}>
            <p style={{ margin: 0 }}><strong>Subscriber Email:</strong></p>
            <p style={{ fontSize: '18px', margin: '5px 0', color: '#143D73', fontWeight: 'bold' }}>{email}</p>
        </div>
        <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />
        <p style={{ fontSize: '12px', color: '#666' }}>
            Add this email to your mailing list.
        </p>
    </div>
);
