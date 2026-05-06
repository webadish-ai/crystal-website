import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';

interface CaseStudyItem {
  tag: string;
  title: string;
  challenge: string;
  solution: string;
  outcomes: string;
}

interface Props {
  item: CaseStudyItem;
  idx: number;
  heroImage?: string;
}

function splitOutcomes(str: string): string[] {
  return str.split(/\s*(?:Â·|·|·)\s*/).map(s => s.trim()).filter(Boolean);
}

const CaseStudyPage: React.FC<Props> = ({ item, idx, heroImage }) => {
  const outcomes = splitOutcomes(item.outcomes);
  const tags = item.tag.split(/(?:Â·|·|·)/).map(s => s.trim()).filter(Boolean);

  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">

      {/* ── HERO — full-bleed image ── */}
      <section className="relative h-[62vh] min-h-[480px] bg-secondary flex flex-col overflow-hidden">
        {/* Hero image */}
        {heroImage && (
          <img
            src={heroImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
          />
        )}
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 z-10 bg-secondary/60" />
        {/* Large watermark number */}
        <span
          className="absolute bottom-0 right-6 md:right-14 font-heading font-extrabold leading-none select-none pointer-events-none"
          style={{
            fontSize: 'clamp(160px, 24vw, 320px)',
            WebkitTextStroke: '1px rgba(255,255,255,0.06)',
            color: 'transparent',
            lineHeight: 0.85,
          }}
        >
          {String(idx + 1).padStart(2, '0')}
        </span>

        {/* Back link — top left */}
        <div className="relative z-20 px-6 md:px-14 pt-28 flex-shrink-0">
          <motion.a
            href="/case-studies"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.45 }}
            className="inline-flex items-center gap-2 font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-primary/30 hover:text-accent transition-colors group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            All Case Studies
          </motion.a>
        </div>

        {/* Tags — bottom left */}
        <motion.div
          className="relative z-20 mt-auto px-6 md:px-14 pb-10 flex gap-3"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          {tags.map((t, i) => (
            <span
              key={i}
              className={`font-body font-bold text-eyebrow uppercase tracking-[0.15em] px-3 py-1 rounded-sm border ${
                i === 0 ? 'text-accent border-accent/40' : 'text-primary/40 border-primary/15'
              }`}
            >
              {t}
            </span>
          ))}
        </motion.div>
      </section>

      {/* ── META STRIP ── */}
      <div className="bg-secondary border-t border-primary/10">
        <div className="container mx-auto max-w-[var(--max-width)] px-6 md:px-14 py-5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-heading font-extrabold text-eyebrow text-primary/20 tracking-widest">
              {String(idx + 1).padStart(2, '0')}
            </span>
            <span className="w-px h-4 bg-primary/10" />
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.12em] text-primary/50">
              {item.tag.replace(/Â/g, '').replace(/·/g, '·')}
            </span>
          </div>
          <span className="font-body font-bold text-eyebrow uppercase tracking-[0.12em] text-primary/25">
            {outcomes.length} Outcomes
          </span>
        </div>
      </div>

      {/* ── HEADLINE — large editorial ── */}
      <section className="bg-primary border-b border-secondary/8 py-16 md:py-24 px-6 md:px-14">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          {/* Left — small label */}
          <motion.div variants={itemVariants} className="md:pt-4 flex flex-col gap-2">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent">
              Case Study
            </span>
            <span className="font-body text-body-sm text-secondary/40 leading-snug">
              {tags.join(' · ')}
            </span>
          </motion.div>

          {/* Right — huge display headline */}
          <motion.h1
            variants={itemVariants}
            className="font-heading font-extrabold text-secondary leading-[0.95] tracking-tighter"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5rem)' }}
          >
            {tc(item.title)}
          </motion.h1>
        </motion.div>
      </section>

      {/* ── CHALLENGE ── */}
      <section className="bg-primary py-16 md:py-24 px-6 md:px-14 border-b border-secondary/8">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-1">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent">
              The Brief
            </span>
            <span className="font-heading font-extrabold text-[1.05rem] text-secondary/20 tracking-tight uppercase">
              Challenge
            </span>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="font-body text-body-lg text-secondary/65 leading-[1.8] font-medium"
          >
            {item.challenge}
          </motion.p>
        </motion.div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="bg-secondary py-16 md:py-24 px-6 md:px-14 border-b border-primary/10">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-1">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent">
              Our Approach
            </span>
            <span className="font-heading font-extrabold text-[1.05rem] text-primary/20 tracking-tight uppercase">
              Solution
            </span>
          </motion.div>
          <motion.p
            variants={itemVariants}
            className="font-body text-body-lg text-primary/70 leading-[1.8] font-medium"
          >
            {item.solution}
          </motion.p>
        </motion.div>
      </section>

      {/* ── OUTCOMES ── */}
      <section className="bg-primary py-16 md:py-24 px-6 md:px-14">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)]"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-start">
            <motion.div variants={itemVariants} className="flex flex-col gap-1">
              <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent">
                Results
              </span>
              <span className="font-heading font-extrabold text-[1.05rem] text-secondary/20 tracking-tight uppercase">
                Outcomes
              </span>
            </motion.div>

            <div className="flex flex-col">
              {outcomes.map((o, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="flex items-baseline gap-5 py-5 border-b border-secondary/8 group"
                >
                  <span className="font-heading font-extrabold text-eyebrow text-secondary/15 w-7 shrink-0">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight-none group-hover:text-accent transition-colors duration-300">
                    {o}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-secondary py-16 md:py-24 px-6 md:px-14 border-t border-primary/10">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 md:gap-16 items-end"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex flex-col gap-1">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent">
              Work With Us
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <motion.h2
              variants={itemVariants}
              className="font-heading font-extrabold text-primary leading-tight-none tracking-tighter"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
            >
              Have a similar<br />challenge?
            </motion.h2>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-4 shrink-0">
              <Button variant="primary" size="lg" href="/contact-us">
                Talk to our team <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
              </Button>
              <Button variant="ghost" size="lg" href="/case-studies">
                All cases
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default CaseStudyPage;
