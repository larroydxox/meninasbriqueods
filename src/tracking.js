// InitiateCheckout no Meta Pixel (fbq, instalado no index.html).
// Dispara em qualquer link com a classe "btn-checkout" — Kit Completo, oferta do modal,
// básico, X e fundo do modal —, com o valor do checkout de destino.
import { CHECKOUT_URL, CHECKOUT_URL_COMPLETO, CHECKOUT_URL_UPSELL } from './data/content.js'

const CHECKOUTS = [
  { url: CHECKOUT_URL, value: 10.0, content_name: 'Kit Básico' },
  { url: CHECKOUT_URL_UPSELL, value: 15.0, content_name: 'Kit Completo (oferta do modal)' },
  { url: CHECKOUT_URL_COMPLETO, value: 19.9, content_name: 'Kit Completo' },
]

const semQuery = (url) => url.split(/[?#]/)[0]

function dadosDoLink(link) {
  const destino = semQuery(link.href)
  return CHECKOUTS.find((c) => semQuery(c.url) === destino)
}

// Evita contar duas vezes o mesmo clique (pointerdown + click).
let ultimoEnvio = 0

function enviar(link) {
  const agora = Date.now()
  if (agora - ultimoEnvio < 1500) return
  const dados = dadosDoLink(link)
  if (!dados || typeof window.fbq !== 'function') return
  ultimoEnvio = agora
  window.fbq('track', 'InitiateCheckout', {
    value: dados.value,
    currency: 'BRL',
    content_name: dados.content_name,
    content_type: 'product',
  })
}

const linkDoEvento = (e) => (e.target instanceof Element ? e.target.closest('a.btn-checkout') : null)

export function iniciarRastreamentoDeCheckout() {
  // pointerdown chega ~100 ms antes da navegação: dá tempo de o evento sair antes de trocar de página.
  document.addEventListener('pointerdown', (e) => {
    const link = linkDoEvento(e)
    if (link && e.button === 0) enviar(link)
  })
  // click cobre teclado (Enter) e o Esc do modal, que "clica" no X.
  document.addEventListener('click', (e) => {
    const link = linkDoEvento(e)
    if (link) enviar(link)
  })
}
