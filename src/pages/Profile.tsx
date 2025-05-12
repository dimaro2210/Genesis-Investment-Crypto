
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
import { Check, Edit, Save, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AuthGuard from "@/components/layout/AuthGuard";

const profileSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }).optional(),
  phone: z.string().optional(),
  location: z.string().optional()
});

const securitySchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required" }),
  newPassword: z.string().min(6, { message: "New password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Confirm password is required" }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Profile = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Get user data from localStorage
  const getUserData = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      return JSON.parse(userData);
    }
    return { name: "", email: "" };
  };
  
  const userData = getUserData();
  
  const profileForm = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: userData.name || "",
      email: userData.email || "",
      phone: "",
      location: ""
    },
  });
  
  const securityForm = useForm<z.infer<typeof securitySchema>>({
    resolver: zodResolver(securitySchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
  });
  
  const onProfileSubmit = (data: z.infer<typeof profileSchema>) => {
    // Update user data in localStorage
    const updatedUserData = { ...userData, ...data };
    localStorage.setItem("user", JSON.stringify(updatedUserData));
    
    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    });
  };
  
  const onSecuritySubmit = (data: z.infer<typeof securitySchema>) => {
    // In a real app, this would call an API to update the password
    
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    
    securityForm.reset();
  };
  
  const handleLogout = () => {
    localStorage.removeItem("user");
    
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    
    navigate("/");
  };
  
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-1 py-16 container">
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
            <div className="space-y-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-32 h-32 rounded-full bg-secondary flex items-center justify-center">
                      <User className="h-16 w-16 text-muted-foreground" />
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold">{userData.name}</h3>
                      <p className="text-sm text-muted-foreground">{userData.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Button 
                variant="destructive" 
                onClick={handleLogout} 
                className="w-full"
              >
                Log Out
              </Button>
            </div>
            
            <div className="space-y-6">
              <Tabs defaultValue="profile">
                <TabsList className="mb-6">
                  <TabsTrigger value="profile">Profile Details</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <Form {...profileForm}>
                        <form onSubmit={profileForm.handleSubmit(onProfileSubmit)} className="space-y-4">
                          <FormField
                            control={profileForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Full Name</FormLabel>
                                <FormControl>
                                  <Input {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input {...field} readOnly />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="phone"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Phone Number</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="Your phone number" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={profileForm.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input {...field} placeholder="City, Country" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" className="bg-gradient-button hover:opacity-90 transition-opacity">
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security">
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Settings</CardTitle>
                      <CardDescription>Update your password</CardDescription>
                    </CardHeader>
                    
                    <CardContent>
                      <Form {...securityForm}>
                        <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-4">
                          <FormField
                            control={securityForm.control}
                            name="currentPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Current Password</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={securityForm.control}
                            name="newPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={securityForm.control}
                            name="confirmPassword"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Confirm New Password</FormLabel>
                                <FormControl>
                                  <Input type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <Button type="submit" className="bg-gradient-button hover:opacity-90 transition-opacity">
                            <Check className="mr-2 h-4 w-4" />
                            Update Password
                          </Button>
                        </form>
                      </Form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </AuthGuard>
  );
};

export default Profile;
