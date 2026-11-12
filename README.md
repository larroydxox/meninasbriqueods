# +200 Atividades Criativas para Fazer em Casa — Landing + Pré-checkout

Landing page de vendas + página de pré-checkout para o produto digital
**"+200 Atividades Criativas para Fazer em Casa"** (público: pais e mães de crianças de 3 a 8 anos). Mobile-first (tráfego de
anúncios no Instagram/Facebook), construído com React + Tailwind CSS v4 e
React Router.

## Rotas

- `/` — landing page de vendas completa (VSL, oferta, bônus, depoimentos, FAQ etc.)
- `/pre-checkout` — bridge page entre o CTA da landing e o checkout real

## Stack

- React 19 + Vite
- Tailwind CSS v4 (tema customizado em `src/index.css`, sem `tailwind.config.js`)
- React Router v7
- Sem `<form>` nativo — inputs controlados via `onChange`/`onClick`

## Rodando localmente

```bash
npm install
npm run dev       # ambiente de desenvolvimento
npm run build     # build de produção em dist/
npm run preview   # serve o build de produção localmente
```

## Onde plugar as integrações reais

Os pontos abaixo estão marcados com comentários `PLACEHOLDER` no código:

| O quê | Onde |
| --- | --- |
| Vídeo da VSL | player da vturb (ConverteAI) em `src/components/landing/VslPlayer.jsx` |
| Depoimentos | prints autorizados em `src/assets/img/depoimento-*.webp`, listados em `testimonials` (`src/data/content.js`) |
| Imagens dos kits e bônus | `src/assets/img/plano-*.webp` e `bonus-*.webp` |
| Links reais do checkout | `CHECKOUT_URL` (Kit Básico, R$10), `CHECKOUT_URL_COMPLETO` (Kit Completo, R$19,90) e `CHECKOUT_URL_UPSELL` (oferta do modal, `UPSELL_PRICE`) em `src/data/content.js` |
| Meta Pixel / Google Tag Manager | comentários no `<head>`/`<body>` de `index.html`, e evento de `InitiateCheckout` comentado em `src/pages/PreCheckout.jsx` |

## Copy e conteúdo

Todo o texto do funil (headline, bullets, bônus, FAQ, preços etc.) está
centralizado em `src/data/content.js` — para editar qualquer texto da página,
altere esse arquivo em vez de procurar dentro dos componentes.

## Performance / mobile

- Imagens convertidas para WebP e redimensionadas para o tamanho real de uso
  (redução de ~17MB → ~900KB nos assets estáticos).
- VSL servida pela vturb (script carregado de forma assíncrona).
- `loading="lazy"` + `decoding="async"` em todas as imagens abaixo da dobra.
- Todas as imagens usam `aspect-ratio` reservado (evita layout shift em 3G/4G).

## Área pós-compra: página de obrigado + mini app

| Rota | O que é |
| --- | --- |
| `/obrigado` | Página de obrigado. Configure-a como URL de redirecionamento pós-compra na Payt. |
| `/app/<token>` | Mini app com os materiais (PDFs), busca, categorias e vídeos. |
| `/api/acesso` | Devolve o link do mini app (usado pela `/obrigado`). |
| `/api/verificar` | Confere se o token do link é válido. |
| `/api/material?id=…&parte=…` | Entrega o PDF (descriptografado) só com o cabeçalho `X-Access-Token` correto. |

### Variáveis de ambiente (obrigatórias no Vercel)

Em **Vercel → Project → Settings → Environment Variables** (Production e Preview):

| Nome | Valor |
| --- | --- |
| `MEMBER_ACCESS_TOKEN` | Identificador aleatório do link (24+ caracteres, gerado com `secrets`/`crypto`). |
| `MATERIAIS_KEY` | Chave AES-256 (32 bytes em base64) usada para descriptografar os PDFs. |

Depois de salvar, faça um novo deploy. Sem essas variáveis, a `/obrigado` e o app mostram
"área não configurada" (a landing page continua funcionando normalmente).
Para rodar localmente, coloque as duas no `.env.local` (ignorado pelo git).

### Modelo de segurança — leia com atenção

- **Não há login.** O acesso é um link direto `/app/<token>`. **Qualquer pessoa que tiver esse link
  consegue ver e baixar os materiais.** A URL difícil de adivinhar não é autenticação: ela só impede
  que o conteúdo seja achado por tentativa ou por buscadores.
- **A `/obrigado` é pública.** Quem souber o endereço `/obrigado` recebe o link do app. Não há como
  confirmar o pagamento sem uma integração com a Payt (webhook + link por comprador), que não foi feita.
- **Um único link para todos.** Kit Básico e Kit Completo recebem o mesmo app (com os bônus).
- **Trocar o link:** altere `MEMBER_ACCESS_TOKEN` no Vercel e faça redeploy. O link antigo para de
  funcionar na hora (quem já comprou precisará do novo link).
- **PDFs protegidos:** este repositório é **público**, por isso os PDFs ficam em `private/materiais/`
  **criptografados** (AES-256-GCM). Os originais ficam em `materiais-originais/` (ignorado pelo git).
  Só a função `/api/material` descriptografa, e só com o token correto no cabeçalho.
- **Sem token em logs/analytics:** o token vai no cabeçalho `X-Access-Token` (não na query string) e os
  scripts da UTMify não rodam em `/app/*`.
- **Sem indexação:** `X-Robots-Tag: noindex` em `/obrigado`, `/app/*` e `/api/*` (vercel.json) e
  `<meta name="robots" content="noindex">` aplicado nessas páginas.

### Adicionar ou trocar um PDF

1. Coloque o PDF em `materiais-originais/`.
2. Rode `node scripts/criptografar-materiais.mjs` (usa a `MATERIAIS_KEY` do `.env.local`).
3. Cadastre o id → arquivo em `api/_lib/materiais.js` e o card (título, capa, descrição) em `src/app/catalogo.js`.
4. Capa: `pdftoppm -f 1 -l 1 -scale-to-x 640 -scale-to-y -1 -png arquivo.pdf capa` e converta para WebP em `src/assets/app/capas/`.

### Vídeos

Lista em `src/app/videos.js` (canal Professora Carolina Palhas). Os vídeos são exibidos só pelo player
oficial do YouTube (`youtube-nocookie.com`), com link para abrir no YouTube — nada é baixado ou republicado.
