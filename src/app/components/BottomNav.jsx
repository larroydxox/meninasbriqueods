const ABAS = [
  { id: 'inicio', rotulo: 'Início', emoji: '🏠' },
  { id: 'materiais', rotulo: 'Materiais', emoji: '📚' },
  { id: 'videos', rotulo: 'Vídeos', emoji: '🎬' },
]

export default function BottomNav({ aba, onTrocar }) {
  return (
    <nav
      aria-label="Navegação do app"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-brand-100 bg-white/90 backdrop-blur-md pb-safe"
    >
      <ul className="mx-auto flex max-w-md items-stretch justify-around px-3 pt-2 pb-2">
        {ABAS.map((item) => {
          const ativa = item.id === aba
          return (
            <li key={item.id} className="flex-1">
              <button
                type="button"
                onClick={() => onTrocar(item.id)}
                aria-current={ativa ? 'page' : undefined}
                className="group flex w-full flex-col items-center gap-0.5 rounded-2xl py-1 transition active:scale-95"
              >
                <span
                  className={`flex h-9 w-14 items-center justify-center rounded-full text-xl transition-all duration-300 ${
                    ativa ? 'bg-brand-100 scale-110' : 'bg-transparent grayscale-[40%]'
                  }`}
                  aria-hidden="true"
                >
                  {item.emoji}
                </span>
                <span className={`text-xs transition-colors ${ativa ? 'font-extrabold text-brand-700' : 'font-semibold text-brand-900/50'}`}>
                  {item.rotulo}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
