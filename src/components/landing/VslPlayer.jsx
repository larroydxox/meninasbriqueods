import { useEffect, useRef, useState } from 'react'
import { video, images } from '../../assets/index.js'

/**
 * Player de vídeo vertical estilo Reels, com controles customizados
 * (play/pause, barra de progresso, som) — sem usar os controles nativos do
 * navegador, para manter a identidade visual do funil.
 */
export default function VslPlayer() {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [progress, setProgress] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = videoRef.current
    if (!el) return
    const onTime = () => {
      if (el.duration) setProgress((el.currentTime / el.duration) * 100)
    }
    const onEnd = () => setPlaying(false)
    el.addEventListener('timeupdate', onTime)
    el.addEventListener('ended', onEnd)
    return () => {
      el.removeEventListener('timeupdate', onTime)
      el.removeEventListener('ended', onEnd)
    }
  }, [])

  const togglePlay = () => {
    const el = videoRef.current
    if (!el) return
    if (el.paused) {
      el.play()
      setPlaying(true)
      setStarted(true)
    } else {
      el.pause()
      setPlaying(false)
    }
  }

  const toggleMute = (e) => {
    e.stopPropagation()
    const el = videoRef.current
    if (!el) return
    el.muted = !el.muted
    setMuted(el.muted)
  }

  const seek = (e) => {
    const el = videoRef.current
    if (!el || !el.duration) return
    const bar = e.currentTarget
    const rect = bar.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1)
    el.currentTime = ratio * el.duration
    setProgress(ratio * 100)
  }

  return (
    <div className="relative mx-auto aspect-[9/16] w-full max-w-[300px] overflow-hidden rounded-[2rem] bg-pink-950 shadow-soft ring-4 ring-white/70 sm:max-w-[320px]">
      {/* VSL_PLACEHOLDER: inserir aqui o vídeo que já está anexado no projeto */}
      <video
        ref={videoRef}
        src={video.vslVideo}
        poster={images.vslPoster}
        muted={muted}
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
        onClick={togglePlay}
      />

      {!started && (
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />
      )}

      {!playing && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={started ? 'Continuar vídeo' : 'Assistir vídeo'}
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-pink-600 shadow-lg transition-transform duration-200 hover:scale-105 animate-pulse-soft">
            <svg viewBox="0 0 24 24" className="ml-1 h-7 w-7" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </button>
      )}

      {!started && (
        <span className="absolute left-3 top-3 rounded-full bg-black/45 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white backdrop-blur-sm">
          Assista em 40s
        </span>
      )}

      {/* Barra de controles customizada */}
      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
        <div
          className="h-1.5 w-full cursor-pointer rounded-full bg-white/30"
          onClick={seek}
          role="slider"
          aria-label="Progresso do vídeo"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
        >
          <div className="h-full rounded-full bg-pink-400" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center justify-between">
          <button type="button" onClick={togglePlay} aria-label={playing ? 'Pausar' : 'Reproduzir'} className="text-white">
            {playing ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button type="button" onClick={toggleMute} aria-label={muted ? 'Ativar som' : 'Silenciar'} className="text-white">
            {muted ? (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinejoin="round" />
                <path d="m23 9-6 6M17 9l6 6" strokeLinecap="round" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <path d="M11 5 6 9H3v6h3l5 4V5Z" strokeLinejoin="round" />
                <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 6a9 9 0 0 1 0 12" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
