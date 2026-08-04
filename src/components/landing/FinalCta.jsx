import { PRICE } from '../../data/content.js'
import Reveal from '../ui/Reveal.jsx'
import PrimaryButton from '../ui/PrimaryButton.jsx'

export default function FinalCta() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-pink-600 via-pink-500 to-lilac-500 py-16 text-center sm:py-20">
      <div className="pointer-events-none absolute -top-10 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-white/10 blur-3xl" />
      <div className="relative mx-auto flex w-full max-w-2xl flex-col items-center gap-5 px-5 sm:px-8">
        <Reveal>
          <h2 className="text-3xl leading-tight text-white sm:text-4xl">
            Sua filha longe da tela e cheia de imaginação começa hoje
          </h2>
        </Reveal>
        <Reveal delay={100}>
          <p className="max-w-md text-base text-white/85 sm:text-lg">
            De {PRICE.from} por apenas {PRICE.to}, com garantia de 7 dias e acesso imediato.
          </p>
        </Reveal>
        <Reveal delay={180}>
          <PrimaryButton to="/pre-checkout" variant="gold" className="mt-2">
            Quero garantir meu kit agora
          </PrimaryButton>
        </Reveal>
      </div>
    </section>
  )
}
