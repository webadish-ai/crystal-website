/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#FEFFFE',    // Off-white
        secondary: '#0F2854',  // Navy
        accent: '#FAC212',     // Amber
        dark: '#010000',       // True Black
      },
      fontFamily: {
        heading: ['Poppins', 'sans-serif'],
        body: ['Poppins', 'sans-serif'],
      },
      // ── Unified type scale ──────────────────────────────────────────────────
      // Use these instead of arbitrary text-[Xpx] values everywhere.
      fontSize: {
        // Display / Hero H1
        'display': ['clamp(40px,6.5vw,80px)', { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        // Inner-page hero headings
        'h1':      ['clamp(32px,5vw,56px)',   { lineHeight: '0.95', letterSpacing: '-0.03em' }],
        // Section headings
        'h2':      ['clamp(22px,3.5vw,44px)', { lineHeight: '1.0',  letterSpacing: '-0.02em' }],
        // Sub-section / card headings
        'h3':      ['clamp(16px,2.2vw,26px)', { lineHeight: '1.1',  letterSpacing: '-0.01em' }],
        // Small card / label headings
        'h4':      ['clamp(13px,1.4vw,18px)', { lineHeight: '1.2' }],
        // Large body / descriptions
        'body-lg': ['clamp(13px,1.1vw,15px)', { lineHeight: '1.65' }],
        // Standard body
        'body-md': ['clamp(12px,0.9vw,14px)', { lineHeight: '1.6' }],
        // Small body / captions
        'body-sm': ['clamp(10px,0.7vw,12px)', { lineHeight: '1.5' }],
        // Eyebrow labels
        'eyebrow': ['clamp(11px,0.75vw,12px)', { lineHeight: '1', letterSpacing: '0.15em' }],
      },
      lineHeight: {
        'tight-none': '0.95',
      },
      letterSpacing: {
        'tighter':  '-0.03em',
        'eyebrow':  '0.25em',
        'widest2':  '0.2em',
      },
      // ── Standardised section spacing ────────────────────────────────────────
      spacing: {
        'section-sm': '4rem',   // py-section-sm  = 64px
        'section':    '5rem',   // py-section      = 80px
        'section-lg': '6rem',   // py-section-lg   = 96px
      },
    },
  },
  plugins: [],
};
