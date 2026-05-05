import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import { containerVariants, itemVariants, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import btsData from '@data/build-bts.json';
import { useCmsData } from '../../hooks/useCmsData';
// @ts-ignore
import qcommBrochureUrl from '@data/brochures/Q-Comm Brochure 2026 (1).pdf?url';
import CharReveal from '@components/core/CharReveal';

const buildVideoRaw = '/videos/build.mp4';
import bentoImg1Raw from '../../assets/pages/build/Warehouse site planning discussion.png';
import bentoImg2Raw from '../../assets/pages/build/Reviewing blueprints at construction site.png';
import bentoImg3Raw from '../../assets/pages/build/ChatGPT Image Apr 10, 2026, 02_17_40 PM.png';
import bentoImg4Raw from '../../assets/pages/build/7a1a6198-cd52-4f2f-a746-8574fd61692c.png';
import projImg1Raw from '../../data/images/build/_DSC4464 (5).jpg';
import projImg2Raw from '../../data/images/build/WhatsApp Image 2026-04-11 at 1.33.44 PM (1).jpeg';
import projImg3Raw from '../../data/images/build/WhatsApp Image 2026-04-11 at 1.33.45 PM.jpeg';

const getSrc = (a: any): string => (typeof a === 'string' ? a : a.src);
const buildVideoSrc = getSrc(buildVideoRaw);
const fallbackBentoImgs = [bentoImg1Raw, bentoImg2Raw, bentoImg3Raw, bentoImg4Raw].map(getSrc);

const PROJECTS = [
  {
    img: getSrc(projImg1Raw),
    title: 'Project Title One',
    desc: 'Brief description of this delivered built-to-suit cold storage facility — location, capacity, and scope.',
  },
  {
    img: getSrc(projImg2Raw),
    title: 'Project Title Two',
    desc: 'Brief description of this delivered built-to-suit cold storage facility — location, capacity, and scope.',
  },
  {
    img: getSrc(projImg3Raw),
    title: 'Project Title Three',
    desc: 'Brief description of this delivered built-to-suit cold storage facility — location, capacity, and scope.',
  },
];

const sLabel = (key: string) => key.replace(/^S\d+\s+/, '');

/* CANONICAL SECTION HEADER COMPONENT */
const SectionHeader = ({ eyebrow, head, desc, align = "left", dark = false }: { eyebrow?: string; head: string; desc?: string; align?: "left" | "center"; dark?: boolean }) => (
  <div className={`flex flex-col mb-6 md:mb-8 shrink-0 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}>
    {eyebrow && <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-1.5 block">{eyebrow}</motion.span>}
    <motion.h2
      variants={itemVariants}
      className={`font-heading font-extrabold text-h2 leading-tight-none tracking-tighter flex flex-col pb-1.5 w-full border-b ${dark ? "text-primary border-primary/10" : "text-secondary border-secondary/10"}`}
    >
      <CharReveal text={head} justify={align === "center" ? "center" : "start"} />
    </motion.h2>
    {desc && (
      <motion.p
        variants={itemVariants}
        className={`font-body text-body-lg leading-relaxed max-w-2xl mt-4 ${dark ? "text-primary/70" : "text-secondary/70"}`}
      >
        {desc}
      </motion.p>
    )}
  </div>
);

/* EXACT HOMEPAGE BENTO CARD STYLE */
const BentoCard = ({ id, title, desc, img, gridStyle, className }: { id: string; title: string; desc: string; img: string; gridStyle?: React.CSSProperties; className?: string }) => (
  <motion.a
    href="/contact-us"
    variants={itemVariants}
    style={gridStyle}
    className={`bg-primary border border-secondary/15 rounded-sm relative group overflow-hidden
      transition-all duration-300 hover:-translate-y-[2px] hover:border-secondary/40 hover:shadow-xl
      flex flex-col cursor-pointer ${className ?? ''}`}
  >
    {/* â”€â”€ WIPE OVERLAY (solid blue, below image) â”€â”€ */}
    <div className="absolute inset-0 bg-secondary translate-y-[calc(100%-2px)]
      transition-transform duration-500 ease-out group-hover:translate-y-0 z-[5] pointer-events-none" />

    {/* â”€â”€ INFO BLOCK (30%) â€” sits above wipe â”€â”€ */}
    <div className="relative z-[30] shrink-0 px-3 pt-3 pb-2 md:px-5 md:pt-5" style={{ flex: '0 0 30%' }}>
      <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-1 block">
        {id}
      </span>
      <h3 className="font-heading font-extrabold text-h3 text-secondary
        tracking-tight leading-tight-none mb-2 transition-colors duration-300 group-hover:text-primary">
        {title}
      </h3>
      <p className="font-body text-body-md text-secondary/60 leading-[1.4] md:leading-[1.5] font-medium group-hover:text-primary/70 transition-colors duration-300 line-clamp-2 md:line-clamp-3">
        {desc}
      </p>
    </div>

    {/* â”€â”€ IMAGE BLOCK (70%) â€” z-[20], sits above the blue wipe â”€â”€ */}
    <div className="relative overflow-hidden z-[20] mt-2 md:mt-3" style={{ flex: '1 1 70%' }}>
      {/* Gradient scrim â€” fades out on hover so image shows through the blue */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent
        z-10 opacity-70 group-hover:opacity-0 transition-opacity duration-500" />
      <img
        src={img}
        alt={title}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover opacity-85
          group-hover:opacity-100 group-hover:scale-[1.05]
          transition-all duration-700 ease-out"
      />
      {/* Link pinned to bottom of image */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 px-3 py-2.5 md:px-4 md:py-3
          flex items-center justify-between
          font-body font-bold text-body-sm uppercase tracking-[0.15em]
          text-primary/80 group-hover:text-primary transition-colors duration-300"
      >
        <span>EXPLORE DELIVERABLE</span>
        <span className="text-secondary bg-accent px-2 py-0.5 rounded-sm font-bold ml-2">â†’</span>
      </div>
    </div>
  </motion.a>
);

const BuildBTS: React.FC = () => {
  const rawData = useCmsData('build-bts', btsData)
  const data = rawData["02 Build: Design, Build & Operate (BTS)"]
  const s2Raw = data["S2 What we deliver"] as Record<string, string>
  const s2Deliverables = Object.entries(s2Raw)
    .filter(([k]) => k !== "HEADLINE" && !k.endsWith(" IMAGE")) as [string, string][]
  const bentoImgs = s2Deliverables.map(([k], i) =>
    (s2Raw[`${k} IMAGE`] || fallbackBentoImgs[i]) as string
  )
  const s5Benefits = Object.entries(data["S5 Why Crystal for BTS"]).filter(([k]) => k !== "CTA") as [string, string][]

  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">
      {/* â”€â”€ HERO PATCH â”€â”€ */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary text-primary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <video
          src={buildVideoSrc}
          className="absolute inset-0 z-0 w-full h-full object-cover scale-105"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="absolute inset-0 z-10 bg-secondary/10" />

        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-30"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
            {data["Hero Page"].EYEBROW}
          </motion.span>
          <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter mb-8 text-primary max-w-5xl">
            <CharReveal text={tc(data["Hero Page"].HEADLINE.split('. ')[0] + '.')} />
            <CharReveal text={tc(data["Hero Page"].HEADLINE.split('. ').slice(1).join('. '))} className="text-accent" />
          </h1>
          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <p className="font-body text-body-lg text-primary/80 leading-[1.6] mb-8 font-medium"
              dangerouslySetInnerHTML={{ __html: data["Hero Page"].SUBHEADLINE }}
            />
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/contact-us">
                {data["Hero Page"].CTA.replace(/\s*Â®$/, '')} <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
              </Button>
              <Button variant="ghost" size="lg" href={qcommBrochureUrl} download="Q-Comm-Brochure-2026.pdf">
                {data["Hero Page"].CTA_BROCHURE} <FiDownload className="text-lg transition-transform group-hover/btn:translate-y-1" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* â”€â”€ S1 INTRO PATCH â”€â”€ */}
      <section className="bg-primary text-secondary flex items-center justify-center py-20 px-6 md:px-12 border-t border-secondary/10">
        <motion.div
          className="container mx-auto max-w-4xl flex flex-col items-center text-center"
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={containerVariants}
        >
          <SectionHeader
            head={tc(data["S1 What is BTS?"].HEADLINE)}
            align="center"
          />
          <motion.p variants={itemVariants} className="font-body text-body-lg max-w-3xl text-secondary/70 leading-[1.6] font-medium"
            dangerouslySetInnerHTML={{ __html: data["S1 What is BTS?"].BODY }}
          />
        </motion.div>
      </section>

      {/* â”€â”€ S2 DELIVERABLES BENTO GRID PATCH â”€â”€ */}
      <section className="bg-primary flex flex-col py-20 px-4 md:px-8">
        <div className="container mx-auto px-2 md:px-6 lg:px-10 max-w-[var(--max-width)] flex flex-col h-full">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}>
            <SectionHeader
              head={tc(data["S2 What we deliver"].HEADLINE)}
            />
          </motion.div>

          {/* Mobile: simple 2Ã—2 card grid */}
          <div className="block md:hidden">
            <div className="grid grid-cols-2 gap-3">
              {s2Deliverables.map(([title, desc], i) => (
                <div key={i} className="h-[220px] sm:h-[260px]">
                  <BentoCard id={`0${i + 1}`} title={title} desc={desc} img={bentoImgs[i]} className="h-full" />
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: bento layout */}
          <div
            className="hidden md:grid gap-4 md:gap-6 flex-1 w-full min-h-[400px] md:min-h-[500px]"
            style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 1fr)' }}
          >
             <BentoCard id="01" title={s2Deliverables[0][0]} desc={s2Deliverables[0][1]} img={bentoImgs[0]} gridStyle={{ gridColumn: '1 / 3', gridRow: '1 / 3' }} />
             <BentoCard id="02" title={s2Deliverables[1][0]} desc={s2Deliverables[1][1]} img={bentoImgs[1]} gridStyle={{ gridColumn: '3 / 4', gridRow: '1 / 2' }} />
             <BentoCard id="03" title={s2Deliverables[2][0]} desc={s2Deliverables[2][1]} img={bentoImgs[2]} gridStyle={{ gridColumn: '4 / 5', gridRow: '1 / 2' }} />
             <BentoCard id="04" title={s2Deliverables[3][0]} desc={s2Deliverables[3][1]} img={bentoImgs[3]} gridStyle={{ gridColumn: '3 / 5', gridRow: '2 / 3' }} />
          </div>
        </div>
      </section>

      {/* â”€â”€ S3 WHO THIS IS FOR PATCH â”€â”€ */}
      <section className="bg-primary text-secondary flex items-center justify-center py-20 px-6 md:px-12 border-t border-secondary/10">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] flex flex-col md:flex-row gap-8 md:gap-12 items-center justify-center"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
        >
          <div className="w-full md:w-5/12">
             <SectionHeader
               head={tc(data["S3 Who this is for"].HEADLINE)}
             />
          </div>
          <div className="w-full md:w-7/12 border-l-[3px] border-accent pl-8 md:pl-12">
            <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/80 leading-[1.6] font-medium tracking-tight"
              dangerouslySetInnerHTML={{ __html: data["S3 Who this is for"].BODY }}
            />
          </div>
        </motion.div>
      </section>

      {/* ── S4 PROJECTS ── */}
      <section className="bg-secondary text-primary flex items-center justify-center relative overflow-hidden py-24 px-6 md:px-12">
        <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: "linear-gradient(to right, #ffffff1a 1px, transparent 1px), linear-gradient(to bottom, #ffffff1a 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-20 flex flex-col"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
        >
          <SectionHeader dark eyebrow="Our Work" head="Delivered Projects" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {PROJECTS.map((project, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex flex-col overflow-hidden rounded-sm border border-primary/10 group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex flex-col gap-2 p-5 border-t border-primary/10">
                  <h3 className="font-heading font-extrabold text-h4 tracking-tight text-primary leading-tight-none">
                    {project.title}
                  </h3>
                  <p className="font-body text-body-md text-primary/60 leading-relaxed">
                    {project.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      {/* â”€â”€ S5 WHY CRYSTAL PATCH â”€â”€ */}
      <section className="bg-primary text-secondary flex flex-col justify-center py-20 px-6 md:px-12 border-t border-secondary/10">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] flex flex-col"
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants}
        >
          <SectionHeader
            head={tc(sLabel("S5 Why Crystal for BTS"))}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 mt-4">
            {s5Benefits.map(([title, desc], idx) => (
              <motion.div key={idx} variants={itemVariants} className="flex flex-col border-t-[3px] border-secondary/10 pt-6 group transition-colors hover:border-accent">
                <h3 className="font-heading font-extrabold text-h3 tracking-tight text-secondary mb-3 leading-tight-none">{title}</h3>
                <div className="font-body text-body-md text-secondary/60 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: desc }} />
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="flex">
            <Button variant="primary" size="lg" href="/contact-us">
              {data["S5 Why Crystal for BTS"].CTA.replace(/\s*Â®$/, '')} <FiArrowRight className="text-lg transition-transform group-hover/final:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default BuildBTS;
