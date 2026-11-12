// GET /api/verificar com cabeçalho X-Access-Token → 200 se o link do mini app é válido.
import { TOKEN_HEADER, getAccessToken, isValidToken, sendJson } from './_lib/acesso.js'

export default function handler(req, res) {
  if (!getAccessToken()) return sendJson(res, 503, { erro: 'Área de membros não configurada.' })
  if (!isValidToken(req.headers[TOKEN_HEADER])) return sendJson(res, 401, { erro: 'Link de acesso inválido.' })
  return sendJson(res, 200, { ok: true })
}
