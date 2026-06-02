import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiPlus, FiMinus, FiCheckCircle } from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import CharReveal from '@components/core/CharReveal';
import coldRoomsData from '@data/store-cold-rooms.json';
import { useCmsData } from '../../hooks/useCmsData';

interface TempOption { label: string; name: string; desc: string; industries: string[] }
interface Feature { title: string; desc: string }
interface FaqItem { q: string; a: string }

/* ─────────────────────────────────────────────
   SECTION HEADER (shared)
───────────────────────────────────────────── */
const SectionHeader = ({ eyebrow, head, dark = false }: {
  eyebrow?: string; head: string; dark?: boolean;
}) => (
  <div className="flex flex-col mb-8 shrink-0 items-start text-left">
    {eyebrow && (
      <motion.span variants={itemVariants} className={`font-body font-bold text-eyebrow uppercase tracking-[0.15em] mb-1.5 block ${dark ? 'text-accent' : 'text-secondary'}`}>
        {eyebrow}
      </motion.span>
    )}
    <motion.h2 variants={itemVariants} className={`font-heading font-extrabold text-h2 leading-tight-none tracking-tighter flex flex-col pb-1.5 w-full border-b ${dark ? 'text-primary border-primary/10' : 'text-secondary border-secondary/10'}`}>
      <CharReveal text={head} justify="start" />
    </motion.h2>
  </div>
);

/* ─────────────────────────────────────────────
   PAGE
───────────────────────────────────────────── */
const StoreColdRooms: React.FC = () => {
  const data = useCmsData('store-cold-rooms', coldRoomsData) as typeof coldRoomsData;
  const [activeTemp, setActiveTemp] = useState(0);
  const [openSpec, setOpenSpec] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const tempOpts = data.temp_options as TempOption[];
  const features = data.features as Feature[];
  const faq = data.faq as FaqItem[];

  const toggleSpec = (id: string) => setOpenSpec(prev => prev === id ? null : id);

  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">

      {/* ── HERO ── */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(15,40,84,0.92)_0%,rgba(15,40,84,0.75)_35%,rgba(15,40,84,0.4)_60%,transparent_82%)]" />

        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-20"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
            {data.hero.eyebrow}
          </motion.span>

          <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter mb-8 text-primary max-w-5xl">
            <CharReveal text={tc(data.hero.name)} />
          </h1>

          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <p className="font-body text-body-lg text-primary/80 leading-[1.6] mb-6 font-medium">
              {data.hero.tagline}
            </p>

            {/* Temp option pills */}
            <div className="flex gap-3 flex-wrap mb-8">
              {(data.hero.temp_options as string[]).map((t) => (
                <span key={t} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] px-3 py-1.5 border border-accent/40 text-accent">
                  {t}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/contact-us">
                Get a Quote <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
              </Button>
              <Button variant="ghost" size="lg" href="/contact-us">
                Discuss your project
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── TEMPERATURE OPTIONS + SPECS ── */}
      <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

              {/* LEFT: temperature visual card — sticky on desktop */}
              <motion.div variants={itemVariants} className="order-2 lg:order-1 lg:sticky lg:top-24 lg:self-start flex flex-col gap-2">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTemp}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="aspect-[4/3] bg-secondary rounded-sm overflow-hidden relative flex flex-col justify-between p-8"
                  >
                    {/* Top: big temperature label */}
                    <span className="font-heading font-extrabold text-[5rem] text-accent leading-none tracking-tighter">
                      {tempOpts[activeTemp].label}
                    </span>

                    {/* Middle: name */}
                    <h3 className="font-heading font-extrabold text-h2 text-primary leading-tight tracking-tighter">
                      {tempOpts[activeTemp].name}
                    </h3>

                    {/* Bottom: description */}
                    <p className="font-body text-primary/65 font-medium leading-relaxed text-body-lg">
                      {tempOpts[activeTemp].desc}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Amber info bar: industries */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`bar-${activeTemp}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="bg-accent rounded-sm px-5 py-4 flex flex-wrap gap-x-3 gap-y-1"
                  >
                    {tempOpts[activeTemp].industries.map((ind) => (
                      <span key={ind} className="font-body font-bold text-eyebrow uppercase tracking-[0.12em] text-secondary">
                        {ind}
                      </span>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* RIGHT: temp selector + overview + specs accordion */}
              <motion.div variants={itemVariants} className="order-1 lg:order-2 flex flex-col gap-3">

                {/* Temp selector */}
                <div className="border border-secondary/10 rounded-sm p-4 grid grid-cols-2 gap-2">
                  {tempOpts.map((opt, i) => (
                    <button
                      key={opt.label}
                      onClick={() => setActiveTemp(i)}
                      className={`group flex flex-col items-start gap-1.5 px-4 py-4 rounded-sm border text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                        ${activeTemp === i
                          ? 'border-accent bg-accent/[0.06]'
                          : 'border-secondary/25 bg-secondary/[0.04] hover:border-secondary/50 hover:bg-secondary/[0.08]'}`}
                    >
                      <span className={`font-heading font-extrabold text-h2 tracking-tighter leading-none transition-colors duration-300
                        ${activeTemp === i ? 'text-accent' : 'text-secondary'}`}>
                        {opt.label}
                      </span>
                      <span className={`font-body font-bold text-[10px] uppercase tracking-[0.12em] leading-tight transition-colors duration-300
                        ${activeTemp === i ? 'text-secondary/55' : 'text-secondary/50'}`}>
                        {opt.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Overview text */}
                <div className="border border-secondary/10 rounded-sm p-5">
                  <p className="text-body-lg text-secondary/65 leading-relaxed font-body">
                    {data.overview}
                  </p>
                </div>

                {/* Specs accordion */}
                <div className="border border-secondary/10 rounded-sm overflow-hidden flex flex-col divide-y divide-secondary/10">

                  {/* Header */}
                  <div className="px-5 py-3.5 bg-secondary/[0.02]">
                    <span className="font-heading font-extrabold text-[11px] uppercase tracking-[0.15em] text-secondary/50">Cold Room Specifications</span>
                  </div>

                  {/* Section: Insulation */}
                  <div>
                    <button
                      onClick={() => toggleSpec('insulation')}
                      className={`w-full flex items-center gap-3.5 px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-accent
                        ${openSpec === 'insulation' ? 'bg-secondary' : 'bg-primary hover:bg-secondary/[0.03]'}`}
                    >
                      <span className={`shrink-0 text-sm transition-colors ${openSpec === 'insulation' ? 'text-accent' : 'text-secondary/35'}`}>
                        {openSpec === 'insulation' ? <FiMinus /> : <FiPlus />}
                      </span>
                      <span className={`font-heading font-extrabold text-h4 tracking-tight leading-tight transition-colors
                        ${openSpec === 'insulation' ? 'text-primary' : 'text-secondary'}`}>
                        Insulation
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openSpec === 'insulation' && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pt-4 pb-5 bg-primary border-t border-secondary/8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {[
                                { label: 'Thermal conductivity', value: '0.22 W/m²K' },
                                { label: 'Panel density', value: '40–42 kg/m³' },
                              ].map((item) => (
                                <div key={item.label} className="flex items-start gap-3 px-4 py-3.5 rounded-sm bg-secondary/[0.04] border border-secondary/8">
                                  <FiCheckCircle className="shrink-0 text-accent text-base mt-0.5" />
                                  <div className="flex flex-col gap-0.5 min-w-0">
                                    <span className="font-heading font-extrabold text-[10px] uppercase tracking-[0.1em] text-accent leading-none">{item.label}</span>
                                    <span className="font-body font-semibold text-[13px] text-secondary/80 leading-snug">{item.value}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Section: Compliance */}
                  <div>
                    <button
                      onClick={() => toggleSpec('compliance')}
                      className={`w-full flex items-center gap-3.5 px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-accent
                        ${openSpec === 'compliance' ? 'bg-secondary' : 'bg-primary hover:bg-secondary/[0.03]'}`}
                    >
                      <span className={`shrink-0 text-sm transition-colors ${openSpec === 'compliance' ? 'text-accent' : 'text-secondary/35'}`}>
                        {openSpec === 'compliance' ? <FiMinus /> : <FiPlus />}
                      </span>
                      <span className={`font-heading font-extrabold text-h4 tracking-tight leading-tight transition-colors
                        ${openSpec === 'compliance' ? 'text-primary' : 'text-secondary'}`}>
                        Compliance
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {openSpec === 'compliance' && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pt-4 pb-5 bg-primary border-t border-secondary/8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {[
                                { label: '21 CFR Part 11 compliant', value: 'Validated monitoring system' },
                                { label: 'Data integrity', value: 'Audit trails · Electronic signatures · Access control' },
                              ].map((item) => (
                                <div key={item.label} className="flex items-start gap-3 px-4 py-3.5 rounded-sm bg-secondary/[0.04] border border-secondary/8">
                                  <FiCheckCircle className="shrink-0 text-accent text-base mt-0.5" />
                                  <div className="flex flex-col gap-0.5 min-w-0">
                                    <span className="font-heading font-extrabold text-[10px] uppercase tracking-[0.1em] text-accent leading-none">{item.label}</span>
                                    <span className="font-body font-semibold text-[13px] text-secondary/80 leading-snug">{item.value}</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Good to know: features */}
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
                              {features.map((f) => (
                                <div key={f.title} className="flex items-start gap-3 px-4 py-3.5 rounded-sm bg-secondary/[0.04] border border-secondary/8">
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
                    <span className="font-body text-body-sm text-secondary/35 font-medium">Installation timelines vary by site</span>
                    <Button variant="primary" size="sm" href="/contact-us">
                      Discuss your project <FiArrowRight className="ml-2" />
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
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  variants={itemVariants}
                  className="group bg-secondary flex flex-col gap-4 p-6 md:p-8 border border-primary/10 hover:bg-primary/[0.03] transition-colors duration-300"
                >
                  <div className="w-10 h-10 bg-primary/[0.06] group-hover:bg-accent/20 rounded-sm flex items-center justify-center transition-colors duration-300">
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
            <SectionHeader eyebrow="Industries served" head="Who we serve" />
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {(data.industries as string[]).map((ind) => (
                <motion.div
                  key={ind}
                  variants={itemVariants}
                  className="group flex flex-col items-center py-6 px-4 border border-secondary/10 rounded-sm hover:border-accent hover:bg-accent/[0.04] transition-all duration-300 cursor-default text-center"
                >
                  <span className="text-[11px] uppercase tracking-[0.1em] text-secondary/60 group-hover:text-secondary leading-tight transition-colors font-heading font-extrabold">
                    {ind}
                  </span>
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
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16"
          >
            {/* Left */}
            <div>
              <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-1.5 block">
                FAQ
              </motion.span>
              <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 leading-tight-none tracking-tighter text-primary pb-1.5 border-b border-primary/10">
                <CharReveal text="Common questions" justify="start" />
              </motion.h2>
            </div>

            {/* Right */}
            <motion.div variants={itemVariants} className="border border-primary/10 overflow-hidden divide-y divide-primary/8">
              {faq.map((item, i) => (
                <div key={i}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200
                      ${openFaq === i ? 'bg-primary/[0.08]' : 'bg-transparent hover:bg-primary/[0.04]'}`}
                  >
                    <span className={`font-heading font-extrabold text-h4 tracking-tight leading-tight transition-colors ${openFaq === i ? 'text-primary' : 'text-primary/70'}`}>
                      {item.q}
                    </span>
                    <span className={`shrink-0 text-sm transition-colors ${openFaq === i ? 'text-accent' : 'text-primary/30'}`}>
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
                  Let's build it
                </motion.span>
                <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter">
                  Need a cold room for your site?
                </motion.h2>
                <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/55 leading-relaxed mt-4 font-medium">
                  Tell us your dimensions, temperature requirements, and timeline.
                </motion.p>
              </div>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Button variant="primary" size="lg" href="/contact-us">
                  Discuss your project <FiArrowRight className="ml-2 text-lg transition-transform group-hover/btn:translate-x-1" />
                </Button>
                <Button variant="secondary" size="lg" href="/store">
                  All storage solutions
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default StoreColdRooms;
