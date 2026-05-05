import React, { useState, useRef, useEffect } from 'react';
import { motion, useTransform, useAnimationFrame, useMotionValue } from 'framer-motion';

/**
 * Keeps the marquee x-position within range for seamless looping.
 */
const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};

import kfcLogo from '../../assets/logos/cdnlogo.com_kfc-colonel.svg?url';
import dominosLogo from '../../assets/logos/cdnlogo.com_dominos-pizza.svg?url';
import britanniaLogo from '../../assets/logos/cdnlogo.com_britannia-industries.svg?url';
import mondelezLogo from '../../assets/logos/cdnlogo.com_mondelez-international-2012.svg?url';
import bcLogo from '../../assets/logos/cdnlogo.com_bc.svg?url';
import pizzahutLogo from '../../assets/logos/cdnlogo.com_pizza-hut.svg?url';
import itcSvgLogo from '../../assets/logos/ITC_Limited_Logo.svg?url';
import swiggyLogo from '../../assets/logos/cdnlogo.com_swiggy.svg?url';
import amazonLogo from '../../assets/logos/cdnlogo.com_amazon-icon.png?url';
import flipkartLogo from '../../assets/logos/cdnlogo.com_flipkart.svg?url';
import ferreroLogo from '../../assets/logos/cdnlogo.com_ferrero-rocher.svg?url';
import parleLogo from '../../assets/logos/cdnlogo.com_parle-products.svg?url';
import epigamiaLogo from '../../assets/logos/epigamia.png?url';
// WebP logos (compressed from PNG — 1–5 KB each)
import reliance2Logo from '../../assets/logos/3 Bay (17).webp?url';
import zeptoLogo from '../../assets/logos/3 Bay (18).webp?url';
import zomatoLogo from '../../assets/logos/3 Bay (22).webp?url';
import blinkitLogo from '../../assets/logos/3 Bay (23).webp?url';
import drreddyLogo from '../../assets/logos/3 Bay (26).webp?url';
import ciplaLogo from '../../assets/logos/3 Bay (27).webp?url';
import laurusLogo from '../../assets/logos/3 Bay (29).webp?url';
import lupinLogo from '../../assets/logos/3 Bay (30).webp?url';
import heteroLogo from '../../assets/logos/3 Bay (31).webp?url';
import motherdairyLogo from '../../assets/logos/3 Bay (33).webp?url';
import naturalsLogo from '../../assets/logos/3 Bay (34).webp?url';
import amul2Logo from '../../assets/logos/3 Bay (35).webp?url';
import itc2Logo from '../../assets/logos/3 Bay (37).webp?url';
import prabhatLogo from '../../assets/logos/3 Bay (39).webp?url';
import godrejLogo from '../../assets/logos/3 Bay (40).webp?url';
import fairexportsLogo from '../../assets/logos/3 Bay (41).webp?url';
import vimalaLogo from '../../assets/logos/3 Bay (42).webp?url';
import deccanLogo from '../../assets/logos/3 Bay (43).webp?url';
import huntsmanLogo from '../../assets/logos/3 Bay (44).webp?url';
import olaelectricLogo from '../../assets/logos/3 Bay (47).webp?url';
import eastonLogo from '../../assets/logos/3 Bay (48).webp?url';
import homepageData from '@data/homepage.json';
import clientsData from '@data/clients.json';
import { tc } from '@components/core/animations';
import type { S5Section } from '@types/homepage';

const s5 = homepageData.homepage.sections.find(s => s.id === 'S5')! as unknown as S5Section;

const logoMap: Record<string, string | undefined> = {
  // SVG logos
  kfc:      kfcLogo,
  dominos:  dominosLogo,
  pizzahut: pizzahutLogo,
  mondelez: mondelezLogo,
  britannia: britanniaLogo,
  bc:       bcLogo,
  itc2:     itcSvgLogo,
  // WebP logos
  reliance2:    reliance2Logo,
  zepto:        zeptoLogo,
  zomato:       zomatoLogo,
  blinkit:      blinkitLogo,
  drreddy:      drreddyLogo,
  cipla:        ciplaLogo,
  laurus:       laurusLogo,
  lupin:        lupinLogo,
  hetero:       heteroLogo,
  motherdairy:  motherdairyLogo,
  naturals:     naturalsLogo,
  amul2:        amul2Logo,
  prabhat:      prabhatLogo,
  godrej:       godrejLogo,
  fairexports:  fairexportsLogo,
  vimala:       vimalaLogo,
  deccan:       deccanLogo,
  huntsman:     huntsmanLogo,
  olaelectric:  olaelectricLogo,
  easton:       eastonLogo,
  // New logos
  swiggy:   swiggyLogo,
  amazon:   amazonLogo,
  flipkart: flipkartLogo,
  epigamia: epigamiaLogo,
  ferrero:  ferreroLogo,
  parle:    parleLogo,
  // Logos still pending file upload — show text label until added
  foodveg:       undefined,
  offshore:      undefined,
  anfalmarine:   undefined,
  reliancefresh: undefined,
  ifbagro:       undefined,
  omfed:         undefined,
  rollick:       undefined,
};

const groups = clientsData.map(group => ({
  ...group,
  items: group.items
    .map(item => ({ ...item, logo: logoMap[item.logoKey] }))
    .filter(item => item.logo),   // only show items that have a logo file
})).filter(group => group.items.length > 0); // hide empty groups

interface MarqueeProps {
  items: any[];
  direction: 'left' | 'right';
  baseVelocity: number;
  paused: boolean;
}

/** Single logo slot with skeleton shimmer while the image loads */
const LogoImg: React.FC<{ src?: string; alt: string }> = ({ src, alt }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  React.useEffect(() => {
    if (imgRef.current?.complete) setLoaded(true);
  }, []);

  if (!src) {
    return (
      <div className="relative h-full w-full flex items-center justify-center">
        <span className="font-heading font-extrabold text-[10px] uppercase tracking-widest text-secondary/30 text-center leading-tight">{alt}</span>
      </div>
    );
  }

  return (
    <div
      className={`relative h-full w-full flex items-center justify-center rounded-sm overflow-hidden transition-colors duration-300 ${
        !loaded ? 'bg-secondary/[0.08] animate-pulse' : ''
      }`}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={144}
        height={48}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`max-h-full max-w-full object-contain grayscale-[0.3] group-hover/logo:grayscale-0 transition-[opacity,filter] duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};

const CategoryMarquee: React.FC<MarqueeProps> = ({ items, direction, baseVelocity, paused }) => {
  const baseX = useMotionValue(0);
  const trackRef = useRef<HTMLDivElement>(null);

  // Start as true so animation begins immediately on mount (no async observer gap).
  // The observer will flip to false only when the track scrolls well out of view.
  const [isInView, setIsInView] = useState(true);
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { rootMargin: '200px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // High-Precision Looping: repeat 6x, wrap at 1/6th of total width
  const wrapPoint = -100 / 6;
  const x = useTransform(baseX, (v) => `${wrap(wrapPoint, 0, v)}%`);

  useAnimationFrame((_t, delta) => {
    if (!isInView || paused) return; // pause when out of view or user requests pause
    const moveBy = baseVelocity * (delta / 1000) * 0.5;
    baseX.set(baseX.get() + (direction === 'left' ? -moveBy : moveBy));
  });

  // Repeat items 6 times to ensure track is wider than any viewport
  const displayItems = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <div ref={trackRef} className="flex-1 overflow-hidden relative py-2 md:py-4">
      {/* Vignette Overlays */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 h-full w-12 md:w-32 bg-gradient-to-r from-primary/95 to-transparent"></div>
        <div className="absolute top-0 right-0 h-full w-12 md:w-32 bg-gradient-to-l from-primary/95 to-transparent"></div>
      </div>

      <motion.div className="flex whitespace-nowrap items-center gap-6 md:gap-10 w-max marquee-track" style={{ x }}>
        {displayItems.map((client, idx) => (
          <a
            key={`${client.name}-${idx}`}
            href={client.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center h-8 md:h-12 w-28 md:w-36 shrink-0 transition-transform duration-300 hover:scale-110 active:scale-95 group/logo"
          >
            <LogoImg src={client.logo} alt={client.name} />
          </a>
        ))}
      </motion.div>
    </div>
  );
};

const Clients: React.FC = () => {
  const [paused, setPaused] = useState(false);

  return (
    <section id="clients" className="h-full w-full flex flex-col items-center justify-center bg-primary overflow-hidden py-16 px-4 md:px-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[var(--max-width)] w-full mb-6 md:mb-10 mt-6 lg:mt-0">
        <div className="flex items-start justify-between gap-4">
          <div>
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary mb-4 block">
              {s5.eyebrow}
            </span>
            <h2 className="text-secondary text-h2 leading-tight-none mb-4 max-w-2xl font-heading font-extrabold tracking-tighter">
              {tc(s5.headline)}
            </h2>
          </div>
          {/* Pause/play button — keyboard + screen-reader accessible */}
          <button
            onClick={() => setPaused(p => !p)}
            aria-label={paused ? 'Play client logos marquee' : 'Pause client logos marquee'}
            aria-pressed={paused}
            className="shrink-0 mt-1 w-9 h-9 flex items-center justify-center rounded-sm border border-secondary/15 text-secondary/40 hover:text-secondary hover:border-secondary/40 transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {paused ? (
              <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor"><polygon points="3,1 12,6.5 3,12" /></svg>
            ) : (
              <svg width="13" height="13" viewBox="0 0 13 13" fill="currentColor"><rect x="2" y="1" width="3.5" height="11" rx="1"/><rect x="7.5" y="1" width="3.5" height="11" rx="1"/></svg>
            )}
          </button>
        </div>
      </div>

      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[var(--max-width)] w-full flex flex-col gap-4 md:gap-6">
        {groups.map((group, idx) => (
          <div key={group.id} className="flex flex-col md:flex-row items-center border-b border-secondary/5 pb-4 md:pb-6 last:border-0 group">

            {/* TECHNICAL MARKER LABEL ON LEFT */}
            <div className="w-full md:w-[280px] shrink-0 mb-6 md:mb-0 md:pr-12 flex items-center gap-5">
              <div className="flex flex-col">
                <span className="font-body font-bold text-eyebrow text-accent/65 mb-1">
                  {group.id}
                </span>
                <div className="h-8 w-px bg-accent/20 group-hover:bg-accent transition-colors duration-500"></div>
              </div>
              <span className="font-body font-bold text-body-sm text-secondary/60 uppercase tracking-[0.25em] group-hover:text-secondary transition-colors duration-500 leading-tight">
                {group.category}
              </span>
            </div>

            {/* MARQUEE TRACK ON RIGHT - CONDITIONAL FOR SINGLE LOGO */}
            {group.items.length === 1 ? (
              <div className="flex-1 flex items-center justify-center md:justify-start px-10 relative h-20">
                <a
                  href={group.items[0].url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center h-8 md:h-12 w-28 md:w-36 transition-transform duration-300 hover:scale-110 group/logo"
                >
                  <LogoImg src={group.items[0].logo} alt={group.items[0].name} />
                </a>
              </div>
            ) : (
              <CategoryMarquee
                items={group.items}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                baseVelocity={idx % 2 === 0 ? 2.5 : 2.0}
                paused={paused}
              />
            )}
          </div>
        ))}

        <div className="flex flex-col md:flex-row md:items-end justify-between mt-4 border-t border-secondary/10 pt-6 md:pt-8 gap-6">
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-accent leading-none tracking-tighter select-none" style={{ fontSize: 'clamp(4rem, 12vw, 9rem)' }}>300+</span>
            <span className="font-body font-bold text-body-sm text-secondary/40 uppercase tracking-[0.2em] -mt-2">more clients served</span>
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <a
              href="/contact-us"
              className="group/cta relative inline-flex items-center gap-4 bg-secondary text-primary font-heading font-extrabold text-body-sm uppercase tracking-[0.2em] px-8 py-5 overflow-hidden transition-colors duration-300 hover:text-secondary"
            >
              <span className="relative z-10">{s5.cta}</span>
              <span className="relative z-10 w-6 h-px bg-primary group-hover/cta:bg-secondary inline-block transition-all duration-300 group-hover/cta:w-10" />
              <span className="absolute inset-0 bg-accent translate-x-[-101%] group-hover/cta:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Clients;
