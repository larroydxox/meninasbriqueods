import { useCallback, useEffect, useRef, useState } from 'react'
import * as pdfjs from 'pdfjs-dist/legacy/build/pdf.mjs'
import workerUrl from 'pdfjs-dist/legacy/build/pdf.worker.min.mjs?url'
import { abrirEmOutraGuia, baixarMaterial, carregarMaterial } from '../api.js'
import { Pontinhos, Spinner } from './Carregando.jsx'
import { IconeBaixar, IconeExterno, IconeMais, IconeMenos, IconeVoltar } from './Icones.jsx'

// Build "legacy" do pdf.js: funciona também em iPhones/Androids mais antigos.
pdfjs.GlobalWorkerOptions.workerSrc = workerUrl

const ZOOMS = [1, 1.5, 2]
const GAP = 12

/**
 * Uma página do PDF. Só é desenhada quando está perto da área visível e é liberada
 * quando se afasta — assim um PDF de 100 páginas não estoura a memória do celular.
 */
function Pagina({ doc, numero, largura, proporcao, raiz }) {
  const caixa = useRef(null)
  const canvas = useRef(null)
  const [ativa, setAtiva] = useState(false)
  const [pronta, setPronta] = useState(false)
  const [links, setLinks] = useState([])

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setAtiva(e.isIntersecting), { root: raiz, rootMargin: '150% 0px' })
    io.observe(caixa.current)
    return () => io.disconnect()
  }, [raiz])

  useEffect(() => {
    if (!ativa || !largura) return
    let cancelado = false
    let tarefa = null
    const el = canvas.current
    ;(async () => {
      const page = await doc.getPage(numero)
      if (cancelado) return
      const escala = largura / page.getViewport({ scale: 1 }).width
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const viewport = page.getViewport({ scale: escala * dpr })
      el.width = Math.floor(viewport.width)
      el.height = Math.floor(viewport.height)
      tarefa = page.render({ canvasContext: el.getContext('2d'), viewport })
      await tarefa.promise
      if (cancelado) return
      setPronta(true)
      // Links clicáveis (ex.: Biblioteca de Moldes) por cima do desenho da página.
      const cssViewport = page.getViewport({ scale: escala })
      const anotacoes = await page.getAnnotations({ intent: 'display' })
      if (cancelado) return
      setLinks(
        anotacoes
          .filter((a) => a.subtype === 'Link' && a.url)
          .map((a) => {
            const [x1, y1, x2, y2] = cssViewport.convertToViewportRectangle(a.rect)
            return { url: a.url, left: Math.min(x1, x2), top: Math.min(y1, y2), width: Math.abs(x2 - x1), height: Math.abs(y2 - y1) }
          }),
      )
    })().catch(() => {})
    return () => {
      cancelado = true
      tarefa?.cancel()
      el.width = 0
      el.height = 0
      setPronta(false)
      setLinks([])
    }
  }, [ativa, largura, doc, numero])

  return (
    <div
      ref={caixa}
      className="relative mx-auto overflow-hidden rounded-xl bg-white shadow-softer"
      style={{ width: largura, height: largura * proporcao }}
      aria-label={`Página ${numero}`}
    >
      <canvas ref={canvas} width={0} height={0} className="block h-full w-full" />
      {!pronta && (
        <div className="absolute inset-0 flex items-center justify-center bg-white">
          <span className="font-display text-sm font-semibold text-brand-900/25">{numero}</span>
        </div>
      )}
      {links.map((l, i) => (
        <a
          key={i}
          href={l.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute rounded-sm hover:bg-sun-200/40"
          style={{ left: l.left, top: l.top, width: l.width, height: l.height }}
          aria-label={`Abrir link: ${l.url}`}
        />
      ))}
    </div>
  )
}

export default function PdfViewer({ material, token, onFechar, onAviso }) {
  const area = useRef(null)
  const [raiz, setRaiz] = useState(null)
  const [estado, setEstado] = useState('carregando') // carregando | pronto | erro
  const [erro, setErro] = useState('')
  const [doc, setDoc] = useState(null)
  const [proporcao, setProporcao] = useState(1.414)
  const [larguraBase, setLarguraBase] = useState(0)
  const [zoom, setZoom] = useState(0)
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [baixando, setBaixando] = useState(false)
  const [tentativa, setTentativa] = useState(0)

  // Trava a rolagem da página de fundo enquanto o leitor está aberto.
  useEffect(() => {
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = anterior
    }
  }, [])

  // Mede a largura disponível (e acompanha a rotação da tela).
  useEffect(() => {
    const el = area.current
    setRaiz(el)
    const medir = () => setLarguraBase(Math.min(el.clientWidth - 24, 860))
    medir()
    const ro = new ResizeObserver(medir)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    let cancelado = false
    let documento = null
    setEstado('carregando')
    ;(async () => {
      const blob = await carregarMaterial(material.id, token)
      const dados = new Uint8Array(await blob.arrayBuffer())
      documento = await pdfjs.getDocument({ data: dados }).promise
      const primeira = await documento.getPage(1)
      const vp = primeira.getViewport({ scale: 1 })
      if (cancelado) return
      setProporcao(vp.height / vp.width)
      setDoc(documento)
      setEstado('pronto')
    })().catch((e) => {
      if (cancelado) return
      setErro(e?.status !== undefined ? e.message : 'Não conseguimos mostrar este PDF aqui.')
      setEstado('erro')
    })
    return () => {
      cancelado = true
      documento?.destroy()
    }
  }, [material.id, token, tentativa])

  const largura = Math.floor(larguraBase * ZOOMS[zoom])

  const aoRolar = useCallback(() => {
    const el = area.current
    if (!el || !largura) return
    const alturaPagina = largura * proporcao + GAP
    setPaginaAtual(Math.min(doc?.numPages ?? 1, Math.floor((el.scrollTop + el.clientHeight / 3) / alturaPagina) + 1))
  }, [largura, proporcao, doc])

  const mudarZoom = (delta) => {
    const el = area.current
    const relativo = el ? el.scrollTop / Math.max(el.scrollHeight, 1) : 0
    setZoom((z) => Math.min(ZOOMS.length - 1, Math.max(0, z + delta)))
    // Mantém a mesma posição relativa no documento depois do zoom.
    requestAnimationFrame(() => {
      if (el) el.scrollTop = relativo * el.scrollHeight
    })
  }

  const baixar = async () => {
    setBaixando(true)
    try {
      await baixarMaterial(material, token)
      onAviso?.('Download iniciado! 📥')
    } catch (e) {
      onAviso?.(e.message, 'erro')
    } finally {
      setBaixando(false)
    }
  }

  const outraGuia = () => abrirEmOutraGuia(material, token).catch((e) => onAviso?.(e.message, 'erro'))

  return (
    <div role="dialog" aria-modal="true" aria-label={`Leitor: ${material.titulo}`} className="fixed inset-0 z-[60] flex flex-col bg-cream-100 animate-fade-in">
      <header className="flex items-center gap-2 border-b border-brand-100 bg-white/95 px-2 py-2 backdrop-blur pt-safe">
        <button
          type="button"
          onClick={onFechar}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-brand-800 transition active:scale-90 active:bg-brand-50"
          aria-label="Voltar"
        >
          <IconeVoltar className="h-6 w-6" />
        </button>
        <div className="min-w-0 flex-1">
          <h2 className="truncate font-display text-[15px] font-semibold leading-tight text-brand-900">{material.titulo}</h2>
          <p className="text-[11px] font-semibold text-brand-900/50">
            {estado === 'pronto' ? `Página ${paginaAtual} de ${doc.numPages}` : 'PDF'}
          </p>
        </div>
        <button
          type="button"
          onClick={baixar}
          disabled={baixando}
          className="flex h-10 shrink-0 items-center gap-1.5 rounded-full bg-sun-100 px-3.5 font-display text-sm font-semibold text-sun-800 ring-1 ring-sun-200 transition active:scale-95 disabled:opacity-70"
        >
          {baixando ? <Spinner /> : <IconeBaixar className="h-4 w-4" />}
          Baixar
        </button>
      </header>

      <div ref={area} onScroll={aoRolar} className="relative flex-1 overflow-auto overscroll-contain">
        {estado === 'carregando' && (
          <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
            <Pontinhos />
            <p className="font-display text-base font-semibold text-brand-900/70">Abrindo seu material…</p>
          </div>
        )}

        {estado === 'erro' && (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-8 text-center">
            <span className="text-4xl" aria-hidden="true">😕</span>
            <p className="font-display text-lg font-semibold text-brand-900">Ops! Não deu para abrir aqui.</p>
            <p className="text-sm text-brand-900/65">{erro}</p>
            <div className="mt-2 flex w-full max-w-xs flex-col gap-2">
              <button type="button" onClick={() => setTentativa((t) => t + 1)} className="h-11 rounded-full bg-brand-500 font-display font-semibold text-white">
                Tentar novamente
              </button>
              <button type="button" onClick={outraGuia} className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-white font-display font-semibold text-brand-700 ring-1 ring-brand-200">
                Abrir em outra guia <IconeExterno className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {estado === 'pronto' && largura > 0 && (
          <div className={`flex flex-col px-3 py-3 ${zoom > 0 ? 'w-max' : ''}`} style={{ gap: GAP }}>
            {Array.from({ length: doc.numPages }, (_, i) => (
              <Pagina key={i} doc={doc} numero={i + 1} largura={largura} proporcao={proporcao} raiz={raiz} />
            ))}
            <button type="button" onClick={outraGuia} className="mx-auto mb-2 mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-brand-700 underline underline-offset-2">
              Prefere o leitor do seu celular? Abrir em outra guia <IconeExterno className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {estado === 'pronto' && (
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center pb-[calc(1rem+env(safe-area-inset-bottom))]">
          <div className="pointer-events-auto flex items-center gap-1 rounded-full bg-brand-900/85 p-1 text-white shadow-soft backdrop-blur">
            <button type="button" onClick={() => mudarZoom(-1)} disabled={zoom === 0} className="flex h-10 w-10 items-center justify-center rounded-full transition active:scale-90 disabled:opacity-35" aria-label="Diminuir zoom">
              <IconeMenos className="h-5 w-5" />
            </button>
            <span className="w-12 text-center text-xs font-bold tabular-nums">{Math.round(ZOOMS[zoom] * 100)}%</span>
            <button type="button" onClick={() => mudarZoom(1)} disabled={zoom === ZOOMS.length - 1} className="flex h-10 w-10 items-center justify-center rounded-full transition active:scale-90 disabled:opacity-35" aria-label="Aumentar zoom">
              <IconeMais className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
