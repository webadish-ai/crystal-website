import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiCheckCircle, FiSend, FiPhone, FiMail, FiMapPin } from 'react-icons/fi';
import contactData from '../../data/contact.json';
import { useCmsData } from '../../hooks/useCmsData';
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

const inputClass = "bg-primary border border-secondary/20 focus:border-secondary rounded-sm px-4 py-3 text-body-md text-secondary placeholder:text-secondary/40 outline-none transition-colors duration-300 font-body w-full";

const ContactPage: React.FC = () => {
  const liveData = useCmsData('contact', contactData)
  const { sections } = liveData.page;
  const formSection = sections.find(s => s.type === 'contact_form');
  const officesSection = sections.find(s => s.type === 'offices');
  const contactInfo = sections.find(s => s.type === 'contact');

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="w-full bg-primary overflow-x-hidden font-body">
      {/* ── HERO ── */}
      <section className="relative h-[60svh] min-h-[500px] bg-secondary text-primary flex flex-col justify-center overflow-hidden px-6 md:px-12 pt-20">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=75&w=1400&auto=format&fit=crop"
          alt="Contact Crystal"
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
            {formSection?.eyebrow}
          </motion.span>
          <h1 className="font-heading font-extrabold text-h1 leading-tight-none tracking-tighter mb-8 text-primary max-w-5xl">
            <CharReveal text={tc((formSection?.headline || "Contact Us").split(' ').slice(0, 2).join(' '))} />
            <CharReveal text={tc((formSection?.headline || "Contact Us").split(' ').slice(2).join(' '))} className="text-accent" />
          </h1>
          <motion.div variants={itemVariants} className="max-w-2xl border-l-[3px] border-accent pl-6 md:pl-8">
            <p className="font-body text-body-lg text-primary/80 leading-[1.6] mb-8 font-medium">
              {formSection?.subheadline}
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* ── FORM & OFFICES ── */}
      <section className="bg-primary py-20 px-6 md:px-12">
        <div className="container mx-auto max-w-[var(--max-width)]">
          <motion.div
            initial="hidden" whileInView="visible" viewport={viewportOnce} variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-20"
          >
            {/* Left: Form */}
            <div className="bg-primary border border-secondary/15 p-5 sm:p-8 md:p-12 rounded-sm shadow-sm relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="cf-name" className="font-heading font-extrabold text-eyebrow uppercase tracking-widest text-secondary/70">Full Name</label>
                        <input id="cf-name" required type="text" className={inputClass} placeholder="e.g. Rahul Sharma" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="cf-company" className="font-heading font-extrabold text-eyebrow uppercase tracking-widest text-secondary/70">Company</label>
                        <input id="cf-company" required type="text" className={inputClass} placeholder="e.g. Crystal Group" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="cf-email" className="font-heading font-extrabold text-eyebrow uppercase tracking-widest text-secondary/70">Email Address</label>
                        <input id="cf-email" required type="email" className={inputClass} placeholder="rahul@example.com" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="cf-phone" className="font-heading font-extrabold text-eyebrow uppercase tracking-widest text-secondary/70">Phone Number</label>
                        <input id="cf-phone" required type="tel" className={inputClass} placeholder="+91 98XXX XXXXX" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="cf-service" className="font-heading font-extrabold text-eyebrow uppercase tracking-widest text-secondary/70">I need help with</label>
                      <select id="cf-service" className={`${inputClass} appearance-none cursor-pointer`}>
                        <option>Reefer Container Solutions</option>
                        <option>Cold Storage & Warehousing</option>
                        <option>Refrigerated Transportation</option>
                        <option>Build/BTS Infrastructure</option>
                        <option>3PL & Supply Chain</option>
                        <option>Other / General Query</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="cf-message" className="font-heading font-extrabold text-eyebrow uppercase tracking-widest text-secondary/70">Message / Requirement</label>
                      <textarea id="cf-message" required rows={4} className={`${inputClass} resize-none`} placeholder="Tell us about your cold chain requirement..." />
                    </div>

                    <button
                      disabled={loading}
                      type="submit"
                      className="mt-4 bg-accent text-secondary font-heading font-extrabold text-eyebrow uppercase tracking-[0.2em] py-5 rounded-sm hover:bg-secondary hover:text-primary transition-all duration-300 flex items-center justify-center gap-4 relative overflow-hidden group disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <span className={loading ? 'opacity-0' : 'opacity-100 flex items-center gap-4'}>
                        Submit Requirement <FiSend className="text-lg group-hover:translate-x-1 transition-transform" />
                      </span>
                      {loading && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-5 h-5 border-2 border-secondary/30 border-t-secondary rounded-full animate-spin" />
                        </div>
                      )}
                    </button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-12"
                  >
                    <div className="w-20 h-20 bg-accent/10 text-accent rounded-full flex items-center justify-center mb-8">
                      <FiCheckCircle className="text-4xl" />
                    </div>
                    <h3 className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight-none mb-4">Requirement Received</h3>
                    <p className="font-body text-body-lg text-secondary/60 leading-relaxed max-w-sm mb-12">
                      Thank you for reaching out. A Crystal cold chain specialist will review your request and contact you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="font-heading font-extrabold text-eyebrow uppercase tracking-widest text-accent hover:text-secondary transition-colors"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right: Info */}
            <div className="flex flex-col gap-16">
              <div>
                <LocalSectionHeader head={tc(contactInfo?.headline ?? '')} />
                <div className="flex flex-col gap-6 mt-8">
                  {contactInfo?.phone?.map((p, i) => (
                    <a key={i} href={`tel:${p.replace(/\s/g, '')}`} className="flex items-center gap-6 group">
                      <div className="w-12 h-12 flex items-center justify-center bg-secondary/5 rounded-sm text-secondary group-hover:bg-secondary group-hover:text-accent transition-all duration-300">
                        <FiPhone className="text-xl" />
                      </div>
                      <span className="font-heading font-extrabold text-h3 text-secondary tracking-tight group-hover:text-accent transition-colors">{p}</span>
                    </a>
                  ))}
                  <a href={`mailto:${contactInfo?.email}`} className="flex items-center gap-6 group">
                    <div className="w-12 h-12 flex items-center justify-center bg-secondary/5 rounded-sm text-secondary group-hover:bg-secondary group-hover:text-accent transition-all duration-300">
                      <FiMail className="text-xl" />
                    </div>
                    <span className="font-heading font-extrabold text-h3 text-secondary lowercase tracking-tight group-hover:text-accent transition-colors">{contactInfo?.email}</span>
                  </a>
                </div>
              </div>

              <div>
                <LocalSectionHeader head={tc(officesSection?.headline ?? '')} />
                <div className="grid grid-cols-1 gap-6 mt-8">
                  {officesSection?.locations?.map((loc, i) => (
                    <div key={i} className="flex gap-6 group p-4 border border-transparent hover:border-secondary/10 rounded-sm transition-all duration-500">
                      <div className="w-10 h-10 shrink-0 flex items-center justify-center bg-accent text-secondary rounded-sm">
                        <FiMapPin className="text-lg" />
                      </div>
                      <div className="flex flex-col gap-1">
                        <span className="font-heading font-extrabold text-eyebrow text-accent uppercase tracking-widest">{loc.type}</span>
                        <h4 className="font-heading font-extrabold text-h3 text-secondary tracking-tight leading-tight-none">{loc.city}</h4>
                        <p className="font-body text-body-md text-secondary/50 leading-relaxed font-medium">{loc.address}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
