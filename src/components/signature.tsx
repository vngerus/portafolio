'use client';
import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';
import { Moon, Sun, BatteryCharging, Radio } from 'lucide-react';
import BananaCat, { ActionName } from './model/BananaCat';

const DRAIN_PER_TICK = 3;
const DRAIN_INTERVAL = 80;
const RECOVER_PER_TICK = 1;
const RECOVER_INTERVAL = 200;
const SIT_ANIM_MS = 1500;
const STAND_ANIM_MS = 1500;

type Phase = 'active' | 'glitching' | 'sitting-down' | 'resting' | 'standing-up';
type DialogVariant = 'greeting' | 'curious' | 'tired' | 'glitch' | 'ready';

const GLITCH_SEQUENCE: ActionName[] = [
  'bananaBones|walk',
  'bananaBones|lookAround',
  'bananaBones|idle',
  'bananaBones|walk',
  'bananaBones|lookAround',
  'bananaBones|idle',
];

const FollowGroup: React.FC<{
  targetRef: React.MutableRefObject<number>;
  enabled: boolean;
  children: React.ReactNode;
}> = ({ targetRef, enabled, children }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const target = enabled ? targetRef.current : 0.05;
    // Lerp suave hacia el objetivo (factor 0.06 = ~60ms de respuesta)
    groupRef.current.rotation.y += (target - groupRef.current.rotation.y) * 0.06;
  });

  return <group ref={groupRef}>{children}</group>;
};

const CyberSignal: React.FC = () => (
  <motion.span
    className="inline-flex items-center ml-1 text-purple-400 align-middle"
    animate={{ opacity: [0.3, 1, 0.3] }}
    transition={{ repeat: Infinity, duration: 1.2, ease: 'easeInOut' }}
  >
    <Radio className="w-3.5 h-3.5" />
  </motion.span>
);

const Dialog: React.FC<{ msg: string; variant: DialogVariant }> = ({ msg, variant }) => {
  const isGlitch = variant === 'glitch';
  const borderColor = isGlitch ? 'rgba(239, 68, 68, 0.6)' : 'rgba(168, 85, 247, 0.4)';

  return (
    <div
      className="relative px-3 py-2 select-none font-mono bg-[#0c0a14]/95 backdrop-blur-md border shadow-[0_4px_20px_rgba(0,0,0,0.7)]"
      style={{ borderColor }}
    >
      <p className="font-mono text-xs font-medium leading-relaxed text-white flex items-start gap-1">
        <span>{msg}</span>
        {variant === 'greeting' && <CyberSignal />}
      </p>

      {/* Subtle Tail pointing to Banana Cat */}
      <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-0 h-0 border-t-4 border-t-transparent border-b-4 border-b-transparent border-l-4 border-l-accentPrimary/40 pointer-events-none" />
    </div>
  );
};

const IconActionButton: React.FC<{
  onClick: () => void;
  tooltip: string;
  delay?: number;
  className?: string;
  children: React.ReactNode;
}> = ({ onClick, tooltip, delay = 0, className = '', children }) => (
  <motion.button
    initial={{ opacity: 0, x: 10, scale: 0.85 }}
    animate={{ opacity: 1, x: 0, scale: 1 }}
    exit={{ opacity: 0, x: 10, scale: 0.85 }}
    transition={{ duration: 0.15, delay }}
    onClick={onClick}
    className={`group relative w-9 h-9 flex items-center justify-center border backdrop-blur-md bg-[#0b0a12]/95 shadow-[0_4px_16px_rgba(0,0,0,0.6)] cursor-pointer active:translate-y-0.5 transition-colors ${className}`}
  >
    {children}
    <span className="pointer-events-none absolute right-full mr-2 top-1/2 -translate-y-1/2 whitespace-nowrap px-2 py-1 text-[10px] font-mono text-white bg-[#0c0a14] border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
      {tooltip}
    </span>
  </motion.button>
);

const NPC_PHRASES = [
  '¡Hola! Me alegra que pases a verme. ¿Seguimos explorando juntos?',
  'A veces me da hambre de tanto moverme por la pantalla... ¿me alimentas?',
  '¿Ya viste la sección de proyectos? Me encantaría acompañarte a mirarla.',
  'Ángel Smith me hizo con mucho cariño, ¿se nota?',
  'Si me quedo sin energía me voy a sentar a descansar un rato, ¡tranquilo!',
  '¡Meow! No soy solo un ícono, me gusta pensar que soy tu compañero de viaje.',
  'Cada scroll que haces me hace caminar un poco. ¡Sigamos explorando!',
  'Haz clic en mí cuando quieras charlar o darme de comer.',
  'Hoy me siento con harta energía. ¿Qué exploramos primero?',
];

const SLEEP_NPC_PHRASES = [
  'Zzz... estoy descansando un poco. Haz clic si quieres que me levante.',
  'Sentado, recargando energía de a poco... se siente bien así.',
  'Un ratito más aquí sentado y vuelvo con toda la energía.',
];

const HUNGRY_THRESHOLD = 40;

const HUNGRY_NPC_PHRASES = [
  'Tengo hambre... ¿me convidas una banana?',
  'Se me está acabando la energía, un bocadito me vendría genial.',
  'Mi pancita está sonando. ¿Me alimentas un rato?',
];

// Small emote reflecting how the cat feels right now, shown above the dock.
const getEmote = (phase: Phase, energy: number, isGlitching: boolean, actionName: ActionName): string => {
  if (isGlitching) return '⚡';
  if (phase === 'resting') return '😴';
  if (phase === 'sitting-down') return '🥱';
  if (phase === 'standing-up') return '🙂';
  if (energy < HUNGRY_THRESHOLD) return '🍌';
  if (actionName === 'bananaBones|hiiiiiiiii') return '👋';
  if (actionName === 'bananaBones|walk') return '🚶';
  if (actionName === 'bananaBones|lookAround') return '👀';
  if (actionName === 'bananaBones|jump') return '✨';
  return '😊';
};

const Signature: React.FC = () => {
  const [actionName, setActionName] = useState<ActionName>('bananaBones|hiiiiiiiii');
  const [energy, setEnergy] = useState(100);
  const [phase, setPhase] = useState<Phase>('active');
  const [isGlitching, setIsGlitching] = useState(false);
  const [dialogMsg, setDialogMsg] = useState('');
  const [dialogVariant, setDialogVariant] = useState<DialogVariant>('greeting');
  const [dialogVisible, setDialogVisible] = useState(false);

  const phaseRef = useRef<Phase>('active');
  const energyRef = useRef(100);
  useLayoutEffect(() => {
    phaseRef.current = phase;
    energyRef.current = energy;
  });

  // Debounced emote — avoids flickering between walk/lookAround on every scroll tick.
  const [displayedEmote, setDisplayedEmote] = useState(() => getEmote(phase, energy, isGlitching, actionName));
  const emoteTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const next = getEmote(phase, energy, isGlitching, actionName);
    if (next === displayedEmote) return;
    if (emoteTimerRef.current) clearTimeout(emoteTimerRef.current);
    emoteTimerRef.current = setTimeout(() => setDisplayedEmote(next), 450);
    return () => {
      if (emoteTimerRef.current) clearTimeout(emoteTimerRef.current);
    };
  }, [phase, energy, isGlitching, actionName, displayedEmote]);
  const hasRestedRef = useRef(false);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const mouseTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const dialogTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const targetRotYRef = useRef(0.05);
  const lastHoverTimeRef = useRef(0);
  const lastNpcIndexRef = useRef(-1);

  const speak = useCallback(
    (msg: string, variant: DialogVariant = 'ready', autoHide = true, hideMs = 3200, show = true) => {
      setDialogMsg(msg);
      setDialogVariant(variant);
      if (show) {
        setDialogVisible(true);
        if (dialogTimerRef.current) clearTimeout(dialogTimerRef.current);
        if (autoHide) {
          dialogTimerRef.current = setTimeout(() => setDialogVisible(false), hideMs);
        }
      }
    },
    []
  );

  // Only fires on an explicit click on the cat — no more surprise popups from hover/scroll.
  const handleCatSelect = useCallback(() => {
    const now = Date.now();
    if (now - lastHoverTimeRef.current < 1600) return;
    lastHoverTimeRef.current = now;

    if (phaseRef.current === 'glitching') return;

    if (phaseRef.current === 'resting') {
      const idx = Math.floor(Math.random() * SLEEP_NPC_PHRASES.length);
      speak(SLEEP_NPC_PHRASES[idx], 'tired', true, 3500);
      return;
    }

    const pool = energyRef.current < HUNGRY_THRESHOLD ? HUNGRY_NPC_PHRASES : NPC_PHRASES;
    let nextIndex: number;
    do {
      nextIndex = Math.floor(Math.random() * pool.length);
    } while (pool.length > 1 && nextIndex === lastNpcIndexRef.current);
    lastNpcIndexRef.current = nextIndex;

    const phrase = pool[nextIndex];
    speak(phrase, pool === HUNGRY_NPC_PHRASES ? 'tired' : 'curious', true, 4000);

    if (phaseRef.current === 'active') {
      setActionName('bananaBones|hiiiiiiiii');
      setTimeout(() => {
        if (phaseRef.current === 'active') setActionName('bananaBones|idle');
      }, 1500);
    }
  }, [speak]);

  useEffect(() => {
    // Silent: sets the panel's chat text without popping the dialog open on load.
    speak('¡Hola! Soy Banana Cat. Voy a acompañarte mientras recorres el portafolio.', 'greeting', true, 4000, false);
    const goIdle = setTimeout(() => {
      if (phaseRef.current === 'active') setActionName('bananaBones|idle');
    }, 2200);
    return () => clearTimeout(goIdle);
  }, [speak]);

  const handleScroll = useCallback(() => {
    if (phaseRef.current !== 'active') return;
    setActionName('bananaBones|walk');
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      if (phaseRef.current === 'active') setActionName('bananaBones|lookAround');
    }, 350);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (phaseRef.current !== 'active') return;

    // Mapear cursor X a rotación Y: izquierda = +0.35, derecha = -0.35
    const normalized = (e.clientX / window.innerWidth) * 2 - 1;
    targetRotYRef.current = -normalized * 0.35 + 0.05;

    const el = document.elementFromPoint(e.clientX, e.clientY);
    const isCompanion = el && el.closest('[data-companion]');
    if (isCompanion) return;

    const isInteractive =
      el && (el.tagName === 'A' || el.tagName === 'BUTTON' || el.hasAttribute('data-interactive'));
    if (isInteractive) setActionName('bananaBones|lookAround');
    if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
    mouseTimerRef.current = setTimeout(() => {
      if (phaseRef.current === 'active') {
        targetRotYRef.current = 0.05; // vuelve al centro
        setActionName('bananaBones|idle');
      }
    }, 2000);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      if (mouseTimerRef.current) clearTimeout(mouseTimerRef.current);
    };
  }, [handleScroll, handleMouseMove]);

  useEffect(() => {
    if (phase !== 'active' || actionName !== 'bananaBones|walk') return;
    const interval = setInterval(() => {
      setEnergy(prev => {
        const next = prev - DRAIN_PER_TICK;
        if (next <= 0) {
          clearInterval(interval);
          phaseRef.current = 'glitching';
          setPhase('glitching');
          return 0;
        }
        return next;
      });
    }, DRAIN_INTERVAL);
    return () => clearInterval(interval);
  }, [phase, actionName]);

  useEffect(() => {
    if (phase !== 'glitching') return;
    setIsGlitching(true);
    speak('Uy... me estoy quedando sin energía. Necesito sentarme un momento.', 'glitch', true, 2500, false);
    let i = 0;
    const interval = setInterval(() => {
      setActionName(GLITCH_SEQUENCE[i % GLITCH_SEQUENCE.length]);
      i++;
      if (i >= GLITCH_SEQUENCE.length) {
        clearInterval(interval);
        setIsGlitching(false);
        phaseRef.current = 'sitting-down';
        setPhase('sitting-down');
        setActionName('bananaBones|sitDown');
        setTimeout(() => {
          phaseRef.current = 'resting';
          setPhase('resting');
          setActionName('bananaBones|sit');
        }, SIT_ANIM_MS);
      }
    }, 110);
    return () => clearInterval(interval);
  }, [phase, speak]);

  useEffect(() => {
    if (phase !== 'resting') return;
    const interval = setInterval(() => {
      setEnergy(prev => {
        const next = Math.min(prev + RECOVER_PER_TICK, 100);
        if (next >= 100) {
          clearInterval(interval);
          phaseRef.current = 'standing-up';
          setPhase('standing-up');
          setActionName('bananaBones|standUp');
          setTimeout(() => {
            phaseRef.current = 'active';
            setPhase('active');
            setActionName('bananaBones|idle');
          }, STAND_ANIM_MS);
          return 100;
        }
        return next;
      });
    }, RECOVER_INTERVAL);
    return () => clearInterval(interval);
  }, [phase]);

  useEffect(() => {
    if (phase === 'resting') {
      hasRestedRef.current = true;
      speak('Ya estoy sin energía y sentado descansando. Haz clic en mí si quieres despertarme o alimentarme.', 'tired', true, 5000, false);
    } else if (phase === 'active' && hasRestedRef.current) {
      hasRestedRef.current = false;
      speak('¡Me siento renovado! Energía al 100%, sigamos explorando.', 'ready', true, 3000, false);
    }
  }, [phase, speak]);

  const [isAtBottom, setIsAtBottom] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [particles, setParticles] = useState<{ id: number; text: string; x: number; y: number }[]>([]);

  // ── Spawn floating particle ────────────────────────────────────────────────
  const spawnParticle = (text: string) => {
    const id = Date.now() + Math.random();
    setParticles(prev => [...prev, { id, text, x: Math.random() * 20 - 10, y: 0 }]);
    setTimeout(() => {
      setParticles(prev => prev.filter(p => p.id !== id));
    }, 1300);
  };

  // ── Feed Banana Action ─────────────────────────────────────────────────────
  const handleFeedBanana = useCallback(() => {
    if (energy >= 100) {
      spawnParticle('¡ESTOY LLENO!');
      setActionName('bananaBones|lookAround');
      speak('¡Uff, ya no me cabe más! Estoy completamente satisfecho, gracias.', 'ready');
      setTimeout(() => {
        if (phaseRef.current === 'active') setActionName('bananaBones|idle');
      }, 1600);
      return;
    }

    const nextEnergy = Math.min(100, energy + 25);
    setEnergy(nextEnergy);
    spawnParticle('+25% ENERGÍA');

    if (phaseRef.current === 'resting') {
      phaseRef.current = 'standing-up';
      setPhase('standing-up');
      setActionName('bananaBones|standUp');
      speak(
        nextEnergy >= 100
          ? '¡Me despertaste con la panza llena! Me siento genial.'
          : `Gracias por el bocado, me ayuda bastante. Energía al ${nextEnergy}%.`,
        'ready'
      );
      setTimeout(() => {
        phaseRef.current = 'active';
        setPhase('active');
        setActionName('bananaBones|jump');
        setTimeout(() => {
          if (phaseRef.current === 'active') setActionName('bananaBones|idle');
        }, 1400);
      }, STAND_ANIM_MS);
    } else {
      setActionName('bananaBones|jump');
      speak(
        nextEnergy >= 100
          ? '¡Ñam! Ya llegué al 100%, me siento lleno de energía.'
          : `¡Gracias! Se siente bien comer algo. Energía al ${nextEnergy}%.`,
        'ready'
      );
      setTimeout(() => {
        if (phaseRef.current === 'active') setActionName('bananaBones|idle');
      }, 1300);
    }
  }, [energy, speak]);

  // ── Take a break (sits down, stays seated recovering energy) ───────────────
  const handleTakeBreak = useCallback(() => {
    if (phaseRef.current === 'resting') return;
    phaseRef.current = 'sitting-down';
    setPhase('sitting-down');
    setActionName('bananaBones|sitDown');
    spawnParticle('MODO REPOSO');
    speak('Voy a sentarme un rato para recuperar fuerzas. Vuelvo pronto.', 'tired');
    setTimeout(() => {
      phaseRef.current = 'resting';
      setPhase('resting');
      setActionName('bananaBones|sit');
    }, SIT_ANIM_MS);
  }, [speak]);

  // ── Get back up from the break ──────────────────────────────────────────────
  const handleGetUp = useCallback(() => {
    if (phaseRef.current !== 'resting') return;
    phaseRef.current = 'standing-up';
    setPhase('standing-up');
    setActionName('bananaBones|standUp');
    spawnParticle('SISTEMA ACTIVO');
    speak('¡Ya me siento mejor! Sigamos explorando juntos.', 'ready');
    setTimeout(() => {
      phaseRef.current = 'active';
      setPhase('active');
      setActionName('bananaBones|idle');
    }, STAND_ANIM_MS);
  }, [speak]);

  // ── Bottom detection (IntersectionObserver + Scroll fallback) ─────────────
  useEffect(() => {
    const handleScrollBottom = () => {
      const scrollPos = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 600;
      setIsAtBottom(scrollPos >= threshold);
    };

    let observer: IntersectionObserver | null = null;
    const footer = document.querySelector('footer');
    if (footer && 'IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        entries => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            setIsAtBottom(true);
          } else if (window.scrollY < 1000) {
            setIsAtBottom(false);
          }
        },
        { rootMargin: '150px 0px 50px 0px', threshold: 0.05 }
      );
      observer.observe(footer);
    }

    const handleCustomMenu = () => {
      setMenuOpen(prev => !prev);
    };

    window.addEventListener('scroll', handleScrollBottom, { passive: true });
    window.addEventListener('banana-cat-menu', handleCustomMenu);
    return () => {
      if (observer && footer) observer.unobserve(footer);
      window.removeEventListener('scroll', handleScrollBottom);
      window.removeEventListener('banana-cat-menu', handleCustomMenu);
    };
  }, []);

  // Reaching the footer never opens anything by itself — it just primes the text for when clicked.
  useEffect(() => {
    if (isAtBottom && !menuOpen) {
      speak('Llegamos hasta el final juntos. Haz clic en mí si quieres charlar.', 'curious', true, 4000, false);
    }
  }, [isAtBottom, menuOpen, speak]);

  return (
    <>
      {/* Floating telemetry particles */}
      <div className="fixed right-6 bottom-32 pointer-events-none z-[60]">
        {particles.map(p => (
          <motion.div
            key={p.id}
            initial={{ opacity: 1, y: 0, scale: 0.9 }}
            animate={{ opacity: 0, y: -55, scale: 1.05 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute font-mono text-[10px] font-bold text-accentPrimary drop-shadow-[0_0_8px_rgba(168,85,247,0.6)] whitespace-nowrap bg-[#0c0a14]/90 border border-accentPrimary/40 px-2 py-0.5"
            style={{ left: `${p.x}px` }}
          >
            {p.text}
          </motion.div>
        ))}
      </div>

      {/* Floating Action Buttons — only the food/rest buttons, no big panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div data-companion="true" className="fixed right-14 bottom-10 z-[75] flex flex-col gap-2.5">
            <IconActionButton
              onClick={handleFeedBanana}
              tooltip={energy >= 100 ? 'Lleno (100%)' : 'Alimentar gatito (+25%)'}
              delay={0.04}
              className={
                energy >= 100
                  ? 'border-white/10 text-textPrimary/50'
                  : 'border-accentPrimary/40 text-accentPrimary hover:bg-accentPrimary hover:text-black'
              }
            >
              <BatteryCharging className="w-4 h-4" />
            </IconActionButton>

            {phase === 'resting' ? (
              <IconActionButton
                onClick={handleGetUp}
                tooltip="Levantar gatito"
                delay={0.08}
                className="border-amber-400/40 text-amber-300 hover:bg-amber-400 hover:text-black"
              >
                <Sun className="w-4 h-4" />
              </IconActionButton>
            ) : (
              <IconActionButton
                onClick={handleTakeBreak}
                tooltip="Tomar un descanso"
                delay={0.08}
                className="border-white/10 text-purple-300 hover:border-purple-400/40 hover:bg-white/5"
              >
                <Moon className="w-4 h-4" />
              </IconActionButton>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Standard Dialog for Banana Cat speeches */}
      <AnimatePresence>
        {dialogVisible && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="fixed right-16 bottom-28 w-56 sm:w-60 z-50"
          >
            <Dialog msg={dialogMsg} variant={dialogVariant} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Banana Cat 3D Canvas in Dock */}
      <div className="flex flex-col items-center fixed right-0 bottom-0 h-full w-12.5 justify-end z-50">
        <div
          onClick={() => {
            const opening = !menuOpen;
            setMenuOpen(prev => !prev);
            if (opening) handleCatSelect();
          }}
          onMouseEnter={handleCatSelect}
          title="Pasa el mouse o haz clic para interactuar con Banana Cat"
          style={{ height: '100px', width: '50px' }}
          className={`cursor-pointer group relative transition-transform hover:scale-105 active:scale-95 duration-150 ${
            isGlitching ? 'animate-nerv-glitch' : ''
          }`}
        >
          {/* Emote thought-bubble — reflects how the cat currently feels */}
          <div className="absolute -top-10 left-1/2 -translate-x-1/2 pointer-events-none flex flex-col items-center z-20">
            <AnimatePresence mode="wait">
              <motion.div
                key={displayedEmote}
                initial={{ opacity: 0, scale: 0.4, y: 6 }}
                animate={{ opacity: 1, scale: 1, y: [0, -4, 0] }}
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{
                  opacity: { duration: 0.25 },
                  scale: { duration: 0.25 },
                  y: { repeat: Infinity, duration: 1.4, ease: 'easeInOut' },
                }}
                className="flex items-center justify-center w-7 h-7 rounded-full text-sm select-none bg-[#0c0a14]/95 border border-accentPrimary/40 shadow-[0_0_10px_rgba(168,85,247,0.5)] group-hover:scale-110 transition-transform duration-150"
              >
                {displayedEmote}
              </motion.div>
            </AnimatePresence>
            {/* Thought-bubble tail dots */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#0c0a14]/95 border border-accentPrimary/30 mt-0.5" />
            <span className="w-1 h-1 rounded-full bg-[#0c0a14]/95 border border-accentPrimary/20 mt-0.5" />
          </div>

          <Canvas camera={{ position: [0, 0, 12], fov: 50 }}>
            <ambientLight intensity={1.4} />
            <FollowGroup targetRef={targetRotYRef} enabled={phase === 'active'}>
              <BananaCat
                actionName={actionName}
                position={[-0.2, -7.6, -10]}
                scale={[0.07, 0.07, 0.07]}
                rotation={[0.19, 0, 0]}
              />
            </FollowGroup>
          </Canvas>
        </div>

        {/* Dock Energy Bar */}
        <div
          onClick={() => setMenuOpen(prev => !prev)}
          className="w-10 px-0.5 mt-2 cursor-pointer group flex flex-col items-center select-none"
          title={`Energía: ${energy}%`}
        >
          <div className="w-full flex items-center justify-between text-[7px] font-mono text-textPrimary/60 mb-0.5 px-0.5">
            <span>HP</span>
            <span className="text-white font-bold">{energy}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 border border-white/10 p-0.2 relative overflow-hidden group-hover:border-accentPrimary/50 transition-all">
            <motion.div
              className={`h-full ${energy > 20 ? 'bg-accentPrimary' : 'bg-red-500 animate-pulse'}`}
              animate={{ width: `${energy}%` }}
              transition={{ duration: 0.25, ease: 'linear' }}
            />
          </div>
        </div>

        <div className="w-px h-20 bg-white/20 mt-3" />
      </div>
    </>
  );
};

export default Signature;
