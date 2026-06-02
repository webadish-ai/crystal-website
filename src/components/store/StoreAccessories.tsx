import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import CharReveal from '@components/core/CharReveal';

const categories = [
  {
    label: 'Environmental Control',
    items: ['Heater', 'Dehumidifier'],
  },
  {
    label: 'Lighting',
    items: ['LED Light (Square)', 'LED Light (Round)', 'Flame Proof Light', 'Light Switch'],
  },
  {
    label: 'Safety & Security',
    items: ['Mantrap Alarm', 'Door Lock'],
  },
  {
    label: 'Structural & Flooring',
    items: ['T-Bar Flooring', 'Checkered Plate', 'Rack', 'Ramp'],
  },
  {
    label: 'Containment & Insulation',
    items: ['Strip Curtains (PVC)', 'Confoot (Container Support)'],
  },
  {
    label: 'Power & Connectivity',
    items: ['ISO Power Plug Male', 'ISO Power Plug Female', 'User Panel', 'Wheel'],
  },
  {
    label: 'Smart Technology',
    items: ['Smart IoT Device (Real-time cold-chain tracking)'],
  },
  {
    label: 'Finishing & Branding',
    items: ['AC Paint (Corrosion-resistant)', 'Customized Logo'],
  },
];

const StoreAccessories: React.FC = () => {
  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">

      {/* ── HERO ── */}
      <section className="relative h-[100vh] min-h-[600px] bg-secondary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,40,84,0.92)_0%,rgba(15,40,84,0.75)_35%,rgba(15,40,84,0.4)_60%,transparent_82%)] z-10" />
        <motion.div
          className="container mx-auto max-w-[var(--max-width)] relative z-20"
          initial="hidden" animate="visible" variants={containerVariants}
        >
          <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-4 block">
            Store · Accessories
          </motion.span>
          <div className="border-l-[3px] border-accent pl-6 md:pl-8">
            <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter text-primary mb-6 max-w-3xl">
              <CharReveal text={tc('Cold Storage Accessories')} />
            </h1>
            <motion.p variants={itemVariants} className="font-body text-body-lg text-primary/65 font-medium max-w-xl mb-8 leading-relaxed">
              Everything to enhance your cold storage setup.
            </motion.p>
            <motion.div variants={itemVariants}>
              <Button variant="primary" size="lg" href="/contact-us">
                Request a quote <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </motion.div>
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
          <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/70 font-medium leading-[1.7] max-w-3xl">
            Crystal Group supplies 24+ accessories designed to complete and upgrade cold storage and container setups. From temperature-maintaining PVC strip curtains and smart IoT monitoring devices to industrial lighting, flooring systems, and safety alarms — every component is sourced for cold-chain durability.
          </motion.p>
        </motion.div>
      </section>

      {/* ── PRODUCT CATEGORIES ── */}
      <section className="bg-secondary py-20 px-6 md:px-12">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)]"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent block mb-1">All products</span>
            <h2 className="font-heading font-extrabold text-h2 leading-tight-none tracking-tighter text-primary border-b border-primary/10 pb-1.5 w-full">
              <CharReveal text="Accessories" />
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {categories.map((cat) => (
              <motion.div
                key={cat.label}
                variants={itemVariants}
                className="group bg-primary/[0.06] border border-primary/10 p-6 flex flex-col gap-4 hover:border-accent/40 transition-all duration-300"
              >
                <span className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent text-[10px] mb-1">{cat.label}</span>
                <div className="flex flex-col gap-2">
                  {cat.items.map((item) => (
                    <div key={item} className="flex items-start gap-2.5">
                      <FiCheckCircle className="text-accent text-sm shrink-0 mt-0.5" />
                      <span className="font-body font-medium text-body-sm text-primary/80 leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-primary py-20 px-6 md:px-12">
        <motion.div
          className="container mx-auto max-w-[var(--max-width)]"
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
        >
          <div className="border border-secondary/10 rounded-sm p-6 sm:p-10 md:p-16 flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-8">
            <div>
              <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-secondary block mb-2">
                Get a quote
              </motion.span>
              <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 leading-tight-none tracking-tighter text-secondary mb-3">
                Need accessories for your setup?
              </motion.h2>
              <motion.p variants={itemVariants} className="font-body text-body-lg text-secondary/55 font-medium leading-relaxed max-w-lg">
                Tell us what you need and we'll source and supply. Available pan-India.
              </motion.p>
            </div>
            <motion.div variants={itemVariants} className="shrink-0">
              <Button variant="primary" size="lg" href="/contact-us">
                Request a quote <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default StoreAccessories;
