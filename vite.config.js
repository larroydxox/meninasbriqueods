import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

/**
 * Em produção, /api/* roda como Vercel Functions (pasta api/).
 * Localmente (npm run dev / npm run preview) este plugin executa os mesmos handlers,
 * lendo MEMBER_ACCESS_TOKEN e MATERIAIS_KEY do .env.local.
 */
function localApi() {
  const handle = async (req, res, next) => {
    const route = req.url.split('?')[0].match(/^\/api\/([a-z-]+)$/)?.[1]
    if (!route) return next()
    try {
      const file = pathToFileURL(path.resolve('api', `${route}.js`)).href
      const { default: handler } = await import(file)
      await handler(req, res)
    } catch (err) {
      if (err?.code === 'ERR_MODULE_NOT_FOUND') return next()
      res.statusCode = 500
      res.end('Erro na API local')
    }
  }
  return {
    name: 'local-api',
    configureServer(server) {
      server.middlewares.use(handle)
    },
    configurePreviewServer(server) {
      server.middlewares.use(handle)
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  for (const name of ['MEMBER_ACCESS_TOKEN', 'MATERIAIS_KEY']) {
    if (env[name] && !process.env[name]) process.env[name] = env[name]
  }
  return {
    plugins: [react(), tailwindcss(), localApi()],
  }
})
