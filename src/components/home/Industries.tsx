import React from 'react';
import { motion } from 'framer-motion';
import pharmaImg from '../../assets/pharma.png';
import fmcgImg from '../../assets/fmcg.png';
import qsrImg from '../../assets/QSR.png';
import dairyImg from '../../assets/dairy.png';
import agriImg from '../../assets/vege.png';
import chocoImg from '../../assets/confectionery.png';
import {
  containerVariants,
  itemVariants,
  wordContainerVariants,
  charVariants,
  viewportOnce,
  tc,
} from '@components/core/animations';
import homepageData from '@data/homepage.json';
import type { S6Section } from '@types/homepage';

const getSrc = (img: { src: string } | string) => typeof img === 'string' ? img : img.src;

const s6 = homepageData.homepage.sections.find(s => s.id === 'S6')! as unknown as S6Section;

// Images indexed to match JSON industries order: Pharma, FMCG, Dairy, Seafood, Meat, Q-Commerce
const images = [pharmaImg, fmcgImg, dairyImg, agriImg, qsrImg, chocoImg];
const imagePositions = ['bg-center', 'bg-center', 'bg-center', 'bg-center', 'bg-center', 'bg-center'];

const industriesData = s6.industries.map((name, i) => ({
  name,
  image: images[i],
  position: imagePositions[i],
}));

const Industries: React.FC = () => {
  return (
    <section id="industries" className="h-full w-full flex flex-col items-center justify-center bg-secondary text-primary overflow-hidden py-8 md:py-20 px-6 md:px-12">
      <motion.div
        className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[var(--max-width)] flex flex-col h-full max-h-full justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={containerVariants}
      >
        <div className="mb-4 md:mb-6 flex flex-col items-start text-left shrink-0">
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-3 block">
            {s6.eyebrow.toUpperCase()}
          </motion.span>
          <motion.h2 variants={wordContainerVariants} className="font-heading font-extrabold text-h2 text-primary leading-tight-none max-w-4xl tracking-tighter flex flex-wrap pb-2">
            {tc(s6.headline).split(' ').map((word: string, wordIdx: number) => (
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
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 grid-rows-3 lg:grid-rows-2 gap-[1px] bg-primary/10 border border-primary/5 flex-1 min-h-0">
          {industriesData.map((ind, idx) => (
            <motion.div
              variants={itemVariants}
              className="relative p-4 md:p-6 flex flex-col justify-between bg-secondary transition-all duration-500 overflow-hidden group"
              key={ind.name}
            >
              {/* Background Image */}
              {ind.image && (
                <div
                  className={`absolute inset-0 bg-cover ${ind.position} opacity-35 transition-all duration-700 group-hover:opacity-55 group-hover:scale-110 z-0`}
                  style={{ backgroundImage: `url(${getSrc(ind.image)})` }}
                />
              )}

              {/* Backdrop over full card + stronger fade at bottom for text */}
              <div className="absolute inset-0 bg-secondary/5 z-[1]" />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/70 via-transparent to-transparent z-[2]" />

              <div className="relative z-[3]">
                <span className="font-heading font-extrabold text-base md:text-xl text-primary/25 group-hover:text-accent transition-colors duration-500">
                  0{idx + 1}
                </span>
              </div>

              <div className="relative z-[3]">
                <h3 className="font-heading font-extrabold text-h3 text-primary leading-tight-none group-hover:text-accent transition-colors tracking-tighter">
                  {ind.name}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Industries;
