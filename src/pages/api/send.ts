import { EmailTemplate } from '@/components/email-template';
import { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY || '');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        try {
            const { name, email, message } = req.body;

            if (!name || !email || !message) {
                return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
            }

            const response = await resend.emails.send({
                from: 'Contacto Portafolio <onboarding@resend.dev>',
                to: ['angelsmithlgs@gmail.com'],
                subject: `Nuevo mensaje de contacto de ${name}`,
                react: EmailTemplate({ name, email, message }),
            });

            return res.status(200).json(response);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
            return res.status(500).json({ error: 'Error interno del servidor.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ error: `Método ${req.method} no permitido.` });
    }
}
