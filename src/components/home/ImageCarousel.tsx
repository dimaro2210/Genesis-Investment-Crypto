
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const cryptoProjects = [
  {
    id: 1,
    name: "Bitcoin",
    image: "https://images.unsplash.com/photo-1591994843349-f415893b3a6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    description: "Bitcoin is the world's first cryptocurrency, a form of electronic cash sent peer-to-peer without the need for a financial intermediary. It was introduced in 2008 by the pseudonymous Satoshi Nakamoto.",
    marketCap: "$800B+",
    founded: "2009"
  },
  {
    id: 2,
    name: "Ethereum",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1374&q=80",
    description: "Ethereum is a decentralized platform that enables the creation of smart contracts and decentralized applications (dApps) to be built and run without downtime, fraud, control, or interference from a third party.",
    marketCap: "$250B+",
    founded: "2015"
  },
  {
    id: 3,
    name: "Cardano",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1606&q=80",
    description: "Cardano is a proof-of-stake blockchain platform that says its goal is to allow 'changemakers, innovators and visionaries' to bring about positive global change. It was founded by Ethereum co-founder Charles Hoskinson.",
    marketCap: "$10B+",
    founded: "2017"
  },
  {
    id: 4,
    name: "Solana",
    image: "https://images.unsplash.com/photo-1639762681057-408e52192e55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
    description: "Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale. It's known for its high speed and low transaction costs.",
    marketCap: "$20B+",
    founded: "2020"
  },
  {
    id: 5,
    name: "Polkadot",
    image: "https://images.unsplash.com/photo-1622630998477-20aa696ecb05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1606&q=80",
    description: "Polkadot is a next-generation blockchain protocol that connects multiple specialized chains into a single unified network. It was founded by Ethereum co-founder Dr. Gavin Wood.",
    marketCap: "$7B+",
    founded: "2020"
  }
];

export const ImageCarousel = ({ playBeepSound }: { playBeepSound: () => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [selectedProject, setSelectedProject] = useState<typeof cryptoProjects[0] | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }
    
    return () => {
      if (carouselRef.current) {
        observer.unobserve(carouselRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (autoPlay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cryptoProjects.length);
      }, 5000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [autoPlay]);
  
  const handleCardClick = (project: typeof cryptoProjects[0]) => {
    playBeepSound();
    setSelectedProject(project);
  };
  
  return (
    <section 
      ref={carouselRef}
      className="py-16 bg-secondary/10 overflow-hidden"
    >
      <div className="container">
        <h2 className="text-3xl font-bold mb-4 text-center">Explore Top Cryptocurrencies</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-center mb-10">
          Learn about the leading blockchain projects powering the future of finance and technology.
        </p>
        
        <Carousel
          className="w-full mt-8"
          opts={{ loop: true }}
        >
          <CarouselContent>
            {cryptoProjects.map((project, index) => (
              <CarouselItem key={project.id} className="md:basis-1/2 lg:basis-1/3">
                <div 
                  className={`
                    glass-card p-4 rounded-xl cursor-pointer transition-all duration-500 transform
                    hover:scale-105 hover:shadow-lg hover:shadow-primary/20
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                  `}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onClick={() => handleCardClick(project)}
                >
                  <AspectRatio ratio={16/9} className="bg-muted rounded-md overflow-hidden mb-4">
                    <img 
                      src={project.image} 
                      alt={project.name} 
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                  <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                  <p className="text-muted-foreground line-clamp-2">{project.description.substring(0, 100)}...</p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Founded: {project.founded}</span>
                    <Button variant="link" size="sm" onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(project);
                    }}>
                      Learn More
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex items-center justify-center mt-8 gap-2">
            <CarouselPrevious 
              className="relative inset-auto -left-0 top-0 translate-y-0 bg-background/80 backdrop-blur-sm"
              onClick={() => playBeepSound()}
            />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => {
                playBeepSound();
                setAutoPlay(!autoPlay);
              }}
              className="bg-background/80 backdrop-blur-sm"
            >
              {autoPlay ? "Pause" : "Play"}
            </Button>
            <CarouselNext 
              className="relative inset-auto -right-0 top-0 translate-y-0 bg-background/80 backdrop-blur-sm"
              onClick={() => playBeepSound()}
            />
          </div>
        </Carousel>

        {/* Project Detail Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
          <DialogContent className="sm:max-w-[600px]">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle>{selectedProject.name}</DialogTitle>
                  <DialogDescription>
                    Market Cap: {selectedProject.marketCap} • Founded: {selectedProject.founded}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <AspectRatio ratio={16/9} className="bg-muted rounded-md overflow-hidden mb-2">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.name} 
                      className="object-cover w-full h-full"
                    />
                  </AspectRatio>
                  <p className="text-muted-foreground">{selectedProject.description}</p>
                  <div className="flex justify-end">
                    <Button 
                      className="bg-gradient-button hover:opacity-90 transition-opacity"
                      onClick={() => {
                        playBeepSound();
                        setSelectedProject(null);
                      }}
                    >
                      Start Trading
                    </Button>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
