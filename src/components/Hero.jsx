import { useState, useEffect, React } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PerspectiveCamera } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { useMediaQuery } from 'react-responsive';
import { calculateResponsiveSizes } from '../constant';
import CanvasLoader from '../tools/CanvasLoader';
import BananaCatHi from '../model/BananaCat';
import { isWebGLSupported } from '../tools/webglSupport';

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1024 });

  const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
  const { catScale, catPosition, cameraPosition } = calculateResponsiveSizes(deviceType);

  const [developerType, setDeveloperType] = useState('Full Stack');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [name, setName] = useState(' •エンジェル スミス •');
  const [currentName, setCurrentName] = useState('• エンジェル スミス •');

  const webGLSupported = isWebGLSupported();

  const japaneseName = '• エンジェル スミス ';
  const englishName = 'Angel Smith';

  useEffect(() => {
    let currentIndex = 0;

    const changeToEnglish = () => {
      const intervalId = setInterval(() => {
        if (currentIndex < englishName.length) {
          setCurrentName((prev) => englishName.slice(0, currentIndex + 1) + japaneseName.slice(currentIndex + 1));
          currentIndex += 1;
        } else {
          clearInterval(intervalId);
        }
      }, 100);
    };

    const delayBeforeChange = setTimeout(() => {
      changeToEnglish();
    }, 1500);

    return () => {
      clearTimeout(delayBeforeChange);
    };
  }, []);

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

  const letterVariant = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  const textVariant = {
    hidden: { opacity: 0, x: -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.05 },
    }),
  };

  return (
    <section className="min-h-screen w-full flex flex-col justify-center items-center relative">
      <div className="w-full flex flex-col items-center text-center z-10 mt-[-150px] md:mt-[-200px] lg:mt-[-300px]">
        <div className="text-lg md:text-2xl lg:text-xl uppercase text-gray-400 flex space-x-2">
          {currentName.split('').map((letter, index) => (
            <motion.span key={index} custom={index} initial="hidden" animate="visible" variants={letterVariant}>
              {letter === ' ' ? '\u00A0' : letter}
            </motion.span>
          ))}
        </div>

        <div className="text-4xl md:text-6xl lg:text-8xl font-medium text-white leading-tight relative inline-block mt-4 md:mt-6 lg:mt-8">
          <div className="relative inline-block overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={developerType}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.8 }}
                className="inline-block relative z-20">
                <span className="text-purple-500">+</span>{' '}
                {developerType.split('').map((letter, index) => (
                  <motion.span key={index} custom={index} initial="hidden" animate="visible" variants={textVariant}>
                    {letter}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex items-center justify-center mt-6 mb-16 md:mb-20 lg:mb-28 md:ml-6">
          <div className="h-4 w-4 bg-purple-500 rounded-full mr-4 md:mr-12"></div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-medium text-white leading-tight">Developer</h1>
        </div>
      </div>

      {webGLSupported ? (
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
      ) : (
        <div className="w-full h-full flex justify-center items-center text-white text-xl">
          Your browser does not support WebGL. Please update your browser to view this content.
        </div>
      )}
    </section>
  );
};

export default Hero;
