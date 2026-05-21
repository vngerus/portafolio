'use client';

import { motion } from 'motion/react';

const Cursor: React.FC = () => (
  <motion.span
    animate={{ opacity: [1, 0, 1] }}
    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
    className="inline-block w-1.75 h-2.75 bg-textPrimary/70 ml-1 align-middle"
  />
);

interface SysLabelProps {
  left: string;
  right: string;
}

const SysLabel: React.FC<SysLabelProps> = ({ left, right }) => (
  <div className="flex items-center gap-3 mb-2">
    <span className="font-mono text-[9px] text-textPrimary/50 tracking-[0.3em] uppercase">
      {left}
    </span>
    <span className="w-8 h-px bg-textPrimary/20" />
    <span className="font-mono text-[9px] text-textPrimary/30 tracking-[0.2em] uppercase">
      {right}
    </span>
    <Cursor />
  </div>
);

export default SysLabel;
