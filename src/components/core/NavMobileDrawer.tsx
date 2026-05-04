import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiChevronDown, FiX } from 'react-icons/fi';

const PREFETCH = import.meta.env.PROD ? ('' as const) : undefined;

interface NavItem {
  name: string;
  href: string;
  activePathStart?: string;
  subLinks?: SubLink[];
}

interface SubLink {
  name: string;
  desc: string;
  icon: React.ReactNode;
  href: string;
  nestedLinks?: NestedLink[];
}

interface NestedLink {
  name: string;
  desc: string;
  icon: React.ReactNode;
  href: string;
}

interface NavMobileDrawerProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  navItems: NavItem[];
  activeAccordion: string | null;
  setActiveAccordion: (name: string | null) => void;
  activeNestedMenu: string | null;
  setActiveNestedMenu: (name: string | null) => void;
}

const NavMobileDrawer: React.FC<NavMobileDrawerProps> = ({
  menuOpen,
  setMenuOpen,
  navItems,
  activeAccordion,
  setActiveAccordion,
  activeNestedMenu,
  setActiveNestedMenu,
}) => (
  <AnimatePresence>
    {menuOpen && (
      <>
        {/* Backdrop */}
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="lg:hidden fixed inset-0 bg-black/50 z-[100] backdrop-blur-[2px]"
          onClick={() => setMenuOpen(false)}
        />

        {/* Drawer panel */}
        <motion.div
          key="drawer"
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ duration: 0.42, ease: [0.23, 1, 0.32, 1] }}
          className="lg:hidden fixed top-0 right-0 h-[100dvh] w-[82vw] max-w-[340px] bg-secondary z-[101] flex flex-col shadow-[-20px_0_60px_rgba(0,0,0,0.25)]"
        >
          {/* Close button */}
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center text-primary/60 hover:text-primary transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent z-10"
            aria-label="Close menu"
          >
            <FiX size={20} strokeWidth={2.5} />
          </button>

          {/* Drawer header */}
          <div className="flex items-center px-6 pt-5 pb-4 border-b border-primary/10 shrink-0">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent">Menu</span>
          </div>

          {/* Nav list */}
          <div className="flex-1 overflow-y-auto">
            {navItems.map((item, idx) => {
              const isOpen = activeAccordion === item.name;
              const hasSub = !!item.subLinks;

              return (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 + idx * 0.04, duration: 0.28, ease: 'easeOut' }}
                  className="border-b border-primary/[0.08] last:border-0"
                >
                  {hasSub ? (
                    <button
                      onClick={() => setActiveAccordion(isOpen ? null : item.name)}
                      className="w-full flex items-center justify-between px-6 py-4"
                    >
                      <span className={`font-heading font-extrabold text-[13px] uppercase tracking-[0.08em] transition-colors ${isOpen ? 'text-accent' : 'text-primary'}`}>
                        {item.name}
                      </span>
                      <FiChevronDown
                        size={17}
                        strokeWidth={3}
                        className={`transition-transform duration-300 text-accent ${isOpen ? 'rotate-180' : 'opacity-70'}`}
                      />
                    </button>
                  ) : (
                    <a
                      href={item.href}
                      data-astro-prefetch={PREFETCH}
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center justify-between px-6 py-4 group"
                    >
                      <span className="font-heading font-extrabold text-[13px] uppercase tracking-[0.08em] text-primary group-hover:text-accent transition-colors">
                        {item.name}
                      </span>
                      <FiArrowRight size={13} className="text-primary/25 group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                    </a>
                  )}

                  {/* Accordion sub-links */}
                  <AnimatePresence initial={false}>
                    {hasSub && isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mx-6 mb-3 pl-4 border-l-2 border-accent/30 flex flex-col gap-0.5">
                          {item.subLinks?.map((sub, sidx) => {
                            const hasNested = !!sub.nestedLinks;
                            const isNestedOpen = activeNestedMenu === sub.name;

                            return (
                              <div key={sub.name}>
                                <a
                                  href={sub.href}
                                  data-astro-prefetch={PREFETCH}
                                  onClick={(e) => {
                                    if (hasNested) {
                                      e.preventDefault();
                                      setActiveNestedMenu(isNestedOpen ? null : sub.name);
                                    } else {
                                      setMenuOpen(false);
                                    }
                                  }}
                                  className="flex items-center justify-between py-2.5 group"
                                >
                                  <div>
                                    <span className="font-heading font-extrabold text-[11px] uppercase tracking-[0.08em] text-primary/75 group-hover:text-accent transition-colors block leading-none mb-0.5">
                                      {sub.name}
                                    </span>
                                    <span className="font-body text-[10px] text-primary/35 leading-none">{sub.desc}</span>
                                  </div>
                                  {hasNested ? (
                                    <FiChevronDown
                                      size={15}
                                      strokeWidth={3}
                                      className={`transition-transform duration-300 shrink-0 text-accent ${isNestedOpen ? 'rotate-180' : 'opacity-70'}`}
                                    />
                                  ) : (
                                    <FiArrowRight size={11} className="text-primary/25 group-hover:text-accent transition-colors shrink-0" />
                                  )}
                                </a>

                                {/* Nested links */}
                                <AnimatePresence initial={false}>
                                  {hasNested && isNestedOpen && (
                                    <motion.div
                                      initial={{ height: 0, opacity: 0 }}
                                      animate={{ height: 'auto', opacity: 1 }}
                                      exit={{ height: 0, opacity: 0 }}
                                      transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
                                      className="overflow-hidden pl-3 border-l border-accent/20 mb-1"
                                    >
                                      {sub.nestedLinks?.map((nested, nidx) => (
                                        <a
                                          key={nested.name}
                                          href={nested.href}
                                          data-astro-prefetch={PREFETCH}
                                          onClick={() => setMenuOpen(false)}
                                          className="flex items-center gap-2 py-2 group"
                                        >
                                          <span className="font-heading font-bold text-[10px] uppercase tracking-[0.08em] text-primary/55 group-hover:text-accent transition-colors">
                                            {nested.name}
                                          </span>
                                        </a>
                                      ))}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* CTA footer */}
          <div className="px-6 py-5 border-t border-primary/10 shrink-0">
            <a
              href="/contact"
              data-astro-prefetch={PREFETCH}
              onClick={() => setMenuOpen(false)}
              className="font-heading font-extrabold text-[11px] uppercase tracking-[0.15em] w-full py-4 bg-accent text-secondary rounded-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-300 hover:bg-primary hover:text-secondary group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Talk to us
              <FiArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default NavMobileDrawer;
