import { useEffect } from 'react'

const VTURB_PLAYER_ID = 'vid-6af4d4c449fa01f70b9d855c'
const VTURB_SCRIPT_SRC =
  'https://scripts.converteai.net/024590ef-b4ca-43a4-a75c-0a9df74f8954/players/6af4d4c449fa01f70b9d855c/v4/player.js'

/**
 * VSL vertical (9:16) hospedada na vturb (ConverteAI). O script do player é
 * injetado uma única vez no <head> e renderiza o vídeo dentro de <vturb-smartplayer>.
 */
export default function VslPlayer() {
  useEffect(() => {
    if (document.querySelector(`script[src="${VTURB_SCRIPT_SRC}"]`)) return
    const s = document.createElement('script')
    s.src = VTURB_SCRIPT_SRC
    s.async = true
    document.head.appendChild(s)
  }, [])

  return (
    <div className="relative mx-auto w-full max-w-[300px] overflow-hidden rounded-[2rem] bg-black shadow-soft ring-4 ring-white/70 sm:max-w-[320px]">
      <vturb-smartplayer id={VTURB_PLAYER_ID} style={{ display: 'block', margin: '0 auto', width: '100%', maxWidth: '400px' }}>
        <div
          className="vturb-player-placeholder"
          style={{ position: 'relative', width: '100%', padding: '177.77777777777777% 0 0', zIndex: 0, backgroundColor: 'black' }}
        />
      </vturb-smartplayer>
    </div>
  )
}
