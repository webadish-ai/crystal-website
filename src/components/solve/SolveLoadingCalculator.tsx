import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import CharReveal from '@components/core/CharReveal';

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const CONTAINERS = [
  { id: 'reefer-10',        name: 'Reefer 10ft',          temp_min: -25, temp_max: 25,  volume: 12.15, load_mt: 8,  href: '/store/reefer-containers',      category: 'reefer'       },
  { id: 'reefer-20',        name: 'Reefer 20ft',          temp_min: -25, temp_max: 25,  volume: 28.35, load_mt: 25, href: '/store/reefer-containers',      category: 'reefer'       },
  { id: 'reefer-40',        name: 'Reefer 40ft',          temp_min: -25, temp_max: 25,  volume: 68.46, load_mt: 30, href: '/store/reefer-containers',      category: 'reefer'       },
  { id: 'blast-20',         name: 'Blast Freezer 20ft',   temp_min: -40, temp_max: 0,   volume: 28.35, load_mt: 10, href: '/store/blast-freezer',    category: 'blast'        },
  { id: 'blast-40',         name: 'Blast Freezer 40ft',   temp_min: -40, temp_max: 0,   volume: 68.46, load_mt: 20, href: '/store/blast-freezer',    category: 'blast'        },
  { id: 'super-freezer-20', name: 'Super Freezer 20ft',   temp_min: -70, temp_max: -25, volume: 28.35, load_mt: 10, href: '/store/super-freezer',    category: 'super-freezer'},
  { id: 'super-freezer-40', name: 'Super Freezer 40ft',   temp_min: -70, temp_max: -25, volume: 68.46, load_mt: 20, href: '/store/super-freezer',    category: 'super-freezer'},
  { id: 'superstore-20',    name: 'Super Store 20ft',      temp_min: -30, temp_max: 25,  volume: 28.35, load_mt: 25, href: '/store/super-store',      category: 'superstore'   },
  { id: 'superstore-40',    name: 'Super Store 40ft',      temp_min: -30, temp_max: 25,  volume: 68.46, load_mt: 30, href: '/store/super-store',      category: 'superstore'   },
];

const TEMP_RANGES = [
  { id: 'ambient',    label: 'Ambient / Chilled',    range: '0°C to +25°C',    temp_max: 25,  temp_min: 0,   desc: 'Fresh produce, beverages, ready meals, controlled ambient storage'                      },
  { id: 'frozen',     label: 'Frozen',               range: '−18°C to 0°C',    temp_max: 0,   temp_min: -18, desc: 'Frozen food, dairy, ice cream, meat and seafood storage'                               },
  { id: 'deep-frozen',label: 'Deep Frozen / Blast',  range: '−40°C to −18°C',  temp_max: -18, temp_min: -40, desc: 'Rapid blast freezing, deep frozen seafood, meat, and processed foods'                  },
  { id: 'ultra',      label: 'Ultra Low',            range: '−70°C to −40°C',  temp_max: -40, temp_min: -70, desc: 'Biologics, vaccines, specialty pharma, research and laboratory samples'                },
];

/* ─────────────────────────────────────────────
   CALCULATOR LOGIC
───────────────────────────────────────────── */
function getRecommendations(tempId: string, volumeM3: number): typeof CONTAINERS {
  const temp = TEMP_RANGES.find(t => t.id === tempId);
  if (!temp) return [];
  const suitable = CONTAINERS.filter(c => c.temp_min <= temp.temp_min && c.temp_max >= temp.temp_max);
  const fits = suitable.filter(c => c.volume >= volumeM3).sort((a, b) => a.volume - b.volume);
  return fits.slice(0, 3);
}

/* ─────────────────────────────────────────────
   LOCAL SECTION HEADER
───────────────────────────────────────────── */
const SectionHeader = ({
  eyebrow, head, align = 'left', dark = false,
}: {
  eyebrow?: string; head: string; align?: 'left' | 'center'; dark?: boolean;
}) => (
  <div className={`flex flex-col mb-8 shrink-0 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
    {eyebrow && (
      <motion.span variants={itemVariants} className={`font-body font-bold text-eyebrow uppercase tracking-[0.15em] mb-1.5 block ${dark ? 'text-accent' : 'text-accent'}`}>
        {eyebrow}
      </motion.span>
    )}
    <motion.h2
      variants={itemVariants}
      className={`font-heading font-extrabold text-h2 leading-tight-none tracking-tighter flex flex-col pb-1.5 w-full border-b ${dark ? 'text-primary border-primary/10' : 'text-secondary border-secondary/10'}`}
    >
      <CharReveal text={head} justify={align === 'center' ? 'center' : 'start'} />
    </motion.h2>
  </div>
);

/* ─────────────────────────────────────────────
   CATEGORY LABEL MAP
───────────────────────────────────────────── */
const CATEGORY_LABELS: Record<string, string> = {
  'reefer':        'Reefer',
  'blast':         'Blast Freezer',
  'super-freezer': 'Super Freezer',
  'superstore':    'Super Store',
};

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const SolveLoadingCalculator: React.FC = () => {
  const [selectedTemp, setSelectedTemp] = useState<string | null>(null);
  const [volumeM3,     setVolumeM3]     = useState<number>(10);
  const [results,      setResults]      = useState<typeof CONTAINERS>([]);
  const [hasSearched,  setHasSearched]  = useState(false);

  const handleFind = () => {
    if (!selectedTemp) return;
    setResults(getRecommendations(selectedTemp, volumeM3));
    setHasSearched(true);
  };

  return (
    <div className="w-full bg-primary overflow-x-clip font-body">

      {/* ── HERO ── */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(15,40,84,0.92)_0%,rgba(15,40,84,0.75)_35%,rgba(15,40,84,0.45)_60%,transparent_82%)]" />
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-30"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
            Solve · Loading Calculator
          </motion.span>
          <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter mb-8 text-primary max-w-5xl">
            <CharReveal text="Container Loading Calculator" />
          </h1>
          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <p className="font-body text-body-lg text-primary/80 leading-[1.6] mb-8 font-medium">
              Enter your temperature requirement and cargo volume. Instantly see which Crystal container fits.
            </p>
            <Button variant="primary" size="lg" href="#calculator">
              Jump to calculator <FiArrowRight className="ml-3 text-lg" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── CALCULATOR ── */}
      <section id="calculator" className="bg-primary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <SectionHeader eyebrow="Tool" head={tc('Find your container')} />

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-8 mt-10 items-start">

              {/* LEFT — Inputs */}
              <div>

                {/* Step 1 — Temperature */}
                <div className="border border-secondary/10 rounded-sm overflow-hidden">
                  <div className="px-5 py-4 bg-secondary/[0.02] border-b border-secondary/[0.08]">
                    <span className="font-heading font-extrabold text-[11px] uppercase tracking-[0.15em] text-secondary/50">
                      Step 1 — Temperature Requirement
                    </span>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-2">
                    {TEMP_RANGES.map(t => {
                      const active = selectedTemp === t.id;
                      return (
                        <button
                          key={t.id}
                          onClick={() => setSelectedTemp(t.id)}
                          className={`flex flex-col gap-1.5 p-4 rounded-sm border text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                            ${active
                              ? 'border-accent bg-accent/[0.06]'
                              : 'border-secondary/20 bg-secondary/[0.02] hover:border-secondary/40'}`}
                        >
                          <span className={`font-heading font-extrabold text-[11px] uppercase tracking-[0.1em] ${active ? 'text-accent' : 'text-secondary'}`}>
                            {t.label}
                          </span>
                          <span className="font-body font-bold text-[10px] text-secondary/50">
                            {t.range}
                          </span>
                          <span className="font-body text-[11px] text-secondary/45 leading-snug mt-1">
                            {t.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2 — Volume */}
                <div className="border border-secondary/10 rounded-sm overflow-hidden mt-4">
                  <div className="px-5 py-4 bg-secondary/[0.02] border-b border-secondary/[0.08]">
                    <span className="font-heading font-extrabold text-[11px] uppercase tracking-[0.15em] text-secondary/50">
                      Step 2 — Cargo Volume
                    </span>
                  </div>
                  <div className="p-5">
                    <label className="font-heading font-extrabold text-[11px] uppercase tracking-[0.12em] text-secondary/50 block mb-3">
                      How much cargo do you need to store? (m³)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={200}
                      value={volumeM3}
                      onChange={e => setVolumeM3(Math.max(1, Number(e.target.value)))}
                      className="w-full border border-secondary/20 rounded-sm px-4 py-3 font-heading font-extrabold text-h3 text-secondary text-center bg-primary focus:border-accent focus:outline-none transition-colors"
                    />
                    <p className="font-body text-[11px] text-secondary/35 mt-2">
                      Not sure? 1 standard pallet ≈ 1.5 m³
                    </p>
                    <input
                      type="range"
                      min={1}
                      max={70}
                      value={Math.min(volumeM3, 70)}
                      onChange={e => setVolumeM3(Number(e.target.value))}
                      className="w-full mt-4 accent-amber-400 cursor-pointer"
                    />
                    <div className="flex justify-between font-body text-[10px] text-secondary/30 mt-1">
                      <span>1 m³</span>
                      <span>70 m³</span>
                    </div>
                  </div>
                </div>

                {/* Find button */}
                <button
                  onClick={handleFind}
                  disabled={!selectedTemp}
                  className="w-full mt-4 py-4 bg-secondary text-primary font-heading font-extrabold text-[11px] uppercase tracking-[0.15em] rounded-sm hover:bg-accent transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Find my container →
                </button>
              </div>

              {/* RIGHT — Results */}
              <div>
                <AnimatePresence mode="wait">
                  {hasSearched && (
                    <motion.div
                      key="results"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="border border-secondary/10 rounded-sm overflow-hidden"
                    >
                      {/* Results header */}
                      <div className="px-5 py-4 bg-secondary/[0.02] border-b border-secondary/[0.08]">
                        <span className="font-heading font-extrabold text-[11px] uppercase tracking-[0.15em] text-secondary/50">
                          Recommended Containers
                        </span>
                      </div>

                      {results.length === 0 ? (
                        <div className="p-10 flex flex-col items-center gap-4 text-center">
                          <p className="font-body text-body-md text-secondary/40 leading-relaxed max-w-xs">
                            No containers match your requirements. Please adjust your inputs or contact us directly.
                          </p>
                          <Button variant="primary" size="sm" href="/contact">
                            Contact us <FiArrowRight className="ml-2" />
                          </Button>
                        </div>
                      ) : (
                        <div className="divide-y divide-secondary/[0.08]">
                          {results.map((c, i) => {
                            const fitPct = Math.round((volumeM3 / c.volume) * 100);
                            const barW   = Math.min(100, fitPct);
                            return (
                              <motion.div
                                key={c.id}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.07, duration: 0.3 }}
                                className="p-5 hover:bg-secondary/[0.03] transition-colors"
                              >
                                {/* Category chip */}
                                <span className="px-2 py-0.5 bg-accent/10 text-accent text-[10px] font-heading font-extrabold uppercase tracking-[0.1em] rounded-sm inline-block">
                                  {CATEGORY_LABELS[c.category] ?? c.category}
                                </span>

                                {/* Container name */}
                                <h3 className="font-heading font-extrabold text-h3 text-secondary mt-2 tracking-tight leading-tight">
                                  {c.name}
                                </h3>

                                {/* Capacity bar */}
                                <div className="bg-secondary/[0.08] rounded-sm h-2 mt-3 overflow-hidden">
                                  <div
                                    className="bg-accent rounded-sm h-2 transition-all duration-500"
                                    style={{ width: `${barW}%` }}
                                  />
                                </div>

                                {/* Stats row */}
                                <div className="grid grid-cols-3 gap-3 mt-3">
                                  {[
                                    { value: `${c.volume} m³`, label: 'Volume' },
                                    { value: `${c.load_mt} MT`, label: 'Max load' },
                                    { value: `${fitPct}%`, label: 'Cargo fit' },
                                  ].map(stat => (
                                    <div key={stat.label} className="flex flex-col gap-0.5">
                                      <span className="font-heading font-extrabold text-h4 text-accent leading-tight">
                                        {stat.value}
                                      </span>
                                      <span className="font-body text-[10px] uppercase tracking-[0.1em] text-secondary/45">
                                        {stat.label}
                                      </span>
                                    </div>
                                  ))}
                                </div>

                                {/* Specs link */}
                                <a
                                  href={c.href}
                                  className="inline-flex items-center gap-1.5 mt-4 font-heading font-extrabold text-[11px] uppercase tracking-[0.1em] text-accent hover:text-secondary transition-colors"
                                >
                                  View specs <FiArrowRight className="text-sm" />
                                </a>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}

                      {/* CTA strip */}
                      <div className="bg-secondary/[0.04] border-t border-secondary/[0.08] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <p className="font-body text-body-sm text-secondary/50 leading-snug">
                          Not sure which option is right? Our team helps you choose.
                        </p>
                        <Button variant="primary" size="sm" href="/contact">
                          Talk to our team <FiArrowRight className="ml-2" />
                        </Button>
                      </div>
                    </motion.div>
                  )}

                  {!hasSearched && (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="border border-secondary/10 rounded-sm p-10 flex flex-col items-center justify-center gap-4 text-center min-h-[260px]"
                    >
                      <FiCheckCircle className="text-3xl text-secondary/20" />
                      <p className="font-body text-body-sm text-secondary/30 max-w-[220px] leading-relaxed">
                        Select a temperature range and enter your cargo volume, then click "Find my container."
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <SectionHeader dark eyebrow="How to use this tool" head={tc('Three steps to your container')} />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-primary/5 mt-8">
              {[
                {
                  num: '01',
                  title: 'Select temperature',
                  desc:  'Choose the storage temperature your cargo requires. This filters out unsuitable container types.',
                },
                {
                  num: '02',
                  title: 'Enter volume',
                  desc:  'Enter how many cubic metres of cargo you need to store. We show containers that fit.',
                },
                {
                  num: '03',
                  title: 'Compare & enquire',
                  desc:  'Review the recommendations and click through to full specs. Or call us — we\'ll help you decide.',
                },
              ].map(step => (
                <motion.div
                  key={step.num}
                  variants={itemVariants}
                  className="group bg-secondary flex flex-col gap-4 p-6 md:p-8 border border-primary/10 hover:bg-primary/[0.03] transition-colors duration-300"
                >
                  <span className="font-heading font-extrabold text-[32px] leading-none tracking-tighter text-accent/30 group-hover:text-accent/50 transition-colors duration-300">
                    {step.num}
                  </span>
                  <h3 className="font-heading font-extrabold text-h4 text-primary tracking-tight leading-tight">
                    {step.title}
                  </h3>
                  <p className="font-body text-body-md text-primary/55 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
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
                <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary mb-2 block">
                  Need a custom recommendation?
                </motion.span>
                <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter">
                  Talk to our container specialists.
                </motion.h2>
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

export default SolveLoadingCalculator;
