
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SplineScene from "@/components/3d/SplineScene";

interface HeroSectionProps {
  playBeepSound: () => void;
  isClient: boolean;
}

export const HeroSection = ({ playBeepSound, isClient }: HeroSectionProps) => {
  return (
    <section className="relative py-20 md:py-28 overflow-hidden">
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute w-full h-full object-cover opacity-30"
        >
          <source src="https://player.vimeo.com/external/371848086.hd.mp4?s=224743bcc91458347979800fe4a391692c3ff6f1&profile_id=172&oauth2_token_id=57447761" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-background/80 to-background"></div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col animate-slide-up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              The Next-Gen Crypto Trading Platform
            </h1>
            <p className="text-xl mb-8 text-muted-foreground">
              Trade cryptocurrencies with confidence using our powerful and intuitive trading platform. Advanced tools, real-time data, and secure wallet management.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-gradient-button hover:opacity-90 transition-opacity animate-pulse-on-hover"
                onClick={playBeepSound}
              >
                <Link to="/dashboard">
                  Start Trading
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                onClick={playBeepSound}
              >
                <Link to="/wallet">Explore Wallet</Link>
              </Button>
            </div>
          </div>
          
          <div className="relative">
            {/* 3D Spline Scene */}
            {isClient && <WalletPreview playBeepSound={playBeepSound} />}
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent/30 rounded-full blur-3xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const WalletPreview = ({ playBeepSound }: { playBeepSound: () => void }) => {
  const mockWalletAssets = [
    { id: 1, name: "Bitcoin", symbol: "BTC" },
    { id: 2, name: "Ethereum", symbol: "ETH" },
    { id: 3, name: "Solana", symbol: "SOL" }
  ];

  return (
    <div className="glass-card p-4 rounded-2xl hover-3d-rotate">
      <div className="mb-6 p-4 rounded-xl bg-background/40 backdrop-blur-md border border-border/50 mx-2 my-3">
        <h3 className="text-xl font-semibold text-center">Your Crypto Wallet</h3>
      </div>
      
      <div className="h-64 md:h-80 mb-6">
        <SplineScene scene="https://prod.spline.design/CJ2XzSA5czcs9lxi/scene.splinecode" />
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between mb-4 p-3 bg-background/40 backdrop-blur-sm rounded-lg">
          <span className="text-muted-foreground">Total Balance</span>
          <span className="font-bold text-lg">$0.00</span>
        </div>
        
        {mockWalletAssets.slice(0, 3).map((asset) => (
          <div key={asset.id} className="flex items-center justify-between p-3 bg-background/40 rounded-lg backdrop-blur-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-background flex items-center justify-center">
                {asset.symbol.charAt(0)}
              </div>
              <div>
                <span className="font-medium">{asset.name}</span>
                <div className="text-xs text-muted-foreground">0 {asset.symbol}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="font-semibold">$0.00</div>
              <div className="text-xs text-crypto-positive">
                0.00%
              </div>
            </div>
          </div>
        ))}

        <div className="flex gap-2 mt-6">
          <Button 
            variant="default" 
            className="w-full bg-gradient-button hover:opacity-90 transition-opacity animate-pulse-on-hover"
            onClick={playBeepSound}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M12 5v14"/>
              <path d="m19 12-7 7-7-7"/>
            </svg>
            Deposit
          </Button>
          <Button 
            variant="outline" 
            className="w-full animate-pulse-on-hover"
            onClick={playBeepSound}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
              <path d="M12 19V5"/>
              <path d="m5 12 7-7 7 7"/>
            </svg>
            Send
          </Button>
        </div>
      </div>
      <div className="mt-6 text-center">
        <Link 
          to="/wallet" 
          className="text-primary hover:underline font-medium"
          onClick={playBeepSound}
        >
          Manage your wallet
        </Link>
      </div>
    </div>
  );
};
