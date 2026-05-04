import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiBriefcase, FiShield, FiClock } from 'react-icons/fi';
import {
  itemVariants,
  viewportOnce,
  tc,
} from '@components/core/animations';
import homepageData from '@data/homepage.json';
import type { S8Section } from '@types/homepage';

const s8 = homepageData.homepage.sections.find(s => s.id === 'S8')! as unknown as S8Section;

const pillarsMeta = [
  { id: '01', icon: <FiAward /> },
  { id: '02', icon: <FiBriefcase /> },
  { id: '03', icon: <FiShield /> },
  { id: '04', icon: <FiClock /> },
];

const pillarsData = s8.points.map((point, i) => ({
  ...pillarsMeta[i],
  stat: point.stat,
  title: point.title,
  desc: point.description,
}));

const WhyCrystal: React.FC = () => {
  return (
    <section id="about" className="h-full w-full flex flex-col items-center justify-center bg-primary overflow-hidden py-20 px-6 md:px-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[var(--max-width)] flex flex-col h-full max-h-full justify-center">

        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6 shrink-0">
          <div className="max-w-2xl">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary mb-4 block">
              {s8.eyebrow.toUpperCase()}
            </span>
            <h2 className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter">
              {tc(s8.headline)}
            </h2>
            <div className="font-body text-secondary/70 text-body-lg leading-relaxed max-w-lg mt-4"
              dangerouslySetInnerHTML={{ __html: s8.body }}
            />
          </div>
          <div className="hidden md:block h-px flex-1 bg-secondary/10 mx-12 mb-4"></div>
          <div className="shrink-0 flex items-center gap-3">
            <span className="font-body font-bold text-body-sm text-secondary/40 uppercase tracking-[0.2em]">{s8.est_label.toUpperCase()}</span>
            <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
          </div>
        </div>

        {/* PILLARS GRID - COMPACT & CLEAN */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 mb-4 flex-1 min-h-0 py-4 overflow-y-auto overflow-x-hidden md:overflow-visible">
          {pillarsData.map((pillar, idx) => (
            <motion.div
              key={pillar.stat}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              variants={itemVariants}
              transition={{ delay: idx * 0.07 }}
              className="flex flex-col group"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-8 h-8 bg-secondary text-primary rounded-sm flex items-center justify-center text-base group-hover:bg-accent transition-colors duration-500">
                  {pillar.icon}
                </div>
                <div className="h-px flex-1 bg-secondary/5 group-hover:bg-accent/20 transition-colors"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-body font-bold text-eyebrow text-accent uppercase tracking-widest mb-1">{pillar.stat}</span>
                <h3 className="font-heading font-extrabold text-h3 text-secondary mb-2 tracking-tighter">{tc(pillar.title)}</h3>
                <div className="font-body text-body-md leading-relaxed text-secondary/60 max-w-[200px]" dangerouslySetInnerHTML={{ __html: pillar.desc }} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* COMPACT CEO QUOTE - PROFESSIONAL SIGN-OFF */}
        <div className="border-t border-secondary/10 pt-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10 shrink-0">
          <blockquote className="font-heading font-extrabold text-[16px] md:text-[18px] text-secondary/80 uppercase leading-[1.3] max-w-2xl tracking-tight">
            "{s8.quote.text}"
          </blockquote>

          <div className="flex items-center gap-6 shrink-0">
            <div className="h-12 w-px bg-secondary/10" />
            <div className="flex flex-col text-right">
              <span className="font-heading font-extrabold text-base text-secondary uppercase tracking-tighter">{s8.quote.attribution}</span>
              <span className="font-body font-bold text-eyebrow text-accent uppercase tracking-[0.2em]">Crystal Group</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyCrystal;
