import React, { useState, useEffect, useRef } from 'react';
import { FiArrowUp } from 'react-icons/fi';

function getSectionLabel(el: HTMLElement): string {
  // Eyebrow spans are always plain text (no CharReveal), short, and consistent
  const eyebrow = el.querySelector('[class*="text-eyebrow"]') as HTMLElement | null;
  if (eyebrow) {
    const t = (eyebrow.textContent ?? '').trim().replace(/\s+/g, ' ');
    if (t) {
      // Eyebrow text is ALL CAPS in JSON — convert to Title Case
      const titled = t.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());
      return titled.length > 28 ? titled.slice(0, 28).trimEnd() + '…' : titled;
    }
  }
  // Fall back to section id
  const id = el.getAttribute('id');
  if (id) return id.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return '';
}

interface SectionItem { label: string; el: HTMLElement }

const ScrollToTop: React.FC = () => {
  const [isVisible,    setIsVisible]    = useState(false);
  const [galleryOpen,  setGalleryOpen]  = useState(false);
  const [menuOpen,     setMenuOpen]     = useState(false);
  const [sectionItems, setSectionItems] = useState<SectionItem[]>([]);
  const [passedCount,  setPassedCount]  = useState(0);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scanSections = () => {
    const all = Array.from(document.querySelectorAll('section')) as HTMLElement[];
    const topLevel = all.filter(el => el.parentElement?.tagName !== 'SECTION');
    const seen = new Set<string>();
    const items: SectionItem[] = [];
    for (const el of topLevel) {
      const label = getSectionLabel(el);
      if (!label || seen.has(label)) continue;
      seen.add(label);
      items.push({ label, el });
    }
    setSectionItems(items);
    setPassedCount(0);
  };

  useEffect(() => {
    const t = setTimeout(scanSections, 300);
    document.addEventListener('astro:page-load', scanSections);
    return () => { clearTimeout(t); document.removeEventListener('astro:page-load', scanSections); };
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setIsVisible(y > 800);
      const threshold = y + window.innerHeight * 0.25;
      setPassedCount(
        sectionItems.filter(({ el }) =>
          el.getBoundingClientRect().top + window.scrollY < threshold
        ).length
      );
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [sectionItems]);

  useEffect(() => {
    const obs = new MutationObserver(() =>
      setGalleryOpen('galleryOpen' in document.body.dataset)
    );
    obs.observe(document.body, { attributeFilter: ['data-gallery-open'] });
    return () => obs.disconnect();
  }, []);

  const scrollToTop = () => {
    if ((window as any).lenis) (window as any).lenis.scrollTo(0, { duration: 0.8 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (el: HTMLElement) => {
    if ((window as any).lenis)
      (window as any).lenis.scrollTo(el, { duration: 0.8, offset: -80 });
    else el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  const onEnter = () => { if (leaveTimer.current) clearTimeout(leaveTimer.current); setMenuOpen(true); };
  const onLeave = () => { leaveTimer.current = setTimeout(() => setMenuOpen(false), 180); };

  const passedSections = sectionItems.slice(0, passedCount);
  const showMenu = menuOpen && passedSections.length > 0;

  return (
    <>
      {/* Floating section list — separate fixed element above the button */}
      <div
        className={`fixed bottom-24 right-8 z-[100] flex flex-col gap-1 items-end transition-all duration-200 origin-bottom-right ${
          isVisible && !galleryOpen && showMenu
            ? 'opacity-100 scale-100 visible'
            : 'opacity-0 scale-95 invisible pointer-events-none'
        }`}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {passedSections.map(({ label, el }, i) => (
          <button
            key={i}
            onClick={() => scrollToSection(el)}
            className="group flex items-center gap-2 pl-3 pr-2.5 py-[7px] bg-secondary text-primary font-body font-medium text-[12px] tracking-normal rounded-sm shadow-xl hover:bg-accent hover:text-secondary transition-all duration-150 whitespace-nowrap"
          >
            {label}
            <span className="text-[9px] opacity-40 group-hover:opacity-100 transition-opacity">↑</span>
          </button>
        ))}
      </div>

      {/* Main button — stays in place, no translate on hover */}
      <button
        className={`fixed bottom-8 right-8 w-14 h-14 bg-accent text-secondary flex items-center justify-center cursor-pointer z-[100] transition-all duration-300 rounded-sm border border-accent hover:bg-secondary hover:text-primary hover:border-secondary shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ${
          isVisible && !galleryOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 translate-y-10 invisible'
        }`}
        onClick={scrollToTop}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        aria-label="Scroll to top"
      >
        <FiArrowUp className="text-2xl" />
      </button>
    </>
  );
};

export default ScrollToTop;
