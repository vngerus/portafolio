import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import { calculateResponsiveSizes } from '../constant';
import CanvasLoader from '../tools/CanvasLoader';
import BananaCatHi from '../model/BananaCat';

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
  const { catScale, catPosition, cameraPosition } = calculateResponsiveSizes(deviceType);

  const [developerType, setDeveloperType] = useState('Full Stack');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setDeveloperType((prevType) => (prevType === 'Full Stack' ? 'Front-end' : 'Full Stack'));
      }, 800);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 1600);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center relative">
      <div className="w-full flex flex-col items-start text-left z-10 mt-[-300px]">
        <div className="text-xl uppercase text-gray-400 ml-[25%]">Angel Smith</div>

        <div className="text-6xl sm:text-8xl font-medium text-white leading-tight relative inline-block ml-[25%] mt-2">
          <div className="relative inline-block overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={developerType}
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="inline-block relative z-20">
                <span className="text-purple-500">+</span> {developerType}
              </motion.div>
            </AnimatePresence>
          </div>

          <motion.div
            className="absolute bottom-0 left-0 h-full bg-purple-500 z-50"
            style={{ width: `${developerType === 'Full Stack' ? 11 : 10}ch` }}
            initial={{ width: 0 }}
            animate={{ width: isTransitioning ? `${developerType === 'Full Stack' ? 11 : 10}ch` : 0 }}
            exit={{ width: 0 }}
            transition={{ duration: 1, ease: 'easeInOut' }}
          />
        </div>

        <div className="flex items-center justify-start mt-4 ml-[25%]">
          <div className="h-1 w-32 bg-purple-500"></div>
          <h1 className="text-6xl sm:text-8xl font-medium text-white leading-tight ml-4">Developer</h1>
        </div>
      </div>

      <div className="w-full h-full absolute inset-0">
        <Canvas style={{ width: '100%', height: '100%' }}>
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
