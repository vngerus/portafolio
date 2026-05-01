'use client';

import React, { useRef, useState } from 'react';
import { toast, Toaster } from 'sonner';
import { useGsapReveal } from '@/hooks/useGsapReveal';

interface FormState {
    name: string;
    email: string;
    message: string;
}

const INITIAL_FORM: FormState = { name: '', email: '', message: '' };

const Contact: React.FC = () => {
    const [form, setForm] = useState<FormState>(INITIAL_FORM);
    const [loading, setLoading] = useState(false);
    const sectionRef = useGsapReveal<HTMLElement>({ y: 40, start: 'top 80%' });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.email || !form.message) {
            toast.error('Por favor completa todos los campos.');
            return;
        }

        setLoading(true);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (res.ok) {
                toast.success('¡Mensaje enviado! Te responderé pronto.');
                setForm(INITIAL_FORM);
            } else {
                toast.error('Ocurrió un error. Inténtalo nuevamente.');
            }
        } catch {
            toast.error('Error de conexión. Inténtalo más tarde.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Toaster position="bottom-right" theme="dark" />
            <section
                id="contact"
                ref={sectionRef}
                className="flex flex-col items-center mx-auto max-w-[1000px] px-4 py-12 mt-12"
            >
                <div className="flex items-center w-full mb-8">
                    <span className="text-textPrimary font-mono text-lg mr-4">04.</span>
                    <h2 className="text-3xl font-bold text-white whitespace-nowrap">Contacto</h2>
                    <div className="flex-1 h-px bg-gray-700 ml-4" />
                </div>

                <div className="w-full max-w-2xl mx-auto">
                    <p className="text-gray-400 text-center mb-10 leading-relaxed">
                        ¿Tienes un proyecto en mente o simplemente quieres saludar?{' '}
                        <span className="text-textPrimary">Escríbeme</span>, estaré encantado de
                        responder.
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="name"
                                    className="font-mono text-sm text-textPrimary"
                                >
                                    Nombre
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="Angel Smith"
                                    className="bg-background-secondary border border-textSecondary rounded px-4 py-3 text-gray-200 text-sm placeholder-gray-600 focus:outline-none focus:border-textPrimary transition-colors"
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="email"
                                    className="font-mono text-sm text-textPrimary"
                                >
                                    Email
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="angel@ejemplo.com"
                                    className="bg-background-secondary border border-textSecondary rounded px-4 py-3 text-gray-200 text-sm placeholder-gray-600 focus:outline-none focus:border-textPrimary transition-colors"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <label
                                htmlFor="message"
                                className="font-mono text-sm text-textPrimary"
                            >
                                Mensaje
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                rows={6}
                                placeholder="Hola Angel, me gustaría hablar sobre..."
                                className="bg-background-secondary border border-textSecondary rounded px-4 py-3 text-gray-200 text-sm placeholder-gray-600 focus:outline-none focus:border-textPrimary transition-colors resize-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="self-start px-8 py-3 border border-textPrimary text-textPrimary font-mono text-sm rounded hover:bg-textPrimary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Enviando...' : 'Enviar mensaje'}
                        </button>
                    </form>
                </div>
            </section>
        </>
    );
};

export default Contact;
