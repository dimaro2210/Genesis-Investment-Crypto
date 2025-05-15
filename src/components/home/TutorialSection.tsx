
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Play } from "lucide-react";

interface TutorialSectionProps {
  playBeepSound: () => void;
}

export const TutorialSection = ({ playBeepSound }: TutorialSectionProps) => {
  const [isYoutubeDialogOpen, setIsYoutubeDialogOpen] = useState(false);
  
  return (
    <section className="py-16 bg-secondary/10">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-3">Learn Crypto Trading</h2>
          <p className="text-muted-foreground text-lg">Watch our tutorial videos to get started with cryptocurrency trading</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div 
            className="relative bg-black/70 rounded-xl overflow-hidden aspect-video hover:shadow-lg transition-shadow cursor-pointer" 
            onClick={() => setIsYoutubeDialogOpen(true)}
          >
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
            <TutorialCard 
              title="Crypto 101"
              description="Basic concepts and terminology for beginners"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"/>
                </svg>
              }
              playBeepSound={playBeepSound}
            />
            
            <TutorialCard 
              title="Trading Strategies"
              description="Learn effective strategies for crypto trading"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m2 2 20 20"/>
                  <path d="M18.5 17.4a7 7 0 0 0-10.7-9"/>
                  <path d="M7.1 7.7a7 7 0 0 0 9.7 10.6"/>
                  <path d="M12 6c-3.2 0-6 2.8-6 6 0 1.5.5 2.8 1.3 3.7"/>
                  <path d="M12 18c3.2 0 6-2.8 6-6 0-1.3-.5-2.6-1.3-3.7"/>
                  <path d="M14 16h-4v-4"/>
                </svg>
              }
              playBeepSound={playBeepSound}
            />
            
            <TutorialCard 
              title="Wallet Security"
              description="Protect your crypto assets with best practices"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 12V8H6a2 2 0 1 1 0-4h12v4"/>
                  <path d="M4 12v4h14a2 2 0 1 1 0 4H4v-4"/>
                </svg>
              }
              playBeepSound={playBeepSound}
            />
          </div>
        </div>
      </div>

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
    </section>
  );
};

interface TutorialCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  playBeepSound: () => void;
}

const TutorialCard = ({ title, description, icon, playBeepSound }: TutorialCardProps) => {
  return (
    <Button 
      variant="outline" 
      className="p-6 h-auto flex flex-col items-center text-center hover:bg-primary/5 hover-3d-rotate"
      onClick={playBeepSound}
    >
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
        <div className="text-primary">{icon}</div>
      </div>
      <h4 className="text-lg font-medium mb-2">{title}</h4>
      <p className="text-muted-foreground text-sm">{description}</p>
    </Button>
  );
};
