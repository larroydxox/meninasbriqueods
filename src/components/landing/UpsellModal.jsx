import { useEffect, useRef } from 'react'
import { upsellModal, CHECKOUT_URL, CHECKOUT_URL_UPSELL } from '../../data/content.js'
import PrimaryButton from '../ui/PrimaryButton.jsx'

/**
 * Modal exibido ao clicar em "Quero o kit básico". Oferece o Kit Completo por
 * um valor especial. Fechar (X, clique fora ou Esc) leva ao checkout do básico.
 */
export default function UpsellModal({ open }) {
  const primaryRef = useRef(null)

  const goToBasicCheckout = () => {
    window.location.href = CHECKOUT_URL
  }

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    primaryRef.current?.focus()

    const onKey = (e) => {
      if (e.key === 'Escape') goToBasicCheckout()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-taupe-950/60 px-4 py-6 backdrop-blur-sm animate-fade-in"
      onClick={goToBasicCheckout}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upsell-title"
        className="relative w-full max-w-md rounded-[2rem] bg-white p-6 text-center shadow-soft ring-2 ring-lilac-200 animate-pop sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={goToBasicCheckout}
          aria-label="Fechar e continuar com o kit básico"
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-taupe-50 text-taupe-900/60 transition hover:bg-taupe-100"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        <h2 id="upsell-title" className="mt-2 font-display text-xl font-bold leading-tight text-taupe-900 sm:text-2xl">
          {upsellModal.title}
        </h2>
        <p className="mt-3 text-sm text-taupe-900/70 sm:text-base">{upsellModal.subtitle}</p>

        <ul className="mt-5 flex flex-col gap-2 text-left">
          {upsellModal.bonusItems.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-taupe-900">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-lilac-500 text-white">
                <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="m5 13 4 4L19 7" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-col items-center gap-0.5">
          <span className="text-sm text-taupe-900/45">
            Kit Completo de <span className="line-through">{upsellModal.fromPrice}</span> por
          </span>
          <span className="font-display text-4xl font-bold text-taupe-600">{upsellModal.price}</span>
        </div>

        <PrimaryButton ref={primaryRef} href={CHECKOUT_URL_UPSELL} variant="bloom" icon={false} className="mt-6 w-full sm:w-full">
          {upsellModal.ctaLabel}
        </PrimaryButton>

        <a
          href={CHECKOUT_URL}
          className="mt-4 inline-block text-xs font-semibold text-taupe-900/50 underline underline-offset-2 sm:text-sm"
        >
          {upsellModal.declineLabel}
        </a>
      </div>
    </div>
  )
}
