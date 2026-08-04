import { moreThanPdf } from '../../data/content.js'
import Reveal from '../ui/Reveal.jsx'

export default function MoreThanPdf() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <Reveal className="rounded-[2rem] bg-gradient-to-br from-lilac-500 via-lilac-500 to-pink-500 p-8 text-white shadow-soft sm:p-12">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-md">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wide">
                Experiência completa
              </span>
              <h2 className="mt-4 text-3xl leading-tight sm:text-4xl">{moreThanPdf.title}</h2>
              <p className="mt-3 text-base text-white/85 sm:text-lg">{moreThanPdf.body}</p>
            </div>

            <div className="flex flex-col gap-5 lg:w-[46%]">
              {moreThanPdf.points.map((point, i) => (
                <Reveal key={point.title} delay={i * 100} className="flex gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold-400 font-display font-bold text-pink-900">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold">{point.title}</h3>
                    <p className="mt-1 text-sm text-white/80">{point.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
