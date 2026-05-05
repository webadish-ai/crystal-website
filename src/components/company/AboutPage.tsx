import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiAward, FiShield, FiTrendingUp, FiTarget, FiDownload } from 'react-icons/fi';
import aboutData from '../../data/about-us.json';
import { useCmsData } from '../../hooks/useCmsData';
import Button from '@components/core/Button';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
// @ts-ignore
import companyProfileUrl from '@data/brochures/Crystal-Group-Company-Profile-NEW-.pdf?url';
// @ts-ignore
import companyBriefUrl from '@data/brochures/Crystal-Group---Company-Brief-Updated.pdf?url';
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

const ValueCard = ({ title, description, icon }: { title: string; description: string; icon: React.ReactNode }) => (
  <motion.div variants={itemVariants} className="bg-primary border border-secondary/15 rounded-sm p-6 flex flex-col gap-4 hover:-translate-y-[2px] hover:border-secondary/40 hover:shadow-xl transition-all duration-300">
    <div className="text-accent text-2xl">{icon}</div>
    <h3 className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight-none">
      {title}
    </h3>
    <p className="font-body text-body-md text-secondary/60 leading-relaxed font-medium">
      {description}
    </p>
  </motion.div>
);

const initials = (name: string) =>
  name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]).join('').toUpperCase();

const FounderCard = ({ name, honorific, title, established, bio, photo }: {
  name: string; honorific: string; title: string; established: string; bio: string; photo: string | null;
}) => (
  <motion.div
    variants={itemVariants}
    className="w-full bg-secondary rounded-sm overflow-hidden flex flex-col md:flex-row"
  >
    {/* Photo area */}
    <div className="w-full md:w-[38%] shrink-0 aspect-[4/5] md:aspect-auto relative min-h-[320px] md:min-h-[420px] bg-[#0a1e42]">
      {photo ? (
        <img
          src={photo}
          alt={name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 select-none">
          <span className="font-heading font-black text-[7rem] leading-none text-primary/10">
            {initials(name)}
          </span>
          <span className="font-body text-eyebrow tracking-[0.4em] uppercase text-primary/20 font-bold">
            Crystal Group
          </span>
        </div>
      )}
      {/* Gradient overlay for text legibility on mobile */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary via-transparent to-transparent md:hidden" />
    </div>

    {/* Text area */}
    <div className="flex flex-col justify-center p-8 md:p-12 lg:p-16 gap-6">
      <div>
        <p className="font-body font-bold text-eyebrow uppercase tracking-[0.2em] text-accent/70 mb-1">In Memoriam</p>
        <p className="font-heading font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-3">{title} · Est. {established}</p>
        <p className="font-body text-body-sm text-primary/50 uppercase tracking-widest mb-1">{honorific}</p>
        <h3 className="font-heading font-extrabold text-h2 text-primary leading-tight-none tracking-tighter">
          {name}
        </h3>
      </div>
      <div className="w-12 h-[3px] bg-accent/60 rounded-full" />
      <p className="font-body text-body-lg text-primary/70 leading-[1.75] font-medium max-w-2xl">
        {bio}
      </p>
    </div>
  </motion.div>
);

const LeadershipCard = ({ name, title, photo }: { name: string; title: string; photo?: string | null }) => (
  <motion.div variants={itemVariants} className="bg-primary border border-secondary/15 rounded-sm group flex flex-col items-center text-center hover:-translate-y-[2px] hover:border-secondary/40 hover:shadow-xl transition-all duration-300 overflow-hidden">
    <div className="w-full aspect-[4/5] bg-secondary/[0.06] relative overflow-hidden">
      {photo ? (
        <img
          src={photo}
          alt={name}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover object-top"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 select-none">
          <span className="font-heading font-black text-5xl text-secondary/20">{initials(name)}</span>
          <span className="font-body text-[10px] tracking-[0.3em] uppercase text-secondary/15 font-bold">Crystal</span>
        </div>
      )}
    </div>
    <div className="p-4 w-full">
      <h4 className="font-heading font-extrabold text-h4 text-secondary tracking-tight mb-1">{name}</h4>
      <p className="font-body text-eyebrow text-accent uppercase tracking-widest font-bold">{title}</p>
    </div>
  </motion.div>
);

const AboutPage: React.FC = () => {
  const liveData = useCmsData('about', aboutData)
  const { hero, story, vision_mission, values, leadership, certifications_awards } = liveData.page.sections.reduce((acc: any, section: any) => {
    acc[section.type] = section;
    return acc;
  }, {});

  const valueIcons = [<FiShield />, <FiCheck />, <FiTrendingUp />, <FiAward />];

  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">
      {/* ── HERO ── */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary text-primary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=75&w=1400&auto=format&fit=crop"
          alt="About Crystal"
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
            <div className="flex flex-wrap gap-4">
              <Button variant="ghost" size="lg" href={companyProfileUrl} download="Crystal-Group-Company-Profile.pdf">
                {hero.cta_profile} <FiDownload className="text-lg transition-transform group-hover/btn:translate-y-1" />
              </Button>
              <Button variant="ghost" size="lg" href={companyBriefUrl} download="Crystal-Group-Company-Brief.pdf">
                {hero.cta_brief} <FiDownload className="text-lg transition-transform group-hover/btn:translate-y-1" />
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STORY ── */}
      <section className="bg-primary py-16 md:py-24 px-6 md:px-12">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <LocalSectionHeader head={tc(story.type.replace(/_/g, ' '))} />
            <div className="flex flex-col gap-8 mt-8 md:mt-12">
              {story.body.map((para: string, idx: number) => (
                <motion.p key={idx} variants={itemVariants} className="font-body text-body-lg text-secondary/80 leading-[1.8]">
                  {para}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section className="bg-primary py-20 px-6 md:px-12 border-y border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16"
          >
            <div className="flex flex-col gap-6">
              <FiTarget className="text-4xl text-accent" />
              <h3 className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight-none">Vision</h3>
              <p className="font-body text-body-lg text-secondary/70 leading-relaxed font-medium">
                {vision_mission.vision}
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <FiAward className="text-4xl text-accent" />
              <h3 className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight-none">Mission</h3>
              <p className="font-body text-body-lg text-secondary/70 leading-relaxed font-medium">
                {vision_mission.mission}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-primary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <LocalSectionHeader head={tc(values.type.replace(/_/g, ' '))} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-8 md:mt-16">
              {values.items.map((val: any, idx: number) => (
                <ValueCard key={idx} {...val} icon={valueIcons[idx]} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="bg-primary py-20 px-6 md:px-12 border-t border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants} className="flex flex-col gap-12 md:gap-16">
            <LocalSectionHeader head={tc(leadership.type.replace(/_/g, ' '))} />

            {/* Founder — full-width prominent card */}
            <FounderCard {...leadership.founder} />

            {/* Current leadership grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
              {leadership.team.map((person: any, idx: number) => (
                <LeadershipCard key={idx} {...person} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CERTS & AWARDS ── */}
      <section className="bg-secondary text-primary py-20 px-6 md:px-12 overflow-hidden">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
              <div>
                <LocalSectionHeader dark head={tc(certifications_awards.type.replace(/_/g, ' '))} />
                <div className="flex flex-wrap gap-4 mt-8 md:mt-12">
                  {certifications_awards.certifications.map((cert: string, idx: number) => (
                    <motion.span
                      key={idx}
                      variants={itemVariants}
                      className="bg-primary/5 border border-primary/10 px-4 py-2 rounded-sm font-heading font-extrabold text-eyebrow uppercase tracking-wider text-accent/80"
                    >
                      {cert}
                    </motion.span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-12">
                <div>
                  <h4 className="font-heading font-extrabold text-eyebrow text-accent uppercase tracking-widest mb-6">Institutional Backing</h4>
                  <p className="font-heading font-bold text-h3 text-primary">
                    {certifications_awards.backed_by[0]}
                  </p>
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-eyebrow text-accent uppercase tracking-widest mb-6">Key Accolades</h4>
                  <p className="font-heading font-bold text-h3 text-primary leading-tight">
                    {certifications_awards.awards[0]}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
