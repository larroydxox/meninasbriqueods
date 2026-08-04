import { useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'kit-casinhas-countdown-deadline'

function readDeadline(durationMs) {
  const stored = Number(localStorage.getItem(STORAGE_KEY))
  const now = Date.now()
  if (stored && stored > now) return stored
  const next = now + durationMs
  localStorage.setItem(STORAGE_KEY, String(next))
  return next
}

/**
 * Countdown regressivo real e funcional. Reinicia automaticamente ao zerar,
 * mantendo a mesma janela de urgência (persistido em localStorage, então
 * sobrevive a um refresh de página em vez de "trapacear" o visitante).
 */
export default function useCountdown(durationMinutes = 15) {
  const durationMs = durationMinutes * 60 * 1000

  const [deadline, setDeadline] = useState(() => readDeadline(durationMs))
  const [remaining, setRemaining] = useState(() => Math.max(deadline - Date.now(), 0))

  const reset = useCallback(() => {
    const next = Date.now() + durationMs
    localStorage.setItem(STORAGE_KEY, String(next))
    setDeadline(next)
  }, [durationMs])

  useEffect(() => {
    const tick = () => {
      const diff = deadline - Date.now()
      if (diff <= 0) {
        reset()
      } else {
        setRemaining(diff)
      }
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [deadline, reset])

  const totalSeconds = Math.max(Math.floor(remaining / 1000), 0)
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  const pad = (n) => String(n).padStart(2, '0')

  return {
    hours,
    minutes,
    seconds,
    label: hours > 0 ? `${pad(hours)}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`,
  }
}
