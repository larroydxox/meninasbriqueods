// GET /api/acesso → { url } com o link do mini app.
// Usado pela página /obrigado. ATENÇÃO: como não há login, quem chegar à /obrigado recebe o link.
import { getAccessToken, sendJson } from './_lib/acesso.js'

export default function handler(req, res) {
  const token = getAccessToken()
  if (!token) return sendJson(res, 503, { erro: 'Área de membros não configurada (MEMBER_ACCESS_TOKEN).' })
  return sendJson(res, 200, { url: `/app/${token}` })
}
