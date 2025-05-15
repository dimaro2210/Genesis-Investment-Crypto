
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  HeroSection,
  TutorialSection,
  MarketOverviewSection,
  FeaturesSection,
  CTASection
} from "@/components/home";

const Index = () => {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const playBeepSound = () => {
    // Play beep sound on button click
    const audio = new Audio('/beep.mp3');
    audio.play().catch(e => console.log("Audio play error:", e));
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <HeroSection playBeepSound={playBeepSound} isClient={isClient} />
        <TutorialSection playBeepSound={playBeepSound} />
        <MarketOverviewSection playBeepSound={playBeepSound} />
        <FeaturesSection />
        <CTASection playBeepSound={playBeepSound} />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
