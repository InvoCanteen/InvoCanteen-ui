import Header from "@/components/LandingPage/Header";
import HeroSection from "@/components/LandingPage/HeroSection";
import FeaturesSection from "@/components/LandingPage/FeaturesSection";
import WhyChooseSection from "@/components/LandingPage/WhyChooseSection";
import Footer from "@/components/LandingPage/Footer";

export default function Home() {
  return (

    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <FeaturesSection />
      <WhyChooseSection />
      <Footer />
    </div>
  );
}
