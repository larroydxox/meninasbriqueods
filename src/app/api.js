// Ações dos materiais. A área é aberta: os PDFs são arquivos estáticos em public/materiais
// (servidos em /materiais/<arquivo>), sem token nem login.

export const urlDoMaterial = (material) => `/materiais/${encodeURIComponent(material.arquivo)}`

export function baixarMaterial(material) {
  const a = document.createElement('a')
  a.href = urlDoMaterial(material)
  a.download = material.arquivo
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  a.remove()
}

// Abre o PDF no leitor nativo do navegador, em outra guia.
export function abrirEmOutraGuia(material) {
  window.open(urlDoMaterial(material), '_blank', 'noopener')
}
