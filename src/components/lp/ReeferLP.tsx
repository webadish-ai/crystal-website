import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from 'lenis';
import {
  FiPhone, FiChevronDown, FiCheck, FiArrowRight, FiMapPin,
  FiChevronLeft, FiChevronRight,
} from 'react-icons/fi';

// ── Constants ─────────────────────────────────────────────────────────────────

const PHONE_RAW = '919892512900';

// States whose live crystalgroup.in page uses the "hero+form side by side,
// no carousel/stats/marquee" layout. Bhubaneswar has no live page of its own
// (its old URL now redirects to Gujarat's) and UAE's live page is an
// entirely different template — both keep the original layout below.
const LIVE_LAYOUT_STATES = new Set([
  'Punjab', 'Telangana', 'Karnataka', 'Andhra Pradesh', 'Gujarat', 'Maharashtra', 'Tamil Nadu',
]);
const WA_BASE = `https://wa.me/${PHONE_RAW}`;
const PUNJAB_PHONE_RAW = '919324975060';
const PUNJAB_WA_BASE = `https://wa.me/${PUNJAB_PHONE_RAW}`;

const PUNJAB_LIVE_GALLERY = [
  'https://crystalgroup.in/wp-content/uploads/2026/02/landingpage-gallery-img5.webp',
  'https://crystalgroup.in/wp-content/uploads/2026/02/landingpage-gallery-img6.webp',
  'https://crystalgroup.in/wp-content/uploads/2026/02/12-landingpage-gallery-img3.webp',
  'https://crystalgroup.in/wp-content/uploads/2026/02/12-landingpage-gallery-img2.webp',
  'https://crystalgroup.in/wp-content/uploads/2026/02/landingpage-gallery-img4.webp',
  'https://crystalgroup.in/wp-content/uploads/2026/02/landingpage-gallery-img1.webp',
];

const PUNJAB_LIVE_TESTIMONIALS = [
  {
    brand: 'LAURUS Labs',
    quote: "Crystal Group’s reefer solutions have significantly improved our efficiency, with proactive upgrades and quick support. Their two-bay reefer plan reflects a strong vision for our growth.",
  },
  {
    brand: 'zepto',
    quote: "Crystal Group’s reefer containers have ensured our perishable goods stay fresh, with excellent temperature control and reliable support!",
  },
  {
    brand: "Dr.Reddy's",
    quote: "Crystal Group’s reefer containers have been vital for maintaining the quality of Dr. Reddy's pharma products, offering precise temperature control and dependable service.",
  },
];

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

function HeroCarousel({ images }: { images?: string[] }) {
  const carouselImgs = images && images.length > 0 ? images : CAROUSEL_IMGS;
  const [idx, setIdx] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (i: number) => {
    setIdx(i);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => setIdx(p => (p + 1) % carouselImgs.length), 4500);
  };

  useEffect(() => {
    timer.current = setInterval(() => setIdx(p => (p + 1) % carouselImgs.length), 4500);
    return () => { if (timer.current) clearInterval(timer.current); };
  }, [carouselImgs.length]);

  return (
    <div className="relative w-full overflow-hidden shadow-2xl rounded-lg my-4 bg-[#0F2854]" style={{ height: 'clamp(200px, 34vh, 320px)' }}>
      <img
        key={idx}
        src={carouselImgs[idx % carouselImgs.length]}
        alt="Crystal Group cold storage"
        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 opacity-100"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {carouselImgs.length > 1 && (
        <>
          <button type="button" onClick={() => goTo((idx - 1 + carouselImgs.length) % carouselImgs.length)}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-colors text-white z-10"
            aria-label="Previous Slide">
            <FiChevronLeft size={16} />
          </button>
          <button type="button" onClick={() => goTo((idx + 1) % carouselImgs.length)}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center transition-colors text-white z-10"
            aria-label="Next Slide">
            <FiChevronRight size={16} />
          </button>

          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {carouselImgs.map((_, i) => (
              <button key={i} type="button" onClick={() => goTo(i)}
                className={`h-1.5 transition-all duration-300 rounded-full ${i === idx ? 'w-6 bg-[#FAC212]' : 'w-2 bg-white/60'}`} />
            ))}
          </div>
        </>
      )}
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

// ── Product Slider ────────────────────────────────────────────────────────────

function ProductSlider({ items }: { items?: { image: string; label: string }[] }) {
  const list = items && items.length > 0 ? items : PRODUCT_GALLERY;
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx(i => (i - 1 + list.length) % list.length);
  const next = () => setIdx(i => (i + 1) % list.length);

  return (
    <div className="flex flex-col gap-4">
      {/* Main Slider Box */}
      <div className="relative w-full rounded-lg overflow-hidden shadow-lg border border-gray-100 bg-[#0F2854]" style={{ height: 'clamp(240px, 42vh, 420px)' }}>
        <img
          key={idx}
          src={list[idx % list.length].image}
          alt={list[idx % list.length].label}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

        {/* Label Badge */}
        <span className="absolute bottom-4 left-4 bg-black/60 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded backdrop-blur-sm">
          {list[idx % list.length].label}
        </span>

        {/* Navigation Arrows */}
        {list.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-10"
              aria-label="Previous Slide"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/50 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm transition-colors z-10"
              aria-label="Next Slide"
            >
              <FiChevronRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Bar */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {list.map((item, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIdx(i)}
            className={`relative rounded-md overflow-hidden border-2 aspect-video transition-all ${
              i === idx ? 'border-[#0F2854] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            <img src={item.image} alt={item.label} className="w-full h-full object-cover" />
            <span className="absolute bottom-0 inset-x-0 bg-[#0F2854]/80 text-[10px] text-white text-center py-0.5 truncate px-1 font-medium">
              {item.label}
            </span>
          </button>
        ))}
      </div>
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

// ── Punjab live-page exact variant ───────────────────────────────────────────

function PunjabLiveTopBar() {
  return (
    <div className="fixed inset-x-0 top-0 z-50 h-[50px] bg-[#E3E7FF]">
      <div className="mx-auto flex h-[50px] max-w-[1140px] items-center justify-center gap-3 px-4 sm:px-5 md:justify-between md:gap-0 md:px-0">
        <a
          href={`${PUNJAB_WA_BASE}?text=Hi%2C%20I%20need%20a%20reefer%20container%20quote%20for%20Punjab.`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-[#25D366] bg-[#25D366] px-2.5 font-heading text-[16px] font-medium leading-[18px] text-white sm:text-[18px]"
        >
          <WAIcon className="h-4 w-4" />
          WhatsApp
        </a>
        <a
          href={`tel:+${PUNJAB_PHONE_RAW}`}
          className="inline-flex h-10 items-center gap-1.5 rounded-[10px] border border-[#0550BF] bg-[#152D61] px-2.5 font-heading text-[16px] font-medium leading-[18px] text-white sm:text-[18px]"
        >
          Call Us
          <FiPhone size={16} />
        </a>
      </div>
    </div>
  );
}

function PunjabLiveQuoteForm({ location }: { location: string }) {
  const [form, setForm] = useState({ company: '', name: '', phone: '', email: '', comment: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [error, setError] = useState('');

  const set = (key: keyof typeof form) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm(current => ({ ...current, [key]: event.target.value }));

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setStatus('loading');
    setError('');
    try {
      const apiBase = import.meta.env.PUBLIC_API_URL ?? '';
      const response = await fetch(`${apiBase}/api/enquiries/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          company: form.company,
          service: `Reefer Container — ${location}`,
          message: form.comment,
        }),
      });
      const body = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(body.error || 'Something went wrong. Please try again.');
      setStatus('success');
    } catch (submissionError) {
      setError(submissionError instanceof Error ? submissionError.message : 'Something went wrong. Please try again.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex h-full min-h-[540px] flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center bg-[#0F2854]"><FiCheck size={28} className="text-[#FAC212]" /></div>
        <h3 className="font-heading text-xl font-bold text-[#0F2854]">We'll call you in 2 hours</h3>
        <p className="text-sm text-gray-500">Our team is reviewing your requirement and will reach out shortly.</p>
        <a href={`${PUNJAB_WA_BASE}?text=Hi%2C%20I%20just%20submitted%20a%20reefer%20quote%20for%20${location}.`} target="_blank" rel="noopener noreferrer" className="bg-[#0F2854] px-5 py-2.5 text-sm font-semibold text-white">
          Chat on WhatsApp
        </a>
      </div>
    );
  }

  const inputClass = 'h-[43px] w-full rounded-[5px] border border-black/25 bg-white px-[14px] text-[16px] leading-[21px] text-black/70 placeholder:text-black/25 focus:border-[#0F2854] focus:outline-none';

  return (
    <form onSubmit={submit} className="flex flex-col">
      <h2 className="mb-[39px] text-center font-heading text-[25px] font-semibold leading-[25px] text-black">Enquire Now</h2>
      <div className="grid grid-cols-1 gap-[20px] sm:grid-cols-3">
        <input aria-label="Company Name" value={form.company} onChange={set('company')} placeholder="Company Name" className={inputClass} />
        <input aria-label="Your Name" required value={form.name} onChange={set('name')} placeholder="Your Name" className={inputClass} />
        <div className="relative">
          <span className="pointer-events-none absolute inset-y-0 left-2 flex items-center text-[15px]">🇮🇳</span>
          <input aria-label="Phone" required value={form.phone} onChange={set('phone')} placeholder="081234 56789" type="tel" className={`${inputClass} pl-[52px]`} />
        </div>
      </div>
      <div className="mt-[30px]">
        <input id="punjab-live-email" aria-label="Email" required value={form.email} onChange={set('email')} placeholder="Email" type="email" className={`${inputClass} sm:w-[170px]`} />
      </div>
      <div className="mt-[30px]">
        <textarea id="punjab-live-comment" aria-label="Comment" value={form.comment} onChange={set('comment')} placeholder="Comment" rows={4} className="block min-h-[120px] w-full resize-none rounded-[5px] border border-black/25 bg-white px-[14px] py-[14px] text-[16px] leading-[21px] text-black/70 placeholder:text-black/25 focus:border-[#0F2854] focus:outline-none" />
      </div>
      {status === 'error' && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={status === 'loading'} className="mt-[25px] w-fit bg-white px-[15px] py-[10px] text-[16px] font-medium leading-[21px] text-black disabled:opacity-60">
        {status === 'loading' ? 'Submitting…' : 'Submit'}
      </button>
      <p className="mt-[24px] text-[9px] leading-[13.5px] text-black/70">By submitting, you agree to be contacted regarding our services.</p>
    </form>
  );
}

function PunjabLiveImageCarousel() {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex(current => (current + 1) % CAROUSEL_IMGS.length), 4500);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="relative aspect-[9/5] h-auto w-full overflow-hidden rounded-[7px] md:h-[322px] md:aspect-auto" role="region" aria-label="Image Carousel">
      <img src={CAROUSEL_IMGS[index]} alt="Crystal Group Cold Chain Solutions" className="h-full w-full object-cover" />
    </div>
  );
}

function PunjabLiveGallery() {
  return (
    <div className="mt-7 grid grid-cols-3 gap-[10px]">
      {PUNJAB_LIVE_GALLERY.map((image) => (
        <a key={image} href={image} target="_blank" rel="noopener noreferrer" className="block aspect-[3/2] overflow-hidden rounded-[4px]">
          <img src={image} alt="Crystal Group Cold Chain Solutions" loading="lazy" className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]" />
        </a>
      ))}
    </div>
  );
}

function PunjabLiveWhyChooseServe({ items }: { items: string[] }) {
  return (
    <section className="mt-7 px-[10px]">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-[550px_550px] md:gap-[18px]">
        <div>
          <h2 className="font-heading text-[25px] font-semibold leading-[25px] text-black">Why Choose Our Reefer Containers?</h2>
          <ul className="mt-5 space-y-[7px] text-[16px] leading-[24px] text-black">
            <li className="list-disc pl-1"><strong>Temperature:</strong> -25°C to +25°C.</li>
            <li className="list-disc pl-1"><strong>Sizes:</strong> 10FT, 20FT, &amp; 40FT</li>
            <li className="list-disc pl-1"><strong>Customizable</strong> to suit your needs.</li>
            <li className="list-disc pl-1">Hassle-free installation.</li>
            <li className="list-disc pl-1">Available for <strong>short and long-term rental.</strong></li>
          </ul>
          <a href="#enquire" className="mt-5 inline-flex rounded-[4px] bg-[#0F2854] px-[10px] py-[10px] font-heading text-[16px] font-medium leading-[20px] tracking-[0.06em] text-white">Talk To Our Expert Now!</a>
        </div>
        <div className="-mt-2 bg-[#F7F8FA] px-3 py-[22px]">
          <h2 className="font-heading text-[25px] font-semibold leading-[25px] text-black">We Serve</h2>
          <ul className="mt-5 space-y-[7px] text-[16px] leading-[24px] text-black">
            {items.map(item => <li key={item} className="list-disc pl-1">{item}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function PunjabLiveTestimonials() {
  return (
    <section className="mt-[56px] px-[10px]">
      <h2 className="text-center font-heading text-[30px] font-semibold leading-[30px] text-black">Trusted by Industry Leaders</h2>
      <h2 className="mt-[10px] text-center font-heading text-[20px] font-normal leading-[20px] text-[#5C5C5C]">Hear what our clients have to say</h2>
      <div className="mx-auto mt-[10px] grid max-w-[1083px] grid-cols-1 gap-[10px] md:grid-cols-3" role="region" aria-label="Slides">
        {PUNJAB_LIVE_TESTIMONIALS.map((testimonial) => (
          <div key={testimonial.brand} className="flex h-auto min-h-[237px] flex-col rounded-[9px] border border-black bg-white p-[10px] md:h-[237px]">
            <div className={`flex h-[90px] w-[90px] shrink-0 items-center justify-center text-center font-heading font-bold ${testimonial.brand === 'zepto' ? 'text-[22px] text-[#7B1FA2]' : testimonial.brand.startsWith('Dr.') ? 'rounded-full bg-[#5B2ABF] px-2 text-[11px] text-white' : 'text-[11px] text-[#5E9D4D]'}`}>
              {testimonial.brand}
            </div>
            <p className="mt-[18px] flex-1 font-heading text-[16px] italic leading-[24px] text-black">{testimonial.quote}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function PunjabLiveFooter() {
  return (
    <footer className="relative mt-[70px] flex items-center justify-center gap-4 pb-[92px] text-center font-heading text-[14px] leading-[21px] text-black md:pb-[48px]">
      <span>* T&amp;C apply</span>
      <a href={`tel:+${PUNJAB_PHONE_RAW}`}>+91 9324975060</a>
      <a href="#enquire" className="fixed inset-x-4 bottom-4 z-40 inline-flex h-12 items-center justify-center rounded-[6px] bg-[#0F2854] px-5 font-heading text-[16px] font-semibold leading-[20px] text-white shadow-lg md:hidden">
        Get a Quote
      </a>
    </footer>
  );
}

function PunjabLiveExact({ data }: { data: LPData }) {
  const location = data.location || 'Punjab';
  const pricing = data.hero_pricing || [
    { label: 'Rental Starts at', value: '₹1,300 / day*' },
    { label: 'Purchase Starts at', value: '₹7,50,000*' },
  ];
  const cities = data.cities || [];
  const serveItems = data.serve_items || [];
  const heading = 'Reefer Containers Price in Punjab';

  return (
    <div className="min-h-screen bg-white font-body text-black">
      <PunjabLiveTopBar />
      <div className="h-[50px]" />

      <section className="relative h-auto min-h-[630px] bg-[rgba(2,30,73,0.97)]">
        <div className="mx-auto grid min-h-[630px] max-w-[1140px] grid-cols-1 gap-3 px-6 py-[16px] sm:gap-8 sm:px-8 sm:py-[30px] md:grid-cols-[547px_570px] md:gap-[23px] md:px-0">
          <div className="self-center md:h-[340px]">
            <h1 className="px-1 font-heading text-[24px] font-medium leading-[29px] text-white sm:px-0 sm:text-[35px] sm:leading-[42px]">{heading}</h1>
            <h5 className="mt-5 font-heading text-[16px] font-semibold leading-[21px] text-white/95 sm:mt-10 sm:text-[20px] sm:leading-[20px]">20ft &amp; 40ft Available | –25°C to +25°C Used for Pharma, Ice Cream &amp; Food Storage</h5>
            <div className="mt-5 space-y-[6px] font-heading text-[16px] font-semibold leading-[21px] text-white/95 sm:mt-[30px] sm:space-y-[10px] sm:text-[20px] sm:leading-[20px]">
              {pricing.slice(0, 2).map((price) => <div key={price.label}>{price.label} - {price.value}</div>)}
            </div>
            <p className="mt-5 text-[11px] leading-[16px] text-white/75 sm:mt-[30px] sm:text-[14px] sm:leading-[21px]">{data.hero_disclaimer || 'Prices are indicative and subject to change based on availability and market conditions.'}</p>
          </div>
          <div id="enquire" className="rounded-[10px] bg-[#F4F4F6] p-[10px] shadow-2xl" style={{ scrollMarginTop: '56px' }}>
            <PunjabLiveQuoteForm location={location} />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1140px] px-5 py-[30px] md:px-0">
        <section>
          <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[570px_547px] md:gap-[23px]">
            <PunjabLiveImageCarousel />
            <div className="-translate-y-[5px]">
              <h2 className="font-heading text-[25px] font-medium leading-[30px] text-black">Buy or Rent 20ft &amp; 40ft Refrigerated Containers with fast delivery across {location}.</h2>
              <p className="mt-8 font-heading text-[16px] leading-[24px] text-black">Ideal for Cold Storage, Pharma, Food &amp; Logistics</p>
            </div>
          </div>
          <div className="mt-[50px] flex min-h-[34px] h-auto items-center justify-center rounded-[8px] border border-black px-3 py-1 text-center font-heading text-[16px] leading-[20px] text-black sm:h-[34px] sm:px-0 sm:py-0 sm:text-[20px]">
            📍{cities.slice(0, 4).join(' • ')}
          </div>
          <PunjabLiveGallery />
        </section>

        <PunjabLiveWhyChooseServe items={serveItems} />
        <PunjabLiveTestimonials />
        <PunjabLiveFooter />
      </main>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function ReeferLP({ data }: { data: LPData }) {
  if (data.location === 'Punjab') return <PunjabLiveExact data={data} />;

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

      {LIVE_LAYOUT_STATES.has(location) ? (
        <>
          {/* ── HERO + FORM (side by side, matches live page exactly) ── */}
          <section className="relative bg-[#0F2854] overflow-hidden py-6 md:py-16">
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 48px)' }} />

            <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 grid md:grid-cols-2 gap-6 md:gap-14 items-start">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-2 mb-2 md:mb-4">
                  <FiMapPin size={12} className="text-[#FAC212]" />
                  <span className="text-[#FAC212] text-xs font-bold uppercase tracking-widest">{location}</span>
                </div>
                <h1 className="font-heading font-extrabold text-white text-xl md:text-4xl leading-tight tracking-tight mb-2 md:mb-4"
                  dangerouslySetInnerHTML={{ __html: heading }} />
                <p className="text-white/65 text-sm leading-relaxed mb-3 md:mb-5">{subheading}</p>

                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2.5 md:mb-5">
                  {pricing.map((p, i) => (
                    <div key={i} className="bg-white/10 border border-white/10 px-2.5 py-1.5 md:px-3 md:py-2.5 flex flex-col min-w-[92px] md:min-w-[110px]">
                      <span className="text-white/50 text-[9px] md:text-[10px] uppercase tracking-wider">{p.label}</span>
                      <span className="text-[#FAC212] font-black text-base md:text-xl leading-tight">{p.value}</span>
                      {p.note && <span className="text-white/30 text-[9px] mt-0.5">{p.note}</span>}
                    </div>
                  ))}
                </div>

                {data.hero_disclaimer && <p className="text-white/30 text-[10px] leading-relaxed">{data.hero_disclaimer}</p>}
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
                <div id="enquire" className="bg-white shadow-2xl px-7 py-7" style={{ scrollMarginTop: '56px' }}>
                  <LeadForm data={data} location={location} />
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── SUBHEADING + CITY PINS + PRODUCT GALLERY ── */}
          <section className="bg-white py-10 md:py-14 px-5 md:px-10">
            <div className="max-w-6xl mx-auto flex flex-col gap-6">
              <div>
                <h2 className="font-heading font-extrabold text-[#0F2854] text-xl md:text-2xl mb-2">
                  Buy or Rent 20ft &amp; 40ft Refrigerated Containers with fast delivery across {location}.
                </h2>
                <p className="text-gray-500 text-sm mb-2">Ideal for Cold Storage, Pharma, Food &amp; Logistics</p>
                {(data.cities || []).length > 0 && (
                  <p className="text-[#0F2854] text-sm font-semibold">
                    📍 {(data.cities || []).slice(0, 4).join(' • ')}
                  </p>
                )}
              </div>
              <ProductSlider items={data.gallery} />
            </div>
          </section>

          {/* ── WHY CHOOSE / WE SERVE ── */}
          <section className="bg-white pb-10 md:pb-14 px-5 md:px-10">
            <div className="max-w-6xl mx-auto">
              <WhyChooseServe serveItems={serveItems} />
            </div>
          </section>
        </>
      ) : (
        <>
          {/* ── HERO ── */}
          <section className="relative bg-[#0F2854] overflow-hidden pb-4 md:pb-16">
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 48px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 48px)' }} />

            <div className="relative z-10 max-w-6xl mx-auto px-5 md:px-10 pt-5 pb-2 md:pt-16 md:pb-8 grid md:grid-cols-2 gap-6 md:gap-14 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                <div className="flex items-center gap-2 mb-2 md:mb-4">
                  <FiMapPin size={12} className="text-[#FAC212]" />
                  <span className="text-[#FAC212] text-xs font-bold uppercase tracking-widest">{location}</span>
                </div>
                <h1 className="font-heading font-extrabold text-white text-xl md:text-4xl leading-tight tracking-tight mb-2 md:mb-4"
                  dangerouslySetInnerHTML={{ __html: heading }} />
                <p className="text-white/65 text-sm leading-relaxed mb-3 md:mb-5 hidden md:block">{subheading}</p>

                <div className="flex flex-wrap gap-1.5 md:gap-2 mb-2.5 md:mb-5">
                  {pricing.map((p, i) => (
                    <div key={i} className="bg-white/10 border border-white/10 px-2.5 py-1.5 md:px-3 md:py-2.5 flex flex-col min-w-[92px] md:min-w-[110px]">
                      <span className="text-white/50 text-[9px] md:text-[10px] uppercase tracking-wider">{p.label}</span>
                      <span className="text-[#FAC212] font-black text-base md:text-xl leading-tight">{p.value}</span>
                      {p.note && <span className="text-white/30 text-[9px] mt-0.5 hidden md:block">{p.note}</span>}
                    </div>
                  ))}
                </div>

                <a href="#enquire"
                  className="inline-flex items-center gap-2 bg-[#FAC212] hover:bg-[#e6b010] text-[#0F2854] font-bold px-5 py-2.5 md:px-6 md:py-3 text-sm uppercase tracking-wide transition-colors">
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
            <div className="hidden md:flex absolute bottom-0 left-0 right-0 justify-center px-5 md:px-10">
              <div className="w-full max-w-2xl bg-white px-7 pt-5 pb-0 shadow-2xl">
                <p className="text-[10px] uppercase tracking-[0.3em] text-[#0F2854]/40 font-black mb-1">Free Quote</p>
                <p className="text-[#0F2854] font-bold text-base">Get a reefer container quote in 2 hours</p>
              </div>
            </div>
          </section>

          {/* ── FORM ── */}
          <section id="enquire" className="bg-[#F7F8FA] flex justify-center px-5 md:px-10 pt-5 pb-14 md:pt-0" style={{ scrollMarginTop: '56px' }}>
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

          {/* ── PRODUCT GALLERY + WHY CHOOSE / WE SERVE ── */}
          <section className="bg-white py-10 md:py-14 px-5 md:px-10">
            <div className="max-w-6xl mx-auto flex flex-col gap-10">
              <ProductSlider items={data.gallery} />
              <WhyChooseServe serveItems={serveItems} />
            </div>
          </section>
        </>
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
