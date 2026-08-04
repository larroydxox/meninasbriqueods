import { useEffect, useState, useRef } from 'react'

/**
 * Contador "X mães vendo agora" com variação pseudo-aleatória leve e periódica
 * (passeio aleatório com limites, não um número fixo).
 */
export default function useLiveViewers(min = 30, max = 90) {
  const [count, setCount] = useState(() => Math.floor((min + max) / 2))
  const valueRef = useRef(count)

  useEffect(() => {
    let timeoutId

    const step = () => {
      const delta = Math.floor(Math.random() * 7) - 3 // -3..+3
      let next = valueRef.current + delta
      next = Math.min(max, Math.max(min, next))
      valueRef.current = next
      setCount(next)

      const nextDelay = 2500 + Math.random() * 4000 // 2.5s–6.5s
      timeoutId = setTimeout(step, nextDelay)
    }

    timeoutId = setTimeout(step, 3000 + Math.random() * 3000)
    return () => clearTimeout(timeoutId)
  }, [min, max])

  return count
}
