import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiPlus, FiMinus, FiCheckCircle } from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import CharReveal from '@components/core/CharReveal';

/* ── INTERFACES ── */

interface Spec {
  size: string;
  tare_weight: string;
  max_gross: string;
  max_payload: string;
  ext_dimensions: string;
  int_dimensions: string;
  door_opening: string;
  volume: string;
}

interface Feature { title: string; desc: string; }
interface FaqItem { q: string; a: string; }

interface DryContainerData {
  meta: { title: string; description: string };
  hero: { eyebrow: string; name: string; tagline: string; badge: string; sizes: string[] };
  overview: string;
  features: Feature[];
  specs: Spec[];
  industries: string[];
  faq: FaqItem[];
}

interface Props {
  data: DryContainerData;
  heroImage?: string;
}

/* ── SPEC ACCORDION CONFIG ── */

interface SpecSection {
  id: string;
  label: string;
  cols: string[];
  rows: (spec: Spec) => string[];
}

const SPEC_SECTIONS: SpecSection[] = [
  {
    id: 'ext',
    label: 'External Dimensions',
    cols: ['Size', 'L × W × H'],
    rows: (s) => [s.size, s.ext_dimensions],
  },
  {
    id: 'int',
    label: 'Internal Dimensions',
    cols: ['Size', 'Internal', 'Door Opening'],
    rows: (s) => [s.size, s.int_dimensions, s.door_opening],
  },
  {
    id: 'weight',
    label: 'Weight & Capacity',
    cols: ['Size', 'Tare Weight', 'Max Payload', 'Volume'],
    rows: (s) => [s.size, s.tare_weight, s.max_payload, s.volume],
  },
];

/* ── SECTION HEADER ── */

const SectionHeader = ({ eyebrow, head, align = 'left', dark = false }: {
  eyebrow?: string;
  head: string;
  align?: 'left' | 'center';
  dark?: boolean;
}) => (
  <div className={`flex flex-col mb-8 shrink-0 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
    {eyebrow && (
      <motion.span variants={itemVariants} className={`font-body font-bold text-eyebrow uppercase tracking-[0.15em] mb-1.5 block ${dark ? 'text-accent' : 'text-secondary'}`}>
        {eyebrow}
      </motion.span>
    )}
    <motion.h2 variants={itemVariants} className={`font-heading font-extrabold text-h2 leading-tight-none tracking-tighter flex flex-col pb-1.5 w-full border-b ${dark ? 'text-primary border-primary/10' : 'text-secondary border-secondary/10'}`}>
      <CharReveal text={head} justify={align === 'center' ? 'center' : 'start'} />
    </motion.h2>
  </div>
);

/* ── MAIN COMPONENT ── */

const StoreDryContainer: React.FC<Props> = ({ data, heroImage }) => {
  const [activeSize, setActiveSize] = useState(() => Math.min(1, data.specs.length - 1));
  const [openSpec, setOpenSpec]     = useState<string | null>(null);
  const [openFaq, setOpenFaq]       = useState<number | null>(null);

  const spec = data.specs[activeSize];

  const toggleSpec = (id: string) => setOpenSpec(prev => (prev === id ? null : id));

  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">

      {/* ── HERO ── */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary text-primary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        {heroImage && (
          <img
            src={heroImage}
            alt={data.hero.name}
            loading="eager"
            decoding="async"
            className="absolute inset-0 z-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(15,40,84,0.92)_0%,rgba(15,40,84,0.75)_35%,rgba(15,40,84,0.4)_60%,transparent_82%)]" />

        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-30"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
            {data.hero.eyebrow}
          </motion.span>

          <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter mb-8 text-primary max-w-5xl">
            <CharReveal text={tc(data.hero.name)} />
          </h1>

          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <p className="font-body text-body-lg text-primary/80 leading-[1.6] mb-8 font-medium">
              {data.hero.tagline}
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/contact">
                Get a Quote <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
              </Button>
              <Button variant="ghost" size="lg" href="/contact">
                Request Lease
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SPECIFICATIONS ── */}
      <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

              {/* LEFT: animated image panel — sticky on desktop */}
              <motion.div variants={itemVariants} className="order-2 lg:order-1 lg:sticky lg:top-24 lg:self-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSize}
                    initial={{ opacity: 0, scale: 0.975 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.975 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                    className="flex flex-col gap-2"
                  >
                    {/* Image container */}
                    <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-secondary/10">
                      {heroImage && (
                        <img
                          src={heroImage}
                          alt={`${spec.size} dry container`}
                          loading="lazy"
                          decoding="async"
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      )}
                      {/* Size badge top-left */}
                      <div className="absolute top-3 left-3 bg-secondary/90 backdrop-blur-sm px-3 py-1.5 rounded-sm z-10">
                        <span className="font-heading font-extrabold text-h3 text-accent tracking-tight leading-none">{spec.size}</span>
                      </div>
                      {/* Badge overlay at bottom */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-secondary/80 to-transparent px-4 py-3 z-10">
                        <span className="font-heading font-extrabold text-[11px] text-primary/70 uppercase tracking-[0.15em]">{data.hero.badge}</span>
                      </div>
                    </div>

                    {/* Amber info bar */}
                    <div className="bg-accent rounded-sm px-5 py-4 flex items-center justify-between gap-4">
                      <div className="flex flex-col gap-0.5 min-w-0">
                        <span className="font-heading font-extrabold text-h4 text-secondary leading-tight tracking-tight truncate">
                          {spec.volume} · {spec.max_payload}
                        </span>
                        <span className="font-body font-bold text-eyebrow uppercase tracking-[0.12em] text-secondary/60">
                          {spec.size} · {spec.ext_dimensions}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* RIGHT: size cards + spec accordion */}
              <motion.div variants={itemVariants} className="order-1 lg:order-2 flex flex-col gap-3">

                {/* Size cards */}
                <div className="border border-secondary/10 rounded-sm p-4 grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${data.specs.length}, 1fr)` }}>
                  {data.specs.map((s, i) => (
                    <button
                      key={s.size}
                      onClick={() => setActiveSize(i)}
                      className={`group flex flex-col items-start gap-1.5 px-4 py-4 rounded-sm border text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                        ${activeSize === i
                          ? 'border-accent bg-accent/[0.06]'
                          : 'border-secondary/25 bg-secondary/[0.04] hover:border-secondary/50 hover:bg-secondary/[0.08]'}`}
                    >
                      <span className={`font-heading font-extrabold text-h2 tracking-tighter leading-none transition-colors duration-300
                        ${activeSize === i ? 'text-accent' : 'text-secondary'}`}>
                        {s.size}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Spec accordion */}
                <div className="border border-secondary/10 rounded-sm overflow-hidden flex flex-col divide-y divide-secondary/10">

                  {/* Header row */}
                  <div className="px-5 py-3.5 bg-secondary/[0.02]">
                    <span className="font-heading font-extrabold text-[11px] uppercase tracking-[0.15em] text-secondary/50">Specifications</span>
                  </div>

                  {/* 3 accordion sections */}
                  {SPEC_SECTIONS.map(section => (
                    <div key={section.id}>
                      <button
                        onClick={() => toggleSpec(section.id)}
                        className={`w-full flex items-center gap-3.5 px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-accent
                          ${openSpec === section.id ? 'bg-secondary' : 'bg-primary hover:bg-secondary/[0.03]'}`}
                      >
                        <span className={`shrink-0 text-sm transition-colors ${openSpec === section.id ? 'text-accent' : 'text-secondary/35'}`}>
                          {openSpec === section.id ? <FiMinus /> : <FiPlus />}
                        </span>
                        <span className={`font-heading font-extrabold text-h4 tracking-tight leading-tight transition-colors
                          ${openSpec === section.id ? 'text-primary' : 'text-secondary'}`}>
                          {section.label}
                        </span>
                      </button>

                      <AnimatePresence initial={false}>
                        {openSpec === section.id && (
                          <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                            className="overflow-hidden"
                          >
                            <div className="px-5 pt-4 pb-5 bg-primary border-t border-secondary/8">
                              <div className="overflow-x-auto">
                                <table className="w-full text-left border-collapse">
                                  <thead>
                                    <tr className="border-b border-secondary/10">
                                      {section.cols.map((col, j) => (
                                        <th key={col}
                                          className={`pb-2.5 pt-1 font-heading font-extrabold text-[10px] uppercase tracking-[0.1em] text-secondary/35
                                            ${j === 0 ? 'pr-6 w-[22%]' : 'pr-4'}`}>
                                          {col}
                                        </th>
                                      ))}
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-secondary/8">
                                    {data.specs.map((s, i) => {
                                      const row = section.rows(s);
                                      return (
                                        <tr key={s.size} className={`transition-colors duration-300 ${i === activeSize ? 'bg-accent/[0.06]' : ''}`}>
                                          {row.map((cell, j) => (
                                            <td key={j}
                                              className={`py-3 font-heading font-extrabold tracking-tight leading-tight transition-colors duration-300
                                                ${j === 0
                                                  ? `text-accent text-h4 pr-6 ${i === activeSize ? 'pl-3 border-l-2 border-accent' : 'pl-0'}`
                                                  : `text-h4 pr-4 ${i === activeSize ? 'text-secondary' : 'text-secondary/45'}`}`}>
                                              {cell}
                                            </td>
                                          ))}
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}

                  {/* Good to know */}
                  <div>
                    <button
                      onClick={() => toggleSpec('gtk')}
                      className={`w-full flex items-center gap-3.5 px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-accent
                        ${openSpec === 'gtk' ? 'bg-secondary' : 'bg-primary hover:bg-secondary/[0.03]'}`}
                    >
                      <span className={`shrink-0 text-sm transition-colors ${openSpec === 'gtk' ? 'text-accent' : 'text-secondary/35'}`}>
                        {openSpec === 'gtk' ? <FiMinus /> : <FiPlus />}
                      </span>
                      <span className={`font-heading font-extrabold text-h4 tracking-tight leading-tight transition-colors
                        ${openSpec === 'gtk' ? 'text-primary' : 'text-secondary'}`}>
                        Good to know
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openSpec === 'gtk' && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pt-4 pb-5 bg-primary border-t border-secondary/8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {data.features.map((f, i) => (
                                <div key={i} className="flex items-start gap-3 px-4 py-3.5 rounded-sm bg-secondary/[0.04] border border-secondary/8">
                                  <FiCheckCircle className="shrink-0 text-accent text-base mt-0.5" />
                                  <div className="flex flex-col gap-0.5 min-w-0">
                                    <span className="font-heading font-extrabold text-[10px] uppercase tracking-[0.1em] text-accent leading-none">{f.title}</span>
                                    <span className="font-body font-semibold text-[13px] text-secondary/80 leading-snug">{f.desc}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* CTA row */}
                  <div className="px-5 py-4 flex items-center justify-between gap-4 flex-wrap bg-primary">
                    <span className="font-body text-body-sm text-secondary/35 font-medium">Available to rent or buy · Pan-India delivery</span>
                    <Button variant="primary" size="sm" href="/contact">
                      Get a quote <FiArrowRight className="ml-2" />
                    </Button>
                  </div>

                </div>
              </motion.div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ── KEY FEATURES ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <SectionHeader dark eyebrow="What's included" head="Key Features" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/5 mt-2">
              {data.features.map((f, i) => (
                <motion.div key={i} variants={itemVariants}
                  className="group bg-secondary flex flex-col gap-4 p-6 md:p-8 border border-primary/10 hover:bg-primary/[0.03] transition-colors duration-300">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/[0.06] group-hover:bg-accent/20 rounded-sm transition-colors duration-300">
                    <span className="font-heading font-extrabold text-[13px] text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-h4 text-primary tracking-tight leading-tight">{f.title}</h3>
                  <p className="font-body text-body-md text-primary/55 leading-relaxed font-medium">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INDUSTRIES ── */}
      <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <SectionHeader eyebrow="Who uses these" head="Industries served" />
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {data.industries.map((ind, i) => (
                <motion.div key={ind} variants={itemVariants}
                  className="group flex flex-col items-center gap-3 py-6 px-4 border border-secondary/10 rounded-sm hover:border-accent hover:bg-accent/[0.04] transition-all duration-300 cursor-default text-center">
                  <span className="font-heading font-extrabold text-[11px] uppercase tracking-[0.1em] text-secondary/60 group-hover:text-secondary leading-tight transition-colors">{ind}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16"
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
          >
            {/* Left */}
            <div>
              <SectionHeader dark eyebrow="FAQ" head="Common questions" />
            </div>

            {/* Right: accordion */}
            <motion.div variants={itemVariants} className="border border-primary/10 overflow-hidden divide-y divide-primary/8">
              {data.faq.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200
                      ${openFaq === i ? 'bg-primary/[0.08]' : 'hover:bg-primary/[0.04]'}`}
                  >
                    <span className={`font-heading font-extrabold text-h4 tracking-tight leading-tight transition-colors
                      ${openFaq === i ? 'text-primary' : 'text-primary/80'}`}>
                      {item.q}
                    </span>
                    <span className={`shrink-0 text-sm transition-colors ${openFaq === i ? 'text-accent' : 'text-primary/35'}`}>
                      {openFaq === i ? <FiMinus /> : <FiPlus />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pt-3 pb-5 border-t border-primary/8">
                          <p className="font-body text-body-md text-primary/60 leading-relaxed">{item.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-primary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <div className="border border-secondary/10 rounded-sm p-6 sm:p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
              <div className="max-w-xl">
                <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary mb-2 block">
                  Ready to rent or buy?
                </motion.span>
                <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter">
                  Get a container at your site.
                </motion.h2>
                <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/55 leading-relaxed mt-4 font-medium">
                  Tell us your size, location, and timeline. Pricing and availability within 24 hours.
                </motion.p>
              </div>
              <motion.div variants={itemVariants} className="shrink-0">
                <Button variant="primary" size="lg" href="/contact">
                  Request a quote <FiArrowRight className="ml-2 text-lg" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default StoreDryContainer;
