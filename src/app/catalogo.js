// Catálogo visual dos materiais do mini app. Os PDFs ficam em public/materiais/<arquivo>.
import capaKit from '../assets/app/capas/kit-principal-210-atividades.webp'
import capaCientistas from '../assets/app/capas/pequenos-cientistas.webp'
import capaTurma from '../assets/app/capas/diversao-em-turma.webp'
import capaMissoes from '../assets/app/capas/missoes-de-faz-de-conta.webp'
import capaDesafios from '../assets/app/capas/bonus-30-desafios-criativos.webp'
import capaMoldes from '../assets/app/capas/bonus-kit-de-moldes.webp'
import capaMateriais from '../assets/app/capas/bonus-guia-de-materiais.webp'
import capaCalendario from '../assets/app/capas/bonus-calendario-30-dias.webp'
import capaBiblioteca from '../assets/app/capas/biblioteca-de-moldes.webp'

export const CATEGORIAS = [
  { id: 'principais', nome: 'Atividades principais', emoji: '🎨', cor: 'brand' },
  { id: 'extras', nome: 'Materiais extras', emoji: '🧪', cor: 'mint' },
  { id: 'bonus', nome: 'Bônus especiais', emoji: '🎁', cor: 'sun' },
  { id: 'moldes', nome: 'Moldes adicionais', emoji: '✂️', cor: 'peach' },
]

export const MATERIAIS = [
  {
    id: 'kit-principal',
    categoria: 'principais',
    titulo: '+200 Atividades Criativas',
    subtitulo: '210 atividades práticas',
    descricao:
      'Sete mundos de ideias para crianças de 3 a 8 anos, com materiais simples, passos claros e propostas que cabem na rotina.',
    capa: capaKit,
    paginas: 98,
    tamanho: '417 KB',
    arquivo: '210-Atividades-Criativas.pdf',
  },
  {
    id: 'pequenos-cientistas',
    categoria: 'extras',
    titulo: 'Pequenos Cientistas',
    subtitulo: '30 experiências',
    descricao: 'Investigações caseiras com pergunta, hipótese e observação, explicadas em linguagem de família.',
    capa: capaCientistas,
    paginas: 65,
    tamanho: '304 KB',
    arquivo: 'Pequenos-Cientistas-30-Experiencias.pdf',
  },
  {
    id: 'diversao-em-turma',
    categoria: 'extras',
    titulo: 'Diversão em Turma',
    subtitulo: '40 brincadeiras',
    descricao: 'Jogos para irmãos, primos e amigos, com regras claras e cooperação, sem precisar de muito espaço.',
    capa: capaTurma,
    paginas: 41,
    tamanho: '299 KB',
    arquivo: 'Diversao-em-Turma-40-Brincadeiras.pdf',
  },
  {
    id: 'missoes-de-faz-de-conta',
    categoria: 'extras',
    titulo: 'Missões de Faz de Conta',
    subtitulo: '40 missões + 10 histórias',
    descricao: 'Cenários, personagens e pequenos enredos para criar aventuras no sofá, no tapete e na mesa.',
    capa: capaMissoes,
    paginas: 51,
    tamanho: '294 KB',
    arquivo: 'Missoes-de-Faz-de-Conta.pdf',
  },
  {
    id: 'bonus-desafios',
    categoria: 'bonus',
    titulo: '30 Desafios Criativos',
    subtitulo: 'de até 15 minutos',
    descricao: 'Propostas rápidas, com poucos materiais e um começo fácil, para os dias corridos.',
    capa: capaDesafios,
    paginas: 31,
    tamanho: '238 KB',
    arquivo: 'Bonus-30-Desafios-Criativos.pdf',
  },
  {
    id: 'bonus-moldes',
    categoria: 'bonus',
    titulo: 'Kit de Moldes para Recortar e Montar',
    subtitulo: 'páginas para imprimir',
    descricao: 'Máscaras, personagens, jogos, cartas, roleta e dados de história para recortar e brincar.',
    capa: capaMoldes,
    paginas: 59,
    tamanho: '5,8 MB',
    arquivo: 'Bonus-Kit-de-Moldes.pdf',
  },
  {
    id: 'bonus-materiais',
    categoria: 'bonus',
    titulo: 'Guia de Materiais Caseiros',
    subtitulo: '36 materiais + trocas',
    descricao: 'Materiais comuns com alternativas, usos e cuidados para criar com o que você já tem em casa.',
    capa: capaMateriais,
    paginas: 19,
    tamanho: '204 KB',
    arquivo: 'Bonus-Guia-de-Materiais-Caseiros.pdf',
  },
  {
    id: 'bonus-calendario',
    categoria: 'bonus',
    titulo: 'Calendário de 30 Dias de Diversão',
    subtitulo: 'uma ideia por dia',
    descricao: 'Uma sugestão por dia, com materiais e instrução rápida. Pule, troque ou repita as favoritas.',
    capa: capaCalendario,
    paginas: 14,
    tamanho: '207 KB',
    arquivo: 'Bonus-Calendario-30-Dias.pdf',
  },
  {
    id: 'biblioteca-de-moldes',
    categoria: 'moldes',
    titulo: 'Biblioteca de Moldes de Recorte e Colagem',
    subtitulo: '16 moldes gratuitos',
    descricao: 'Catálogo com links e QR codes para 16 moldes de domínio público, prontos para imprimir.',
    capa: capaBiblioteca,
    paginas: 6,
    tamanho: '87 KB',
    arquivo: 'Biblioteca-de-Moldes.pdf',
  },
]

export const KIT_PRINCIPAL = MATERIAIS[0]

export const getMaterial = (id) => MATERIAIS.find((m) => m.id === id)

const normalizar = (texto) =>
  texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')

export function buscarMateriais(termo) {
  const t = normalizar(termo.trim())
  if (!t) return MATERIAIS
  return MATERIAIS.filter((m) => normalizar(`${m.titulo} ${m.subtitulo} ${m.descricao}`).includes(t))
}
