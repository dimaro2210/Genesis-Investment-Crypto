import { Link } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Wallet, BarChart3, Home, Menu } from "lucide-react";
import { useState } from "react";
export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">Genesis 
Investment</span>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/dashboard" className="text-sm font-medium transition-colors hover:text-primary">
            Dashboard
          </Link>
          <Link to="/trading" className="text-sm font-medium transition-colors hover:text-primary">
            Trading
          </Link>
          <Link to="/wallet" className="text-sm font-medium transition-colors hover:text-primary">
            Wallet
          </Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="hidden md:flex items-center gap-2 py-2 px-4 rounded-full bg-gradient-button hover:opacity-90 transition-opacity">
            <Wallet className="h-4 w-4" />
            <span className="text-sm font-medium">Connect Wallet</span>
          </button>
          
          {/* Mobile menu button */}
          <button onClick={toggleMobileMenu} className="md:hidden p-2 rounded-md hover:bg-secondary/80">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && <div className="md:hidden border-t border-border animate-fade-in">
          <div className="container py-4 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-2 p-2 hover:bg-secondary/50 rounded-md" onClick={() => setMobileMenuOpen(false)}>
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
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
            <button className="flex items-center gap-2 py-2 px-4 rounded-full bg-gradient-button hover:opacity-90 transition-opacity">
              <Wallet className="h-4 w-4" />
              <span className="text-sm font-medium">Connect Wallet</span>
            </button>
          </div>
        </div>}
    </header>;
}