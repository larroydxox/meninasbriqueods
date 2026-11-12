import { useEffect, useState } from 'react'
import { youtubeEmbed } from '../videos.js'
import { Pontinhos } from './Carregando.jsx'
import { IconeExterno, IconeFechar } from './Icones.jsx'

/** Player oficial do YouTube incorporado (youtube-nocookie). Nada é baixado nem redistribuído. */
export default function VideoPlayer({ video, onFechar }) {
  const [carregado, setCarregado] = useState(false)
  useEffect(() => {
    const anterior = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = anterior
    }
  }, [])
  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-brand-950/70 backdrop-blur-sm animate-fade-in sm:items-center" onClick={onFechar}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={video.titulo}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-t-[2rem] bg-white px-4 pt-4 shadow-soft animate-sheet-in pb-safe sm:rounded-[2rem] sm:pb-4"
      >
        <div className="mb-3 flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <span className="text-[11px] font-bold uppercase tracking-wide text-mint-600">{video.categoria}</span>
            <h2 className="font-display text-lg font-semibold leading-snug text-brand-900">{video.titulo}</h2>
          </div>
          <button
            type="button"
            onClick={onFechar}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-900/70 transition active:scale-90"
            aria-label="Fechar vídeo"
          >
            <IconeFechar className="h-5 w-5" />
          </button>
        </div>

        <div className="relative mx-auto aspect-[9/16] max-h-[58svh] overflow-hidden rounded-3xl bg-brand-950">
          {!carregado && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Pontinhos />
            </div>
          )}
          <iframe
            src={youtubeEmbed(video.id)}
            title={video.titulo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            onLoad={() => setCarregado(true)}
            className="absolute inset-0 h-full w-full"
          />
        </div>

        <p className="mt-3 rounded-2xl bg-sun-50 px-3.5 py-2.5 text-[13px] leading-snug text-sun-800 ring-1 ring-sun-200">
          <strong>Cuidados:</strong> {video.cuidados}
        </p>

        <div className="mt-3 flex items-center justify-between gap-3 pb-4 text-xs text-brand-900/55">
          <span className="truncate">Canal: {video.canal}</span>
          <a
            href={video.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1 rounded-full bg-brand-50 px-3 py-1.5 font-bold text-brand-700"
          >
            Abrir no YouTube <IconeExterno className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  )
}
