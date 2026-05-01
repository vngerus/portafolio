import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json({ error: 'Campos requeridos' }, { status: 400 });
        }

        await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL ?? 'asmith@booksandbits.cl',
            subject: `[Portfolio] Mensaje de ${name}`,
            text: `De: ${name} <${email}>\n\n${message}`,
            replyTo: email,
        });

        return NextResponse.json({ ok: true });
    } catch {
        return NextResponse.json({ error: 'Error al enviar el mensaje' }, { status: 500 });
    }
}
