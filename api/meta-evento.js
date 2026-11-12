// POST /api/meta-evento — envia InitiateCheckout para a API de Conversões da Meta (lado servidor).
// O navegador manda o mesmo evento pelo Pixel com o mesmo event_id; a Meta junta os dois (deduplicação).
//
// Variáveis no Vercel (Settings → Environment Variables):
//   META_CAPI_TOKEN       token de acesso da API de Conversões (obrigatório; NUNCA colocar no código)
//   META_TEST_EVENT_CODE  opcional: código da aba "Testar eventos" para validar
// Sem META_CAPI_TOKEN a função não faz nada (o Pixel do navegador continua funcionando).

const PIXEL_ID = '1475611941143430'

// Valores definidos no servidor (o navegador só diz qual oferta foi clicada).
const OFERTAS = {
  basico: { value: 10.0, content_name: 'Kit Básico' },
  upsell: { value: 15.0, content_name: 'Kit Completo (oferta do modal)' },
  completo: { value: 19.9, content_name: 'Kit Completo' },
}

const texto = (v, max = 300) => (typeof v === 'string' && v.length > 0 ? v.slice(0, max) : undefined)

async function lerCorpo(req) {
  if (req.body && typeof req.body === 'object') return req.body
  let raw = typeof req.body === 'string' ? req.body : ''
  if (!raw) {
    for await (const parte of req) raw += parte
  }
  try {
    return JSON.parse(raw || '{}')
  } catch {
    return {}
  }
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex')
  const fim = () => {
    res.statusCode = 204
    res.end()
  }
  if (req.method !== 'POST') return fim()

  const token = (process.env.META_CAPI_TOKEN || '').trim()
  if (!token) return fim()

  const corpo = await lerCorpo(req)
  const oferta = OFERTAS[corpo.oferta]
  const eventId = texto(corpo.event_id, 80)
  if (corpo.evento !== 'InitiateCheckout' || !oferta || !eventId) return fim()

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() || undefined
  const evento = {
    event_name: 'InitiateCheckout',
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventId,
    action_source: 'website',
    event_source_url: texto(corpo.url, 1000),
    user_data: {
      client_ip_address: ip,
      client_user_agent: texto(req.headers['user-agent'], 500),
      fbp: texto(corpo.fbp),
      fbc: texto(corpo.fbc),
    },
    custom_data: { currency: 'BRL', value: oferta.value, content_name: oferta.content_name, content_type: 'product' },
  }

  const payload = { data: [evento], access_token: token }
  const testCode = (process.env.META_TEST_EVENT_CODE || '').trim()
  if (testCode) payload.test_event_code = testCode

  try {
    const r = await fetch(`https://graph.facebook.com/${PIXEL_ID}/events`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(4000),
    })
    if (!r.ok) console.error('Meta CAPI respondeu', r.status)
  } catch {
    console.error('Meta CAPI: falha ao enviar')
  }
  return fim()
}
