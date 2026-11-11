// Conteúdo central da página — copy em pt-BR do produto
// "+200 Atividades Criativas para Fazer em Casa", distribuída entre as seções do funil.

// Checkouts (Payt). Os preços exibidos na página precisam ser iguais aos configurados em cada checkout.
// Kit Básico — R$10,00
export const CHECKOUT_URL = 'https://checkout.payt.com.br/c9ebe7a518f77dae514b1027632c7cd5'
// Kit Completo — R$19,90
export const CHECKOUT_URL_COMPLETO = 'https://checkout.payt.com.br/98f9cb2ec5d6e38bcbfc480c145839c8'
// Oferta do modal (Kit Completo por R$15,00)
export const CHECKOUT_URL_UPSELL = 'https://checkout.payt.com.br/1497276bcda3493e32816d2ab64f396e'

export const PRICE = {
  to: 'R$10',
  installment: 'ou em até 12x no cartão',
}

export const UPSELL_PRICE = 'R$ 15,00'

export const WHATSAPP_SUPPORT = 'https://wa.me/5500000000000'

export const heroContent = {
  eyebrow: 'Material digital em PDF',
  headline: '+200 atividades criativas para fazer em casa com crianças de 3 a 8 anos',
  subheadline:
    'Ideias prontas, com lista de materiais e passo a passo, para transformar o tempo livre em casa em momentos de criação — sem precisar planejar nada.',
  checklist: [
    'Menos tempo de tela',
    'Estimula a criatividade',
    'Materiais e passo a passo em cada atividade',
    'Acesso imediato após a compra',
  ],
  ctaLabel: 'Quero o kit por R$10',
  secureLabel: 'Compra 100% segura · acesso imediato',
}

export const whatsIncluded = {
  title: 'O que você recebe',
  subtitle: 'Tudo organizado, em português, pronto para usar hoje mesmo.',
  items: [
    { title: '+200 atividades criativas', text: 'Ideias variadas para crianças de 3 a 8 anos fazerem em casa.' },
    { title: 'Lista de materiais', text: 'Cada atividade mostra o que separar antes de começar.' },
    { title: 'Passo a passo', text: 'Instruções claras para conduzir a atividade sem complicação.' },
    { title: 'Materiais do dia a dia', text: 'Atividades pensadas para itens simples, fáceis de encontrar.' },
    { title: 'Arquivos em PDF', text: 'Abra no celular, tablet ou computador — ou imprima se preferir.' },
    { title: 'Acesso imediato', text: 'Link enviado por e-mail assim que o pagamento é aprovado.' },
  ],
}

export const lessScreens = {
  title: 'Menos telas, mais criação',
  subtitle: 'Uma alternativa real ao tempo de tela, com ideias prontas para qualquer momento do dia.',
  withoutScreen: {
    label: 'Com as atividades',
    items: ['Mãos ocupadas criando', 'Ideias prontas na hora do tédio', 'Tempo de qualidade em família', 'Criatividade em vez de rolagem infinita'],
  },
  withScreen: {
    label: 'Sem as atividades (dia comum)',
    items: ['Olhos grudados na tela', 'Brincadeira passiva, sem criação', 'Cada um no seu canto', '"Tô entediado" a cada meia hora'],
  },
  footnote: 'Menos tela · mais mão na massa · mais tempo juntos.',
}

export const skillsDeveloped = {
  title: 'O que a criança desenvolve fazendo',
  subtitle: 'Cada atividade é um pequeno exercício de desenvolvimento.',
  skills: [
    { title: 'Criatividade', text: 'Inventa, mistura cores e encontra o próprio jeito de fazer.' },
    { title: 'Coordenação motora fina', text: 'Recorta, cola, dobra e desenha com as mãos.' },
    { title: 'Concentração', text: 'Segue as etapas do início ao fim de cada atividade.' },
    { title: 'Resolução de problemas', text: 'Descobre como fazer quando algo não sai como o planejado.' },
    { title: 'Autonomia', text: 'Ganha confiança para criar com cada vez menos ajuda.' },
    { title: 'Momentos em família', text: 'Aproxima adultos e crianças em torno de uma mesma mesa.' },
  ],
}

export const perfectFor = {
  title: 'Perfeito para...',
  tags: [
    'Crianças de 3 a 8 anos',
    'Pais e mães sem tempo para planejar',
    'Férias escolares',
    'Fins de semana em casa',
    'Dias de chuva',
    'Tardes depois da escola',
    'Encontros com primos e amigos',
    'Rotina com menos tela',
  ],
}

export const bonuses = {
  title: 'Os 4 bônus do Kit Completo',
  subtitle: 'Materiais extras que acompanham o Kit Completo.',
  footerLabel: 'Os 4 bônus estão inclusos no Kit Completo por R$19,90',
  items: [
    { title: '30 Desafios Criativos de até 15 minutos', text: 'Propostas rápidas para quando o tempo é curto.', icon: 'clock', image: 'bonusDesafios' },
    { title: 'Kit de Moldes para Recortar e Montar', text: 'Moldes prontos para imprimir, recortar e montar.', icon: 'scissors', image: 'bonusMoldes' },
    { title: 'Guia de Materiais Caseiros e Substituições', text: 'O que usar quando falta algum material.', icon: 'list', image: 'bonusMateriais' },
    { title: 'Calendário de 30 Dias de Diversão', text: 'Uma sugestão por dia para organizar o mês.', icon: 'calendar', image: 'bonusCalendario' },
  ],
}

export const whyMomsChoose = {
  eyebrow: 'Por que escolher',
  title: 'Por que pais e mães escolhem estas atividades',
  reasons: [
    'Alternativas práticas para reduzir o tempo de tela',
    'Estimula a criatividade em vez do modo automático',
    'Trabalha coordenação motora fina desde cedo',
    'Atividades com propósito, não só passatempo',
    'Aproxima a família em volta da mesma mesa',
    'O arquivo é seu: use quantas vezes quiser',
  ],
}

export const faqItems = [
  {
    q: 'Como eu recebo o material depois de comprar?',
    a: 'Assim que o pagamento é aprovado, você recebe o link de acesso aos PDFs no seu e-mail e pode abrir direto pelo celular — é tudo digital e imediato.',
  },
  {
    q: 'Para qual idade são as atividades?',
    a: 'As atividades foram pensadas para crianças de 3 a 8 anos. Os menores costumam precisar de mais ajuda de um adulto; os maiores conseguem seguir o passo a passo com mais autonomia.',
  },
  {
    q: 'Preciso comprar materiais caros?',
    a: 'Não. Cada atividade traz a lista do que separar, e a proposta é usar itens simples do dia a dia. No Kit Completo, o Guia de Materiais Caseiros e Substituições sugere alternativas quando faltar algo.',
  },
  {
    q: 'Preciso imprimir?',
    a: 'Não necessariamente. Você pode consultar as atividades no celular, tablet ou computador e imprimir só o que quiser. Os moldes do Kit Completo são feitos para impressão.',
  },
  {
    q: 'Qual a diferença entre o Kit Básico e o Kit Completo?',
    a: 'O Kit Básico traz as +200 atividades em PDF, com materiais e passo a passo. O Kit Completo inclui tudo isso e mais os 4 bônus: 30 Desafios Criativos de até 15 minutos, Kit de Moldes para Recortar e Montar, Guia de Materiais Caseiros e Substituições e Calendário de 30 Dias de Diversão.',
  },
  {
    q: 'Posso usar mais de uma vez?',
    a: 'Sim! O material é seu para sempre — pode consultar e imprimir quantas vezes quiser.',
  },
]

export const guarantee = {
  badgeLabel: '7 dias',
  badgeCaption: 'Garantia',
  title: '7 Dias de Garantia Incondicional',
  body: 'Se você não gostar do material, devolvemos 100% do seu dinheiro.',
  footnote: 'Sem perguntas. Sem burocracia.',
}

// Depoimentos de clientes — prints usados com autorização de quem enviou.
export const testimonials = [
  { image: 'depoimento1', width: 720, height: 944, alt: 'Print de conversa: Rafael conta que montou o dinossauro de papel com o filho e que o passo a passo ajudou bastante.' },
  { image: 'depoimento2', width: 720, height: 912, alt: 'Print de conversa no WhatsApp: Beatriz, mãe de dois, conta que os filhos agora pedem as atividades em vez do celular.' },
  { image: 'depoimento3', width: 720, height: 928, alt: 'Print de conversa: Juliana Alves conta que fez 4 atividades em um dia e que a filha já pede para fazer mais.' },
  { image: 'depoimento4', width: 720, height: 927, alt: 'Print de conversa: Maria Clara conta que fez a borboleta de papel com a filha de 5 anos.' },
  { image: 'depoimento5', width: 720, height: 927, alt: 'Print de conversa no WhatsApp: Sandra Albuquerque elogia os bônus e o passo a passo das atividades.' },
]

export const offerSection = {
  eyebrow: 'Escolha seu kit',
  title: 'Escolha o kit ideal para sua família',
}

export const offers = {
  basic: {
    name: 'Kit Básico',
    image: 'planoBasico',
    imageAlt: 'Kit Básico: +200 Atividades Criativas para fazer em casa, material digital em PDF',
    subtitle: '+200 atividades criativas para fazer em casa.',
    price: 'R$ 10,00',
    priceLabel: 'por apenas',
    installmentLabel: 'Pagamento único',
    includes: ['+200 atividades em PDF', 'Materiais de cada atividade', 'Passo a passo', 'Garantia de 7 dias'],
    ctaLabel: 'Quero o kit básico',
  },
  complete: {
    name: 'Kit Completo',
    image: 'planoCompleto',
    imageAlt: 'Kit Completo: +200 atividades criativas e os 4 bônus, material digital em PDF',
    badge: 'Atividades + 4 bônus',
    subtitle: 'Tudo do Kit Básico mais os 4 bônus.',
    price: 'R$ 19,90',
    priceLabel: 'por apenas',
    installmentLabel: 'Pagamento único',
    includes: [
      'Tudo do Kit Básico',
      '30 Desafios Criativos de até 15 minutos',
      'Kit de Moldes para Recortar e Montar',
      'Guia de Materiais Caseiros e Substituições',
      'Calendário de 30 Dias de Diversão',
    ],
    ctaLabel: 'Quero o kit completo',
  },
}

export const offerBadges = ['Garantia de 7 dias', 'Acesso imediato', 'Arquivos digitais', 'Compra segura']

export const upsellModal = {
  title: 'Você está prestes a levar o básico sem os 4 bônus.',
  subtitle: 'Leve o Kit Completo, com as +200 atividades e os 4 bônus, por um valor especial:',
  bonusItems: bonuses.items.map((item) => item.title),
  fromPrice: offers.complete.price,
  price: UPSELL_PRICE,
  ctaLabel: 'Sim, quero o completo',
  declineLabel: 'Não, prefiro continuar com o básico por R$10,00',
}

export const preCheckoutOffer = {
  title: '+200 Atividades Criativas para Fazer em Casa',
  items: ['+200 atividades em PDF', 'Lista de materiais em cada atividade', 'Passo a passo', 'Garantia de 7 dias'],
}
