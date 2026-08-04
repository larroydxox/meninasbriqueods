import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', light = false }) {
  const alignClass = align === 'left' ? 'text-left items-start' : 'text-center items-center'

  return (
    <Reveal as="div" className={`mb-10 flex flex-col gap-3 ${alignClass}`}>
      {eyebrow && (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wide ${
            light ? 'bg-white/15 text-white' : 'bg-pink-100 text-pink-600'
          }`}
        >
          {eyebrow}
        </span>
      )}
      <h2 className={`max-w-2xl text-3xl leading-tight sm:text-4xl ${light ? 'text-white' : 'text-pink-900'}`}>{title}</h2>
      {subtitle && (
        <p className={`max-w-xl text-base sm:text-lg ${light ? 'text-white/85' : 'text-pink-900/70'}`}>{subtitle}</p>
      )}
    </Reveal>
  )
}
