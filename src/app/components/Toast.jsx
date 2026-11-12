import { useCallback, useEffect, useRef, useState } from 'react'

export function useToast() {
  const [toast, setToast] = useState(null)
  const timer = useRef()
  const mostrar = useCallback((texto, tipo = 'info') => {
    clearTimeout(timer.current)
    setToast({ texto, tipo, id: Date.now() })
    timer.current = setTimeout(() => setToast(null), 3800)
  }, [])
  useEffect(() => () => clearTimeout(timer.current), [])
  return { toast, mostrar }
}

export function Toast({ toast }) {
  if (!toast) return null
  const cor = toast.tipo === 'erro' ? 'bg-peach-600' : 'bg-brand-900'
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-[calc(6.5rem+env(safe-area-inset-bottom))] z-[70] flex justify-center px-4">
      <p
        key={toast.id}
        role={toast.tipo === 'erro' ? 'alert' : 'status'}
        className={`max-w-sm rounded-2xl px-4 py-3 text-center text-sm font-semibold text-white shadow-soft animate-slide-up ${cor}`}
      >
        {toast.texto}
      </p>
    </div>
  )
}
