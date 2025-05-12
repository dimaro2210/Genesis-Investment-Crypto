
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MarketOverview } from "@/components/dashboard/MarketOverview";
import { PriceChart } from "@/components/dashboard/PriceChart";
import { Portfolio } from "@/components/dashboard/Portfolio";

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
            <p className="text-muted-foreground">
              Overview of your portfolio and market activity.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <PriceChart />
            </div>
            <div>
              <Portfolio />
            </div>
          </div>
          
          <div>
            <MarketOverview />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
