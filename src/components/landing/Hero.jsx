import { heroContent, CHECKOUT_URL } from '../../data/content.js'
import useLiveViewers from '../../hooks/useLiveViewers.js'
import PrimaryButton from '../ui/PrimaryButton.jsx'
import Reveal from '../ui/Reveal.jsx'
import VslPlayer from './VslPlayer.jsx'

export default function Hero() {
  const viewers = useLiveViewers(heroContent.viewersMin, heroContent.viewersMax)

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-pink-100 via-cream-50 to-cream-50 pb-14 pt-8 sm:pt-12">
      {/* Blobs decorativos */}
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-lilac-200/50 blur-3xl" />
      <div className="pointer-events-none absolute -right-10 top-40 h-64 w-64 rounded-full bg-gold-300/40 blur-3xl" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-5 sm:px-8 lg:flex-row lg:items-center lg:gap-14">
        <Reveal className="order-2 flex w-full flex-col items-center text-center lg:order-1 lg:w-1/2 lg:items-start lg:text-left">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-pink-600 shadow-softer">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true">
              <path d="M12 2 3 6v6c0 5 3.8 9 9 10 5.2-1 9-5 9-10V6l-9-4Z" />
            </svg>
            {heroContent.eyebrow}
          </span>

          <h1 className="mt-4 text-3xl leading-[1.12] text-pink-900 sm:text-4xl lg:text-[2.6rem]">
            {heroContent.headline}
          </h1>

          <p className="mt-4 max-w-md text-base text-pink-900/70 sm:text-lg">{heroContent.subheadline}</p>

          <ul className="mt-6 flex w-full max-w-md flex-col gap-2.5 text-left">
            {heroContent.checklist.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-pink-900 sm:text-base">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-500 text-white">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
                    <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex w-full flex-col items-center gap-3 sm:items-start">
            <PrimaryButton href={CHECKOUT_URL} className="w-full sm:w-auto">
              {heroContent.ctaLabel}
            </PrimaryButton>
            <span className="flex items-center gap-1.5 text-xs font-semibold text-pink-900/60">
              <svg viewBox="0 0 24 24" className="h-4 w-4 text-lilac-500" fill="currentColor" aria-hidden="true">
                <path d="M12 1 4 4v6c0 5.2 3.4 9.4 8 11 4.6-1.6 8-5.8 8-11V4l-8-3Zm-1.2 14.6L7 11.8l1.4-1.4 2.4 2.4 5-5 1.4 1.4-6.4 6.4Z" />
              </svg>
              {heroContent.secureLabel}
            </span>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-pink-900 shadow-softer">
              <span className="flex text-gold-500">
                {'★★★★★'.split('').map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </span>
              {heroContent.rating} <span className="hidden font-medium text-pink-900/60 sm:inline">· {heroContent.ratingLabel}</span>
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-2 text-xs font-bold text-pink-900 shadow-softer">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lilac-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lilac-500" />
              </span>
              {viewers} mães vendo agora
            </span>
          </div>
        </Reveal>

        <Reveal delay={150} className="order-1 w-full lg:order-2 lg:w-1/2">
          <VslPlayer />
        </Reveal>
      </div>
    </section>
  )
}
