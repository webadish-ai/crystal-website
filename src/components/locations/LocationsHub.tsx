import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiArrowRight, FiPhone, FiMail } from 'react-icons/fi';
import { containerVariants, itemVariants, viewportOnce, tc } from '@components/core/animations';
import Button from '@components/core/Button';
import CharReveal from '@components/core/CharReveal';

const LOCATIONS = [
  {
    city: 'Mumbai',
    type: 'Head Office',
    address: '501, Synergy Business Park, Sahakar Road, Off Aarey Road, Goregaon East, Mumbai, Maharashtra 400063',
    phone: '+91 22 40352000',
    isHQ: true,
    href: null,
  },
  {
    city: 'Navi Mumbai',
    type: 'Logistics Facility',
    address: 'Major container yard serving JNPT and surrounding industrial corridors, Navi Mumbai, Maharashtra',
    phone: null,
    isHQ: false,
    href: null,
  },
  {
    city: 'Kolkata',
    type: 'Gateway Facility',
    address: '88 Bidhan Street, Kashanrpur, Park Street, Kolkata, West Bengal 700171',
    phone: null,
    isHQ: false,
    href: null,
  },
  {
    city: 'Bhubaneswar',
    type: 'Eastern Hub',
    address: 'Serving the industrial belt of Odisha and Eastern India with cold storage and container solutions',
    phone: null,
    isHQ: false,
    href: '/locations/bhubaneswar',
  },
];

const LocationsHub: React.FC = () => (
  <div className="w-full bg-primary overflow-x-hidden font-body">

    {/* ── HERO ── */}
    <section className="relative bg-secondary text-primary py-32 px-6 md:px-12 pt-40">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,40,84,0.97)_0%,rgba(15,40,84,0.85)_100%)]" />
      <motion.div
        className="container mx-auto max-w-[var(--max-width)] relative z-10"
        initial="hidden" animate="visible" variants={containerVariants}
      >
        <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-6 block">
          Locations
        </motion.span>
        <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter text-primary max-w-3xl mb-6">
          <CharReveal text={tc('Pan-India')} />
          <CharReveal text={tc('Presence')} className="text-accent" />
        </h1>
        <motion.p variants={itemVariants} className="font-body text-body-lg text-primary/70 max-w-xl leading-relaxed">
          Four strategic locations across India — enabling Crystal Group to serve clients in pharma, FMCG, dairy, and quick commerce with speed and reliability.
        </motion.p>
      </motion.div>
    </section>

    {/* ── LOCATIONS GRID ── */}
    <section className="bg-primary py-20 px-6 md:px-12">
      <div className="container mx-auto max-w-[var(--max-width)]">
        <motion.div
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {LOCATIONS.map((loc) => (
            <motion.div
              key={loc.city}
              variants={itemVariants}
              className={`flex flex-col gap-5 p-8 border rounded-sm transition-all duration-300 ${loc.isHQ ? 'border-accent bg-accent/[0.03]' : 'border-secondary/10 hover:border-secondary/30'}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-sm ${loc.isHQ ? 'bg-accent text-secondary' : 'bg-secondary/[0.06] text-accent'}`}>
                  <FiMapPin className="text-lg" />
                </div>
                <div>
                  <span className={`font-heading font-extrabold text-eyebrow uppercase tracking-widest block mb-0.5 ${loc.isHQ ? 'text-accent' : 'text-accent/70'}`}>
                    {loc.type}{loc.isHQ ? ' · HQ' : ''}
                  </span>
                  <h2 className="font-heading font-extrabold text-h2 text-secondary tracking-tighter leading-tight-none">{loc.city}</h2>
                </div>
              </div>

              <p className="font-body text-body-md text-secondary/60 leading-relaxed font-medium">{loc.address}</p>

              {loc.phone && (
                <a href={`tel:${loc.phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-secondary/70 hover:text-accent transition-colors group">
                  <FiPhone className="text-base shrink-0" />
                  <span className="font-heading font-extrabold text-h4 tracking-tight">{loc.phone}</span>
                </a>
              )}

              {loc.href && (
                <a href={loc.href} className="inline-flex items-center gap-2 font-heading font-extrabold text-eyebrow uppercase tracking-widest text-accent hover:text-secondary transition-colors mt-auto group">
                  View Details <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
                </a>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>

    {/* ── CONTACT ── */}
    <section className="bg-secondary py-20 px-6 md:px-12">
      <div className="container mx-auto max-w-[var(--max-width)]">
        <motion.div
          initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
          className="flex flex-col md:flex-row md:items-center justify-between gap-6"
        >
          <div>
            <motion.span variants={itemVariants} className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-2 block">
              Get in touch
            </motion.span>
            <motion.h2 variants={itemVariants} className="font-heading font-extrabold text-h2 text-primary leading-tight-none tracking-tighter">
              We operate pan-India.
            </motion.h2>
          </div>
          <motion.div variants={itemVariants} className="flex flex-wrap gap-4 shrink-0">
            <Button variant="primary" size="lg" href="/contact">
              Contact Us <FiArrowRight className="text-lg transition-transform group-hover/btn:translate-x-1" />
            </Button>
            <a href="tel:+919136121497" className="inline-flex items-center gap-3 font-heading font-extrabold text-eyebrow uppercase tracking-widest text-primary/70 hover:text-primary transition-colors">
              <FiPhone /> +91 91361 21497
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>

  </div>
);

export default LocationsHub;
