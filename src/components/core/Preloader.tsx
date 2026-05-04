import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const NAVY    = '#0F2854';
const WHITE   = '#FEFFFE';
const ACCENT  = '#FAC212';
const EASE    = [0.76, 0, 0.24, 1] as const;
const STAGGER = 0.032;
const BASE    = 0.18;

/* ── Char data ─────────────────────────────────────────────────────────── */

type CharItem = { char: string; color: string; delay: number };
type LineData  = CharItem[][];   /* array of words → array of chars */

function buildLine(
  words: { text: string; color: string }[],
  startIdx: number
): { line: LineData; count: number } {
  const line: LineData = [];
  let i = 0;
  words.forEach(({ text, color }) => {
    line.push(
      Array.from(text).map(char => ({
        char,
        color,
        delay: BASE + (startIdx + i++) * STAGGER,
      }))
    );
  });
  return { line, count: i };
}

/* Pre-computed — stable across renders */
const { line: LINE1, count: c1 } = buildLine(
  [{ text: 'Preparing', color: WHITE }, { text: 'Your', color: WHITE }],
  0
);
const { line: LINE2 } = buildLine(
  [
    { text: 'Cold',       color: ACCENT },
    { text: 'Chain',      color: ACCENT },
    { text: 'Experience', color: WHITE  },
  ],
  c1
);

/* ── CharLine ────────────────────────────────────────────────────────────
   Each word is inline-block + nowrap so it never breaks mid-word.
   Each character clips up from overflow-hidden, driven by framer-motion.
──────────────────────────────────────────────────────────────────────── */
function CharLine({ line }: { line: LineData }) {
  return (
    <div>
      {line.map((word, wi) => (
        <React.Fragment key={wi}>
          {wi > 0 && ' '}
          <span style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
            {word.map((item, ci) => (
              <span
                key={ci}
                style={{ display: 'inline-block', overflow: 'hidden', verticalAlign: 'bottom' }}
              >
                <motion.span
                  style={{ display: 'inline-block', color: item.color }}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ delay: item.delay, duration: 0.55, ease: EASE }}
                >
                  {item.char}
                </motion.span>
              </span>
            ))}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
}

/* ── Preloader ───────────────────────────────────────────────────────────*/
const Preloader: React.FC = () => {
  const [visible] = useState(() => !sessionStorage.getItem('crystal-preloader-done'));
  const [exiting, setExiting] = useState(false);

  const counterRef = useRef<HTMLSpanElement>(null);
  const hBarRef    = useRef<HTMLDivElement>(null);

  useEffect(() => { document.getElementById('preloader-shell')?.remove(); }, []);

  useEffect(() => {
    if (!visible) return;
    let step = 0;
    const id = setInterval(() => {
      step++;
      const p = Math.floor((1 - Math.pow(1 - step / 100, 3)) * 100);

      if (hBarRef.current)    hBarRef.current.style.transform = `scaleX(${p / 100})`;
      if (counterRef.current) counterRef.current.textContent  = String(p).padStart(2, '0');

      if (step >= 100) {
        clearInterval(id);
        setTimeout(() => {
          sessionStorage.setItem('crystal-preloader-done', '1');
          setExiting(true);
        }, 500);
      }
    }, 18);
    return () => clearInterval(id);
  }, [visible]);

  const handleExitComplete = () => {
    const pc = document.getElementById('page-content');
    pc?.classList.add('is-entering');
    document.documentElement.removeAttribute('data-preloading');
    window.dispatchEvent(new CustomEvent('preloader:done'));
    setTimeout(() => pc?.classList.remove('is-entering'), 1200);
  };

  if (!visible) return null;

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col overflow-hidden select-none"
          style={{ backgroundColor: NAVY }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.65, ease: EASE }}
        >

          {/* ── Main body ── */}
          <div
            className="flex-1 flex flex-col md:flex-row md:items-center justify-center md:justify-start gap-5 md:gap-0"
            style={{ padding: '0 clamp(1.5rem, 8vw, 7rem)' }}
          >

            {/* Counter */}
            <motion.div
              className="md:w-[40%] md:flex-shrink-0 flex-shrink-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              style={{
                fontFamily: 'inherit',
                fontWeight: 800,
                lineHeight: 1,
                letterSpacing: '-0.04em',
                fontSize: 'clamp(4.5rem, 18vw, 14rem)',
                color: 'rgba(254,255,254,0.18)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              <span style={{ display: 'inline-flex', alignItems: 'flex-start' }}>
                <span ref={counterRef}>00</span>
                <span style={{ fontSize: '0.38em', letterSpacing: '-0.02em', marginTop: '0.1em' }}>%</span>
              </span>
            </motion.div>

            {/* Vertical divider — desktop only */}
            <div
              className="hidden md:block flex-shrink-0"
              style={{
                width: '1px',
                alignSelf: 'stretch',
                backgroundColor: 'rgba(254,255,254,0.08)',
                margin: '2.5rem 0',
              }}
            />

            {/* Text — char reveal */}
            <div
              className="md:pl-[6%]"
              style={{
                fontFamily: 'inherit',
                fontWeight: 800,
                lineHeight: 1.18,
                letterSpacing: '-0.03em',
                fontSize: 'clamp(1.6rem, 5.5vw, 4rem)',
              }}
            >
              <CharLine line={LINE1} />
              <CharLine line={LINE2} />
            </div>

          </div>

          {/* ── Bottom progress line ── */}
          <div style={{ width: '100%', height: '1px', backgroundColor: 'rgba(254,255,254,0.07)' }}>
            <div
              ref={hBarRef}
              style={{
                height: '100%',
                backgroundColor: ACCENT,
                transformOrigin: 'left center',
                transform: 'scaleX(0)',
              }}
            />
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
