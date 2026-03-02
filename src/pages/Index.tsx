import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CTASection from "@/components/landing/CTASection";

const Index = () => (
  <div className="min-h-screen bg-background">
    <section className="relative mt-16 bg-gradient-to-br from-slate-900 via-slate-950 to-black text-white py-0 overflow-hidden"></section>
    <Navbar />
    <HeroSection />
    <FeaturesSection />
    <HowItWorksSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
