import Hero from '../components/landing/Hero.jsx'
import MoreThanPdf from '../components/landing/MoreThanPdf.jsx'
import WhatsIncluded from '../components/landing/WhatsIncluded.jsx'
import LessScreens from '../components/landing/LessScreens.jsx'
import SkillsDeveloped from '../components/landing/SkillsDeveloped.jsx'
import PerfectFor from '../components/landing/PerfectFor.jsx'
import BonusSection from '../components/landing/BonusSection.jsx'
import TestimonialsCarousel from '../components/landing/TestimonialsCarousel.jsx'
import RealPhotosGrid from '../components/landing/RealPhotosGrid.jsx'
import WhyMomsChoose from '../components/landing/WhyMomsChoose.jsx'
import OfferSection from '../components/landing/OfferSection.jsx'
import GuaranteeSection from '../components/landing/GuaranteeSection.jsx'
import FaqAccordion from '../components/landing/FaqAccordion.jsx'
import FinalCta from '../components/landing/FinalCta.jsx'
import Footer from '../components/layout/Footer.jsx'
import StickyMobileCta from '../components/layout/StickyMobileCta.jsx'

export default function Landing() {
  return (
    <main className="bg-cream-50">
      <Hero />
      <MoreThanPdf />
      <WhatsIncluded />
      <LessScreens />
      <SkillsDeveloped />
      <PerfectFor />
      <BonusSection />
      <TestimonialsCarousel />
      <RealPhotosGrid />
      <WhyMomsChoose />
      <OfferSection />
      <GuaranteeSection />
      <FaqAccordion />
      <FinalCta />
      <Footer />
      <StickyMobileCta />
      {/* Espaço reservado para o CTA sticky não cobrir o último bloco no mobile */}
      <div className="h-16 sm:hidden" aria-hidden="true" />
    </main>
  )
}
