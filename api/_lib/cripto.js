// Formato do arquivo .enc: IV (12 bytes) | TAG (16 bytes) | conteúdo cifrado (AES-256-GCM).
import { createCipheriv, createDecipheriv, randomBytes } from 'node:crypto'

export function encrypt(plain, key) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const data = Buffer.concat([cipher.update(plain), cipher.final()])
  return Buffer.concat([iv, cipher.getAuthTag(), data])
}

export function decrypt(blob, key) {
  const iv = blob.subarray(0, 12)
  const tag = blob.subarray(12, 28)
  const decipher = createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(blob.subarray(28)), decipher.final()])
}
