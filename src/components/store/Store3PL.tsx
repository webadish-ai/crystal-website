import React from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiTruck, FiPackage, FiThermometer, FiActivity, FiGrid, FiShield,
} from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import tplData from '@data/store-3pl.json';
import { useCmsData } from '../../hooks/useCmsData';
import CharReveal from '@components/core/CharReveal';
import heroImgRaw from '../../data/images/store/3pl/Crystal Superstore Strategic Temperature-Controlled Infrastructure A Specialized Proposal for Hind Terminal ICD & CFS Operations (35).png';
const heroImg = typeof heroImgRaw === 'string' ? heroImgRaw : (heroImgRaw as any).src;

const isDataKey = (k: string) => k !== k.toUpperCase();
const sLabel    = (key: string) => key.replace(/^S\d+\s+/, '');

const featureIcons: React.ReactNode[] = [
  <FiTruck />, <FiPackage />, <FiThermometer />, <FiActivity />, <FiGrid />, <FiShield />,
];

const SectionHeader = ({ eyebrow, head, desc, align = 'left', dark = false }: {
  eyebrow?: string; head: string; desc?: string; align?: 'left' | 'center'; dark?: boolean;
}) => (
  <div className={`flex flex-col mb-8 shrink-0 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
    {eyebrow && (
      <motion.span variants={itemVariants}
        className={`font-body font-bold text-eyebrow uppercase tracking-[0.15em] mb-1.5 block ${dark ? 'text-accent' : 'text-secondary'}`}>
        {eyebrow}
      </motion.span>
    )}
    <motion.h2 variants={itemVariants}
      className={`font-heading font-extrabold text-h2 leading-tight-none tracking-tighter flex flex-col pb-1.5 w-full border-b ${dark ? 'text-primary border-primary/10' : 'text-secondary border-secondary/10'}`}>
      <CharReveal text={head} justify={align === 'center' ? 'center' : 'start'} />
    </motion.h2>
    {desc && (
      <motion.p variants={itemVariants}
        className={`font-body text-body-lg leading-relaxed max-w-2xl mt-4 ${dark ? 'text-primary/60' : 'text-secondary/60'}`}>
        {desc}
      </motion.p>
    )}
  </div>
);

const Store3PL: React.FC = () => {
  const rawData = useCmsData('store-3pl', tplData)
  const data = rawData["05 Store: 3PL & Supply Chain Management"]
  const s1Services = Object.entries(data["S1 3PL services"]).filter(([k]) => isDataKey(k)) as [string, string][]

  return (
    <div className="w-full bg-primary overflow-x-clip font-body">

      {/* ── HERO ── */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary text-primary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <img
          src={heroImg}
          alt="3PL & Supply Chain"
          loading="eager" decoding="async"
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(15,40,84,0.9)_0%,rgba(15,40,84,0.7)_30%,rgba(15,40,84,0.35)_55%,transparent_78%)]" />
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-30"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.span variants={itemVariants}
            className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
            {data["Hero Page"].EYEBROW}
          </motion.span>
          <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter mb-8 text-primary max-w-5xl">
            <CharReveal text={tc(data["Hero Page"].HEADLINE.split('. ')[0] + '.')} />
            <CharReveal text={tc(data["Hero Page"].HEADLINE.split('. ').slice(1).join('. '))} className="text-accent" />
          </h1>
          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <p className="font-body text-body-lg text-primary/80 leading-[1.6] mb-8 font-medium"
              dangerouslySetInnerHTML={{ __html: data["Hero Page"].SUBHEADLINE }}
            />
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/contact">
                {data["Hero Page"].CTA.replace(/\s*®$/, '')} <FiArrowRight className="text-lg" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── S1 3PL SERVICES ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <SectionHeader dark eyebrow="What we manage" head={tc(sLabel('S1 3PL services'))}
              desc="End-to-end cold chain logistics — from storage to delivery, managed by Crystal." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/5 mt-2">
              {s1Services.map(([title, desc], i) => (
                <motion.div key={title} variants={itemVariants}
                  className="group bg-secondary flex flex-col gap-4 p-6 md:p-8 border border-primary/10 hover:bg-primary/[0.03] transition-colors duration-300">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/[0.06] group-hover:bg-accent/20 text-accent rounded-sm transition-colors duration-300">
                    <span className="text-xl">{featureIcons[i] ?? <FiGrid />}</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-h4 text-primary tracking-tight leading-tight">{title}</h3>
                  <div className="font-body text-body-md text-primary/55 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: desc }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S2 WHY OUTSOURCE TO CRYSTAL ── */}
      <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div
            className="flex flex-col md:flex-row gap-8 md:gap-16"
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
          >
            <div className="w-full md:w-5/12">
              <SectionHeader head={tc(data["S2 Why outsource to Crystal"].HEADLINE)} />
            </div>
            <div className="w-full md:w-7/12 border-l-[3px] border-accent pl-8 md:pl-12 flex flex-col gap-8">
              <motion.p variants={itemVariants}
                className="font-body text-body-lg text-secondary/80 leading-[1.6] font-medium"
                dangerouslySetInnerHTML={{ __html: data["S2 Why outsource to Crystal"].BODY }}
              />
              <motion.div variants={itemVariants}>
                <Button variant="primary" size="lg" href="/contact">
                  {data["S2 Why outsource to Crystal"].CTA.replace(/\s*®$/, '')} <FiArrowRight className="ml-2 text-lg" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="bg-primary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <div className="border border-secondary/10 rounded-sm p-6 sm:p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
              <div className="max-w-xl">
                <motion.span variants={itemVariants}
                  className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary mb-2 block">
                  Outsource your cold chain
                </motion.span>
                <motion.h2 variants={itemVariants}
                  className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter">
                  Let Crystal manage your supply chain.
                </motion.h2>
                <motion.p variants={itemVariants}
                  className="font-body text-body-lg text-secondary/55 leading-relaxed mt-4 font-medium">
                  Storage, handling, distribution — all temperature-controlled. Tell us what you need.
                </motion.p>
              </div>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Button variant="primary" size="lg" href="/contact">
                  Get in touch <FiArrowRight className="ml-2 text-lg" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Store3PL;
