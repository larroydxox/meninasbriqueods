import { guarantee } from '../../data/content.js'
import Reveal from '../ui/Reveal.jsx'

export default function GuaranteeSection() {
  return (
    <section className="bg-cream-50 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-center gap-6 rounded-[2rem] bg-gradient-to-br from-gold-200/70 to-cream-200 p-8 text-center shadow-softer sm:flex-row sm:gap-8 sm:p-10 sm:text-left">
          <div className="flex h-28 w-28 shrink-0 flex-col items-center justify-center rounded-full bg-pink-500 text-white shadow-soft">
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
              <path d="M12 2 4 5v6c0 5.2 3.4 9.4 8 11 4.6-1.6 8-5.8 8-11V5l-8-3Z" />
              <path d="m8.5 12 2.4 2.4L15.5 9.6" strokeLinecap="round" />
            </svg>
            <span className="mt-1 font-display text-xl font-bold leading-none">{guarantee.badgeLabel}</span>
            <span className="text-[10px] font-bold uppercase tracking-wide">{guarantee.badgeCaption}</span>
          </div>

          <div>
            <h2 className="text-2xl text-pink-900 sm:text-3xl">{guarantee.title}</h2>
            <p className="mt-2 text-base font-semibold text-pink-900/80 sm:text-lg">{guarantee.body}</p>
            <p className="mt-1 text-sm text-pink-900/60 sm:text-base">{guarantee.footnote}</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
