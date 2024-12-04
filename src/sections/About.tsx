import React from 'react';

const About: React.FC = () => {
    return (
        <section className="max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="p-6 bg-[#0A0825] text-white rounded-lg shadow-md border border-gray-600">
                <h1 className="text-2xl font-bold mb-4">Sobre mí</h1>
                <p className="text-sm leading-relaxed">
                    Después de tres años como Ingeniero en Marketing, decidí cambiar de rumbo y adentrarme en el mundo de la programación. Combiné aprendizaje autodidacta con un bootcamp Full Stack especializado en Java, donde desarrollé habilidades tanto en front-end como en back-end.
                </p>
            </div>

            <div className="p-6 bg-[#0A0825] text-white rounded-lg shadow-md border border-gray-600">
                <h2 className="text-xl font-semibold mb-4">Participación</h2>
                <p className="text-sm leading-relaxed">
                    He participado en hackathons, proyectos propios y de código abierto, perfeccionando mis habilidades técnicas y enfocándome en el crecimiento continuo dentro del sector TI.
                </p>
            </div>

            <div className="p-6 bg-[#0A0825] text-white rounded-lg shadow-md border border-gray-600 col-span-2">
                <h2 className="text-xl font-semibold mb-4">Habilidades</h2>
                <ul className="list-disc list-inside text-sm space-y-2">
                    <li>React, Next.js, TailwindCSS, TypeScript</li>
                    <li>Node.js, Spring Boot</li>
                    <li>MySQL, MongoDB</li>
                    <li>Figma, Excalidraw</li>
                    <li>GIT, Power BI</li>
                </ul>
            </div>
        </section>
    );
};

export default About;
