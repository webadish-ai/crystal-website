import React from 'react';
import { motion } from 'framer-motion';
import {
  containerVariants,
  itemVariants,
  wordContainerVariants,
  charVariants,
  viewportOnce,
} from './animations';

interface SectionHeaderProps {
  eyebrow?: string;
  heading: string;
  body?: string;
  /** 'left' | 'center' â€” default 'left' */
  align?: 'left' | 'center';
  /** 'h1' uses display scale; 'h2' section scale; 'h3' sub-section scale */
  headingSize?: 'h1' | 'h2' | 'h3';
  /** Switch text colours for dark/navy backgrounds */
  light?: boolean;
  /** Extra classes on the wrapper */
  className?: string;
  /** Animate heading with character reveal. Default true. */
  animateHeading?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  heading,
  body,
  align = 'left',
  headingSize = 'h2',
  light = false,
  className = '',
  animateHeading = true,
}) => {
  const alignClass = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  const eyebrowColor = light ? 'text-secondary' : 'text-accent';
  const headingColor = light ? 'text-primary' : 'text-secondary';
  const bodyColor    = light ? 'text-primary/70' : 'text-secondary/70';

  const headingFontSize: Record<string, string> = {
    h1: 'text-h1',
    h2: 'text-h2',
    h3: 'text-h3',
  };

  const words = heading.split(' ');

  return (
    <motion.div
      className={`flex flex-col ${alignClass} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      variants={containerVariants}
    >
      {eyebrow && (
        <motion.span
          variants={itemVariants}
          className={`font-body font-bold text-eyebrow uppercase tracking-eyebrow ${eyebrowColor} mb-4 block`}
        >
          {eyebrow}
        </motion.span>
      )}

      <h2
        className={`font-heading font-extrabold ${headingFontSize[headingSize]} ${headingColor} uppercase leading-tight-none tracking-tighter ${body ? 'mb-5' : ''} flex flex-wrap ${align === 'center' ? 'justify-center' : ''}`}
      >
        {animateHeading
          ? words.map((word, wi) => (
              <motion.span
                key={wi}
                variants={wordContainerVariants}
                className="inline-flex whitespace-nowrap mr-[0.25em] last:mr-0"
              >
                {word.split('').map((char, ci) => (
                  <span key={ci} className="inline-flex overflow-hidden pb-1 -mb-1">
                    <motion.span variants={charVariants} className="inline-block">
                      {char}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            ))
          : heading}
      </h2>

      {body && (
        <motion.p
          variants={itemVariants}
          className={`font-body text-body-lg ${bodyColor} max-w-2xl`}
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
    </motion.div>
  );
};

export default SectionHeader;
