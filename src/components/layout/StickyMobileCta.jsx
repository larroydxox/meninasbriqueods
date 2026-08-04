import { useEffect, useState } from 'react'
import { PRICE } from '../../data/content.js'
import PrimaryButton from '../ui/PrimaryButton.jsx'

/**
 * CTA fixo no rodapé, visível apenas no mobile, que aparece depois que o
 * visitante rola para além do Hero — mantém o botão de compra sempre à mão.
 */
export default function StickyMobileCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.9)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-pink-100 bg-white/95 px-4 py-3 shadow-[0_-8px_24px_-8px_rgba(216,31,116,0.25)] backdrop-blur transition-transform duration-300 sm:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="leading-tight">
          <p className="text-[11px] font-bold uppercase tracking-wide text-pink-900/50">De {PRICE.from} por</p>
          <p className="font-display text-xl font-bold text-pink-600">{PRICE.to}</p>
        </div>
        <PrimaryButton to="/pre-checkout" icon={false} className="!px-5 !py-3 !text-sm">
          Quero o kit
        </PrimaryButton>
      </div>
    </div>
  )
}
