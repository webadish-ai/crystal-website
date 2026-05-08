import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiBox, FiTruck, FiThermometer, FiZap, FiSend, FiShoppingBag } from 'react-icons/fi';
import {
  EASE,
  containerVariants,
  itemVariants,
  wordContainerVariants,
  charVariants,
  viewportOnce,
  tc,
} from '@components/core/animations';

// Matches tailwind.config accent + primary tokens — needed for Framer Motion animate props
const C_ACCENT = C_ACCENT;
const C_PRIMARY = C_PRIMARY;
import homepageData from '@data/homepage.json';
import type { S4Section } from '@types/homepage';

const s4 = homepageData.homepage.sections.find(s => s.id === 'S4')! as unknown as S4Section;

const stepsMeta = [
  { id: '01', subtitle: null,              crystalOwned: false, icon: <FiBox size={22} />        },
  { id: '02', subtitle: 'Crystal Move',    crystalOwned: true,  icon: <FiTruck size={22} />      },
  { id: '03', subtitle: 'Crystal Store',   crystalOwned: true,  icon: <FiThermometer size={22} />},
  { id: '04', subtitle: 'Crystal Process', crystalOwned: true,  icon: <FiZap size={22} />        },
  { id: '05', subtitle: 'Crystal Store',   crystalOwned: true,  icon: <FiSend size={22} />       },
  { id: '06', subtitle: null,              crystalOwned: false, icon: <FiShoppingBag size={22} /> },
];

const steps = s4.chain.map((chainName, i) => ({
  ...stepsMeta[i],
  title: chainName,
}));

const CRYSTAL_INDICES = [...steps.map((s, i) => s.crystalOwned ? i : -1).filter(i => i >= 0), steps.length - 1];
const TOTAL = steps.length;

const Journey: React.FC = () => {
  const [activeCrystal, setActiveCrystal] = useState(CRYSTAL_INDICES[0]);
  const [isInView, setIsInView]           = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const id = setInterval(() => {
      setActiveCrystal(prev => {
        const ci = CRYSTAL_INDICES.indexOf(prev);
        return CRYSTAL_INDICES[(ci + 1) % CRYSTAL_INDICES.length];
      });
    }, 2200);
    return () => clearInterval(id);
  }, [isInView]);

  // scaleX for the active track: fraction of full track width from node 0 to node activeCrystal
  const trackFill = activeCrystal / (TOTAL - 1);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="min-h-[100vh] w-full bg-secondary text-primary relative overflow-hidden flex flex-col items-center justify-center py-20 px-6 md:px-12 box-border"
    >
      <motion.div
        className="w-full flex flex-col items-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={containerVariants}
      >
        {/* â”€â”€ HEADER â”€â”€ */}
        <div className="w-full flex items-center justify-center relative z-20 mb-6 md:mb-16">
          <div className="container mx-auto max-w-[var(--max-width)] text-center">
            <motion.span
              variants={itemVariants}
              className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-4 block"
            >
              {s4.eyebrow.toUpperCase()}
            </motion.span>
            <motion.h2
              variants={wordContainerVariants}
              className="font-heading font-extrabold text-h2 text-primary leading-tight-none tracking-tighter inline-flex flex-wrap justify-center"
            >
              {tc(s4.headline).split(' ').map((word: string, wi: number) => (
                <span key={wi} className="inline-flex whitespace-nowrap mr-[0.22em]">
                  {word.split('').map((char: string, ci: number) => (
                    <span key={ci} className="inline-flex overflow-hidden pb-1 -mb-1">
                      <motion.span variants={charVariants} className="inline-block">{char}</motion.span>
                    </span>
                  ))}
                </span>
              ))}
            </motion.h2>
            <motion.div
              variants={itemVariants}
              className="font-body text-primary/55 text-body-lg leading-relaxed max-w-xl mx-auto mt-5"
              dangerouslySetInnerHTML={{ __html: s4.body }}
            />
          </div>
        </div>

        {/* â”€â”€ PROCESS DIAGRAM â”€â”€ */}
        <motion.div
          variants={itemVariants}
          className="w-full container mx-auto max-w-[var(--max-width)]"
        >
          {/* Chain label */}
          <p className="font-body font-bold text-eyebrow uppercase tracking-[0.22em] text-primary/45 mb-6 md:mb-8">
            {s4.chain_label}
          </p>

          {/* â”€â”€ Mobile: vertical timeline (< md) â”€â”€ */}
          <div className="flex md:hidden flex-col">
            {steps.map((step, idx) => {
              const isActive  = idx === activeCrystal;
              const isPast    = idx > 0 && idx <= activeCrystal;
              const isCrystal = step.crystalOwned;
              const isLast    = idx === steps.length - 1;
              return (
                <div key={step.id} className="flex items-start gap-4">
                  {/* Node + animated connecting line */}
                  <div className="flex flex-col items-center shrink-0 w-8">
                    <motion.div
                      className="w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0"
                      animate={{
                        borderColor: isActive ? C_ACCENT : isPast ? 'rgba(250,194,18,0.45)' : 'rgba(255,255,255,0.18)',
                        backgroundColor: isActive ? 'rgba(250,194,18,0.13)' : 'transparent',
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      {isCrystal ? (
                        <motion.span
                          className="font-heading font-extrabold text-[10px] tracking-tight"
                          animate={{ color: isActive ? C_ACCENT : isPast ? 'rgba(250,194,18,0.7)' : 'rgba(255,255,255,0.3)' }}
                          transition={{ duration: 0.4 }}
                        >
                          {step.id}
                        </motion.span>
                      ) : (
                        <motion.div
                          className="w-2 h-2 rounded-full"
                          animate={{ backgroundColor: isActive ? C_ACCENT : isPast ? 'rgba(250,194,18,0.5)' : 'rgba(255,255,255,0.25)' }}
                          transition={{ duration: 0.4 }}
                        />
                      )}
                    </motion.div>
                    {!isLast && (
                      <motion.div
                        className="w-[2px] flex-1 rounded-full my-1"
                        style={{ minHeight: '28px' }}
                        animate={{ backgroundColor: isPast ? 'rgba(250,194,18,0.45)' : 'rgba(255,255,255,0.08)' }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`flex-1 pt-1 ${isLast ? '' : 'pb-4'}`}>
                    <div className="flex items-center gap-2.5 mb-1">
                      <motion.span
                        className="flex items-center shrink-0"
                        animate={{ color: isActive ? C_ACCENT : isPast ? 'rgba(250,194,18,0.55)' : 'rgba(255,255,255,0.22)' }}
                        transition={{ duration: 0.4 }}
                      >
                        {step.icon}
                      </motion.span>
                      <motion.p
                        className="font-heading font-extrabold text-[14px] sm:text-[15px] leading-tight tracking-tight"
                        animate={{ color: isActive ? C_PRIMARY : isPast ? 'rgba(255,255,255,0.65)' : isCrystal ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.25)' }}
                        transition={{ duration: 0.4 }}
                      >
                        {step.title}
                      </motion.p>
                    </div>
                    {isCrystal && (
                      <motion.span
                        className="font-body font-bold text-[9px] sm:text-[10px] uppercase tracking-[0.15em] leading-none block pl-[34px]"
                        animate={{ color: isActive ? C_ACCENT : 'rgba(255,255,255,0.18)' }}
                        transition={{ duration: 0.4 }}
                      >
                        â— {step.subtitle ?? s4.crystal_badge}
                      </motion.span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* â”€â”€ Desktop: horizontal track diagram (md+) â”€â”€ */}
          <div className="hidden md:block">
            <div>

              {/* â€” Endpoint labels row (above track) â€” */}
              <div className="flex mb-4">
                {steps.map((step, idx) => (
                  <div key={step.id} className="flex-1 flex justify-center">
                    {!step.crystalOwned && (
                      <span className="font-body font-bold text-body-sm text-primary/45 uppercase tracking-[0.12em] text-center leading-tight max-w-[90px] block">
                        {step.title}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {/* â€” Track row â€” */}
              <div className="relative">
                {/* Background track â€” shifted down by icon height (15px) + gap (6px) = 21px, then centred in 40px circle â†’ +19px */}
                <div
                  className="absolute h-[3px] bg-primary/10 rounded-full"
                  style={{ left: `${(1 / (2 * TOTAL)) * 100}%`, right: `${(1 / (2 * TOTAL)) * 100}%`, top: '46px' }}
                />

                {/* Active fill */}
                <motion.div
                  className="absolute h-[3px] rounded-full bg-accent"
                  style={{
                    left: `${(1 / (2 * TOTAL)) * 100}%`,
                    right: `${(1 / (2 * TOTAL)) * 100}%`,
                    top: '46px',
                    transformOrigin: 'left center',
                  }}
                  animate={{ scaleX: trackFill }}
                  transition={{ duration: 0.8, ease: EASE }}
                />

  
                {/* Node row */}
                <div className="flex relative z-10">
                  {steps.map((step, idx) => {
                    const isActive = idx === activeCrystal;
                    const isPast = idx > 0 && idx <= activeCrystal;
                    const isCrystal = step.crystalOwned;

                    return (
                      <div key={step.id} className="flex-1 flex flex-col items-center gap-1.5">
                        {/* Icon above the circle */}
                        <motion.span
                          className="flex items-center justify-center"
                          animate={{
                            color: isActive ? C_ACCENT : isPast ? 'rgba(250,194,18,0.55)' : 'rgba(255,255,255,0.25)',
                            scale: isActive ? [1, 1.35, 1.15] : 1,
                            filter: isActive
                              ? ['drop-shadow(0 0 0px #FAC212)', 'drop-shadow(0 0 8px #FAC212)', 'drop-shadow(0 0 4px #FAC212)']
                              : 'drop-shadow(0 0 0px transparent)',
                          }}
                          transition={{
                            color: { duration: 0.4 },
                            scale: isActive ? { duration: 0.5, ease: EASE } : { duration: 0.3 },
                            filter: { duration: 0.5 },
                          }}
                        >
                          {step.icon}
                        </motion.span>

                        {/* Circle with number / dot */}
                        <motion.div
                          className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                          animate={{
                            borderColor: isActive
                              ? C_ACCENT
                              : isPast
                              ? 'rgba(250,194,18,0.45)'
                              : 'rgba(255,255,255,0.2)',
                            backgroundColor: isActive
                              ? 'rgba(250,194,18,0.12)'
                              : isCrystal
                              ? 'rgba(255,255,255,0.06)'
                              : 'transparent',
                          }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                        >
                          {isCrystal ? (
                            <span
                              className="font-heading font-extrabold text-[11px] tracking-tight transition-colors duration-500"
                              style={{ color: isActive ? C_ACCENT : isPast ? 'rgba(250,194,18,0.7)' : 'rgba(255,255,255,0.35)' }}
                            >
                              {step.id}
                            </span>
                          ) : (
                            <div
                              className="w-2 h-2 rounded-full transition-colors duration-500"
                              style={{ backgroundColor: isPast ? 'rgba(250,194,18,0.5)' : 'rgba(255,255,255,0.25)' }}
                            />
                          )}
                        </motion.div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* â€” Crystal step cards row (below track) â€” */}
              <div className="flex mt-5 md:mt-7">
                {steps.map((step, idx) => {
                  const isActive = idx === activeCrystal;
                  if (!step.crystalOwned) return <div key={step.id} className="flex-1" />;

                  return (
                    <motion.div
                      key={step.id}
                      className="flex-1 px-1 md:px-1.5"
                      animate={{ opacity: isActive ? 1 : 0.42 }}
                      transition={{ duration: 0.5 }}
                    >
                      <motion.div
                        className="border rounded-sm p-3 md:p-5 relative overflow-hidden h-full"
                        animate={{
                          borderColor: isActive ? 'rgba(250,194,18,0.6)' : 'rgba(255,255,255,0.15)',
                          backgroundColor: isActive ? 'rgba(250,194,18,0.06)' : 'transparent',
                        }}
                        transition={{ duration: 0.5 }}
                      >

                        <motion.span
                          className="block font-body font-bold text-body-sm uppercase tracking-[0.18em] mb-2 md:mb-3 transition-colors duration-500"
                          animate={{ color: isActive ? C_ACCENT : 'rgba(255,255,255,0.35)' }}
                        >
                          â— {s4.crystal_badge}
                        </motion.span>

                        <p
                          className="font-heading font-extrabold text-body-md md:text-h4 leading-tight tracking-tight transition-colors duration-500"
                          style={{ color: isActive ? C_PRIMARY : 'rgba(255,255,255,0.5)' }}
                        >
                          {step.title}
                        </p>

                        {step.subtitle && (
                          <p
                            className="font-body text-body-sm uppercase tracking-[0.12em] mt-2 transition-colors duration-500"
                            style={{ color: isActive ? 'rgba(250,194,18,0.8)' : 'rgba(255,255,255,0.3)' }}
                          >
                            {step.subtitle}
                          </p>
                        )}
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </div>

          {/* Note */}
          <p className="font-body text-body-sm text-primary/28 italic mt-6 md:mt-8">
            {s4.chain_note}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Journey;
