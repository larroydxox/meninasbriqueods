// Ilustração do banner da tela inicial (SVG próprio, sem dependências).
export default function Ilustracao({ className = '' }) {
  return (
    <svg viewBox="0 0 220 150" className={className} role="img" aria-label="Duas crianças sorrindo com lápis de cor e estrelas">
      {/* Sol */}
      <g className="origin-[186px_28px] animate-[spin_24s_linear_infinite]">
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x="184.5" y="6" width="3" height="8" rx="1.5" fill="#fbc93a" transform={`rotate(${i * 45} 186 28)`} />
        ))}
      </g>
      <circle cx="186" cy="28" r="11" fill="#ffe58a" stroke="#fbc93a" strokeWidth="2" />

      {/* Estrelas */}
      {[
        [26, 26, 1],
        [120, 14, 0.8],
        [208, 70, 0.7],
      ].map(([x, y, s], i) => (
        <path
          key={i}
          d="M0-7 2 -2 7-2 3 1.5 4.5 7 0 4 -4.5 7 -3 1.5 -7-2 -2-2Z"
          fill={i === 1 ? '#ff9a5c' : '#fbc93a'}
          transform={`translate(${x} ${y}) scale(${s})`}
        />
      ))}

      {/* Criança 1 */}
      <g>
        <rect x="38" y="104" width="54" height="46" rx="22" fill="#5cc48c" />
        <rect x="56" y="112" width="18" height="6" rx="3" fill="#ffe58a" />
        <circle cx="65" cy="76" r="27" fill="#ffd9b8" />
        <path d="M38 74c0-19 13-29 28-29 16 0 27 11 26 27-6-9-15-14-26-14-11 0-21 6-28 16Z" fill="#6b3f24" />
        <circle cx="55" cy="78" r="3.2" fill="#1e2867" />
        <circle cx="75" cy="78" r="3.2" fill="#1e2867" />
        <circle cx="49" cy="87" r="4.5" fill="#ff9a5c" opacity=".45" />
        <circle cx="81" cy="87" r="4.5" fill="#ff9a5c" opacity=".45" />
        <path d="M57 88c4.5 5 11.5 5 16 0" fill="none" stroke="#1e2867" strokeWidth="2.6" strokeLinecap="round" />
      </g>

      {/* Criança 2 */}
      <g>
        <rect x="104" y="108" width="50" height="42" rx="20" fill="#679aee" />
        <circle cx="129" cy="84" r="25" fill="#c98b5e" />
        <circle cx="105" cy="70" r="9" fill="#2a1a12" />
        <circle cx="153" cy="70" r="9" fill="#2a1a12" />
        <path d="M104 82c0-17 11-25 25-25s25 8 25 25c-5-8-14-12-25-12s-20 4-25 12Z" fill="#2a1a12" />
        <circle cx="105" cy="70" r="3" fill="#ff9a5c" />
        <circle cx="153" cy="70" r="3" fill="#ff9a5c" />
        <circle cx="120" cy="86" r="3" fill="#1e2867" />
        <circle cx="138" cy="86" r="3" fill="#1e2867" />
        <circle cx="114" cy="94" r="4" fill="#ff9a5c" opacity=".4" />
        <circle cx="144" cy="94" r="4" fill="#ff9a5c" opacity=".4" />
        <path d="M122 95c3.5 4 10.5 4 14 0" fill="none" stroke="#1e2867" strokeWidth="2.4" strokeLinecap="round" />
      </g>

      {/* Lápis de cor */}
      {[
        ['#ff9a5c', 172, -18],
        ['#fbc93a', 184, -6],
        ['#5cc48c', 196, 8],
      ].map(([cor, x, rot], i) => (
        <g key={i} transform={`translate(${x} 104) rotate(${rot})`}>
          <rect x="-5" y="0" width="10" height="38" rx="2" fill={cor} />
          <path d="M-5 0 0-11 5 0Z" fill="#ffd9b8" />
          <path d="M-1.6-7.3 0-11 1.6-7.3Z" fill={cor} />
          <rect x="-5" y="30" width="10" height="5" fill="#1e2867" opacity=".18" />
        </g>
      ))}
    </svg>
  )
}
