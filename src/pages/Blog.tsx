
import React, { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, ExternalLink, Upload, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { toast } from "@/components/ui/use-toast";

const blogs = [
  {
    id: 1,
    title: "The Future of Cryptocurrency in 2025",
    excerpt: "Experts predict major shifts in cryptocurrency adoption and regulation by 2025. Here's what you need to know about the future landscape.",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "May 10, 2025",
    readTime: "5 min read",
    url: "https://coinmarketcap.com/alexandria/article/what-is-cryptocurrency"
  },
  {
    id: 2,
    title: "Understanding DeFi: A Beginner's Guide",
    excerpt: "Decentralized Finance is revolutionizing the way we think about money. Learn the basics and how you can get involved.",
    image: "https://images.unsplash.com/photo-1639152201720-5e536d254d81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "June 15, 2025",
    readTime: "8 min read",
    url: "https://www.coindesk.com/learn/what-is-defi/"
  },
  {
    id: 3,
    title: "NFTs: Beyond Digital Art",
    excerpt: "Non-fungible tokens have applications far beyond digital art. Discover how NFTs are being used in various industries.",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "July 22, 2025",
    readTime: "6 min read",
    url: "https://ethereum.org/en/nft/"
  },
  {
    id: 4,
    title: "Bitcoin Halving: What It Means for Investors",
    excerpt: "The Bitcoin halving is a significant event that occurs approximately every four years. Here's how it affects the crypto market and your investments.",
    image: "https://images.unsplash.com/photo-1609554496796-c345a5335ceb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "August 5, 2025",
    readTime: "7 min read",
    url: "https://www.investopedia.com/bitcoin-halving-4843769"
  },
  {
    id: 5,
    title: "Cryptocurrency Taxation: A Global Perspective",
    excerpt: "Different countries have different approaches to taxing cryptocurrency. Learn about the global landscape of crypto taxation.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "September 18, 2025",
    readTime: "9 min read",
    url: "https://www.forbes.com/advisor/investing/cryptocurrency/cryptocurrency-taxes/"
  },
  {
    id: 6,
    title: "Web3: The Next Evolution of the Internet",
    excerpt: "Web3 represents the next phase of the internet, powered by blockchain technology. Here's what it means for users and businesses.",
    image: "https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "October 30, 2025",
    readTime: "10 min read",
    url: "https://ethereum.org/en/web3/"
  }
];

const blogSchema = z.object({
  title: z.string().min(5, { message: "Title must be at least 5 characters" }),
  excerpt: z.string().min(20, { message: "Excerpt must be at least 20 characters" }),
  content: z.string().min(50, { message: "Content must be at least 50 characters" }),
  image: z.any().optional()
});

const Blog = () => {
  const [userBlogs, setUserBlogs] = useState<any[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<z.infer<typeof blogSchema>>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
    },
  });
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert the file to a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const onSubmit = (data: z.infer<typeof blogSchema>) => {
    setIsSubmitting(true);
    
    // Play beep sound on button click
    const audio = new Audio('/beep.mp3');
    audio.play().catch(e => console.log("Audio play error:", e));
    
    // Simulate blog submission (in a real app, this would send to a backend)
    setTimeout(() => {
      const newBlog = {
        id: Date.now(),
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        image: selectedImage || "https://images.unsplash.com/photo-1639152201720-5e536d254d81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        readTime: `${Math.ceil(data.content.length / 1000)} min read`,
        url: "#",
        user: JSON.parse(localStorage.getItem('user') || '{}').name || 'Anonymous'
      };
      
      setUserBlogs([newBlog, ...userBlogs]);
      form.reset();
      setSelectedImage(null);
      setIsDialogOpen(false);
      setIsSubmitting(false);
      
      toast({
        title: "Blog published successfully",
        description: "Your blog post has been published to the community.",
      });
    }, 1500);
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1">
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/20 via-background to-background">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Cryptocurrency Blog</h1>
              <p className="text-xl text-muted-foreground">
                Stay updated with the latest trends, insights, and news from the cryptocurrency world.
              </p>
              <Button 
                onClick={() => setIsDialogOpen(true)} 
                className="mt-8 bg-gradient-button hover:opacity-90 transition-opacity animate-pulse-on-hover"
              >
                <Upload className="mr-2 h-4 w-4" />
                Create Your Own Blog Post
              </Button>
            </div>
            
            {/* User submitted blogs */}
            {userBlogs.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold mb-6 text-center">Community Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {userBlogs.map((blog) => (
                    <Card key={blog.id} className="overflow-hidden flex flex-col h-full hover:border-primary/50 transition-colors hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={blog.image} 
                          alt={blog.title} 
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                      
                      <CardHeader>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {blog.date}
                          </div>
                          <div className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {blog.readTime}
                          </div>
                        </div>
                        <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                        <CardDescription className="text-xs">By {blog.user}</CardDescription>
                      </CardHeader>
                      
                      <CardContent className="flex-1">
                        <p className="text-muted-foreground line-clamp-3">{blog.excerpt}</p>
                      </CardContent>
                      
                      <CardFooter>
                        <Button 
                          variant="outline" 
                          className="w-full hover:bg-primary/5"
                        >
                          Read Full Article
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            {/* Featured blogs */}
            <h2 className="text-2xl font-bold mb-6 text-center">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden flex flex-col h-full hover:border-primary/50 transition-colors hover:shadow-lg transform hover:scale-[1.02] transition-all duration-300">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                    />
                  </div>
                  
                  <CardHeader>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {blog.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {blog.readTime}
                      </div>
                    </div>
                    <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground line-clamp-3">{blog.excerpt}</p>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      asChild 
                      variant="outline" 
                      className="w-full hover:bg-primary/5"
                      onClick={() => window.open(blog.url, "_blank")}
                    >
                      <a href={blog.url} target="_blank" rel="noopener noreferrer">
                        Read More
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create a Blog Post</DialogTitle>
            <DialogDescription>
              Share your insights and knowledge about cryptocurrency with the community.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a catchy title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="excerpt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Excerpt</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write a brief summary of your blog post"
                        className="resize-none"
                        rows={2}
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      This will appear as the preview of your blog post.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Write your full blog post here"
                        className="resize-none"
                        rows={8}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormItem>
                <FormLabel>Cover Image</FormLabel>
                <div className="flex items-center gap-4">
                  <Input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1" 
                  />
                  
                  {selectedImage && (
                    <Button 
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedImage(null)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
                
                {selectedImage && (
                  <div className="mt-2 relative w-full h-40 bg-secondary/20 rounded-md overflow-hidden">
                    <img 
                      src={selectedImage} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </FormItem>
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-gradient-button hover:opacity-90 transition-opacity"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Publishing..." : "Publish Blog Post"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default Blog;
