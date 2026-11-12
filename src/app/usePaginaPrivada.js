import { useEffect } from 'react'

/**
 * Marca a página como privada enquanto estiver montada: noindex para buscadores e título próprio.
 * (O Vercel também envia o cabeçalho X-Robots-Tag para /obrigado e /app — ver vercel.json.)
 */
export default function usePaginaPrivada(titulo) {
  useEffect(() => {
    const robots = document.querySelector('meta[name="robots"]')
    const robotsAnterior = robots?.getAttribute('content')
    const tituloAnterior = document.title
    robots?.setAttribute('content', 'noindex, nofollow, noarchive')
    document.title = titulo
    return () => {
      if (robots && robotsAnterior) robots.setAttribute('content', robotsAnterior)
      document.title = tituloAnterior
    }
  }, [titulo])
}
