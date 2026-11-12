// Criptografa os PDFs de materiais-originais/ (pasta ignorada pelo git) para private/materiais/*.pdf.enc.
// Uso: node scripts/criptografar-materiais.mjs   (lê MATERIAIS_KEY do ambiente ou do .env.local)
import { readFile, readdir, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { encrypt, decrypt } from '../api/_lib/cripto.js'

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..')

async function loadKey() {
  let raw = process.env.MATERIAIS_KEY
  if (!raw) {
    const env = await readFile(path.join(root, '.env.local'), 'utf8').catch(() => '')
    raw = env.match(/^MATERIAIS_KEY=(.+)$/m)?.[1]
  }
  const key = raw ? Buffer.from(raw.trim(), 'base64') : null
  if (!key || key.length !== 32) throw new Error('Defina MATERIAIS_KEY (32 bytes em base64) no ambiente ou no .env.local')
  return key
}

const key = await loadKey()
const src = path.join(root, 'materiais-originais')
const out = path.join(root, 'private', 'materiais')
await mkdir(out, { recursive: true })
for (const name of (await readdir(src)).filter((f) => f.toLowerCase().endsWith('.pdf'))) {
  const plain = await readFile(path.join(src, name))
  const enc = encrypt(plain, key)
  if (!decrypt(enc, key).equals(plain)) throw new Error(`Falha ao verificar ${name}`)
  await writeFile(path.join(out, `${name}.enc`), enc)
  console.log(`✓ ${name} (${(plain.length / 1024).toFixed(0)} KB)`)
}
