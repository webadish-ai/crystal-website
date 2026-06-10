import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import impactData from '../../data/impact.json';
import blogMeta from '../../data/blog-meta.json';
import { useCmsData } from '../../hooks/useCmsData';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import CharReveal from '@components/core/CharReveal';

const ImpactPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cases' | 'blog'>('cases');
  const liveData = useCmsData('impact', impactData);
  const { hero, case_studies } = liveData.page.sections.reduce((acc: any, s: any) => {
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

      {/* ── TABS ── */}
      <div className="bg-secondary sticky top-[64px] z-20">
        <div className="container mx-auto max-w-[var(--max-width)] px-6 md:px-12 py-4 flex items-center gap-3">
          {([
            { key: 'cases', label: 'Case Studies', count: case_studies.items.length },
            { key: 'blog',  label: 'Blog',         count: (blogMeta as any[]).length },
          ] as const).map(({ key, label, count }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-sm font-body font-bold text-body-sm uppercase tracking-[0.12em] transition-all duration-200 ${
                activeTab === key
                  ? 'bg-accent text-secondary'
                  : 'text-primary/40 hover:text-primary hover:bg-primary/10'
              }`}
            >
              {label}
              <span className={`text-[11px] font-bold transition-colors duration-200 ${
                activeTab === key ? 'text-secondary/60' : 'text-primary/25'
              }`}>
                {count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── CONTENT ── */}
      <AnimatePresence mode="wait">

        {/* ── CASE STUDIES ── */}
        {activeTab === 'cases' && (
          <motion.section
            key="cases"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="bg-primary py-20 px-6 md:px-12"
          >
            <div className="container mx-auto max-w-[var(--max-width)]">
              <motion.div key="cases-inner" initial="hidden" animate="visible" variants={containerVariants}>

                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
                  <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary">
                    {case_studies.eyebrow}
                  </span>
                  <span className="flex-1 h-px bg-secondary/10" />
                  <span className="font-heading font-extrabold text-eyebrow text-secondary/20 tracking-[0.2em]">
                    {String(case_studies.items.length).padStart(2, '0')} Cases
                  </span>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {case_studies.items.map((item: any, idx: number) => (
                    <motion.a
                      key={idx}
                      href={`/impact/${item.slug}`}
                      variants={itemVariants}
                      className="group relative bg-secondary overflow-hidden rounded-sm hover:ring-1 hover:ring-accent/30 transition-all duration-300 block cursor-pointer"
                    >
                      {/* 16:9 image / visual area */}
                      <div className="relative w-full aspect-video bg-secondary overflow-hidden">
                        {/* Watermark number */}
                        <span
                          className="absolute bottom-2 right-4 font-heading font-extrabold text-[clamp(60px,8vw,100px)] leading-none select-none pointer-events-none text-transparent"
                          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.08)' }}
                        >
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        {/* Tag badge */}
                        <span className="absolute top-4 left-4 font-body font-bold text-eyebrow uppercase tracking-[0.12em] text-secondary bg-accent px-2.5 py-1 rounded-sm text-[10px]">
                          {item.tag}
                        </span>
                        {/* Grid pattern overlay */}
                        <div className="absolute inset-0 opacity-[0.03]"
                          style={{backgroundImage:'repeating-linear-gradient(0deg,#fff 0,#fff 1px,transparent 1px,transparent 40px),repeating-linear-gradient(90deg,#fff 0,#fff 1px,transparent 1px,transparent 40px)'}}>
                        </div>
                        {/* Product label */}
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <p className="font-body text-body-sm text-primary/40 truncate">{item.product}</p>
                        </div>
                      </div>

                      {/* Card body */}
                      <div className="p-5 md:p-6">
                        <h3 className="font-heading font-bold text-h4 text-primary tracking-tight leading-snug mb-4 group-hover:text-accent transition-colors duration-200">
                          {tc(item.title)}
                        </h3>
                        {/* Outcome pills */}
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {(Array.isArray(item.outcomes) ? item.outcomes : []).slice(0, 3).map((o: any, i: number) => (
                            <span key={i} className="font-body font-bold text-[10px] uppercase tracking-[0.1em] text-accent/60 border border-accent/15 px-2 py-0.5 rounded-sm group-hover:border-accent/40 group-hover:text-accent transition-all duration-200">
                              {o.value}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-body-sm font-semibold text-primary/30 group-hover:text-accent transition-colors duration-200">
                          View Case Study
                          <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* ── BLOG ── */}
        {activeTab === 'blog' && (
          <motion.section
            key="blog"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="bg-primary py-20 px-6 md:px-12"
          >
            <div className="container mx-auto max-w-[var(--max-width)]">
              <motion.div key="blog-inner" initial="hidden" animate="visible" variants={containerVariants}>

                <motion.div variants={itemVariants} className="flex items-center gap-4 mb-12">
                  <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary">
                    Insights & Articles
                  </span>
                  <span className="flex-1 h-px bg-secondary/10" />
                  <span className="font-heading font-extrabold text-eyebrow text-secondary/20 tracking-[0.2em]">
                    {String((blogMeta as any[]).length).padStart(2, '0')} Articles
                  </span>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(blogMeta as any[]).map((post, idx) => (
                    <motion.a
                      key={idx}
                      href={`/blog/${post.slug}/`}
                      variants={itemVariants}
                      className="group flex flex-col border border-secondary/10 rounded-sm hover:border-accent/40 transition-colors duration-200 overflow-hidden"
                    >
                      <div className="h-1 w-full bg-accent/20 group-hover:bg-accent transition-colors duration-200" />
                      <div className="p-6 flex flex-col flex-1">
                        <span className="text-eyebrow tracking-[0.15em] uppercase text-accent/70 mb-3">
                          {post.tags[0]}
                        </span>
                        <h3 className="font-heading font-semibold text-h4 text-secondary leading-snug mb-3 group-hover:text-accent/90 transition-colors duration-200">
                          {post.title}
                        </h3>
                        <p className="font-body text-body-md text-secondary/60 leading-relaxed flex-1">
                          {post.excerpt.length > 110 ? post.excerpt.slice(0, 110) + '…' : post.excerpt}
                        </p>
                        <div className="mt-5 flex items-center gap-2 text-body-sm font-semibold text-secondary/40 group-hover:text-accent transition-colors duration-200">
                          Read article
                          <FiArrowRight className="group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

    </div>
  );
};

export default ImpactPage;
