import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowRight, FiPlus, FiMinus,
  FiGlobe, FiAnchor, FiFileText, FiPackage,
  FiThermometer, FiShield, FiTruck, FiActivity,
} from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import CharReveal from '@components/core/CharReveal';

const services = [
  { icon: <FiGlobe />, title: 'International Air Freight', desc: 'Time-sensitive, hazardous, and perishable cargo handled with precision. Global network, priority lanes.' },
  { icon: <FiAnchor />, title: 'International Ocean Freight', desc: 'FCL and LCL solutions across all major trade lanes. Competitive rates, reliable schedules.' },
  { icon: <FiFileText />, title: 'Customs Clearance', desc: 'Expert documentation, duty drawback, and GST credit management for smooth border clearance.' },
  { icon: <FiPackage />, title: 'Container Freight Station', desc: 'Consolidation, stuffing and destuffing services at CFS facilities across India.' },
  { icon: <FiActivity />, title: 'Warehousing', desc: 'Climate-controlled storage with full inventory management and order fulfillment services.' },
  { icon: <FiShield />, title: 'Hazardous Cargo', desc: 'DG classification, compliant packaging, and trained handling for dangerous goods.' },
  { icon: <FiThermometer />, title: 'Reefer Container Services', desc: 'Temperature-controlled freight for pharma, food, and sensitive cargo — end to end.' },
  { icon: <FiTruck />, title: 'Integrated Logistics', desc: 'End-to-end supply chain management — from factory gate to final destination, fully coordinated.' },
];

const stats = [
  { value: '62', label: 'Years of experience' },
  { value: '190+', label: 'Countries served' },
  { value: '24/7', label: 'Real-time tracking' },
];

const faq = [
  { q: 'What types of cargo do you handle?', a: 'We handle general cargo, hazardous goods, oversized freight, and temperature-sensitive cargo across air, ocean, and multimodal routes.' },
  { q: 'Do you provide cargo insurance?', a: 'Yes. Optional cargo insurance is available for all shipments. We guide you through coverage options based on cargo type and value.' },
  { q: 'Can you handle pharmaceutical and cold-chain cargo?', a: 'Yes. We have dedicated reefer container services and GDP-compliant handling for pharmaceutical and perishable cargo.' },
  { q: 'What is your customs clearance capability?', a: 'Our customs team manages complete documentation, duty drawback claims, GST credit processing, and compliance for all import/export shipments.' },
  { q: 'Do you offer door-to-door delivery?', a: 'Yes. Our integrated logistics service covers pickup, freight, customs, and last-mile delivery to your destination.' },
];

const StoreFreightForwarding: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">

      {/* ── HERO ── */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(15,40,84,0.92)_0%,rgba(15,40,84,0.75)_35%,rgba(15,40,84,0.4)_60%,transparent_82%)]" />
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-30"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
            Move · Freight Forwarding
          </motion.span>
          <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter mb-8 text-primary max-w-5xl">
            <CharReveal text={tc('Cold Chain Excellence.')} />
            <CharReveal text={tc('Global Reach.')} className="text-accent" />
          </h1>
          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <p className="font-body text-body-lg text-primary/80 leading-[1.6] mb-8 font-medium">
              End-to-end freight forwarding — air, ocean, and multimodal — across 190+ countries. 62 years of cold-chain expertise.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/contact">
                Get a freight quote <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
              </Button>
              <Button variant="ghost" size="lg" href="/contact">
                Talk to a specialist
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-accent py-10 px-6 md:px-12">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] grid grid-cols-3 gap-4"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          {stats.map((s) => (
            <motion.div key={s.label} variants={itemVariants} className="flex flex-col items-center text-center gap-1">
              <span className="font-heading font-extrabold text-h1 text-secondary tracking-tighter leading-none">{s.value}</span>
              <span className="font-body font-bold text-eyebrow uppercase tracking-[0.12em] text-secondary/60 text-[10px]">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)]"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-1.5">What we offer</span>
            <h2 className="font-heading font-extrabold text-h2 leading-tight-none tracking-tighter flex flex-col pb-1.5 w-full border-b text-primary border-primary/10">
              <CharReveal text={tc('Our Services')} justify="start" />
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-primary/5 mt-6">
            {services.map((s, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group bg-secondary flex flex-col gap-4 p-6 md:p-8 border border-primary/10 hover:bg-primary/[0.03] transition-colors duration-300"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-primary/[0.06] group-hover:bg-accent/20 text-accent rounded-sm text-xl transition-colors duration-300">
                  {s.icon}
                </div>
                <h3 className="font-heading font-extrabold text-h4 text-primary tracking-tight leading-tight">{s.title}</h3>
                <p className="font-body text-body-sm text-primary/55 leading-relaxed font-medium">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="bg-primary py-16 px-6 md:px-12 border-b border-secondary/10">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] grid grid-cols-1 md:grid-cols-[220px_1fr] gap-8 md:gap-16 items-start"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="md:pt-1">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-1">Overview</span>
            <span className="font-heading font-extrabold text-h4 text-secondary/60 tracking-tight">About</span>
          </motion.div>
          <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/70 leading-[1.7] font-medium max-w-3xl">
            With 62 years of experience and a network spanning 190+ countries, Crystal Group delivers end-to-end freight forwarding for temperature-sensitive and general cargo. Our team manages air freight, ocean freight, customs clearance, CFS services, and integrated door-to-door logistics — with real-time tracking and optional cargo insurance on every shipment.
          </motion.p>
        </motion.div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-8 md:gap-16"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="md:pt-1">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-1.5">FAQ</span>
            <h2 className="font-heading font-extrabold text-h2 leading-tight-none tracking-tighter flex flex-col pb-1.5 w-full border-b text-secondary border-secondary/10">
              <CharReveal text={tc('Common questions')} justify="start" />
            </h2>
          </motion.div>
          <motion.div variants={itemVariants} className="border border-secondary/10 overflow-hidden divide-y divide-secondary/8">
            {faq.map((item, i) => (
              <div key={i}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className={`w-full flex items-center justify-between gap-4 px-5 py-4 text-left transition-colors duration-200
                    ${openFaq === i ? 'bg-secondary' : 'bg-primary hover:bg-secondary/[0.03]'}`}
                >
                  <span className={`font-heading font-extrabold text-h4 tracking-tight leading-tight transition-colors ${openFaq === i ? 'text-primary' : 'text-secondary'}`}>
                    {item.q}
                  </span>
                  <span className={`shrink-0 text-sm transition-colors ${openFaq === i ? 'text-accent' : 'text-secondary/35'}`}>
                    {openFaq === i ? <FiMinus /> : <FiPlus />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 'auto' }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pt-3 pb-5 bg-primary border-t border-secondary/8">
                        <p className="font-body text-body-md text-secondary/65 leading-relaxed">{item.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-primary py-20 px-6 md:px-12">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)]"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <div className="border border-secondary/10 rounded-sm p-6 sm:p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
            <div className="max-w-xl">
              <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary mb-2 block">
                Let's move it
              </motion.span>
              <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter">
                Ready to ship globally?
              </motion.h2>
              <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/55 leading-relaxed mt-4 font-medium">
                Tell us your route, cargo type, and timeline. We respond within 24 hours.
              </motion.p>
            </div>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Button variant="primary" size="lg" href="/contact">
                Get a freight quote <FiArrowRight className="ml-2 text-lg" />
              </Button>
              <Button variant="secondary" size="lg" href="/move">
                All logistics
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default StoreFreightForwarding;
