// Mapa id → arquivo criptografado em private/materiais (gerado por scripts/criptografar-materiais.mjs).
// O catálogo visual (títulos, capas, descrições) fica em src/app/catalogo.js.
export const MATERIAIS = {
  'kit-principal': 'kit-principal-210-atividades.pdf.enc',
  'pequenos-cientistas': 'pequenos-cientistas.pdf.enc',
  'diversao-em-turma': 'diversao-em-turma.pdf.enc',
  'missoes-de-faz-de-conta': 'missoes-de-faz-de-conta.pdf.enc',
  'bonus-desafios': 'bonus-30-desafios-criativos.pdf.enc',
  'bonus-moldes': 'bonus-kit-de-moldes.pdf.enc',
  'bonus-materiais': 'bonus-guia-de-materiais.pdf.enc',
  'bonus-calendario': 'bonus-calendario-30-dias.pdf.enc',
  'biblioteca-de-moldes': 'biblioteca-de-moldes.pdf.enc',
}

// Respostas de funções do Vercel têm limite de 4,5 MB; arquivos maiores são entregues em partes.
export const CHUNK_SIZE = 3 * 1024 * 1024
