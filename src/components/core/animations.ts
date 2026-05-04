/**
 * Shared Framer Motion animation variants.
 * Import from here instead of re-defining per component.
 */

export const EASE = [0.21, 0.47, 0.32, 0.98] as const;
const DURATION = 0.45;

/** Staggered container – reveals children one after another */
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0 },
  },
};

/** Generic fade-up item */
export const itemVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: DURATION, ease: EASE } },
};

/** Fade-in only (no translate) */
export const fadeVariants = {
  hidden: { opacity: 0, willChange: 'opacity' },
  visible: {
    opacity: 1,
    willChange: 'auto',
    transition: { duration: DURATION, ease: EASE },
  },
};

/** Slide in from left */
export const slideLeftVariants = {
  hidden: { opacity: 0, x: -20, willChange: 'transform, opacity' },
  visible: {
    opacity: 1,
    x: 0,
    willChange: 'auto',
    transition: { duration: DURATION, ease: EASE },
  },
};

/** Slide in from right */
export const slideRightVariants = {
  hidden: { opacity: 0, x: 20, willChange: 'transform, opacity' },
  visible: {
    opacity: 1,
    x: 0,
    willChange: 'auto',
    transition: { duration: DURATION, ease: EASE },
  },
};

/** Word/char container – keeps opacity:1 so children animate independently */
export const wordContainerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.01 },
  },
};

/** Character reveal – clips upward */
export const charVariants = {
  hidden: { y: '120%', willChange: 'transform' },
  visible: {
    y: 0,
    willChange: 'auto',
    transition: { duration: 0.5, ease: EASE },
  },
};

/** Shared viewport trigger config */
export const viewportOnce = { once: true, amount: 0.2 } as const;

/** Title-case a heading string — capitalises first letter of each word */
export const tc = (s: string) =>
  s.replace(/(?<!['\u2019])\b[a-zA-Z]/g, (c) => c.toUpperCase());
