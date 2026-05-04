import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  containerVariants,
  itemVariants,
  wordContainerVariants,
  charVariants,
  tc,
} from '@components/core/animations';
import homepageData from '@data/homepage.json';
import type { S3Section } from '@types/homepage';

const s3 = homepageData.homepage.sections.find(s => s.id === 'S3')! as unknown as S3Section;

/* â”€â”€ Local images (image extensions only to avoid zip/etc) â”€â”€ */
const _buildRaw   = import.meta.glob('../../data/images/build/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',   { eager: true, query: '?url', import: 'default' });
const _storeRaw   = import.meta.glob('../../data/images/store/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',   { eager: true, query: '?url', import: 'default' });
const _moveRaw    = import.meta.glob('../../data/images/move/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',    { eager: true, query: '?url', import: 'default' });
const _processRaw = import.meta.glob('../../data/images/process/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}', { eager: true, query: '?url', import: 'default' });
const _solveRaw   = import.meta.glob('../../data/images/solve/*.{jpg,jpeg,png,webp,JPG,JPEG,PNG,WEBP}',   { eager: true, query: '?url', import: 'default' });

const buildImgs   = Object.values(_buildRaw)   as string[];
const storeImgs   = Object.values(_storeRaw)   as string[];
const moveImgs    = Object.values(_moveRaw)    as string[];
const processImgs = Object.values(_processRaw) as string[];
const solveImgs   = Object.values(_solveRaw)   as string[];

const imgSets: string[][] = [
  buildImgs.length   ? [buildImgs[0]] : ['https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&auto=format&fit=crop&w=1400'],
  storeImgs.length   ? storeImgs   : ['https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&auto=format&fit=crop&w=1400'],
  moveImgs.length    ? moveImgs    : ['https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&auto=format&fit=crop&w=1400'],
  processImgs.length ? processImgs : ['https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&auto=format&fit=crop&w=1400'],
  solveImgs.length   ? solveImgs   : ['https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&auto=format&fit=crop&w=1400'],
];

const solutionsData = s3.solutions.slice(0, 5).map((sol, i) => ({
  id: String(i + 1).padStart(2, '0'),
  title: sol.title,
  desc: sol.description,
  tags: sol.tags,
  link: sol.cta.toUpperCase(),
  href: sol.href,
  imgs: imgSets[i],
}));

const comingSoonSol = {
  id: '06',
  title: s3.solutions[5]?.title ?? 'Coming soon',
  desc: s3.solutions[5]?.description ?? '',
  tags: s3.solutions[5]?.tags ?? [],
};

/* â”€â”€ Direction-aware slide variants â”€â”€ */
const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

const textVariants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit:  { opacity: 0 },
};

const TRANSITION = { duration: 0.55, ease: [0.23, 1, 0.32, 1] as const };
const TEXT_TRANSITION = { duration: 0.5, ease: [0.34, 1.4, 0.64, 1] as const };

/* â”€â”€ Per-solution image carousel with its own arrow controls â”€â”€ */
const SolutionImages = ({ imgs, alt, solDirection }: { imgs: string[]; alt: string; solDirection: number }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const [activeDir, setActiveDir] = useState(1);

  // When solution changes: reset to first image using solution nav direction
  useEffect(() => {
    setActiveDir(solDirection);
    setImgIdx(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alt]);

  // Auto-rotate within a solution
  useEffect(() => {
    if (imgs.length <= 1) return;
    const t = setInterval(() => {
      setActiveDir(1);
      setImgIdx(i => (i + 1) % imgs.length);
    }, 5000);
    return () => clearInterval(t);
  }, [imgs.length, alt]);

  const prevImg = () => {
    setActiveDir(-1);
    setImgIdx(i => (i - 1 + imgs.length) % imgs.length);
  };
  const nextImg = () => {
    setActiveDir(1);
    setImgIdx(i => (i + 1) % imgs.length);
  };

  return (
    <>
      <AnimatePresence custom={activeDir} mode="sync">
        <motion.img
          key={alt + imgIdx}
          src={imgs[imgIdx]}
          alt={alt}
          custom={activeDir}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={TRANSITION}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>

      {/* Image counter + dots â€” bottom left, both track imgIdx */}
      {imgs.length > 1 && (
        <div className="absolute bottom-5 left-5 z-20 flex flex-col gap-3">
          <span className="font-heading font-extrabold text-[11px] text-primary/50 tracking-[0.2em]">
            {String(imgIdx + 1).padStart(2, '0')} / {String(imgs.length).padStart(2, '0')}
          </span>
          <div className="flex gap-1.5">
            {imgs.map((_, i) => (
              <button
                key={i}
                onClick={() => { setActiveDir(i > imgIdx ? 1 : -1); setImgIdx(i); }}
                className="h-[2px] rounded-full transition-all duration-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                style={{
                  width: i === imgIdx ? '28px' : '12px',
                  background: i === imgIdx ? '#FAC212' : 'rgba(255,255,255,0.3)',
                }}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Image prev/next arrows â€” bottom right */}
      {imgs.length > 1 && (
        <div className="absolute bottom-4 right-5 z-20 flex gap-2">
          <button
            onClick={prevImg}
            className="w-10 h-10 rounded-sm border border-primary/20 bg-black/30 backdrop-blur-sm
              flex items-center justify-center text-primary/70 hover:text-primary hover:border-accent hover:bg-accent/10
              transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Previous image"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="10 12 6 8 10 4" />
            </svg>
          </button>
          <button
            onClick={nextImg}
            className="w-10 h-10 rounded-sm border border-primary/20 bg-black/30 backdrop-blur-sm
              flex items-center justify-center text-primary/70 hover:text-primary hover:border-accent hover:bg-accent/10
              transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Next image"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 4 10 8 6 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  );
};

const Solutions: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef(0);

  const goTo = useCallback((idx: number) => {
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  }, [activeIdx]);

  const next = useCallback(() => { setDirection(1);  setActiveIdx(i => (i + 1) % solutionsData.length); }, []);
  const prev = useCallback(() => { setDirection(-1); setActiveIdx(i => (i - 1 + solutionsData.length) % solutionsData.length); }, []);

  // Keyboard navigation switches solutions
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev]);

  const sol = solutionsData[activeIdx];

  return (
    <section id="solutions" className="w-full bg-primary h-[100svh] flex flex-col px-4 md:px-8 py-3 sm:py-5 md:py-8">
      <motion.div
        className="container mx-auto px-2 md:px-6 lg:px-10 max-w-[var(--max-width)] flex flex-col h-full"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.08 }}
        variants={containerVariants}
      >
        {/* â”€â”€ Section header â”€â”€ */}
        <div className="mb-2 sm:mb-4 shrink-0">
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary mb-1 block">
            {s3.eyebrow.toUpperCase()}
          </motion.span>
          <motion.h2
            variants={wordContainerVariants}
            className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter flex flex-wrap pb-1.5 border-b border-secondary/10"
          >
            {tc(s3.headline).split(' ').map((word: string, wi: number) => (
              <React.Fragment key={wi}>
                <span className="inline-flex whitespace-nowrap mr-[0.22em]">
                  {word.split('').map((char, ci) => (
                    <span key={ci} className="inline-flex overflow-hidden pb-0.5 -mb-0.5">
                      <motion.span variants={charVariants} className="inline-block">{char}</motion.span>
                    </span>
                  ))}
                </span>
                {' '}
              </React.Fragment>
            ))}
          </motion.h2>
        </div>

        {/* â”€â”€ Split panel â€” fills remaining height â”€â”€ */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col lg:grid lg:grid-cols-[3fr_2fr] gap-0 rounded-sm overflow-hidden border border-secondary/10 flex-1 min-h-0"
        >
          {/* LEFT â€” Image panel (swipe target on mobile) */}
          <div
            className="relative overflow-hidden bg-secondary h-[42%] shrink-0 min-h-[220px] lg:h-auto lg:min-h-0"
            onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              const delta = e.changedTouches[0].clientX - touchStartX.current;
              if (Math.abs(delta) > 40) { delta < 0 ? next() : prev(); }
            }}
          >
            <SolutionImages imgs={sol.imgs} alt={sol.title} solDirection={direction} />


          </div>

          {/* RIGHT â€” Text panel */}
          <div className="relative bg-primary border-t lg:border-t-0 lg:border-l border-secondary/10 flex flex-col gap-2 justify-between p-4 sm:p-5 lg:p-6 xl:p-8 overflow-hidden flex-1 min-h-0 lg:flex-none">

            {/* Top: fading content */}
            <div className="relative lg:flex-1 lg:min-h-0">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={activeIdx}
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={TEXT_TRANSITION}
                  className="flex flex-col overflow-y-auto lg:absolute lg:inset-0"
                >
                  <span className="font-heading font-extrabold text-[28px] sm:text-[36px] md:text-[48px] leading-none text-secondary/6 select-none block mb-1 sm:mb-3 tracking-tighter">
                    {sol.id}
                  </span>
                  <h3 className="font-heading font-extrabold text-h2 text-secondary tracking-tight leading-none mb-2 sm:mb-4">
                    {tc(sol.title)}
                  </h3>
                  <div className="font-body text-body-lg text-secondary/65 leading-[1.6] mb-3 sm:mb-5" dangerouslySetInnerHTML={{ __html: sol.desc }} />
                  <div className="flex flex-wrap gap-1.5">
                    {sol.tags.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="font-body font-bold text-body-sm uppercase tracking-[0.08em]
                          text-secondary/45 bg-secondary/5 border border-secondary/10
                          px-2 py-1 rounded-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom: static â€” solution tabs grid + CTA */}
            <div className="shrink-0">
              <div className="grid grid-cols-2 gap-0 mb-2 sm:mb-4 border-t border-secondary/10 mt-2 sm:mt-3">
                {solutionsData.map((s, i) => {
                  const isLeft = i % 2 === 0;
                  const row = Math.floor(i / 2);
                  const totalRows = Math.ceil(solutionsData.length / 2);
                  const hasBorderBottom = row < totalRows - 1;
                  return (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`flex items-center gap-2 py-1.5 sm:py-2 px-2 text-left transition-all duration-300 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent
                      ${i === activeIdx ? 'bg-secondary/6' : 'hover:bg-secondary/4'}
                      ${isLeft ? 'border-r border-secondary/10' : ''}
                      ${hasBorderBottom ? 'border-b border-secondary/10' : ''}
                    `}
                  >
                    <span className={`font-heading font-extrabold text-[9px] tracking-[0.2em] shrink-0 transition-colors ${i === activeIdx ? 'text-accent' : 'text-secondary/25 group-hover:text-secondary/50'}`}>
                      {s.id}
                    </span>
                    <span className={`font-heading font-extrabold text-[10px] uppercase tracking-tight truncate transition-colors ${i === activeIdx ? 'text-secondary' : 'text-secondary/35 group-hover:text-secondary/65'}`}>
                      {s.title}
                    </span>
                    {i === activeIdx && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
                    )}
                  </button>
                  );})}
              </div>

              <a
                href={sol.href}
                className="inline-flex items-center gap-2 font-body font-bold text-body-sm uppercase tracking-[0.15em]
                  text-primary bg-secondary px-4 py-2 sm:px-6 sm:py-3 rounded-sm
                  hover:bg-accent hover:text-secondary transition-all duration-300 group"
              >
                {sol.link}
                <span className="transition-transform duration-300 group-hover:translate-x-1">â†’</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* â”€â”€ Coming soon banner â”€â”€ */}
        <motion.div
          variants={itemVariants}
          className="mt-2 shrink-0 border border-secondary/20 rounded-sm relative overflow-hidden
            flex flex-row items-center justify-between px-4 md:px-6 py-3 cursor-default"
        >
          <div className="flex items-center gap-3 md:gap-6 z-10">
            <span className="font-heading font-extrabold text-[8px] md:text-[10px] text-accent shrink-0">
              {comingSoonSol.id}
            </span>
            <div>
              <h3 className="font-heading font-extrabold text-[10px] md:text-[13px] text-secondary uppercase tracking-tight">
                {comingSoonSol.title}
              </h3>
              <div className="hidden sm:block text-secondary/60 text-body-sm leading-tight mt-0.5" dangerouslySetInnerHTML={{ __html: comingSoonSol.desc }} />
            </div>
            <div className="hidden sm:flex gap-1 flex-wrap">
              {comingSoonSol.tags.map((tag: string, i: number) => (
                <span key={i} className="font-body font-bold text-body-sm uppercase tracking-[0.1em] text-accent/70 border border-accent/25 px-1.5 py-0.5 rounded-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <span className="z-10 font-body font-bold text-body-sm uppercase tracking-[0.15em] flex items-center gap-1.5 text-secondary/60 shrink-0">
            {s3.coming_soon_label.toUpperCase()} â†’
          </span>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Solutions;
