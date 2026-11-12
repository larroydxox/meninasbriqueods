import { useEffect, useRef } from 'react'
import { upsellModal, CHECKOUT_URL, CHECKOUT_URL_UPSELL } from '../../data/content.js'
import PrimaryButton from '../ui/PrimaryButton.jsx'

/**
 * Modal exibido ao clicar em "Quero o kit básico". Oferece o Kit Completo por
 * um valor especial. Fechar (X, clique fora ou Esc) leva ao checkout do básico.
 *
 * RASTREAMENTO (UTMify / InitiateCheckout): o modal fica sempre no HTML (só escondido),
 * e todo caminho para o checkout é um link <a href="checkout"> com a classe "btn-checkout".
 * Assim o pixel e o script de UTMs da UTMify enxergam os links desde o carregamento.
 */
export default function UpsellModal({ open }) {
  const primaryRef = useRef(null)
  const closeLinkRef = useRef(null)

  // Esc "clica" no X, que é um link real para o checkout do básico.
  const goToBasicCheckout = () => closeLinkRef.current?.click()

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

  return (
    <div
      className={`fixed inset-0 z-50 items-center justify-center px-4 py-6 ${open ? 'flex animate-fade-in' : 'hidden'}`}
      aria-hidden={!open}
    >
      {/* Clicar fora = link para o checkout do básico */}
      <a
        href={CHECKOUT_URL}
        className="btn-checkout absolute inset-0 bg-brand-950/60 backdrop-blur-sm"
        tabIndex={-1}
        aria-hidden="true"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="upsell-title"
        className="relative w-full max-w-md rounded-[2rem] bg-white p-6 text-center shadow-soft ring-2 ring-lilac-200 animate-pop sm:p-8"
      >
        <a
          ref={closeLinkRef}
          href={CHECKOUT_URL}
          aria-label="Fechar e continuar com o kit básico"
          className="btn-checkout absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-brand-50 text-brand-900/60 transition hover:bg-brand-100"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </a>

        <h2 id="upsell-title" className="mt-2 px-7 font-display text-xl font-bold leading-tight text-brand-900 sm:text-2xl">
          {upsellModal.title}
        </h2>
        <p className="mt-3 text-sm text-brand-900/70 sm:text-base">{upsellModal.subtitle}</p>

        <ul className="mt-5 flex flex-col gap-2 text-left">
          {upsellModal.bonusItems.map((item) => (
            <li key={item} className="flex items-center gap-2.5 text-sm font-semibold text-brand-900">
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
          <span className="text-sm text-brand-900/45">
            Kit Completo de <span className="line-through">{upsellModal.fromPrice}</span> por
          </span>
          <span className="font-display text-4xl font-bold text-brand-600">{upsellModal.price}</span>
        </div>

        <PrimaryButton ref={primaryRef} href={CHECKOUT_URL_UPSELL} variant="bloom" icon={false} className="btn-checkout mt-6 w-full sm:w-full">
          {upsellModal.ctaLabel}
        </PrimaryButton>

        <a
          href={CHECKOUT_URL}
          className="btn-checkout mt-4 inline-block text-xs font-semibold text-brand-900/50 underline underline-offset-2 sm:text-sm"
        >
          {upsellModal.declineLabel}
        </a>
      </div>
    </div>
  )
}
