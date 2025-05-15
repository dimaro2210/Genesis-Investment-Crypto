
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
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {currentStep === 1 && (
                  <>
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
                  </>
                )}
                
                {currentStep === 2 && (
                  <>
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
                  </>
                )}
                
                {currentStep === 3 && (
                  <>
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
                  </>
                )}
              </form>
            </Form>
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
