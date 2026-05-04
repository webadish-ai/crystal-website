import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useCmsData } from '../../hooks/useCmsData'

interface Spec    { label: string; value: string }
interface Props {
  hero_headline:    string
  hero_subheadline: string
  hero_image:       string
  overview:         string
  specs:            Spec[]
  features:         string[]
  cta_headline:     string
  cta_text:         string
  cta_href:         string
  _lpSlug?:         string
}

export default function StoreProductTemplate(props: Props) {
  const { _lpSlug, ...rest } = props
  const p = useCmsData<Omit<Props, '_lpSlug'>>(_lpSlug ?? '', rest)
  return (
    <div className="w-full min-h-screen bg-canvas font-body">

      {/* Hero */}
      <section
        className="relative w-full h-[100vh] flex items-end pb-10 sm:pb-16 px-4 sm:px-8 md:px-20 bg-secondary overflow-hidden"
      >
        {p.hero_image && (
          <img src={p.hero_image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-40" />
        )}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(15,40,84,0.85)_0%,rgba(15,40,84,0.5)_60%,transparent_100%)]" />
        <div className="relative z-10 max-w-2xl">
          <p className="font-body text-[11px] font-semibold uppercase tracking-[0.2em] text-accent mb-4">Crystal Group</p>
          <h1 className="font-heading font-extrabold text-[32px] sm:text-[44px] md:text-[64px] leading-none text-white mb-4 sm:mb-5">
            {p.hero_headline}
          </h1>
          <p className="font-body text-[14px] sm:text-[16px] text-white/70 leading-relaxed max-w-xl">
            {p.hero_subheadline}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-10 sm:py-16 px-4 sm:px-8 md:px-20 max-w-4xl mx-auto">
        <p className="font-body text-[15px] sm:text-[16px] text-secondary/70 leading-relaxed">{p.overview}</p>
      </section>

      {/* Specs */}
      {p.specs?.length > 0 && (
        <section className="py-10 sm:py-12 px-4 sm:px-8 md:px-20 bg-secondary/4">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-bold text-[22px] sm:text-[28px] text-secondary mb-6 sm:mb-8">Specifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-secondary/10">
              {p.specs.map((s, i) => (
                <div key={i} className="bg-canvas px-4 sm:px-6 py-3 sm:py-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0">
                  <span className="font-body text-[12px] sm:text-[13px] font-semibold text-secondary/50 uppercase tracking-wider">{s.label}</span>
                  <span className="font-heading font-bold text-[14px] sm:text-[15px] text-secondary">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features */}
      {p.features?.length > 0 && (
        <section className="py-10 sm:py-16 px-4 sm:px-8 md:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-bold text-[22px] sm:text-[28px] text-secondary mb-6 sm:mb-8">Key Features</h2>
            <div className="flex flex-col gap-4">
              {p.features.map((f, i) => (
                <div key={i} className="flex items-start gap-4 py-4 border-b border-secondary/8">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                  <p className="font-body text-[14px] sm:text-[15px] text-secondary/80 leading-relaxed">{f}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 md:px-20 bg-secondary text-white text-center">
        <h2 className="font-heading font-extrabold text-[26px] sm:text-[32px] md:text-[40px] text-white mb-6">{p.cta_headline}</h2>
        <a href={p.cta_href}
          className="inline-flex items-center gap-2 bg-accent text-secondary font-heading font-extrabold text-[13px] uppercase tracking-[0.15em] px-6 sm:px-8 py-4 hover:bg-accent/80 transition-colors">
          {p.cta_text} <FiArrowRight />
        </a>
      </section>

    </div>
  )
}
