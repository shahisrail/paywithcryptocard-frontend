import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import VirtualCardSection from "@/components/VirtualCardSection";
import FundingSection from "@/components/FundingSection";
import AcceptanceSection from "@/components/AcceptanceSection";
import FlowSection from "@/components/FlowSection";
import FAQSection from "@/components/FAQSection";
import SupportSection from "@/components/SupportSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <VirtualCardSection />
        <FundingSection />
        <AcceptanceSection />
        <FlowSection />
        <FAQSection />
        <SupportSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
