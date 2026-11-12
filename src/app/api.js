// Cliente da API da área de membros. O token vai sempre no cabeçalho X-Access-Token
// (nunca na query string) para não ficar registrado em logs de URL.

export class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

const mensagemPorStatus = (status) => {
  if (status === 401) return 'Este link de acesso não é válido.'
  if (status === 503) return 'A área de atividades ainda não foi configurada. Fale com o suporte.'
  if (status === 404) return 'Material não encontrado.'
  return 'Não foi possível carregar agora. Verifique sua internet e tente de novo.'
}

async function request(url, token) {
  let res
  try {
    res = await fetch(url, { headers: token ? { 'X-Access-Token': token } : {}, cache: 'no-store' })
  } catch {
    throw new ApiError(0, mensagemPorStatus(0))
  }
  if (!res.ok) throw new ApiError(res.status, mensagemPorStatus(res.status))
  return res
}

export async function buscarLinkDeAcesso() {
  const res = await request('/api/acesso')
  const { url } = await res.json()
  return url
}

export async function verificarToken(token) {
  await request('/api/verificar', token)
  return true
}

// Cache em memória: abrir e depois baixar o mesmo PDF não baixa duas vezes.
const cache = new Map()

export function carregarMaterial(id, token) {
  if (cache.has(id)) return cache.get(id)
  const promessa = (async () => {
    const url = (parte) => `/api/material?id=${encodeURIComponent(id)}&parte=${parte}`
    const primeira = await request(url(0), token)
    const partes = Number(primeira.headers.get('X-Material-Parts')) || 1
    const buffers = [await primeira.arrayBuffer()]
    if (partes > 1) {
      const resto = await Promise.all(
        Array.from({ length: partes - 1 }, (_, i) => request(url(i + 1), token).then((r) => r.arrayBuffer())),
      )
      buffers.push(...resto)
    }
    return new Blob(buffers, { type: 'application/pdf' })
  })()
  cache.set(id, promessa)
  promessa.catch(() => cache.delete(id))
  return promessa
}

export async function baixarMaterial(material, token) {
  const blob = await carregarMaterial(material.id, token)
  const href = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = href
  a.download = material.arquivo
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(href), 60_000)
}

// Abre o PDF no leitor nativo do navegador, em outra guia. A guia é aberta já no clique
// (antes do download) para não ser bloqueada como pop-up.
export async function abrirEmOutraGuia(material, token) {
  const guia = window.open('', '_blank')
  try {
    const blob = await carregarMaterial(material.id, token)
    const href = URL.createObjectURL(blob)
    if (guia) guia.location.href = href
    else window.location.href = href
    setTimeout(() => URL.revokeObjectURL(href), 5 * 60_000)
  } catch (err) {
    guia?.close()
    throw err
  }
}
