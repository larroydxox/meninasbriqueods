import { heroContent } from '../../data/content.js'
import PrimaryButton from '../ui/PrimaryButton.jsx'
import Reveal from '../ui/Reveal.jsx'
import VslPlayer from './VslPlayer.jsx'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-100 via-cream-50 to-cream-50 pb-14 pt-8 sm:pt-12">
      {/* Blobs decorativos */}
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-lilac-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-40 h-64 w-64 rounded-full bg-gold-300/40 blur-3xl" />

      {/* Mobile: texto → VSL → botão. Desktop: texto + botão à esquerda, VSL à direita. */}
      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 justify-items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-x-14 lg:gap-y-7">
        <Reveal className="flex w-full flex-col items-center text-center lg:col-start-1 lg:row-start-1 lg:items-start lg:self-end lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-brand-600 shadow-softer">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M12 2 3 6v6c0 5 3.8 9 9 10 5.2-1 9-5 9-10V6l-9-4Z" />
            </svg>
            {heroContent.eyebrow}
          </span>

          <h1 className="mt-4 text-3xl leading-[1.12] text-brand-900 sm:text-4xl lg:text-[2.6rem]">
            {heroContent.headline}
          </h1>

          <p className="mt-4 max-w-md text-base text-brand-900/70 sm:text-lg">{heroContent.subheadline}</p>

          <ul className="mt-6 flex w-full max-w-md flex-col gap-2.5 text-left">
            {heroContent.checklist.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-brand-900 sm:text-base">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500 text-white">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                    <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="w-full lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
          <VslPlayer />
        </Reveal>

        <Reveal delay={200} className="w-full lg:col-start-1 lg:row-start-2 lg:self-start">
          <div className="flex w-full flex-col items-center gap-3 lg:items-start">
            <PrimaryButton href="#oferta" className="w-full sm:w-auto">
              {heroContent.ctaLabel}
            </PrimaryButton>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-brand-900/60">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-lilac-500" fill="currentColor" aria-hidden="true">
                <path d="M12 1 4 4v6c0 5.2 3.4 9.4 8 11 4.6-1.6 8-5.8 8-11V4l-8-3Zm-1.2 14.6L7 11.8l1.4-1.4 2.4 2.4 5-5 1.4 1.4-6.4 6.4Z" />
              </svg>
              {heroContent.secureLabel}
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
