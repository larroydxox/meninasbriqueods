// InitiateCheckout no Meta Pixel (fbq, instalado no index.html) + API de Conversões (/api/meta-evento).
// Dispara em qualquer link com a classe "btn-checkout" — Kit Completo, oferta do modal,
// básico, X e fundo do modal —, com o valor do checkout de destino. Navegador e servidor
// usam o mesmo event_id, então a Meta conta uma vez só.
import { CHECKOUT_URL, CHECKOUT_URL_COMPLETO, CHECKOUT_URL_UPSELL } from './data/content.js'

const CHECKOUTS = [
  { url: CHECKOUT_URL, oferta: 'basico', value: 10.0, content_name: 'Kit Básico' },
  { url: CHECKOUT_URL_UPSELL, oferta: 'upsell', value: 15.0, content_name: 'Kit Completo (oferta do modal)' },
  { url: CHECKOUT_URL_COMPLETO, oferta: 'completo', value: 19.9, content_name: 'Kit Completo' },
]

const semQuery = (url) => url.split(/[?#]/)[0]

function dadosDoLink(link) {
  const destino = semQuery(link.href)
  return CHECKOUTS.find((c) => semQuery(c.url) === destino)
}

// Evita contar duas vezes o mesmo clique (pointerdown + click).
let ultimoEnvio = 0

const cookie = (nome) => document.cookie.match(new RegExp(`(?:^|; )${nome}=([^;]*)`))?.[1]

const novoId = () =>
  window.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`

// sendBeacon continua mesmo com a troca de página para o checkout.
function enviarParaServidor(dados, eventId) {
  const corpo = JSON.stringify({
    evento: 'InitiateCheckout',
    oferta: dados.oferta,
    event_id: eventId,
    url: window.location.href,
    fbp: cookie('_fbp'),
    fbc: cookie('_fbc'),
  })
  try {
    const blob = new Blob([corpo], { type: 'application/json' })
    if (navigator.sendBeacon?.('/api/meta-evento', blob)) return
  } catch {
    // segue para o fetch
  }
  fetch('/api/meta-evento', { method: 'POST', body: corpo, headers: { 'Content-Type': 'application/json' }, keepalive: true }).catch(() => {})
}

function enviar(link) {
  const agora = Date.now()
  if (agora - ultimoEnvio < 1500) return
  const dados = dadosDoLink(link)
  if (!dados) return
  ultimoEnvio = agora
  const eventId = novoId()
  if (typeof window.fbq === 'function') {
    window.fbq(
      'track',
      'InitiateCheckout',
      { value: dados.value, currency: 'BRL', content_name: dados.content_name, content_type: 'product' },
      { eventID: eventId },
    )
  }
  enviarParaServidor(dados, eventId)
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
