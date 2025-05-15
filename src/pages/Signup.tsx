import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, UserPlus, LogIn } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

const signupSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  country: z.string().min(1, { message: "Country is required" }),
  tradingExperience: z.string().min(1, { message: "Trading experience is required" }),
  referralCode: z.string().optional(),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password is required" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Signup = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      country: "",
      tradingExperience: "",
      referralCode: "",
      password: "",
      confirmPassword: ""
    },
  });
  
  const onSubmit = (data: z.infer<typeof signupSchema>) => {
    // Play beep sound
    const audio = new Audio('/beep.mp3');
    audio.play().catch(e => console.log("Audio play error:", e));
    
    // Simulate signup success - in a real app this would call an API
    setTimeout(() => {
      // Store user data in localStorage with zero balance (for demo purposes)
      localStorage.setItem("user", JSON.stringify({ 
        email: data.email, 
        name: data.name,
        country: data.country,
        tradingExperience: data.tradingExperience,
        balance: 0,
        assets: []
      }));
      
      toast({
        title: "Account created",
        description: "Welcome to CryptoMate!",
      });
      
      navigate("/dashboard");
    }, 1000);
  };
  
  const handleGoogleSignup = () => {
    // Play beep sound
    const audio = new Audio('/beep.mp3');
    audio.play().catch(e => console.log("Audio play error:", e));
    
    // In a real implementation, this would redirect to Google OAuth
    // For now, we'll simulate a successful signup
    setTimeout(() => {
      // Create a mock Google user
      const googleUser = {
        email: "google.user@example.com",
        name: "Google User",
        country: "us",
        tradingExperience: "beginner",
        balance: 0,
        assets: []
      };
      
      localStorage.setItem("user", JSON.stringify(googleUser));
      
      toast({
        title: "Google sign up successful",
        description: "Welcome to CryptoMate!",
      });
      
      navigate("/dashboard");
    }, 1000);
  };
  
  const nextStep = async () => {
    if (currentStep === 1) {
      const isValid = await form.trigger(['name', 'email']);
      if (isValid) {
        // Play beep sound
        const audio = new Audio('/beep.mp3');
        audio.play().catch(e => console.log("Audio play error:", e));
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      const isValid = await form.trigger(['country', 'tradingExperience']);
      if (isValid) {
        // Play beep sound
        const audio = new Audio('/beep.mp3');
        audio.play().catch(e => console.log("Audio play error:", e));
        setCurrentStep(3);
      }
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-16 px-4 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-between items-center">
              <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
              <div className="flex items-center gap-1">
                {[1, 2, 3].map((step) => (
                  <div 
                    key={step}
                    className={`w-3 h-3 rounded-full ${
                      step === currentStep ? 'bg-primary' : 
                      step < currentStep ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            <CardDescription>
              {currentStep === 1 && "Step 1: Personal Information"}
              {currentStep === 2 && "Step 2: Trading Profile"}
              {currentStep === 3 && "Step 3: Create Password"}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            {currentStep === 1 && (
              <div className="space-y-4">
                <Button 
                  type="button"
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 animate-pulse-on-hover"
                  onClick={handleGoogleSignup}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24" className="h-5 w-5">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    <path d="M1 1h22v22H1z" fill="none"/>
                  </svg>
                  Sign up with Google
                </Button>
                
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <Separator className="w-full" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">
                      Or continue with
                    </span>
                  </div>
                </div>
                
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your Name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="pt-4">
                      <Button 
                        type="button" 
                        className="w-full bg-gradient-button hover:opacity-90 transition-opacity animate-pulse-on-hover"
                        onClick={nextStep}
                      >
                        Next Step
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            )}
            
            {currentStep === 2 && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="sg">Singapore</SelectItem>
                            <SelectItem value="jp">Japan</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="tradingExperience"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Trading Experience</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your trading experience" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="beginner">Beginner (Less than 1 year)</SelectItem>
                            <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                            <SelectItem value="advanced">Advanced (3-5 years)</SelectItem>
                            <SelectItem value="expert">Expert (5+ years)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="referralCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Referral Code (Optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter referral code if you have one" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4 flex gap-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="w-1/2" 
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                    <Button 
                      type="button" 
                      className="w-1/2 bg-gradient-button hover:opacity-90 transition-opacity animate-pulse-on-hover" 
                      onClick={nextStep}
                    >
                      Next Step
                    </Button>
                  </div>
                </form>
              </Form>
            )}
            
            {currentStep === 3 && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={isPasswordVisible ? "text" : "password"} 
                              placeholder="••••••••" 
                              {...field} 
                            />
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="icon" 
                              className="absolute right-0 top-0 h-full px-3" 
                              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                              {isPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input 
                              type={isConfirmPasswordVisible ? "text" : "password"} 
                              placeholder="••••••••" 
                              {...field} 
                            />
                            <Button 
                              type="button"
                              variant="ghost" 
                              size="icon" 
                              className="absolute right-0 top-0 h-full px-3" 
                              onClick={() => setIsConfirmPasswordVisible(!isConfirmPasswordVisible)}
                            >
                              {isConfirmPasswordVisible ? <EyeOff size={16} /> : <Eye size={16} />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4 flex gap-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      className="w-1/2" 
                      onClick={prevStep}
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit" 
                      className="w-1/2 bg-gradient-button hover:opacity-90 transition-opacity animate-pulse-on-hover"
                    >
                      <UserPlus className="mr-2 h-4 w-4" />
                      Create Account
                    </Button>
                  </div>
                </form>
              </Form>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-sm text-center text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign In
              </Link>
            </div>
            
            <div className="flex items-center justify-center">
              <Link to="/" className="text-sm text-primary hover:underline">
                Return to home
              </Link>
            </div>
          </CardFooter>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
