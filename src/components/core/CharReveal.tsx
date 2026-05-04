import React from 'react';
import { motion } from 'framer-motion';
import { EASE } from '@components/core/animations';

interface CharRevealProps {
  text: string;
  className?: string;
  justify?: 'start' | 'center' | 'end';
  duration?: number;
  stagger?: number;
}

const alignStyle: Record<string, React.CSSProperties> = {
  start:  { textAlign: 'left' },
  center: { textAlign: 'center' },
  end:    { textAlign: 'right' },
};

const CharReveal: React.FC<CharRevealProps> = ({
  text,
  className = '',
  justify = 'start',
  duration = 0.55,
  stagger = 0.07,
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden:  { opacity: 1 },
    visible: { opacity: 1, transition: { staggerChildren: stagger } },
  };

  const wordVariants = {
    hidden:  { y: '110%', opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration, ease: EASE } },
  };

  return (
    <motion.span
      variants={containerVariants}
      className={className}
      style={{ display: 'block', ...alignStyle[justify] }}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.12em', marginBottom: '-0.12em', verticalAlign: 'bottom' }}>
            <motion.span variants={wordVariants} style={{ display: 'inline-block' }}>
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? ' ' : null}
        </React.Fragment>
      ))}
    </motion.span>
  );
};

export default CharReveal;
