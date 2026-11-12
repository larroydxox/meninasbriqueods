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
| `/app` | Mini app com os materiais (PDFs), busca, categorias e vídeos. |
| `/materiais/<arquivo>.pdf` | Os PDFs (arquivos estáticos em `public/materiais/`). |

**Acesso aberto:** não há login, senha nem código. Qualquer pessoa que souber o endereço `/app`
(ou `/materiais/...`) consegue ver e baixar os materiais. Nada precisa ser configurado no Vercel.
Links antigos no formato `/app/<código>` redirecionam para `/app`.

**Sem indexação:** `/obrigado`, `/app` e `/materiais/*` enviam `X-Robots-Tag: noindex` (vercel.json),
e as páginas aplicam `<meta name="robots" content="noindex">`. Isso evita aparecer no Google,
mas não impede o acesso de quem tiver o link.

### Adicionar ou trocar um PDF

1. Coloque o PDF em `public/materiais/` (nome sem espaços nem acentos).
2. Cadastre o card em `src/app/catalogo.js` (`arquivo` = nome do PDF, título, descrição, páginas, tamanho).
3. Capa: `pdftoppm -f 1 -l 1 -scale-to-x 640 -scale-to-y -1 -png arquivo.pdf capa` e converta para WebP em `src/assets/app/capas/`.

### Vídeos

Lista em `src/app/videos.js` (canal Professora Carolina Palhas). Os vídeos são exibidos só pelo player
oficial do YouTube (`youtube-nocookie.com`), com link para abrir no YouTube — nada é baixado ou republicado.

## Rastreamento (Meta Pixel + API de Conversões + UTMify)

- **UTMify:** scripts de UTMs e pixel no `<head>` do `index.html`.
- **Meta Pixel** `1475611941143430`: PageView no `index.html`.
- **InitiateCheckout:** `src/tracking.js` dispara em todo link com a classe `btn-checkout`
  (Kit Completo R$19,90, oferta do modal R$15, básico R$10, X e fundo do modal), pelo Pixel
  **e** pela API de Conversões (`/api/meta-evento`), com o mesmo `event_id` (a Meta deduplica).
- **API de Conversões:** configure no Vercel → Settings → Environment Variables:
  - `META_CAPI_TOKEN` — token de acesso gerado no Gerenciador de Eventos (**nunca** no código: o repositório é público).
  - `META_TEST_EVENT_CODE` — opcional, só para validar na aba "Testar eventos"; remova depois.
  Sem `META_CAPI_TOKEN`, a função não envia nada e o Pixel do navegador segue funcionando.
