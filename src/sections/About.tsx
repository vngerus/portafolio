import React from 'react';
import { FaDog, FaPizzaSlice, FaGamepad } from 'react-icons/fa';

const About: React.FC = () => {
    return (
        <section id="about" className="flex flex-col items-center mx-auto max-w-[1000px] px-4 py-12 min-h-screen mt-12">
            <div className="flex items-center w-full mb-8">
                <span className="text-primary font-mono text-lg mr-4">03.</span>
                <h2 className="text-3xl font-bold text-white whitespace-nowrap">Sobre mí</h2>
                <div className="flex-1 h-[1px] bg-gray-700 ml-4"></div>
            </div>

            {/* Grid general */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                {/* Bloque profesional */}
                <div className="border border-primary p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-primary mb-4">💻 En el trabajo</h3>
                    <p className="text-gray-300 leading-relaxed">
                        Con experiencia como desarrollador front-end y un background en marketing, me enfoco en
                        crear interfaces de usuario accesibles y de alto rendimiento. Actualmente trabajo en CIB,
                        donde he participado en proyectos como{' '}
                        <a href="https://cibai.app" target="_blank" className="text-primary hover:underline">
                            CIB AI
                        </a>{' '}
                        y{' '}
                        <a href="https://iny.app" target="_blank" className="text-primary hover:underline">
                            INY App
                        </a>, utilizando tecnologías como <span className="text-primary font-medium">React</span> y{' '}
                        <span className="text-primary font-medium">Tailwind CSS</span>.
                    </p>
                </div>

                {/* Bloque personal */}
                <div className="border border-primary p-6 rounded-lg">
                    <h3 className="text-xl font-bold text-primary mb-4">👋 Mi lado personal</h3>
                    <p className="text-gray-300 leading-relaxed">
                        Tres palabras que me definen son <span className="text-primary font-medium">curioso</span>,{' '}
                        <span className="text-primary font-medium">optimista</span> e{' '}
                        <span className="text-primary font-medium">independiente</span>. Me encanta aprender cosas
                        nuevas, resolver problemas y explorar cómo funcionan las cosas.
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-primary">
                        <FaPizzaSlice size={24} />
                        <FaDog size={24} />
                        <FaGamepad size={24} />
                    </div>
                </div>

                {/* Bloque de tecnologías */}
                <div className="border border-primary p-6 rounded-lg md:col-span-2">
                    <h3 className="text-xl font-bold text-primary mb-4">🛠 Tecnologías con las que trabajo</h3>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-primary font-mono text-sm">
                        {[
                            'JavaScript (ES6+)',
                            'TypeScript',
                            'React',
                            'Node.js',
                            'Tailwind CSS',
                            'FastAPI',
                            'Spring Boot',
                            'SQL',
                            'Figma',
                        ].map((tech) => (
                            <li key={tech} className="text-gray-300">
                                {tech}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default About;
