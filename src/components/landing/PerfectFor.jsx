import { perfectFor } from '../../data/content.js'
import Reveal from '../ui/Reveal.jsx'

export default function PerfectFor() {
  return (
    <section className="bg-white py-14 sm:py-16">
      <div className="mx-auto w-full max-w-3xl px-5 text-center sm:px-8">
        <Reveal>
          <h2 className="text-2xl text-pink-900 sm:text-3xl">{perfectFor.title}</h2>
        </Reveal>

        <div className="mt-6 flex flex-wrap justify-center gap-2.5">
          {perfectFor.tags.map((tag, i) => (
            <Reveal
              as="span"
              key={tag}
              delay={i * 60}
              className="rounded-full border-2 border-pink-200 bg-pink-50 px-4 py-2 text-sm font-bold text-pink-700 sm:text-base"
            >
              {tag}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
