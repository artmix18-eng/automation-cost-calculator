import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import Hero from "@/components/sections/hero"
import PainPoints from "@/components/sections/pain-points"
import HowItWorks from "@/components/sections/how-it-works"
import SavingsCalculator from "@/components/sections/savings-calculator"
import UseCasesSection from "@/components/sections/use-cases-section"
import FaqSection from "@/components/sections/faq-section"
import CtaSection from "@/components/sections/cta-section"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PainPoints />
        <HowItWorks />
        <SavingsCalculator />
        <UseCasesSection />
        <FaqSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}
