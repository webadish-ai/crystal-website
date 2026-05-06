import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import CharReveal from '@components/core/CharReveal';
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
}

function splitOutcomes(outcomes: string): string[] {
  // handle both encoded (Â·) and plain (·) separators
  return outcomes.split(/\s*[Â]?[···]\s*/).map(s => s.trim()).filter(Boolean);
}

const CaseStudyPage: React.FC<Props> = ({ item, idx }) => {
  const outcomes = splitOutcomes(item.outcomes);
  const [category, industry] = item.tag.split(/[Â]?[··]/).map(s => s.trim());

  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">

      {/* ── HERO ── */}
      <section className="relative min-h-[70vh] bg-secondary text-primary flex flex-col justify-end overflow-hidden px-6 md:px-12 pt-32 pb-16 md:pb-24">
        <div
          className="absolute inset-0 z-0 opacity-[0.04]"
          style={{
            backgroundImage: 'linear-gradient(to right, #ffffff1a 1px, transparent 1px), linear-gradient(to bottom, #ffffff1a 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <span
          className="absolute top-24 right-8 md:right-16 font-heading font-extrabold leading-none select-none pointer-events-none text-[clamp(120px,18vw,220px)]"
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)', color: 'transparent' }}
        >
          {String(idx + 1).padStart(2, '0')}
        </span>

        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-20"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.a
            href="/case-studies"
            variants={itemVariants}
            className="inline-flex items-center gap-2 font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-primary/40 hover:text-accent transition-colors mb-10 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            All Case Studies
          </motion.a>

          <div className="flex flex-wrap gap-3 mb-6">
            {category && (
              <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent border border-accent/30 px-3 py-1 rounded-sm">
                {category}
              </span>
            )}
            {industry && (
              <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-primary/40 border border-primary/10 px-3 py-1 rounded-sm">
                {industry}
              </span>
            )}
          </div>

          <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter text-primary max-w-5xl mb-10">
            <CharReveal text={tc(item.title)} />
          </h1>

          {/* Outcome pills in hero */}
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 border-t border-primary/10 pt-8">
            {outcomes.map((o, i) => (
              <span
                key={i}
                className="font-body font-bold text-eyebrow uppercase tracking-[0.1em] text-accent/80 border border-accent/20 px-3 py-1 rounded-sm"
              >
                {o}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── CHALLENGE ── */}
      <section className="bg-primary py-20 md:py-28 px-6 md:px-12 border-b border-secondary/10">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-20 items-start"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <div>
            <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-3">
              The Brief
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter border-b border-secondary/10 pb-4">
              Challenge
            </motion.h2>
          </div>
          <motion.p
            variants={itemVariants}
            className="font-body text-body-lg text-secondary/70 leading-[1.75] font-medium pt-1 md:pt-8"
          >
            {item.challenge}
          </motion.p>
        </motion.div>
      </section>

      {/* ── SOLUTION ── */}
      <section className="bg-secondary py-20 md:py-28 px-6 md:px-12">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] grid grid-cols-1 md:grid-cols-[280px_1fr] gap-10 md:gap-20 items-start"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <div>
            <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-3">
              Our Approach
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-primary leading-tight-none tracking-tighter border-b border-primary/10 pb-4">
              Solution
            </motion.h2>
          </div>
          <motion.p
            variants={itemVariants}
            className="font-body text-body-lg text-primary/70 leading-[1.75] font-medium pt-1 md:pt-8"
          >
            {item.solution}
          </motion.p>
        </motion.div>
      </section>

      {/* ── OUTCOMES STRIP ── */}
      <section className="bg-primary py-20 md:py-28 px-6 md:px-12 border-t border-secondary/10 border-b border-secondary/10">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)]"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-10">
            Results
          </motion.span>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0">
            {outcomes.map((o, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex flex-col border-t border-secondary/10 pt-6 pb-8 pr-8 group hover:border-accent transition-colors duration-300"
              >
                <span className="font-heading font-extrabold text-h3 text-secondary leading-tight-none tracking-tighter mb-1">
                  / {o}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-secondary py-20 md:py-28 px-6 md:px-12">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <div className="max-w-2xl">
            <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-4">
              Work With Us
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-primary leading-tight-none tracking-tighter">
              <CharReveal text="Have a similar challenge?" />
            </motion.h2>
          </div>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
            <Button variant="primary" size="lg" href="/contact-us">
              Talk to our team <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
            </Button>
            <Button variant="ghost" size="lg" href="/case-studies">
              View all cases
            </Button>
          </motion.div>
        </motion.div>
      </section>

    </div>
  );
};

export default CaseStudyPage;
