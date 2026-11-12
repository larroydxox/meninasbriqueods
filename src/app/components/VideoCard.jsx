import { useState } from 'react'
import { youtubeThumb } from '../videos.js'
import { IconePlay } from './Icones.jsx'

export default function VideoCard({ video, onAbrir, indice = 0 }) {
  const [semImagem, setSemImagem] = useState(false)
  return (
    <button
      type="button"
      onClick={() => onAbrir(video)}
      className="group flex flex-col overflow-hidden rounded-[1.5rem] bg-white text-left shadow-softer ring-1 ring-brand-100/70 transition active:scale-[0.98] animate-slide-up"
      style={{ animationDelay: `${Math.min(indice, 8) * 50}ms` }}
      aria-label={`Assistir: ${video.titulo}`}
    >
      <div className="relative aspect-[9/14] w-full overflow-hidden bg-gradient-to-br from-brand-100 via-lilac-100 to-mint-100">
        {!semImagem && (
          <img
            src={youtubeThumb(video.id)}
            alt=""
            loading="lazy"
            decoding="async"
            onError={() => setSemImagem(true)}
            className="h-full w-full scale-[1.16] object-cover transition-transform duration-500 group-hover:scale-[1.22]"
          />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-brand-950/55 via-transparent to-transparent" />
        <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 text-brand-600 shadow-soft transition group-hover:scale-110">
          <IconePlay className="ml-0.5 h-5 w-5" />
        </span>
        <span className="absolute bottom-2 left-2 right-2 truncate rounded-full bg-white/90 px-2 py-0.5 text-center text-[10px] font-bold text-brand-800">
          {video.categoria}
        </span>
      </div>
      <h3 className="px-3 pb-3 pt-2.5 font-display text-sm font-semibold leading-snug text-brand-900">{video.titulo}</h3>
    </button>
  )
}
