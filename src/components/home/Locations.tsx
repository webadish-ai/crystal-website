import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from 'framer-motion';
import IndiaGeoMap from '../interactive/IndiaGeoMap';
import {
  containerVariants,
  itemVariants,
  wordContainerVariants,
  charVariants,
  viewportOnce,
  tc,
} from '@components/core/animations';
import Button from '@components/core/Button';
import locationsData from '@data/locations.json';
import homepageData from '@data/homepage.json';
import type { S11Section } from '@types/homepage';

const s11 = homepageData.homepage.sections.find(s => s.id === 'S11')! as unknown as S11Section;

interface Location {
  id: string;
  name: string;
  type: string;
  description: string;
  coordinates: [number, number]; // [Longitude, Latitude]
  isHO?: boolean;
}

const locations: Location[] = locationsData as Location[];

// Rough India bounding box for transform-origin calculation
// Lon: 68–97°E, Lat: 8–37°N
const toMapPercent = (lon: number, lat: number) => ({
  x: Math.max(10, Math.min(90, ((lon - 68) / 29) * 100)),
  y: Math.max(10, Math.min(90, ((37 - lat) / 29) * 100)),
});

const Locations: React.FC = () => {
  const [hoveredId, setHoveredId]   = useState<string | null>(null);
  const [zoomedId,  setZoomedId]    = useState<string | null>(null);
  const activeId = hoveredId ?? zoomedId;

  const containerRef  = useRef<HTMLDivElement>(null);
  const mapWrapperRef = useRef<HTMLDivElement>(null); // parallax layer (mouse-move x/y only)
  const zoomRef       = useRef<HTMLDivElement>(null); // zoom layer (scale + translate to center)

  // Parallax on mouse-move — only affects the outer wrapper, never conflicts with zoom
  useGSAP(() => {
    const container = containerRef.current;
    const wrapper   = mapWrapperRef.current;
    if (!container || !wrapper) return;

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = container.getBoundingClientRect();
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      gsap.to(wrapper, { x: x * 10, y: y * 10, duration: 0.8, ease: 'power2.out' });
    };

    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, { scope: containerRef });

  /**
   * Zoom via scale(1.85) from center + translate to bring the location to the visual center.
   * Formula (transformOrigin 50% 50%):
   *   tx = -scale × W × (px% - 0.5)   clamped to Â±W×(scale-1)/2
   * Switching locations just animates tx/ty at constant scale → smooth slide.
   */
  const zoomToLocation = (id: string | null) => {
    const el = zoomRef.current;
    if (!el) return;

    if (!id) {
      gsap.to(el, { scale: 1, x: 0, y: 0, duration: 0.65, ease: 'power2.inOut' });
      return;
    }

    const loc = locations.find(l => l.id === id);
    if (!loc) return;

    // Use layout dimensions (pre-transform) so math is stable even when already zoomed
    const W = el.offsetWidth;
    const H = el.offsetHeight;
    const SCALE = 1.6;

    const { x: px, y: py } = toMapPercent(loc.coordinates[0], loc.coordinates[1]);

    // Translation to center the pin — clamped so no empty space bleeds in
    const rawTx = -SCALE * W * (px / 100 - 0.5);
    const rawTy = -SCALE * H * (py / 100 - 0.5);
    const maxTx = W * (SCALE - 1) / 2;
    const maxTy = H * (SCALE - 1) / 2;

    gsap.to(el, {
      scale: SCALE,
      x: Math.max(-maxTx, Math.min(maxTx, rawTx)),
      y: Math.max(-maxTy, Math.min(maxTy, rawTy)),
      duration: 0.65,
      ease: 'power2.inOut',
    });
  };

  const handleCardClick = (id: string) => {
    const newId = zoomedId === id ? null : id;
    setZoomedId(newId);
    zoomToLocation(newId);
  };

  return (
    <section id="locations" className="w-full flex flex-col items-center justify-center bg-primary overflow-hidden pt-12 md:pt-20 pb-6 md:pb-8 px-4 md:px-12" ref={containerRef}>
      <motion.div
        className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[var(--max-width)] w-full flex flex-col"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={containerVariants}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 lg:gap-14 items-center">

          {/* Left Side: Compact Navigation */}
          <motion.div variants={itemVariants} className="flex flex-col items-start">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-4 block">
              {s11.eyebrow.toUpperCase()}
            </span>
            <motion.h2 variants={wordContainerVariants} className="font-heading font-extrabold text-h2 text-secondary leading-tight-none mb-4 tracking-tighter flex flex-wrap">
              {tc(s11.headline).split(' ').map((word: string, wordIdx: number) => (
                <span key={wordIdx} className="inline-flex whitespace-nowrap mr-[0.25em]">
                  {word.split('').map((char: string, charIdx: number) => (
                    <span key={charIdx} className="inline-flex overflow-hidden pb-1 -mb-1">
                      <motion.span variants={charVariants} className="inline-block">{char}</motion.span>
                    </span>
                  ))}
                </span>
              ))}
            </motion.h2>
            <p className="text-secondary/60 text-body-lg leading-relaxed mb-6 max-w-[240px] font-body opacity-80"
              dangerouslySetInnerHTML={{ __html: s11.body }}
            />

            {/* Micro Navigation Grid - Fixed overlap */}
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
              {locations.map((loc) => (
                <button
                  key={loc.id}
                  className={`flex flex-col justify-center p-3 border transition-all duration-300 rounded-sm group text-left overflow-hidden w-full ${activeId === loc.id ? 'border-accent bg-accent/5' : 'border-secondary/5 hover:border-accent hover:bg-accent/5'} ${zoomedId === loc.id ? 'ring-1 ring-accent' : ''}`}
                  onClick={() => handleCardClick(loc.id)}
                  onMouseEnter={() => setHoveredId(loc.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onFocus={() => setHoveredId(loc.id)}
                  onBlur={() => setHoveredId(null)}
                >
                  <div className="flex items-center gap-2 mb-1 w-full overflow-hidden">
                    <div className={`w-1.5 h-1.5 rounded-full shrink-0 transition-colors ${activeId === loc.id ? 'bg-accent' : (loc.isHO ? 'bg-secondary/40' : 'bg-secondary/10 group-hover:bg-accent')}`}></div>
                    <span className="font-heading font-extrabold text-h4 text-secondary block tracking-tight truncate whitespace-nowrap">
                      {loc.name}
                    </span>
                  </div>
                  <span className="font-body text-body-sm text-secondary/40 uppercase tracking-wider block leading-tight truncate">
                    {loc.type}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-8">
              <Button variant="primary" href="/contact">{s11.cta.toUpperCase()}</Button>
            </div>
          </motion.div>

          {/* Right Side: Map (Dominant & Constrained) */}
          <motion.div variants={itemVariants} className="relative flex items-center justify-center h-[300px] sm:h-[380px] md:h-[460px] lg:h-full lg:min-h-[460px] lg:max-h-[72vh] overflow-hidden rounded-sm mt-4 lg:mt-0">
            <div className="w-full h-full relative z-10 flex items-center justify-center" ref={mapWrapperRef}>
              <div className="w-full h-full" ref={zoomRef} style={{ transformOrigin: '50% 50%' }}>
                <IndiaGeoMap
                  className="w-full h-full max-w-full object-contain"
                  activeId={activeId}
                  onHover={setHoveredId}
                  onSelect={handleCardClick}
                  locations={locations}
                />
              </div>
            </div>

            {/* Background Accent Gradients */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-accent/5 rounded-full blur-[100px] -z-0"></div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
};

export default Locations;
