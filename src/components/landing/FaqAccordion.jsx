import { useState } from 'react'
import { faqItems } from '../../data/content.js'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-2xl px-5 sm:px-8">
        <SectionHeading eyebrow="Dúvidas frequentes" title="Perguntas que toda mãe faz antes de comprar" />

        <div className="flex flex-col gap-3">
          {faqItems.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <Reveal key={item.q} delay={i * 60} className="overflow-hidden rounded-2xl border border-pink-100 bg-cream-100">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? -1 : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="font-display text-sm font-semibold text-pink-900 sm:text-base">{item.q}</span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pink-500 text-white transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-pink-900/70 sm:text-base">{item.a}</p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
