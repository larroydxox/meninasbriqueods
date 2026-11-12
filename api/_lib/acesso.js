// Utilitários de acesso à área de membros (somente servidor — nunca importar no front-end).
//
// MODELO DE SEGURANÇA (leia antes de alterar):
// - Não existe login nem conta por comprador. O acesso é um LINK DIRETO /app/<token>.
// - Qualquer pessoa que tiver esse link (ou passar pela página /obrigado) consegue acessar.
//   Obscuridade da URL NÃO é autenticação: o token só evita que o conteúdo seja encontrado
//   por adivinhação ou por buscadores.
// - Os PDFs ficam CRIPTOGRAFADOS no repositório (que é público) e só são liberados por
//   /api/material quando o token enviado no cabeçalho X-Access-Token confere.
// - O token e a chave ficam em variáveis de ambiente do Vercel, nunca no código.
import { timingSafeEqual } from 'node:crypto'

export const TOKEN_HEADER = 'x-access-token'

export function getAccessToken() {
  const token = (process.env.MEMBER_ACCESS_TOKEN || '').trim()
  return token.length >= 20 ? token : null
}

export function getMateriaisKey() {
  const raw = (process.env.MATERIAIS_KEY || '').trim()
  if (!raw) return null
  const key = Buffer.from(raw, 'base64')
  return key.length === 32 ? key : null
}

export function isValidToken(candidate) {
  const expected = getAccessToken()
  if (!expected || typeof candidate !== 'string') return false
  const a = Buffer.from(candidate)
  const b = Buffer.from(expected)
  return a.length === b.length && timingSafeEqual(a, b)
}

export function setPrivateHeaders(res) {
  res.setHeader('Cache-Control', 'no-store, private')
  res.setHeader('X-Robots-Tag', 'noindex, nofollow, noarchive')
  res.setHeader('Referrer-Policy', 'same-origin')
}

export function sendJson(res, status, body) {
  setPrivateHeaders(res)
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(body))
}

export function getQuery(req) {
  return new URL(req.url, 'http://localhost').searchParams
}
