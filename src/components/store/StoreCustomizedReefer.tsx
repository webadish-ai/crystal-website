import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiSettings, FiZap, FiTruck, FiShield, FiActivity } from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import CharReveal from '@components/core/CharReveal';

import heroImgRaw from '../../data/images/store/reefer/reefer-hero.png';
import img1Raw from '../../data/images/store/reefer/20ft/20ft Reefer(1).png';
import img2Raw from '../../data/images/store/reefer/20ft/Reefer inside view.JPG';
import img3Raw from '../../data/images/store/reefer/40ft/outside.jpg';

const s = (r: unknown) => typeof r === 'string' ? r : (r as any).src;

const whyChoose = [
  { title: 'Enhanced Operational Efficiency', desc: 'Built to your workflow so every cubic foot earns its keep.' },
  { title: 'Improved Product Safety', desc: 'Precision modifications that protect cargo at every touchpoint.' },
  { title: 'Better Temperature Control', desc: 'Dual machines, multi-zone partitions — whatever your product demands.' },
  { title: 'Faster Loading & Unloading', desc: 'Heavy-duty ramps and extra access doors cut turnaround time.' },
  { title: 'Industry-Specific Configurations', desc: 'Pharma ante rooms, Q-commerce rapid-access, FMCG bulk — tailored, not generic.' },
  { title: 'Scalable Cold Storage Solutions', desc: 'Start with one unit. Scale to a fleet. Same config, same reliability.' },
];

const customizationOptions = [
  { icon: <FiSettings />, title: 'Ante Room Integration', desc: 'Buffer zone for pharma compliance and temperature integrity.' },
  { icon: <FiZap />,      title: 'Additional Access Doors', desc: 'Side, rear, or forklift-ready openings for faster access.' },
  { icon: <FiActivity />, title: 'Dual Refrigeration Units', desc: 'Redundant machines so downtime never reaches your cargo.' },
  { icon: <FiShield />,   title: 'Multi-Temperature Zones', desc: 'Run chilled and frozen in a single unit with partition walls.' },
  { icon: <FiSettings />, title: 'Internal Partition Walls', desc: 'Divide the unit into separate temperature or product zones.' },
  { icon: <FiZap />,      title: 'Storage Racks & Shelving', desc: 'Maximise vertical capacity for pharmaceuticals or packaged goods.' },
  { icon: <FiTruck />,    title: 'Heavy-Duty Loading Ramp', desc: 'Ground-level access for pallet jacks and heavy loads.' },
  { icon: <FiActivity />, title: 'Crystal SMART Monitoring', desc: 'Real-time IoT tracking of temperature, humidity, and alerts.' },
];

const configurations = [
  {
    name: 'Pharma Reefer With Ante Room',
    desc: 'Designed for pharmaceutical storage and clinical logistics. Ante room provides a buffer for gowning, temperature lock, and GDP compliance.',
    img: s(img2Raw),
  },
  {
    name: 'Quick Commerce Reefer',
    desc: 'Wide-access doors, rapid-load shelving, and Crystal SMART monitoring for high-frequency urban delivery operations.',
    img: s(img1Raw),
  },
  {
    name: 'Dual Temperature Reefer',
    desc: 'Internal partition wall divides chilled (+2°C to +8°C) and frozen (-18°C to -25°C) zones in a single unit.',
    img: s(img3Raw),
  },
  {
    name: 'Mobile Cold Warehouse',
    desc: 'Full-size 40ft unit with racks, ramp, and dual machines — a complete portable warehouse deployable anywhere in 48 hours.',
    img: s(img1Raw),
  },
];

const industries = [
  'Pharma & Healthcare',
  'Food & Beverage',
  'Dairy',
  'Quick Commerce',
  'FMCG',
  'Chemicals',
];

const process = [
  { step: '01', title: 'Requirement Discussion', desc: 'We understand your product, operations, and compliance needs in detail.' },
  { step: '02', title: 'Engineering Consultation', desc: 'Our team designs the modification layout and selects the right base unit.' },
  { step: '03', title: 'Custom Modification', desc: 'Fabrication and integration carried out at our facility with quality checks.' },
  { step: '04', title: 'Testing & Inspection', desc: 'Temperature pull-down tests, door seals, and monitoring system validation.' },
  { step: '05', title: 'Delivery & Installation', desc: 'On-site delivery, positioning, and commissioning — ready to run from day one.' },
];

const modifications = [
  'Ante Room Installation',
  'Additional Access Doors',
  'Dual Machine Setup',
  'LED Internal Lighting',
  'Branding & Exterior Customization',
];

const StoreCustomizedReefer: React.FC = () => {
  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">

      {/* ── HERO ── */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <img
          src={s(heroImgRaw)}
          alt="Customized Reefer Solutions"
          loading="eager"
          decoding="async"
          className="absolute inset-0 z-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(15,40,84,0.92)_0%,rgba(15,40,84,0.75)_35%,rgba(15,40,84,0.4)_60%,transparent_80%)]" />
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-20"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-4 block">
            Store · Customized Reefer Solutions
          </motion.span>
          <div className="border-l-[3px] border-accent pl-6 md:pl-8">
            <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter text-primary mb-6 max-w-3xl">
              <CharReveal text={tc('Engineered Around')} />
              <CharReveal text={tc('Your Operations.')} className="text-accent" />
            </h1>
            <motion.p variants={itemVariants} className="font-body text-body-lg text-primary/70 font-medium max-w-xl mb-8 leading-relaxed">
              Every business has unique cold chain requirements. Crystal's Customized Reefer Solutions are designed to meet your specific operational, storage, and temperature-control needs.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              <Button variant="primary" size="lg" href="/contact">
                Discuss your requirement <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
              </Button>
              <Button variant="ghost" size="lg" href="/store/reefer-containers">
                View standard reefers
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="bg-primary py-20 px-6 md:px-12">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)]"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-10">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-1">Why customize</span>
            <h2 className="font-heading font-extrabold text-h2 leading-tight-none tracking-tighter text-secondary border-b border-secondary/10 pb-1.5">
              <CharReveal text="Why Choose Customized Reefer Solutions?" />
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {whyChoose.map((item) => (
              <motion.div key={item.title} variants={itemVariants}
                className="border border-secondary/10 p-6 flex flex-col gap-3 hover:border-accent/40 transition-all duration-300">
                <FiCheckCircle className="text-accent text-xl shrink-0" />
                <span className="font-heading font-extrabold text-[13px] uppercase tracking-[0.1em] text-secondary leading-tight">{item.title}</span>
                <p className="font-body text-body-sm text-secondary/55 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CUSTOMIZATION OPTIONS ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)]"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-10">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-1">What we modify</span>
            <h2 className="font-heading font-extrabold text-h2 leading-tight-none tracking-tighter text-primary border-b border-primary/10 pb-1.5">
              <CharReveal text="Customization Options" />
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {customizationOptions.map((opt) => (
              <motion.div key={opt.title} variants={itemVariants}
                className="bg-primary/[0.06] border border-primary/10 p-5 flex flex-col gap-3 hover:border-accent/40 transition-all duration-300 group">
                <span className="text-accent text-xl group-hover:scale-110 transition-transform duration-200 w-fit">{opt.icon}</span>
                <span className="font-heading font-extrabold text-[12px] uppercase tracking-[0.1em] text-primary leading-tight">{opt.title}</span>
                <p className="font-body text-[12px] text-primary/55 leading-snug">{opt.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── POPULAR CONFIGURATIONS ── */}
      <section className="bg-primary py-20 px-6 md:px-12">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)]"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-10">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-1">Ready to deploy</span>
            <h2 className="font-heading font-extrabold text-h2 leading-tight-none tracking-tighter text-secondary border-b border-secondary/10 pb-1.5">
              <CharReveal text="Popular Custom Configurations" />
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {configurations.map((config) => (
              <motion.div key={config.name} variants={itemVariants}
                className="group border border-secondary/10 overflow-hidden hover:border-accent/40 transition-all duration-300 flex flex-col">
                <div className="aspect-video overflow-hidden">
                  <img src={config.img} alt={config.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-6 flex flex-col gap-2 flex-1">
                  <span className="font-heading font-extrabold text-[13px] uppercase tracking-[0.12em] text-accent">{config.name}</span>
                  <p className="font-body text-body-sm text-secondary/65 leading-relaxed">{config.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── INDUSTRIES + MODIFICATIONS ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] grid grid-cols-1 lg:grid-cols-2 gap-12"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          {/* Industries */}
          <div>
            <motion.div variants={itemVariants} className="mb-8">
              <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-1">Who we serve</span>
              <h2 className="font-heading font-extrabold text-h3 leading-tight-none tracking-tighter text-primary border-b border-primary/10 pb-1.5">
                Industries We Serve
              </h2>
            </motion.div>
            <div className="flex flex-wrap gap-3">
              {industries.map((ind) => (
                <motion.span key={ind} variants={itemVariants}
                  className="font-heading font-extrabold text-[11px] uppercase tracking-[0.12em] px-4 py-2 border border-primary/20 text-primary/70 hover:border-accent hover:text-accent transition-all duration-200">
                  {ind}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Additional Modifications */}
          <div>
            <motion.div variants={itemVariants} className="mb-8">
              <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-1">Also available</span>
              <h2 className="font-heading font-extrabold text-h3 leading-tight-none tracking-tighter text-primary border-b border-primary/10 pb-1.5">
                Additional Modifications
              </h2>
            </motion.div>
            <div className="flex flex-col gap-3">
              {modifications.map((mod) => (
                <motion.div key={mod} variants={itemVariants} className="flex items-center gap-3">
                  <FiCheckCircle className="text-accent text-sm shrink-0" />
                  <span className="font-body font-medium text-body-sm text-primary/80">{mod}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── PROCESS ── */}
      <section className="bg-primary py-20 px-6 md:px-12">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)]"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-12">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-1">How it works</span>
            <h2 className="font-heading font-extrabold text-h2 leading-tight-none tracking-tighter text-secondary border-b border-secondary/10 pb-1.5">
              <CharReveal text="From Requirement To Deployment" />
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {process.map((p, i) => (
              <motion.div key={p.step} variants={itemVariants} className="flex flex-col gap-4 relative">
                {i < process.length - 1 && (
                  <div className="hidden lg:block absolute top-5 left-[calc(100%+12px)] w-[calc(100%-24px)] h-px bg-secondary/15" />
                )}
                <span className="font-heading font-extrabold text-[32px] leading-none text-accent/30">{p.step}</span>
                <div className="flex flex-col gap-1.5">
                  <span className="font-heading font-extrabold text-[12px] uppercase tracking-[0.1em] text-secondary leading-tight">{p.title}</span>
                  <p className="font-body text-[12px] text-secondary/50 leading-snug">{p.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)]"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <div className="border border-primary/10 p-6 sm:p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
            <div>
              <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-2">
                Get started
              </motion.span>
              <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 leading-tight-none tracking-tighter text-primary mb-3">
                Ready for a custom build?
              </motion.h2>
              <motion.p variants={itemVariants} className="font-body text-body-lg text-primary/55 font-medium leading-relaxed max-w-lg">
                Talk to our engineering team. We'll design a reefer solution built exactly around your operations.
              </motion.p>
              <motion.div variants={itemVariants} className="mt-4 flex flex-col gap-1">
                <span className="font-body text-body-sm text-primary/50">Phone: +91 91361 21497</span>
                <span className="font-body text-body-sm text-primary/50">Email: marketing@crystalgroup.in</span>
              </motion.div>
            </div>
            <motion.div variants={itemVariants} className="shrink-0">
              <Button variant="primary" size="lg" href="/contact">
                Discuss your requirement <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default StoreCustomizedReefer;
