import { bonuses } from '../../data/content.js'
import { images } from '../../assets/index.js'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import LazyImage from '../ui/LazyImage.jsx'

export default function BonusSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gold-200/60 via-cream-100 to-cream-100 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <SectionHeading eyebrow="De presente" title={bonuses.title} subtitle={bonuses.subtitle} />

        <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
          {bonuses.items.map((item, i) => (
            <Reveal
              key={item.title}
              delay={i * 90}
              className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-softer ring-1 ring-pink-100"
            >
              <div className="relative aspect-square w-full overflow-hidden bg-pink-50">
                {item.image ? (
                  <LazyImage src={images[item.image]} alt={item.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-lilac-200 to-pink-200">
                    <svg viewBox="0 0 24 24" className="h-12 w-12 text-lilac-600" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                      <path d="M4 11 12 4l8 7v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8Z" strokeLinejoin="round" />
                      <path d="M9 20v-6h6v6" strokeLinejoin="round" />
                    </svg>
                  </div>
                )}
                <span className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-0.5 text-[11px] font-bold text-pink-900/50 line-through">
                  {item.value}
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1 p-3.5">
                <h3 className="font-display text-sm font-semibold leading-tight text-pink-900 sm:text-base">{item.title}</h3>
                <p className="text-xs leading-snug text-pink-900/65 sm:text-sm">{item.text}</p>
                <span className="mt-auto pt-2 text-xs font-bold uppercase tracking-wide text-lilac-600">Grátis hoje</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300} className="mt-8 flex flex-col items-center justify-center gap-2 text-center">
          <span className="text-sm font-semibold text-pink-900/60">
            {bonuses.totalValueLabel}: <span className="line-through">{bonuses.totalValue}</span>
          </span>
          <span className="rounded-full bg-gold-400 px-5 py-2 font-display text-base font-bold text-pink-900 shadow-softer">
            {bonuses.todayLabel} para quem garantir agora
          </span>
        </Reveal>
      </div>
    </section>
  )
}
