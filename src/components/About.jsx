import React, { useState } from "react";
import Globe from "react-globe.gl";
import { grid1, grid2, grid3, grid4 } from "../assets";
import { Button } from "../ui";

const About = () => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("angelsmithlgs@gmail.com");
    setHasCopied(true);

    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <section className="c-space my-20" id="about">
      <div className="grid xl:grid-cols-3 xl:grid-rows-6 md:grid-cols-2 grid-cols-1 gap-5 h-full">
        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src={grid1}
              alt="grid-1"
              className="w-full sm:h-[276px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">Hola, mi nombre es Ángel Smith</p>
              <p className="grid-subtext">
                Vengo con un background en Ing. en Marketing, pero me decidí por
                reinventar en el mundo del código en donde ya llevo casi un año
                metido en esto y puedo decir que ha sido bastante interesante y
                divertido (●'◡'●)
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-3">
          <div className="grid-container">
            <img
              src={grid2}
              alt="grid-2"
              className="w-full sm:h-[276px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">Tech Stack</p>
              <p className="grid-subtext">
                Java - JavaScript - TypeScript - HTML5 | React - Next.js -
                Angular | Tailwind - Bootstrap - CSS3 <br />
                Node.js - Spring Boot | MySQL - MongoDB - PostgreSQL | Power BI
              </p>
            </div>
          </div>
        </div>

        <div className="col-span-1 xl:row-span-4">
          <div className="grid-container">
            <div className="rounded-3xl w-full sm:h-[326px] h-fit flex justify-center items-center">
              <Globe
                height={326}
                width={326}
                backgroundColor="rgba(0, 0, 0, 0)"
                showAtmosphere
                showGraticules
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                labelsData={[
                  {
                    lat: 40,
                    lng: -100,
                    text: "Rjieka, Croatia",
                    color: "white",
                    size: 15,
                  },
                ]}
              />
            </div>
            <div>
              <p className="grid-headtext">Horarios </p>
              <p className="grid-subtext">
                Actualmente tengo mucha flexibilidad para lo necesites!
              </p>
              <Button name="Contacto" isBeam containerClass="w-full mt-10" />
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 xl:row-span-3">
          <div className="grid-container">
            <img
              src={grid3}
              alt="grid-3"
              className="w-full sm:h-[266px] h-fit object-contain"
            />
            <div>
              <p className="grid-headtext">Un poco más de mi</p>
              <p className="grid-subtext">
                Si bien llevo al rededor de casi 1 año en el mundo de la
                pogramación, eso no ha sido impedimento para estar estudiando la
                mayor parte del tiempo, ya que consdiero que es necesario
                siempre mantenerse bien enfocado en lo que va saliendo i/o
                actualizando
              </p>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1 xl:row-span-2">
          <div className="grid-container">
            <img
              src={grid4}
              alt="grid-4"
              className="w-full md:h-[126px] sm:h-[276px] h-fit object-cover sm:object-top"
            />

            <div className="space-y-2">
              <p className="grid-subtext text-center">Contacto</p>
              <div className="copy-container" onClick={handleCopy}>
                <img
                  src={
                    hasCopied
                      ? "/src/assets/resources/tick.svg"
                      : "/src/assets/resources/copy.svg"
                  }
                  alt="copy"
                />
                <p className="lg:text-2xl md:text-xl font-medium text-gray_gradient text-white">
                  angelsmithlgs@gmail.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
