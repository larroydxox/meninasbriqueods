import { offerContent, offerIncludes, offerBadges, PRICE, CHECKOUT_URL } from '../../data/content.js'
import { images } from '../../assets/index.js'
import Reveal from '../ui/Reveal.jsx'
import PrimaryButton from '../ui/PrimaryButton.jsx'
import LazyImage from '../ui/LazyImage.jsx'

const badgeIcons = {
  'Garantia de 7 dias': (
    <path d="M12 2 4 5v6c0 5.2 3.4 9.4 8 11 4.6-1.6 8-5.8 8-11V5l-8-3Zm-1.2 14.6L7 12.8l1.4-1.4 2.4 2.4 5-5 1.4 1.4-6.4 6.4Z" />
  ),
  'Acesso imediato': <path d="M13 2 3 14h7l-1 8 11-14h-7l1-6Z" />,
  'Arquivos digitais': <path d="M6 2h9l3 3v17H6V2Zm2 10h8M8 15h8M8 9h4" />,
  'Compra segura': (
    <path d="M12 2 4 5v6c0 5.2 3.4 9.4 8 11 4.6-1.6 8-5.8 8-11V5l-8-3Zm0 4a3 3 0 0 1 3 3v1h.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1H9v-1a3 3 0 0 1 3-3Zm0 1.6A1.4 1.4 0 0 0 10.6 9v1h2.8V9A1.4 1.4 0 0 0 12 7.6Z" />
  ),
}

export default function OfferSection() {
  return (
    <section id="oferta" className="bg-gradient-to-b from-lilac-100 via-pink-50 to-cream-50 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <Reveal className="flex flex-col items-center gap-10 lg:flex-row lg:items-stretch lg:gap-12">
          <div className="flex w-full justify-center lg:w-2/5 lg:items-center">
            <LazyImage
              src={images.productBox}
              alt="Caixa do Kit 30 Casinhas de Boneca de Papel para Imprimir"
              className="w-52 drop-shadow-2xl sm:w-64 lg:w-full"
            />
          </div>

          <div className="w-full rounded-[2rem] bg-white p-6 text-center shadow-soft ring-2 ring-lilac-200 sm:p-9 lg:w-3/5 lg:text-left">
            <h2 className="font-display text-2xl font-bold sm:text-3xl">
              <span aria-hidden="true">✨ </span>
              <span className="bg-gradient-to-r from-pink-600 to-lilac-600 bg-clip-text text-transparent">
                {offerContent.title}
              </span>
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-sm text-pink-900/70 sm:text-base lg:mx-0">{offerContent.subtitle}</p>

            <div className="mt-6 flex flex-col items-center gap-0.5 lg:items-start">
              <span className="flex items-baseline gap-2 text-sm text-pink-900/45">
                <span className="line-through">De {PRICE.from}</span>
                <span className="font-bold uppercase tracking-wide text-lilac-600">{offerContent.priceLabel}</span>
              </span>
              <span className="font-display text-5xl font-bold text-pink-600">R$ {PRICE.to.replace('R$', '')},00</span>
              <span className="text-xs font-semibold text-pink-900/50">{offerContent.installmentLabel}</span>
            </div>

            <ul className="mx-auto mt-7 grid max-w-sm grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2 lg:mx-0 lg:max-w-none">
              {offerIncludes.map((item, i) => (
                <li key={item} className="flex items-center gap-2.5 text-left text-sm font-semibold text-pink-900">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white ${
                      i % 2 === 0 ? 'bg-pink-500' : 'bg-lilac-500'
                    }`}
                  >
                    <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m5 13 4 4L19 7" />
                    </svg>
                  </span>
                  {item}
                </li>
              ))}
            </ul>

            <PrimaryButton href={CHECKOUT_URL} variant="bloom" icon={false} className="mt-8 w-full">
              <span aria-hidden="true">✨ </span>
              {offerContent.ctaLabel}
            </PrimaryButton>

            <div className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-x-4 gap-y-2.5 lg:mx-0 lg:max-w-none">
              {offerBadges.map((badge) => (
                <span key={badge} className="flex items-center gap-1.5 text-xs font-semibold text-pink-900/70">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-lilac-500" fill="currentColor" aria-hidden="true">
                    {badgeIcons[badge]}
                  </svg>
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
