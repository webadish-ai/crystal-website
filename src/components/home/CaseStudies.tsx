import React from 'react';
import { motion } from 'framer-motion';
import {
  containerVariants,
  itemVariants,
  wordContainerVariants,
  charVariants,
  viewportOnce,
  tc,
} from '@components/core/animations';
import homepageData from '@data/homepage.json';
import type { S7Section } from '@types/homepage';
import reeferBgRaw from '../../data/images/store/reefer/reefer-hero.png';
const reeferBg = typeof reeferBgRaw === 'string' ? reeferBgRaw : (reeferBgRaw as any).src;

const s7 = homepageData.homepage.sections.find(s => s.id === 'S7')! as unknown as S7Section;

// Map JSON cases to component shape (tag = industry from JSON)
const caseStudiesData = s7.cases.map(c => ({
  tag: c.industry,
  title: c.title,
  details: c.details,
  link: c.link,
}));

const wipeVariants = {
  hidden: { scaleX: 1, originX: 1 },
  visible: { scaleX: 0, transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] as const } },
};

const CaseStudies: React.FC = () => {
  return (
    <section id="impact" className="h-full w-full flex flex-col items-center justify-center bg-primary overflow-hidden py-4 md:py-6 px-6 md:px-12 border-b border-secondary/5">
      <motion.div
        className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[var(--max-width)] flex flex-col h-full max-h-full justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={containerVariants}
      >
        <div className="mb-1 md:mb-3 flex flex-col items-start text-left shrink-0">
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary mb-2 block">
            {s7.eyebrow.toUpperCase()}
          </motion.span>
          <motion.h2 variants={wordContainerVariants} className="font-heading font-extrabold text-h2 text-secondary leading-tight-none max-w-3xl tracking-tighter flex flex-wrap pb-1">
            {tc(s7.headline).split(' ').map((word: string, wordIdx: number) => (
              <span key={wordIdx} className="inline-flex whitespace-nowrap mr-[0.25em]">
                {word.split('').map((char, charIdx) => (
                  <span key={charIdx} className="inline-flex overflow-hidden pb-1 -mb-1">
                    <motion.span variants={charVariants} className="inline-block">{char}</motion.span>
                  </span>
                ))}
              </span>
            ))}
          </motion.h2>
        </div>

        {/* Custom Flexbox Bento Grid layout */}
        <div className="flex flex-col md:flex-row gap-2 md:gap-3 flex-1 min-h-0 pb-2 w-full">

          {/* Card 1: BIG (Left Side, ~45% width) */}
          <motion.a
            href={caseStudiesData[0].link}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            className="md:w-[45%] min-h-[160px] md:h-full relative p-5 md:p-8 flex flex-col justify-between bg-secondary text-primary group overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl rounded-sm"
          >
            <motion.div className="absolute inset-0 z-50 bg-primary pointer-events-none" variants={wipeVariants} />
            <img src={reeferBg} alt="" className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
            <div className="relative z-10 flex justify-between items-start">
              <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mt-1">
                {caseStudiesData[0].tag}
              </span>
              <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-full border border-primary/10 flex items-center justify-center font-heading font-extrabold text-body-sm group-hover:bg-accent group-hover:text-secondary group-hover:border-accent transition-all duration-500">
                {s7.view_label.toUpperCase()}
              </div>
            </div>
            <div className="relative z-10 mt-3 md:mt-8">
              <h3 className="font-heading font-extrabold text-h4 md:text-h3 leading-tight-none tracking-tighter mb-3 md:mb-6 text-primary group-hover:text-accent transition-colors duration-500">
                {caseStudiesData[0].title}
              </h3>
              <p className="font-body text-body-sm text-primary/50 uppercase tracking-widest leading-relaxed">
                {caseStudiesData[0].details.join(' · ')}
              </p>
            </div>
          </motion.a>

          {/* Right Side Container (~55% width) */}
          <div className="md:w-[55%] md:h-full flex flex-col gap-2 md:gap-3">

            {/* Top Row: Cards 2 & 3 (Equal split) */}
            <div className="flex flex-row gap-2 md:gap-3 md:flex-1">
              {[1, 2].map(idx => (
                <motion.div key={idx} variants={itemVariants} className="flex-1 min-h-[100px] relative p-4 md:p-6 flex flex-col bg-secondary text-primary group overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl rounded-sm">
                  <motion.div className="absolute inset-0 z-50 bg-primary pointer-events-none" variants={wipeVariants} />
                  <div className="relative z-10 flex justify-between items-start">
                    <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mt-1 line-clamp-1 mr-2">
                      {caseStudiesData[idx].tag}
                    </span>
                    <div className="w-5 h-5 md:w-6 md:h-6 shrink-0 rounded-full border border-primary/10 flex items-center justify-center font-heading font-extrabold text-body-sm group-hover:bg-accent group-hover:text-secondary transition-all">
                      &rarr;
                    </div>
                  </div>
                  <div className="relative z-10 mt-auto pt-4">
                    <h3 className="font-heading font-extrabold text-h4 leading-[1.15] tracking-tight mb-3 text-primary group-hover:text-accent transition-colors duration-500 line-clamp-2 md:line-clamp-3">
                      {caseStudiesData[idx].title}
                    </h3>
                    <p className="font-body text-[10px] text-primary/50 uppercase tracking-widest leading-relaxed">
                      {caseStudiesData[idx].details.join(' · ')}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Bottom Row: Card 4 (66%) & Link Card (33%) */}
            <div className="flex flex-row gap-2 md:gap-3 md:flex-1">
              {/* Card 4 (Larger width) */}
              <motion.div variants={itemVariants} className="flex-1 min-h-[100px] relative p-4 md:p-6 flex flex-col bg-secondary text-primary group overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl rounded-sm">
                <motion.div className="absolute inset-0 z-50 bg-primary pointer-events-none" variants={wipeVariants} />
                <div className="relative z-10 flex justify-between items-start">
                  <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mt-1 line-clamp-1 mr-2">
                    {caseStudiesData[3].tag}
                  </span>
                  <div className="w-5 h-5 md:w-6 md:h-6 shrink-0 rounded-full border border-primary/10 flex items-center justify-center font-heading font-extrabold text-body-sm group-hover:bg-accent group-hover:text-secondary transition-all">
                    &rarr;
                  </div>
                </div>
                <div className="relative z-10 mt-auto pt-4">
                  <h3 className="font-heading font-extrabold text-h4 leading-[1.15] tracking-tight mb-3 text-primary group-hover:text-accent transition-colors duration-500 line-clamp-2 md:line-clamp-3">
                    {caseStudiesData[3].title}
                  </h3>
                  <p className="font-body text-[10px] text-primary/50 uppercase tracking-widest leading-relaxed">
                    {caseStudiesData[3].details.join(' · ')}
                  </p>
                </div>
              </motion.div>

              {/* Tiny Link Card (Smallest block) */}
              <motion.div variants={itemVariants} className="w-1/4 sm:w-1/3 shrink-0 relative p-3 sm:p-4 flex items-center justify-center bg-accent text-secondary group overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:bg-secondary hover:text-primary rounded-sm cursor-pointer text-center min-h-[100px]">
                 <motion.div className="absolute inset-0 z-50 bg-primary pointer-events-none" variants={wipeVariants} />
                 <a href="#impact" className="relative z-10 font-heading font-extrabold text-body-md uppercase flex flex-col items-center justify-center gap-1 leading-tight-none tracking-tighter w-full">
                   <span>{s7.cta.toUpperCase()} <span className="group-hover:translate-x-1 transition-transform inline-block">&rarr;</span></span>
                 </a>
              </motion.div>
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
};

export default CaseStudies;
