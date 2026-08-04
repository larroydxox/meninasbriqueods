# Kit 30 Casinhas de Boneca — Landing + Pré-checkout

Landing page de vendas + página de pré-checkout para o produto digital
**"30 Casinhas Interativas de Boneca para Imprimir"**. Mobile-first (tráfego de
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
| Vídeo da VSL | já embutido em `src/assets/video/vsl.mp4` (comprimido para web); componente `src/components/landing/VslPlayer.jsx` |
| Prints dos depoimentos do WhatsApp | já embutidos em `src/assets/img/depoimento-*.webp`; componente `src/components/landing/TestimonialsCarousel.jsx` |
| Imagem do produto (caixa) | `src/assets/img/product-box.webp` |
| Link real do checkout | constante `CHECKOUT_URL` em `src/data/content.js` e botão final em `src/pages/PreCheckout.jsx` |
| Meta Pixel / Google Tag Manager | comentários no `<head>`/`<body>` de `index.html`, e evento de `InitiateCheckout` comentado em `src/pages/PreCheckout.jsx` |

## Copy e conteúdo

Todo o texto do funil (headline, bullets, bônus, FAQ, preços etc.) está
centralizado em `src/data/content.js` — para editar qualquer texto da página,
altere esse arquivo em vez de procurar dentro dos componentes.

## Performance / mobile

- Imagens convertidas para WebP e redimensionadas para o tamanho real de uso
  (redução de ~17MB → ~900KB nos assets estáticos).
- Vídeo da VSL recomprimido (H.264/AAC, faststart) de ~20MB → ~7MB, carregado
  com `preload="metadata"` (só baixa o vídeo completo quando a visitante dá play).
- `loading="lazy"` + `decoding="async"` em todas as imagens abaixo da dobra.
- Todas as imagens usam `aspect-ratio` reservado (evita layout shift em 3G/4G).
