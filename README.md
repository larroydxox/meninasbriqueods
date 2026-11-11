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
| Imagem do produto (caixa) | `src/assets/img/product-box.webp` |
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
