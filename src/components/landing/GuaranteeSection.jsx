import { guarantee } from '../../data/content.js'
import Reveal from '../ui/Reveal.jsx'

export default function GuaranteeSection() {
  return (
    <section className="bg-lilac-50 py-16 sm:py-20">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 px-5 text-center sm:px-8">
        <Reveal className="flex h-24 w-24 items-center justify-center rounded-full bg-gold-400 shadow-soft animate-float sm:h-28 sm:w-28">
          <svg viewBox="0 0 24 24" className="h-12 w-12 text-pink-900 sm:h-14 sm:w-14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 2 4 5v6c0 5.2 3.4 9.4 8 11 4.6-1.6 8-5.8 8-11V5l-8-3Z" />
            <path d="m8.5 12 2.4 2.4L15.5 9.6" strokeLinecap="round" />
          </svg>
        </Reveal>

        <Reveal delay={100}>
          <h2 className="text-3xl text-pink-900 sm:text-4xl">{guarantee.title}</h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="max-w-xl text-base text-pink-900/70 sm:text-lg">{guarantee.body}</p>
        </Reveal>
      </div>
    </section>
  )
}
