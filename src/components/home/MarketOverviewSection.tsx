
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface MarketOverviewSectionProps {
  playBeepSound: () => void;
}

export const MarketOverviewSection = ({ playBeepSound }: MarketOverviewSectionProps) => {
  const marketData = [
    { name: "Bitcoin", symbol: "BTC", price: 56423.45, change: 2.34 },
    { name: "Ethereum", symbol: "ETH", price: 3012.78, change: 1.56 },
    { name: "Solana", symbol: "SOL", price: 102.43, change: 5.21 },
    { name: "Cardano", symbol: "ADA", price: 0.45, change: -1.24 },
    { name: "Ripple", symbol: "XRP", price: 0.67, change: -0.35 },
    { name: "Polkadot", symbol: "DOT", price: 13.56, change: 3.67 }
  ];

  return (
    <section className="py-16 bg-secondary/20">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Market Overview</h2>
          <p className="text-muted-foreground text-lg">Live cryptocurrency prices and market trends</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {marketData.map((coin, index) => (
            <div 
              key={index} 
              className="bg-background/60 backdrop-blur-sm p-4 rounded-xl border border-border hover:border-primary/50 transition-all hover:translate-y-[-5px] hover:shadow-lg hover-3d-rotate"
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-secondary to-background flex items-center justify-center">
                  {coin.symbol.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{coin.name}</div>
                  <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                </div>
              </div>
              <div className="mt-2">
                <div className="font-bold">${coin.price.toLocaleString()}</div>
                <div className={`text-sm ${coin.change >= 0 ? 'text-crypto-positive' : 'text-crypto-negative'}`}>
                  {coin.change >= 0 ? '+' : ''}{coin.change}%
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button 
            asChild 
            variant="outline" 
            className="hover:bg-primary/5 animate-pulse-on-hover"
            onClick={playBeepSound}
          >
            <Link to="/trading">
              View All Markets
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
