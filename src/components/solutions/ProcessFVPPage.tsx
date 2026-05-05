import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiThermometer, FiGrid, FiArchive, FiBox } from 'react-icons/fi';
import processData from '../../data/process-fvp.json';
import { useCmsData } from '../../hooks/useCmsData';
import Button from '@components/core/Button';
import heroImgRaw from '../../data/images/process/Gemini_Generated_Image_lxtc84lxtc84lxtc (1).png';
const heroImg = typeof heroImgRaw === 'string' ? heroImgRaw : (heroImgRaw as any).src;
const heroVideo = '/videos/food-processing.mp4';
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

const ServiceCard = ({ title, desc, icon, index }: { title: string; desc: string; icon: React.ReactNode; index: number }) => (
  <motion.div
    variants={itemVariants}
    className="bg-primary border border-secondary/15 rounded-sm p-6 md:p-8 flex flex-col group hover:-translate-y-[2px] hover:border-secondary/40 hover:shadow-xl transition-all duration-300 relative overflow-hidden"
  >
    <div className="absolute inset-0 bg-secondary translate-y-[calc(100%-2px)] transition-transform duration-500 group-hover:translate-y-0 z-0" />
    <div className="relative z-10">
      <div className="w-12 h-12 flex items-center justify-center bg-secondary/[0.04] text-secondary group-hover:bg-primary group-hover:text-accent rounded-sm mb-6 transition-colors duration-500">
        <span className="text-2xl">{icon}</span>
      </div>
      <span className="font-heading font-extrabold text-eyebrow text-accent mb-2 block uppercase tracking-widest">
        0{index + 1}
      </span>
      <h3 className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight-none mb-4 group-hover:text-primary transition-colors duration-300">
        {title}
      </h3>
      <div className="font-body text-body-md text-secondary/60 leading-relaxed font-medium group-hover:text-primary/70 transition-colors duration-300" dangerouslySetInnerHTML={{ __html: desc }} />
    </div>
  </motion.div>
);

const ProcessFVPPage: React.FC = () => {
  const liveData = useCmsData('process-fvp', processData)
  const { hero, services, cta } = liveData.page.sections.reduce((acc: any, section: any) => {
    acc[section.type] = section;
    return acc;
  }, {});

  const serviceIcons = [<FiThermometer />, <FiGrid />, <FiArchive />, <FiBox />];

  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">
      {/* â”€â”€ HERO â”€â”€ */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary text-primary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={heroImg}
          className="absolute inset-0 z-0 w-full h-full object-cover scale-105"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 z-10 bg-secondary/10" />

        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-30"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
            {hero.eyebrow}
          </motion.span>
          <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter mb-8 text-primary max-w-5xl">
            <CharReveal text={tc(hero.headline.split('. ').slice(0, 2).join('. ') + '.')} />
            <CharReveal text={tc(hero.headline.split('. ').slice(2).join('. '))} className="text-accent" />
          </h1>
          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <p className="font-body text-body-lg text-primary/80 leading-[1.6] mb-8 font-medium">
              {hero.subheadline}
            </p>
            <Button variant="primary" size="lg" href="/contact-us">
              {services.cta.label} <FiArrowRight className="ml-3 text-lg" />
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* â”€â”€ SERVICES â”€â”€ */}
      <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <LocalSectionHeader
              head={tc(services.type.replace(/_/g, ' '))}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
              {services.items.map((item: any, idx: number) => (
                <ServiceCard key={idx} title={item.title} desc={item.description} icon={serviceIcons[idx]} index={idx} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* â”€â”€ CLOSING â”€â”€ */}
      <section className="bg-secondary text-primary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-5xl text-center flex flex-col items-center">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <LocalSectionHeader
              dark
              align="center"
              head={tc(cta.headline)}
            />
            <motion.p variants={itemVariants} className="font-body text-body-lg text-primary/70 leading-relaxed mb-10 max-w-3xl"
              dangerouslySetInnerHTML={{ __html: cta.body }}
            />
            <motion.div variants={itemVariants}>
              <Button variant="ghost" size="lg" href="/contact-us">
                {cta.cta.label} <FiArrowRight className="ml-3 text-lg" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ProcessFVPPage;
