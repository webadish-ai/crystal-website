import React from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiThermometer, FiZap, FiClock,
  FiMapPin, FiTruck, FiDroplet, FiSun, FiPackage,
  FiLayers, FiBox, FiCheckCircle, FiShield
} from 'react-icons/fi';
import bfsData from '../../data/process-bfs.json';
import { useCmsData } from '../../hooks/useCmsData';
import Button from '@components/core/Button';
import heroImgRaw from '../../data/images/process/Gemini_Generated_Image_v9hfr5v9hfr5v9hf.png';
const heroImg = typeof heroImgRaw === 'string' ? heroImgRaw : (heroImgRaw as any).src;
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import CharReveal from '@components/core/CharReveal';


/* â”€â”€ SECTION HEADER â”€â”€ */
const SectionHeader = ({ eyebrow, head, desc, align = 'left', dark = false }: {
  eyebrow?: string; head: string; desc?: string; align?: 'left' | 'center'; dark?: boolean;
}) => (
  <div className={`flex flex-col mb-6 md:mb-10 shrink-0 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
    {eyebrow && (
      <motion.span variants={itemVariants} className={`font-body font-bold text-eyebrow uppercase tracking-[0.15em] mb-1.5 block ${dark ? 'text-accent' : 'text-secondary'}`}>
        {eyebrow}
      </motion.span>
    )}
    <motion.h2 variants={itemVariants} className={`font-heading font-extrabold text-h2 leading-tight-none tracking-tighter flex flex-col pb-1.5 w-full border-b ${dark ? 'text-primary border-primary/10' : 'text-secondary border-secondary/10'}`}>
      <CharReveal text={head} justify={align === 'center' ? 'center' : 'start'} />
    </motion.h2>
    {desc && (
      <motion.p variants={itemVariants} className={`font-body text-body-lg leading-relaxed max-w-2xl mt-4 ${dark ? 'text-primary/70' : 'text-secondary/70'}`}>
        {desc}
      </motion.p>
    )}
  </div>
);

/* â”€â”€ PRODUCT ICONS â”€â”€ */
const productMeta: Record<string, { icon: React.ReactNode; accent?: boolean }> = {
  'Seafood':               { icon: <FiDroplet />,     accent: true  },
  'Meat & poultry':        { icon: <FiPackage />,     accent: false },
  'Ready meals':           { icon: <FiClock />,       accent: false },
  'Dairy products':        { icon: <FiDroplet />,     accent: false },
  'Fruits & vegetables':   { icon: <FiSun />,         accent: false },
  'Bakery products':       { icon: <FiLayers />,      accent: false },
  'Processed foods':       { icon: <FiBox />,         accent: false },
};

/* â”€â”€ OFFERING DATA â”€â”€ */
const offeringMeta = [
  {
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop',
    icon: <FiMapPin />,
    specs: [
      { label: 'Capacity',      value: '10 MT/day'         },
      { label: 'Certification', value: 'FSSC 22000'        },
      { label: 'Locations',     value: 'Kolkata & Bhubaneswar' },
    ],
  },
  {
    img: 'https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=1200&auto=format&fit=crop',
    icon: <FiTruck />,
    specs: [
      { label: 'Temperature',  value: 'Down to âˆ’40Â°C' },
      { label: 'Deployment',   value: 'Days, not months' },
      { label: 'Setup',        value: 'Plug-and-play'  },
    ],
  },
];

const ProcessBFSPage: React.FC = () => {
  const rawData = useCmsData('process-bfs', bfsData)
  const { hero, offerings, products } = rawData.page.sections.reduce(
    (acc: any, s: any) => { acc[s.type] = s; return acc; }, {}
  )
  const productList: string[] = (products.body as string).split(' · ').map((s: string) => s.trim())

  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">

      {/* â”€â”€ HERO â”€â”€ */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary text-primary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <img src={heroImg} alt="Blast freezing services" loading="eager" decoding="async"
          className="absolute inset-0 z-0 w-full h-full object-cover" />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(15,40,84,0.9)_0%,rgba(15,40,84,0.7)_30%,rgba(15,40,84,0.35)_55%,transparent_78%)]" />
        <motion.div className="container mx-auto max-w-[var(--max-width)] relative z-30" initial="hidden" animate="visible" variants={containerVariants}>
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
            {hero.eyebrow}
          </motion.span>
          <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter mb-8 text-primary max-w-5xl">
            <CharReveal text={tc('Fast. Deep.')} />
            <CharReveal text={tc('Uncompromising.')} className="text-accent" />
          </h1>
          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <p className="font-body text-body-lg text-primary/80 leading-[1.6] mb-8 font-medium">
              {hero.subheadline}
            </p>
            <Button variant="primary" size="lg" href="/contact">
              {products.cta.label} <FiArrowRight className="ml-2 text-lg transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* â”€â”€ WHY BLAST FREEZING â”€â”€ */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>

            {/* Pull quote */}
            <motion.p variants={itemVariants} className="font-heading font-extrabold text-h2 md:text-[2.6rem] text-primary leading-tight tracking-tighter max-w-4xl mb-14">
              "Blast freezing is the fastest way to lock in product quality â€” preserving{' '}
              <span className="text-accent">texture, nutrition, and shelf life</span>{' '}
              in a way slow freezing simply cannot."
            </motion.p>

            {/* 3 key stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: <FiZap />,         stat: 'Down to âˆ’40Â°C',    label: 'Freezing depth'    },
                { icon: <FiClock />,        stat: 'Hours',            label: 'Pull-down time'    },
                { icon: <FiCheckCircle />,  stat: 'FSSC 22000',       label: 'Compliance standard'},
              ].map(({ icon, stat, label }) => (
                <motion.div key={label} variants={itemVariants}
                  className="flex items-center gap-5 border border-primary/10 rounded-sm px-6 py-5 bg-primary/[0.04] hover:bg-primary/[0.08] transition-colors duration-300">
                  <div className="text-accent text-2xl shrink-0">{icon}</div>
                  <div>
                    <p className="font-heading font-extrabold text-h3 text-primary leading-tight tracking-tight">{stat}</p>
                    <p className="font-body text-body-sm text-primary/50 uppercase tracking-[0.12em] font-bold">{label}</p>
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </section>

      {/* â”€â”€ TWO OFFERINGS â”€â”€ */}
      <section className="bg-primary py-20 px-6 md:px-12 border-y border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <SectionHeader eyebrow="How we deliver" head={tc('Two ways to blast freeze')} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {offerings.items.map((item: any, idx: number) => {
                const meta = offeringMeta[idx];
                return (
                  <motion.div key={idx} variants={itemVariants}
                    className="border border-secondary/15 rounded-sm overflow-hidden flex flex-col group hover:-translate-y-[2px] hover:border-secondary/35 hover:shadow-xl transition-all duration-300">

                    {/* Image */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden bg-secondary/5">
                      <img src={meta.img} alt={item.title} loading="lazy" decoding="async"
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out" />
                      {/* Icon badge */}
                      <div className="absolute top-4 left-4 w-10 h-10 bg-secondary rounded-sm flex items-center justify-center text-accent text-lg">
                        {meta.icon}
                      </div>
                      {/* Number */}
                      <div className="absolute top-4 right-4 bg-accent/90 text-secondary px-2.5 py-1 rounded-sm">
                        <span className="font-heading font-extrabold text-[11px] tracking-widest">0{idx + 1}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex flex-col flex-1 p-6 md:p-8 gap-5 bg-primary">
                      <div>
                        <h3 className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight mb-3">{item.title}</h3>
                        <div className="font-body text-body-md text-secondary/65 leading-relaxed" dangerouslySetInnerHTML={{ __html: item.description }} />
                      </div>

                      {/* Specs strip */}
                      <div className="flex flex-col border border-secondary/10 rounded-sm overflow-hidden mt-auto">
                        {meta.specs.map(({ label, value }) => (
                          <div key={label} className="flex items-center justify-between px-4 py-2.5 border-b border-secondary/8 last:border-0 even:bg-secondary/[0.02]">
                            <span className="font-body text-body-sm text-secondary/50 font-medium">{label}</span>
                            <span className="font-heading font-extrabold text-body-sm text-secondary tracking-tight">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ PRODUCTS WE BLAST FREEZE â”€â”€ */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <SectionHeader dark eyebrow="What we freeze" head={tc('Products')} />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {productList.map((name, i) => {
                const meta = productMeta[name] || { icon: <FiBox />, accent: false };
                return (
                  <motion.div key={name} variants={itemVariants} transition={{ delay: i * 0.05 }}
                    className={`group flex flex-col items-start gap-3 p-4 md:p-5 rounded-sm border transition-all duration-300 cursor-default hover:-translate-y-[2px]
                      ${meta.accent
                        ? 'border-accent/30 bg-accent/[0.06] hover:bg-accent/10 hover:border-accent/50'
                        : 'border-primary/10 bg-primary/[0.04] hover:bg-primary/[0.08] hover:border-primary/20'
                      }`}>
                    <div className={`text-xl transition-colors duration-300 ${meta.accent ? 'text-accent' : 'text-primary/50 group-hover:text-primary/80'}`}>
                      {meta.icon}
                    </div>
                    <p className={`font-heading font-extrabold text-body-sm tracking-tight leading-tight transition-colors duration-300 ${meta.accent ? 'text-accent' : 'text-primary/70 group-hover:text-primary'}`}>
                      {name}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ CLOSING CTA â”€â”€ */}
      <section className="bg-primary py-20 px-6 md:px-12 border-t border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
            className="flex flex-col md:flex-row md:items-center justify-between gap-10">
            <div className="max-w-2xl">
              <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary/60 mb-3 block">
                Ready to start
              </motion.span>
              <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter mb-4">
                {tc(products.cta_headline)}
              </motion.h2>
              <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/65 leading-relaxed">
                {products.cta_body}
              </motion.p>
            </div>
            <motion.div variants={itemVariants} className="shrink-0">
              <Button variant="primary" size="lg" href="/contact">
                {products.cta.label} <FiArrowRight className="ml-2 text-lg transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ProcessBFSPage;
