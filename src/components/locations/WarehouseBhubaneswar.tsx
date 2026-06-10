import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiMapPin, FiCheckCircle } from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import CharReveal from '@components/core/CharReveal';

const services = [
  {
    title: 'Cold Storage Warehousing',
    items: [
      'Indenting, order bookings & category management',
      'Invoicing and receivable management',
      'Inventory management & supply administration',
      'Tax administration & statutory compliance',
      'Payment collection & customer management',
      'Reverse logistics & government-compliant disposal',
    ],
  },
  {
    title: 'Distribution & Value-Add',
    items: [
      'Kitting, labelling, sorting & repacking',
      'Stuffing & de-stuffing of containers',
      'Bulk breaking & order consolidation',
      'Fruit & vegetable sorting, grading, packing, washing',
    ],
  },
];

const features = [
  { title: 'Blast Freezer to −40°C', desc: 'Rapid blast freezing capability for meat, seafood, and processed food requiring deep-freeze protocols.' },
  { title: 'Superior Insulation', desc: 'Energy-efficient insulation panels maintain precise temperatures even in extreme Odisha summer conditions.' },
  { title: '24/7 Operations', desc: 'Round-the-clock operations with monitoring systems, backup power, and alarm systems for uninterrupted cold chain.' },
  { title: 'Portable Cold Storage', desc: 'Reefer containers available for rental at or near the Bhubaneswar facility — ideal for seasonal overflow.' },
];

const WarehouseBhubaneswar: React.FC = () => {
  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">

      {/* ── HERO ── */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_right,rgba(15,40,84,0.92)_0%,rgba(15,40,84,0.75)_35%,rgba(15,40,84,0.4)_60%,transparent_82%)]" />
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-30"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="flex items-center gap-2 mb-6">
            <FiMapPin className="text-accent text-sm" />
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent">Locations · Bhubaneswar</span>
          </motion.div>
          <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter mb-8 text-primary max-w-5xl">
            <CharReveal text={tc('Cold Chain Solutions —')} />
            <CharReveal text={tc('Bhubaneswar.')} className="text-accent" />
          </h1>
          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <p className="font-body text-body-lg text-primary/80 leading-[1.6] mb-8 font-medium">
              Cold storage warehousing, blast freezing, and portable reefer containers serving Odisha and Eastern India. 24/7 operations.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary" size="lg" href="/contact">
                Enquire now <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
              </Button>
              <Button variant="ghost" size="lg" href="/store/cold-storage">
                All warehouse locations
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FACILITY CAPABILITIES ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-1.5">Facility</span>
              <h2 className="font-heading font-extrabold text-h2 leading-tight-none tracking-tighter flex flex-col pb-1.5 w-full border-b text-primary border-primary/10">
                <CharReveal text={tc('Key Capabilities')} />
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-primary/5 mt-6">
              {features.map((f, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="group bg-secondary flex flex-col gap-4 p-6 md:p-8 border border-primary/10 hover:bg-primary/[0.03] transition-colors duration-300"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-primary/[0.06] group-hover:bg-accent/20 rounded-sm transition-colors duration-300">
                    <span className="font-heading font-extrabold text-[13px] text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-h4 text-primary tracking-tight leading-tight">{f.title}</h3>
                  <p className="font-body text-body-md text-primary/55 leading-relaxed font-medium">{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="bg-primary py-20 px-6 md:px-12 border-b border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-6">
              <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-1.5">Services</span>
              <h2 className="font-heading font-extrabold text-h2 leading-tight-none tracking-tighter flex flex-col pb-1.5 w-full border-b text-secondary border-secondary/10">
                <CharReveal text={tc('What we provide')} />
              </h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              {services.map((svc) => (
                <motion.div
                  key={svc.title}
                  variants={itemVariants}
                  className="border border-secondary/10 rounded-sm p-6 md:p-8"
                >
                  <h3 className="font-heading font-extrabold text-h3 text-secondary mb-5">{svc.title}</h3>
                  <div className="flex flex-col gap-3">
                    {svc.items.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <FiCheckCircle className="shrink-0 text-accent text-sm mt-0.5" />
                        <span className="font-body font-medium text-body-sm text-secondary/70 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-primary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
          >
            <div className="border border-secondary/10 rounded-sm p-6 sm:p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
              <div className="max-w-xl">
                <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary mb-2 block">
                  Get started
                </motion.span>
                <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-secondary leading-tight-none tracking-tighter">
                  Need cold storage in Bhubaneswar?
                </motion.h2>
                <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/55 leading-relaxed mt-4 font-medium">
                  Tell us your requirements — storage temperature, volume, and timeline. We'll have a proposal within 24 hours.
                </motion.p>
              </div>
              <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 shrink-0">
                <Button variant="primary" size="lg" href="/contact">
                  Enquire now <FiArrowRight className="ml-2 text-lg" />
                </Button>
                <Button variant="secondary" size="lg" href="/store/cold-storage">
                  All locations
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default WarehouseBhubaneswar;
