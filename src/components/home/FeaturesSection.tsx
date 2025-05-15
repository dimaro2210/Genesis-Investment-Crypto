
import { BarChart3, Lock, Wallet } from "lucide-react";

export const FeaturesSection = () => {
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

  return (
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
  );
};
