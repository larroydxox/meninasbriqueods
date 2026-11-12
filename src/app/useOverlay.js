import { useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

/**
 * Painéis em tela cheia (leitor de PDF, player de vídeo) guardados no histórico do navegador:
 * o botão "voltar" do celular fecha o painel em vez de sair do app. A URL não muda.
 */
export default function useOverlay() {
  const location = useLocation()
  const navigate = useNavigate()
  const overlay = location.state?.overlay ?? null

  const abrir = useCallback(
    (valor) => navigate(location.pathname, { state: { overlay: valor } }),
    [navigate, location.pathname],
  )

  const fechar = useCallback(() => {
    // Se o painel foi aberto nesta sessão, volta uma entrada; senão (ex.: recarregou a página) só limpa o estado.
    if (window.history.state?.idx > 0) navigate(-1)
    else navigate(location.pathname, { replace: true, state: null })
  }, [navigate, location.pathname])

  return { overlay, abrir, fechar }
}
