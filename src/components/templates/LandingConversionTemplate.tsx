import React, { useState } from 'react'
import { useCmsData } from '../../hooks/useCmsData'

// ── Types ─────────────────────────────────────────────────────────────────────

interface PricingLine { label: string; value: string; note?: string }
interface GalleryItem { image: string; label: string }
interface Testimonial { company: string; logo?: string; color?: string; text: string }

interface Props {
  _template?: string
  _lpSlug?: string
  meta_title?: string
  meta_description?: string
  topbar_whatsapp?: string
  topbar_phone?: string
  hero_eyebrow?: string
  hero_heading?: string
  hero_image?: string
  hero_pricing?: PricingLine[]
  hero_disclaimer?: string
  form_heading?: string
  form_service?: string
  form_submit_label?: string
  form_disclaimer?: string
  locations?: string[]
  gallery?: GalleryItem[]
  usp_heading?: string
  usp_points?: string[]
  usp_cta_label?: string
  usp_cta_href?: string
  serve_heading?: string
  serve_items?: string[]
  testimonials_heading?: string
  testimonials_subheading?: string
  testimonials?: Testimonial[]
  sticky_cta_label?: string
  sticky_cta_href?: string
  footer_note?: string
  footer_phone?: string
}

// ── Inline SVG icons ──────────────────────────────────────────────────────────

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.125.558 4.122 1.533 5.857L.057 23.882a.5.5 0 0 0 .613.613l6.101-1.459A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.882a9.882 9.882 0 0 1-5.042-1.377l-.361-.214-3.742.895.909-3.652-.235-.373A9.842 9.842 0 0 1 2.118 12C2.118 6.532 6.532 2.118 12 2.118S21.882 6.532 21.882 12 17.468 21.882 12 21.882z" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0" aria-hidden="true">
      <path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1C10.61 21 3 13.39 3 4c0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.24 1.02l-2.21 2.2z" />
    </svg>
  )
}

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

// ── Defaults ──────────────────────────────────────────────────────────────────

const D: Required<Props> = {
  _template: 'landing-conversion',
  _lpSlug: '',
  meta_title: 'Crystal Group',
  meta_description: '',
  topbar_whatsapp: 'https://wa.me/919876543210',
  topbar_phone: '+91 98765 43210',
  hero_eyebrow: 'Crystal Group · Karnataka',
  hero_heading: 'Reefer Container <strong>Rental & Leasing</strong>',
  hero_image: '',
  hero_pricing: [
    { label: 'Rental from', value: '₹1,300/day', note: '*GST extra' },
    { label: 'Leasing from', value: '₹28,000/month', note: '*T&C apply' },
  ],
  hero_disclaimer: '*Prices indicative. Final quote based on container size, duration and location.',
  form_heading: 'Get a Free Quote',
  form_service: 'Reefer Container Rental',
  form_submit_label: 'Request Quote',
  form_disclaimer: 'We\'ll call you within 2 business hours. No spam, ever.',
  locations: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubli', 'Belagavi', 'Tumkur', 'Davangere'],
  gallery: [
    { image: '', label: '20 ft Reefer Container' },
    { image: '', label: '40 ft Reefer Container' },
    { image: '', label: 'Temperature Control Panel' },
    { image: '', label: 'Interior Cold Storage' },
    { image: '', label: 'Loading & Unloading' },
    { image: '', label: 'Fleet at Depot' },
  ],
  usp_heading: 'Why Crystal Group for Reefer Containers?',
  usp_points: [
    '<strong>Pan-Karnataka fleet</strong> — containers available across 7+ cities with same-week delivery.',
    '<strong>-25°C to +15°C</strong> range — suitable for pharma, dairy, seafood, horticulture and ice cream.',
    '<strong>24/7 monitoring</strong> — remote temperature tracking with alerts on every unit.',
    '<strong>Flexible terms</strong> — rent for a single day or lease for 12 months. No lock-in penalties.',
    '<strong>FSSAI-compliant</strong> containers, maintained and sanitised between every assignment.',
  ],
  usp_cta_label: 'Enquire Now',
  usp_cta_href: '#enquire',
  serve_heading: 'Industries We Serve',
  serve_items: [
    'Pharmaceuticals & Vaccines',
    'Dairy & Milk Products',
    'Seafood & Marine Exports',
    'Fresh Fruits & Vegetables',
    'Ice Cream & Frozen Desserts',
    'Event & Hospitality Catering',
    'Floriculture & Nurseries',
    'Chemical & Specialty Cargo',
  ],
  testimonials_heading: 'Trusted by Industry Leaders',
  testimonials_subheading: 'Businesses across Karnataka rely on Crystal Group for reliable cold chain logistics.',
  testimonials: [
    {
      company: 'Nandi Dairy Pvt. Ltd.',
      logo: '',
      color: '#0F2854',
      text: 'Crystal Group\'s reefer containers have been a game-changer for our inter-city milk distribution. Temperature consistency is excellent and the team is always responsive.',
    },
    {
      company: 'BioMed Pharma, Bengaluru',
      logo: '',
      color: '#1A5276',
      text: 'We needed last-minute cold chain capacity for a clinical trial consignment. Crystal Group arranged two 20 ft reefers within 48 hours. Impeccable service.',
    },
    {
      company: 'Coastal Catch Exports, Mangaluru',
      logo: '',
      color: '#0E6655',
      text: 'Reliable, hygienic, and competitively priced. Our seafood quality during transit has improved significantly since we moved to Crystal Group containers.',
    },
    {
      company: 'FreshMart Retail Chain',
      logo: '',
      color: '#784212',
      text: 'We lease three 40 ft reefers on a monthly basis for our distribution hub. The remote monitoring feature gives us complete peace of mind.',
    },
  ],
  sticky_cta_label: 'Get Quote',
  sticky_cta_href: '#enquire',
  footer_note: '© 2025 Crystal Group. All rights reserved. Reefer container rental & leasing across Karnataka.',
  footer_phone: '+91 98765 43210',
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function LandingConversionTemplate(rawProps: Props) {
  const { _lpSlug, ...staticProps } = rawProps
  const liveProps = useCmsData<Omit<Props, '_lpSlug'>>(_lpSlug ?? '', staticProps)
  const p: Required<Props> = { ...D, ...liveProps }

  // Form state
  const [formData, setFormData] = useState({
    company: '',
    name: '',
    phone: '',
    email: '',
    message: '',
  })
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState('')
  const [testimonialIdx, setTestimonialIdx] = useState(0)

  const testimonials = p.testimonials ?? []
  const gallery = p.gallery ?? []
  const locations = p.locations ?? []

  function handleInput(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormState('submitting')
    setFormError('')
    try {
      const res = await fetch('/api/enquiries/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          service: p.form_service,
        }),
      })
      if (!res.ok) {
        const json = await res.json().catch(() => ({}))
        throw new Error((json as { error?: string }).error || 'Something went wrong. Please try again.')
      }
      setFormState('success')
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setFormState('error')
    }
  }

  const prevTestimonial = () =>
    setTestimonialIdx(i => (i - 1 + testimonials.length) % testimonials.length)
  const nextTestimonial = () =>
    setTestimonialIdx(i => (i + 1) % testimonials.length)

  // Visible testimonial indices for desktop 3-up view
  function visibleIndices(total: number, center: number, count: number): number[] {
    const indices: number[] = []
    for (let offset = 0; offset < count; offset++) {
      indices.push((center + offset) % total)
    }
    return indices
  }

  const desktopVisible = testimonials.length >= 3
    ? visibleIndices(testimonials.length, testimonialIdx, 3)
    : testimonials.map((_, i) => i)

  return (
    <div className="w-full min-h-screen bg-primary font-body relative">

      {/* ── 1. Topbar ───────────────────────────────────────────────────────── */}
      <header className="w-full bg-white border-b border-secondary/10 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 sm:px-8 py-3 max-w-7xl mx-auto gap-3">

          {/* Brand */}
          <span className="font-heading font-bold text-secondary text-[15px] sm:text-[17px] tracking-tight whitespace-nowrap">
            Crystal Group
          </span>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={p.topbar_whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded text-white text-[12px] sm:text-[13px] font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#25D366' }}
            >
              <WhatsAppIcon />
              <span className="hidden xs:inline">WhatsApp</span>
              <span className="xs:hidden">Chat</span>
            </a>
            <a
              href={`tel:${p.topbar_phone.replace(/\s/g, '')}`}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded bg-secondary text-white text-[12px] sm:text-[13px] font-semibold transition-opacity hover:opacity-90"
            >
              <PhoneIcon />
              <span>{p.topbar_phone}</span>
            </a>
          </div>
        </div>
      </header>

      {/* ── 2. Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-14">
          <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

            {/* Left: copy */}
            <div className="flex-1 min-w-0">
              {p.hero_eyebrow && (
                <p className="text-eyebrow font-semibold uppercase tracking-eyebrow text-accent mb-3">
                  {p.hero_eyebrow}
                </p>
              )}
              <h1
                className="font-heading font-extrabold text-h1 text-secondary leading-tight mb-6"
                dangerouslySetInnerHTML={{ __html: p.hero_heading }}
              />

              {/* Pricing lines */}
              {(p.hero_pricing ?? []).length > 0 && (
                <div className="flex flex-col gap-3 mb-5">
                  {(p.hero_pricing ?? []).map((line, i) => (
                    <div key={i} className="flex items-baseline gap-2 flex-wrap">
                      <span className="font-heading font-bold text-secondary text-[14px] sm:text-[15px]">
                        {line.label}:
                      </span>
                      <span className="font-heading font-extrabold text-accent text-[22px] sm:text-[28px] leading-none">
                        {line.value}
                      </span>
                      {line.note && (
                        <span className="text-secondary/50 text-[12px]">{line.note}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {p.hero_disclaimer && (
                <p className="text-secondary/50 text-[11px] sm:text-[12px] leading-relaxed max-w-md">
                  {p.hero_disclaimer}
                </p>
              )}

              <div className="mt-6">
                <a
                  href="#enquire"
                  className="inline-block bg-accent text-secondary font-heading font-bold px-6 py-3 rounded text-[14px] sm:text-[15px] hover:opacity-90 transition-opacity"
                >
                  Get a Free Quote
                </a>
              </div>
            </div>

            {/* Right: image */}
            <div className="w-full md:w-[480px] shrink-0">
              {p.hero_image ? (
                <img
                  src={p.hero_image}
                  alt={p.hero_eyebrow || 'Product image'}
                  className="w-full rounded-lg border border-secondary/10 object-cover"
                  style={{ aspectRatio: '4/3' }}
                />
              ) : (
                <div
                  className="w-full rounded-lg border-2 border-dashed border-secondary/20 bg-secondary/5 flex items-center justify-center text-secondary/30 text-[13px]"
                  style={{ aspectRatio: '4/3' }}
                >
                  Product image
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Enquiry Form ─────────────────────────────────────────────────── */}
      <section id="enquire" className="w-full bg-secondary py-10 sm:py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-8">
          <h2 className="font-heading font-bold text-white text-h2 text-center mb-8">
            {p.form_heading}
          </h2>

          {formState === 'success' ? (
            <div className="bg-white/10 border border-white/20 rounded-lg p-8 text-center">
              <div className="text-4xl mb-3">✅</div>
              <p className="font-heading font-bold text-white text-[20px] mb-2">Thank you! We'll be in touch.</p>
              <p className="text-white/70 text-[14px]">
                One of our team members will call you within 2 business hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-3">
                <div className="flex flex-col gap-1">
                  <label className="text-white/60 text-[11px] uppercase tracking-wider font-semibold" htmlFor="lc-company">
                    Company Name
                  </label>
                  <input
                    id="lc-company"
                    name="company"
                    type="text"
                    placeholder="Your company"
                    value={formData.company}
                    onChange={handleInput}
                    className="w-full rounded px-3 py-2.5 text-white placeholder-white/40 text-[13px] border border-white/10 bg-white/15 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-white/60 text-[11px] uppercase tracking-wider font-semibold" htmlFor="lc-name">
                    Your Name
                  </label>
                  <input
                    id="lc-name"
                    name="name"
                    type="text"
                    placeholder="Full name"
                    required
                    value={formData.name}
                    onChange={handleInput}
                    className="w-full rounded px-3 py-2.5 text-white placeholder-white/40 text-[13px] border border-white/10 bg-white/15 focus:outline-none focus:border-accent transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-white/60 text-[11px] uppercase tracking-wider font-semibold" htmlFor="lc-phone">
                    Phone
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center gap-1 px-2.5 py-2.5 bg-white/10 border border-white/10 border-r-0 rounded-l text-white/70 text-[13px] whitespace-nowrap shrink-0">
                      🇮🇳 +91
                    </span>
                    <input
                      id="lc-phone"
                      name="phone"
                      type="tel"
                      placeholder="98765 43210"
                      required
                      value={formData.phone}
                      onChange={handleInput}
                      className="flex-1 min-w-0 rounded-r px-3 py-2.5 text-white placeholder-white/40 text-[13px] border border-white/10 bg-white/15 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="block text-white/60 text-[11px] uppercase tracking-wider font-semibold mb-1" htmlFor="lc-email">
                  Email
                </label>
                <input
                  id="lc-email"
                  name="email"
                  type="email"
                  placeholder="you@company.com"
                  required
                  value={formData.email}
                  onChange={handleInput}
                  className="w-full rounded px-3 py-2.5 text-white placeholder-white/40 text-[13px] border border-white/10 bg-white/15 focus:outline-none focus:border-accent transition-colors"
                />
              </div>

              <div className="mb-4">
                <label className="block text-white/60 text-[11px] uppercase tracking-wider font-semibold mb-1" htmlFor="lc-message">
                  Comments
                </label>
                <textarea
                  id="lc-message"
                  name="message"
                  placeholder="Container size, duration, delivery location, temperature requirements…"
                  rows={3}
                  value={formData.message}
                  onChange={handleInput}
                  className="w-full rounded px-3 py-2.5 text-white placeholder-white/40 text-[13px] border border-white/10 bg-white/15 focus:outline-none focus:border-accent transition-colors resize-none"
                />
              </div>

              {formState === 'error' && formError && (
                <p className="text-red-300 text-[13px] mb-3">⚠ {formError}</p>
              )}

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <button
                  type="submit"
                  disabled={formState === 'submitting'}
                  className="w-full sm:w-auto px-8 py-3 bg-accent text-secondary font-heading font-bold text-[14px] rounded hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {formState === 'submitting' ? 'Sending…' : p.form_submit_label}
                </button>
                {p.form_disclaimer && (
                  <p className="text-white/50 text-[11px] leading-relaxed">
                    {p.form_disclaimer}
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </section>

      {/* ── 4. Locations Strip ──────────────────────────────────────────────── */}
      {locations.length > 0 && (
        <section className="w-full bg-white border-y border-secondary/10 py-4 px-4">
          <p className="text-center text-secondary/70 text-[12px] sm:text-[13px]">
            <span className="mr-1.5">📍</span>
            {locations.join('  |  ')}
          </p>
        </section>
      )}

      {/* ── 5. Gallery ──────────────────────────────────────────────────────── */}
      {gallery.length > 0 && (
        <section className="bg-white py-8 sm:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              {gallery.map((item, i) => (
                <div key={i} className="relative overflow-hidden rounded-lg bg-secondary/10" style={{ aspectRatio: '4/3' }}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.label}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-secondary/8">
                      <span className="text-secondary/30 text-[12px] text-center px-3">{item.label}</span>
                    </div>
                  )}
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  {/* Label */}
                  <span className="absolute bottom-2.5 left-3 right-3 text-white text-[11px] sm:text-[12px] font-semibold leading-tight drop-shadow">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 6. USP + We Serve ───────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-secondary/15">

            {/* Left: USP */}
            <div className="flex-1 md:pr-10">
              <h2 className="font-heading font-bold text-h2 text-secondary mb-5">
                {p.usp_heading}
              </h2>
              <ul className="flex flex-col gap-3 mb-7">
                {(p.usp_points ?? []).map((point, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="mt-1 shrink-0 w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg viewBox="0 0 12 12" fill="none" className="w-3 h-3" aria-hidden="true">
                        <path d="M2 6l3 3 5-5" stroke="#FAC212" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    <span
                      className="text-secondary/80 text-[13px] sm:text-[14px] leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: point }}
                    />
                  </li>
                ))}
              </ul>
              {p.usp_cta_href && (
                <a
                  href={p.usp_cta_href}
                  className="inline-block bg-secondary text-white font-heading font-semibold px-6 py-3 rounded text-[13px] sm:text-[14px] hover:opacity-90 transition-opacity"
                >
                  {p.usp_cta_label}
                </a>
              )}
            </div>

            {/* Right: We Serve */}
            <div className="flex-1 md:pl-10 pt-8 md:pt-0">
              <div className="bg-secondary/5 rounded-lg p-6 sm:p-8 h-full">
                <h3 className="font-heading font-bold text-h3 text-secondary mb-4">
                  {p.serve_heading}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {(p.serve_items ?? []).map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-secondary/75 text-[13px] sm:text-[14px]">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Testimonials ─────────────────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="py-10 sm:py-14" style={{ backgroundColor: 'rgba(15,40,84,0.03)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-8">

            <div className="text-center mb-8 sm:mb-10">
              <h2 className="font-heading font-bold text-h2 text-secondary mb-2">
                {p.testimonials_heading}
              </h2>
              {p.testimonials_subheading && (
                <p className="text-secondary/60 text-[14px] sm:text-[15px] max-w-xl mx-auto">
                  {p.testimonials_subheading}
                </p>
              )}
            </div>

            {/* Carousel */}
            <div className="relative">
              <div className="flex items-stretch gap-4">

                {/* Prev button */}
                <button
                  onClick={prevTestimonial}
                  aria-label="Previous testimonial"
                  className="shrink-0 self-center w-9 h-9 rounded-full border border-secondary/20 bg-white flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors"
                >
                  <ChevronLeftIcon />
                </button>

                {/* Cards */}
                <div className="flex-1 min-w-0">
                  {/* Mobile: single card */}
                  <div className="block md:hidden">
                    {(() => {
                      const t = testimonials[testimonialIdx]
                      return (
                        <TestimonialCard key={testimonialIdx} testimonial={t} />
                      )
                    })()}
                  </div>

                  {/* Desktop: up to 3 cards */}
                  <div className="hidden md:grid md:grid-cols-3 gap-4">
                    {desktopVisible.map((idx) => (
                      <TestimonialCard key={idx} testimonial={testimonials[idx]} />
                    ))}
                  </div>
                </div>

                {/* Next button */}
                <button
                  onClick={nextTestimonial}
                  aria-label="Next testimonial"
                  className="shrink-0 self-center w-9 h-9 rounded-full border border-secondary/20 bg-white flex items-center justify-center text-secondary hover:bg-secondary hover:text-white transition-colors"
                >
                  <ChevronRightIcon />
                </button>
              </div>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIdx(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === testimonialIdx
                        ? 'bg-secondary w-5'
                        : 'bg-secondary/25 hover:bg-secondary/50'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 8. Sticky CTA ───────────────────────────────────────────────────── */}
      {p.sticky_cta_href && (
        <a
          href={p.sticky_cta_href}
          aria-label={p.sticky_cta_label}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-50 bg-secondary text-accent font-heading font-bold py-4 px-3 shadow-lg hover:opacity-90 transition-opacity rounded-l-lg"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed', fontSize: '12px', letterSpacing: '0.1em' }}
        >
          {p.sticky_cta_label}
        </a>
      )}

      {/* ── 9. Footer ───────────────────────────────────────────────────────── */}
      <footer className="py-6 text-center" style={{ backgroundColor: 'rgba(15,40,84,0.06)' }}>
        {p.footer_note && (
          <p className="text-secondary/50 text-[11px] sm:text-[12px] mb-1">{p.footer_note}</p>
        )}
        {p.footer_phone && (
          <a
            href={`tel:${p.footer_phone.replace(/\s/g, '')}`}
            className="text-secondary/50 text-[11px] sm:text-[12px] hover:text-secondary/80 transition-colors"
          >
            {p.footer_phone}
          </a>
        )}
      </footer>

    </div>
  )
}

// ── Testimonial Card sub-component ────────────────────────────────────────────

function TestimonialCard({ testimonial: t }: { testimonial: Testimonial }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-secondary/8 p-5 sm:p-6 flex flex-col h-full">
      <div className="flex items-center gap-3 mb-4">
        {t.logo ? (
          <img
            src={t.logo}
            alt={t.company}
            className="w-10 h-10 object-contain rounded"
          />
        ) : (
          <div
            className="w-10 h-10 rounded flex items-center justify-center text-white text-[14px] font-bold shrink-0"
            style={{ backgroundColor: t.color || '#0F2854' }}
          >
            {t.company.charAt(0)}
          </div>
        )}
        <p
          className="font-heading font-bold text-[13px] sm:text-[14px] leading-snug"
          style={{ color: t.color || '#0F2854' }}
        >
          {t.company}
        </p>
      </div>
      <p className="text-secondary/70 text-[13px] sm:text-[14px] leading-relaxed italic flex-1">
        "{t.text}"
      </p>
    </div>
  )
}
