import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import CharReveal from '@components/core/CharReveal';

const CATEGORIES = [
  {
    label: 'Cold Chain',
    products: [
      { name: 'Reefer Containers', desc: 'Standard & high-cube refrigerated containers for +25°C to −25°C', href: '/store/reefer-containers' },
      { name: 'Blast Freezer', desc: 'Rapid blast freezing down to −40°C for perishables and pharma', href: '/store/blast-freezer' },
      { name: 'Super Store', desc: 'Multi-bay superstore cold rooms for large-scale compliance storage', href: '/store/super-store' },
      { name: 'Super Freezer', desc: 'High-capacity deep freeze units for bulk frozen storage', href: '/store/super-freezer' },
      { name: 'Cold Rooms', desc: 'Modular walk-in refrigeration rooms for any scale', href: '/store/cold-rooms' },
      { name: 'Customized Reefer', desc: 'Purpose-built reefer configurations for specific operational needs', href: '/store/customized-reefer' },
    ],
  },
  {
    label: 'Dry Containers',
    products: [
      { name: 'Dry Containers', desc: 'Standard 20ft & 40ft GP containers for general cargo', href: '/store/dry-containers' },
      { name: 'Tunnel Containers', desc: 'Drive-through dual-door access for high-throughput operations', href: '/store/tunnel-containers' },
      { name: 'Hard Top Containers', desc: 'Removable steel roof panels for top-loading cargo', href: '/store/hard-top-containers' },
      { name: 'Open Top Containers', desc: 'Open-roof containers for crane-loaded or oversized cargo', href: '/store/open-top-containers' },
      { name: 'Dry Fabricated', desc: 'Prefab container cabins — site offices, dormitories, cafes and more', href: '/store/dry-fabricated' },
    ],
  },
  {
    label: 'Specialised',
    products: [
      { name: 'ISO Tanks', desc: 'T11/T14 ISO tanks for bulk liquid and chemical transport', href: '/store/iso-tanks' },
      { name: 'Accessories', desc: 'Container fittings, ramps, locks, IoT monitoring, and more', href: '/store/accessories' },
      { name: 'AMC & Spare Parts', desc: 'Annual maintenance contracts and genuine spare parts', href: '/store/amc-spareparts' },
    ],
  },
];

const StoreHub: React.FC = () => (
  <div className="w-full bg-primary overflow-x-hidden font-body">

    {/* ── HERO ── */}
    <section className="relative bg-secondary text-primary py-32 px-6 md:px-12 pt-40">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,40,84,0.97)_0%,rgba(15,40,84,0.85)_100%)]" />
      <motion.div
        className="container mx-auto max-w-[var(--max-width)] relative z-10"
        initial="hidden" animate="visible" variants={containerVariants}
      >
        <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
          Store
        </motion.span>
        <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter text-primary max-w-3xl mb-6">
          <CharReveal text={tc('Products &')} />
          <CharReveal text={tc('Solutions')} className="text-accent" />
        </h1>
        <motion.p variants={itemVariants} className="font-body text-body-lg text-primary/70 max-w-xl leading-relaxed mb-10">
          From reefer containers and ISO tanks to prefab container cabins — every cold chain and container product Crystal Group offers.
        </motion.p>
        <motion.div variants={itemVariants}>
          <Button variant="primary" size="lg" href="/contact">
            Get a Quote <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </motion.div>
      </motion.div>
    </section>

    {/* ── CATEGORIES ── */}
    {CATEGORIES.map((cat) => (
      <section key={cat.label} className="bg-primary py-16 px-6 md:px-12 border-b border-secondary/10">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}>
            <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h3 text-secondary tracking-tighter mb-8 pb-3 border-b border-secondary/10">
              {cat.label}
            </motion.h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.products.map((p) => (
                <motion.a
                  key={p.href}
                  href={p.href}
                  variants={itemVariants}
                  className="group flex flex-col gap-3 p-6 border border-secondary/10 rounded-sm hover:border-accent hover:bg-accent/[0.03] transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-heading font-extrabold text-h4 text-secondary tracking-tight leading-tight group-hover:text-accent transition-colors duration-300">
                      {p.name}
                    </h3>
                    <FiArrowRight className="text-secondary/30 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300 shrink-0" />
                  </div>
                  <p className="font-body text-body-sm text-secondary/55 leading-relaxed font-medium">{p.desc}</p>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    ))}

    {/* ── CTA ── */}
    <section className="bg-secondary py-20 px-6 md:px-12">
      <div className="container mx-auto max-w-[var(--max-width)]">
        <motion.div
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-2 block">
              Not sure what you need?
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-primary leading-tight-none tracking-tighter">
              Talk to a cold chain specialist.
            </motion.h2>
          </div>
          <motion.div variants={itemVariants} className="shrink-0">
            <Button variant="primary" size="lg" href="/contact">
              Contact Us <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>

  </div>
);

export default StoreHub;
