import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CHECKOUT_URL, PRICE, preCheckoutOffer } from '../data/content.js'
import { images } from '../assets/index.js'
import ProgressSteps from '../components/precheckout/ProgressSteps.jsx'
import LazyImage from '../components/ui/LazyImage.jsx'
import Reveal from '../components/ui/Reveal.jsx'

export default function PreCheckout() {
  const [step, setStep] = useState(1)
  const [childName, setChildName] = useState('')
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    document.title = 'Você está a um passo · Kit 30 Casinhas de Boneca'
  }, [])

  const trimmedName = childName.trim()
  const displayName = trimmedName || 'sua filha'

  const goToStep2 = () => setStep(2)

  const handleCheckoutClick = () => {
    setRedirecting(true)
    // META PIXEL — disparar evento de início de checkout aqui, ex:
    // fbq('track', 'InitiateCheckout', { content_name: 'Kit 30 Casinhas de Boneca' })
  }

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-pink-100 via-cream-50 to-cream-50">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col px-5 py-6 sm:py-10">
        <Link to="/" className="mb-5 inline-flex items-center gap-1.5 self-start text-xs font-bold text-pink-900/50">
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 6-6 6 6 6" />
          </svg>
          Voltar
        </Link>

        <ProgressSteps step={step} />

        <div className="mt-8 flex-1">
          {step === 1 ? (
            <Reveal key="step1" className="flex flex-col gap-6">
              <div className="text-center">
                <span className="text-4xl">🏡💗</span>
                <h1 className="mt-3 text-2xl leading-tight text-pink-900 sm:text-3xl">Vamos personalizar sua experiência?</h1>
                <p className="mt-2 text-sm text-pink-900/65 sm:text-base">
                  Só mais um detalhe antes de liberar sua oferta especial.
                </p>
              </div>

              <div className="rounded-3xl bg-white p-6 shadow-soft">
                <label htmlFor="child-name" className="text-sm font-bold text-pink-900">
                  Qual o nome da sua filha?
                </label>
                <input
                  id="child-name"
                  type="text"
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Ex: Helena"
                  className="mt-2 w-full rounded-2xl border-2 border-pink-100 bg-cream-50 px-4 py-3.5 text-base text-pink-900 outline-none transition-colors focus:border-pink-400"
                />
                <button
                  type="button"
                  onClick={goToStep2}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 px-7 py-4 font-display text-base font-semibold text-white shadow-soft transition-transform active:scale-[0.98]"
                >
                  Continuar
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={goToStep2}
                  className="mt-3 w-full text-center text-xs font-semibold text-pink-900/40"
                >
                  Prefiro não informar agora
                </button>
              </div>
            </Reveal>
          ) : (
            <Reveal key="step2" className="flex flex-col gap-6">
              <div className="text-center">
                <span className="text-4xl">🎉</span>
                <h1 className="mt-3 text-2xl leading-tight text-pink-900 sm:text-3xl">
                  Perfeito, {displayName} vai amar! 💕
                </h1>
                <p className="mt-2 text-sm text-pink-900/65 sm:text-base">
                  Sua oferta está reservada. Falta só finalizar a compra com segurança.
                </p>
              </div>

              <div className="overflow-hidden rounded-3xl bg-white shadow-soft">
                <div className="flex items-center gap-4 border-b border-pink-100 p-5">
                  <LazyImage src={images.productBox} alt="Kit 30 Casinhas de Boneca de Papel" className="h-20 w-14 shrink-0 object-contain" eager />
                  <div>
                    <h2 className="font-display text-sm font-semibold text-pink-900 sm:text-base">{preCheckoutOffer.title}</h2>
                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-xs text-pink-900/40 line-through">{PRICE.from}</span>
                      <span className="font-display text-xl font-bold text-pink-600">{PRICE.to}</span>
                    </div>
                  </div>
                </div>

                <ul className="flex flex-col gap-2 p-5 pt-4">
                  {preCheckoutOffer.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm font-semibold text-pink-900">
                      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-pink-500" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m5 13 4 4L19 7" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-center gap-4 rounded-2xl bg-lilac-50 px-4 py-3.5 text-center">
                <span className="flex items-center gap-1.5 text-xs font-bold text-lilac-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                    <path d="M12 2 4 5v6c0 5.2 3.4 9.4 8 11 4.6-1.6 8-5.8 8-11V5l-8-3Zm0 4a3 3 0 0 1 3 3v1h.5a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1H9v-1a3 3 0 0 1 3-3Z" />
                  </svg>
                  Site seguro (SSL)
                </span>
                <span className="h-4 w-px bg-lilac-200" />
                <span className="flex items-center gap-1.5 text-xs font-bold text-lilac-700">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 2 4 5v6c0 5.2 3.4 9.4 8 11 4.6-1.6 8-5.8 8-11V5l-8-3Z" />
                    <path d="m8.5 12 2.4 2.4L15.5 9.6" strokeLinecap="round" />
                  </svg>
                  Garantia de 7 dias
                </span>
              </div>

              {/* CHECKOUT_URL_PLACEHOLDER: inserir aqui o link real do checkout */}
              <a
                href={CHECKOUT_URL}
                onClick={handleCheckoutClick}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-400 to-gold-500 px-7 py-5 text-center font-display text-lg font-bold text-pink-900 shadow-soft transition-transform active:scale-[0.98]"
              >
                {redirecting ? 'Redirecionando…' : `Ir para pagamento seguro · ${PRICE.to}`}
                {!redirecting && (
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                )}
              </a>

              <button type="button" onClick={() => setStep(1)} className="text-center text-xs font-semibold text-pink-900/40">
                Voltar e editar
              </button>
            </Reveal>
          )}
        </div>
      </div>
    </main>
  )
}
