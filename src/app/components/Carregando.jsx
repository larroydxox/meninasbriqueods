export function Pontinhos({ className = '' }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`} role="status" aria-label="Carregando">
      {['bg-brand-400', 'bg-sun-400', 'bg-mint-400'].map((cor, i) => (
        <span
          key={cor}
          className={`h-2.5 w-2.5 rounded-full ${cor}`}
          style={{ animation: `bounce-dot 1.2s ease-in-out ${i * 0.16}s infinite` }}
        />
      ))}
    </span>
  )
}

export function Spinner({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={`animate-spin ${className}`} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeOpacity=".25" strokeWidth="3" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  )
}
