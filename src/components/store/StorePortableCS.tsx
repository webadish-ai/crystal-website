import React from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiTruck, FiWind, FiLayers, FiThermometer, FiActivity, FiShield,
  FiZap, FiGlobe, FiRefreshCw, FiTool,
} from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import portableData from '@data/store-portablecs-all.json';
import { useCmsData } from '../../hooks/useCmsData';
import CharReveal from '@components/core/CharReveal';
import heroImgRaw from '../../data/images/store/portablecolds/Crystal Superstore Strategic Temperature-Controlled Infrastructure A Specialized Proposal for Hind Terminal ICD & CFS Operations (36).png';
const heroImg = typeof heroImgRaw === 'string' ? heroImgRaw : (heroImgRaw as any).src;

import reeferHeroRaw     from '../../data/images/store/reefer/reefer-hero.png';
import blastHeroRaw      from '../../data/images/store/Blast-Freezer/Blast-freezer-hero.png';
import superstoreHeroRaw from '../../data/images/store/superstore/superstore-hero.png';
import superfreezerHeroRaw from '../../data/images/store/superfreezer/superfreezer-hero.png';
import isoHeroRaw        from '../../data/images/store/iso/ISO-Tank-hero.png';

const reeferHero      = typeof reeferHeroRaw      === 'string' ? reeferHeroRaw      : (reeferHeroRaw      as any).src;
const blastHero       = typeof blastHeroRaw       === 'string' ? blastHeroRaw       : (blastHeroRaw       as any).src;
const superstoreHero  = typeof superstoreHeroRaw  === 'string' ? superstoreHeroRaw  : (superstoreHeroRaw  as any).src;
const superfreezerHero= typeof superfreezerHeroRaw=== 'string' ? superfreezerHeroRaw: (superfreezerHeroRaw as any).src;
const isoHero         = typeof isoHeroRaw         === 'string' ? isoHeroRaw         : (isoHeroRaw         as any).src;

const isDataKey = (k: string) => k !== k.toUpperCase();
const sLabel    = (key: string) => key.replace(/^S\d+\s+/, '');

/* Product range cards */
const products = [
  {
    id: '06a', name: 'Reefer Containers', href: '/reefer-containers',
    tags: ['+25Â°C to âˆ’30Â°C', '10ft Â· 20ft Â· 40ft'],
    icon: <FiTruck />,
    img: reeferHero,
    gridStyle: { gridColumn: '1 / 3', gridRow: '1 / 2' },
  },
  {
    id: '06b', name: 'Blast Freezer Containers', href: '/blast-freezer',
    tags: ['Down to âˆ’40Â°C', '20ft Â· 40ft'],
    icon: <FiWind />,
    img: blastHero,
    gridStyle: { gridColumn: '3 / 4', gridRow: '1 / 2' },
  },
  {
    id: '06c', name: 'Super Store', href: '/super-store-reefer',
    tags: ['âˆ’30Â°C to +25Â°C', 'Modular'],
    icon: <FiLayers />,
    img: superstoreHero,
    gridStyle: { gridColumn: '4 / 5', gridRow: '1 / 2' },
  },
  {
    id: '06d', name: 'Super Freezer', href: '/super-freezer',
    tags: ['Down to âˆ’70Â°C', '20ft Â· 40ft'],
    icon: <FiThermometer />,
    img: superfreezerHero,
    gridStyle: { gridColumn: '1 / 2', gridRow: '2 / 3' },
  },
  {
    id: '06e', name: 'ISO Tanks', href: '/iso-tank-container',
    tags: ['Ambient to controlled', '20ft'],
    icon: <FiActivity />,
    img: isoHero,
    gridStyle: { gridColumn: '2 / 3', gridRow: '2 / 3' },
  },
  {
    id: '06f', name: 'AMC & Spare Parts', href: '/amc-spareparts',
    tags: ['All ranges', 'Pan-India'],
    icon: <FiShield />,
    img: 'https://images.unsplash.com/photo-1581094288338-2314dddb79a7?q=80&w=2070&auto=format&fit=crop',
    gridStyle: { gridColumn: '3 / 5', gridRow: '2 / 3' },
  },
];

const featureIcons: React.ReactNode[] = [<FiZap />, <FiGlobe />, <FiRefreshCw />, <FiTool />];

const SectionHeader = ({ eyebrow, head, desc, align = 'left', dark = false }: {
  eyebrow?: string; head: string; desc?: string; align?: 'left' | 'center'; dark?: boolean;
}) => (
  <div className={`flex flex-col mb-8 shrink-0 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
    {eyebrow && (
      <motion.span variants={itemVariants}
        className={`font-body font-bold text-eyebrow uppercase tracking-[0.15em] mb-1.5 block ${dark ? 'text-accent' : 'text-secondary'}`}>
        {eyebrow}
      </motion.span>
    )}
    <motion.h2 variants={itemVariants}
      className={`font-heading font-extrabold text-h2 leading-tight-none tracking-tighter flex flex-col pb-1.5 w-full border-b ${dark ? 'text-primary border-primary/10' : 'text-secondary border-secondary/10'}`}>
      <CharReveal text={head} justify={align === 'center' ? 'center' : 'start'} />
    </motion.h2>
    {desc && (
      <motion.p variants={itemVariants}
        className={`font-body text-body-lg leading-relaxed max-w-2xl mt-4 ${dark ? 'text-primary/60' : 'text-secondary/60'}`}>
        {desc}
      </motion.p>
    )}
  </div>
);

const StorePortableCS: React.FC = () => {
  const rawData = useCmsData('store-portablecs-all', portableData)
  const data = rawData["06 Store: Portable Cold Storage Containers"]
  const heroCtas = data["Hero Page"].CTAS.split(' | ').map((s: string) => s.replace(/\s*[®¯]$/, '').trim())
  const s2Features = Object.entries(data["S2 Container features"]).filter(([k]) => isDataKey(k)) as [string, string][]

  return (
    <div className="w-full bg-primary overflow-x-clip font-body">

      {/* â”€â”€ HERO â”€â”€ */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary text-primary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <img
          src={heroImg}
          alt="Portable Cold Storage Containers"
          loading="eager" decoding="async"
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(15,40,84,0.9)_0%,rgba(15,40,84,0.7)_30%,rgba(15,40,84,0.35)_55%,transparent_78%)]" />
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-30"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.span variants={itemVariants}
            className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
            {data["Hero Page"].EYEBROW}
          </motion.span>
          <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter mb-8 text-primary max-w-5xl">
            <CharReveal text={tc(data["Hero Page"].HEADLINE.split('. ').slice(0, 2).join('. ') + '.')} />
            <CharReveal text={tc(data["Hero Page"].HEADLINE.split('. ').slice(2).join('. '))} className="text-accent" />
          </h1>
          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <p className="font-body text-body-lg text-primary/80 leading-[1.6] mb-8 font-medium"
              dangerouslySetInnerHTML={{ __html: data["Hero Page"].SUBHEADLINE }}
            />
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/contact-us">
                {heroCtas[0]} <FiArrowRight className="text-lg" />
              </Button>
              <Button variant="ghost" size="lg" href="/contact-us">
                {heroCtas[1]} <FiArrowRight className="text-lg" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* â”€â”€ S1 PRODUCT RANGE â”€â”€ */}
      <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <SectionHeader
              eyebrow={sLabel('S1 Product range')}
              head={tc(data["S1 Product range"].HEADLINE)}
              desc="Rent or buy. Delivered to your site anywhere in India."
            />
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
            className="grid gap-4 md:gap-6 w-full min-h-[500px] md:min-h-[620px]"
            style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 1fr)' }}
          >
            {products.map((p) => (
              <motion.a
                key={p.id}
                href={p.href}
                variants={itemVariants}
                style={p.gridStyle}
                className="bg-primary border border-secondary/15 rounded-sm relative group overflow-hidden transition-all duration-300 hover:-translate-y-[2px] hover:border-secondary/40 hover:shadow-xl flex flex-col cursor-pointer no-underline"
              >
                {/* Wipe overlay */}
                <div className="absolute inset-0 bg-secondary translate-y-[calc(100%-2px)] transition-transform duration-500 ease-out group-hover:translate-y-0 z-[5] pointer-events-none" />
                {/* Info block */}
                <div className="relative z-[30] shrink-0 px-3 pt-3 pb-2 md:px-4 md:pt-4" style={{ flex: '0 0 30%' }}>
                  <span className="font-heading font-extrabold text-[10px] text-accent mb-1 block">{p.id}</span>
                  <h3 className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight-none mb-2 transition-colors duration-300 group-hover:text-primary">
                    {p.name}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {p.tags.map((tag, i) => (
                      <span key={i}
                        className="font-body font-bold text-body-sm uppercase tracking-[0.08em] text-secondary/55 bg-secondary/5 border border-secondary/10 px-1.5 py-[3px] rounded-sm transition-colors duration-300 group-hover:bg-primary/10 group-hover:border-primary/20 group-hover:text-primary">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Image block */}
                <div className="relative overflow-hidden z-[20]" style={{ flex: '1 1 70%' }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-0 transition-opacity duration-500" />
                  <img src={p.img} alt={p.name} loading="lazy" decoding="async"
                    className="absolute inset-0 w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.05] transition-all duration-700 ease-out" />
                  <div className="absolute bottom-0 left-0 right-0 z-20 px-4 py-3 flex items-center justify-between font-body font-bold text-body-sm uppercase tracking-[0.15em] text-primary/80 group-hover:text-primary transition-colors duration-300">
                    <span>Explore</span>
                    <span className="text-accent text-base transition-transform group-hover:translate-x-1">â†’</span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ S2 CONTAINER FEATURES â”€â”€ */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <SectionHeader dark eyebrow="Why Crystal containers" head={tc(sLabel('S2 Container features'))}
              desc="Every container in Crystal's fleet shares the same commitment to reliability and ease of use." />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-primary/5 mt-2">
              {s2Features.map(([title, desc], i) => (
                <motion.div key={title} variants={itemVariants}
                  className="group bg-secondary flex flex-col gap-4 p-6 md:p-8 border border-primary/10 hover:bg-primary/[0.03] transition-colors duration-300">
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/[0.06] group-hover:bg-accent/20 text-accent rounded-sm transition-colors duration-300">
                    <span className="text-xl">{featureIcons[i] ?? <FiZap />}</span>
                  </div>
                  <h3 className="font-heading font-extrabold text-h4 text-primary tracking-tight leading-tight">{title}</h3>
                  <div className="font-body text-body-md text-primary/55 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: desc }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ FINAL CTA â”€â”€ */}
      <section className="bg-primary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <div className="border border-secondary/10 rounded-sm p-6 sm:p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
              <div className="max-w-xl">
                <motion.span variants={itemVariants}
                  className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary mb-2 block">
                  Cold storage at your location
                </motion.span>
                <motion.h2 variants={itemVariants}
                  className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter">
                  Tell us what you need and where.
                </motion.h2>
                <motion.p variants={itemVariants}
                  className="font-body text-body-lg text-secondary/55 leading-relaxed mt-4 font-medium">
                  Rent or buy. Short-term or long-term. Pan-India delivery and installation.
                </motion.p>
              </div>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Button variant="primary" size="lg" href="/contact-us">
                  Get in touch <FiArrowRight className="ml-2 text-lg" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default StorePortableCS;
