
import React, { useEffect, useState } from "react";
import { BarChart3 } from "lucide-react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 4; // Increment by 4 to reach 100 in ~5 seconds (with 50ms interval)
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 300);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center animate-pulse">
          <BarChart3 className="h-10 w-10 text-white" />
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          Genesis Investment
        </h1>
        
        <div className="w-64 h-2 bg-secondary/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          Loading {progress}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
