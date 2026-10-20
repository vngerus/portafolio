import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

const MAX = { name: 80, email: 120, message: 3000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// ponytail: in-memory limiter, per server instance. Move to Upstash/Vercel KV if spam shows up.
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60_000;
const MAX_HITS = 3;
const limited = (ip: string) => {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(t => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_HITS;
};

// User-facing error messages, in the language the form sent.
const MSG = {
  es: {
    invalid: 'Solicitud inválida',
    missing: 'Completa nombre, email y mensaje.',
    tooLong: 'El mensaje es demasiado largo.',
    email: 'El email no parece válido.',
    limited: 'Demasiados intentos. Prueba de nuevo en unos minutos.',
    human: 'No pudimos verificar que eres humano. Recarga e inténtalo de nuevo.',
    off: 'El formulario no está disponible por ahora. Escríbeme por LinkedIn o correo.',
    send: 'No se pudo enviar el mensaje. Inténtalo nuevamente.',
  },
  en: {
    invalid: 'Invalid request',
    missing: 'Please fill in name, email and message.',
    tooLong: 'The message is too long.',
    email: "That email doesn't look valid.",
    limited: 'Too many attempts. Try again in a few minutes.',
    human: "We couldn't verify you are human. Reload and try again.",
    off: "The form isn't available right now. Reach me on LinkedIn or by email.",
    send: "The message couldn't be sent. Please try again.",
  },
} as const;

const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

// Cloudflare Turnstile: validates the token the browser got from the widget.
// ponytail: skipped when TURNSTILE_SECRET_KEY is unset so local dev works without keys; set it in production.
async function humanOk(token: unknown, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== 'string' || !token) return false;
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    return ((await res.json()) as { success?: boolean }).success === true;
  } catch {
    return false;
  }
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return fail(MSG.es.invalid, 400);
  }
  const m = MSG[body.lang === 'en' ? 'en' : 'es'];

  // honeypot: real people never fill this hidden field; pretend success to bots
  if (typeof body.website === 'string' && body.website) return NextResponse.json({ ok: true });

  const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');
  const name = str(body.name).replace(/[\r\n]+/g, ' '); // no line breaks: it goes into the subject
  const email = str(body.email);
  const message = str(body.message);

  if (!name || !email || !message) return fail(m.missing, 400);
  if (name.length > MAX.name || email.length > MAX.email || message.length > MAX.message) {
    return fail(m.tooLong, 400);
  }
  if (!EMAIL_RE.test(email)) return fail(m.email, 400);

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0].trim() ?? 'unknown';
  if (limited(ip)) return fail(m.limited, 429);

  if (!(await humanOk(body.turnstileToken, ip))) {
    return fail(m.human, 400);
  }

  const to = process.env.CONTACT_EMAIL;
  const key = process.env.RESEND_API_KEY;
  if (!to || !key) {
    console.error('[contact] Falta CONTACT_EMAIL o RESEND_API_KEY');
    return fail(m.off, 503);
  }

  try {
    const { error } = await new Resend(key).emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to,
      subject: `[Portfolio] Mensaje de ${name}`,
      text: `De: ${name} <${email}>\n\n${message}`,
      replyTo: email,
    });
    if (error) {
      console.error('[contact] Resend:', error);
      return fail(m.send, 502);
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error('[contact]', e);
    return fail(m.send, 500);
  }
}
