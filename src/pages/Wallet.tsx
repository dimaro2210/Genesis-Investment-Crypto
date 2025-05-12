
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WalletCard } from "@/components/wallet/WalletCard";
import { formatCurrency, mockTransactions } from "@/utils/mockData";
import { Card } from "@/components/ui/card";
import { Clock, Download, Send, Wallet as WalletIcon } from "lucide-react";

const Wallet = () => {
  const renderTransactionIcon = (type: string) => {
    if (type === 'buy') {
      return (
        <div className="w-8 h-8 rounded-full bg-crypto-positive/20 text-crypto-positive flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down">
            <path d="M12 5v14"/>
            <path d="m19 12-7 7-7-7"/>
          </svg>
        </div>
      );
    } else if (type === 'sell') {
      return (
        <div className="w-8 h-8 rounded-full bg-crypto-negative/20 text-crypto-negative flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up">
            <path d="m12 19-7-7 7-7"/>
            <path d="M5 12h14"/>
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-500 flex items-center justify-center">
          <Send className="h-4 w-4" />
        </div>
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="container">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Wallet</h1>
            <p className="text-muted-foreground">
              Manage your crypto assets and track your transaction history.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <WalletCard />
            </div>
            
            <div className="lg:col-span-2">
              <Card className="p-6 mb-6">
                <h2 className="text-xl font-semibold mb-6">Transaction History</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="pb-3 text-left font-medium text-muted-foreground text-sm">Type</th>
                        <th className="pb-3 text-left font-medium text-muted-foreground text-sm">Asset</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground text-sm">Amount</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground text-sm">Price</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground text-sm">Total</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground text-sm">Date</th>
                        <th className="pb-3 text-right font-medium text-muted-foreground text-sm">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTransactions.map((tx) => (
                        <tr 
                          key={tx.id}
                          className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                        >
                          <td className="py-4">
                            <div className="flex items-center gap-3">
                              {renderTransactionIcon(tx.type)}
                              <span className="capitalize">{tx.type}</span>
                            </div>
                          </td>
                          <td className="py-4 font-medium">{tx.asset}</td>
                          <td className="py-4 text-right">{tx.amount}</td>
                          <td className="py-4 text-right">{formatCurrency(tx.price)}</td>
                          <td className="py-4 text-right">{formatCurrency(tx.total)}</td>
                          <td className="py-4 text-right">
                            <div className="flex items-center justify-end gap-1 text-muted-foreground">
                              <Clock className="h-3 w-3" />
                              <span>{new Date(tx.date).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td className="py-4 text-right">
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              tx.status === 'completed' 
                                ? 'bg-crypto-positive/20 text-crypto-positive' 
                                : tx.status === 'pending'
                                ? 'bg-yellow-500/20 text-yellow-500'
                                : 'bg-crypto-negative/20 text-crypto-negative'
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Deposit Crypto</h3>
                    <Download className="h-5 w-5" />
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Transfer crypto from external wallet to your CryptoMate account.
                  </p>
                  <button className="w-full py-2 px-4 bg-primary rounded-lg text-primary-foreground hover:opacity-90">
                    Deposit
                  </button>
                </Card>
                
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Send Crypto</h3>
                    <Send className="h-5 w-5" />
                  </div>
                  <p className="text-muted-foreground mb-4">
                    Send crypto from your CryptoMate wallet to external address.
                  </p>
                  <button className="w-full py-2 px-4 border border-primary rounded-lg text-primary hover:bg-primary/10">
                    Send
                  </button>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Wallet;
