import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight, FiDownload,
  FiLayers, FiZap, FiThermometer, FiShield, FiCpu, FiPackage,
  FiActivity, FiDroplet, FiSun, FiStar, FiGrid,
  FiCheckCircle, FiMaximize2, FiPlus, FiMinus,
} from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import portableData from '@data/store-portablecs-all.json';
import CharReveal from '@components/core/CharReveal';
import ImageDialog from './ImageDialog';
import heroImgRaw from '../../data/images/store/superstore/superstore-hero.png';
const heroImg = typeof heroImgRaw === 'string' ? heroImgRaw : (heroImgRaw as any).src;

const parent   = portableData["06 Store: Portable Cold Storage Containers"];
const d        = parent["06c Store: Super Store"];
const heroCtas = d["Hero Page"].CTAS.split(' | ').map((s: string) => s.replace(/\s*[®Â¯]$/, '').trim());
const sLabel   = (key: string) => key.replace(/^S\d+\s+/, '');

/* ─────── BAY IMAGES ─────── */
const _raw2Bay = import.meta.glob<string>(
  '../../data/images/store/superstore/2Bay/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
  { eager: true, query: '?url', import: 'default' },
);
const _raw3Bay = import.meta.glob<string>(
  '../../data/images/store/superstore/3Bay/*.{jpg,jpeg,png,JPG,JPEG,PNG,webp,WEBP}',
  { eager: true, query: '?url', import: 'default' },
);
const _raw4Bay = import.meta.glob<string>(
  '../../data/images/store/superstore/4Bay/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
  { eager: true, query: '?url', import: 'default' },
);
const _raw6Bay = import.meta.glob<string>(
  '../../data/images/store/superstore/6Bay/*.{jpg,jpeg,png,JPG,JPEG,PNG}',
  { eager: true, query: '?url', import: 'default' },
);
const imgs2Bay = Object.values(_raw2Bay);
const imgs3Bay = Object.values(_raw3Bay);
const imgs4Bay = Object.values(_raw4Bay);
const imgs6Bay = Object.values(_raw6Bay);

/* ─────── SIZE META ─────── */
const sizes = [
  { label: '20 ft', tagline: 'Standard config',  bestFor: 'Mid-size operations, overflow storage, events & exhibitions' },
  { label: '40 ft', tagline: 'High capacity',     bestFor: 'Large processing volumes, distribution centres, long-term deployment' },
];

/* ─────── SIZE IMAGES ─────── */
const sizeImages = [
  {
    main:         imgs2Bay[0] ?? '',
    sub:          imgs3Bay[0] ?? '',
    cap_metric:   '66.4 m³ · 2-bay baseline',
    cap_imperial: "2,346 ft³ · 20' × 8' × 8'7\"",
    note:         '+25°C to −25°C · Scales to 10 bays · 332 m³ max',
    gallery:      [...imgs2Bay, ...imgs3Bay],
    pallet:       [] as string[],
  },
  {
    main:         imgs6Bay[0] ?? '',
    sub:          imgs4Bay[0] ?? '',
    cap_metric:   '135 m³ · 2-bay baseline',
    cap_imperial: "4,767 ft³ · 40' × 8' × 9'6\"",
    note:         '+25°C to −25°C · Scales to 10 bays · 675 m³ max',
    gallery:      [...imgs4Bay, ...imgs6Bay],
    pallet:       [] as string[],
  },
];

/* ─────── KEY FEATURES (from website) ─────── */
const s2Features: [string, string][] = [
  ['Multi-Bay Design',              'Two to ten separate compartments allow simultaneous storage of different product types — all in one footprint.'],
  ['Independent Temperature Control','Each bay operates separately, +25°C to −25°C per bay. Run frozen and chilled zones simultaneously.'],
  ['High Insulation',               'Superior panel insulation minimises heat exchange, reducing energy consumption while maintaining stable temperatures.'],
  ['Easy Accessibility',            'Wide door openings with optional loading ramps for convenient access — no specialised handling equipment needed.'],
  ['Customizable Interiors',        'Full stainless steel lining tailored to specific storage requirements. FSSAI and pharma-GMP compliant.'],
  ['SmartArctic Monitoring',        'Remote monitoring tracks temperature, alarms, and performance 24/7 — full visibility across all bays from anywhere.'],
];
const featureIcons: React.ReactNode[] = [
  <FiLayers />, <FiThermometer />, <FiShield />, <FiZap />, <FiCpu />, <FiPackage />,
];

/* ─────── INDUSTRIES ─────── */
const industries = [
  { label: 'Food & Beverage',   icon: <FiPackage /> },
  { label: 'Pharmaceuticals',   icon: <FiActivity /> },
  { label: 'Biotechnology',     icon: <FiShield /> },
  { label: 'Hospitality',       icon: <FiStar /> },
  { label: 'Research & Lab',    icon: <FiCpu /> },
  { label: 'Dairy',             icon: <FiDroplet /> },
];

/* ─────── PRODUCTS STORED ─────── */
const products = [
  { label: 'Fruits & Vegetables', icon: <FiSun /> },
  { label: 'Dairy Products',      icon: <FiDroplet /> },
  { label: 'Beverages',           icon: <FiDroplet /> },
  { label: 'Meat & Seafood',      icon: <FiPackage /> },
  { label: 'Ready Meals',         icon: <FiLayers /> },
  { label: 'Pharmaceuticals',     icon: <FiActivity /> },
  { label: 'Frozen Foods',        icon: <FiZap /> },
  { label: 'Confectionery',       icon: <FiStar /> },
];

/* ─────── ACCORDION SPECS ─────── */
const accordionSpecs = [
  {
    id: 'ext', label: 'External Dimensions',
    cols: ['Size', 'Length', 'Width', 'Height'],
    metric:   [['20 ft','6.06 m', '2.44 m','2.60 m'],['40 ft','12.19 m','2.44 m','2.90 m']],
    imperial: [['20 ft',"20'",    "8'",    "8'7\""], ['40 ft',"40'",    "8'",    "9'6\"" ]],
    note: 'Measurements are for the base single-unit container.',
  },
  {
    id: 'int', label: 'Internal Dimensions',
    cols: ['Size', 'Length', 'Width', 'Height'],
    metric:   [['20 ft','5.44 m', '2.29 m','2.26 m'],['40 ft','11.26 m','2.29 m','2.57 m']],
    imperial: [['20 ft',"17.8'",  "7.5'",  "7.4'"], ['40 ft',"36.9'",  "7.5'",  "8.4'"  ]],
    note: 'Measurements are for the base single-unit container.',
  },
];

/* ─────── BAY CONFIGURATION DATA (all 9 configs · verbatim from crystalgroup.in/super-store-reefer) ─────── */
type BayRow = { bays: string; width: string; floor: string; vol: string; weight: string };
type BaySizeData = { metric: BayRow[]; imperial: BayRow[] };

const bayData: Record<'20ft' | '40ft', BaySizeData> = {
  '20ft': {
    metric: [
      { bays: '2-bay',  width: '4.89 m',  floor: '27 mÂ²',     vol: '66.4 m³',   weight: '6,000 kg'  },
      { bays: '3-bay',  width: '7.35 m',  floor: '40.5 mÂ²',   vol: '99.6 m³',   weight: '9,000 kg'  },
      { bays: '4-bay',  width: '9.81 m',  floor: '54 mÂ²',     vol: '132.8 m³',  weight: '12,000 kg' },
      { bays: '5-bay',  width: '12.27 m', floor: '67.5 mÂ²',   vol: '166 m³',    weight: '15,000 kg' },
      { bays: '6-bay',  width: '14.72 m', floor: '81 mÂ²',     vol: '199.2 m³',  weight: '18,000 kg' },
      { bays: '7-bay',  width: '17.18 m', floor: '94.5 mÂ²',   vol: '232.4 m³',  weight: '21,000 kg' },
      { bays: '8-bay',  width: '19.64 m', floor: '108 mÂ²',    vol: '265.6 m³',  weight: '24,000 kg' },
      { bays: '9-bay',  width: '22.10 m', floor: '121.5 mÂ²',  vol: '298.8 m³',  weight: '27,000 kg' },
      { bays: '10-bay', width: '24.53 m', floor: '135 mÂ²',    vol: '332 m³',    weight: '30,000 kg' },
    ],
    imperial: [
      { bays: '2-bay',  width: '16.04 ft', floor: '290.5 ftÂ²',   vol: '2,345 ft³',  weight: '13,228 lb' },
      { bays: '3-bay',  width: '24.11 ft', floor: '435.8 ftÂ²',   vol: '3,518 ft³',  weight: '19,842 lb' },
      { bays: '4-bay',  width: '32.18 ft', floor: '581 ftÂ²',     vol: '4,691 ft³',  weight: '26,455 lb' },
      { bays: '5-bay',  width: '40.25 ft', floor: '726.3 ftÂ²',   vol: '5,863 ft³',  weight: '33,069 lb' },
      { bays: '6-bay',  width: '48.29 ft', floor: '871.5 ftÂ²',   vol: '7,036 ft³',  weight: '39,683 lb' },
      { bays: '7-bay',  width: '56.36 ft', floor: '1,016.8 ftÂ²', vol: '8,209 ft³',  weight: '46,297 lb' },
      { bays: '8-bay',  width: '64.43 ft', floor: '1,162 ftÂ²',   vol: '9,381 ft³',  weight: '52,911 lb' },
      { bays: '9-bay',  width: '72.50 ft', floor: '1,307.3 ftÂ²', vol: '10,554 ft³', weight: '59,525 lb' },
      { bays: '10-bay', width: '80.47 ft', floor: '1,452.5 ftÂ²', vol: '11,727 ft³', weight: '66,139 lb' },
    ],
  },
  '40ft': {
    metric: [
      { bays: '2-bay',  width: '4.89 m',  floor: '53 mÂ²',     vol: '135 m³',    weight: '9,600 kg'  },
      { bays: '3-bay',  width: '7.35 m',  floor: '79.5 mÂ²',   vol: '202.5 m³',  weight: '14,400 kg' },
      { bays: '4-bay',  width: '9.81 m',  floor: '106 mÂ²',    vol: '270 m³',    weight: '19,200 kg' },
      { bays: '5-bay',  width: '12.27 m', floor: '132.5 mÂ²',  vol: '337.5 m³',  weight: '24,000 kg' },
      { bays: '6-bay',  width: '14.72 m', floor: '159 mÂ²',    vol: '405 m³',    weight: '28,800 kg' },
      { bays: '7-bay',  width: '17.18 m', floor: '185.5 mÂ²',  vol: '472.5 m³',  weight: '33,600 kg' },
      { bays: '8-bay',  width: '19.64 m', floor: '212 mÂ²',    vol: '540 m³',    weight: '38,400 kg' },
      { bays: '9-bay',  width: '22.10 m', floor: '238.5 mÂ²',  vol: '607.5 m³',  weight: '43,200 kg' },
      { bays: '10-bay', width: '24.63 m', floor: '265 mÂ²',    vol: '675 m³',    weight: '48,000 kg' },
    ],
    imperial: [
      { bays: '2-bay',  width: '16.04 ft', floor: '570.5 ftÂ²',   vol: '4,767 ft³',  weight: '21,164 lb' },
      { bays: '3-bay',  width: '24.11 ft', floor: '855.8 ftÂ²',   vol: '7,151 ft³',  weight: '31,747 lb' },
      { bays: '4-bay',  width: '32.18 ft', floor: '1,141 ftÂ²',   vol: '9,535 ft³',  weight: '42,329 lb' },
      { bays: '5-bay',  width: '40.25 ft', floor: '1,426.3 ftÂ²', vol: '11,919 ft³', weight: '52,911 lb' },
      { bays: '6-bay',  width: '48.29 ft', floor: '1,711.5 ftÂ²', vol: '14,302 ft³', weight: '63,493 lb' },
      { bays: '7-bay',  width: '56.36 ft', floor: '1,996.8 ftÂ²', vol: '16,686 ft³', weight: '74,075 lb' },
      { bays: '8-bay',  width: '64.43 ft', floor: '2,282 ftÂ²',   vol: '19,070 ft³', weight: '84,658 lb' },
      { bays: '9-bay',  width: '72.50 ft', floor: '2,567.3 ftÂ²', vol: '21,454 ft³', weight: '95,240 lb' },
      { bays: '10-bay', width: '80.47 ft', floor: '2,852.5 ftÂ²', vol: '23,837 ft³', weight: '105,822 lb'},
    ],
  },
};

const goodToKnowItems = [
  'Temperature range: +25°C to −25°C',
  'Multi-bay: 2 to 10 bays per configuration',
  'Power supply: 380–460V · 3-Phase',
  'Modular — add bays as your business grows',
  'No civil construction required',
  'Relocatable as your needs change',
  'FSSAI-compliant stainless steel interior',
  'Independent temperature control per bay',
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
            {imgs.main ? (
              <>
                <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${mainLoaded ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="absolute inset-0 bg-secondary/60" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent from-[15%] via-accent/[0.22] via-[50%] to-transparent to-[85%] animate-[shimmer_1.6s_ease-in-out_infinite]" />
                </div>
                <img ref={mainRef} key={`main-${activeSize}`} src={imgs.main} alt={`${sizeLabel} super store container`}
                  loading="eager" decoding="async" onLoad={markMain}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover/main:scale-[1.03] ${mainLoaded ? 'opacity-100' : 'opacity-0'}`} />
                <div className="absolute inset-0 bg-secondary/0 group-hover/main:bg-secondary/40 transition-colors duration-300" />
              </>
            ) : (
              <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                <FiGrid className="text-3xl text-primary/20" />
              </div>
            )}
            <div className="absolute top-3 left-3 bg-secondary/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
              <span className="font-heading font-extrabold text-h3 text-accent tracking-tight leading-none">{sizeLabel}</span>
            </div>
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-secondary/80 to-transparent px-4 py-3">
              <span className="font-heading font-extrabold text-[11px] text-primary/70 uppercase tracking-[0.15em]">+25°C to −25°C</span>
            </div>
            {imgs.gallery.length > 0 && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/main:opacity-100 transition-opacity duration-300">
                <button className="flex items-center gap-2 font-heading font-extrabold text-[11px] uppercase tracking-[0.15em] px-4 py-2.5 bg-accent text-secondary rounded-sm hover:bg-primary hover:text-secondary transition-all"
                  onClick={e => { e.stopPropagation(); onOpenGallery(0); }}>
                  <FiMaximize2 className="text-sm" /> View all photos
                </button>
              </div>
            )}
          </div>

          {/* Sub */}
          <div className="relative rounded-sm overflow-hidden bg-secondary/10 cursor-pointer group/sub" onClick={() => onOpenGallery(1)}>
            {imgs.sub ? (
              <>
                <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${subLoaded ? 'opacity-0' : 'opacity-100'}`}>
                  <div className="absolute inset-0 bg-secondary/60" />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent from-[15%] via-accent/[0.22] via-[50%] to-transparent to-[85%] animate-[shimmer_1.6s_ease-in-out_infinite_0.4s]" />
                </div>
                <img ref={subRef} key={`sub-${activeSize}`} src={imgs.sub} alt={`${sizeLabel} super store interior`}
                  loading="eager" decoding="async" onLoad={markSub}
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover/sub:scale-[1.03] ${subLoaded ? 'opacity-100' : 'opacity-0'}`} />
                <div className="absolute inset-0 bg-secondary/0 group-hover/sub:bg-secondary/40 transition-colors duration-300" />
              </>
            ) : (
              <div className="absolute inset-0 bg-secondary/20 flex items-center justify-center">
                <FiGrid className="text-2xl text-primary/20" />
              </div>
            )}
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
  activeSize: number; unit: 'metric' | 'imperial'; setUnit: (u: 'metric' | 'imperial') => void;
}> = ({ spec, isOpen, onToggle, activeSize, unit, setUnit }) => {
  const rows = unit === 'metric' ? spec.metric : spec.imperial;
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
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-secondary/10">
                      {spec.cols.map((col, j) => (
                        <th key={col} className={`pb-2.5 pt-1 font-heading font-extrabold text-[10px] uppercase tracking-[0.1em] text-secondary/35 ${j === 0 ? 'pr-6 w-[22%]' : 'pr-4'}`}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary/8">
                    {rows.map((row, i) => (
                      <tr key={i} className={`transition-colors duration-300 ${i === activeSize ? 'bg-accent/[0.06]' : ''}`}>
                        {row.map((cell, j) => (
                          <td key={j} className={`py-3 font-heading font-extrabold tracking-tight leading-tight transition-colors duration-300 ${j === 0 ? `text-accent text-h4 pr-6 ${i === activeSize ? 'pl-3 border-l-2 border-accent' : 'pl-0'}` : `text-h4 pr-4 ${i === activeSize ? 'text-secondary' : 'text-secondary/45'}`}`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
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
  activeSize, setActiveSize, unit, setUnit,
}: { activeSize: number; setActiveSize: (i: number) => void; unit: 'metric' | 'imperial'; setUnit: (u: 'metric' | 'imperial') => void }) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const toggle = (id: string) => setOpenId(prev => prev === id ? null : id);

  return (
    <div className="flex flex-col gap-3">
      {/* Size switcher — 2 columns for 20ft / 40ft */}
      <div>
        <div className="border border-secondary/10 rounded-sm p-4 grid grid-cols-2 gap-2">
          {sizes.map((s, i) => (
            <button key={s.label} onClick={() => setActiveSize(i)}
              className={`group flex flex-col items-start gap-1.5 px-4 py-4 rounded-sm border text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${activeSize === i ? 'border-accent bg-accent/[0.06]' : 'border-secondary/25 bg-secondary/[0.04] hover:border-secondary/50 hover:bg-secondary/[0.08]'}`}>
              <span className={`font-heading font-extrabold text-h2 tracking-tighter leading-none transition-colors duration-300 ${activeSize === i ? 'text-accent' : 'text-secondary'}`}>{s.label}</span>
              <span className={`font-body font-bold text-[10px] uppercase tracking-[0.12em] leading-tight transition-colors duration-300 ${activeSize === i ? 'text-secondary/55' : 'text-secondary/50'}`}>{s.tagline}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Accordion container */}
      <div className="border border-secondary/10 rounded-sm overflow-hidden flex flex-col divide-y divide-secondary/10">
        <div className="px-5 py-3.5 bg-secondary/[0.02]">
          <span className="font-heading font-extrabold text-h4 text-secondary/50 tracking-tight uppercase text-[11px] tracking-[0.15em]">Specifications</span>
        </div>
        {accordionSpecs.map(spec => (
          <AccordionSection key={spec.id} spec={spec} isOpen={openId === spec.id} onToggle={() => toggle(spec.id)}
            activeSize={activeSize} unit={unit} setUnit={setUnit} />
        ))}

        {/* Bay Configurations */}
        <div>
          <button onClick={() => toggle('bay')}
            className={`w-full flex items-center gap-3.5 px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-accent ${openId === 'bay' ? 'bg-secondary' : 'bg-primary hover:bg-secondary/[0.03]'}`}>
            <span className={`shrink-0 text-sm transition-colors ${openId === 'bay' ? 'text-accent' : 'text-secondary/35'}`}>{openId === 'bay' ? <FiMinus /> : <FiPlus />}</span>
            <span className={`font-heading font-extrabold text-h4 tracking-tight leading-tight transition-colors ${openId === 'bay' ? 'text-primary' : 'text-secondary'}`}>Bay Configurations</span>
          </button>
          <AnimatePresence initial={false}>
            {openId === 'bay' && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
                <BayConfigGrid activeSize={activeSize} unit={unit} setUnit={setUnit} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

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
                      const sep   = item.indexOf(': ');
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
          <Button variant="primary" size="sm" href="/contact">Get a quote <FiArrowRight className="ml-2" /></Button>
        </div>
      </div>
    </div>
  );
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   BAY CONFIG GRID (inside SpecsTable accordion)
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const BayConfigGrid: React.FC<{
  activeSize: number; unit: 'metric' | 'imperial'; setUnit: (u: 'metric' | 'imperial') => void;
}> = ({ activeSize, unit, setUnit }) => {
  const sizeKey = activeSize === 0 ? '20ft' : '40ft';
  const rows = unit === 'metric' ? bayData[sizeKey].metric : bayData[sizeKey].imperial;

  return (
    <div className="px-5 pt-4 pb-5 bg-primary border-t border-secondary/8">
      <div className="flex items-center gap-2 mb-4">
        {(['metric', 'imperial'] as const).map(u => (
          <button key={u} onClick={() => setUnit(u)}
            className={`px-4 py-1.5 font-heading font-extrabold text-[10px] uppercase tracking-[0.12em] rounded-sm border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${unit === u ? 'bg-secondary text-primary border-secondary' : 'border-secondary/20 text-secondary/40 hover:text-secondary hover:border-secondary/40'}`}>
            {u === 'metric' ? 'Metric' : 'Imperial'}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {rows.map((row) => (
          <div key={row.bays} className="flex flex-col gap-2 p-4 rounded-sm border border-secondary/10 bg-secondary/[0.03] hover:border-accent/40 hover:bg-accent/[0.03] transition-colors duration-200">
            <span className="font-heading font-extrabold text-h3 text-accent tracking-tighter leading-none">{row.bays}</span>
            <div className="flex flex-col gap-1 pt-2 border-t border-secondary/8">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-heading font-extrabold text-[9px] uppercase tracking-[0.1em] text-secondary/35">Width</span>
                <span className="font-heading font-extrabold text-[12px] text-secondary/80 leading-none">{row.width}</span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-heading font-extrabold text-[9px] uppercase tracking-[0.1em] text-secondary/35">Floor</span>
                <span className="font-heading font-extrabold text-[12px] text-secondary/80 leading-none">{row.floor}</span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-heading font-extrabold text-[9px] uppercase tracking-[0.1em] text-secondary/35">Volume</span>
                <span className="font-heading font-extrabold text-[12px] text-accent leading-none">{row.vol}</span>
              </div>
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-heading font-extrabold text-[9px] uppercase tracking-[0.1em] text-secondary/35">Weight</span>
                <span className="font-heading font-extrabold text-[12px] text-secondary/80 leading-none">{row.weight}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="font-body text-[11px] text-secondary/30 leading-relaxed mt-3">
        Length and height are fixed per size. Width, floor area, volume, and weight scale with number of bays.
      </p>
    </div>
  );
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PAGE
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const StoreSuperStore: React.FC = () => {
  const heroLines = d["Hero Page"].HEADLINE.split('. ');
  const [activeSize, setActiveSize] = useState(0);
  const [unit,       setUnit]       = useState<'metric' | 'imperial'>('metric');
  const [gallery,    setGallery]    = useState<{ open: boolean; startIdx: number }>({ open: false, startIdx: 0 });

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
            <CharReveal text={tc(heroLines.slice(1).join('. '))} className="text-accent" />
          </h1>
          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <div className="font-body text-body-lg text-primary/80 leading-[1.6] mb-8 font-medium" dangerouslySetInnerHTML={{ __html: d["Hero Page"].SUBHEADLINE }} />
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/contact">{heroCtas[0]} <FiArrowRight className="text-lg" /></Button>
              <Button variant="ghost" size="lg" href="/contact">{heroCtas[1]} <FiDownload className="text-lg" /></Button>
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
                <BentoGrid activeSize={activeSize} unit={unit} onOpenGallery={openGallery} />
              </motion.div>
              <motion.div variants={itemVariants} className="order-1 lg:order-2">
                <SpecsTable activeSize={activeSize} setActiveSize={setActiveSize} unit={unit} setUnit={setUnit} />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── KEY FEATURES ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <SectionHeader dark eyebrow="What's included" head={tc(sLabel('S1 Key features'))}
              desc="Every Crystal Super Store ships with the tools your team needs to run a serious cold chain operation." />
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
              <SectionHeader eyebrow="Who uses the Super Store" head="Industries served" />
              <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/50 leading-relaxed max-w-sm md:text-right shrink-0 mb-8">
                Multi-bay flexibility makes the Super Store ideal for operations with diverse temperature requirements.
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
                From chilled produce to frozen meals — each bay holds what it needs to hold.
              </motion.p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
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
                <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary mb-2 block">Need large-volume portable cold storage?</motion.span>
                <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter">Get a Super Store at your site.</motion.h2>
                <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/55 leading-relaxed mt-4 font-medium">Modular, relocatable, and ready fast. Tell us your capacity, location, and timeline.</motion.p>
              </div>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Button variant="primary" size="lg" href="/contact">Enquire now <FiArrowRight className="ml-2 text-lg" /></Button>
                <Button variant="secondary" size="lg" href="/contact">Download brochure <FiDownload className="ml-2 text-lg" /></Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── IMAGE DIALOG ── */}
      <AnimatePresence>
        {gallery.open && (
          <ImageDialog key="gallery-dialog"
            productName="Super Store Container"
            sizes={sizes} sizeImages={sizeImages}
            activeSize={activeSize} setActiveSize={setActiveSize}
            startIndex={gallery.startIdx} onClose={closeGallery} />
        )}
      </AnimatePresence>

    </div>
  );
};

export default StoreSuperStore;
