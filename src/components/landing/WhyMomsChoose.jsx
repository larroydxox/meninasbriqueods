import { whyMomsChoose } from '../../data/content.js'
import { images } from '../../assets/index.js'
import Reveal from '../ui/Reveal.jsx'
import LazyImage from '../ui/LazyImage.jsx'

export default function WhyMomsChoose() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-10 px-5 sm:px-8 lg:flex-row lg:gap-14">
        <Reveal className="w-full max-w-sm lg:w-2/5">
          <div className="relative overflow-hidden rounded-[2rem] shadow-soft">
            <LazyImage src={images.momDaughter} alt="Mãe e filha brincando juntas com as casinhas de papel" className="aspect-square w-full object-cover" />
          </div>
        </Reveal>

        <div className="w-full lg:w-3/5">
          <Reveal>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-pink-100 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-pink-600">
              Confiança de verdade
            </span>
            <h2 className="mt-4 text-3xl leading-tight text-pink-900 sm:text-4xl">{whyMomsChoose.title}</h2>
          </Reveal>

          <ul className="mt-6 flex flex-col gap-3">
            {whyMomsChoose.reasons.map((reason, i) => (
              <Reveal
                as="li"
                key={reason}
                delay={i * 80}
                className="flex items-start gap-3 rounded-2xl bg-pink-50 p-3.5 sm:p-4"
              >
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-500 text-white">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="m5 13 4 4L19 7" />
                  </svg>
                </span>
                <span className="text-sm font-semibold text-pink-900 sm:text-base">{reason}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
