
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Trading from "./pages/Trading";
import Wallet from "./pages/Wallet";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Blog from "./pages/Blog";
import Preloader from "./components/ui/Preloader";
import AuthGuard from "./components/layout/AuthGuard";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Check if user has already seen the preloader in this session
    const hasSeenPreloader = sessionStorage.getItem("hasSeenPreloader");
    
    if (hasSeenPreloader) {
      setIsLoading(false);
    }
  }, []);
  
  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Mark that user has seen the preloader in this session
    sessionStorage.setItem("hasSeenPreloader", "true");
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {isLoading ? (
          <Preloader onComplete={handlePreloaderComplete} />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route 
                path="/dashboard" 
                element={
                  <AuthGuard>
                    <Dashboard />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/trading" 
                element={
                  <AuthGuard>
                    <Trading />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/wallet" 
                element={
                  <AuthGuard>
                    <Wallet />
                  </AuthGuard>
                } 
              />
              <Route 
                path="/profile" 
                element={<Profile />} 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
