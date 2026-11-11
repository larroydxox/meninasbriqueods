import { useState } from 'react'
import { offerSection, offers, offerBadges, CHECKOUT_URL_COMPLETO } from '../../data/content.js'
import Reveal from '../ui/Reveal.jsx'
import PrimaryButton from '../ui/PrimaryButton.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import UpsellModal from './UpsellModal.jsx'

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

function OfferCard({ offer, highlighted = false, ctaProps }) {
  return (
    <div
      className={`relative flex w-full flex-col rounded-[2rem] bg-white p-6 text-center shadow-soft sm:p-9 lg:text-left ${
        highlighted ? 'ring-4 ring-gold-400' : 'ring-2 ring-lilac-200'
      }`}
    >
      {offer.badge && (
        <span className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gold-400 px-4 py-1.5 font-display text-xs font-bold uppercase tracking-wide text-brand-900 shadow-softer sm:text-sm">
          {offer.badge}
        </span>
      )}

      <h2 className="font-display text-2xl font-bold sm:text-3xl">
        <span aria-hidden="true">✨ </span>
        <span className="bg-gradient-to-r from-brand-600 to-lilac-600 bg-clip-text text-transparent">{offer.name}</span>
      </h2>
      <p className="mx-auto mt-3 max-w-sm text-sm text-brand-900/70 sm:text-base lg:mx-0">{offer.subtitle}</p>

      <div className="mt-6 flex flex-col items-center gap-0.5 lg:items-start">
        <span className="text-sm font-bold uppercase tracking-wide text-lilac-600">{offer.priceLabel}</span>
        <span className="font-display text-5xl font-bold text-brand-600">{offer.price}</span>
        <span className="text-xs font-semibold text-brand-900/50">{offer.installmentLabel}</span>
      </div>

      <ul className="mx-auto mb-8 mt-7 flex max-w-sm flex-col gap-3 lg:mx-0 lg:max-w-none">
        {offer.includes.map((item, i) => (
          <li key={item} className="flex items-center gap-2.5 text-left text-sm font-semibold text-brand-900">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white ${
                i % 2 === 0 ? 'bg-brand-500' : 'bg-lilac-500'
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

      <PrimaryButton variant="bloom" icon={false} className="mt-auto w-full sm:w-full" {...ctaProps}>
        <span aria-hidden="true">✨ </span>
        {offer.ctaLabel}
      </PrimaryButton>

      <div className="mx-auto mt-6 grid max-w-sm grid-cols-2 gap-x-4 gap-y-2.5 lg:mx-0 lg:max-w-none">
        {offerBadges.map((badge) => (
          <span key={badge} className="flex items-center gap-1.5 text-left text-xs font-semibold text-brand-900/70">
            <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-lilac-500" fill="currentColor" aria-hidden="true">
              {badgeIcons[badge]}
            </svg>
            {badge}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function OfferSection() {
  const [upsellOpen, setUpsellOpen] = useState(false)

  return (
    <section id="oferta" className="bg-gradient-to-b from-lilac-100 via-brand-50 to-cream-50 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <SectionHeading eyebrow={offerSection.eyebrow} title={offerSection.title} />

        <Reveal className="grid grid-cols-1 items-stretch gap-10 md:grid-cols-2 md:gap-6 lg:gap-8">
          <OfferCard offer={offers.basic} ctaProps={{ onClick: () => setUpsellOpen(true) }} />
          <OfferCard offer={offers.complete} highlighted ctaProps={{ href: CHECKOUT_URL_COMPLETO }} />
        </Reveal>
      </div>

      <UpsellModal open={upsellOpen} />
    </section>
  )
}
