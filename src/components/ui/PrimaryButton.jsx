import { Link } from 'react-router-dom'

const base =
  'group relative inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-4 text-center font-display text-base font-semibold shadow-soft transition-transform duration-200 ease-out active:scale-[0.98] sm:w-auto sm:text-lg'

const variants = {
  primary:
    'bg-gradient-to-r from-pink-500 via-pink-500 to-pink-600 text-white hover:brightness-105 hover:-translate-y-0.5',
  gold: 'bg-gradient-to-r from-gold-400 to-gold-500 text-pink-900 hover:brightness-105 hover:-translate-y-0.5',
  ghost: 'border-2 border-pink-300 bg-white text-pink-600 hover:bg-pink-50',
}

/**
 * CTA reutilizável. Se `to` for passado, navega via React Router (usado para
 * levar da landing até a página de pré-checkout); se `href`, faz link externo
 * (usado no botão final do pré-checkout, que aponta para o checkout real).
 */
export default function PrimaryButton({ children, to, href, onClick, variant = 'primary', className = '', icon = true, ...rest }) {
  const classes = `${base} ${variants[variant]} ${className}`

  const content = (
    <>
      <span>{children}</span>
      {icon && (
        <svg
          className="h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  )

  if (to) {
    return (
      <Link to={to} onClick={onClick} className={classes} {...rest}>
        {content}
      </Link>
    )
  }

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes} {...rest}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={classes} {...rest}>
      {content}
    </button>
  )
}
