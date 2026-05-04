import React from 'react'
import { FiArrowRight } from 'react-icons/fi'
import { useCmsData } from '../../hooks/useCmsData'

interface Feature { title: string; description: string }
interface Step    { number: string; title: string; description: string }
interface Props {
  hero_headline:    string
  hero_subheadline: string
  hero_image:       string
  intro_headline:   string
  intro_body:       string
  features:         Feature[]
  steps_headline:   string
  steps:            Step[]
  cta_headline:     string
  cta_text:         string
  cta_href:         string
  _lpSlug?:         string
}

export default function ServicePageTemplate(props: Props) {
  const { _lpSlug, ...rest } = props
  const p = useCmsData<Omit<Props, '_lpSlug'>>(_lpSlug ?? '', rest)
  return (
    <div className="w-full min-h-screen bg-canvas font-body">

      {/* Hero */}
      <section className="relative w-full h-[100vh] flex items-end pb-10 sm:pb-16 px-4 sm:px-8 md:px-20 bg-secondary overflow-hidden">
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

      {/* Intro */}
      <section className="py-12 sm:py-20 px-4 sm:px-8 md:px-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading font-bold text-[24px] sm:text-[36px] text-secondary mb-4 sm:mb-6">{p.intro_headline}</h2>
          <div className="font-body text-[15px] sm:text-[16px] text-secondary/70 leading-relaxed" dangerouslySetInnerHTML={{ __html: p.intro_body }} />
        </div>
      </section>

      {/* Features */}
      {p.features?.length > 0 && (
        <section className="py-10 sm:py-16 px-4 sm:px-8 md:px-20 bg-secondary/4">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            {p.features.map((f, i) => (
              <div key={i} className="bg-canvas p-5 sm:p-8 border-t-2 border-accent">
                <h3 className="font-heading font-bold text-[16px] sm:text-[18px] text-secondary mb-3">{f.title}</h3>
                <div className="font-body text-[14px] text-secondary/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: f.description }} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Steps */}
      {p.steps?.length > 0 && (
        <section className="py-12 sm:py-20 px-4 sm:px-8 md:px-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-heading font-bold text-[24px] sm:text-[36px] text-secondary mb-6 sm:mb-12">{p.steps_headline}</h2>
            <div className="flex flex-col gap-0">
              {p.steps.map((s, i) => (
                <div key={i} className="flex gap-3 sm:gap-8 py-5 sm:py-8 border-b border-secondary/8">
                  <span className="font-heading font-extrabold text-[28px] sm:text-[40px] text-accent/30 leading-none w-10 sm:w-16 shrink-0">{s.number}</span>
                  <div>
                    <h3 className="font-heading font-bold text-[16px] sm:text-[20px] text-secondary mb-2">{s.title}</h3>
                    <div className="font-body text-[14px] text-secondary/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: s.description }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 sm:px-8 md:px-20 bg-primary text-white text-center">
        <h2 className="font-heading font-extrabold text-[26px] sm:text-[32px] md:text-[40px] text-white mb-6">{p.cta_headline}</h2>
        <a href={p.cta_href}
          className="inline-flex items-center gap-2 bg-accent text-secondary font-heading font-extrabold text-[13px] uppercase tracking-[0.15em] px-6 sm:px-8 py-4 hover:bg-accent/80 transition-colors">
          {p.cta_text} <FiArrowRight />
        </a>
      </section>

    </div>
  )
}
