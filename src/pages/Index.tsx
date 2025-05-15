
import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { formatCurrency, mockCryptocurrencies, mockWalletAssets } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Lock, Wallet, Play } from "lucide-react";
import { CoinIcon } from "@/components/ui/CoinIcon";
import SplineScene from "@/components/3d/SplineScene";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const features = [
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Advanced Trading Tools",
    description: "Access professional-grade charts, indicators, and trading tools to make informed decisions."
  },
  {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up">
      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
      <polyline points="16 7 22 7 22 13"/>
    </svg>,
    title: "Real-time Market Data",
    description: "Stay updated with live price feeds, market movements, and trading volume across major cryptocurrencies."
  },
  {
    icon: <Wallet className="h-6 w-6" />,
    title: "Secure Wallet Management",
    description: "Manage your crypto assets with our secure wallet system, supporting major cryptocurrencies."
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "Bank-grade Security",
    description: "Your assets are protected with enterprise-grade security and advanced encryption technology."
  }
];

const marketData = [
  { name: "Bitcoin", symbol: "BTC", price: 56423.45, change: 2.34 },
  { name: "Ethereum", symbol: "ETH", price: 3012.78, change: 1.56 },
  { name: "Solana", symbol: "SOL", price: 102.43, change: 5.21 },
  { name: "Cardano", symbol: "ADA", price: 0.45, change: -1.24 },
  { name: "Ripple", symbol: "XRP", price: 0.67, change: -0.35 },
  { name: "Polkadot", symbol: "DOT", price: 13.56, change: 3.67 }
];

const Index = () => {
  const [isClient, setIsClient] = useState(false);
  const [isYoutubeDialogOpen, setIsYoutubeDialogOpen] = useState(false);
  
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
        {/* Hero Section */}
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
                {isClient && (
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
                            <CoinIcon symbol={asset.symbol} size="sm" />
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
                )}
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent/30 rounded-full blur-3xl"></div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Crypto Tutorial Section */}
        <section className="py-16 bg-secondary/10">
          <div className="container">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Learn Crypto Trading</h2>
              <p className="text-muted-foreground text-lg">Watch our tutorial videos to get started with cryptocurrency trading</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative bg-black/70 rounded-xl overflow-hidden aspect-video hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setIsYoutubeDialogOpen(true)}>
                <img 
                  src="https://img.youtube.com/vi/1YyAzVmP9xQ/maxresdefault.jpg" 
                  alt="Crypto Trading Tutorial" 
                  className="w-full h-full object-cover opacity-70"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary/80 rounded-full flex items-center justify-center animate-pulse">
                    <Play className="h-10 w-10 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-2xl font-bold text-white mb-2">Complete Crypto Trading Guide for Beginners</h3>
                  <p className="text-white/80">Learn the fundamentals of cryptocurrency trading in this comprehensive guide</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <Button 
                  variant="outline" 
                  className="p-6 h-auto flex flex-col items-center text-center hover:bg-primary/5 hover-3d-rotate"
                  onClick={playBeepSound}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium mb-2">Crypto 101</h4>
                  <p className="text-muted-foreground text-sm">Basic concepts and terminology for beginners</p>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="p-6 h-auto flex flex-col items-center text-center hover:bg-primary/5 hover-3d-rotate"
                  onClick={playBeepSound}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="m2 2 20 20"/>
                      <path d="M18.5 17.4a7 7 0 0 0-10.7-9"/>
                      <path d="M7.1 7.7a7 7 0 0 0 9.7 10.6"/>
                      <path d="M12 6c-3.2 0-6 2.8-6 6 0 1.5.5 2.8 1.3 3.7"/>
                      <path d="M12 18c3.2 0 6-2.8 6-6 0-1.3-.5-2.6-1.3-3.7"/>
                      <path d="M14 16h-4v-4"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium mb-2">Trading Strategies</h4>
                  <p className="text-muted-foreground text-sm">Learn effective strategies for crypto trading</p>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="p-6 h-auto flex flex-col items-center text-center hover:bg-primary/5 hover-3d-rotate"
                  onClick={playBeepSound}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                      <path d="M20 12V8H6a2 2 0 1 1 0-4h12v4"/>
                      <path d="M4 12v4h14a2 2 0 1 1 0 4H4v-4"/>
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium mb-2">Wallet Security</h4>
                  <p className="text-muted-foreground text-sm">Protect your crypto assets with best practices</p>
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Market Overview Section */}
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
        
        {/* Features Section */}
        <section className="py-20 bg-secondary/30">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Trading Platform Features</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Everything you need to trade cryptocurrencies effectively, all in one powerful platform.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="bg-background/60 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/50 transition-all hover:translate-y-[-5px] hover:shadow-lg hover-3d-rotate"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20">
          <div className="container">
            <div className="bg-gradient-card rounded-2xl p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">Ready to Start Trading?</h2>
                  <p className="text-muted-foreground text-lg mb-6">
                    Join thousands of traders and investors who trust our platform for their cryptocurrency trading needs.
                  </p>
                  <Button 
                    asChild 
                    size="lg" 
                    className="bg-gradient-button hover:opacity-90 transition-opacity animate-pulse-on-hover"
                    onClick={playBeepSound}
                  >
                    <Link to="/signup">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="lg:text-right">
                  <div className="inline-block">
                    <div className="glass-card p-6 rounded-xl inline-block hover-3d-rotate">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                          <BarChart3 className="h-6 w-6 text-white" />
                        </div>
                        <span className="font-bold text-xl">CryptoMate</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>24h Trading Volume</p>
                        <p className="text-xl font-bold text-foreground mt-1">$1,258,934,523</p>
                      </div>
                      <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground">
                        <p>Active Users</p>
                        <p className="text-xl font-bold text-foreground mt-1">2.8M+</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* YouTube Video Dialog */}
      <Dialog open={isYoutubeDialogOpen} onOpenChange={setIsYoutubeDialogOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <div className="aspect-video">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/1YyAzVmP9xQ?autoplay=1" 
              title="Crypto Trading Tutorial" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Index;
