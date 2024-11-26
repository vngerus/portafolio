import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return new Response(
                JSON.stringify({ error: 'Todos los campos son obligatorios.' }),
                { status: 400 }
            );
        }

        const { data, error } = await resend.emails.send({
            from: 'Contacto Portafolio <onboarding@resend.dev>',
            to: ['angelsmithlgs@gmail.com'],
            subject: `Nuevo mensaje de contacto de ${name}`,
            react: EmailTemplate({ name, email, message }),
        });

        if (error) {
            return new Response(JSON.stringify({ error }), { status: 500 });
        }

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        console.error('Error al enviar el correo:', error);
        return new Response(JSON.stringify({ error: 'Error interno del servidor.' }), { status: 500 });
    }
}
