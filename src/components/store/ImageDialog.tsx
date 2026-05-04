import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiGrid, FiX,
  FiChevronLeft, FiChevronRight, FiChevronDown,
} from 'react-icons/fi';

export interface ImageDialogSizeImage {
  gallery: string[];
  pallet:  string[];
}

export interface ImageDialogSize {
  label: string;
}

interface Props {
  productName:   string;
  sizes:         ImageDialogSize[];
  sizeImages:    ImageDialogSizeImage[];
  activeSize:    number;
  setActiveSize: (i: number) => void;
  startIndex?:   number;
  onClose:       () => void;
}

const ImageDialog: React.FC<Props> = ({
  productName, sizes, sizeImages, activeSize, setActiveSize, startIndex, onClose,
}) => {
  const [view,      setView]      = useState<'photos' | 'pallet'>('photos');
  const [active,    setActive]    = useState(startIndex ?? 0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [tapHint,   setTapHint]   = useState<'left' | 'right' | null>(null);
  const [sizeDropOpen, setSizeDropOpen] = useState(false);
  const [viewDropOpen, setViewDropOpen] = useState(false);

  const sizeDropRef = useRef<HTMLDivElement>(null);
  const viewDropRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const hintTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);

  const gallery    = sizeImages[activeSize]?.gallery ?? [];
  const palletImgs = sizeImages[activeSize]?.pallet  ?? [];
  const images     = view === 'photos' ? gallery : palletImgs;
  const sizeLabel  = sizes[activeSize]?.label ?? '';

  const showHint = (dir: 'left' | 'right') => {
    setTapHint(dir);
    if (hintTimer.current) clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setTapHint(null), 550);
  };

  useEffect(() => () => { if (hintTimer.current) clearTimeout(hintTimer.current); }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (sizeDropRef.current && !sizeDropRef.current.contains(e.target as Node)) setSizeDropOpen(false);
      if (viewDropRef.current && !viewDropRef.current.contains(e.target as Node)) setViewDropOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  useEffect(() => { setActive(0); }, [activeSize, view]);

  const prev = useCallback(() => { setDirection(-1); setActive(i => (i - 1 + images.length) % images.length); }, [images.length]);
  const next = useCallback(() => { setDirection(1);  setActive(i => (i + 1) % images.length); },               [images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape')     onClose();
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    document.body.dataset.galleryOpen = '';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      delete document.body.dataset.galleryOpen;
    };
  }, [onClose, prev, next]);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null || images.length < 2) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) { delta > 0 ? next() : prev(); }
    touchStartX.current = null;
  };

  const btnBase     = 'px-3 py-1.5 font-heading font-extrabold text-[11px] uppercase tracking-[0.12em] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent';
  const btnActive   = 'bg-accent text-secondary';
  const btnInactive = 'text-primary/60 hover:text-primary';

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="fixed inset-0 z-[600] bg-secondary/80 backdrop-blur-2xl flex flex-col"
      onClick={onClose}
    >
      {/* ── Header ── */}
      <div className="shrink-0 border-b border-primary/10" onClick={e => e.stopPropagation()}>

        {/* Desktop (md+): 3-col grid */}
        <div className="hidden md:grid grid-cols-3 items-center px-10 py-5">
          <div className="flex flex-col gap-1.5">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block">{productName}</span>
            <div className="flex items-center gap-1.5">
              {sizes.map((s, i) => (
                <button key={s.label} onClick={() => setActiveSize(i)}
                  className={`${btnBase} rounded-sm ${activeSize === i ? btnActive : `border border-primary/20 ${btnInactive} hover:border-primary/50`}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center gap-1.5">
            {images.length > 0 && images.map((_, i) => (
              <button key={i} onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
                className={`rounded-full transition-all duration-300 ${i === active ? 'w-5 h-2 bg-accent' : 'w-2 h-2 bg-primary/30 hover:bg-primary/60'}`} />
            ))}
          </div>
          <div className="flex items-center justify-end gap-3">
            <div className="flex items-center border border-primary/20 rounded-sm overflow-hidden">
              <button onClick={() => setView('photos')} className={`${btnBase} ${view === 'photos' ? btnActive : btnInactive}`}>Container</button>
              <span className="w-px h-4 bg-primary/20 shrink-0" />
              <button onClick={() => setView('pallet')} className={`${btnBase} ${view === 'pallet' ? btnActive : btnInactive}`}>Pallet Guide</button>
            </div>
            <button onClick={onClose} className="w-10 h-10 flex items-center justify-center border border-primary/20 rounded-sm text-primary/60 hover:text-primary hover:border-primary/50 transition-all">
              <FiX className="text-lg" />
            </button>
          </div>
        </div>

        {/* Mobile: 2-row layout */}
        <div className="flex md:hidden flex-col px-5 py-4 gap-3">
          <div className="flex items-center justify-between">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent">{productName}</span>
            <button onClick={onClose} className="w-9 h-9 flex items-center justify-center border border-primary/20 rounded-sm text-primary/60 hover:text-primary transition-all">
              <FiX className="text-base" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <div ref={sizeDropRef} className="relative flex-1">
              <button onClick={() => { setSizeDropOpen(p => !p); setViewDropOpen(false); }}
                className="w-full flex items-center justify-between gap-2 bg-primary/5 border border-primary/20 text-primary font-heading font-extrabold text-[11px] uppercase tracking-[0.1em] px-3 py-2.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent">
                <span>{sizes[activeSize]?.label}</span>
                <FiChevronDown className={`text-primary/40 text-xs transition-transform duration-200 ${sizeDropOpen ? 'rotate-180' : ''}`} />
              </button>
              {sizeDropOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-secondary border border-primary/15 rounded-sm z-20 overflow-hidden shadow-2xl">
                  {sizes.map((s, i) => (
                    <button key={s.label} onClick={() => { setActiveSize(i); setSizeDropOpen(false); }}
                      className={`w-full text-left px-3 py-2.5 font-heading font-extrabold text-[11px] uppercase tracking-[0.1em] transition-colors border-b border-primary/[0.06] last:border-0 ${activeSize === i ? 'bg-accent/[0.12] text-accent' : 'text-primary/70 hover:bg-primary/[0.06] hover:text-primary'}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div ref={viewDropRef} className="relative flex-1">
              <button onClick={() => { setViewDropOpen(p => !p); setSizeDropOpen(false); }}
                className="w-full flex items-center justify-between gap-2 bg-primary/5 border border-primary/20 text-primary font-heading font-extrabold text-[11px] uppercase tracking-[0.1em] px-3 py-2.5 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent">
                <span>{view === 'photos' ? 'Container' : 'Pallet Guide'}</span>
                <FiChevronDown className={`text-primary/40 text-xs transition-transform duration-200 ${viewDropOpen ? 'rotate-180' : ''}`} />
              </button>
              {viewDropOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-secondary border border-primary/15 rounded-sm z-20 overflow-hidden shadow-2xl">
                  {(['photos', 'pallet'] as const).map(v => (
                    <button key={v} onClick={() => { setView(v); setViewDropOpen(false); }}
                      className={`w-full text-left px-3 py-2.5 font-heading font-extrabold text-[11px] uppercase tracking-[0.1em] transition-colors border-b border-primary/[0.06] last:border-0 ${view === v ? 'bg-accent/[0.12] text-accent' : 'text-primary/70 hover:bg-primary/[0.06] hover:text-primary'}`}>
                      {v === 'photos' ? 'Container' : 'Pallet Guide'}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* ── Main viewer ── */}
      <div className="flex-1 relative min-h-0 overflow-hidden" onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {images.length === 0 ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-primary/30 px-6 text-center">
            <FiGrid className="text-4xl md:text-5xl" />
            <span className="font-heading font-extrabold text-[11px] md:text-[12px] uppercase tracking-[0.2em]">
              {view === 'photos' ? 'Photos coming soon' : 'Pallet guide coming soon'}
            </span>
          </div>
        ) : (
          <>
            <AnimatePresence initial={false} mode="sync" custom={direction}>
              <motion.div key={`${view}-${active}`} custom={direction}
                variants={{
                  enter:  (d: number) => ({ x: d > 0 ? '100%' : '-100%' }),
                  center: { x: 0 },
                  exit:   (d: number) => ({ x: d > 0 ? '-100%' : '100%' }),
                }}
                initial="enter" animate="center" exit="exit"
                transition={{ duration: 0.28, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute inset-0 flex items-center justify-center p-4">
                <img src={images[active]} alt={`${sizeLabel} ${productName} — ${view === 'photos' ? `view ${active + 1}` : `pallet guide ${active + 1}`}`}
                  className="max-h-full max-w-full object-contain rounded-sm" />
              </motion.div>
            </AnimatePresence>

            {/* Prev / next — desktop only */}
            <button onClick={prev} className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-primary/10 hover:bg-accent hover:text-secondary text-primary rounded-sm transition-all">
              <FiChevronLeft className="text-lg" />
            </button>
            <button onClick={next} className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center bg-primary/10 hover:bg-accent hover:text-secondary text-primary rounded-sm transition-all">
              <FiChevronRight className="text-lg" />
            </button>

            {/* Mobile tap zones */}
            {images.length > 1 && (
              <>
                <div className="absolute inset-y-0 left-0 w-2/5 md:hidden z-10"
                  onClick={e => { e.stopPropagation(); prev(); showHint('left'); }} />
                <div className="absolute inset-y-0 right-0 w-2/5 md:hidden z-10"
                  onClick={e => { e.stopPropagation(); next(); showHint('right'); }} />
              </>
            )}

            {/* Tap hint — chevron flash */}
            <AnimatePresence>
              {tapHint && (
                <motion.div key={tapHint + active}
                  initial={{ opacity: 0.5 }} animate={{ opacity: 0 }} exit={{}}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className={`absolute top-1/2 -translate-y-1/2 z-30 pointer-events-none ${tapHint === 'left' ? 'left-[15%]' : 'right-[15%]'}`}>
                  {tapHint === 'left'
                    ? <FiChevronLeft  className="text-primary text-3xl" />
                    : <FiChevronRight className="text-primary text-3xl" />}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile bottom dots */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex md:hidden items-center gap-2 z-20">
              {images.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setDirection(i > active ? 1 : -1); setActive(i); }}
                  className={`rounded-full transition-all duration-300 ${i === active ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-primary/40 active:bg-primary/80'}`} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Thumbnail strip — desktop only ── */}
      {images.length > 0 && (
        <div className="hidden md:flex shrink-0 border-t border-primary/10 px-6 py-4 gap-2 overflow-x-auto" onClick={e => e.stopPropagation()}>
          {images.map((img, i) => (
            <button key={i} onClick={() => { setDirection(i > active ? 1 : -1); setActive(i); }}
              className={`shrink-0 w-20 h-14 rounded-sm overflow-hidden border-2 transition-all ${i === active ? 'border-accent' : 'border-transparent opacity-50 hover:opacity-80'}`}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default ImageDialog;
