import React from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiThermometer, FiShield, FiActivity, FiGrid, FiLayers, FiZap,
} from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import coldsData from '@data/store-colds.json';
import { useCmsData } from '../../hooks/useCmsData';
import CharReveal from '@components/core/CharReveal';

const getSrc = (a: any): string => (typeof a === 'string' ? a : a.src);
const storeVideoSrc = '/videos/store-cold.mp4';

const sLabel = (key: string) => key.replace(/^S\d+\s+/, '');

const featureIcons: React.ReactNode[] = [
  <FiGrid />, <FiShield />, <FiActivity />, <FiThermometer />, <FiLayers />, <FiZap />,
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

const StoreColdStorage: React.FC = () => {
  const rawData = useCmsData('store-colds', coldsData)
  const data = rawData["04 Store: Cold Storage & Warehousing"]
  const temperatureZones = Object.entries(data["S1 Temperature capabilities"]["Zone Temperature range Products"]) as [string, string][]
  const s2Locations = Object.entries(data["S2 Our facilities"]).filter(([k]) => k !== 'HEADLINE' && k !== 'BODY') as [string, string][]
  const s3Features = Object.entries(data["S3 Facility features"]) as [string, string][]

  return (
    <div className="w-full bg-primary overflow-x-clip font-body">

      {/* ── HERO ── */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary text-primary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <video
          src={storeVideoSrc}
          className="absolute inset-0 z-0 w-full h-full object-cover scale-105"
          autoPlay muted loop playsInline
        />
        <div className="absolute inset-0 z-10 bg-secondary/10" />
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
            <Button variant="primary" size="lg" href="/contact">
              {data["Hero Page"].CTA.replace(/\s*®$/, '')} <FiArrowRight className="text-lg" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── S1 TEMPERATURE CAPABILITIES ── */}
      <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <SectionHeader
              eyebrow="Temperature zones"
              head={tc(data["S1 Temperature capabilities"].HEADLINE)}
              desc="Multiple temperature zones under one roof — matched to your product's exact requirement."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {temperatureZones.map(([zone, detail], i) => (
                <motion.div key={zone} variants={itemVariants}
                  className="group flex flex-col gap-4 p-6 rounded-sm border border-secondary/10 bg-secondary/[0.03] hover:border-accent hover:bg-accent/[0.04] transition-all duration-300 cursor-default">
                  <div className="w-10 h-10 flex items-center justify-center bg-secondary/[0.06] group-hover:bg-accent/20 text-accent rounded-sm transition-colors duration-300">
                    <span className="text-xl"><FiThermometer /></span>
                  </div>
                  <h3 className="font-heading font-extrabold text-h4 text-secondary tracking-tight leading-tight group-hover:text-secondary transition-colors">{zone}</h3>
                  <p className="font-body text-body-md text-secondary/55 leading-relaxed font-medium">{detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S2 OUR FACILITIES ── */}
      <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div
            className="flex flex-col md:flex-row gap-8 md:gap-16"
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
          >
            <div className="w-full md:w-5/12">
              <SectionHeader head={tc(data["S2 Our facilities"].HEADLINE)} />
            </div>
            <div className="w-full md:w-7/12 border-l-[3px] border-accent pl-8 md:pl-12 flex flex-col gap-8">
              <motion.p variants={itemVariants}
                className="font-body text-body-lg text-secondary/80 leading-[1.6] font-medium"
                dangerouslySetInnerHTML={{ __html: data["S2 Our facilities"].BODY }}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {s2Locations.map(([title, desc], i) => (
                  <motion.div key={i} variants={itemVariants} className="flex flex-col border-t border-secondary/15 pt-4">
                    <span className="font-heading font-extrabold text-h4 text-secondary mb-1.5 tracking-tight">{title}</span>
                    <span className="font-body text-body-md text-secondary/60 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: desc }} />
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── S3 FACILITY FEATURES ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <SectionHeader dark eyebrow="Infrastructure" head={tc(sLabel('S3 Facility features'))}
              desc="Every Crystal cold storage facility is built to the highest standards of food safety and operational reliability." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/5 mt-2">
              {s3Features.map(([title, desc], i) => (
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

      {/* ── S4 CERTIFICATIONS / FINAL CTA ── */}
      <section className="bg-primary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <div className="border border-secondary/10 rounded-sm p-6 sm:p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
              <div className="max-w-xl">
                <motion.span variants={itemVariants}
                  className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary mb-2 block">
                  {tc(sLabel('S4 Certifications'))}
                </motion.span>
                <motion.h2 variants={itemVariants}
                  className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter">
                  India's certified cold chain infrastructure.
                </motion.h2>
                <motion.p variants={itemVariants}
                  className="font-body text-body-lg text-secondary/55 leading-relaxed mt-4 font-medium"
                  dangerouslySetInnerHTML={{ __html: data["S4 Certifications"].BODY }}
                />
              </div>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Button variant="primary" size="lg" href="/contact">
                  {data["S4 Certifications"].CTA.replace(/\s*®$/, '')} <FiArrowRight className="ml-2 text-lg" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default StoreColdStorage;
