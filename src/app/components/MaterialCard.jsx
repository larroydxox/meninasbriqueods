import LazyImage from '../../components/ui/LazyImage.jsx'
import BotoesMaterial from './BotoesMaterial.jsx'

const corDaCategoria = {
  principais: 'bg-brand-100 text-brand-700',
  extras: 'bg-mint-100 text-mint-800',
  bonus: 'bg-sun-100 text-sun-800',
  moldes: 'bg-peach-100 text-peach-800',
}

export function SeloPdf({ material }) {
  return (
    <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wide text-brand-900/45">
      <span className="rounded-md bg-peach-100 px-1.5 py-0.5 text-peach-800">PDF</span>
      {material.paginas} páginas · {material.tamanho}
    </span>
  )
}

export default function MaterialCard({ material, categoria, token, onVisualizar, onAviso, indice = 0 }) {
  return (
    <article
      className="flex gap-3.5 rounded-[1.75rem] bg-white p-3.5 shadow-softer ring-1 ring-brand-100/70 animate-slide-up"
      style={{ animationDelay: `${Math.min(indice, 8) * 50}ms` }}
    >
      <button
        type="button"
        onClick={() => onVisualizar(material)}
        className="relative w-[5.5rem] shrink-0 self-start overflow-hidden rounded-2xl bg-cream-100 ring-1 ring-brand-100 transition active:scale-[0.97]"
        aria-label={`Visualizar ${material.titulo}`}
      >
        <LazyImage src={material.capa} alt={`Capa de ${material.titulo}`} width={640} height={906} className="block aspect-[640/906] w-full object-cover" />
      </button>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className={`self-start rounded-full px-2.5 py-0.5 text-[11px] font-bold ${corDaCategoria[material.categoria]}`}>
          {categoria.emoji} {categoria.nome}
        </span>
        <h3 className="mt-1.5 font-display text-base font-semibold leading-snug text-brand-900">{material.titulo}</h3>
        <p className="mt-0.5 text-[13px] leading-snug text-brand-900/65">{material.descricao}</p>
        <div className="mt-2">
          <SeloPdf material={material} />
        </div>
        <div className="mt-3">
          <BotoesMaterial material={material} token={token} onVisualizar={onVisualizar} onAviso={onAviso} compacto />
        </div>
      </div>
    </article>
  )
}
