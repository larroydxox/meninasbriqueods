/**
 * <img> padrão do projeto: lazy loading nativo + decode assíncrono, para
 * manter a performance em conexões 3G/4G (tráfego majoritário de anúncios).
 */
export default function LazyImage({ src, alt, className = '', eager = false, ...rest }) {
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className={className}
      {...rest}
    />
  )
}
