import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import WhySection from "@/components/WhySection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";
import SupportChatWidget from "@/components/SupportChatWidget";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="bg-white">
        <HeroSection />
        <HowItWorksSection />
        <WhySection />
        <FAQSection />
      </main>
      <Footer />
      <SupportChatWidget />
    </div>
  );
}
