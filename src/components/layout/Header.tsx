
import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { BarChart3, Bot, Home, LogIn, Menu, User, Wallet, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [chatbotOpen, setChatbotOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const user = localStorage.getItem("user");
      setIsAuthenticated(!!user);
    };
    
    checkAuth();
    
    // Add an event listener to check auth status when storage changes
    window.addEventListener("storage", checkAuth);
    
    // Add scroll event listener
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    
    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    
    navigate("/");
    setMobileMenuOpen(false);
  };
  
  const connectWallet = () => {
    toast({
      title: "Wallet Connection",
      description: "This is a demo. In a real app, this would connect to your crypto wallet.",
    });
  };
  
  return (
    <header className={cn(
      "sticky top-0 z-50 bg-background/60 backdrop-blur-md border border-border m-2 transition-all duration-300 ease-in-out",
      scrolled ? "rounded-lg py-2" : "rounded-3xl py-3"
    )}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className={cn(
              "font-bold transition-all duration-300",
              scrolled ? "text-lg" : "text-xl"
            )}>Genesis Investment</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/blog" className="text-sm font-medium transition-colors hover:text-primary">
            Blog
          </Link>
          {isAuthenticated && (
            <>
              <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
                Dashboard
              </Link>
              <Link to="/trading" className="text-sm font-medium transition-colors hover:text-primary">
                Trading
              </Link>
              <Link to="/wallet" className="text-sm font-medium transition-colors hover:text-primary">
                Wallet
              </Link>
            </>
          )}
        </nav>
        
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-full text-primary hover:bg-primary/10"
            onClick={() => setChatbotOpen(true)}
          >
            <Bot className="h-5 w-5" />
          </Button>
          
          <ThemeToggle />
          
          {isAuthenticated ? (
            <div className="hidden md:flex gap-2">
              <Button asChild variant="outline" size="sm" className="gap-2">
                <Link to="/profile">
                  <User className="h-4 w-4" />
                  Profile
                </Link>
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-gradient-button hover:opacity-90 transition-opacity">
                    <Wallet className="h-4 w-4 mr-2" />
                    Connect Wallet
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Connect Wallet</DialogTitle>
                    <DialogDescription>
                      Choose a wallet provider to connect with the Genesis Investment platform.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-1 gap-4 py-4">
                    <Button 
                      onClick={connectWallet}
                      className="w-full justify-start gap-4 px-4"
                    >
                      <img src="https://upload.wikimedia.org/wikipedia/commons/3/36/MetaMask_Fox.svg" alt="MetaMask" className="w-8 h-8" />
                      MetaMask
                    </Button>
                    <Button 
                      onClick={connectWallet}
                      className="w-full justify-start gap-4 px-4"
                    >
                      <img src="https://cryptologos.cc/logos/coinbase-coin-logo.svg" alt="Coinbase" className="w-8 h-8" />
                      Coinbase Wallet
                    </Button>
                    <Button 
                      onClick={connectWallet}
                      className="w-full justify-start gap-4 px-4"
                    >
                      <img src="https://cryptologos.cc/logos/walletconnect-logo.svg" alt="WalletConnect" className="w-8 h-8" />
                      WalletConnect
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ) : (
            <Button asChild size="sm" className="hidden md:flex bg-gradient-button hover:opacity-90 transition-opacity">
              <Link to="/login">
                <LogIn className="h-4 w-4 mr-1" />
                Sign In
              </Link>
            </Button>
          )}
          
          {/* Mobile menu button */}
          <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded-md hover:bg-secondary/80">
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border animate-fade-in">
          <div className="container py-4 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded-md" onClick={() => setMobileMenuOpen(false)}>
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            
            <Link to="/blog" className="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded-md" onClick={() => setMobileMenuOpen(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
              </svg>
              <span>Blog</span>
            </Link>
            
            {isAuthenticated && (
              <>
                <Link to="/dashboard" className="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  <BarChart3 className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                
                <Link to="/trading" className="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trending-up">
                    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                    <polyline points="16 7 22 7 22 13" />
                  </svg>
                  <span>Trading</span>
                </Link>
                
                <Link to="/wallet" className="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  <Wallet className="h-5 w-5" />
                  <span>Wallet</span>
                </Link>
                
                <Link to="/profile" className="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded-md" onClick={() => setMobileMenuOpen(false)}>
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                
                <button 
                  className="flex items-center gap-2 p-2 text-left hover:bg-destructive/10 hover:text-destructive rounded-md w-full"
                  onClick={handleLogout}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16 17 21 12 16 7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  <span>Log Out</span>
                </button>
              </>
            )}
            
            {!isAuthenticated && (
              <Link 
                to="/login" 
                className="flex items-center justify-center gap-2 py-2 px-4 bg-gradient-button rounded-full hover:opacity-90 transition-opacity"
                onClick={() => setMobileMenuOpen(false)}
              >
                <LogIn className="h-4 w-4" />
                <span className="text-sm font-medium">Sign In</span>
              </Link>
            )}
            
            <Button 
              className="flex items-center gap-2 py-2 w-full"
              onClick={() => {
                connectWallet();
                setMobileMenuOpen(false);
              }}
            >
              <Wallet className="h-4 w-4" />
              <span>Connect Wallet</span>
            </Button>
          </div>
        </div>
      )}
      
      {/* AI Chatbot */}
      <Dialog open={chatbotOpen} onOpenChange={setChatbotOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>CryptoAssist AI</DialogTitle>
            <DialogDescription>
              Your personal cryptocurrency assistant
            </DialogDescription>
          </DialogHeader>
          <div className="chatbot-container h-80 overflow-y-auto border rounded-md p-4 my-2 bg-secondary/20">
            <div className="bot-message mb-4">
              <p className="bg-primary/10 rounded-lg p-3 inline-block">
                👋 Hello! I'm CryptoAssist, your AI crypto guide. How can I help you today?
              </p>
            </div>
            <div className="user-message text-right mb-4">
              <p className="bg-accent/10 rounded-lg p-3 inline-block">
                What's the best way to start investing in crypto?
              </p>
            </div>
            <div className="bot-message mb-4">
              <p className="bg-primary/10 rounded-lg p-3 inline-block">
                Great question! For beginners, I recommend:<br />
                1. Start with research to understand different cryptocurrencies<br />
                2. Only invest what you can afford to lose<br />
                3. Consider starting with established coins like Bitcoin or Ethereum<br />
                4. Use a reputable exchange with good security<br />
                5. Consider dollar-cost averaging (buying fixed amounts regularly)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Type your question..." 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button>Send</Button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
}
