import { bonuses } from '../../data/content.js'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import LazyImage from '../ui/LazyImage.jsx'
import { images } from '../../assets/index.js'

const bonusIcons = {
  clock: (
    <g>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" strokeLinecap="round" />
    </g>
  ),
  scissors: (
    <g>
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <path d="M8.6 8 20 18M8.6 16 20 6" strokeLinecap="round" />
    </g>
  ),
  list: <path d="M6 3h9l3 3v15H6V3Zm3 7h6M9 13.5h6M9 17h4" strokeLinejoin="round" />,
  calendar: (
    <g>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M4 10h16M8.5 3v4M15.5 3v4" strokeLinecap="round" />
    </g>
  ),
}

export default function BonusSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gold-200/60 via-cream-100 to-cream-100 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <SectionHeading eyebrow="Bônus" title={bonuses.title} subtitle={bonuses.subtitle} />

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {bonuses.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 90}
              className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-softer ring-1 ring-brand-100"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-brand-50">
                {item.image ? (
                  <LazyImage src={images[item.image]} alt={item.title} width={480} height={480} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-lilac-200 to-brand-200">
                    <svg viewBox="0 0 24 24" className="h-12 w-12 text-lilac-600" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      {bonusIcons[item.icon]}
                    </svg>
                  </div>
                )}
              </div>
              <div className="flex flex-1 flex-col gap-1 p-3.5">
                <h3 className="font-display text-sm font-semibold leading-tight text-brand-900 sm:text-base">{item.title}</h3>
                <p className="text-xs leading-snug text-brand-900/65 sm:text-sm">{item.text}</p>
                <span className="mt-auto pt-2 text-xs font-bold uppercase tracking-wide text-lilac-600">No Kit Completo</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-8 flex flex-col items-center justify-center gap-2 text-center">
          <span className="rounded-full bg-gold-400 px-5 py-2 font-display text-base font-bold text-brand-900 shadow-softer">
            {bonuses.footerLabel}
          </span>
        </Reveal>
      </div>
    </section>
  )
}
