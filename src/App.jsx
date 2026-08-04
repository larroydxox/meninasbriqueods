import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/utils/ScrollToTop.jsx'
import Landing from './pages/Landing.jsx'
import PreCheckout from './pages/PreCheckout.jsx'

function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/pre-checkout" element={<PreCheckout />} />
      </Routes>
    </>
  )
}

export default App
