import { PerspectiveCamera } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { useMediaQuery } from "react-responsive";
import { calculateResponsiveSizes } from "../constant";
import CanvasLoader from "../tools/CanvasLoader";
import BananaCatHi from "../model/BananaCat";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const deviceType = isMobile ? "mobile" : isTablet ? "tablet" : "desktop";
  const { catScale, catPosition, cameraPosition } =
    calculateResponsiveSizes(deviceType);

  return (
    <section className="min-h-screen w-full flex flex-col relative">
      <div className="w-full mx-auto flex flex-col mt-20 c-space gap-2">
        <p className="sm:text-3xl text-2xl font-medium text-white text-center font-generalsans">
          Hola, Me llamo Ángel <span className="waving-hand">✌</span>
        </p>
        <p className="hero_tag text-gray_gradient"> Front-end Developer</p>
      </div>

      <div className="w-full h-full absolute inset-0">
        <Canvas style={{ width: "100%", height: "100%" }}>
          <Suspense fallback={<CanvasLoader />}>
            <PerspectiveCamera makeDefault position={cameraPosition} />
            <BananaCatHi
              position={catPosition}
              rotation={[3.5, -3.1, 3.14]}
              scale={[catScale, catScale, catScale]}
              ActionName={BananaCatHi}
            />
            <ambientLight intensity={1} />
            <directionalLight position={[10, 10, 10]} intensity={0.5} />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

export default Hero;
