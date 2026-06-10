import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import {
  FiPhone, FiChevronDown, FiCheck, FiArrowRight,
  FiThermometer, FiShield, FiClock, FiMapPin, FiTruck, FiAward,
  FiX, FiChevronLeft, FiChevronRight, FiSend,
} from 'react-icons/fi';

// ── Constants ─────────────────────────────────────────────────────────────────

const PHONE = '+91 98925 12900';
const PHONE_RAW = '919892512900';
const WA_BASE = `https://wa.me/${PHONE_RAW}`;

const STATS = [
  { value: '15k+', label: 'Assignments Delivered' },
  { value: '99%',  label: 'Temperature Uptime' },
  { value: '120+', label: 'Cities Served' },
  { value: '24h',  label: 'Response Time' },
];

const CONTAINERS = [
  {
    size: '10 ft Reefer', tag: 'Small Batch',
    temp: '−25°C to +25°C', capacity: '12 CBM', dimensions: '10 × 8 × 8.5 ft', priceFrom: '₹1,300/day',
    useCases: ['Pharma samples', 'Event catering', 'Small batches', 'Lab reagents'],
    desc: 'Compact and highly mobile. Ideal for last-mile cold chain, pop-up storage, and pharmaceutical sample transport.',
  },
  {
    size: '20 ft Reefer', tag: 'Most Popular',
    temp: '−25°C to +25°C', capacity: '26 CBM', dimensions: '20 × 8 × 8.5 ft', priceFrom: '₹2,200/day',
    useCases: ['Dairy & milk', 'Seafood', 'Horticulture', 'Frozen foods'],
    desc: 'The most widely rented size. Balances capacity with flexibility — fits most commercial loading docks and warehouses.',
  },
  {
    size: '40 ft Reefer', tag: 'High Volume',
    temp: '−25°C to +25°C', capacity: '60 CBM', dimensions: '40 × 8 × 8.5 ft', priceFrom: '₹3,800/day',
    useCases: ['FMCG distribution', 'Bulk frozen', 'Pharma bulk', 'Export cargo'],
    desc: 'Built for high-throughput operations. Used by FMCG brands, 3PL operators, and pharma companies for large-volume cold storage.',
  },
  {
    size: '40 ft High-Cube', tag: 'Maximum Space',
    temp: '−25°C to +25°C', capacity: '68 CBM', dimensions: '40 × 8 × 9.5 ft', priceFrom: '₹4,200/day',
    useCases: ['Retail distribution', 'Quick commerce', 'Large-volume frozen', 'Floral'],
    desc: 'Extra height means 13% more volume. Preferred by retail chains, quick-commerce fulfilment centres, and floriculture exporters.',
  },
];

const STEPS = [
  { num: '01', title: 'Submit Your Requirement', desc: 'Fill the form or call us. Share your location, product type, temperature range, and duration.' },
  { num: '02', title: 'Get a Quote in 2 Hours', desc: 'Our team sends a detailed quote with the right container size, pricing, and availability confirmation.' },
  { num: '03', title: 'Container Delivered to Site', desc: 'We handle delivery, positioning, and commissioning at your location. No technical expertise needed.' },
  { num: '04', title: '24/7 Monitoring Begins', desc: 'Real-time temperature tracking, SMS/email alerts, and a dedicated support line activate immediately.' },
];

const WHY = [
  { icon: FiThermometer, title: '−25°C to +25°C Range' },
  { icon: FiShield,      title: 'FSSAI & ISO Certified' },
  { icon: FiClock,       title: '24/7 Remote Monitoring' },
  { icon: FiMapPin,      title: 'Pan-India Fleet — 120+ Cities' },
  { icon: FiTruck,       title: 'Flexible Rental & Lease Terms' },
  { icon: FiAward,       title: '15+ Years, 500+ Enterprise Clients' },
];

const CAROUSEL_IMGS = [
  '/crystal_warehouse_hero.webp',
  '/images/build/bts-site-selection.webp',
  '/images/build/bts-engineering.webp',
  '/images/build/bts-operations.webp',
  '/images/build/bts-commissioning.webp',
];

// ── Types ─────────────────────────────────────────────────────────────────────

interface LPData {
  meta_title?: string;
  meta_description?: string;
  location?: string;
  hero_heading?: string;
  hero_subheading?: string;
  hero_pricing?: { label: string; value: string; note?: string }[];
  hero_disclaimer?: string;
  form_heading?: string;
  form_submit_label?: string;
  form_disclaimer?: string;
  cities?: string[];
  serve_items?: string[];
  gallery?: { image: string; label: string }[];
  footer_note?: string;
}

// ── WhatsApp SVG ──────────────────────────────────────────────────────────────

function WAIcon({ className = 'w-5 h-5' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.533 5.857L.057 23.882a.5.5 0 0 0 .613.613l6.101-1.459A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.882 9.882 0 0 1-5.042-1.377l-.361-.214-3.742.895.909-3.652-.235-.373A9.842 9.842 0 0 1 2.118 12C2.118 6.532 6.532 2.118 12 2.118S21.882 6.532 21.882 12 17.468 21.882 12 21.882z"/>
    </svg>
  );
}

// ── Section Label ─────────────────────────────────────────────────────────────

function SectionLabel({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-6 h-[2px] bg-[#FAC212]" />
      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0F2854]/50">{text}</span>
    </div>
  );
}

// ── Top Bar ───────────────────────────────────────────────────────────────────

function TopBar({ location, cities }: { location: string; cities: string[] }) {
  const waMsg = `Hi%2C%20I%20need%20a%20reefer%20container%20quote%20for%20${encodeURIComponent(location)}.`;
  const shown = cities.slice(0, 6);
  const extra = cities.length > 6 ? cities.length - 6 : 0;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#FAC212] border-b border-[#e6b010] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-0 overflow-hidden flex-1 min-w-0">
          <FiMapPin size={13} className="text-[#0F2854] shrink-0 mr-2" />
          {shown.map((city, i) => (
            <span key={city} className="flex items-center whitespace-nowrap">
              {i > 0 && <span className="text-[#0F2854]/30 mx-2 text-xs select-none">·</span>}
              <span className="text-[12px] font-bold text-[#0F2854]">{city}</span>
            </span>
          ))}
          {extra > 0 && (
            <>
              <span className="text-[#0F2854]/30 mx-2 text-xs select-none">·</span>
              <span className="text-[11px] font-black text-white bg-[#0F2854] px-2.5 py-0.5 whitespace-nowrap">
                &amp; more
              </span>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a href={`${WA_BASE}?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-[#0F2854] hover:bg-[#0d2248] text-white font-bold text-xs px-3.5 py-2 transition-colors">
            <WAIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <a href="#enquire"
            className="flex items-center gap-1.5 bg-[#0F2854] hover:bg-[#0d2248] text-white font-bold text-xs px-4 py-2 transition-colors uppercase tracking-wide">
            <FiSend size={11} />
            Get a Quote
          </a>
        </div>
      </div>
    </div>
  );
}

// ── Hero Carousel ─────────────────────────────────────────────────────────────

function HeroCarousel() {
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (i: number) => {
    setIdx(i);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setIdx(p => (p + 1) % CAROUSEL_IMGS.length), 4500);
  };

  useEffect(() => {
    timer.current = setInterval(() => setIdx(p => (p + 1) % CAROUSEL_IMGS.length), 4500);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, []);

  return (
    <div className="relative w-full overflow-hidden shadow-2xl" style={{ height: 'clamp(220px,40vh,420px)' }}>
      <AnimatePresence mode="wait">
        <motion.img key={idx} src={CAROUSEL_IMGS[idx]} alt="Crystal Group cold storage"
          initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.55 }} className="absolute inset-0 w-full h-full object-cover" />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />

      <button onClick={() => goTo((idx - 1 + CAROUSEL_IMGS.length) % CAROUSEL_IMGS.length)}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/25 hover:bg-black/45 backdrop-blur-sm flex items-center justify-center transition-colors">
        <FiChevronLeft size={15} className="text-white" />
      </button>
      <button onClick={() => goTo((idx + 1) % CAROUSEL_IMGS.length)}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/25 hover:bg-black/45 backdrop-blur-sm flex items-center justify-center transition-colors">
        <FiChevronRight size={15} className="text-white" />
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {CAROUSEL_IMGS.map((_, i) => (
          <button key={i} onClick={() => goTo(i)}
            className={`h-1 transition-all duration-300 ${i === idx ? 'w-6 bg-[#FAC212]' : 'w-1.5 bg-white/50'}`} />
        ))}
      </div>
    </div>
  );
}

// ── Lead Form ─────────────────────────────────────────────────────────────────

function LeadForm({ data, location }: { data: LPData; location: string }) {
  const [form, setForm] = useState({ name: '', phone: '', city: '', requirement: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
  };

  if (status === 'success') {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-10 gap-4">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.1 }}
          className="w-16 h-16 bg-[#0F2854] flex items-center justify-center">
          <FiCheck size={28} className="text-[#FAC212]" />
        </motion.div>
        <h3 className="font-bold text-xl text-[#0F2854]">We'll call you in 2 hours</h3>
        <p className="text-sm text-gray-500">Our team is reviewing your requirement and will reach out shortly.</p>
        <a href={`${WA_BASE}?text=Hi%2C%20I%20just%20submitted%20a%20reefer%20quote%20for%20${encodeURIComponent(location)}.`}
          target="_blank" rel="noopener noreferrer"
          className="mt-2 flex items-center gap-2 bg-[#0F2854] hover:bg-[#0d2248] text-white font-semibold text-sm px-5 py-2.5 transition-colors">
          <WAIcon className="w-4 h-4" /> Chat on WhatsApp
        </a>
      </motion.div>
    );
  }

  const cities = data.cities || [];
  const inputCls = "w-full border border-[#0F2854]/20 px-4 py-3 text-sm text-[#0F2854] placeholder-gray-400 bg-white focus:outline-none focus:border-[#0F2854] focus:ring-2 focus:ring-[#0F2854]/10 transition-all";

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="mb-1">
        <h3 className="font-bold text-[#0F2854] text-xl">{data.form_heading || 'Get a Free Quote'}</h3>
        <p className="text-gray-500 text-sm mt-1">We call back within 2 hours.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        <input required value={form.name} onChange={set('name')} placeholder="Your Name *" className={inputCls} />
        <input required value={form.phone} onChange={set('phone')} placeholder="Mobile Number *" type="tel" className={inputCls} />
      </div>

      {cities.length > 0 && (
        <div className="relative">
          <select value={form.city} onChange={set('city')}
            className={`${inputCls} appearance-none cursor-pointer pr-10 ${form.city ? 'text-[#0F2854]' : 'text-gray-400'}`}
            style={{ fontWeight: form.city ? '500' : '400' }}>
            <option value="" disabled>Select City</option>
            {cities.map(c => <option key={c} value={c} className="text-[#0F2854] font-medium bg-white">{c}</option>)}
          </select>
          <FiChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#0F2854]/50 pointer-events-none" />
        </div>
      )}

      <textarea value={form.requirement} onChange={set('requirement')}
        placeholder="Requirement — container size, product type, duration"
        rows={3} className={`${inputCls} resize-none`} />

      <button type="submit" disabled={status === 'loading'}
        className="w-full bg-[#0F2854] hover:bg-[#0d2248] text-white font-bold py-3.5 text-sm uppercase tracking-wide transition-colors flex items-center justify-center gap-2 disabled:opacity-60">
        {status === 'loading' ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white animate-spin" style={{ borderRadius: '50%' }} />
        ) : (
          <>{data.form_submit_label || 'Request My Free Quote'} <FiArrowRight /></>
        )}
      </button>

      <p className="text-[11px] text-gray-400 text-center">{data.form_disclaimer || "No spam. We'll call you within 2 business hours."}</p>
    </form>
  );
}

// ── Marquee ───────────────────────────────────────────────────────────────────

function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-3.5 bg-[#0F2854]">
      <style>{`
        @keyframes marquee-lp { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .marquee-lp { animation: marquee-lp 28s linear infinite; }
        .marquee-lp:hover { animation-play-state: paused; }
      `}</style>
      <div className="flex gap-0 marquee-lp whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-2 px-6 text-sm font-medium text-white/70">
            <span className="w-1 h-1 bg-[#FAC212] shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── Gallery (bento) ───────────────────────────────────────────────────────────

function Gallery({ items }: { items: { image: string; label: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const imgs = items.filter(i => i.image);
  if (imgs.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3" style={{ gridAutoRows: '150px' }}>
        {imgs.map((item, i) => {
          const cls = i === 0 ? 'md:col-span-2 md:row-span-2' : '';
          return (
            <motion.button key={i} onClick={() => setOpen(i)}
              className={`relative overflow-hidden group cursor-zoom-in ${cls}`}
              whileHover={{ opacity: 0.92 }} transition={{ duration: 0.2 }}>
              <img src={item.image} alt={item.label} loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-2 left-2 right-2 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
      <AnimatePresence>
        {open !== null && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
            <button className="absolute top-4 right-4 text-white/60 hover:text-white"><FiX size={24} /></button>
            <img src={imgs[open].image} alt={imgs[open].label} className="max-w-full max-h-[85vh] object-contain" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Container Accordion ───────────────────────────────────────────────────────

function ContainerAccordion() {
  const [open, setOpen] = useState<number>(1);
  return (
    <div className="flex flex-col gap-2">
      {CONTAINERS.map((c, i) => (
        <div key={i} className={`border overflow-hidden transition-colors ${open === i ? 'border-[#0F2854]' : 'border-gray-200'}`}>
          <button onClick={() => setOpen(open === i ? -1 : i)}
            className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors ${open === i ? 'bg-[#0F2854]' : 'bg-white hover:bg-gray-50'}`}>
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-black uppercase tracking-wider px-2 py-0.5 ${open === i ? 'bg-[#FAC212] text-[#0F2854]' : 'bg-gray-100 text-gray-500'}`}>{c.tag}</span>
              <span className={`font-bold text-base ${open === i ? 'text-white' : 'text-[#0F2854]'}`}>{c.size}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className={`font-bold text-sm hidden sm:block ${open === i ? 'text-[#FAC212]' : 'text-[#0F2854]'}`}>{c.priceFrom}</span>
              <motion.span animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                <FiChevronDown size={18} className={open === i ? 'text-white' : 'text-gray-400'} />
              </motion.span>
            </div>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                <div className="px-5 py-5 bg-[#f8f9ff] grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div><p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Temperature</p><p className="font-bold text-[#0F2854] text-sm">{c.temp}</p></div>
                  <div><p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Capacity</p><p className="font-bold text-[#0F2854] text-sm">{c.capacity}</p></div>
                  <div><p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Dimensions</p><p className="font-bold text-[#0F2854] text-sm">{c.dimensions}</p></div>
                  <div><p className="text-[10px] uppercase tracking-widest text-gray-400 mb-1">Rental from</p><p className="font-bold text-[#FAC212] text-sm">{c.priceFrom}</p></div>
                  <div className="col-span-2 md:col-span-4">
                    <p className="text-sm text-gray-600 leading-relaxed mb-3">{c.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {c.useCases.map(u => <span key={u} className="text-[11px] bg-white border border-[#0F2854]/10 text-[#0F2854] px-3 py-1 font-medium">{u}</span>)}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

// ── Why List ──────────────────────────────────────────────────────────────────

function WhyList() {
  return (
    <div className="flex flex-col">
      {WHY.map((w, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: 10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
          className="flex items-center gap-3 py-3 border-b border-gray-100 last:border-0 group">
          <div className="w-7 h-7 bg-[#0F2854]/6 flex items-center justify-center shrink-0 group-hover:bg-[#0F2854] transition-colors duration-200">
            <w.icon size={13} className="text-[#0F2854] group-hover:text-[#FAC212] transition-colors duration-200" />
          </div>
          <span className="text-sm font-semibold text-[#0F2854]">{w.title}</span>
        </motion.div>
      ))}
    </div>
  );
}

// ── Container SVG ─────────────────────────────────────────────────────────────

function ReeferContainerIcon() {
  return (
    <div className="flex flex-col items-center gap-0.5 drop-shadow-lg">
      <div className="w-16 h-8 bg-[#0F2854] relative overflow-hidden border border-[#FAC212]/40">
        {[20, 40, 60, 80].map(p => (
          <div key={p} className="absolute top-0 bottom-0 w-px bg-white/10" style={{ left: `${p}%` }} />
        ))}
        <div className="absolute top-0 left-0 right-0 h-1 bg-[#FAC212]/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[#FAC212] text-[6px] font-black tracking-[0.2em] leading-none">CRYSTAL</span>
        </div>
        <div className="absolute right-1.5 top-1 bottom-1 border-l border-white/20" />
      </div>
      <div className="flex gap-5 -mt-0.5">
        <div className="w-2.5 h-2.5 bg-gray-700 border border-gray-500 shadow-sm" style={{ borderRadius: '50%' }} />
        <div className="w-2.5 h-2.5 bg-gray-700 border border-gray-500 shadow-sm" style={{ borderRadius: '50%' }} />
      </div>
    </div>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────

function Steps() {
  const [active, setActive] = useState(0);
  const [done, setDone] = useState<number[]>([]);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.25 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % STEPS.length;
        if (next === 0) { setDone([]); }
        else { setDone(d => (d.includes(prev) ? d : [...d, prev])); }
        return next;
      });
    }, 2200);
    return () => clearInterval(id);
  }, [inView]);

  const PCT = [6.5, 35.5, 64.5, 93.5];
  const PROGRESS = ['0%', '33.3%', '66.6%', '100%'];

  return (
    <div className="relative" ref={sectionRef}>
      {/* Desktop track */}
      <div className="hidden md:block relative mb-8" style={{ height: 60 }}>
        <div className="absolute top-[20px] h-1 bg-gray-200"
          style={{ left: `${PCT[0]}%`, right: `${100 - PCT[3]}%` }}>
          <motion.div className="absolute left-0 top-0 h-full bg-[#FAC212]"
            animate={{ width: PROGRESS[active] }} transition={{ duration: 0.55, ease: 'easeInOut' }} />
        </div>

        {PCT.map((p, i) => (
          <div key={i} className="absolute top-[14px] -translate-x-1/2 w-4 h-4 border-2 transition-all duration-300"
            style={{
              left: `${p}%`,
              background: done.includes(i) || active === i ? '#0F2854' : 'white',
              borderColor: done.includes(i) || active === i ? '#FAC212' : '#d1d5db',
            }} />
        ))}

        <motion.div className="absolute top-0 -translate-x-1/2"
          animate={{ left: `${PCT[active]}%` }}
          transition={active === 0 && done.length === 0 ? { duration: 0.3 } : { type: 'spring', stiffness: 70, damping: 16 }}>
          <ReeferContainerIcon />
        </motion.div>
      </div>

      {/* Steps grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-4">
        {STEPS.map((s, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
            className="flex flex-col items-center text-center gap-3">
            <motion.div
              animate={active === i ? { scale: [1, 1.1, 1] } : { scale: 1 }}
              transition={{ duration: 0.35 }}
              className={`w-14 h-14 flex items-center justify-center border-4 transition-all duration-300 ${
                done.includes(i) ? 'bg-[#0F2854] border-[#FAC212]/50'
                : active === i ? 'bg-[#0F2854] border-[#FAC212]/60'
                : 'bg-gray-50 border-gray-200'
              }`}>
              <AnimatePresence mode="wait">
                {done.includes(i) ? (
                  <motion.span key="tick"
                    initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 20 }}>
                    <FiCheck size={20} className="text-[#FAC212]" />
                  </motion.span>
                ) : (
                  <motion.span key="num" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className={`font-black text-base ${active === i ? 'text-[#FAC212]' : 'text-gray-400'}`}>
                    {s.num}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
            <h4 className={`font-bold text-sm leading-snug transition-colors duration-300 ${
              done.includes(i) || active === i ? 'text-[#0F2854]' : 'text-gray-400'
            }`}>{s.title}</h4>
            <p className="text-xs text-gray-500 leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Mini Footer ───────────────────────────────────────────────────────────────

function MiniFooter() {
  return (
    <footer className="bg-[#0F2854] py-6 px-5 flex flex-col items-center gap-2">
      <img src="/crystal-logo-black.webp" alt="Crystal Group" className="h-7 brightness-0 invert" />
      <p className="text-white/40 text-xs">© 2026 Crystal Logistic Cool Chain Ltd.</p>
    </footer>
  );
}

// ── Floating Call Button ──────────────────────────────────────────────────────

function FloatingButtons() {
  return (
    <>
      <style>{`
        @keyframes call-pulse {
          0%   { box-shadow: 0 0 0 0 rgba(250,194,18,0.45); }
          70%  { box-shadow: 0 0 0 14px rgba(250,194,18,0); }
          100% { box-shadow: 0 0 0 0 rgba(250,194,18,0); }
        }
        .call-btn { animation: call-pulse 2.2s ease-out infinite; }
      `}</style>
      <motion.a href={`tel:${PHONE.replace(/\s/g, '')}`}
        initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1, type: 'spring' }}
        whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
        className="call-btn fixed bottom-6 left-5 z-50 w-14 h-14 bg-[#0F2854] shadow-xl flex items-center justify-center border-2 border-[#FAC212]/50"
        style={{ borderRadius: '50%' }}
        aria-label="Call us">
        <motion.span
          animate={{ rotate: [0, -14, 14, -8, 8, 0] }}
          transition={{ duration: 0.55, repeat: Infinity, repeatDelay: 3.5 }}>
          <FiPhone size={22} className="text-[#FAC212]" />
        </motion.span>
      </motion.a>
    </>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ReeferLP({ data }: { data: LPData }) {
  const location = data.location || 'India';
  const heading = data.hero_heading || `Reefer Container Rental &amp; Leasing in ${location}`;
  const subheading = data.hero_subheading || `Temperature-controlled containers from ₹1,300/day. FSSAI-compliant. 24/7 remote monitoring. Flexible rental and leasing for pharma, food, and FMCG.`;
  const pricing = data.hero_pricing || [
    { label: 'Rental from', value: '₹1,300/day', note: '*GST extra' },
    { label: 'Lease from',  value: '₹28,000/mo', note: '*T&C apply' },
  ];
  const serveItems = data.serve_items || [
    'Pharmaceuticals', 'Dairy & Milk', 'Seafood & Marine', 'Fresh Produce',
    'Ice Cream & Frozen', 'Hospitality & Events', 'Floriculture', 'Chemicals',
    'Poultry & Meat', 'FMCG Distribution', 'Quick Commerce', 'Confectionery',
  ];
  const gallery = data.gallery || [];

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  return (
    <div className="font-body bg-[#F7F8FA] overflow-x-hidden">
      <TopBar location={location} cities={data.cities || []} />
      <div className="h-[46px]" />

      {/* ── HERO ── */}
      <section className="relative bg-[#0F2854] overflow-hidden pb-14 md:pb-16">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 48px)' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 pt-8 pb-6 md:pt-16 md:pb-8 grid md:grid-cols-2 gap-6 md:gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 mb-4">
              <FiMapPin size={12} className="text-[#FAC212]" />
              <span className="text-[#FAC212] text-xs font-bold uppercase tracking-widest">{location}</span>
            </div>
            <h1 className="font-heading font-extrabold text-white text-2xl md:text-4xl leading-tight tracking-tight mb-4"
              dangerouslySetInnerHTML={{ __html: heading }} />
            <p className="text-white/65 text-sm leading-relaxed mb-5">{subheading}</p>

            <div className="flex flex-wrap gap-2 mb-5">
              {pricing.map((p, i) => (
                <div key={i} className="bg-white/10 border border-white/10 px-3 py-2.5 flex flex-col min-w-[110px]">
                  <span className="text-white/50 text-[10px] uppercase tracking-wider">{p.label}</span>
                  <span className="text-[#FAC212] font-black text-xl leading-tight">{p.value}</span>
                  {p.note && <span className="text-white/30 text-[9px] mt-0.5">{p.note}</span>}
                </div>
              ))}
            </div>

            <a href="#enquire"
              className="inline-flex items-center gap-2 bg-[#FAC212] hover:bg-[#e6b010] text-[#0F2854] font-bold px-6 py-3 text-sm uppercase tracking-wide transition-colors">
              Get Free Quote <FiArrowRight size={15} />
            </a>
            {data.hero_disclaimer && <p className="text-white/30 text-[10px] mt-4 leading-relaxed">{data.hero_disclaimer}</p>}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <HeroCarousel />
          </motion.div>
        </div>

        {/* Peek card */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center px-5 md:px-10">
          <div className="w-full max-w-2xl bg-white px-7 pt-5 pb-0 shadow-2xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#0F2854]/40 font-black mb-1">Free Quote</p>
            <p className="text-[#0F2854] font-bold text-base">Get a reefer container quote in 2 hours</p>
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section id="enquire" className="bg-[#F7F8FA] flex justify-center px-5 md:px-10 pb-14" style={{ scrollMarginTop: '56px' }}>
        <div className="w-full max-w-2xl bg-white shadow-2xl px-7 py-7 border-t border-gray-100">
          <LeadForm data={data} location={location} />
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-white border-y border-gray-100">
        <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 grid grid-cols-2 md:grid-cols-4 gap-6">
          {STATS.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
              className="flex flex-col items-center text-center">
              <span className="font-black text-3xl md:text-4xl text-[#0F2854] leading-none">{s.value}</span>
              <span className="text-xs text-gray-500 mt-1.5 font-medium uppercase tracking-wider">{s.label}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <Marquee items={serveItems} />

      {/* ── GALLERY ── */}
      {gallery.filter(g => g.image).length > 0 && (
        <section className="max-w-6xl mx-auto px-5 md:px-10 py-10 md:py-14">
          <SectionLabel text="Our Fleet" />
          <h2 className="font-heading font-extrabold text-[#0F2854] text-2xl md:text-3xl mb-8">
            Reefer containers deployed across {location}
          </h2>
          <Gallery items={gallery} />
        </section>
      )}

      {/* ── CONTAINER SIZES + WHY CHOOSE ── */}
      <section className="bg-white py-10 md:py-14 px-5 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-[1fr_280px] gap-0 items-start">

            {/* Left — accordion */}
            <div className="md:pr-12 md:border-r md:border-gray-200">
              <SectionLabel text="Container Sizes" />
              <h2 className="font-heading font-extrabold text-[#0F2854] text-2xl md:text-3xl mb-2">Find the right reefer</h2>
              <p className="text-gray-500 text-sm mb-7">−25°C to +25°C. Final pricing based on location and duration.</p>
              <ContainerAccordion />
            </div>

            {/* Right — why list */}
            <div className="md:pl-12 md:sticky md:top-20 mt-12 md:mt-0">
              <SectionLabel text="Why Crystal Group" />
              <h2 className="font-heading font-extrabold text-[#0F2854] text-xl md:text-2xl mb-6 leading-snug">
                Cold chain that never lets you down
              </h2>
              <WhyList />
              <a href="#enquire"
                className="mt-8 flex items-center justify-center gap-2 bg-[#FAC212] hover:bg-[#e6b010] text-[#0F2854] font-bold px-5 py-3 text-sm uppercase tracking-wide transition-colors">
                Get Free Quote <FiArrowRight size={14} />
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ── 4 STEPS ── */}
      <section className="bg-[#F7F8FA] py-10 md:py-14 px-5 md:px-10 border-t border-gray-100">
        <div className="max-w-4xl mx-auto">
          <SectionLabel text="How It Works" />
          <h2 className="font-heading font-extrabold text-[#0F2854] text-2xl md:text-3xl mb-2 text-center">Get your reefer in 4 steps</h2>
          <p className="text-gray-500 text-sm text-center mb-12">From requirement to deployment — faster than you expect.</p>
          <Steps />
          <div className="flex justify-center mt-12">
            <a href="#enquire"
              className="bg-[#FAC212] hover:bg-[#e6b010] text-[#0F2854] font-bold px-8 py-3.5 text-sm uppercase tracking-wide transition-colors flex items-center gap-2">
              Get a Free Quote <FiArrowRight />
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <MiniFooter />

      {/* ── FLOATING CALL ── */}
      <FloatingButtons />
    </div>
  );
}
