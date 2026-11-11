export default function Footer() {
  return (
    <footer className="bg-taupe-950 py-10 text-center text-white/60">
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-3 px-5 sm:px-8">
        <span className="font-display text-lg font-semibold text-white">+200 Atividades Criativas para Fazer em Casa</span>
        <p className="max-w-md text-xs leading-relaxed sm:text-sm">
          Produto 100% digital. Após a confirmação do pagamento, o acesso aos arquivos é enviado imediatamente por
          e-mail. Este site não é afiliado ao Instagram, Facebook ou Meta.
        </p>
        <p className="text-xs">© {new Date().getFullYear()} Atividades Criativas para Fazer em Casa. Todos os direitos reservados.</p>
      </div>
    </footer>
  )
}
