"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            const response = await fetch("/api/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setStatus("success");
                setFormData({ name: "", email: "", message: "" });
            } else {
                setStatus("error");
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            setStatus("error");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-lg mx-auto p-6 bg-[#0A0825] border shadow-md rounded-lg space-y-6 mt-24"
        >
            <h2 className="text-2xl font-bold text-white text-center">Contáctame</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white">
                        Nombre
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-white">
                        Mensaje
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={4}
                        className="mt-1 block w-full text-black border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    ></textarea>
                </div>
                <div>
                    <button
                        type="submit"
                        disabled={status === "sending"}
                        className={`w-full py-2 px-4 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none ${status === "sending" ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        {status === "sending" ? "Enviando..." : "Enviar"}
                    </button>
                </div>
            </form>
            {status === "success" && (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                    <strong>¡Éxito!</strong> Tu mensaje ha sido enviado.
                </div>
            )}
            {status === "error" && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    <strong>Error:</strong> No se pudo enviar el mensaje. Intenta nuevamente.
                </div>
            )}
        </motion.div>
    );
};

export default ContactForm;
