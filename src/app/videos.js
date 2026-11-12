// Vídeos curtos de terceiros (YouTube). Exibidos apenas pelo player oficial incorporado,
// sem baixar nem redistribuir. Fonte: lista enviada pelo cliente (10_videos_curtos_para_o_app.json).
export const VIDEOS = [
  {
    id: 'QY3Bjcf5TaY',
    titulo: 'Sapinho com rolo de papel',
    categoria: 'Reciclagem criativa',
    cuidados: 'O adulto faz recortes; usar materiais limpos.',
    canal: 'Professora Carolina Palhas',
    url: 'https://www.youtube.com/shorts/QY3Bjcf5TaY',
  },
  {
    id: '2dQjRGpdNGw',
    titulo: 'Caminho das formas geométricas',
    categoria: 'Coordenação e movimento',
    cuidados: 'Preparar caminho sem obstáculos e materiais que escorreguem.',
    canal: 'Professora Carolina Palhas',
    url: 'https://www.youtube.com/shorts/2dQjRGpdNGw',
  },
  {
    id: 'T4wWntd6PFI',
    titulo: 'Teatro de sombras com as mãos',
    categoria: 'Imaginação',
    cuidados: 'Adulto controla lanterna; não apontar aos olhos.',
    canal: 'Professora Carolina Palhas',
    url: 'https://www.youtube.com/shorts/T4wWntd6PFI',
  },
  {
    id: 'zpNh6oly8_M',
    titulo: 'Colagem em dupla: cores e números',
    categoria: 'Arte em grupo',
    cuidados: 'Cola atóxica; adulto faz recortes difíceis.',
    canal: 'Professora Carolina Palhas',
    url: 'https://www.youtube.com/shorts/zpNh6oly8_M',
  },
  {
    id: '6zJE0bL7cNY',
    titulo: 'Coordenação motora com bolinha',
    categoria: 'Movimento e coordenação',
    cuidados: 'Para menores, substituir bolinhas pequenas por bola grande de papel.',
    canal: 'Professora Carolina Palhas',
    url: 'https://www.youtube.com/shorts/6zJE0bL7cNY',
  },
  {
    id: '-eudEpKZQXI',
    titulo: 'Arte e brincadeira para o Dia da Árvore',
    categoria: 'Natureza e criatividade',
    cuidados: 'Usar folhas seguras e sem resíduos; não coletar plantas irritantes.',
    canal: 'Professora Carolina Palhas',
    url: 'https://www.youtube.com/shorts/-eudEpKZQXI',
  },
  {
    id: 'gZ4kp-AyZkU',
    titulo: 'Medalha semáforo de papel',
    categoria: 'Papel e colagem',
    cuidados: 'Adulto recorta; não usar cordões no pescoço.',
    canal: 'Professora Carolina Palhas',
    url: 'https://www.youtube.com/shorts/gZ4kp-AyZkU',
  },
  {
    id: 'tbR9pKlBpdk',
    titulo: 'Máscara de reno para colorir',
    categoria: 'Máscaras e faz de conta',
    cuidados: 'Adulto recorta aberturas; preferir segurar a máscara sem cordões.',
    canal: 'Professora Carolina Palhas',
    url: 'https://www.youtube.com/shorts/tbR9pKlBpdk',
  },
  {
    id: 'UqTjo61Bmjw',
    titulo: 'Fantasma com prato de papel',
    categoria: 'Artesanato com papel',
    cuidados: 'Usar prato de papel sem grampos e cola atóxica.',
    canal: 'Professora Carolina Palhas',
    url: 'https://www.youtube.com/shorts/UqTjo61Bmjw',
  },
  {
    id: '62v20kdGD9w',
    titulo: 'Pintura criativa com nariz de palhaço',
    categoria: 'Pintura e texturas',
    cuidados: 'Adaptar usando esponja na mão, sem contato de tinta com rosto.',
    canal: 'Professora Carolina Palhas',
    url: 'https://www.youtube.com/shorts/62v20kdGD9w',
  },
]

export const youtubeThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
export const youtubeEmbed = (id) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`
