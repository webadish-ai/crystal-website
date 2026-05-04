import React from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { FaLinkedinIn, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import crystalLogo from '../../assets/brand-data/crystal-logo-black.png';
import homepageData from '@data/homepage.json';

const logoSrc = typeof crystalLogo === 'string' ? crystalLogo : (crystalLogo as any).src;

const footer = homepageData.homepage.footer;

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-secondary text-primary pt-16 md:pt-24 pb-10 md:pb-12 overflow-hidden border-t border-primary/5 snap-start shrink-0">
      <div className="container mx-auto px-6 md:px-12 lg:px-16 max-w-[var(--max-width)]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-8">
              <img
                src={logoSrc}
                alt="Crystal Group"
                width={220}
                height={64}
                loading="lazy"
                decoding="async"
                className="h-16 w-auto object-contain brightness-0 invert"
              />
            </div>
            <p className="font-body text-body-md leading-relaxed opacity-80 max-w-[240px] mb-8">
              {footer.tagline}
            </p>
            <div className="flex gap-4">
              {[
                { icon: FaLinkedinIn,  href: 'https://www.linkedin.com/company/crystal-logistic-cool-chain-ltd/',  label: 'LinkedIn'  },
                { icon: FaInstagram,   href: 'https://www.instagram.com/crystalgroup.in',                  label: 'Instagram' },
                { icon: FaYoutube,     href: 'https://www.youtube.com/@CrystalLogisticCoolChainLtd',       label: 'YouTube'   },
                { icon: FaFacebook,    href: 'https://www.facebook.com/crystalgroup.in',                   label: 'Facebook'  },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href || undefined}
                  aria-label={label}
                  {...(!href ? { 'aria-disabled': true, tabIndex: -1 } : { target: '_blank', rel: 'noopener noreferrer' })}
                  className={`w-10 h-10 rounded-full border border-primary/20 flex items-center justify-center hover:bg-accent hover:text-secondary hover:border-accent transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${href ? 'opacity-80 hover:opacity-100' : 'opacity-20 cursor-not-allowed'}`}
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {/* Solutions Links */}
          <div>
            <h4 className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-8">{footer.solutions_label.toUpperCase()}</h4>
            <ul className="space-y-4 font-heading font-extrabold text-sm uppercase tracking-tight">
              {footer.solutions_links.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-primary/80 hover:text-accent transition-colors duration-300 flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {item.label} <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-8">{footer.company_label.toUpperCase()}</h4>
            <ul className="space-y-4 font-heading font-extrabold text-sm uppercase tracking-tight">
              {footer.company_links.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-primary/80 hover:text-accent transition-colors duration-300 flex items-center gap-2 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    {item.label} <FiArrowUpRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="font-body font-bold text-eyebrow uppercase tracking-[0.15em] text-accent mb-8">{footer.contact_label.toUpperCase()}</h4>
            <div className="space-y-6">
              <div className="font-heading font-extrabold">
                <div className="text-body-sm text-primary/50 uppercase tracking-widest mb-2">{footer.contact_office_label}</div>
                <div className="text-body-md opacity-80 leading-snug">
                  {footer.contact_address.split('\n').map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </div>
              </div>
              <div className="font-heading font-extrabold">
                <div className="text-body-sm text-primary/50 uppercase tracking-widest mb-2">{footer.contact_kolkata_label}</div>
                <div className="text-body-md opacity-80 leading-snug">
                  {footer.contact_kolkata_address.split('\n').map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </div>
              </div>
              <div className="font-heading font-extrabold">
                <div className="text-body-sm text-primary/50 uppercase tracking-widest mb-2">{footer.contact_inquiries_label}</div>
                <div className="text-body-md opacity-80">{footer.contact_email}</div>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 md:pt-12 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8 font-body text-body-sm font-bold uppercase tracking-[0.2em] opacity-60 text-center md:text-left">
          <div>&copy; {currentYear} {footer.copyright}</div>
          <div className="flex gap-8">
            {footer.legal_links.map((link) => (
              <a key={link.label} href={link.href} className="hover:text-accent transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">{link.label}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
