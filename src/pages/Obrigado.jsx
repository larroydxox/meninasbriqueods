import { Link } from 'react-router-dom'
import usePaginaPrivada from '../app/usePaginaPrivada.js'

const CONFETES = [
  { dx: '-70px', dy: '-60px', cor: 'bg-sun-400', delay: '0.55s' },
  { dx: '72px', dy: '-52px', cor: 'bg-peach-400', delay: '0.6s' },
  { dx: '-84px', dy: '14px', cor: 'bg-mint-400', delay: '0.65s' },
  { dx: '86px', dy: '20px', cor: 'bg-brand-400', delay: '0.58s' },
  { dx: '-40px', dy: '-86px', cor: 'bg-lilac-400', delay: '0.7s' },
  { dx: '44px', dy: '-88px', cor: 'bg-sun-400', delay: '0.62s' },
  { dx: '-58px', dy: '62px', cor: 'bg-peach-400', delay: '0.68s' },
  { dx: '60px', dy: '66px', cor: 'bg-mint-400', delay: '0.72s' },
]

function IconeConcluido() {
  return (
    <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
      {CONFETES.map((c, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`absolute h-2.5 w-2.5 rounded-sm ${c.cor}`}
          style={{ '--dx': c.dx, '--dy': c.dy, animation: `confetti-burst 1.1s ease-out ${c.delay} both` }}
        />
      ))}
      <span className="absolute inset-2 rounded-full bg-mint-100 animate-pop" aria-hidden="true" />
      <svg viewBox="0 0 96 96" className="relative h-28 w-28" aria-hidden="true">
        <circle
          cx="48"
          cy="48"
          r="36"
          fill="none"
          stroke="var(--color-mint-400)"
          strokeWidth="6"
          strokeLinecap="round"
          className="draw-stroke"
          style={{ '--len': 227, transform: 'rotate(-90deg)', transformOrigin: 'center' }}
        />
        <path
          d="m33 49 10 10 20-22"
          fill="none"
          stroke="var(--color-mint-600)"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="draw-stroke"
          style={{ '--len': 50, animationDelay: '0.45s' }}
        />
      </svg>
    </div>
  )
}

export default function Obrigado() {
  usePaginaPrivada('Obrigado! · Seu kit de atividades chegou')

  return (
    <main className="relative flex min-h-[100svh] items-center overflow-hidden bg-cream-100 px-5 py-10">
      {/* Decoração */}
      <div className="pointer-events-none absolute -left-20 -top-16 h-64 w-64 rounded-full bg-sun-100 blur-2xl" />
      <div className="pointer-events-none absolute -right-16 top-1/3 h-56 w-56 rounded-full bg-brand-100 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-20 left-1/4 h-64 w-64 rounded-full bg-mint-100 blur-2xl" />
      <span className="pointer-events-none absolute left-[12%] top-[14%] text-2xl animate-float" aria-hidden="true">⭐</span>
      <span className="pointer-events-none absolute right-[10%] top-[22%] text-2xl animate-float [animation-delay:1.2s]" aria-hidden="true">🖍️</span>
      <span className="pointer-events-none absolute bottom-[16%] right-[16%] text-2xl animate-float [animation-delay:0.6s]" aria-hidden="true">✂️</span>

      <section className="relative mx-auto w-full max-w-md rounded-[2.25rem] bg-white px-6 py-9 text-center shadow-soft ring-1 ring-brand-100 animate-slide-up sm:px-9">
        <IconeConcluido />

        <h1 className="mt-4 text-[1.75rem] leading-tight text-brand-900 sm:text-3xl">Oba! Seu kit de atividades chegou! 🎉</h1>
        <p className="mt-3 text-base font-semibold text-brand-900/80 sm:text-lg">
          Agora é hora de transformar momentos simples em muita diversão e criatividade!
        </p>
        <p className="mt-3 text-sm leading-relaxed text-brand-900/65 sm:text-base">
          Preparamos um cantinho especial com suas atividades, bônus e vídeos para você aproveitar com seu filho.
        </p>

        <div className="mt-8">
          <Link
            to="/app"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-brand-500 to-lilac-500 px-6 py-5 font-display text-lg font-semibold text-white shadow-soft transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            🎨 Acessar minhas atividades
          </Link>
        </div>

        <p className="mt-5 flex items-center justify-center gap-1.5 text-xs font-semibold text-brand-900/55 sm:text-sm">
          <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-mint-600" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 4v11m0 0-4-4m4 4 4-4M5 19h14" />
          </svg>
          Você pode visualizar ou baixar os materiais quando quiser.
        </p>
      </section>
    </main>
  )
}
