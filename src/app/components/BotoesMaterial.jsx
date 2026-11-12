import { useState } from 'react'
import { baixarMaterial } from '../api.js'
import { Spinner } from './Carregando.jsx'
import { IconeBaixar, IconeOlho } from './Icones.jsx'

/** Botões "Visualizar" e "Baixar" de um material. `compacto` reduz o tamanho para os cards da lista. */
export default function BotoesMaterial({ material, onVisualizar, onAviso, compacto = false }) {
  const [baixando, setBaixando] = useState(false)

  const baixar = () => {
    if (baixando) return
    setBaixando(true)
    baixarMaterial(material)
    onAviso?.('Download iniciado! 📥')
    setTimeout(() => setBaixando(false), 1200)
  }

  const tamanho = compacto ? 'h-10 px-3.5 text-sm' : 'h-12 px-5 text-base'
  return (
    <div className={compacto ? 'flex gap-2' : 'flex flex-col gap-2 min-[400px]:flex-row'}>
      <button
        type="button"
        onClick={() => onVisualizar(material)}
        className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-brand-500 font-display font-semibold text-white shadow-[0_6px_16px_-6px_rgba(71,109,212,0.6)] transition active:scale-[0.97] ${tamanho}`}
        aria-label={`Visualizar ${material.titulo}`}
      >
        <IconeOlho className="h-[1.1em] w-[1.1em]" />
        {compacto ? 'Ver' : 'Visualizar PDF'}
      </button>
      <button
        type="button"
        onClick={baixar}
        disabled={baixando}
        className={`flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-sun-100 font-display font-semibold text-sun-800 ring-1 ring-sun-200 transition active:scale-[0.97] disabled:opacity-70 ${tamanho}`}
        aria-label={`Baixar ${material.titulo}`}
      >
        {baixando ? <Spinner className="h-[1.1em] w-[1.1em]" /> : <IconeBaixar className="h-[1.1em] w-[1.1em]" />}
        {baixando ? 'Baixando…' : compacto ? 'Baixar' : 'Baixar PDF'}
      </button>
    </div>
  )
}
