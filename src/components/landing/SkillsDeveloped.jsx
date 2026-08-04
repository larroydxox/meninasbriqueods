import { skillsDeveloped } from '../../data/content.js'
import Reveal from '../ui/Reveal.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'

export default function SkillsDeveloped() {
  return (
    <section className="bg-lilac-50 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <SectionHeading eyebrow="Desenvolvimento" title={skillsDeveloped.title} subtitle={skillsDeveloped.subtitle} />

        <ol className="relative flex flex-col gap-7 border-l-2 border-dashed border-lilac-300 pl-7">
          {skillsDeveloped.skills.map((skill, i) => (
            <Reveal as="li" key={skill.title} delay={i * 90} className="relative">
              <span className="absolute -left-[38px] flex h-8 w-8 items-center justify-center rounded-full bg-lilac-500 font-display text-sm font-bold text-white shadow-softer">
                {i + 1}
              </span>
              <h3 className="font-display text-base font-semibold text-pink-900 sm:text-lg">{skill.title}</h3>
              <p className="mt-1 text-sm text-pink-900/70 sm:text-base">{skill.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
