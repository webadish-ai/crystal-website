import React from 'react';
import { motion } from 'framer-motion';
import {
  containerVariants,
  wordContainerVariants,
  charVariants,
  itemVariants,
  viewportOnce,
  tc,
} from '@components/core/animations';
import homepageData from '@data/homepage.json';
import type { S2Section } from '@types/homepage';

const s2 = homepageData.homepage.sections.find(s => s.id === 'S2')! as unknown as S2Section;

const AmbitionStatement: React.FC = () => {
  return (
    <section className="h-full w-full bg-secondary text-primary relative overflow-hidden flex flex-col items-center justify-center py-20 px-6 md:px-12">
      <motion.div
        className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[var(--max-width)] flex flex-col items-center text-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={containerVariants}
      >
        <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-4 block">
          {s2.eyebrow.toUpperCase()}
        </motion.span>

        <h2 className="font-heading font-extrabold text-h2 leading-tight-none flex flex-col tracking-tighter mt-2 gap-2">
          <motion.span
            className="flex flex-wrap justify-center overflow-hidden pb-1"
            variants={wordContainerVariants}
          >
            <span className="flex flex-wrap justify-center text-primary">
              {tc(s2.statement.split(', ')[0] + ',').split(' ').map((word, wordIdx) => (
                <React.Fragment key={wordIdx}>
                  <span className="inline-flex whitespace-nowrap mr-[0.25em]">
                    {word.split('').map((char, charIdx) => (
                      <span key={charIdx} className="inline-flex overflow-hidden pb-1 -mb-1">
                        <motion.span variants={charVariants} className="inline-block">
                          {char}
                        </motion.span>
                      </span>
                    ))}
                  </span>
                  {' '}
                </React.Fragment>
              ))}
            </span>
          </motion.span>
          <motion.span
            className="flex flex-wrap justify-center overflow-hidden pb-1"
            variants={wordContainerVariants}
          >
            <span className="flex flex-wrap justify-center text-accent">
              {tc(s2.statement.split(', ').slice(1).join(', ')).split(' ').map((word, wordIdx) => (
                <React.Fragment key={wordIdx}>
                  <span className="inline-flex whitespace-nowrap mr-[0.25em]">
                    {word.split('').map((char, charIdx) => (
                      <span key={charIdx} className="inline-flex overflow-hidden pb-1 -mb-1">
                        <motion.span variants={charVariants} className="inline-block">
                          {char}
                        </motion.span>
                      </span>
                    ))}
                  </span>
                  {' '}
                </React.Fragment>
              ))}
            </span>
          </motion.span>
        </h2>
      </motion.div>
    </section>
  );
};

export default AmbitionStatement;
