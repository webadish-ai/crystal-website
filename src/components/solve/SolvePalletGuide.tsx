import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiPlus, FiMinus } from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import CharReveal from '@components/core/CharReveal';
import palletData from '@data/solve-pallet-guides.json';

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface SizeData {
  size: string;
  tagline: string;
  internal: string;
  floor_area: string;
  volume: string;
  max_load: string;
  euro_pallets: number;
  standard_pallets: number;
  trolleys: number;
  pallet_image?: string;
  trolley_image?: string;
}

interface ProductData {
  product: string;
  eyebrow: string;
  tagline: string;
  temp_range: string;
  sizes: SizeData[];
  notes: string[];
}

interface Props {
  productKey: 'reefer' | 'blast-freezer' | 'super-freezer' | 'superstore';
}

/* ─────────────────────────────────────────────
   REEFER PALLET IMAGES
───────────────────────────────────────────── */
const _rawPallet = import.meta.glob<string>(
  '../../data/images/store/reefer/pallet/**/*.{webp,jpg,png}',
  { eager: true, query: '?url', import: 'default' },
);

const palletImgMap: Record<string, string> = {};
Object.entries(_rawPallet).forEach(([path, url]) => {
  const filename = path.split('/').pop() || '';
  palletImgMap[filename] = url;
});

const reeferPalletImages: Record<string, { pallet: string; trolley: string }> = {
  '10 ft': {
    pallet:  palletImgMap['reefer_10ft_Pallets.webp']    || '',
    trolley: palletImgMap['reefer_10ft_trolley.webp']    || '',
  },
  '20 ft': {
    pallet:  palletImgMap['reefer_20ft_Pallets-1.webp']  || '',
    trolley: palletImgMap['reefer-20ft-trolley-1.webp']  || '',
  },
  '40 ft': {
    pallet:  palletImgMap['reefer_40ft_Pallets.webp']    || '',
    trolley: palletImgMap['reefer-40ft-trolley.webp']    || '',
  },
};

/* ─────────────────────────────────────────────
   PALLET LOADING GUIDE CARDS (bottom section)
───────────────────────────────────────────── */
const guideCards = [
  {
    num: '01',
    title: 'Euro Pallet (1,200 × 800 mm)',
    desc: 'Standard European pallet. Common in pharma, FMCG, and dairy supply chains.',
  },
  {
    num: '02',
    title: 'Standard Pallet (1,200 × 1,000 mm)',
    desc: 'UK/Indian standard pallet. Widely used in food processing and logistics.',
  },
  {
    num: '03',
    title: 'Stacking',
    desc: 'Single-layer counts shown. Double-stacking possible where cargo height and weight permit.',
  },
  {
    num: '04',
    title: 'Loading Method',
    desc: 'Side-loading via forklift or pallet truck. Ramp access available on reefer containers.',
  },
];

/* ─────────────────────────────────────────────
   ACCORDION SECTION
───────────────────────────────────────────── */
const AccordionSection: React.FC<{
  id: string;
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}> = ({ label, isOpen, onToggle, children }) => (
  <div>
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-3.5 px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-accent
        ${isOpen ? 'bg-secondary' : 'bg-primary hover:bg-secondary/[0.03]'}`}
    >
      <span className={`shrink-0 text-sm transition-colors ${isOpen ? 'text-accent' : 'text-secondary/35'}`}>
        {isOpen ? <FiMinus /> : <FiPlus />}
      </span>
      <span className={`font-heading font-extrabold text-h4 tracking-tight leading-tight transition-colors
        ${isOpen ? 'text-primary' : 'text-secondary'}`}>
        {label}
      </span>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="overflow-hidden"
        >
          <div className="px-5 pt-4 pb-5 bg-primary border-t border-secondary/[0.08]">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
const SolvePalletGuide: React.FC<Props> = ({ productKey }) => {
  const d = palletData[productKey as keyof typeof palletData] as ProductData;

  const defaultSize = productKey === 'reefer' ? 1 : 0;
  const [activeSize, setActiveSize] = useState<number>(defaultSize);
  const [openSpec, setOpenSpec]     = useState<string | null>(null);

  const toggleSpec = (id: string) => setOpenSpec(prev => (prev === id ? null : id));

  const size = d.sizes[activeSize];

  /* Determine the number of cols for the size cards grid */
  const colsClass =
    d.sizes.length === 2 ? 'grid-cols-2' :
    d.sizes.length === 3 ? 'grid-cols-3' :
    d.sizes.length === 4 ? 'grid-cols-2 sm:grid-cols-4' :
    'grid-cols-2 sm:grid-cols-3';

  /* Resolve pallet/trolley images for reefer */
  const reeferImgs = productKey === 'reefer' ? reeferPalletImages[size.size] : null;
  const hasPalletImg = !!(reeferImgs?.pallet);
  const hasTrolleyImg = !!(reeferImgs?.trolley);
  const showImageGrid = productKey === 'reefer' && (hasPalletImg || hasTrolleyImg);

  return (
    <div className="w-full bg-primary overflow-x-clip font-body">

      {/* ── HERO ── */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(15,40,84,0.92)_0%,rgba(15,40,84,0.75)_35%,rgba(15,40,84,0.4)_60%,transparent_82%)]" />
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-30"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
            {d.eyebrow}
          </motion.span>
          <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter mb-8 text-primary max-w-5xl">
            <CharReveal text={d.product} />
          </h1>
          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <p className="font-body text-body-lg text-primary/80 leading-[1.6] mb-4 font-medium">
              {d.tagline}
            </p>
            <span className="inline-block border border-accent text-accent font-heading font-extrabold text-[11px] uppercase tracking-[0.15em] px-4 py-2 rounded-sm mb-8">
              {d.temp_range}
            </span>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/contact">
                Request a quote <FiArrowRight className="ml-2 text-lg" />
              </Button>
              <Button variant="ghost" size="lg" href="/contact">
                Download brochure
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── MAIN: SIZE SELECTOR + SPECS ── */}
      <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={containerVariants}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">

              {/* LEFT: image / placeholder + amber info bar — sticky on desktop */}
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
                    {showImageGrid ? (
                      /* 2-image grid for reefer */
                      <div className="grid grid-cols-[2fr_1fr] gap-2 aspect-[4/3]">
                        {/* Main: pallet layout */}
                        <div className="relative rounded-sm overflow-hidden bg-secondary/10 cursor-pointer">
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={`pallet-${activeSize}`}
                              src={reeferImgs!.pallet}
                              alt={`${size.size} pallet layout`}
                              loading="eager"
                              decoding="async"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.4 }}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </AnimatePresence>
                        </div>
                        {/* Sub: trolley */}
                        <div className="relative rounded-sm overflow-hidden bg-secondary/10">
                          <AnimatePresence mode="wait">
                            <motion.img
                              key={`trolley-${activeSize}`}
                              src={reeferImgs!.trolley}
                              alt={`${size.size} trolley layout`}
                              loading="eager"
                              decoding="async"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.4 }}
                              className="absolute inset-0 w-full h-full object-cover"
                            />
                          </AnimatePresence>
                        </div>
                      </div>
                    ) : (
                      /* Placeholder for non-reefer products */
                      <div className="aspect-[4/3] bg-secondary rounded-sm flex flex-col items-center justify-center gap-4 p-8">
                        <span className="font-heading font-extrabold text-[5rem] text-accent leading-none">
                          {size.euro_pallets}
                        </span>
                        <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-primary/40">
                          Euro pallets
                        </span>
                      </div>
                    )}

                    {/* Amber info bar */}
                    <div className="bg-accent rounded-sm px-5 py-4">
                      <h4 className="font-heading font-extrabold text-h4 text-secondary leading-tight tracking-tight">
                        {size.euro_pallets} Euro · {size.standard_pallets} Standard · {size.trolleys} Trolleys
                      </h4>
                      <span className="font-body font-bold text-eyebrow uppercase tracking-[0.12em] text-secondary/60">
                        {size.size} · {size.floor_area} floor
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              {/* RIGHT: controls + specs */}
              <motion.div variants={itemVariants} className="order-1 lg:order-2 flex flex-col gap-3">

                {/* Size cards */}
                <div className={`border border-secondary/10 rounded-sm p-4 grid ${colsClass} gap-2`}>
                  {d.sizes.map((s, i) => (
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
                      <span className="font-body font-bold text-[10px] uppercase tracking-[0.12em] leading-tight text-secondary/50">
                        {s.tagline}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Pallet counts card */}
                <div className="border border-secondary/10 rounded-sm overflow-hidden">
                  <div className="px-5 py-3.5 bg-secondary/[0.02]">
                    <span className="font-heading font-extrabold text-[11px] uppercase tracking-[0.15em] text-secondary/50">
                      Pallet Capacity
                    </span>
                  </div>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeSize}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="p-5 grid grid-cols-3 divide-x divide-secondary/10"
                    >
                      {[
                        { value: size.euro_pallets,     label: 'Euro Pallets'     },
                        { value: size.standard_pallets, label: 'Standard Pallets' },
                        { value: size.trolleys,         label: 'Trolleys'         },
                      ].map(({ value, label }) => (
                        <div key={label} className="flex flex-col items-center justify-center gap-1.5 px-4">
                          <span className="font-heading font-extrabold text-h1 text-accent leading-none">
                            {value}
                          </span>
                          <span className="font-body font-bold text-[10px] uppercase tracking-[0.12em] text-secondary/50 text-center leading-tight">
                            {label}
                          </span>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Specs accordion */}
                <div className="border border-secondary/10 rounded-sm overflow-hidden flex flex-col divide-y divide-secondary/10">

                  {/* Header */}
                  <div className="px-5 py-3.5 bg-secondary/[0.02]">
                    <span className="font-heading font-extrabold text-[11px] uppercase tracking-[0.15em] text-secondary/50">
                      Container Specifications
                    </span>
                  </div>

                  {/* Dimensions accordion */}
                  <AccordionSection
                    id="dimensions"
                    label="Dimensions"
                    isOpen={openSpec === 'dimensions'}
                    onToggle={() => toggleSpec('dimensions')}
                  >
                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="border-b border-secondary/10">
                            {['Size', 'Internal', 'Floor Area', 'Volume'].map((col, j) => (
                              <th
                                key={col}
                                className={`pb-2.5 pt-1 font-heading font-extrabold text-[10px] uppercase tracking-[0.1em] text-secondary/35
                                  ${j === 0 ? 'pr-6 w-[22%]' : 'pr-4'}`}
                              >
                                {col}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-secondary/[0.08]">
                          {d.sizes.map((s, i) => (
                            <tr key={s.size} className={`transition-colors duration-300 ${i === activeSize ? 'bg-accent/[0.06]' : ''}`}>
                              <td className={`py-3 font-heading font-extrabold text-h4 tracking-tight leading-tight text-accent pr-6 transition-colors duration-300
                                ${i === activeSize ? 'pl-3 border-l-2 border-accent' : 'pl-0'}`}>
                                {s.size}
                              </td>
                              <td className={`py-3 font-heading font-extrabold text-h4 tracking-tight leading-tight pr-4 transition-colors duration-300
                                ${i === activeSize ? 'text-secondary' : 'text-secondary/45'}`}>
                                {s.internal}
                              </td>
                              <td className={`py-3 font-heading font-extrabold text-h4 tracking-tight leading-tight pr-4 transition-colors duration-300
                                ${i === activeSize ? 'text-secondary' : 'text-secondary/45'}`}>
                                {s.floor_area}
                              </td>
                              <td className={`py-3 font-heading font-extrabold text-h4 tracking-tight leading-tight pr-4 transition-colors duration-300
                                ${i === activeSize ? 'text-secondary' : 'text-secondary/45'}`}>
                                {s.volume}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </AccordionSection>

                  {/* Good to know accordion */}
                  <AccordionSection
                    id="gtk"
                    label="Good to know"
                    isOpen={openSpec === 'gtk'}
                    onToggle={() => toggleSpec('gtk')}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {d.notes.map((note, i) => {
                        const sep   = note.indexOf(': ');
                        const label = sep > -1 ? note.slice(0, sep) : null;
                        const value = sep > -1 ? note.slice(sep + 2) : note;
                        return (
                          <div key={i} className="flex items-start gap-3 px-4 py-3.5 rounded-sm bg-secondary/[0.04] border border-secondary/[0.08]">
                            <FiCheckCircle className="shrink-0 text-accent text-base mt-0.5" />
                            <div className="flex flex-col gap-0.5 min-w-0">
                              {label && (
                                <span className="font-heading font-extrabold text-[10px] uppercase tracking-[0.1em] text-accent leading-none">
                                  {label}
                                </span>
                              )}
                              <span className="font-body font-semibold text-[13px] text-secondary/80 leading-snug">
                                {value}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionSection>

                  {/* CTA row */}
                  <div className="px-5 py-4 flex items-center justify-between gap-4 flex-wrap bg-primary">
                    <span className="font-body text-body-sm text-secondary/35 font-medium">
                      Pan-India delivery · Rent or buy
                    </span>
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

      {/* ── PALLET LOADING GUIDE ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={containerVariants}
          >
            {/* Section header */}
            <div className="flex flex-col mb-8 shrink-0 items-start text-left">
              <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] mb-1.5 block text-accent">
                What to know
              </motion.span>
              <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 leading-tight-none tracking-tighter flex flex-col pb-1.5 w-full border-b text-primary border-primary/10">
                <CharReveal text={tc('Pallet Loading Guide')} justify="start" />
              </motion.h2>
              <motion.p variants={itemVariants} className="font-body text-body-lg leading-relaxed max-w-2xl mt-4 text-primary/60">
                These figures show the maximum indicative pallet count per container size. Actual capacity depends on pallet height, cargo weight, and stacking configuration.
              </motion.p>
            </div>

            {/* Guide cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-primary/5 mt-8">
              {guideCards.map(({ num, title, desc }) => (
                <motion.div
                  key={num}
                  variants={itemVariants}
                  className="group bg-secondary flex flex-col gap-4 p-6 md:p-8 border border-primary/10 hover:bg-primary/[0.03] transition-colors duration-300"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/[0.06] group-hover:bg-accent/20 text-accent rounded-sm transition-colors duration-300">
                    <span className="font-heading font-extrabold text-[11px] tracking-[0.1em]">{num}</span>
                  </div>
                  <h4 className="font-heading font-extrabold text-h4 text-primary tracking-tight leading-tight">
                    {title}
                  </h4>
                  <p className="font-body text-body-md text-primary/55 leading-relaxed font-medium">
                    {desc}
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
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            variants={containerVariants}
          >
            <div className="border border-secondary/10 rounded-sm p-6 sm:p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
              <div className="max-w-xl">
                <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary mb-2 block">
                  Need help choosing?
                </motion.span>
                <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter">
                  Talk to our container specialists.
                </motion.h2>
                <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/55 leading-relaxed mt-4 font-medium">
                  Tell us your cargo type, volume, and site. We'll recommend the right configuration.
                </motion.p>
              </div>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Button variant="primary" size="lg" href="/contact">
                  Request a quote <FiArrowRight className="ml-2 text-lg" />
                </Button>
                <Button variant="secondary" size="lg" href="/solve/loading-calculator">
                  Loading Calculator
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default SolvePalletGuide;
