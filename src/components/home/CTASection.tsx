
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BarChart3 } from "lucide-react";

interface CTASectionProps {
  playBeepSound: () => void;
}

export const CTASection = ({ playBeepSound }: CTASectionProps) => {
  return (
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
  );
};
