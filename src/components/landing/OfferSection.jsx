import { offerIncludes, offerBadges, PRICE } from '../../data/content.js'
import { images } from '../../assets/index.js'
import useCountdown from '../../hooks/useCountdown.js'
import Reveal from '../ui/Reveal.jsx'
import PrimaryButton from '../ui/PrimaryButton.jsx'
import LazyImage from '../ui/LazyImage.jsx'

const badgeIcons = {
  'Garantia de 7 dias': (
    <path d="M12 2 4 5v6c0 5.2 3.4 9.4 8 11 4.6-1.6 8-5.8 8-11V5l-8-3Zm-1.2 14.6L7 12.8l1.4-1.4 2.4 2.4 5-5 1.4 1.4-6.4 6.4Z" />
  ),
  'Acesso imediato': <path d="M13 2 3 14h7l-1 8 11-14h-7l1-6Z" />,
  'Arquivos digitais': <path d="M6 2h9l3 3v17H6V2Zm2 10h8M8 15h8M8 9h4" />,
  'Compra 100% segura': (
    <path d="M12 2 4 5v6c0 5.2 3.4 9.4 8 11 4.6-1.6 8-5.8 8-11V5l-8-3Zm0 4a3 3 0 0 1 3 3v1h.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1H9v-1a3 3 0 0 1 3-3Zm0 1.6A1.4 1.4 0 0 0 10.6 9v1h2.8V9A1.4 1.4 0 0 0 12 7.6Z" />
  ),
}

export default function OfferSection() {
  const { label } = useCountdown(15)

  return (
    <section id="oferta" className="relative overflow-hidden bg-gradient-to-b from-pink-100 to-white py-16 sm:py-20">
      <div className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <Reveal className="overflow-hidden rounded-[2.25rem] bg-white shadow-soft ring-1 ring-pink-100">
          {/* Faixa de urgência com countdown funcional */}
          <div className="flex flex-col items-center justify-center gap-1.5 bg-pink-900 px-4 py-3 text-center text-white sm:flex-row sm:gap-3">
            <span className="text-xs font-bold uppercase tracking-wide sm:text-sm">Oferta especial termina em</span>
            <span className="rounded-lg bg-white/15 px-3 py-1 font-display text-lg font-bold tabular-nums tracking-wider">
              {label}
            </span>
          </div>

          <div className="flex flex-col gap-8 p-6 sm:p-10 lg:flex-row lg:items-center">
            <div className="flex justify-center lg:w-2/5">
              <LazyImage
                src={images.productBox}
                alt="Caixa do Kit 30 Casinhas de Boneca de Papel para Imprimir"
                className="aspect-[2/3] w-48 object-contain drop-shadow-xl sm:w-56 lg:w-full"
              />
            </div>

            <div className="lg:w-3/5">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-xl font-bold text-pink-900/40 line-through">{PRICE.from}</span>
                <span className="font-display text-5xl font-bold text-pink-600">{PRICE.to}</span>
                <span className="rounded-full bg-lilac-100 px-3 py-1 text-xs font-bold text-lilac-600">pagamento único</span>
              </div>
              <p className="mt-1 text-xs text-pink-900/50">{PRICE.installment}</p>

              <ul className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {offerIncludes.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm font-semibold text-pink-900">
                    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0 text-pink-500" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              <PrimaryButton to="/pre-checkout" className="mt-7 w-full">
                Garantir meu kit por {PRICE.to}
              </PrimaryButton>

              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {offerBadges.map((badge) => (
                  <span key={badge} className="flex flex-col items-center gap-1 rounded-xl bg-pink-50 px-2 py-3 text-center">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-pink-600" fill="currentColor" aria-hidden="true">
                      {badgeIcons[badge]}
                    </svg>
                    <span className="text-[11px] font-bold leading-tight text-pink-900/80">{badge}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
