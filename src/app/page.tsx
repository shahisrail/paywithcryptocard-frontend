import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VirtualCardSection from "@/components/VirtualCardSection";
import BrandLogosSection from "@/components/BrandLogosSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import BenefitsSection from "@/components/BenefitsSection";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import SupportSection from "@/components/SupportSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <VirtualCardSection />
        <BrandLogosSection />
        <HowItWorksSection />
        <BenefitsSection />
        <FAQSection />
        <CTASection />
        <SupportSection />
      </main>
      <Footer />
    </div>
  );
}
