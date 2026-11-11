import { lessScreens } from '../../data/content.js'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function LessScreens() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <SectionHeading eyebrow="Rotina real" title={lessScreens.title} subtitle={lessScreens.subtitle} />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Reveal className="rounded-3xl border-2 border-brand-200 bg-brand-50 p-6 shadow-softer">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-white">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 13 4 4L19 7" />
                </svg>
              </span>
              <h3 className="font-display text-lg font-semibold text-brand-900">{lessScreens.withoutScreen.label}</h3>
            </div>
            <ul className="mt-4 flex flex-col gap-2.5">
              {lessScreens.withoutScreen.items.map((item) => (
                <li key={item} className="text-sm font-medium text-brand-900/80 sm:text-base">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={120} className="rounded-3xl border-2 border-brand-900/10 bg-cream-200 p-6 opacity-90 shadow-softer">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-900/20 text-brand-900">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </span>
              <h3 className="font-display text-lg font-semibold text-brand-900/70">{lessScreens.withScreen.label}</h3>
            </div>
            <ul className="mt-4 flex flex-col gap-2.5">
              {lessScreens.withScreen.items.map((item) => (
                <li key={item} className="text-sm font-medium text-brand-900/55 sm:text-base">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={200} className="mt-6 flex items-center justify-center gap-2 text-center text-sm font-semibold text-brand-600 sm:text-base">
          {lessScreens.footnote}
        </Reveal>
      </div>
    </section>
  )
}
