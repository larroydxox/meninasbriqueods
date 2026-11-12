// GET /api/material?id=<id>&parte=<n> com cabeçalho X-Access-Token.
// Valida o token, descriptografa o PDF e devolve a parte pedida (máx. 3 MB por resposta).
// O token vai no cabeçalho (não na URL) para não aparecer em logs de acesso.
import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { TOKEN_HEADER, getAccessToken, getMateriaisKey, getQuery, isValidToken, sendJson, setPrivateHeaders } from './_lib/acesso.js'
import { MATERIAIS, CHUNK_SIZE } from './_lib/materiais.js'
import { decrypt } from './_lib/cripto.js'

export default async function handler(req, res) {
  const key = getMateriaisKey()
  if (!getAccessToken() || !key) return sendJson(res, 503, { erro: 'Área de membros não configurada.' })
  if (!isValidToken(req.headers[TOKEN_HEADER])) return sendJson(res, 401, { erro: 'Link de acesso inválido.' })

  const query = getQuery(req)
  const file = MATERIAIS[query.get('id')]
  if (!file) return sendJson(res, 404, { erro: 'Material não encontrado.' })

  let pdf
  try {
    const blob = await readFile(path.join(process.cwd(), 'private', 'materiais', file))
    pdf = decrypt(blob, key)
  } catch {
    return sendJson(res, 500, { erro: 'Não foi possível abrir este material.' })
  }

  const parts = Math.max(1, Math.ceil(pdf.length / CHUNK_SIZE))
  const part = Number.parseInt(query.get('parte') || '0', 10)
  if (!Number.isInteger(part) || part < 0 || part >= parts) return sendJson(res, 400, { erro: 'Parte inválida.' })

  const chunk = pdf.subarray(part * CHUNK_SIZE, (part + 1) * CHUNK_SIZE)
  setPrivateHeaders(res)
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/octet-stream')
  res.setHeader('Content-Length', String(chunk.length))
  res.setHeader('X-Material-Parts', String(parts))
  res.setHeader('X-Material-Size', String(pdf.length))
  res.end(chunk)
}
