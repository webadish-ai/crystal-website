import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight, FiDownload, FiThermometer, FiZap, FiShield, FiPackage,
  FiActivity, FiDroplet, FiSun, FiWind, FiLayers, FiStar,
  FiCheckCircle, FiAlertCircle, FiGrid, FiCpu, FiTruck,
  FiMaximize2, FiPlus, FiMinus,
} from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import portableData from '@data/store-portablecs-all.json';
// @ts-ignore
import reeferBookletUrl from '@data/brochures/Reefer-Booklet-2026.pdf?url';
import CharReveal from '@components/core/CharReveal';
import ImageDialog from './ImageDialog';
import heroImgRaw from '../../data/images/store/reefer/reefer-hero.png';
const heroImg = typeof heroImgRaw === 'string' ? heroImgRaw : (heroImgRaw as any).src;
// @ts-ignore
import outside10ft from '../../data/images/store/reefer/10ft/outside.png?url';
// @ts-ignore
import inside10ft  from '../../data/images/store/reefer/10ft/inside.JPG?url';
// @ts-ignore
import outside20ft from '../../data/images/store/reefer/20ft/outside.png?url';
// @ts-ignore
import inside20ft  from '../../data/images/store/reefer/20ft/inside.jpg?url';
// @ts-ignore
import outside40ft from '../../data/images/store/reefer/40ft/outside.jpg?url';
// @ts-ignore
import inside40ft  from '../../data/images/store/reefer/40ft/inside.JPG?url';

const parent = portableData["06 Store: Portable Cold Storage Containers"];
const d      = parent["06a Store: Reefer Containers"];
const heroCtas = d["Hero Page"].CTAS.split(' | ').map((s: string) => s.replace(/\s*[®Â¯]$/, '').trim());
const isDataKey = (k: string) => k !== k.toUpperCase();
const s2Features = Object.entries(d["S2 Key features"]).filter(([k]) => isDataKey(k)) as [string, string][];
const sLabel = (key: string) => key.replace(/^S\d+\s+/, '');

/* ─────── SIZE META ─────── */
const sizes = [
  { label: '10 ft', tagline: 'Compact & agile',   bestFor: 'Retail back-of-house, pharma distribution points, short-term overflow' },
  { label: '20 ft', tagline: 'Industry standard', bestFor: 'Most cold chain operations — balances capacity and site footprint'      },
  { label: '40 ft', tagline: 'Maximum capacity',  bestFor: 'Distribution hubs, large processing volumes, high-throughput sites'     },
];

/* ─────── SPEC ROWS — metric + imperial ─────── */
const specRows = [
  {
    label: 'Temperature range',
    highlight: true,
    metric:   ['−25°C to +25°C',  '−25°C to +25°C',  '−25°C to +25°C' ],
    imperial: ['−13°F to +77°F',  '−13°F to +77°F',  '−13°F to +77°F' ],
  },
  {
    label: 'External dimensions',
    highlight: false,
    metric:   ['2.99 × 2.44 × 2.59 m', '6.06 × 2.44 × 2.60 m', '12.19 × 2.44 × 2.90 m'],
    imperial: ["10' × 8' × 8'6\"",      "20' × 8' × 8'7\"",      "40' × 8' × 9'6\""      ],
  },
  {
    label: 'Internal dimensions',
    highlight: false,
    metric:   ['2.30 × 2.29 × 2.31 m', '5.36 × 2.29 × 2.31 m', '11.50 × 2.29 × 2.60 m'],
    imperial: ["7.6' × 7.5' × 7.6'",   "17.6' × 7.5' × 7.6'",  "37.7' × 7.5' × 8.5'"  ],
  },
  {
    label: 'Cubic capacity',
    highlight: true,
    metric:   ['12.15 m³',   '28.35 m³',    '68.46 m³'    ],
    imperial: ['429.3 ft³',  '1,001.2 ft³', '2,417.9 ft³' ],
  },
  {
    label: 'Floor area',
    highlight: false,
    metric:   ['5.27 mÂ²',   '12.27 mÂ²',   '26.34 mÂ²'  ],
    imperial: ['56.6 ftÂ²',  '132.1 ftÂ²',  '283.4 ftÂ²' ],
  },
  {
    label: 'Tare weight',
    highlight: false,
    metric:   ['2,059 kg',  '2,770 kg',   '4,649 kg'   ],
    imperial: ['4,541 lb',  '6,107 lb',   '10,251 lb'  ],
  },
  {
    label: 'Load capacity',
    highlight: true,
    metric:   ['8 MT',    '25 MT',   '30 MT'  ],
    imperial: ['8.8 T',   '27.6 T',  '33.1 T' ],
  },
  {
    label: 'Power supply',
    highlight: false,
    metric:   ['380–460V · 3-Ph', '380–460V · 3-Ph', '380–460V · 3-Ph'],
    imperial: ['380–460V · 3-Ph', '380–460V · 3-Ph', '380–460V · 3-Ph'],
  },
  {
    label: 'Refrigerant',
    highlight: false,
    metric:   ['R-134A / R-404A', 'R-134A / R-404A', 'R-134A / R-404A'],
    imperial: ['R-134A / R-404A', 'R-134A / R-404A', 'R-134A / R-404A'],
  },
];

/* ─────── PER-SIZE IMAGES (local assets) ─────── */
const _raw10ft = import.meta.glob<string>('../../data/images/store/reefer/10ft/*', { eager: true, query: '?url', import: 'default' });
const _raw20ft = import.meta.glob<string>('../../data/images/store/reefer/20ft/*', { eager: true, query: '?url', import: 'default' });
const _raw40ft = import.meta.glob<string>('../../data/images/store/reefer/40ft/*', { eager: true, query: '?url', import: 'default' });
const _rawP10ft = import.meta.glob<string>('../../data/images/store/reefer/pallet/10ft/*', { eager: true, query: '?url', import: 'default' });
const _rawP20ft = import.meta.glob<string>('../../data/images/store/reefer/pallet/20ft/*', { eager: true, query: '?url', import: 'default' });
const _rawP40ft = import.meta.glob<string>('../../data/images/store/reefer/pallet/40ft/*', { eager: true, query: '?url', import: 'default' });

const _imgs10ft   = Object.values(_raw10ft);
const _imgs20ft   = Object.values(_raw20ft);
const _imgs40ft   = Object.values(_raw40ft);
const _pallet10ft = Object.values(_rawP10ft);
const _pallet20ft = Object.values(_rawP20ft);
const _pallet40ft = Object.values(_rawP40ft);

const sizeImages = [
  {
    // 10 ft
    main:         outside10ft,
    sub:          inside10ft,
    cap_metric:   '12.15 m³ · 8 MT',
    cap_imperial: "429 ft³ · 8.8 T · 10' × 8' × 8'6\"",
    note:         'Compact · Retail · Pharma · Short-term',
    gallery:      _imgs10ft,
    pallet:       _pallet10ft,
  },
  {
    // 20 ft
    main:         outside20ft,
    sub:          inside20ft,
    cap_metric:   '28.35 m³ · 25 MT',
    cap_imperial: "1,001 ft³ · 27.6 T · 20' × 8' × 8'7\"",
    note:         'Industry standard · Most deployed across India',
    gallery:      _imgs20ft,
    pallet:       _pallet20ft,
  },
  {
    // 40 ft
    main:         outside40ft,
    sub:          inside40ft,
    cap_metric:   '68.46 m³ · 30 MT',
    cap_imperial: "2,418 ft³ · 33.1 T · 40' × 8' × 9'6\"",
    note:         'High volume · Distribution hubs · Max throughput',
    gallery:      _imgs40ft,
    pallet:       _pallet40ft,
  },
];

/* ─────── MISC DATA ─────── */
const featureIcons: React.ReactNode[] = [
  <FiZap />, <FiGrid />, <FiAlertCircle />, <FiCheckCircle />, <FiCpu />, <FiShield />,
];
const industries = [
  { label: 'FMCG',            icon: <FiPackage /> },
  { label: 'Pharmaceuticals', icon: <FiActivity /> },
  { label: 'Agriculture',     icon: <FiSun /> },
  { label: 'Chemical',        icon: <FiDroplet /> },
  { label: 'Cosmetics',       icon: <FiStar /> },
  { label: 'Electronics',     icon: <FiCpu /> },
  { label: 'Others',          icon: <FiLayers /> },
];
const hireSteps = [
  { num: '01', title: 'Request a quote',        desc: 'Tell us your size, duration, and location. We respond within 24 hours with pricing and availability.' },
  { num: '02', title: 'We deliver & position',  desc: "Crystal's team delivers to your site and positions the container. Pan-India." },
  { num: '03', title: 'Plug in & start storing',desc: 'Connect to 440V 3-phase power. Operational within hours. No foundations or civil work.' },
  { num: '04', title: 'We collect at end',       desc: 'We collect at the end of your rental period. Or buy outright — the choice is yours.' },
];
const products = [
  { label: 'Pharmaceuticals',    icon: <FiActivity />,    accent: true  },
  { label: 'Dairy Products',     icon: <FiDroplet />,     accent: false },
  { label: 'Fruits & Vegetables',icon: <FiSun />,         accent: false },
  { label: 'Frozen Food',        icon: <FiWind />,        accent: true  },
  { label: 'Meat & Seafood',     icon: <FiPackage />,     accent: false },
  { label: 'Bakery Products',    icon: <FiLayers />,      accent: false },
  { label: 'Confectionery',      icon: <FiStar />,        accent: false },
  { label: 'Biological Samples', icon: <FiShield />,      accent: true  },
  { label: 'Chemicals',          icon: <FiThermometer />, accent: false },
];



/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   BENTO IMAGE GRID
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const BentoGrid = ({
  activeSize, unit, onOpenGallery,
}: { activeSize: number; unit: 'metric' | 'imperial'; onOpenGallery: (startIdx?: number) => void }) => {
  // Per-size map: prevents the skeleton from flashing on the exiting AnimatePresence div
  const [loadedMap, setLoadedMap] = useState<Record<number, { main?: boolean; sub?: boolean }>>({});
  const mainLoaded = !!(loadedMap[activeSize]?.main);
  const subLoaded  = !!(loadedMap[activeSize]?.sub);
  const mainRef    = useRef<HTMLImageElement>(null);
  const subRef     = useRef<HTMLImageElement>(null);

  const markMain = useCallback(() =>
    setLoadedMap(p => ({ ...p, [activeSize]: { ...p[activeSize], main: true } })),
  [activeSize]);
  const markSub = useCallback(() =>
    setLoadedMap(p => ({ ...p, [activeSize]: { ...p[activeSize], sub: true } })),
  [activeSize]);

  // Catch images already in browser cache (onLoad won't fire for them)
  useEffect(() => {
    if (mainRef.current?.complete && mainRef.current.naturalWidth > 0) markMain();
    if (subRef.current?.complete  && subRef.current.naturalWidth  > 0) markSub();
  }, [activeSize, markMain, markSub]);

  const imgs      = sizeImages[activeSize];
  const sizeLabel = sizes[activeSize].label;
  const cap       = unit === 'metric' ? imgs.cap_metric : imgs.cap_imperial;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={activeSize}
        initial={{ opacity: 0, scale: 0.975 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.975 }}
        transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
        className="flex flex-col gap-2"
      >
        {/* Row 1: main + sub images */}
        <div className="grid grid-cols-[2fr_1fr] gap-2 aspect-[16/9] sm:aspect-[3/2]">

          {/* Main image */}
          <div
            className="relative rounded-sm overflow-hidden bg-secondary/10 cursor-pointer group/main"
            onClick={() => onOpenGallery(0)}
          >
            {/* Skeleton — solid navy base + amber shimmer band */}
            <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${mainLoaded ? 'opacity-0' : 'opacity-100'}`}>
              <div className="absolute inset-0 bg-secondary/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent from-[15%] via-accent/[0.22] via-[50%] to-transparent to-[85%] animate-[shimmer_1.6s_ease-in-out_infinite]" />
            </div>

            <img
              ref={mainRef}
              key={`main-${activeSize}`}
              src={imgs.main}
              alt={`${sizeLabel} reefer container`}
              loading="eager" decoding="async"
              onLoad={markMain}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover/main:scale-[1.03] ${mainLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            {/* Dark scrim on hover */}
            <div className="absolute inset-0 bg-secondary/0 group-hover/main:bg-secondary/40 transition-colors duration-300" />

            {/* Size badge */}
            <div className="absolute top-3 left-3 bg-secondary/90 backdrop-blur-sm px-3 py-1.5 rounded-sm">
              <span className="font-heading font-extrabold text-h3 text-accent tracking-tight leading-none">{sizeLabel}</span>
            </div>

            {/* Temp gradient bottom */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-secondary/80 to-transparent px-4 py-3">
              <span className="font-heading font-extrabold text-[11px] text-primary/70 uppercase tracking-[0.15em]">−25°C to +25°C</span>
            </div>

            {/* Hover: View all button */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/main:opacity-100 transition-opacity duration-300">
              <button
                className="flex items-center gap-2 font-heading font-extrabold text-[11px] uppercase tracking-[0.15em] px-4 py-2.5 bg-accent text-secondary rounded-sm hover:bg-primary hover:text-secondary transition-all"
                onClick={e => { e.stopPropagation(); onOpenGallery(0); }}
              >
                <FiMaximize2 className="text-sm" /> View all photos
              </button>
            </div>
          </div>

          {/* Sub image */}
          <div
            className="relative rounded-sm overflow-hidden bg-secondary/10 cursor-pointer group/sub"
            onClick={() => onOpenGallery(1)}
          >
            {/* Skeleton */}
            <div className={`absolute inset-0 z-10 pointer-events-none transition-opacity duration-500 ${subLoaded ? 'opacity-0' : 'opacity-100'}`}>
              <div className="absolute inset-0 bg-secondary/60" />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent from-[15%] via-accent/[0.22] via-[50%] to-transparent to-[85%] animate-[shimmer_1.6s_ease-in-out_infinite_0.4s]" />
            </div>

            <img
              ref={subRef}
              key={`sub-${activeSize}`}
              src={imgs.sub}
              alt={`${sizeLabel} reefer interior`}
              loading="eager" decoding="async"
              onLoad={markSub}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 group-hover/sub:scale-[1.03] ${subLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            <div className="absolute inset-0 bg-secondary/0 group-hover/sub:bg-secondary/40 transition-colors duration-300" />
            {/* Photo count badge */}
            <div className="absolute bottom-2 right-2 bg-secondary/80 backdrop-blur-sm px-2 py-1 rounded-sm">
              <span className="font-body font-bold text-eyebrow text-primary/70 uppercase tracking-[0.1em]">+{imgs.gallery.length - 2} more</span>
            </div>
          </div>
        </div>

        {/* Row 2: amber info bar */}
        <div
          className="bg-accent rounded-sm px-5 py-4 flex items-center justify-between gap-4 cursor-pointer group/bar hover:bg-secondary transition-colors duration-300"
          onClick={() => onOpenGallery(0)}
        >
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

/* ─────── ACCORDION SPEC DATA ─────── */
const accordionSpecs = [
  {
    id: 'ext',
    label: 'External Dimensions',
    cols: ['Size', 'Length', 'Width', 'Height'],
    metric: [
      ['10 ft', '2.99 m', '2.44 m', '2.59 m'],
      ['20 ft', '6.06 m', '2.44 m', '2.60 m'],
      ['40 ft', '12.19 m', '2.44 m', '2.90 m'],
    ],
    imperial: [
      ['10 ft', "10'", "8'", "8'6\""],
      ['20 ft', "20'", "8'", "8'7\""],
      ['40 ft', "40'", "8'", "9'6\""],
    ],
    note: 'Measurements are approximate and should be treated as a guide. Slight variations are possible.',
  },
  {
    id: 'int',
    label: 'Internal Dimensions',
    cols: ['Size', 'Length', 'Width', 'Height'],
    metric: [
      ['10 ft', '2.30 m', '2.29 m', '2.31 m'],
      ['20 ft', '5.36 m', '2.29 m', '2.31 m'],
      ['40 ft', '11.50 m', '2.29 m', '2.60 m'],
    ],
    imperial: [
      ['10 ft', "7.6'", "7.5'", "7.6'"],
      ['20 ft', "17.6'", "7.5'", "7.6'"],
      ['40 ft', "37.7'", "7.5'", "8.5'"],
    ],
    note: 'Measurements are approximate and should be treated as a guide. Slight variations are possible.',
  },
  {
    id: 'weight',
    label: 'Weight, Area, Capacity',
    cols: ['Size', 'Tare weight', 'Floor area', 'Capacity'],
    metric: [
      ['10 ft', '2,059 kg', '5.27 mÂ²', '12.15 m³'],
      ['20 ft', '2,770 kg', '12.27 mÂ²', '28.35 m³'],
      ['40 ft', '4,649 kg', '26.34 mÂ²', '68.46 m³'],
    ],
    imperial: [
      ['10 ft', '4,541 lb', '56.6 ftÂ²', '429.3 ft³'],
      ['20 ft', '6,107 lb', '132.1 ftÂ²', '1,001.2 ft³'],
      ['40 ft', '10,251 lb', '283.4 ftÂ²', '2,417.9 ft³'],
    ],
    note: 'All measurements should be used as a guide. Small variations can and do apply.',
  },
];

const goodToKnowItems = [
  'Temperature range: −25°C to +25°C',
  'Power supply: 380–460V · 3-Phase',
  'Refrigerant: R-134A / R-404A',
  ...s2Features.map(([title]) => title),
];

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   ACCORDION SECTION
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const AccordionSection: React.FC<{
  spec: (typeof accordionSpecs)[number];
  isOpen: boolean;
  onToggle: () => void;
  activeSize: number;
  unit: 'metric' | 'imperial';
  setUnit: (u: 'metric' | 'imperial') => void;
}> = ({ spec, isOpen, onToggle, activeSize, unit, setUnit }) => {
  const rows = unit === 'metric' ? spec.metric : spec.imperial;
  const sectionRef = useRef<HTMLDivElement>(null);

  // When this section opens, wait for animation then scroll so title + table are comfortably in view
  useEffect(() => {
    if (!isOpen || !sectionRef.current) return;
    const el = sectionRef.current;
    const timer = setTimeout(() => {
      const rect = el.getBoundingClientRect();
      const offset = rect.top + window.scrollY - 160; // 160px clearance — title sits below nav with breathing room
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(offset, { duration: 0.7 });
      } else {
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    }, 280); // let accordion animation finish (~250ms) before scrolling
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <div ref={sectionRef}>
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
          {spec.label}
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
            <div className="px-5 pt-4 pb-5 bg-primary border-t border-secondary/8">
              {/* Unit toggle */}
              <div className="flex items-center gap-2 mb-4">
                {(['metric', 'imperial'] as const).map(u => (
                  <button
                    key={u}
                    onClick={() => setUnit(u)}
                    className={`px-4 py-1.5 font-heading font-extrabold text-[10px] uppercase tracking-[0.12em] rounded-sm border transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent
                      ${unit === u
                        ? 'bg-secondary text-primary border-secondary'
                        : 'border-secondary/20 text-secondary/40 hover:text-secondary hover:border-secondary/40'}`}
                  >
                    {u === 'metric' ? 'Metric' : 'Imperial'}
                  </button>
                ))}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-secondary/10">
                      {spec.cols.map((col, j) => (
                        <th key={col}
                          className={`pb-2.5 pt-1 font-heading font-extrabold text-[10px] uppercase tracking-[0.1em] text-secondary/35
                            ${j === 0 ? 'pr-6 w-[22%]' : 'pr-4'}`}>
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-secondary/8">
                    {rows.map((row, i) => (
                      <tr key={i} className={`transition-colors duration-300 ${i === activeSize ? 'bg-accent/[0.06]' : ''}`}>
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
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Note */}
              <p className="font-body text-[11px] text-secondary/30 leading-relaxed mt-3">
                {spec.note}
              </p>
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
}: {
  activeSize: number;
  setActiveSize: (i: number) => void;
  unit: 'metric' | 'imperial';
  setUnit: (u: 'metric' | 'imperial') => void;
}) => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => setOpenId(prev => (prev === id ? null : id));

  return (
    <div className="flex flex-col gap-3">

      {/* ── Size switcher ── */}
      <div>
        <div className="border border-secondary/10 rounded-sm p-4 grid grid-cols-3 gap-2">
          {sizes.map((s, i) => (
            <button
              key={s.label}
              onClick={() => setActiveSize(i)}
              className={`group flex flex-col items-start gap-1.5 px-4 py-4 rounded-sm border text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                ${activeSize === i
                  ? 'border-accent bg-accent/[0.06]'
                  : 'border-secondary/25 bg-secondary/[0.04] hover:border-secondary/50 hover:bg-secondary/[0.08]'}`}
            >
              <span className={`font-heading font-extrabold text-h2 tracking-tighter leading-none transition-colors duration-300
                ${activeSize === i ? 'text-accent' : 'text-secondary group-hover:text-secondary'}`}>
                {s.label}
              </span>
              <span className={`font-body font-bold text-[10px] uppercase tracking-[0.12em] leading-tight transition-colors duration-300
                ${activeSize === i ? 'text-secondary/55' : 'text-secondary/50 group-hover:text-secondary/70'}`}>
                {s.tagline}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Accordion container ── */}
      <div className="border border-secondary/10 rounded-sm overflow-hidden flex flex-col divide-y divide-secondary/10">

      {/* Specifications heading */}
      <div className="px-5 py-3.5 bg-secondary/[0.02]">
        <span className="font-heading font-extrabold text-h4 text-secondary/50 tracking-tight uppercase text-[11px] tracking-[0.15em]">Specifications</span>
      </div>

      {/* Accordion sections — only one open at a time */}
      {accordionSpecs.map(spec => (
        <AccordionSection
          key={spec.id}
          spec={spec}
          isOpen={openId === spec.id}
          onToggle={() => toggle(spec.id)}
          activeSize={activeSize}
          unit={unit}
          setUnit={setUnit}
        />
      ))}

      {/* Good to know */}
      <div>
        <button
          onClick={() => toggle('gtk')}
          className={`w-full flex items-center gap-3.5 px-5 py-4 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-accent
            ${openId === 'gtk' ? 'bg-secondary' : 'bg-primary hover:bg-secondary/[0.03]'}`}
        >
          <span className={`shrink-0 text-sm ${openId === 'gtk' ? 'text-accent' : 'text-secondary/35'}`}>
            {openId === 'gtk' ? <FiMinus /> : <FiPlus />}
          </span>
          <span className={`font-heading font-extrabold text-h4 tracking-tight leading-tight transition-colors
            ${openId === 'gtk' ? 'text-primary' : 'text-secondary'}`}>
            Good to know
          </span>
        </button>
        <AnimatePresence initial={false}>
          {openId === 'gtk' && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: 'auto' }}
              exit={{ height: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
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
                          {label && (
                            <span className="font-heading font-extrabold text-[10px] uppercase tracking-[0.1em] text-accent leading-none">{label}</span>
                          )}
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
        <Button variant="primary" size="sm" href="/contact-us">
          Get a quote <FiArrowRight className="ml-2" />
        </Button>
      </div>

      </div>

    </div>
  );
};

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   SECTION HEADER
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const SectionHeader = ({ eyebrow, head, desc, align = "left", dark = false }: {
  eyebrow?: string; head: string; desc?: string; align?: "left" | "center"; dark?: boolean;
}) => (
  <div className={`flex flex-col mb-8 shrink-0 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}>
    {eyebrow && (
      <motion.span variants={itemVariants} className={`font-body font-bold text-eyebrow uppercase tracking-[0.15em] mb-1.5 block ${dark ? "text-accent" : "text-secondary"}`}>
        {eyebrow}
      </motion.span>
    )}
    <motion.h2 variants={itemVariants} className={`font-heading font-extrabold text-h2 leading-tight-none tracking-tighter flex flex-col pb-1.5 w-full border-b ${dark ? "text-primary border-primary/10" : "text-secondary border-secondary/10"}`}>
      <CharReveal text={head} justify={align === "center" ? "center" : "start"} />
    </motion.h2>
    {desc && (
      <motion.p variants={itemVariants} className={`font-body text-body-lg leading-relaxed max-w-2xl mt-4 ${dark ? "text-primary/60" : "text-secondary/60"}`}>
        {desc}
      </motion.p>
    )}
  </div>
);

/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   PAGE
â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
const StoreReefer: React.FC = () => {
  const heroLines = d["Hero Page"].HEADLINE.split('. ');
  const [activeSize, setActiveSize] = useState(1);                      // 0=10ft 1=20ft 2=40ft
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
              <Button variant="primary" size="lg" href="/contact-us">
                {heroCtas[0]} <FiArrowRight className="text-lg" />
              </Button>
              <Button variant="ghost" size="lg" href={reeferBookletUrl} download="Reefer-Booklet-2026.pdf">
                {heroCtas[2]} <FiDownload className="text-lg" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── SPECIFICATIONS ── */}
      <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
              {/* LEFT: bento images — sticky on desktop so it stays visible while accordions expand */}
              <motion.div variants={itemVariants} className="order-2 lg:order-1 lg:sticky lg:top-24 lg:self-start">
                <BentoGrid activeSize={activeSize} unit={unit} onOpenGallery={openGallery} />
              </motion.div>

              {/* RIGHT: specs accordion (contains size switcher) */}
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
            <SectionHeader dark eyebrow="What's included" head={tc(sLabel("S2 Key features"))}
              desc="Every Crystal reefer container ships fully equipped. No optional extras." />
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
              <SectionHeader eyebrow="Who uses reefer containers" head="Industries served" />
              <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/50 leading-relaxed max-w-sm md:text-right shrink-0 mb-8">
                Reliable, efficient temperature control for sensitive goods across every sector.
              </motion.p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {industries.map(({ label, icon }, i) => (
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
              <SectionHeader dark eyebrow="What we keep cold" head={tc(sLabel("S3 Products stored"))} />
              <motion.p variants={itemVariants} className="font-body text-body-lg text-primary/70 leading-relaxed max-w-sm md:text-right shrink-0 mb-8">
                From fresh produce to pharma-grade biologics — stored at the right temperature.
              </motion.p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {products.map(({ label, icon }, i) => (
                <motion.div key={label} variants={itemVariants} transition={{ delay: i * 0.04 }}
                  className="group flex flex-col items-start gap-5 p-6 rounded-sm border border-primary/15 bg-primary/[0.06] transition-all duration-300 cursor-default hover:-translate-y-1 hover:bg-primary/[0.10] hover:border-accent/50">
                  <div className="w-11 h-11 flex items-center justify-center rounded-sm bg-accent/[0.10] group-hover:bg-accent/25 text-accent text-2xl transition-colors duration-300">
                    {icon}
                  </div>
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
                <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary mb-2 block">
                  Ready to rent or buy?
                </motion.span>
                <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter">
                  Get a reefer container at your site.
                </motion.h2>
                <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/55 leading-relaxed mt-4 font-medium">
                  Tell us your size, location, and timeline. Pricing and availability within 24 hours.
                </motion.p>
              </div>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Button variant="primary" size="lg" href="/contact-us">
                  Request a quote <FiArrowRight className="ml-2 text-lg" />
                </Button>
                <Button variant="secondary" size="lg" href={reeferBookletUrl} download="Reefer-Booklet-2026.pdf">
                  Download brochure <FiDownload className="ml-2 text-lg" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── IMAGE DIALOG ── */}
      <AnimatePresence>
        {gallery.open && (
          <ImageDialog
            key="gallery-dialog"
            productName="Reefer Container"
            sizes={sizes} sizeImages={sizeImages}
            activeSize={activeSize}
            setActiveSize={setActiveSize}
            startIndex={gallery.startIdx}
            onClose={closeGallery}
          />
        )}
      </AnimatePresence>

    </div>
  );
};

export default StoreReefer;
