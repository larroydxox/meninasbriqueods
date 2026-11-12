import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/utils/ScrollToTop.jsx'
import Landing from './pages/Landing.jsx'
import PreCheckout from './pages/PreCheckout.jsx'

// Área pós-compra carregada sob demanda: não pesa no carregamento da landing page.
const Obrigado = lazy(() => import('./pages/Obrigado.jsx'))
const MembersApp = lazy(() => import('./pages/MembersApp.jsx'))

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<div className="min-h-[100svh] bg-cream-50" />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/pre-checkout" element={<PreCheckout />} />
          <Route path="/obrigado" element={<Obrigado />} />
          <Route path="/app/:token" element={<MembersApp />} />
          <Route path="/app" element={<MembersApp />} />
        </Routes>
      </Suspense>
    </>
  )
}

export default App
