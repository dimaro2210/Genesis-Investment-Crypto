
import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  HeroSection,
  TutorialSection,
  MarketOverviewSection,
  FeaturesSection,
  CTASection
} from "@/components/home";
import { ImageCarousel } from "@/components/home/ImageCarousel";

const Index = () => {
  const [isClient, setIsClient] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    setIsClient(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  const playBeepSound = () => {
    // Play beep sound on button click
    const audio = new Audio('/beep.mp3');
    audio.play().catch(e => console.log("Audio play error:", e));
  };
  
  return (
    <div className="flex flex-col min-h-screen relative">
      {/* Mouse follow glow - This creates a subtle glow that follows the mouse */}
      <div 
        className="fixed bg-primary/10 rounded-full blur-3xl opacity-30 pointer-events-none transition-transform duration-200 z-0"
        style={{
          width: '400px',
          height: '400px',
          left: mousePosition.x,
          top: mousePosition.y,
          transform: `translate(-50%, -50%)`
        }}
      />
      
      <Header />
      
      <main className="flex-1">
        <HeroSection playBeepSound={playBeepSound} isClient={isClient} />
        <ImageCarousel playBeepSound={playBeepSound} />
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
