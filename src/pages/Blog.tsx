
import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Clock, ExternalLink } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "The Future of Cryptocurrency in 2025",
    excerpt: "Experts predict major shifts in cryptocurrency adoption and regulation by 2025. Here's what you need to know about the future landscape.",
    image: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "May 10, 2023",
    readTime: "5 min read",
    url: "https://coinmarketcap.com/alexandria/article/what-is-cryptocurrency"
  },
  {
    id: 2,
    title: "Understanding DeFi: A Beginner's Guide",
    excerpt: "Decentralized Finance is revolutionizing the way we think about money. Learn the basics and how you can get involved.",
    image: "https://images.unsplash.com/photo-1639152201720-5e536d254d81?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "June 15, 2023",
    readTime: "8 min read",
    url: "https://www.coindesk.com/learn/what-is-defi/"
  },
  {
    id: 3,
    title: "NFTs: Beyond Digital Art",
    excerpt: "Non-fungible tokens have applications far beyond digital art. Discover how NFTs are being used in various industries.",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "July 22, 2023",
    readTime: "6 min read",
    url: "https://ethereum.org/en/nft/"
  },
  {
    id: 4,
    title: "Bitcoin Halving: What It Means for Investors",
    excerpt: "The Bitcoin halving is a significant event that occurs approximately every four years. Here's how it affects the crypto market and your investments.",
    image: "https://images.unsplash.com/photo-1609554496796-c345a5335ceb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "August 5, 2023",
    readTime: "7 min read",
    url: "https://www.investopedia.com/bitcoin-halving-4843769"
  },
  {
    id: 5,
    title: "Cryptocurrency Taxation: A Global Perspective",
    excerpt: "Different countries have different approaches to taxing cryptocurrency. Learn about the global landscape of crypto taxation.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "September 18, 2023",
    readTime: "9 min read",
    url: "https://www.forbes.com/advisor/investing/cryptocurrency/cryptocurrency-taxes/"
  },
  {
    id: 6,
    title: "Web3: The Next Evolution of the Internet",
    excerpt: "Web3 represents the next phase of the internet, powered by blockchain technology. Here's what it means for users and businesses.",
    image: "https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    date: "October 30, 2023",
    readTime: "10 min read",
    url: "https://ethereum.org/en/web3/"
  }
];

const Blog = () => {
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
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Card key={blog.id} className="overflow-hidden flex flex-col h-full hover:border-primary/50 transition-colors">
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
      
      <Footer />
    </div>
  );
};

export default Blog;
