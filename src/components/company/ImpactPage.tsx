import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import impactData from '../../data/impact.json';
import { useCmsData } from '../../hooks/useCmsData';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import CharReveal from '@components/core/CharReveal';

const ImpactPage: React.FC = () => {
  const liveData = useCmsData('impact', impactData)
  const { hero, case_studies, blog } = liveData.page.sections.reduce((acc: any, s: any) => {
    acc[s.type] = s; return acc;
  }, {});

  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">

      {/* ── HERO ── */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary text-primary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <img
          src="https://images.unsplash.com/photo-1551288049-bbbda536339a?q=75&w=1400&auto=format&fit=crop"
          alt="Impact and Case Studies"
          loading="eager" decoding="async"
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(15,40,84,0.9)_0%,rgba(15,40,84,0.7)_30%,rgba(15,40,84,0.35)_55%,transparent_78%)]" />

        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-30"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
            {hero.eyebrow}
          </motion.span>
          <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter mb-8 text-primary max-w-5xl">
            <CharReveal text={tc(hero.headline.split('. ')[0] + '.')} />
            <CharReveal text={tc(hero.headline.split('. ').slice(1).join('. '))} className="text-accent" />
          </h1>
          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <p className="font-body text-body-lg text-primary/80 leading-[1.6] mb-8 font-medium">
              {hero.subheadline}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── CASE STUDIES ── card grid ── */}
      <section className="bg-primary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>

            {/* Section label */}
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
              <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary">
                {case_studies.eyebrow}
              </span>
              <span className="flex-1 h-px bg-secondary/10" />
              <span className="font-heading font-extrabold text-eyebrow text-secondary/20 tracking-[0.2em]">
                {String(case_studies.items.length).padStart(2, '0')} Cases
              </span>
            </motion.div>

            {/* Case study cards */}
            <div className="flex flex-col gap-4">
              {case_studies.items.map((item: any, idx: number) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group relative bg-secondary overflow-hidden rounded-sm hover:ring-1 hover:ring-accent/30 transition-all duration-300"
                >
                  {/* Watermark number */}
                  <span
                    className="absolute top-0 right-6 font-heading font-extrabold text-[clamp(80px,10vw,140px)] leading-none text-secondary/0 select-none pointer-events-none"
                    style={{ WebkitTextStroke: '1px rgba(255,255,255,0.06)' }}
                  >
                    {String(idx + 1).padStart(2, '0')}
                  </span>

                  <div className="relative z-10 p-8 md:p-10">
                    {/* Tag + title */}
                    <div className="flex flex-col gap-3 mb-8">
                      <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent w-fit">
                        {item.tag}
                      </span>
                      <h3 className="font-heading font-extrabold text-h3 text-primary tracking-tight leading-snug max-w-3xl">
                        {tc(item.title)}
                      </h3>
                    </div>

                    {/* Challenge / Solution */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-8 pt-6 border-t border-primary/10">
                      <div>
                        <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-primary/35 block mb-3">
                          Challenge
                        </span>
                        <p className="font-body text-body-md text-primary/60 leading-relaxed">
                          {item.challenge}
                        </p>
                      </div>
                      <div>
                        <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-primary/35 block mb-3">
                          Solution
                        </span>
                        <p className="font-body text-body-md text-primary/80 leading-relaxed">
                          {item.solution}
                        </p>
                      </div>
                    </div>

                    {/* Outcome pills */}
                    <div className="flex flex-wrap gap-2">
                      {item.outcomes.split(' · ').map((o: string, i: number) => (
                        <span
                          key={i}
                          className="font-body font-bold text-eyebrow uppercase tracking-[0.1em] text-accent/70
                            border border-accent/20 px-3 py-1 rounded-sm
                            group-hover:border-accent/50 group-hover:text-accent transition-all duration-300"
                        >
                          {o}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent bar */}
                  <div className="h-px w-0 group-hover:w-full bg-accent transition-all duration-500 ease-out" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── INTELLIGENCE ── */}
      <section className="bg-secondary text-primary py-16 px-6 md:px-12 border-t border-primary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-12 items-start">

              {/* Left */}
              <div>
                <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-3 block">
                  {blog.eyebrow}
                </motion.span>
                <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-primary leading-tight-none tracking-tighter border-b border-primary/10 pb-2 mb-5">
                  {tc(blog.headline)}
                </motion.h2>
                <motion.p variants={itemVariants} className="font-body text-body-lg text-primary/55 leading-relaxed">
                  In-depth guides and analysis from Crystal's cold chain team: covering infrastructure, compliance, and operations. New articles published regularly.
                </motion.p>
              </div>

              {/* Right: theme tags as a clean grid */}
              <div>
                <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-primary/30 mb-4 block">
                  {blog.topics_label}
                </motion.span>
                <div className="flex flex-col gap-0">
                  {blog.themes.map((theme: string, idx: number) => (
                    <motion.div
                      key={idx}
                      variants={itemVariants}
                      className="flex items-center justify-between py-3 border-b border-primary/8 group cursor-default"
                    >
                      <span className="font-body font-bold text-body-md text-primary/60 group-hover:text-primary transition-colors duration-200">
                        {theme}
                      </span>
                      <FiArrowRight className="text-primary/20 group-hover:text-accent group-hover:translate-x-1 transition-all duration-200 shrink-0 ml-4" />
                    </motion.div>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default ImpactPage;
