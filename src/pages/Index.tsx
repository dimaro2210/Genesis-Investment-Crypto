
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { formatCurrency, mockCryptocurrencies } from "@/utils/mockData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3, Lock, Wallet } from "lucide-react";
import { CoinIcon } from "@/components/ui/CoinIcon";

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

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 md:py-28 overflow-hidden">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background"></div>
          
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
                  <Button asChild size="lg" className="bg-gradient-button hover:opacity-90 transition-opacity">
                    <Link to="/dashboard">
                      Start Trading
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/wallet">Explore Wallet</Link>
                  </Button>
                </div>
              </div>
              
              <div className="relative">
                <div className="glass-card p-8 rounded-2xl">
                  <h3 className="text-xl font-semibold mb-4">Market Leaders</h3>
                  <div className="space-y-4">
                    {mockCryptocurrencies.slice(0, 4).map((crypto) => (
                      <div key={crypto.id} className="flex items-center justify-between p-3 bg-background/40 rounded-lg backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                          <CoinIcon symbol={crypto.symbol} size="sm" />
                          <span className="font-medium">{crypto.name}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{formatCurrency(crypto.currentPrice)}</div>
                          <div className={`text-xs ${crypto.priceChangePercentage24h >= 0 ? 'text-crypto-positive' : 'text-crypto-negative'}`}>
                            {crypto.priceChangePercentage24h >= 0 ? '+' : ''}
                            {crypto.priceChangePercentage24h.toFixed(2)}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 text-center">
                    <Link to="/dashboard" className="text-primary hover:underline font-medium">View all markets</Link>
                  </div>
                </div>
                
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/30 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-accent/30 rounded-full blur-3xl"></div>
              </div>
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
                  className="bg-background/60 backdrop-blur-sm p-6 rounded-xl border border-border hover:border-primary/50 transition-all hover:translate-y-[-5px]"
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
                  <Button asChild size="lg" className="bg-gradient-button hover:opacity-90 transition-opacity">
                    <Link to="/dashboard">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                
                <div className="lg:text-right">
                  <div className="inline-block">
                    <div className="glass-card p-6 rounded-xl inline-block">
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
      
      <Footer />
    </div>
  );
};

export default Index;
