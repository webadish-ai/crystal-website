import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight, FiDownload,
  FiThermometer, FiActivity, FiShield, FiZap, FiCpu, FiWind,
  FiPackage, FiDroplet, FiStar, FiLayers,
  FiCheckCircle, FiMaximize2, FiPlus, FiMinus,
} from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import portableData from '@data/store-portablecs-all.json';
import CharReveal from '@components/core/CharReveal';
import ImageDialog from './ImageDialog';
import heroImgRaw from '../../data/images/store/superfreezer/superfreezer-hero.png';
const heroImg = typeof heroImgRaw === 'string' ? heroImgRaw : (heroImgRaw as any).src;

const parent   = portableData["06 Store: Portable Cold Storage Containers"];
const d        = parent["06d Store: Super Freezer"];
const heroCtas = d["Hero Page"].CTAS.split(' | ').map((s: string) => s.replace(/\s*[®Â¯]$/, '').trim());
const sLabel   = (key: string) => key.replace(/^S\d+\s+/, '');

/* ─────── SIZE META ─────── */
const sizes = [
  { label: '20 ft', tagline: 'Standard ultra-low', bestFor: 'Pharma, biologics, specialty seafood, research' },
];


/* ─────── SIZE IMAGES ─────── */
const _raw20ft = import.meta.glob<string>(
  '../../data/images/store/superfreezer/20ft/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
  { eager: true, query: '?url', import: 'default' },
);
const imgs20ft = Object.values(_raw20ft);

const sizeImages = [
  {
    main:         imgs20ft[0] ?? '',
    sub:          imgs20ft[1] ?? '',
    cap_metric:   '28.35 m³ · 25 MT',
    cap_imperial: "1,001 ft³ · 27.6 T · 20' × 8' × 8'7\"",
    note:         '−70°C · Standard ultra-low · Most deployed',
    gallery:      imgs20ft,
    pallet:       [] as string[],
  },
];

/* ─────── KEY FEATURES ─────── */
const s2Features: [string, string][] = [
  ['Ultra-Low Temperature',    'Reaches −70°C — the deepest cold available in a portable, plug-and-play format. No civil construction required.'],
  ['Precise Digital Control',  'Digital temperature settings with alarm systems ensure full traceability and compliance for regulated applications.'],
  ['Pharma & Bio Validated',   'Suitable for validated ultra-low temperature storage of biologics, vaccines, and clinical samples. FSSAI-compliant.'],
  ['Rapid Pull-Down',          'High-velocity refrigeration pulls temperatures down from ambient to ultra-low rapidly, protecting product integrity.'],
  ['Energy Efficient',         'Latest compressor technology minimises power consumption without compromising pull-down speed or holding accuracy.'],
  ['SmartArctic Monitoring',   'Remote monitoring tracks temperature, alarms, and performance 24/7 — full visibility from any location.'],
];
const featureIcons: React.ReactNode[] = [
  <FiThermometer />, <FiActivity />, <FiShield />, <FiZap />, <FiWind />, <FiCpu />,
];

/* ─────── INDUSTRIES ─────── */
const industries = [
  { label: 'Pharmaceuticals',  icon: <FiActivity /> },
  { label: 'Biotechnology',    icon: <FiShield /> },
  { label: 'Research & Lab',   icon: <FiCpu /> },
  { label: 'Seafood & Marine', icon: <FiDroplet /> },
  { label: 'Food Processing',  icon: <FiPackage /> },
  { label: 'Hospitality',      icon: <FiStar /> },
];

/* ─────── PRODUCTS STORED ─────── */
const products = [
  { label: 'Biological Samples', icon: <FiShield /> },
  { label: 'Vaccines & Biologics', icon: <FiActivity /> },
  { label: 'Specialty Seafood',   icon: <FiDroplet /> },
  { label: 'Ultra-frozen Meat',   icon: <FiPackage /> },
  { label: 'Clinical Samples',    icon: <FiCpu /> },
  { label: 'Ice Cream & Desserts',icon: <FiLayers /> },
];

/* ─────── ACCORDION SPECS ─────── */
const accordionSpecs = [
  {
    id: 'ext', label: 'External Dimensions',
    cols: ['Length', 'Width', 'Height'],
    metric:   [['6.06 m', '2.44 m', '2.60 m']],
    imperial: [["20'", "8'", "8'7\""]],
    note: 'Measurements are approximate and should be treated as a guide.',
  },
  {
    id: 'int', label: 'Internal Dimensions',
    cols: ['Length', 'Width', 'Height'],
    metric:   [['5.36 m', '2.29 m', '2.31 m']],
    imperial: [["17.6'", "7.5'", "7.6'"]],
    note: 'Measurements are approximate and should be treated as a guide.',
  },
  {
    id: 'weight', label: 'Weight, Area, Capacity',
    cols: ['Tare weight', 'Floor area', 'Capacity'],
    metric:   [['2,770 kg', '12.27 mÂ²', '28.35 m³']],
    imperial: [['6,107 lb', '132.1 ftÂ²', '1,001 ft³']],
    note: 'All measurements should be used as a guide. Small variations can and do apply.',
  },
];

const goodToKnowItems = [
  'Temperature range: +25°C to −70°C',
  'Power supply: 380–460V · 3-Phase',
  'Deepest portable cold available in India',
  'SmartArctic 24/7 remote monitoring',
  'No foundation required — installs on flat ground',
  'Dual machine option available on 40ft',
  'Pharma-grade validated temperature logging',
  'Pan-India delivery and installation',
];

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SECTION HEADER
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
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

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   BENTO IMAGE GRID
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const BentoGrid = ({
  activeSize, unit, onOpenGallery,
}: { activeSize: number; unit: 'metric' | 'imperial'; onOpenGallery: (startIdx?: number) => void }) => {
  const [loadedMap, setLoadedMap] = useState<Record<number, { main?: boolean; sub?: boolean }>>({});
  const mainLoaded = !!(loadedMap[activeSize]?.main);
  const subLoaded  = !!(loadedMap[activeSize]?.sub);
  const mainRef    = useRef<HTMLImageElement>(null);
  const subRef     = useRef<HTMLImageElement>(null);

  const markMain = useCallback(() => setLoadedMap(p => ({ ...p, [activeSize]: { ...p[activeSize], main: true } })), [activeSize]);
  const markSub  = useCallback(() => setLoadedMap(p => ({ ...p, [activeSize]: { ...p[activeSize], sub: true } })), [activeSize]);

  useEffect(() => {
    if (mainRef.current?.complete && mainRef.current.naturalWidth > 0) markMain();
    if (subRef.current?.complete && subRef.current.naturalWidth > 0) markSub();
  }, [activeSize, markMain, markSub]);

  const imgs      = sizeImages[activeSize];
  const sizeLabel = sizes[activeSize].label;
  const cap       = unit === 'metric' ? imgs.cap_metric : imgs.cap_imperial;

  return (
    <AnimatePresence mode="wait">
      <motion.div key={activeSize}
        initial={{ opacity: 0, scale: 0.975 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.975 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        className="flex flex-col gap-2">

        {/* Row 1: main + sub */}
        <div className="grid grid-cols-[2fr_1fr] gap-2 aspect-[16/9] sm:aspect-[3/2]">

          {/* Main */}
          <div className="relative rounded-sm overflow-hidden bg-secondary/10 cursor-pointer group/main" onClick={() => onOpenGallery(0)}>
            <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${mainLoaded ? 'opacity-0' : 'opacity-100'}`}>
              <div className="absolute inset-0 bg-secondary/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent from-[15%] via-accent/[0.22] via-[50%] to-transparent to-[85%] animate-[shimmer_1.6s_ease-in-out_infinite]" />
            </div>
            <img ref={mainRef} key={`main-${activeSize}`} src={imgs.main} alt={`${sizeLabel} super freezer container`}
              loading="eager" decoding="async" onLoad={markMain}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover/main:scale-[1.03] ${mainLoaded ? 'opacity-100' : 'opacity-0'}`} />
            <div className="absolute inset-0 bg-secondary/0 group-hover/main:bg-secondary/40 transition-colors duration-300" />
            <div className="absolute top-3 left-3 bg-secondary/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
              <span className="font-heading font-extrabold text-h3 text-accent tracking-tight leading-none">{sizeLabel}</span>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-secondary/80 to-transparent px-4 py-3">
              <span className="font-heading font-extrabold text-[11px] text-primary/70 uppercase tracking-[0.15em]">+25°C to −70°C</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/main:opacity-100 transition-opacity duration-300">
              <button className="flex items-center gap-2 font-heading font-extrabold text-[11px] uppercase tracking-[0.15em] px-4 py-2.5 bg-accent text-secondary rounded-sm hover:bg-primary hover:text-secondary transition-all"
                onClick={e => { e.stopPropagation(); onOpenGallery(0); }}>
                <FiMaximize2 className="text-sm" /> View all photos
              </button>
            </div>
          </div>

          {/* Sub */}
          <div className="relative rounded-sm overflow-hidden bg-secondary/10 cursor-pointer group/sub" onClick={() => onOpenGallery(1)}>
            <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${subLoaded ? 'opacity-0' : 'opacity-100'}`}>
              <div className="absolute inset-0 bg-secondary/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent from-[15%] via-accent/[0.22] via-[50%] to-transparent to-[85%] animate-[shimmer_1.6s_ease-in-out_infinite_0.4s]" />
            </div>
            <img ref={subRef} key={`sub-${activeSize}`} src={imgs.sub} alt={`${sizeLabel} super freezer interior`}
              loading="eager" decoding="async" onLoad={markSub}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover/sub:scale-[1.03] ${subLoaded ? 'opacity-100' : 'opacity-0'}`} />
            <div className="absolute inset-0 bg-secondary/0 group-hover/sub:bg-secondary/40 transition-colors duration-300" />
            {imgs.gallery.length > 2 && (
              <div className="absolute bottom-2 right-2 bg-secondary/80 backdrop-blur-sm px-2 py-1 rounded-sm">
                <span className="font-body font-bold text-eyebrow text-primary/70 uppercase tracking-[0.1em]">+{imgs.gallery.length - 2} more</span>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: amber info bar */}
        <div className="bg-accent rounded-sm px-5 py-4 flex items-center justify-between gap-4 cursor-pointer group/bar hover:bg-secondary transition-colors duration-300"
          onClick={() => onOpenGallery(0)}>
          <div className="flex flex-col gap-0.5 min-w-0">
            <span className="font-heading font-extrabold text-h4 text-secondary group-hover/bar:text-primary leading-tight tracking-tight truncate transition-colors">{cap}</span>
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.12em] text-secondary/60 group-hover/bar:text-primary/50 transition-colors">{imgs.note}</span>
          </div>
          <div className="shrink-0 w-9 h-9 bg-secondary/10 group-hover/bar:bg-primary/10 rounded-sm flex items-center justify-center transition-colors">
            <FiMaximize2 className="text-secondary group-hover/bar:text-accent transition-colors" />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ACCORDION SECTION
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const AccordionSection: React.FC<{
  spec: (typeof accordionSpecs)[number]; isOpen: boolean; onToggle: () => void;
  unit: 'metric' | 'imperial'; setUnit: (u: 'metric' | 'imperial') => void;
}> = ({ spec, isOpen, onToggle, unit, setUnit }) => {
  const row = (unit === 'metric' ? spec.metric : spec.imperial)[0];
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !sectionRef.current) return;
    const el = sectionRef.current;
    const timer = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const offset = rect.top + window.scrollY - 160;
      if ((window as any).lenis) (window as any).lenis.scrollTo(offset, { duration: 0.7 });
      else window.scrollTo({ top: offset, behavior: 'smooth' });
    }, 280);
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div ref={sectionRef}>
      <button onClick={onToggle}
        className={`w-full flex items-center gap-3.5 px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-accent ${isOpen ? 'bg-secondary' : 'bg-primary hover:bg-secondary/[0.03]'}`}>
        <span className={`shrink-0 text-sm transition-colors ${isOpen ? 'text-accent' : 'text-secondary/35'}`}>
          {isOpen ? <FiMinus /> : <FiPlus />}
        </span>
        <span className={`font-heading font-extrabold text-h4 tracking-tight leading-tight transition-colors ${isOpen ? 'text-primary' : 'text-secondary'}`}>
          {spec.label}
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
            <div className="px-5 pt-4 pb-5 bg-primary border-t border-secondary/8">
              <div className="flex items-center gap-2 mb-4">
                {(['metric', 'imperial'] as const).map(u => (
                  <button key={u} onClick={() => setUnit(u)}
                    className={`px-4 py-1.5 font-heading font-extrabold text-[10px] uppercase tracking-[0.12em] rounded-sm border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${unit === u ? 'bg-secondary text-primary border-secondary' : 'border-secondary/20 text-secondary/40 hover:text-secondary hover:border-secondary/40'}`}>
                    {u === 'metric' ? 'Metric' : 'Imperial'}
                  </button>
                ))}
              </div>
              <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${spec.cols.length}, 1fr)` }}>
                {spec.cols.map((col, j) => (
                  <div key={col} className="flex flex-col gap-1 px-4 py-3 rounded-sm bg-secondary/[0.04] border border-secondary/8">
                    <span className="font-heading font-extrabold text-[10px] uppercase tracking-[0.1em] text-secondary/35">{col}</span>
                    <span className="font-heading font-extrabold text-h4 text-secondary tracking-tight leading-tight">{row[j]}</span>
                  </div>
                ))}
              </div>
              <p className="font-body text-[11px] text-secondary/30 leading-relaxed mt-3">{spec.note}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SPECS TABLE
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const SpecsTable = ({
  unit, setUnit,
}: { unit: 'metric' | 'imperial'; setUnit: (u: 'metric' | 'imperial') => void }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id);

  return (
    <div className="flex flex-col gap-3">
      {/* Size badge */}
      <div className="border border-secondary/10 rounded-sm px-5 py-4 flex items-center gap-3">
        <span className="font-heading font-extrabold text-h2 tracking-tighter leading-none text-accent">20 ft</span>
        <span className="font-body font-bold text-[11px] uppercase tracking-[0.12em] text-secondary/50">Standard ultra-low · +25°C to −70°C</span>
      </div>

      {/* Accordion container */}
      <div className="border border-secondary/10 rounded-sm overflow-hidden flex flex-col divide-y divide-secondary/10">
        <div className="px-5 py-3.5 bg-secondary/[0.02]">
          <span className="font-heading font-extrabold text-h4 text-secondary/50 tracking-tight uppercase text-[11px] tracking-[0.15em]">Specifications</span>
        </div>
        {accordionSpecs.map(spec => (
          <AccordionSection key={spec.id} spec={spec} isOpen={openId === spec.id} onToggle={() => toggle(spec.id)}
            unit={unit} setUnit={setUnit} />
        ))}

        {/* Good to know */}
        <div>
          <button onClick={() => toggle('gtk')}
            className={`w-full flex items-center gap-3.5 px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-accent ${openId === 'gtk' ? 'bg-secondary' : 'bg-primary hover:bg-secondary/[0.03]'}`}>
            <span className={`shrink-0 text-sm ${openId === 'gtk' ? 'text-accent' : 'text-secondary/35'}`}>{openId === 'gtk' ? <FiMinus /> : <FiPlus />}</span>
            <span className={`font-heading font-extrabold text-h4 tracking-tight leading-tight transition-colors ${openId === 'gtk' ? 'text-primary' : 'text-secondary'}`}>Good to know</span>
          </button>
          <AnimatePresence initial={false}>
            {openId === 'gtk' && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
                <div className="px-5 pt-4 pb-5 bg-primary border-t border-secondary/8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {goodToKnowItems.map((item, i) => {
                      const sep = item.indexOf(': ');
                      const label = sep > -1 ? item.slice(0, sep) : null;
                      const value = sep > -1 ? item.slice(sep + 2) : item;
                      return (
                        <div key={i} className="flex items-start gap-3 px-4 py-3.5 rounded-sm bg-secondary/[0.04] border border-secondary/8">
                          <FiCheckCircle className="shrink-0 text-accent text-base mt-0.5" />
                          <div className="flex flex-col gap-0.5 min-w-0">
                            {label && <span className="font-heading font-extrabold text-[10px] uppercase tracking-[0.1em] text-accent leading-none">{label}</span>}
                            <span className="font-body font-semibold text-[13px] text-secondary/80 leading-snug">{value}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="px-5 py-4 flex items-center justify-between gap-4 flex-wrap bg-primary">
          <span className="font-body text-body-sm text-secondary/35 font-medium">Rent or buy · Pan-India delivery</span>
          <Button variant="primary" size="sm" href="/contact-us">Get a quote <FiArrowRight className="ml-2" /></Button>
        </div>
      </div>
    </div>
  );
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PAGE
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const StoreSuperFreezer: React.FC = () => {
  const heroLines = d["Hero Page"].HEADLINE.split('. ');
  const [unit,    setUnit]    = useState<'metric' | 'imperial'>('metric');
  const [gallery, setGallery] = useState<{ open: boolean; startIdx: number }>({ open: false, startIdx: 0 });

  const openGallery  = useCallback((startIdx = 0) => setGallery({ open: true, startIdx }), []);
  const closeGallery = useCallback(() => setGallery({ open: false, startIdx: 0 }), []);

  return (
    <div className="w-full bg-primary overflow-x-clip font-body">

      {/* ── HERO ── */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary text-primary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <img
          src={heroImg}
          alt={d["Hero Page"].EYEBROW}
          loading="eager" decoding="async"
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(15,40,84,0.9)_0%,rgba(15,40,84,0.7)_30%,rgba(15,40,84,0.35)_55%,transparent_78%)]" />
        <motion.div className="container mx-auto max-w-[var(--max-width)] relative z-30" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
            {d["Hero Page"].EYEBROW}
          </motion.span>
          <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter mb-8 text-primary max-w-5xl">
            <CharReveal text={tc(heroLines[0] + '.')} />
            {heroLines.length > 1 && <CharReveal text={tc(heroLines.slice(1).join('. '))} className="text-accent" />}
          </h1>
          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <div className="font-body text-body-lg text-primary/80 leading-[1.6] mb-8 font-medium" dangerouslySetInnerHTML={{ __html: d["Hero Page"].SUBHEADLINE }} />
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/contact-us">{heroCtas[0]} <FiArrowRight className="text-lg" /></Button>
              <Button variant="ghost" size="lg" href="/contact-us">{heroCtas[1]} <FiDownload className="text-lg" /></Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SPECIFICATIONS ── */}
      <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              <motion.div variants={itemVariants} className="order-2 lg:order-1 lg:sticky lg:top-24 lg:self-start">
                <BentoGrid activeSize={0} unit={unit} onOpenGallery={openGallery} />
              </motion.div>
              <motion.div variants={itemVariants} className="order-1 lg:order-2">
                <SpecsTable unit={unit} setUnit={setUnit} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── KEY FEATURES ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <SectionHeader dark eyebrow="What's included" head={tc(sLabel('S1 Specifications'))}
              desc="Every Crystal super freezer ships ready to operate — plug in, cool down, store." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-primary/5 mt-2">
              {s2Features.map(([title, desc], i) => (
                <motion.div key={title} variants={itemVariants}
                  className="group bg-secondary flex flex-col gap-4 p-6 md:p-8 border border-primary/10 hover:bg-primary/[0.03] transition-colors duration-300">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/[0.06] group-hover:bg-accent/20 text-accent rounded-sm transition-colors duration-300">
                    <span className="text-xl">{featureIcons[i]}</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-h4 text-primary tracking-tight leading-tight">{title}</h3>
                  <div className="font-body text-body-md text-primary/55 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: desc }} />
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
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <SectionHeader eyebrow="Who uses super freezers" head="Industries served" />
              <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/50 leading-relaxed max-w-sm md:text-right shrink-0 mb-8">
                From clinical research to ultra-frozen seafood — −70°C cold where it matters most.
              </motion.p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {industries.map(({ label, icon }) => (
                <motion.div key={label} variants={itemVariants}
                  className="group flex flex-col items-center gap-3 py-6 px-4 border border-secondary/10 rounded-sm hover:border-accent hover:bg-accent/[0.04] transition-all duration-300 cursor-default text-center">
                  <div className="text-secondary/30 group-hover:text-accent text-2xl transition-colors duration-300">{icon}</div>
                  <span className="font-heading font-extrabold text-[11px] uppercase tracking-[0.1em] text-secondary/60 group-hover:text-secondary leading-tight transition-colors">{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PRODUCTS STORED ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={containerVariants}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
              <SectionHeader dark eyebrow="What we store" head="Products stored" />
              <motion.p variants={itemVariants} className="font-body text-body-lg text-primary/70 leading-relaxed max-w-sm md:text-right shrink-0 mb-8">
                Anything requiring the deepest cold — biological, pharmaceutical, or food-grade.
              </motion.p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {products.map(({ label, icon }, i) => (
                <motion.div key={label} variants={itemVariants} transition={{ delay: i * 0.04 }}
                  className="group flex flex-col items-start gap-5 p-6 rounded-sm border border-primary/15 bg-primary/[0.06] transition-all duration-300 cursor-default hover:-translate-y-1 hover:bg-primary/[0.10] hover:border-accent/50">
                  <div className="w-11 h-11 flex items-center justify-center rounded-sm bg-accent/[0.10] group-hover:bg-accent/25 text-accent text-2xl transition-colors duration-300">{icon}</div>
                  <p className="font-heading font-extrabold text-body-lg tracking-normal leading-snug text-primary group-hover:text-accent transition-colors duration-300">{label}</p>
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
                <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary mb-2 block">Need ultra-low temperature storage?</motion.span>
                <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter">Get a super freezer at your site.</motion.h2>
                <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/55 leading-relaxed mt-4 font-medium">Down to −70°C. Delivered and installed pan-India. Enquire for pricing and availability.</motion.p>
              </div>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Button variant="primary" size="lg" href="/contact-us">Request a quote <FiArrowRight className="ml-2 text-lg" /></Button>
                <Button variant="secondary" size="lg" href="/contact-us">Download brochure <FiDownload className="ml-2 text-lg" /></Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── IMAGE DIALOG ── */}
      <AnimatePresence>
        {gallery.open && (
          <ImageDialog key="gallery-dialog"
            productName="Super Freezer Container"
            sizes={sizes} sizeImages={sizeImages}
            activeSize={0} setActiveSize={() => {}}
            startIndex={gallery.startIdx} onClose={closeGallery} />
        )}
      </AnimatePresence>

    </div>
  );
};

export default StoreSuperFreezer;
