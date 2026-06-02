import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight, FiDownload } from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';

interface OutcomeRow { kpi: string; value: string; }
interface Testimonial { quote: string; author: string; company: string; }

interface CaseStudyItem {
  tag: string;
  title: string;
  client: string;
  location: string;
  product: string;
  challenge: string[];
  solution: string[];
  results: string[];
  outcomes: OutcomeRow[];
  testimonial?: Testimonial;
  pdf?: string | null;
}

interface Props {
  item: CaseStudyItem;
  idx: number;
  heroImage?: string;
  pdfUrl?: string;
}

const SectionLabel = ({ top, bottom, light = false }: { top: string; bottom?: string; light?: boolean }) => (
  <div className="flex flex-col gap-1.5">
    <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent">{top}</span>
    {bottom && (
      <span className={`font-heading font-extrabold text-h4 tracking-tight leading-tight ${light ? 'text-primary/60' : 'text-secondary/60'}`}>
        {bottom}
      </span>
    )}
  </div>
);

const BulletList = ({ items, light = false }: { items: string[]; light?: boolean }) => (
  <ul className="flex flex-col gap-3">
    {items.map((item, i) => (
      <motion.li key={i} variants={itemVariants} className="flex items-start gap-3">
        <span className="mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 bg-accent" />
        <span className={`font-body text-body-md leading-relaxed font-medium ${light ? 'text-primary/70' : 'text-secondary/65'}`}>
          {item}
        </span>
      </motion.li>
    ))}
  </ul>
);

const CaseStudyPage: React.FC<Props> = ({ item, idx, heroImage, pdfUrl }) => {
  const tags = item.tag.split(/(?:·|·|·)/).map(s => s.trim()).filter(Boolean);

  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">

      {/* ── HERO ── */}
      <section className="relative flex flex-col overflow-hidden" style={{ height: '55vh', minHeight: '400px' }}>
        {heroImage && (
          <img
            src={heroImage}
            alt={item.title}
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        )}
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-secondary">
          <div className="container mx-auto max-w-[var(--max-width)] px-6 md:px-14 py-3.5 flex items-center justify-between gap-6 flex-wrap">
            <div className="flex items-center gap-5 flex-wrap">
              <motion.a
                href="/case-studies"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="inline-flex items-center gap-2 font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-primary/35 hover:text-accent transition-colors group shrink-0"
              >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Case Studies
              </motion.a>
              <span className="w-px h-4 bg-primary/12 shrink-0" />
              <motion.div className="flex gap-2 flex-wrap" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                {tags.map((t, i) => (
                  <span key={i} className={`font-body font-bold text-eyebrow uppercase tracking-[0.15em] px-3 py-1 border ${i === 0 ? 'text-accent border-accent/40' : 'text-primary/35 border-primary/12'}`}>
                    {t}
                  </span>
                ))}
              </motion.div>
            </div>
            {pdfUrl && (
              <motion.a
                href={pdfUrl}
                download
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="inline-flex items-center gap-2.5 font-body font-bold text-eyebrow uppercase tracking-[0.15em] px-4 py-2 border border-accent/40 text-accent hover:bg-accent hover:text-secondary transition-all duration-200 shrink-0 group"
              >
                <FiDownload className="group-hover:translate-y-0.5 transition-transform" />
                Download PDF
              </motion.a>
            )}
          </div>
        </div>
      </section>

      {/* ── TITLE + META ── */}
      <section className="bg-primary border-b border-secondary/8 pt-10 md:pt-14 px-6 md:px-14">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)]"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          {/* Number + Title row */}
          <div className="flex items-start gap-6 md:gap-10 pb-8 border-b border-secondary/8">
            <motion.div variants={itemVariants} className="shrink-0 pt-1 hidden md:flex flex-col gap-1">
              <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent">Case Study</span>
              <span className="font-heading font-extrabold text-[2.2rem] text-secondary/8 tracking-tight leading-none select-none">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </motion.div>
            <motion.h1
              variants={itemVariants}
              className="font-heading font-extrabold text-secondary leading-[0.95] tracking-tighter flex-1"
              style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4rem)' }}
            >
              {tc(item.title)}
            </motion.h1>
          </div>

          {/* Meta strip */}
          <div className="grid grid-cols-3 divide-x divide-secondary/8">
            {[
              { label: 'Client', value: item.client },
              { label: 'Location', value: item.location },
              { label: 'Product', value: item.product },
            ].map(({ label, value }) => (
              <div key={label} className="flex flex-col gap-1 py-5 px-4 md:px-6 first:pl-0 last:pr-0">
                <span className="font-body font-bold text-[9px] uppercase tracking-[0.2em] text-secondary/30">{label}</span>
                <span className="font-heading font-extrabold text-body-md md:text-h4 text-secondary tracking-tight leading-tight">{value}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CHALLENGE | SOLUTION — side by side ── */}
      <section className="border-b border-secondary/8">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] grid grid-cols-1 md:grid-cols-2"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          {/* Challenge — white */}
          <div className="bg-primary px-6 md:px-10 lg:px-14 py-10 md:py-14 md:border-r border-secondary/8">
            <motion.div variants={itemVariants} className="mb-5">
              <SectionLabel top="The Brief" bottom="Challenge" />
            </motion.div>
            <BulletList items={item.challenge} />
          </div>

          {/* Solution — navy */}
          <div className="bg-secondary px-6 md:px-10 lg:px-14 py-10 md:py-14 border-t md:border-t-0 border-secondary/8">
            <motion.div variants={itemVariants} className="mb-5">
              <SectionLabel top="Our Approach" bottom="Solution" light />
            </motion.div>
            <BulletList items={item.solution} light />
          </div>
        </motion.div>
      </section>

      {/* ── RESULTS + KPI — combined ── */}
      <section className="bg-primary py-10 md:py-14 px-6 md:px-14 border-b border-secondary/8">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 md:gap-14 items-start"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="md:pt-1">
            <SectionLabel top="Results" bottom="Difference" />
          </motion.div>

          <div className="flex flex-col gap-8">
            <BulletList items={item.results} />

            {/* KPI cards inline */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-6 border-t border-secondary/8">
              {item.outcomes.map((row, i) => (
                <div key={i} className="flex flex-col gap-1 px-4 py-3.5 bg-secondary/[0.04] border border-secondary/8">
                  <span className="font-heading font-extrabold text-[10px] uppercase tracking-[0.1em] text-accent leading-none">{row.kpi}</span>
                  <span className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight">{row.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── TESTIMONIAL ── */}
      {item.testimonial && (
        <section className="bg-secondary py-10 md:py-14 px-6 md:px-14 border-b border-primary/10">
          <motion.div
            className="container mx-auto max-w-[var(--max-width)] grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 md:gap-14 items-start"
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
          >
            <motion.div variants={itemVariants}><SectionLabel top="Client Voice" bottom="Testimonial" light /></motion.div>
            <motion.div variants={itemVariants} className="border-l-[3px] border-accent pl-7">
              <blockquote
                className="font-heading font-extrabold text-primary leading-[1.3] tracking-tight"
                style={{ fontSize: 'clamp(1.1rem, 2.2vw, 1.65rem)' }}
              >
                "{item.testimonial.quote}"
              </blockquote>
              <div className="mt-5 flex flex-col gap-0.5">
                <span className="font-body font-bold text-body-sm text-primary/60 uppercase tracking-[0.12em]">{item.testimonial.author}</span>
                <span className="font-body text-body-sm text-primary/35">{item.testimonial.company}</span>
              </div>
            </motion.div>
          </motion.div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-primary py-10 md:py-14 px-6 md:px-14">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] flex flex-col md:flex-row items-start md:items-center justify-between gap-8"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <div className="flex flex-col gap-1">
            <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent">Work With Us</motion.span>
            <motion.h2
              variants={itemVariants}
              className="font-heading font-extrabold text-secondary leading-tight tracking-tighter"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 3rem)' }}
            >
              Have a similar challenge?
            </motion.h2>
          </div>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 shrink-0">
            <Button variant="primary" size="lg" href="/contact-us">
              Talk to our team <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
            </Button>
            <Button variant="ghost" size="lg" href="/case-studies">
              All cases
            </Button>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
};

export default CaseStudyPage;
