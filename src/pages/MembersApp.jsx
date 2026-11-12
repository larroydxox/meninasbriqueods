import { Suspense, lazy, useMemo, useState } from 'react'
import usePaginaPrivada from '../app/usePaginaPrivada.js'
import useOverlay from '../app/useOverlay.js'
import { CATEGORIAS, KIT_PRINCIPAL, MATERIAIS, buscarMateriais, getMaterial } from '../app/catalogo.js'
import { VIDEOS } from '../app/videos.js'
import BottomNav from '../app/components/BottomNav.jsx'
import BotoesMaterial from '../app/components/BotoesMaterial.jsx'
import MaterialCard, { SeloPdf } from '../app/components/MaterialCard.jsx'
import VideoCard from '../app/components/VideoCard.jsx'
import VideoPlayer from '../app/components/VideoPlayer.jsx'
import Ilustracao from '../app/components/Ilustracao.jsx'
import { Pontinhos } from '../app/components/Carregando.jsx'
import { Toast, useToast } from '../app/components/Toast.jsx'
import { IconeBusca, IconeFechar, IconeLink } from '../app/components/Icones.jsx'
import LazyImage from '../components/ui/LazyImage.jsx'

// O leitor (com o pdf.js) só é baixado quando alguém abre um PDF.
const PdfViewer = lazy(() => import('../app/components/PdfViewer.jsx'))

const categoriaPorId = Object.fromEntries(CATEGORIAS.map((c) => [c.id, c]))

function TituloSecao({ children, acao }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <h2 className="font-display text-xl font-semibold text-brand-900">{children}</h2>
      {acao}
    </div>
  )
}

/* ---------------------------------- Início ---------------------------------- */
function Inicio({ onVisualizar, onAviso, onAbrirVideo, onIrPara, onCopiarLink }) {
  const outros = MATERIAIS.slice(1)
  return (
    <div className="flex flex-col gap-8">
      <section className="animate-slide-up">
        <h1 className="text-[1.65rem] leading-tight text-brand-900">Olá! Que bom ter você aqui! 👋</h1>
        <p className="mt-2 text-[15px] leading-relaxed text-brand-900/70">
          Seu cantinho de criatividade está prontinho. Escolha uma atividade e comece a diversão!
        </p>

        <div className="relative mt-5 overflow-hidden rounded-[2rem] bg-gradient-to-br from-brand-100 via-sun-50 to-mint-100 p-5 shadow-softer ring-1 ring-white">
          <span className="pointer-events-none absolute -left-6 -top-8 h-24 w-24 rounded-full bg-white/60" />
          <span className="pointer-events-none absolute -bottom-10 right-16 h-24 w-24 rounded-full bg-peach-100/80" />
          <div className="relative flex items-center gap-2">
            <div className="w-[48%] shrink-0">
              <p className="font-display text-lg font-bold leading-tight text-brand-900">Hoje é dia de criar!</p>
              <p className="mt-1 text-xs font-semibold leading-snug text-brand-900/65">Atividades, bônus e vídeos num só lugar.</p>
            </div>
            <Ilustracao className="-my-2 w-[56%] shrink-0 drop-shadow-sm" />
          </div>
        </div>
      </section>

      <section className="animate-slide-up [animation-delay:80ms]">
        <TituloSecao>🎨 Seu Kit Criativo</TituloSecao>
        <article className="overflow-hidden rounded-[2rem] bg-white p-4 shadow-soft ring-1 ring-brand-100">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => onVisualizar(KIT_PRINCIPAL)}
              className="w-28 shrink-0 self-start overflow-hidden rounded-2xl max-[359px]:w-20 ring-1 ring-brand-100 transition active:scale-[0.97] animate-wiggle [animation-duration:6s]"
              aria-label={`Visualizar ${KIT_PRINCIPAL.titulo}`}
            >
              <LazyImage src={KIT_PRINCIPAL.capa} alt={`Capa de ${KIT_PRINCIPAL.titulo}`} width={640} height={906} eager className="block aspect-[640/906] w-full object-cover" />
            </button>
            <div className="min-w-0">
              <span className="whitespace-nowrap rounded-full bg-brand-100 px-2.5 py-0.5 text-[11px] font-bold text-brand-700">⭐ Material principal</span>
              <h3 className="mt-2 font-display text-lg font-semibold leading-tight text-brand-900">{KIT_PRINCIPAL.titulo}</h3>
              <p className="mt-1 text-[13px] leading-snug text-brand-900/65">{KIT_PRINCIPAL.descricao}</p>
              <div className="mt-2">
                <SeloPdf material={KIT_PRINCIPAL} />
              </div>
            </div>
          </div>
          <div className="mt-4">
            <BotoesMaterial material={KIT_PRINCIPAL} onVisualizar={onVisualizar} onAviso={onAviso} />
          </div>
        </article>
      </section>

      <section className="animate-slide-up [animation-delay:140ms]">
        <TituloSecao
          acao={
            <button type="button" onClick={() => onIrPara('materiais')} className="text-sm font-bold text-brand-600">
              Ver todos
            </button>
          }
        >
          🎁 Extras e bônus
        </TituloSecao>
        <div className="no-scrollbar -mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2">
          {outros.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onVisualizar(m)}
              className="w-32 shrink-0 snap-start text-left transition active:scale-[0.97]"
            >
              <span className="block overflow-hidden rounded-2xl bg-white shadow-softer ring-1 ring-brand-100">
                <LazyImage src={m.capa} alt={`Capa de ${m.titulo}`} width={640} height={906} className="block aspect-[640/906] w-full object-cover" />
              </span>
              <span className="mt-1.5 block text-[11px] font-bold text-brand-900/45">
                {categoriaPorId[m.categoria].emoji} {categoriaPorId[m.categoria].nome}
              </span>
              <span className="block font-display text-[13px] font-semibold leading-snug text-brand-900">{m.titulo}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="animate-slide-up [animation-delay:200ms]">
        <TituloSecao
          acao={
            <button type="button" onClick={() => onIrPara('videos')} className="text-sm font-bold text-brand-600">
              Ver todos
            </button>
          }
        >
          📺 Aprenda brincando!
        </TituloSecao>
        <div className="grid grid-cols-2 gap-3">
          {VIDEOS.slice(0, 2).map((v, i) => (
            <VideoCard key={v.id} video={v} onAbrir={onAbrirVideo} indice={i} />
          ))}
        </div>
      </section>

      <section className="flex items-center gap-3 rounded-[1.75rem] bg-sun-50 p-4 ring-1 ring-sun-200">
        <span className="text-2xl" aria-hidden="true">💡</span>
        <p className="flex-1 text-[13px] leading-snug text-sun-800">
          <strong>Dica:</strong> salve este link nos favoritos ou na tela inicial do celular para voltar quando quiser.
        </p>
        <button type="button" onClick={onCopiarLink} className="shrink-0 rounded-full bg-white px-3 py-2 text-xs font-bold text-sun-800 ring-1 ring-sun-200 active:scale-95">
          Copiar link
        </button>
      </section>
    </div>
  )
}

/* -------------------------------- Materiais --------------------------------- */
function Materiais({ onVisualizar, onAviso }) {
  const [busca, setBusca] = useState('')
  const [filtro, setFiltro] = useState('todos')
  const resultados = useMemo(() => buscarMateriais(busca), [busca])
  const grupos = CATEGORIAS.filter((c) => filtro === 'todos' || c.id === filtro)
    .map((c) => ({ categoria: c, itens: resultados.filter((m) => m.categoria === c.id) }))
    .filter((g) => g.itens.length > 0)

  return (
    <div className="flex flex-col gap-5">
      <section className="animate-slide-up">
        <h1 className="text-[1.65rem] leading-tight text-brand-900">📚 Seus materiais</h1>
        <p className="mt-1.5 text-[15px] text-brand-900/70">Visualize ou baixe quando quiser.</p>
      </section>

      <div className="sticky top-[calc(3.75rem+env(safe-area-inset-top))] z-20 -mx-5 bg-cream-50/95 px-5 pb-3 pt-1 backdrop-blur">
        <label className="relative block">
          <span className="sr-only">Buscar materiais por nome</span>
          <IconeBusca className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-400" />
          <input
            type="search"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por nome…"
            enterKeyHint="search"
            className="search-sem-x h-12 w-full rounded-full border-0 bg-white pl-12 pr-11 text-[15px] text-brand-900 shadow-softer ring-1 ring-brand-100 outline-none transition placeholder:text-brand-900/35 focus:ring-2 focus:ring-brand-300"
          />
          {busca && (
            <button type="button" onClick={() => setBusca('')} className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-brand-50 text-brand-900/60" aria-label="Limpar busca">
              <IconeFechar className="h-4 w-4" />
            </button>
          )}
        </label>
        <div className="no-scrollbar -mx-5 mt-3 flex gap-2 overflow-x-auto px-5">
          {[{ id: 'todos', nome: 'Todos', emoji: '✨' }, ...CATEGORIAS].map((c) => {
            const ativo = filtro === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setFiltro(c.id)}
                aria-pressed={ativo}
                className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] font-bold transition active:scale-95 ${
                  ativo ? 'bg-brand-500 text-white shadow-softer' : 'bg-white text-brand-900/70 ring-1 ring-brand-100'
                }`}
              >
                {c.emoji} {c.nome}
              </button>
            )
          })}
        </div>
      </div>

      {grupos.length === 0 ? (
        <div className="flex flex-col items-center gap-2 rounded-[2rem] bg-white px-6 py-10 text-center ring-1 ring-brand-100">
          <span className="text-4xl" aria-hidden="true">🔎</span>
          <p className="font-display text-lg font-semibold text-brand-900">Nada encontrado</p>
          <p className="text-sm text-brand-900/60">Tente outra palavra, como “moldes” ou “bônus”.</p>
          <button type="button" onClick={() => { setBusca(''); setFiltro('todos') }} className="mt-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-bold text-brand-700">
            Ver todos os materiais
          </button>
        </div>
      ) : (
        grupos.map(({ categoria, itens }) => (
          <section key={categoria.id}>
            <TituloSecao>
              {categoria.emoji} {categoria.nome} <span className="text-base text-brand-900/35">({itens.length})</span>
            </TituloSecao>
            <div className="flex flex-col gap-3">
              {itens.map((m, i) => (
                <MaterialCard key={m.id} material={m} categoria={categoria} onVisualizar={onVisualizar} onAviso={onAviso} indice={i} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  )
}

/* ---------------------------------- Vídeos ---------------------------------- */
function Videos({ onAbrirVideo }) {
  return (
    <div className="flex flex-col gap-5">
      <section className="animate-slide-up">
        <h1 className="text-[1.65rem] leading-tight text-brand-900">📺 Aprenda brincando!</h1>
        <p className="mt-1.5 text-[15px] text-brand-900/70">Vídeos curtinhos para transformar ideias em diversão!</p>
      </section>
      <div className="grid grid-cols-2 gap-3">
        {VIDEOS.map((v, i) => (
          <VideoCard key={v.id} video={v} onAbrir={onAbrirVideo} indice={i} />
        ))}
      </div>
      <p className="text-center text-xs text-brand-900/45">
        Vídeos do canal {VIDEOS[0].canal}, exibidos pelo player oficial do YouTube.
      </p>
    </div>
  )
}

/* ----------------------------------- App ------------------------------------ */
export default function MembersApp() {
  usePaginaPrivada('Cantinho Criativo · Minhas atividades')
  const [aba, setAba] = useState('inicio')
  const { overlay, abrir, fechar } = useOverlay()
  const { toast, mostrar } = useToast()

  const trocarAba = (nova) => {
    setAba(nova)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const visualizar = (material) => abrir({ tipo: 'pdf', id: material.id })
  const abrirVideo = (video) => abrir({ tipo: 'video', id: video.id })

  const copiarLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      mostrar('Link copiado! Guarde para voltar quando quiser. 💙')
    } catch {
      mostrar('Não foi possível copiar. Salve esta página nos favoritos.', 'erro')
    }
  }

  const materialAberto = overlay?.tipo === 'pdf' ? getMaterial(overlay.id) : null
  const videoAberto = overlay?.tipo === 'video' ? VIDEOS.find((v) => v.id === overlay.id) : null

  return (
    <div className="min-h-[100svh] bg-cream-50 text-brand-900">
      <header className="sticky top-0 z-30 border-b border-brand-100/70 bg-cream-50/90 backdrop-blur-md pt-safe">
        <div className="mx-auto flex h-[3.75rem] max-w-md items-center justify-between px-5">
          <span className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-sun-200 to-peach-200 text-lg shadow-softer" aria-hidden="true">
              🖍️
            </span>
            <span className="whitespace-nowrap font-display text-lg font-bold text-brand-900 max-[359px]:text-base">Cantinho Criativo</span>
          </span>
          <button type="button" onClick={copiarLink} className="flex h-9 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-white px-3 text-xs font-bold text-brand-700 ring-1 ring-brand-100 active:scale-95" aria-label="Copiar link de acesso">
            <IconeLink className="h-4 w-4" />
            <span className="max-[359px]:sr-only">Salvar link</span>
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-md px-5 pt-5 pb-[calc(7rem+env(safe-area-inset-bottom))]">
        <div key={aba} className="animate-fade-in">
          {aba === 'inicio' && (
            <Inicio onVisualizar={visualizar} onAviso={mostrar} onAbrirVideo={abrirVideo} onIrPara={trocarAba} onCopiarLink={copiarLink} />
          )}
          {aba === 'materiais' && <Materiais onVisualizar={visualizar} onAviso={mostrar} />}
          {aba === 'videos' && <Videos onAbrirVideo={abrirVideo} />}
        </div>
      </main>

      <BottomNav aba={aba} onTrocar={trocarAba} />
      <Toast toast={toast} />

      {materialAberto && (
        <Suspense
          fallback={
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-cream-100">
              <Pontinhos />
            </div>
          }
        >
          <PdfViewer material={materialAberto} onFechar={fechar} onAviso={mostrar} />
        </Suspense>
      )}
      {videoAberto && <VideoPlayer video={videoAberto} onFechar={fechar} />}
    </div>
  )
}
