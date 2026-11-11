const STEP_LABELS = ['Personalizar', 'Finalizar compra']

export default function ProgressSteps({ step }) {
  return (
    <div className="mx-auto w-full max-w-md">
      <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wide text-taupe-900/50">
        <span>
          Você está a um passo · Etapa {step} de {STEP_LABELS.length}
        </span>
        <span>{Math.round((step / STEP_LABELS.length) * 100)}%</span>
      </div>
      <div className="mt-2 flex gap-2">
        {STEP_LABELS.map((label, i) => (
          <div key={label} className="h-2.5 flex-1 overflow-hidden rounded-full bg-taupe-100">
            <div
              className="h-full rounded-full bg-gradient-to-r from-taupe-500 to-taupe-400 transition-all duration-500 ease-out"
              style={{ width: step > i ? '100%' : '0%' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
