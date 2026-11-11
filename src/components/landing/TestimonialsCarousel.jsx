import { useRef, useState } from 'react'
import { testimonials } from '../../data/content.js'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function TestimonialsCarousel() {
  const trackRef = useRef(null)
  const [active, setActive] = useState(0)

  const scrollToIndex = (index) => {
    const track = trackRef.current
    if (!track) return
    const clamped = Math.min(Math.max(index, 0), testimonials.length - 1)
    const card = track.children[clamped]
    if (card) {
      track.scrollTo({ left: card.offsetLeft - track.offsetLeft, behavior: 'smooth' })
    }
    setActive(clamped)
  }

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.children[0]?.offsetWidth ?? 1
    const index = Math.round(track.scrollLeft / (cardWidth + 16))
    setActive(Math.min(Math.max(index, 0), testimonials.length - 1))
  }

  return (
    <section className="bg-taupe-900 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <SectionHeading
          light
          eyebrow="Depoimentos"
          title="O que as famílias estão dizendo"
          subtitle="Relatos de quem já usa as atividades em casa."
        />

        <div className="relative">
          {/* Setas — navegação no desktop */}
          <button
            type="button"
            onClick={() => scrollToIndex(active - 1)}
            aria-label="Depoimento anterior"
            className="absolute left-0 top-1/2 z-10 hidden -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full bg-white p-2.5 text-taupe-700 shadow-soft transition hover:scale-105 sm:flex disabled:opacity-30"
            disabled={active === 0}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m15 6-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(active + 1)}
            aria-label="Próximo depoimento"
            className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-4 items-center justify-center rounded-full bg-white p-2.5 text-taupe-700 shadow-soft transition hover:scale-105 sm:flex disabled:opacity-30"
            disabled={active === testimonials.length - 1}
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>

          {/* [DEPOIMENTOS REAIS]: substituir pelos depoimentos em src/data/content.js — nomes e prints só com autorização */}
          <div
            ref={trackRef}
            onScroll={onScroll}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-1 py-2"
          >
            {testimonials.map((item, i) => (
              <Reveal
                key={item.id}
                delay={i * 100}
                className="flex aspect-[9/16] w-[78%] shrink-0 snap-center items-center justify-center overflow-hidden rounded-3xl bg-white p-6 text-center shadow-soft sm:w-[42%] lg:w-[30%]"
              >
                <span className="font-display text-lg font-semibold text-taupe-900/60">{item.text}</span>
              </Reveal>
            ))}
          </div>

          <div className="mt-5 flex justify-center gap-2 sm:hidden">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Ir para depoimento ${i + 1}`}
                onClick={() => scrollToIndex(i)}
                className={`h-2 rounded-full transition-all ${active === i ? 'w-6 bg-white' : 'w-2 bg-white/35'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
