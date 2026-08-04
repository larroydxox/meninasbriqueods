import useInView from '../../hooks/useInView.js'

/**
 * Wrapper genérico para micro-animação de entrada ao rolar (fade + slide leve).
 * `delay` em ms para escalonar itens de uma lista/grid.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView()

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'is-visible' : ''} ${className}`}
      style={inView ? { animationDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
