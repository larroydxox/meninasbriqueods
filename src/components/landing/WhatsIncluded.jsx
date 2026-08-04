import { whatsIncluded } from '../../data/content.js'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

const icons = [
  // casinha
  <path key="a" d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1h-4v-6H9v6H5a1 1 0 0 1-1-1v-8Z" />,
  // personagem
  <g key="b">
    <circle cx="12" cy="8" r="3.2" />
    <path d="M5.5 20a6.5 6.5 0 0 1 13 0" />
  </g>,
  // roupinha
  <path key="c" d="M9 3 12 5l3-2 3 3-2.2 2.2V21H8.2V8.2L6 6l3-3Z" />,
  // bebê
  <g key="d">
    <circle cx="12" cy="7" r="3" />
    <path d="M6 21c0-3.3 2.7-6 6-6s6 2.7 6 6" />
  </g>,
  // atividades
  <path key="e" d="M6 3h9l3 3v15H6V3Zm9 0v3h3M9 12h6M9 16h6" />,
  // uno
  <g key="f">
    <rect x="6" y="4" width="9" height="14" rx="2" transform="rotate(-8 6 4)" />
    <rect x="9" y="6" width="9" height="14" rx="2" />
  </g>,
  // guias em vídeo
  <g key="g">
    <rect x="3" y="5" width="14" height="14" rx="2" />
    <path d="m21 8-4 3 4 3V8Z" />
  </g>,
  // pdf
  <path key="h" d="M6 2h9l3 3v17H6V2Zm2 10h1.5a1.5 1.5 0 1 1 0 3H8v-3Zm5 0h1.5v3H13v-3Zm5 0v3M18 13.5h1" />,
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
              className="flex items-center gap-4 rounded-2xl border border-pink-100 bg-white p-4 shadow-softer transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-pink-100 text-pink-600">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {icons[i % icons.length]}
                </svg>
              </span>
              <div>
                <h3 className="font-display text-sm font-semibold text-pink-900 sm:text-base">{item.title}</h3>
                <p className="mt-0.5 text-xs text-pink-900/65 sm:text-sm">{item.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
