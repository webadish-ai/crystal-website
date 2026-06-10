import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiUsers, FiTrendingUp, FiSettings, FiMapPin, FiBriefcase, FiClock } from 'react-icons/fi';
import careersData from '../../data/careers.json';
import { useCmsData } from '../../hooks/useCmsData';
import Button from '@components/core/Button';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import CharReveal from '@components/core/CharReveal';

const LocalSectionHeader = ({ eyebrow, head, desc, align = "left", dark = false }: { eyebrow?: string; head: string; desc?: string; align?: "left" | "center"; dark?: boolean }) => (
  <div className={`flex flex-col mb-6 md:mb-8 shrink-0 ${align === "center" ? "items-center text-center" : "items-start text-left"}`}>
    {eyebrow && <motion.span variants={itemVariants} className={`font-body font-bold text-eyebrow uppercase tracking-[0.15em] mb-1.5 block ${dark ? "text-accent" : "text-secondary"}`}>{eyebrow}</motion.span>}
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

/* ── Right detail pane ── */
const RolePane = ({ role }: { role: any }) => (
  <motion.div
    key={role.title}
    initial={{ opacity: 0, y: 6 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -6 }}
    transition={{ duration: 0.2, ease: 'easeOut' }}
    className="flex flex-col h-full"
  >
    {/* Header */}
    <div className="px-7 pt-7 pb-5 border-b border-secondary/10">
      <span className="font-body font-bold text-[10px] uppercase tracking-[0.2em] text-accent block mb-2">
        {role.function}
      </span>
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight">
          {role.title}
        </h3>
        <a
          href="mailto:marketing@crystalgroup.in"
          className="shrink-0 flex items-center gap-1.5 font-heading font-extrabold text-[11px] uppercase tracking-[0.13em] px-4 py-2.5 bg-accent text-secondary hover:bg-secondary hover:text-primary transition-all duration-200 rounded-sm"
        >
          Apply <FiArrowRight className="text-xs" />
        </a>
      </div>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <span className="flex items-center gap-1.5 font-body font-bold text-[11px] uppercase tracking-[0.1em] text-secondary/55">
          <FiMapPin className="text-[9px]" />{role.location}
        </span>
        <span className="flex items-center gap-1.5 font-body font-bold text-[11px] uppercase tracking-[0.1em] text-secondary/55">
          <FiClock className="text-[9px]" />{role.working_hours.split('·')[0].trim()}
        </span>
        <span className="font-body font-bold text-[11px] uppercase tracking-[0.1em] text-secondary/40">
          {role.timing.split(',')[0]}
        </span>
      </div>
    </div>

    {/* Scrollable body */}
    <div className="flex-1 overflow-y-auto px-7 py-6 flex flex-col gap-6">

      {/* Summary — 2 sentences */}
      <div>
        <span className="font-body font-bold text-[10px] uppercase tracking-[0.2em] text-secondary/40 block mb-2">About the Role</span>
        <p className="font-body text-body-md text-secondary/75 leading-relaxed font-medium">
          {role.role_summary.split('. ').slice(0, 2).join('. ').trimEnd().replace(/\.?$/, '.')}
        </p>
      </div>

      {/* Responsibilities — 3 bullets */}
      <div>
        <span className="font-body font-bold text-[10px] uppercase tracking-[0.2em] text-secondary/40 block mb-3">What You'll Do</span>
        <ul className="flex flex-col gap-2.5">
          {role.responsibilities.slice(0, 3).map((r: string, i: number) => (
            <li key={i} className="flex items-start gap-3 font-body text-body-sm text-secondary/70 leading-relaxed font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0 mt-[6px]" />
              {r}
            </li>
          ))}
        </ul>
      </div>

      {/* Experience + Salary */}
      <div className="grid grid-cols-2 gap-4 bg-secondary/[0.03] rounded-sm p-4">
        <div>
          <span className="font-body font-bold text-[10px] uppercase tracking-[0.2em] text-secondary/40 block mb-1.5">Experience</span>
          <p className="font-body text-body-sm text-secondary/70 leading-snug font-medium">{role.experience.split('.')[0]}</p>
        </div>
        <div>
          <span className="font-body font-bold text-[10px] uppercase tracking-[0.2em] text-secondary/40 block mb-1.5">Salary</span>
          <p className="font-body text-body-sm text-secondary/70 leading-snug font-medium">{role.salary}</p>
        </div>
      </div>

      {/* Skills */}
      <div>
        <span className="font-body font-bold text-[10px] uppercase tracking-[0.2em] text-secondary/40 block mb-3">Key Skills</span>
        <div className="flex flex-wrap gap-1.5">
          {role.skills.slice(0, 5).map((s: string, i: number) => (
            <span key={i} className="font-body font-bold text-[10px] uppercase tracking-[0.08em] px-2.5 py-1.5 bg-secondary/[0.07] text-secondary/60 rounded-sm">
              {s}
            </span>
          ))}
        </div>
      </div>

    </div>

  </motion.div>
);

const CareersPage: React.FC = () => {
  const liveData = useCmsData('careers', careersData)
  const { hero, why_crystal, areas_hire, open_roles } = liveData.page.sections.reduce((acc: any, section: any) => {
    acc[section.type] = section;
    return acc;
  }, {});

  const whyIcons = [<FiSettings />, <FiUsers />, <FiTrendingUp />, <FiBriefcase />];

  /* ── Open roles state ── */
  const allRoles: any[] = open_roles.roles;
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedIdx, setSelectedIdx] = useState<number>(0);

  /* Unique function domains */
  const domains = ['All', ...Array.from(new Set(allRoles.map((r: any) => r.function))) as string[]];

  /* Short display label for domain pills */
  const shortLabel = (f: string) => {
    if (f === 'All') return 'All';
    return f.split(' & ')[0].split(' ').slice(0, 2).join(' ');
  };

  /* Filtered list */
  const filteredRoles = activeFilter === 'All' ? allRoles : allRoles.filter((r: any) => r.function === activeFilter);

  const handleFilter = (f: string) => {
    setActiveFilter(f);
    setSelectedIdx(0);
  };

  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">
      {/* ── HERO ── */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary text-primary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=75&w=1400&auto=format&fit=crop"
          alt="Careers at Crystal"
          loading="eager"
          decoding="async"
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
            <Button variant="primary" size="lg" href="#roles">
              {hero.cta.label} <FiArrowRight className="ml-3 text-lg" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── WHY CRYSTAL ── */}
      <section className="bg-primary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <LocalSectionHeader head={tc(why_crystal.type.replace(/_/g, ' '))} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
              {why_crystal.items.map((item: any, idx: number) => (
                <motion.div key={idx} variants={itemVariants} className="flex flex-col gap-4">
                  <div className="text-accent text-2xl">{whyIcons[idx]}</div>
                  <h3 className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight-none">
                    {item.title}
                  </h3>
                  <div className="font-body text-body-lg text-secondary/65 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: item.description }} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── AREAS WE HIRE FOR ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
              <LocalSectionHeader dark head={tc(areas_hire.headline)} />
              <motion.p variants={itemVariants} className="font-body text-body-lg text-primary/60 leading-relaxed max-w-sm lg:text-right shrink-0 mb-8 md:mb-8"
                dangerouslySetInnerHTML={{ __html: areas_hire.body }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-primary/5">
              {areas_hire.functions.map((func: string, idx: number) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group relative bg-secondary flex flex-col justify-between gap-6 p-6 md:p-8 border border-primary/10 hover:bg-primary/[0.04] transition-colors duration-300 cursor-default"
                >
                  <span className="font-heading font-extrabold text-[11px] text-primary/25 tracking-[0.2em] uppercase">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-heading font-extrabold text-h3 text-primary leading-tight-none tracking-tight">
                    {func}
                  </h3>
                  <div className="w-8 h-[2px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OPEN ROLES ── */}
      <section id="roles" className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <LocalSectionHeader head={tc(open_roles.headline)} />
              <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/60 leading-relaxed max-w-sm md:text-right shrink-0 mb-8"
                dangerouslySetInnerHTML={{ __html: open_roles.body }}
              />
            </div>

            {/* Split panel */}
            <motion.div variants={itemVariants} className="flex flex-col lg:flex-row border border-secondary/10 rounded-sm overflow-hidden" style={{ minHeight: '540px' }}>

              {/* ── Left: filter + role list ── */}
              <div className="lg:w-[38%] shrink-0 border-b lg:border-b-0 lg:border-r border-secondary/10 flex flex-col">

                {/* Domain filter pills */}
                <div className="px-4 py-3.5 border-b border-secondary/10 bg-secondary/[0.02] flex flex-wrap gap-1.5">
                  {domains.map((d: string) => (
                    <button
                      key={d}
                      onClick={() => handleFilter(d)}
                      className={`font-body font-bold text-[9px] uppercase tracking-[0.14em] px-2.5 py-1 rounded-sm transition-all duration-150 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                        activeFilter === d
                          ? 'bg-accent text-secondary'
                          : 'bg-secondary/[0.07] text-secondary/55 hover:text-secondary/80 hover:bg-secondary/[0.12]'
                      }`}
                    >
                      {shortLabel(d)}
                      {d !== 'All' && (
                        <span className={`ml-1 ${activeFilter === d ? 'text-secondary/70' : 'text-secondary/30'}`}>
                          {allRoles.filter((r: any) => r.function === d).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Role list */}
                <div className="flex flex-col divide-y divide-secondary/[0.07] flex-1">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeFilter}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex flex-col divide-y divide-secondary/[0.07]"
                    >
                      {filteredRoles.map((role: any, idx: number) => (
                        <button
                          key={role.title}
                          onClick={() => setSelectedIdx(idx)}
                          className={`group w-full text-left flex items-stretch gap-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-accent ${
                            selectedIdx === idx ? 'bg-secondary/[0.05]' : 'hover:bg-secondary/[0.025]'
                          }`}
                        >
                          {/* Active bar */}
                          <span className={`w-[3px] shrink-0 transition-colors duration-200 ${selectedIdx === idx ? 'bg-accent' : 'bg-transparent'}`} />

                          <div className="flex flex-col gap-1.5 px-5 py-4 flex-1 min-w-0">
                            <span className={`font-body font-bold text-[9px] uppercase tracking-[0.18em] transition-colors ${selectedIdx === idx ? 'text-accent' : 'text-secondary/40 group-hover:text-secondary/60'}`}>
                              {role.function.split(' & ')[0]}
                            </span>
                            <span className={`font-heading font-extrabold text-body-md leading-snug tracking-tight transition-colors ${selectedIdx === idx ? 'text-secondary' : 'text-secondary/65 group-hover:text-secondary/85'}`}>
                              {role.title}
                            </span>
                            <div className="flex items-center gap-2 mt-0.5">
                              <span className="flex items-center gap-1 font-body font-medium text-[10px] text-secondary/45">
                                <FiMapPin className="text-[8px]" />{role.location}
                              </span>
                              <span className="text-secondary/20 text-[10px]">·</span>
                              <span className="font-body font-medium text-[10px] text-secondary/45">
                                {role.working_hours.split('·')[0].trim()}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center pr-4">
                            <FiArrowRight className={`text-sm transition-all duration-200 ${selectedIdx === idx ? 'text-accent' : 'text-secondary/20 group-hover:text-secondary/45'}`} />
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Navigator footer */}
                <div className="px-5 py-4 border-t border-secondary/10 bg-secondary/[0.02] mt-auto">
                  <p className="font-body text-[11px] text-secondary/45 leading-relaxed">
                    Don't see a fit?{' '}
                    <a href="mailto:marketing@crystalgroup.in" className="text-accent hover:underline font-medium">
                      Send us your CV
                    </a>
                  </p>
                </div>
              </div>

              {/* ── Right: role detail pane ── */}
              <div className="flex-1 min-w-0 overflow-hidden">
                <AnimatePresence mode="wait">
                  <RolePane key={`${activeFilter}-${selectedIdx}`} role={filteredRoles[selectedIdx] ?? filteredRoles[0]} />
                </AnimatePresence>
              </div>

            </motion.div>

            {/* Bottom CTA */}
            <motion.div variants={itemVariants} className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button variant="primary" size="lg" href="mailto:marketing@crystalgroup.in">
                {open_roles.cta_cv.label} <FiArrowRight className="ml-3 text-lg" />
              </Button>
              <Button variant="secondary" size="lg" href="/contact">
                {open_roles.cta_general.label} <FiArrowRight className="ml-3 text-lg" />
              </Button>
            </motion.div>

          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CareersPage;
