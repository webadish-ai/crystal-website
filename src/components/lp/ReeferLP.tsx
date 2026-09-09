import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import {
  FiPhone, FiChevronDown, FiCheck, FiArrowRight, FiMapPin,
  FiChevronLeft, FiChevronRight,
} from 'react-icons/fi';

// ── Constants ─────────────────────────────────────────────────────────────────

const PHONE_RAW = '919892512900';
const WA_BASE = `https://wa.me/${PHONE_RAW}`;

const STATS = [
  { value: '15k+', label: 'Assignments Delivered' },
  { value: '99%',  label: 'Temperature Uptime' },
  { value: '120+', label: 'Cities Served' },
  { value: '24h',  label: 'Response Time' },
];

const PRODUCT_GALLERY = [
  { image: '/images/lp/products/meat-seafood.webp', label: 'Meat & Seafood' },
  { image: '/images/lp/products/dairy.webp', label: 'Dairy' },
  { image: '/images/lp/products/pharma.webp', label: 'Pharma' },
  { image: '/images/lp/products/chemical.webp', label: 'Chemical' },
  { image: '/images/lp/products/fmcg.webp', label: 'FMCG' },
  { image: '/images/lp/products/fruits-vegetables.webp', label: 'Fruits & Vegetables' },
];

const WHY_CHOOSE = [
  { pre: '', bold: 'Temperature:', post: ' −25°C to +25°C.' },
  { pre: '', bold: 'Sizes:', post: ' 10FT, 20FT, & 40FT.' },
  { pre: '', bold: 'Customizable', post: ' to suit your needs.' },
  { pre: '', bold: '', post: 'Hassle-free installation.' },
  { pre: 'Available for ', bold: 'short and long-term rental.', post: '' },
];

const TESTIMONIALS = [
  {
    quote: "Crystal Group's reefer containers have been vital for maintaining the quality of Dr. Reddy's pharma products, offering precise temperature control and dependable service.",
    client: "Dr. Reddy's",
  },
  {
    quote: "Crystal Group's reefer containers have been crucial for Lupin Labs, ensuring precise temperature control for our medicines and reliable service throughout.",
    client: 'Lupin Labs',
  },
  {
    quote: "Crystal Group's reefer containers have been excellent for storing ITC's dairy products, ensuring optimal freshness and reliable temperature control!",
    client: 'ITC',
  },
];

const CAROUSEL_IMGS = [
  '/images/lp/landing-slider-img1.webp',
  '/images/lp/landing-slider-img2.webp',
  '/images/lp/landing-slider-img3.webp',
  '/images/lp/landing-slider-img4.webp',
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
            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold text-xs px-3.5 py-2 transition-colors">
            <WAIcon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">WhatsApp</span>
          </a>
          <a href={`tel:${PHONE_RAW}`}
            className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1ebe57] text-white font-bold text-xs px-4 py-2 transition-colors uppercase tracking-wide">
            <FiPhone size={11} />
            Call Us
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
  const [form, setForm] = useState({ name: '', email: '', phone: '', city: '', requirement: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(f => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');
    const apiBase = import.meta.env.PUBLIC_API_URL ?? '';
    try {
      const res = await fetch(`${apiBase}/api/enquiries/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.city,
          service: `Reefer Container — ${location}`,
          message: form.requirement,
        }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || 'Something went wrong. Please try again.');
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
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

      <input required value={form.email} onChange={set('email')} placeholder="Email Address *" type="email" className={inputCls} />

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

      {status === 'error' && (
        <p className="text-red-600 text-sm text-center">{error}</p>
      )}

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
        .marquee-lp { animation: marquee-lp 14s linear infinite; }
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

// ── Product Gallery ───────────────────────────────────────────────────────────

function ProductGallery() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {PRODUCT_GALLERY.map((item, i) => (
        <img key={i} src={item.image} alt={item.label} loading="lazy"
          className="w-full aspect-video object-cover" />
      ))}
    </div>
  );
}

// ── Why Choose + We Serve ─────────────────────────────────────────────────────

function WhyChooseServe({ serveItems }: { serveItems: string[] }) {
  return (
    <div className="grid md:grid-cols-2 gap-8 md:gap-10">
      <div>
        <h2 className="font-heading font-extrabold text-[#0F2854] text-2xl md:text-3xl mb-5">
          Why Choose Our Reefer Containers?
        </h2>
        <ul className="flex flex-col gap-2.5 mb-6">
          {WHY_CHOOSE.map((w, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0F2854] mt-1.5 shrink-0" />
              <span>{w.pre}<strong className="text-[#0F2854]">{w.bold}</strong>{w.post}</span>
            </li>
          ))}
        </ul>
        <a href="#enquire"
          className="inline-flex items-center gap-2 bg-[#0F2854] hover:bg-[#0d2248] text-white font-bold px-6 py-3 text-sm transition-colors">
          Talk To Our Expert Now!
        </a>
      </div>
      <div className="bg-[#F7F8FA] p-6 md:p-8">
        <h2 className="font-heading font-extrabold text-[#0F2854] text-2xl md:text-3xl mb-5">We Serve</h2>
        <ul className="flex flex-col gap-2.5">
          {serveItems.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-sm text-gray-600">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FAC212] mt-1.5 shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// ── Testimonials ──────────────────────────────────────────────────────────────

function Testimonials() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {TESTIMONIALS.map((t, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
          className="bg-white border border-gray-100 p-6 flex flex-col gap-4">
          <div className="flex gap-0.5 text-[#FAC212]">
            {Array.from({ length: 5 }).map((_, s) => <span key={s}>★</span>)}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
          <p className="text-[#0F2854] font-bold text-sm">{t.client}</p>
        </motion.div>
      ))}
    </div>
  );
}

// ── Mini Footer ───────────────────────────────────────────────────────────────

function MiniFooter() {
  return (
    <footer className="bg-[#0F2854] py-6 px-5 flex flex-col items-center gap-2">
      <img src="/crystal-logo-black.webp" alt="Crystal Group" className="h-12 brightness-0 invert" />
      <p className="text-white/40 text-xs">© 2026 Crystal Logistic Cool Chain Ltd.</p>
    </footer>
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

        <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 pt-6 pb-4 md:pt-16 md:pb-8 grid md:grid-cols-2 gap-6 md:gap-14 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <FiMapPin size={12} className="text-[#FAC212]" />
              <span className="text-[#FAC212] text-xs font-bold uppercase tracking-widest">{location}</span>
            </div>
            <h1 className="font-heading font-extrabold text-white text-2xl md:text-4xl leading-tight tracking-tight mb-3 md:mb-4"
              dangerouslySetInnerHTML={{ __html: heading }} />
            <p className="text-white/65 text-sm leading-relaxed mb-3 md:mb-5">{subheading}</p>

            <div className="flex flex-wrap gap-2 mb-3 md:mb-5">
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
            {data.hero_disclaimer && <p className="text-white/30 text-[10px] mt-3 md:mt-4 leading-relaxed hidden md:block">{data.hero_disclaimer}</p>}
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="hidden md:block">
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
      <section id="enquire" className="bg-[#F7F8FA] flex justify-center px-5 md:px-10 pt-3 pb-14 md:pt-0" style={{ scrollMarginTop: '56px' }}>
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

      {/* ── PRODUCT GALLERY + WHY CHOOSE / WE SERVE (Punjab only, for now) ── */}
      {location === 'Punjab' && (
        <section className="bg-white py-10 md:py-14 px-5 md:px-10">
          <div className="max-w-6xl mx-auto flex flex-col gap-10">
            <ProductGallery />
            <WhyChooseServe serveItems={serveItems} />
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ── */}
      <section className="bg-white py-10 md:py-14 px-5 md:px-10">
        <div className="max-w-6xl mx-auto">
          <SectionLabel text="Trusted By Industry Leaders" />
          <h2 className="font-heading font-extrabold text-[#0F2854] text-2xl md:text-3xl mb-8">
            Hear what our clients have to say
          </h2>
          <Testimonials />
        </div>
      </section>

      {/* ── FOOTER ── */}
      <MiniFooter />
    </div>
  );
}
