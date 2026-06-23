import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import impactData from '../../data/impact.json';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import CharReveal from '@components/core/CharReveal';

const section = (impactData as any).page.sections.find((s: any) => s.type === 'case_studies');
const pharmaCases = section.items.filter((c: any) =>
  (c.tag || '').toLowerCase().includes('pharma') ||
  (c.title || '').toLowerCase().includes('pharma') ||
  (c.product || '').toLowerCase().includes('pharma')
);

const PharmaOverview: React.FC = () => (
  <div className="w-full bg-primary overflow-x-hidden font-body">

    {/* ── HERO ── */}
    <section className="relative bg-secondary text-primary py-32 px-6 md:px-12 pt-40">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,40,84,0.97)_0%,rgba(15,40,84,0.85)_100%)]" />
      <motion.div
        className="container mx-auto max-w-[var(--max-width)] relative z-10"
        initial="hidden" animate="visible" variants={containerVariants}
      >
        <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
          Impact · Pharma
        </motion.span>
        <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter text-primary max-w-4xl mb-6">
          <CharReveal text={tc('Pharma Cold')} />
          <CharReveal text={tc('Chain Solutions')} className="text-accent" />
        </h1>
        <motion.p variants={itemVariants} className="font-body text-body-lg text-primary/70 max-w-xl leading-relaxed">
          GDP-compliant storage, plasma transport, API cold rooms, and reefer solutions for India's leading pharmaceutical companies.
        </motion.p>
      </motion.div>
    </section>

    {/* ── CASE STUDIES GRID ── */}
    <section className="bg-primary py-20 px-6 md:px-12">
      <div className="container mx-auto max-w-[var(--max-width)]">
        <motion.div
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {pharmaCases.map((c: any) => (
            <motion.a
              key={c.slug}
              href={`/impact/${c.slug}/`}
              variants={itemVariants}
              className="group flex flex-col gap-4 p-6 border border-secondary/10 rounded-sm hover:border-accent hover:bg-accent/[0.03] transition-all duration-300"
            >
              <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent/70">{c.tag}</span>
              <h3 className="font-heading font-extrabold text-h4 text-secondary tracking-tight leading-tight group-hover:text-accent transition-colors duration-300 flex-1">
                {c.title}
              </h3>
              <div className="flex items-center gap-2 text-secondary/40 group-hover:text-accent transition-colors duration-300 mt-auto">
                <span className="font-heading font-extrabold text-eyebrow uppercase tracking-widest">Read Case Study</span>
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="bg-secondary py-20 px-6 md:px-12">
      <div className="container mx-auto max-w-[var(--max-width)]">
        <motion.div
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-2 block">
              Pharma cold chain
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-primary leading-tight-none tracking-tighter">
              Need a GDP-compliant solution?
            </motion.h2>
          </div>
          <motion.div variants={itemVariants} className="shrink-0 flex flex-wrap gap-4">
            <Button variant="primary" size="lg" href="/contact">
              Talk to a Specialist <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
            </Button>
            <Button variant="ghost" size="lg" href="/impact/">
              All Case Studies
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>

  </div>
);

export default PharmaOverview;
