import React from 'react';
import { motion } from 'framer-motion';
import { containerVariants, itemVariants, viewportOnce } from '@components/core/animations';

const certGridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const certCardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};
import homepageData from '@data/homepage.json';
import type { S9Section } from '@types/homepage';

import fssaiLogo    from '../../assets/certification/WhatsApp Image 2025-06-18 at 23.39.17_3d812793.jpg?url';
import mpedaLogo    from '../../assets/certification/WhatsApp Image 2025-06-18 at 23.41.22_26a1f149.jpg?url';
import eicLogo      from '../../assets/certification/WhatsApp Image 2025-06-18 at 23.42.53_c19004eb.jpg?url';
import fsscLogo     from '../../assets/certification/fssc-220005433.logowik.com.webp?url';
import iso22000Logo from '../../assets/certification/images.png?url';
import iso9001Logo  from '../../assets/certification/pngtree-iso-9001-certified-vector-png-image_15374165.png?url';

const s9 = homepageData.homepage.sections.find(s => s.id === 'S9')! as unknown as S9Section;

const logoMap: Record<string, string> = {
  'FSSC 22000':              fsscLogo,
  'ISO 22000':               iso22000Logo,
  'ISO 9001:2015':           iso9001Logo,
  'FSSAI':                   fssaiLogo,
  'MPEDA':                   mpedaLogo,
  'Export Inspection Council': eicLogo,
};

const Certifications: React.FC = () => {
  const certifications: string[] = s9.certifications;

  return (
    <section className="w-full flex flex-col items-center justify-center bg-secondary text-primary overflow-hidden px-6 md:px-12">
      <motion.div
        className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[var(--max-width)]"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={containerVariants}
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
          <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent">
            {s9.label}
          </span>
          <span className="flex-1 h-px bg-primary/10" />
        </motion.div>

        {/* Cert grid — 3 cols mobile, all 6 in one line on desktop */}
        <motion.div
          variants={certGridVariants}
          className="grid grid-cols-3 lg:grid-cols-6 gap-2"
        >
          {certifications.map((name) => {
            const logo = logoMap[name];
            return (
              <motion.div
                key={name}
                variants={certCardVariants}
                className="flex flex-col items-center gap-2 p-2 cursor-default"
              >
                {logo ? (
                  <div className="w-full aspect-[3/2] bg-primary rounded-sm flex items-center justify-center p-1.5 overflow-hidden">
                    <img
                      src={logo}
                      alt={name}
                      width={90}
                      height={60}
                      loading="lazy"
                      decoding="async"
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-[3/2] bg-primary/10 border border-primary/10 rounded-sm flex items-center justify-center p-2">
                    <span className="font-heading font-extrabold text-[9px] uppercase tracking-[0.06em] text-primary/60 text-center leading-tight">
                      {name}
                    </span>
                  </div>
                )}
                <p className="font-heading font-extrabold text-[9px] uppercase tracking-[0.08em] text-primary/70 leading-tight text-center">
                  {name}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Certifications;
