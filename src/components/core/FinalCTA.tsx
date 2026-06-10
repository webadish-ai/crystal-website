import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, wordContainerVariants, charVariants, viewportOnce, tc } from './animations';
import Button from '@components/core/Button';
import homepageData from '@data/homepage.json';
import type { S10Section } from '@types/homepage';

const s10 = homepageData.homepage.sections.find(s => s.id === 'S10')! as unknown as S10Section;

const FinalCTA: React.FC = () => {
  const headline = tc(s10.headline);

  return (
    <section className="h-full w-full flex flex-col items-center justify-center bg-primary overflow-hidden py-20 border-t border-secondary/5">
      <motion.div
        className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[var(--max-width)] flex flex-col items-center text-center w-full"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={containerVariants}
      >
        <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block text-center">
          {s10.eyebrow.toUpperCase()}
        </motion.span>

        <motion.h2
          variants={wordContainerVariants}
          className="font-heading font-extrabold text-h2 text-secondary leading-[1.0] mb-8 tracking-tighter flex flex-wrap justify-center pb-2"
        >
          {headline.split(' ').map((word: string, wordIdx: number) => (
            <span key={wordIdx} className="inline-flex whitespace-nowrap mr-[0.25em]">
              {word.split('').map((char, charIdx) => (
                <span key={charIdx} className="inline-flex overflow-hidden pb-1 -mb-1">
                  <motion.span variants={charVariants} className="inline-block">
                    {char}
                  </motion.span>
                </span>
              ))}
            </span>
          ))}
        </motion.h2>

        <motion.p variants={itemVariants} className="text-secondary/80 text-body-lg font-body max-w-xl text-center mb-8"
          dangerouslySetInnerHTML={{ __html: s10.body }}
        />

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
          <Button variant="primary" href="/contact">{s10.cta_primary.toUpperCase()}</Button>
          <Button variant="secondary" href="#solutions">{s10.cta_secondary.toUpperCase()}</Button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FinalCTA;
