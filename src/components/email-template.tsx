import * as React from 'react';

interface EmailTemplateProps {
    name: string;
    email: string;
    message: string;
}

export const EmailTemplate: React.FC<EmailTemplateProps> = ({ name, email, message }) => (
    <div style={{ fontFamily: 'Arial, sans-serif', lineHeight: '1.6' }}>
        <h1>Nuevo mensaje de contacto</h1>
        <p><strong>Nombre:</strong> {name}</p>
        <p><strong>Correo Electrónico:</strong> {email}</p>
        <p><strong>Mensaje:</strong></p>
        <p>{message}</p>
    </div>
);
