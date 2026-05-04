import React from 'react'
import { useCmsData } from '../../hooks/useCmsData'

interface Section { heading: string; body: string }
interface Props {
  headline:  string
  intro:     string
  sections:  Section[]
  _lpSlug?:  string
}

export default function TextPageTemplate(props: Props) {
  const { _lpSlug, ...rest } = props
  const p = useCmsData<Omit<Props, '_lpSlug'>>(_lpSlug ?? '', rest)
  return (
    <div className="w-full min-h-screen bg-canvas font-body">

      {/* Hero */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 px-4 sm:px-8 md:px-20 bg-secondary text-white">
        <div className="max-w-3xl">
          <h1 className="font-heading font-extrabold text-[36px] sm:text-[48px] md:text-[60px] leading-none text-white mb-4 sm:mb-6">
            {p.headline}
          </h1>
          <div className="font-body text-[15px] sm:text-[16px] text-white/60 leading-relaxed" dangerouslySetInnerHTML={{ __html: p.intro }} />
        </div>
      </section>

      {/* Sections */}
      <section className="py-12 sm:py-16 px-4 sm:px-8 md:px-20">
        <div className="max-w-3xl mx-auto flex flex-col gap-10 sm:gap-12">
          {p.sections?.map((s, i) => (
            <div key={i}>
              <h2 className="font-heading font-bold text-[20px] sm:text-[24px] text-secondary mb-3 sm:mb-4">{s.heading}</h2>
              <div className="font-body text-[14px] sm:text-[15px] text-secondary/70 leading-relaxed whitespace-pre-line" dangerouslySetInnerHTML={{ __html: s.body }} />
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
