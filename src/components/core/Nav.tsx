import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import crystalLogo from '../../assets/brand-data/crystal-logo-black-1.png';
import gsap from 'gsap';
import { FiPackage, FiTool, FiTrendingUp, FiTruck, FiThermometer, FiWind, FiBox, FiLayers, FiActivity, FiShield, FiArrowRight, FiMenu } from 'react-icons/fi';
import NavBreadcrumb, { type Crumb } from './NavBreadcrumb';
import NavMobileDrawer from './NavMobileDrawer';
import NavProgress from './NavProgress';

// Handle Astro's image object in React
const logoSrc = typeof crystalLogo === 'string' ? crystalLogo : (crystalLogo as any).src;

// In production, pages are pre-built static files — hover prefetch is free (<50ms per fetch).
// In dev, each hover triggers a Vite compilation which queues up and blocks other navigations.
const PREFETCH = import.meta.env.PROD ? ('' as const) : undefined;

const navItems = [
  { name: 'Home', href: '/', activePathStart: undefined },
  {
    name: 'Build',
    href: '/#solutions',
    activePathStart: '/build',
    subLinks: [
      { name: 'Built to Suit', desc: 'Design, Build & Operate', icon: <FiPackage className="text-xl shrink-0" />, href: '/build-bts' },
      { name: 'Engineering & Construction', desc: 'Full EPC project delivery', icon: <FiTool className="text-xl shrink-0" />, href: '/build-epc' },
    ],
  },
  {
    name: 'Store',
    href: '/#solutions',
    activePathStart: '/store',
    subLinks: [
      { name: 'Cold Storage', desc: 'Temp-controlled warehousing', icon: <FiThermometer className="text-xl shrink-0" />, href: '/store-cold-storage' },
      { name: '3PL Management', desc: 'Full supply chain outsourcing', icon: <FiTrendingUp className="text-xl shrink-0" />, href: '/store-3pl' },
      {
        name: 'Portable Cold Storage', desc: 'Containers & modular units', icon: <FiBox className="text-xl shrink-0" />, href: '/store-portable-cold-storage',
        nestedLinks: [
          { name: 'Portable Cold Storage: Overview', desc: 'View all units & solutions', icon: <FiBox className="text-xl shrink-0" />, href: '/store-portable-cold-storage' },
          { name: 'Reefer Containers', desc: 'Portable site cold storage', icon: <FiTruck className="text-xl shrink-0" />, href: '/store-reefer' },
          { name: 'Blast Freezers', desc: 'Rapid industrial freezing', icon: <FiWind className="text-xl shrink-0" />, href: '/store-blast-freezer' },
          { name: 'Super Store', desc: 'High-volume modular rooms', icon: <FiLayers className="text-xl shrink-0" />, href: '/store-super-store' },
          { name: 'Super Freezer', desc: 'Ultra-low -70°C storage', icon: <FiThermometer className="text-xl shrink-0" />, href: '/store-super-freezer' },
          { name: 'ISO Tanks', desc: 'Liquid cargo transport', icon: <FiActivity className="text-xl shrink-0" />, href: '/store-iso-tank' },
          { name: 'AMC & Spare Parts', desc: '24/7 maintenance support', icon: <FiShield className="text-xl shrink-0" />, href: '/store-amc' },
        ],
      },
    ],
  },
  { name: 'Move', href: '/move' },
  {
    name: 'Process',
    href: '/process-fvp',
    activePathStart: '/process',
    subLinks: [
      { name: 'Fruits & Vegetables Processing', desc: 'Pre-cooling, sorting & packing', icon: <FiActivity className="text-xl shrink-0" />, href: '/process-fvp' },
      { name: 'Blast Freezing', desc: 'Rapid industrial freezing services', icon: <FiWind className="text-xl shrink-0" />, href: '/process-bfs' },
    ],
  },
  { name: 'Solve', href: '/solve' },
  { name: 'Impact', href: '/impact' },
  { name: 'About', href: '/about' },
  { name: 'Careers', href: '/careers' },
];

/* ─── helpers ─────────────────────────────────────────────────────────────── */
const getBreadcrumbs = (currentPath: string): Crumb[] | null => {
  if (!currentPath || currentPath === '/') return null;
  const crumbs: Crumb[] = [{ name: 'Home', href: '/' }];

  for (const item of navItems) {
    if (item.href === currentPath && !item.subLinks) {
      crumbs.push({ name: item.name, href: item.href });
      break;
    }
    if (item.subLinks) {
      let found = false;
      for (const sub of item.subLinks) {
        if (sub.href === currentPath) {
          crumbs.push({ name: item.name, href: item.href });
          crumbs.push({ name: sub.name, href: sub.href });
          found = true;
          break;
        }
        if (sub.nestedLinks) {
          for (const nested of sub.nestedLinks) {
            if (nested.href === currentPath) {
              crumbs.push({ name: item.name, href: item.href });
              crumbs.push({ name: sub.name, href: sub.href });
              crumbs.push({ name: nested.name, href: nested.href });
              found = true;
              break;
            }
          }
        }
        if (found) break;
      }
      if (found) break;
    }
  }
  return crumbs.length > 1 ? crumbs : null;
};

/* ─── component ───────────────────────────────────────────────────────────── */
const Nav: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isUserActive, setIsUserActive] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [currentPath, setCurrentPath] = useState('');
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);
  const [activeNestedMenu, setActiveNestedMenu] = useState<string | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const hideTimers = useRef<{ [key: number]: ReturnType<typeof setTimeout> }>({});
  const lastScrollY = useRef(0);
  const scrollUpDist = useRef(0);   // accumulated upward scroll since nav was hidden
  const menuOpenRef = useRef(false);

  /* ── dropdown hover/click ───────────────────────────────────────────────── */
  const handleNavEnter = (idx: number, hasSubLinks: boolean) => {
    if (!hasSubLinks) return;
    Object.values(hideTimers.current).forEach(t => clearTimeout(t));
    setOpenDropdown(idx);
  };

  const handleNavLeave = (idx: number, hasSubLinks: boolean) => {
    if (!hasSubLinks) return;
    hideTimers.current[idx] = setTimeout(() => setOpenDropdown(null), 200);
  };

  const handleNavClick = (e: React.MouseEvent, idx: number, hasSubLinks: boolean) => {
    if (!hasSubLinks) return;
    e.preventDefault();
    Object.values(hideTimers.current).forEach(t => clearTimeout(t));
    setOpenDropdown(prev => prev === idx ? null : idx);
  };

  /* ── dropdown GSAP stagger ──────────────────────────────────────────────── */
  useLayoutEffect(() => {
    if (openDropdown !== null) {
      const el = dropdownRefs.current[openDropdown];
      if (!el) return;
      const cards = el.querySelectorAll('.subnav-card');
      gsap.killTweensOf(cards);
      gsap.set(cards, { y: 25, opacity: 0 });
      gsap.to(cards, { opacity: 1, y: 0, duration: 0.25, ease: 'circ.out', stagger: 0.03, overwrite: 'auto' });
    }
  }, [openDropdown]);

  /* ── inactivity timer ───────────────────────────────────────────────────── */
  useEffect(() => {
    let inactivityTimer: ReturnType<typeof setTimeout>;
    const reset = () => {
      setIsUserActive(true);
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => setIsUserActive(false), 5000);
    };
    ['mousemove', 'scroll', 'keydown', 'click'].forEach(ev => window.addEventListener(ev, reset));
    reset();
    return () => {
      ['mousemove', 'scroll', 'keydown', 'click'].forEach(ev => window.removeEventListener(ev, reset));
      clearTimeout(inactivityTimer);
    };
  }, []);

  /* ── hide nav when image gallery/lightbox is open ──────────────────────── */
  useEffect(() => {
    const observer = new MutationObserver(() => {
      const open = 'galleryOpen' in document.body.dataset;
      setGalleryOpen(open);
      if (open) setMenuOpen(false); // close mobile drawer instantly
    });
    observer.observe(document.body, { attributeFilter: ['data-gallery-open'] });
    return () => observer.disconnect();
  }, []);

  // Also reset accumulator whenever nav becomes visible (e.g. menu opened, returned to top)
  const showNav = !galleryOpen && (menuOpen || isAtTop || (isVisible && isUserActive));

  /* ── GSAP nav show/hide ─────────────────────────────────────────────────── */
  useLayoutEffect(() => {
    if (!navRef.current) return;
    if (galleryOpen) {
      // Instant — no bounce delay, nav must vanish before dialog appears
      gsap.set(navRef.current, { yPercent: -100 });
    } else {
      gsap.to(navRef.current, {
        yPercent: showNav ? 0 : -100,
        duration: 0.8,
        ease: showNav ? 'elastic.out(1, 0.75)' : 'elastic.in(1, 0.75)',
        overwrite: 'auto',
      });
    }
  }, [showNav, galleryOpen]);

  /* ── CTA button: appears after navbar fully hides (0.85s = animation + buffer) */
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    if (!showNav) {
      t = setTimeout(() => setCtaVisible(true), 850);
    } else {
      setCtaVisible(false);
    }
    return () => clearTimeout(t);
  }, [showNav]);

  /* ── keep menuOpenRef in sync ───────────────────────────────────────────── */
  useEffect(() => { menuOpenRef.current = menuOpen; }, [menuOpen]);

  /* ── path sync + scroll tracking ───────────────────────────────────────── */
  useEffect(() => {
    const syncPath = () => {
      setCurrentPath(window.location.pathname);
      setMenuOpen(false);
      setOpenDropdown(null);
      setActiveAccordion(null);
      setActiveNestedMenu(null);
    };
    syncPath();
    document.addEventListener('astro:page-load', syncPath);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const isScrolledNow = window.scrollY > 30;
          setScrolled(isScrolledNow);
          if (menuOpenRef.current && isScrolledNow) setMenuOpen(false);

          const windowHeight = window.innerHeight || 800;
          const atTop = window.scrollY < windowHeight * 0.8;
          setIsAtTop(atTop);

          if (window.scrollY > lastScrollY.current && window.scrollY > 100 && !atTop) {
            // Scrolling down — hide and reset accumulator
            setIsVisible(false);
            scrollUpDist.current = 0;
          } else if (window.scrollY <= 100 || atTop) {
            // Near top — always show immediately
            setIsVisible(true);
            scrollUpDist.current = 0;
          } else if (window.scrollY < lastScrollY.current) {
            // Scrolling up away from top — require threshold equal to nav height
            // so the nav only reappears after you've cleared the space it will occupy.
            scrollUpDist.current += lastScrollY.current - window.scrollY;
            const threshold = navRef.current?.offsetHeight ?? 80;
            if (scrollUpDist.current >= threshold) {
              setIsVisible(true);
            }
          }
          lastScrollY.current = window.scrollY;

          if (progressRef.current) {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            gsap.to(progressRef.current, { scaleX: height > 0 ? winScroll / height : 0, duration: 0.2, ease: 'none', overwrite: 'auto' });
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('astro:page-load', syncPath);
    };
  }, []);

  const breadcrumbs = getBreadcrumbs(currentPath);

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col ${menuOpen ? 'bg-secondary py-6' : 'bg-primary pt-6 shadow-sm'}`}
      >
        <div className="container mx-auto px-4 md:px-8 lg:px-10 max-w-[1320px] flex items-center justify-between relative pb-6">

          {/* Logo */}
          <div className="flex items-center justify-start shrink-0">
            <a href="/" className="group">
              <img
                src={logoSrc}
                alt="Crystal Group"
                width={220}
                height={64}
                decoding="async"
                className={`w-auto transition-all duration-700 ease-out object-contain h-10 md:h-12 ${menuOpen ? 'brightness-0 invert' : ''}`}
              />
            </a>
          </div>

          {/* Desktop nav links — absolutely centered */}
          <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2">
            <div className="flex border-2 transition-all duration-500 rounded-sm overflow-visible h-[48px] bg-secondary/[0.04] border-secondary/10 px-1">
              {navItems.map((item, idx) => {
                const isActive = currentPath === item.href || (item.activePathStart && currentPath.startsWith(item.activePathStart));
                const isDropOpen = openDropdown === idx;
                const highlight = isActive || isDropOpen;

                return (
                  <div
                    key={item.name}
                    className="relative h-full flex"
                    onMouseEnter={() => handleNavEnter(idx, !!item.subLinks)}
                    onMouseLeave={() => handleNavLeave(idx, !!item.subLinks)}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, idx, !!item.subLinks)}
                      data-astro-prefetch={!item.subLinks ? PREFETCH : undefined}
                      className={`px-2.5 xl:px-4 font-heading font-extrabold text-[10px] uppercase tracking-[0.15em] h-full flex items-center justify-center transition-all duration-300 border-r-2 border-secondary/5 last:border-r-0 active:scale-95 whitespace-nowrap gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${highlight ? 'bg-secondary text-primary' : 'text-secondary hover:bg-secondary hover:text-primary'}`}
                    >
                      <span>{item.name}</span>
                      {item.subLinks && (
                        <span className={`text-[9px] opacity-70 mt-[1px] transition-transform duration-300 ${openDropdown === idx ? 'rotate-180' : ''}`}>&darr;</span>
                      )}
                    </a>

                    {item.subLinks && (
                      <div
                        ref={el => { dropdownRefs.current[idx] = el; }}
                        className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[200]"
                        style={{
                          width: item.subLinks.length >= 6 ? '340px' : '300px',
                          opacity: isDropOpen ? 1 : 0,
                          pointerEvents: isDropOpen ? 'auto' : 'none',
                          transform: `translateX(-50%) translateY(${isDropOpen ? '0px' : '8px'})`,
                          visibility: isDropOpen ? 'visible' : 'hidden',
                          transition: 'opacity 0.3s cubic-bezier(0.23, 1, 0.32, 1), transform 0.3s cubic-bezier(0.23, 1, 0.32, 1)',
                        }}
                        onMouseEnter={() => handleNavEnter(idx, true)}
                        onMouseLeave={() => handleNavLeave(idx, true)}
                      >
                        <div className="bg-primary border border-secondary/15 shadow-[0_15px_40px_rgba(0,0,0,0.08)] rounded-sm p-1">
                          <div className="flex flex-col gap-0.5">
                            {item.subLinks.map((sub, sidx) => {
                              const hasNested = !!sub.nestedLinks;
                              const isSubActive = currentPath === sub.href;
                              return (
                                <div key={sub.name} className="relative group/nested flex flex-col">
                                  <a
                                    href={sub.href}
                                    data-astro-prefetch={PREFETCH}
                                    className={`subnav-card flex flex-col pt-2 pb-2 pl-2 pr-4 rounded-sm transition-all duration-300 hover:bg-secondary/[0.03] group-hover/nested:bg-secondary/[0.03] border-l-2 hover:border-accent group-hover/nested:border-accent group/sublink ${isSubActive ? 'bg-secondary/[0.03] border-accent' : 'border-transparent'}`}
                                    style={{ opacity: 0, transform: 'translateY(15px)' }}
                                  >
                                    <div className="flex items-center gap-3 w-full">
                                      <div className={`w-8 h-8 flex items-center justify-center rounded-sm transition-all duration-300 shrink-0 ${isSubActive ? 'bg-secondary text-accent' : 'bg-secondary/[0.04] text-secondary group-hover/sublink:bg-secondary group-hover/nested:bg-secondary group-hover/sublink:text-accent group-hover/nested:text-accent'}`}>
                                        <span className="text-base">{sub.icon}</span>
                                      </div>
                                      <div className="flex flex-col flex-1">
                                        <span className={`font-heading font-extrabold text-[10.5px] uppercase tracking-[0.1em] transition-colors leading-none mb-1 ${isSubActive ? 'text-accent' : 'text-secondary group-hover/sublink:text-accent group-hover/nested:text-accent'}`}>
                                          {sub.name}
                                        </span>
                                        <span className={`font-body font-medium text-[9.5px] transition-colors ${isSubActive ? 'text-secondary/70' : 'text-secondary/40 group-hover/sublink:text-secondary/60 group-hover/nested:text-secondary/60'}`}>
                                          {sub.desc}
                                        </span>
                                      </div>
                                      {hasNested && (
                                        <span className="text-secondary/40 group-hover/sublink:text-accent group-hover/nested:text-accent transition-all duration-300 group-hover/nested:rotate-90">
                                          <FiArrowRight className="text-sm" />
                                        </span>
                                      )}
                                    </div>
                                  </a>

                                  {/* Inline vertical accordion nested menu */}
                                  {hasNested && (
                                    <div className="grid grid-rows-[0fr] group-hover/nested:grid-rows-[1fr] transition-[grid-template-rows] duration-500 overflow-hidden w-full pl-12 pr-2">
                                      <div className="min-h-0 flex flex-col gap-1 border-l-2 border-accent/20 pl-4 py-1 mb-2">
                                        {sub.nestedLinks?.map((nested, nidx) => {
                                          const isNestedActive = currentPath === nested.href;
                                          return (
                                            <a
                                              key={nested.name}
                                              href={nested.href}
                                              data-astro-prefetch={PREFETCH}
                                              className="flex items-center gap-3 py-1.5 transition-all duration-300 group/nestedlink cursor-pointer relative"
                                            >
                                              <div className="flex flex-col">
                                                <span className={`flex items-center gap-2 font-heading font-extrabold text-[10px] uppercase tracking-[0.1em] transition-colors leading-none mb-[2px] ${isNestedActive ? 'text-accent' : 'text-secondary/70 group-hover/nestedlink:text-accent'}`}>
                                                  {nested.name}
                                                  {isNestedActive && <span className="absolute -left-[14px] w-[3px] h-[3px] bg-accent rounded-full" />}
                                                  <FiArrowRight className={`text-[10px] transition-all text-accent ${isNestedActive ? 'opacity-100 ml-0' : 'opacity-0 -ml-1 group-hover/nestedlink:opacity-100 group-hover/nestedlink:ml-0'}`} />
                                                </span>
                                              </div>
                                            </a>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right: CTA + hamburger */}
          <div className="flex items-center gap-3 shrink-0">
            <a
              href="/contact"
              data-astro-prefetch={PREFETCH}
              className="hidden lg:flex font-heading font-extrabold text-[10px] uppercase tracking-[0.15em] px-6 py-3 bg-secondary text-primary rounded-sm transition-all duration-300 border-2 border-secondary hover:bg-transparent hover:text-secondary group items-center gap-2 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <span className="whitespace-nowrap">Talk to us</span>
              <span className="font-heading font-bold text-lg leading-none group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
            <button
              className="lg:hidden flex items-center justify-center w-10 h-10 z-[102] relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
            >
              <FiMenu size={22} strokeWidth={2} className="text-secondary" />
            </button>
          </div>
        </div>

        {/* Breadcrumb */}
        <NavBreadcrumb breadcrumbs={breadcrumbs} currentPath={currentPath} menuOpen={menuOpen} scrolled={scrolled} />

        {/* Floating CTA — mirrors breadcrumb, appears on scroll */}
        <AnimatePresence>
          {ctaVisible && !menuOpen && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
              className="hidden lg:flex absolute top-[calc(100%+20px)] right-6 lg:right-10 z-[95] pointer-events-auto"
            >
              <a
                href="/contact"
                className="flex items-center gap-2 bg-accent text-secondary font-heading font-extrabold text-[11px] uppercase tracking-[0.13em] px-4 py-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)] hover:bg-accent/90 transition-colors duration-200"
              >
                Talk To Us <FiArrowRight className="text-[11px]" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Mobile drawer */}
      <NavMobileDrawer
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
        navItems={navItems}
        activeAccordion={activeAccordion}
        setActiveAccordion={setActiveAccordion}
        activeNestedMenu={activeNestedMenu}
        setActiveNestedMenu={setActiveNestedMenu}
      />

      {/* Scroll progress bar + dropdown scrim */}
      <NavProgress progressRef={progressRef} showNav={showNav} dropdownOpen={openDropdown !== null} />
    </>
  );
};

export default Nav;
