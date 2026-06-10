import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import CharReveal from '@components/core/CharReveal';

// ── Types ─────────────────────────────────────────────────────────────────────

interface Section {
  type: string;
  [key: string]: any;
}

// ── Shared SectionHeader ──────────────────────────────────────────────────────

function SectionHeader({ eyebrow, head, desc, align = 'left', dark = false }: {
  eyebrow?: string; head: string; desc?: string; align?: 'left' | 'center'; dark?: boolean;
}) {
  return (
    <div className={`flex flex-col mb-8 shrink-0 ${align === 'center' ? 'items-center text-center' : 'items-start text-left'}`}>
      {eyebrow && (
        <motion.span variants={itemVariants} className={`font-body font-bold text-eyebrow uppercase tracking-[0.15em] mb-1.5 block ${dark ? 'text-accent' : 'text-secondary'}`}>
          {eyebrow}
        </motion.span>
      )}
      <motion.h2 variants={itemVariants} className={`font-heading font-extrabold text-h2 leading-tight-none tracking-tighter pb-1.5 w-full border-b ${dark ? 'text-primary border-primary/10' : 'text-secondary border-secondary/10'}`}>
        <CharReveal text={tc(head)} justify={align === 'center' ? 'center' : 'start'} />
      </motion.h2>
      {desc && (
        <motion.p variants={itemVariants} className={`font-body text-body-lg leading-relaxed max-w-2xl mt-4 ${dark ? 'text-primary/70' : 'text-secondary/70'}`}>
          {desc}
        </motion.p>
      )}
    </div>
  );
}

// ── 1. Hero ───────────────────────────────────────────────────────────────────

function SectionHero({ data }: { data: any }) {
  return (
    <section className="relative h-[100vh] min-h-[600px] bg-secondary text-primary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
      {data.video ? (
        <video autoPlay muted loop playsInline poster={data.image}
          className="absolute inset-0 z-0 w-full h-full object-cover scale-105">
          <source src={data.video} type="video/mp4" />
        </video>
      ) : data.image ? (
        <img src={data.image} alt="" className="absolute inset-0 z-0 w-full h-full object-cover" />
      ) : null}
      <div className="absolute inset-0 z-10 bg-secondary/55" />
      <motion.div
        className="container mx-auto max-w-[var(--max-width)] relative z-30"
        initial="hidden" animate="visible" variants={containerVariants}
      >
        {data.eyebrow && (
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
            {data.eyebrow}
          </motion.span>
        )}
        <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter mb-8 text-primary max-w-5xl">
          {data.headline && <CharReveal text={tc(data.headline)} />}
          {data.headline_accent && <CharReveal text={tc(data.headline_accent)} className="text-accent" />}
        </h1>
        {data.subheadline && (
          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <p className="font-body text-body-lg text-primary/80 leading-[1.6] mb-8 font-medium">
              {data.subheadline}
            </p>
            <div className="flex flex-wrap gap-4">
              {data.cta_primary && (
                <Button variant="primary" size="lg" href={data.cta_primary.href ?? '/contact'}>
                  {data.cta_primary.label} <FiArrowRight className="ml-3 text-lg" />
                </Button>
              )}
              {data.cta_secondary && (
                <Button variant="ghost" size="lg" href={data.cta_secondary.href ?? '/contact'}>
                  {data.cta_secondary.label}
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

// ── 2. Intro Statement ────────────────────────────────────────────────────────

function SectionIntroStatement({ data }: { data: any }) {
  const align = data.align ?? 'center';
  return (
    <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
      <motion.div
        className={`container mx-auto max-w-4xl flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start'}`}
        initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
      >
        <SectionHeader head={tc(data.headline ?? '')} align={align} />
        {data.body && (
          <motion.p variants={itemVariants}
            className="font-body text-body-lg max-w-3xl text-secondary/70 leading-[1.6] font-medium"
            dangerouslySetInnerHTML={{ __html: data.body }}
          />
        )}
      </motion.div>
    </section>
  );
}

// ── 3. Split Statement ────────────────────────────────────────────────────────

function SectionSplitStatement({ data }: { data: any }) {
  return (
    <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
      <motion.div
        className="container mx-auto max-w-[var(--max-width)] flex flex-col md:flex-row gap-8 md:gap-12 items-center"
        initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
      >
        <div className="w-full md:w-5/12">
          <SectionHeader head={tc(data.headline ?? '')} />
        </div>
        <div className="w-full md:w-7/12 border-l-[3px] border-accent pl-8 md:pl-12">
          {data.body && (
            <motion.p variants={itemVariants}
              className="font-body text-body-lg text-secondary/80 leading-[1.6] font-medium tracking-tight mb-8"
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          )}
          {data.cta && (
            <motion.div variants={itemVariants}>
              <Button variant="primary" size="lg" href={data.cta.href ?? '/contact'}>
                {data.cta.label} <FiArrowRight className="ml-3 text-lg" />
              </Button>
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

// ── 4. Feature Grid ───────────────────────────────────────────────────────────

function SectionFeatureGrid({ data }: { data: any }) {
  const cols = data.columns ?? 3;
  const colClass = cols === 4 ? 'lg:grid-cols-4' : cols === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3';
  return (
    <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
      <div className="container mx-auto max-w-[var(--max-width)]">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
          <SectionHeader eyebrow={data.eyebrow} head={tc(data.headline ?? '')} desc={data.desc} />
          <div className={`grid grid-cols-1 ${colClass} gap-6 mt-8`}>
            {(data.items ?? []).map((item: any, i: number) => (
              <motion.div key={i} variants={itemVariants}
                className="bg-primary border border-secondary/15 rounded-sm p-6 flex flex-col group hover:-translate-y-[2px] hover:border-secondary/40 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-secondary translate-y-[calc(100%-2px)] transition-transform duration-500 ease-out group-hover:translate-y-0 z-0" />
                <div className="relative z-10 flex flex-col h-full">
                  <h3 className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight-none mb-3 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-body text-body-md text-secondary/60 leading-relaxed font-medium group-hover:text-primary/70 transition-colors duration-300">
                    {item.desc ?? item.body ?? item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 5. Service Cards ──────────────────────────────────────────────────────────

function SectionServiceCards({ data }: { data: any }) {
  return (
    <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
      <div className="container mx-auto max-w-[var(--max-width)]">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
          <SectionHeader eyebrow={data.eyebrow} head={tc(data.headline ?? '')} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {(data.items ?? []).map((item: any, i: number) => (
              <motion.div key={i} variants={itemVariants}
                className="bg-primary border border-secondary/15 rounded-sm p-6 md:p-8 flex flex-col group hover:-translate-y-[2px] hover:border-secondary/40 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-secondary translate-y-[calc(100%-2px)] transition-transform duration-500 ease-out group-hover:translate-y-0 z-0" />
                <div className="relative z-10">
                  <span className="font-heading font-extrabold text-eyebrow text-accent mb-2 block uppercase tracking-widest">
                    0{i + 1}
                  </span>
                  <h3 className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight-none mb-4 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="font-body text-body-md text-secondary/60 leading-relaxed font-medium group-hover:text-primary/70 transition-colors duration-300">
                    {item.desc ?? item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 6. Process Steps ──────────────────────────────────────────────────────────

function SectionProcessSteps({ data }: { data: any }) {
  return (
    <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
      <div className="container mx-auto max-w-4xl">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
          <SectionHeader head={tc(data.headline ?? '')} align="center" />
          <div className="flex flex-col gap-4 mt-12">
            {(data.steps ?? []).map((step: any, i: number) => (
              <motion.div key={i} variants={itemVariants}
                className="flex gap-6 items-start bg-primary border border-secondary/10 border-l-[3px] border-l-accent rounded-sm p-6 md:p-8"
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-secondary text-primary font-heading font-bold text-sm rounded-sm">
                  {step.step ?? String(i + 1).padStart(2, '0')}
                </div>
                <div className="flex flex-col pt-1">
                  <h3 className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight-none mb-2">
                    {step.title}
                  </h3>
                  <p className="font-body text-body-lg text-secondary/60 leading-relaxed font-medium max-w-2xl">
                    {step.description ?? step.desc ?? step.body}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          {data.cta && (
            <motion.div variants={itemVariants} className="mt-12 flex justify-center">
              <Button variant="primary" size="lg" href={data.cta.href ?? '/contact'}>
                {data.cta.label} <FiArrowRight className="ml-3 text-lg" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ── 7. Stats Grid ─────────────────────────────────────────────────────────────

function SectionStatsGrid({ data }: { data: any }) {
  return (
    <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
      <div className="container mx-auto max-w-[var(--max-width)]">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
          <SectionHeader eyebrow={data.eyebrow} head={tc(data.headline ?? '')} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
            {(data.items ?? []).map((item: any, i: number) => (
              <motion.div key={i} variants={itemVariants}
                className="flex flex-col border-t-[3px] border-secondary/10 pt-6 group transition-colors hover:border-accent"
              >
                <h3 className="font-heading font-extrabold text-h3 tracking-tight text-secondary mb-3 leading-tight-none">
                  {item.title}
                </h3>
                <p className="font-body text-body-md text-secondary/60 leading-relaxed font-medium"
                  dangerouslySetInnerHTML={{ __html: item.desc ?? item.description ?? item.body ?? '' }}
                />
              </motion.div>
            ))}
          </div>
          {data.cta && (
            <motion.div variants={itemVariants} className="mt-12">
              <Button variant="primary" size="lg" href={data.cta.href ?? '/contact'}>
                {data.cta.label} <FiArrowRight className="ml-3 text-lg" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ── 8. Why Dark ───────────────────────────────────────────────────────────────

function SectionWhyDark({ data }: { data: any }) {
  return (
    <section className="bg-secondary text-primary py-20 px-6 md:px-12">
      <div className="container mx-auto max-w-5xl text-center flex flex-col items-center">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
          className="flex flex-col items-center"
        >
          <SectionHeader dark align="center" head={tc(data.headline ?? '')} />
          {data.body && (
            <motion.p variants={itemVariants}
              className="font-body text-body-lg text-primary/70 leading-relaxed mb-12 max-w-3xl"
              dangerouslySetInnerHTML={{ __html: data.body }}
            />
          )}
          {data.cta && (
            <motion.div variants={itemVariants}>
              <Button variant="primary" size="lg" href={data.cta.href ?? '/contact'}>
                {data.cta.label} <FiArrowRight className="ml-3 text-lg" />
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

// ── 9. Projects Grid ──────────────────────────────────────────────────────────

function SectionProjectsGrid({ data }: { data: any }) {
  return (
    <section className="bg-secondary py-20 px-6 md:px-12 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-5" style={{ backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      <motion.div
        className="container mx-auto max-w-[var(--max-width)] relative z-10"
        initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
      >
        <SectionHeader dark eyebrow={data.eyebrow} head={tc(data.headline ?? '')} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {(data.items ?? []).map((item: any, i: number) => (
            <motion.div key={i} variants={itemVariants}
              className="flex flex-col overflow-hidden rounded-sm border border-primary/10 group"
            >
              <div className="relative h-56 overflow-hidden bg-secondary/50">
                {item.image && (
                  <img src={item.image} alt={item.title} loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2 p-5 border-t border-primary/10">
                <h3 className="font-heading font-extrabold text-h4 tracking-tight text-primary leading-tight-none">
                  {item.title}
                </h3>
                <p className="font-body text-body-md text-primary/60 leading-relaxed">
                  {item.desc ?? item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ── 10. Bento Grid ────────────────────────────────────────────────────────────

function BentoCardItem({ id, title, desc, img, gridStyle, className }: {
  id: string; title: string; desc: string; img?: string; gridStyle?: React.CSSProperties; className?: string;
}) {
  return (
    <motion.div variants={itemVariants} style={gridStyle}
      className={`bg-primary border border-secondary/15 rounded-sm relative group overflow-hidden transition-all duration-300 hover:-translate-y-[2px] hover:border-secondary/40 hover:shadow-xl flex flex-col ${className ?? ''}`}
    >
      <div className="absolute inset-0 bg-secondary translate-y-[calc(100%-2px)] transition-transform duration-500 ease-out group-hover:translate-y-0 z-[5] pointer-events-none" />
      <div className="relative z-[30] shrink-0 px-4 pt-4 pb-2 md:px-5 md:pt-5" style={{ flex: '0 0 30%' }}>
        <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-1 block">{id}</span>
        <h3 className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight-none mb-2 transition-colors duration-300 group-hover:text-primary">{title}</h3>
        <p className="font-body text-body-md text-secondary/60 font-medium group-hover:text-primary/70 transition-colors duration-300 line-clamp-3">{desc}</p>
      </div>
      <div className="relative overflow-hidden z-[20] mt-2" style={{ flex: '1 1 70%' }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 opacity-70 group-hover:opacity-0 transition-opacity duration-500" />
        {img
          ? <img src={img} alt={title} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out" />
          : <div className="absolute inset-0 bg-secondary/20" />
        }
      </div>
    </motion.div>
  );
}

function SectionBentoGrid({ data }: { data: any }) {
  const items = data.items ?? [];
  const getDesc = (item: any) => item.desc ?? item.description ?? '';
  return (
    <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
      <div className="container mx-auto max-w-[var(--max-width)]">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
          <SectionHeader eyebrow={data.eyebrow} head={tc(data.headline ?? '')} />
          <div className="block md:hidden mt-8">
            <div className="grid grid-cols-2 gap-3">
              {items.slice(0, 4).map((item: any, i: number) => (
                <div key={i} className="h-[220px]">
                  <BentoCardItem id={`0${i + 1}`} title={item.title} desc={getDesc(item)} img={item.image} className="h-full" />
                </div>
              ))}
            </div>
          </div>
          <div className="hidden md:grid gap-4 md:gap-6 mt-8 min-h-[500px]"
            style={{ gridTemplateColumns: 'repeat(4, 1fr)', gridTemplateRows: 'repeat(2, 1fr)' }}
          >
            {items[0] && <BentoCardItem id="01" title={items[0].title} desc={getDesc(items[0])} img={items[0].image} gridStyle={{ gridColumn: '1 / 3', gridRow: '1 / 3' }} />}
            {items[1] && <BentoCardItem id="02" title={items[1].title} desc={getDesc(items[1])} img={items[1].image} gridStyle={{ gridColumn: '3 / 4', gridRow: '1 / 2' }} />}
            {items[2] && <BentoCardItem id="03" title={items[2].title} desc={getDesc(items[2])} img={items[2].image} gridStyle={{ gridColumn: '4 / 5', gridRow: '1 / 2' }} />}
            {items[3] && <BentoCardItem id="04" title={items[3].title} desc={getDesc(items[3])} img={items[3].image} gridStyle={{ gridColumn: '3 / 5', gridRow: '2 / 3' }} />}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 11. Industries Grid ───────────────────────────────────────────────────────

function SectionIndustriesGrid({ data }: { data: any }) {
  return (
    <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
      <div className="container mx-auto max-w-[var(--max-width)]">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
          <SectionHeader eyebrow={data.eyebrow} head={tc(data.headline ?? '')} desc={data.desc} />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {(data.items ?? []).map((item: any, i: number) => (
              <motion.div key={i} variants={itemVariants}
                className="relative aspect-[4/3] overflow-hidden rounded-sm group"
              >
                {item.image && (
                  <img src={item.image} alt={item.title} loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                )}
                <div className="absolute inset-0 bg-secondary/60 group-hover:bg-secondary/75 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-end p-4">
                  <span className="font-heading font-extrabold text-h4 text-primary leading-tight-none tracking-tight">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 12. Certifications ────────────────────────────────────────────────────────

function SectionCertifications({ data }: { data: any }) {
  return (
    <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
      <div className="container mx-auto max-w-[var(--max-width)]">
        <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="flex flex-col max-w-md">
              <SectionHeader eyebrow={data.eyebrow} head={tc(data.headline ?? '')} />
              {data.body && (
                <motion.p variants={itemVariants} className="font-body text-body-md text-secondary/60 leading-relaxed font-medium -mt-4">
                  {data.body}
                </motion.p>
              )}
            </div>
            {data.cta && (
              <motion.div variants={itemVariants} className="shrink-0">
                <Button variant="primary" size="lg" href={data.cta.href ?? '/contact'}>
                  {data.cta.label} <FiArrowRight className="ml-3 text-lg" />
                </Button>
              </motion.div>
            )}
          </div>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-2 mt-8">
            {(data.items ?? []).map((cert: string, i: number) => (
              <span key={i} className="font-body font-bold text-eyebrow uppercase tracking-[0.12em] px-3 py-1.5 border border-secondary/20 text-secondary/60 rounded-sm">
                {cert}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// ── 13. CTA ───────────────────────────────────────────────────────────────────

function SectionCta({ data }: { data: any }) {
  return (
    <section className="bg-secondary py-20 px-6 md:px-12">
      <div className="container mx-auto max-w-[var(--max-width)]">
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-end justify-between gap-10"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <div className="flex flex-col gap-3">
            {data.eyebrow && (
              <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent">
                {data.eyebrow}
              </motion.span>
            )}
            <motion.h2 variants={itemVariants}
              className="font-heading font-extrabold text-h2 text-primary leading-tight-none tracking-tighter border-b border-primary/10 pb-2"
            >
              {tc(data.headline ?? '')}
            </motion.h2>
            {data.body && (
              <motion.p variants={itemVariants} className="font-body text-body-lg text-primary/65 max-w-2xl mt-2">
                {data.body}
              </motion.p>
            )}
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            {data.cta_primary && (
              <motion.div variants={itemVariants}>
                <Button variant="primary" size="lg" href={data.cta_primary.href ?? '/contact'}>
                  {data.cta_primary.label} <FiArrowRight className="ml-3 text-lg" />
                </Button>
              </motion.div>
            )}
            {data.cta_secondary && (
              <motion.div variants={itemVariants}>
                <Button variant="ghost" size="lg" href={data.cta_secondary.href ?? '/contact'}>
                  {data.cta_secondary.label}
                </Button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ── Section Map ───────────────────────────────────────────────────────────────

const SECTION_MAP: Record<string, React.FC<{ data: any }>> = {
  hero:              SectionHero,
  intro_statement:   SectionIntroStatement,
  split_statement:   SectionSplitStatement,
  feature_grid:      SectionFeatureGrid,
  service_cards:     SectionServiceCards,
  process_steps:     SectionProcessSteps,
  stats_grid:        SectionStatsGrid,
  why_dark:          SectionWhyDark,
  projects_grid:     SectionProjectsGrid,
  bento_grid:        SectionBentoGrid,
  industries_grid:   SectionIndustriesGrid,
  certifications:    SectionCertifications,
  cta:               SectionCta,
};

// ── Renderer ──────────────────────────────────────────────────────────────────

interface Props {
  sections: Section[];
}

export default function SectionRenderer({ sections: initialSections }: Props) {
  const [sections, setSections] = useState(initialSections)

  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.data?.type === 'preview-update' && Array.isArray(e.data.sections)) {
        setSections(e.data.sections)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">
      {sections.map((section, i) => {
        const Component = SECTION_MAP[section.type];
        if (!Component) return null;
        // Support both admin format { type, data: {...} } and flat JSON format { type, ...fields }
        const componentData = 'data' in section && section.data && typeof section.data === 'object'
          ? section.data
          : section;
        return <Component key={`${section.type}-${i}`} data={componentData} />;
      })}
    </div>
  );
}
