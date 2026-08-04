import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Garante que cada troca de rota do funil comece no topo da página.
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}
