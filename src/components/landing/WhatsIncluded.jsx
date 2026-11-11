import { whatsIncluded } from '../../data/content.js'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const icons = [
  // atividades criativas
  <path key="a" d="M12 3.5 14.2 9l5.8.4-4.5 3.7 1.5 5.6L12 15.6l-5 3.1 1.5-5.6L4 9.4 9.8 9 12 3.5Z" />,
  // lista de materiais
  <path key="b" d="M9 4h6v3H9V4Zm-3 1.5h3M15 5.5h3V21H6V5.5M9 11.5l1.3 1.3 2.4-2.4M9 17h6" />,
  // passo a passo
  <path key="c" d="M5 6h1.5M5 12h1.5M5 18h1.5M10 6h9M10 12h9M10 18h9" />,
  // materiais do dia a dia
  <g key="d">
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="6.5" cy="17.5" r="2.5" />
    <path d="M8.6 8 20 18M8.6 16 20 6" />
  </g>,
  // pdf
  <path key="e" d="M6 2h9l3 3v17H6V2Zm2 10h1.5a1.5 1.5 0 1 1 0 3H8v-3Zm5 0h1.5v3H13v-3Zm5 0v3M18 13.5h1" />,
  // acesso imediato
  <path key="f" d="M13 2 3 14h7l-1 8 11-14h-7l1-6Z" />,
]

export default function WhatsIncluded() {
  return (
    <section className="bg-cream-100 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <SectionHeading eyebrow="Tudo incluso" title={whatsIncluded.title} subtitle={whatsIncluded.subtitle} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {whatsIncluded.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={(i % 4) * 80}
              className="flex items-center gap-4 rounded-2xl border border-brand-100 bg-white p-4 shadow-softer transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-600">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {icons[i % icons.length]}
                </svg>
              </span>
              <div>
                <h3 className="font-display text-sm font-semibold text-brand-900 sm:text-base">{item.title}</h3>
                <p className="mt-0.5 text-xs text-brand-900/65 sm:text-sm">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
