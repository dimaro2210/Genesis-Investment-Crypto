
import React from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BarChart3, LogIn } from "lucide-react";
import { Link } from "react-router-dom";

// Mock authentication - this would be replaced with actual auth logic
const isAuthenticated = () => {
  return localStorage.getItem("user") !== null;
};

// Simple component to render when user is not authenticated
const UnauthorizedContent = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
          <BarChart3 className="h-10 w-10 text-white" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">Authentication Required</h1>
        <p className="text-muted-foreground mb-6">
          You need to sign in to access this page.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="bg-gradient-button hover:opacity-90 transition-opacity">
            <Link to="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/">Return Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Auth guard component
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  if (!isAuthenticated()) {
    return <UnauthorizedContent />;
  }
  
  return <>{children}</>;
};

export default AuthGuard;
