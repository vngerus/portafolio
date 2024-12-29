import React from 'react';
import { FaSteam, FaDiscord } from 'react-icons/fa';

const About: React.FC = () => {
    return (
        <section id="about" className="flex flex-col items-center mx-auto max-w-[1000px] px-4 py-12 min-h-screen mt-12">
            <div className="flex items-center w-full mb-8">
                <span className="text-primary font-mono text-lg mr-4">03.</span>
                <h2 className="text-3xl font-bold text-white whitespace-nowrap">Sobre mí</h2>
                <div className="flex-1 h-[1px] bg-gray-700 ml-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%] mx-auto">
                <div className="border border-accent p-6 rounded-lg bg-background-secondary flex flex-col justify-between">
                    <h3 className="text-xl font-bold text-accent mb-4">💻 Carrera</h3>
                    <p className="text-light leading-relaxed">
                        Actualmente soy <span className="text-accent font-medium">Desarrollador Front-End</span>, aunque también disfruto trabajar en el{' '}
                        <span className="text-accent font-medium">Back-End</span>. Tengo <span className="text-accent font-medium">1 año de experiencia</span> en el desarrollo de software, y cuento con{' '}
                        <span className="text-accent font-medium">3 años como Ingeniero en Marketing</span>.
                    </p>
                    <p className="mt-4 text-light leading-relaxed">
                        Trabajé en una <span className="text-accent font-medium">StartUp</span>, donde participé en múltiples proyectos que me permitieron
                        adquirir <span className="text-accent font-medium">habilidades versátiles</span> y experiencia práctica en el desarrollo de aplicaciones.
                    </p>
                    <p className="mt-4 text-light leading-relaxed">
                        Actualmente, estoy estudiando <span className="text-accent font-medium">Flutter</span> en Desafío Latam gracias a una{' '}
                        <span className="text-accent font-medium">beca otorgada por Globant</span>, con el objetivo de seguir creciendo profesionalmente.
                    </p>
                </div>

                <div className="border border-accent p-6 rounded-lg bg-background-secondary flex flex-col justify-between h-full">
                    <h3 className="text-xl font-bold text-accent mb-4">👋 Mi lado personal</h3>
                    <p className="text-light leading-relaxed">
                        Me llamo <span className="text-accent font-medium">Angel Smith</span>, tengo una gata que se llama{' '}
                        <span className="text-accent font-medium">Luna</span>, me gusta el{' '}
                        <span className="text-accent font-medium">café</span>, de hecho fui{' '}
                        <span className="text-accent font-medium">barista</span> en una cafetería de especialidad durante casi 4 años.
                        Suelo ir al <span className="text-accent font-medium">gym</span> por las mañanas, me volví fan de la{' '}
                        <span className="text-accent font-medium">comida kpop</span> y me gusta hacer cursitos para seguir fomentando mi{' '}
                        <span className="text-accent font-medium">aprendizaje</span>, ya que me gusta mantenerme bien{' '}
                        <span className="text-accent font-medium">actualizado</span>.
                    </p>
                    <p className="mt-4 text-light leading-relaxed">
                        A veces juego jueguitos, si quieres jugar, siéntete libre de añadirme. 😊
                    </p>
                    <div className="flex items-center gap-4 mt-4 text-accent">
                        <FaSteam size={24} />
                        <FaDiscord size={24} />
                    </div>
                </div>

                <div className="border border-accent p-6 rounded-lg bg-background-secondary md:col-span-2 flex flex-col">
                    <h3 className="text-xl font-bold text-accent mb-4">🛠 Tecnologías con las que trabajo</h3>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-accent font-mono text-sm">
                        {[
                            'JavaScript (ES6+)',
                            'TypeScript',
                            'React',
                            'Next.js',
                            'Tailwind CSS',
                            'Flutter',
                            'Spring Boot',
                            'Firebase',
                            'Figma',
                        ].map((tech) => (
                            <li key={tech} className="text-light">
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
