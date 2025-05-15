
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { formatCurrency, mockTransactions, mockWalletAssets } from "@/utils/mockData";
import { Clock, Download, Eye, EyeOff, Send, Wallet } from "lucide-react";
import { CoinIcon } from "../ui/CoinIcon";
import { Button } from "../ui/button";
import { toast } from "@/components/ui/use-toast";

export function WalletCard() {
  // Calculate total balance
  const totalBalance = mockWalletAssets.reduce((sum, asset) => sum + asset.valueUSD, 0);
  const [isBalanceHidden, setIsBalanceHidden] = useState(false);
  
  // Handle deposit action
  const handleDeposit = () => {
    // Play beep sound on button click
    const audio = new Audio('/beep.mp3');
    audio.play().catch(e => console.log("Audio play error:", e));
    
    toast({
      title: "Deposit requested",
      description: "Please connect your wallet to proceed with the deposit.",
    });
  };
  
  // Handle send action
  const handleSend = () => {
    // Play beep sound on button click
    const audio = new Audio('/beep.mp3');
    audio.play().catch(e => console.log("Audio play error:", e));
    
    toast({
      title: "Send requested",
      description: "Please connect your wallet to proceed with the transfer.",
    });
  };
  
  // Toggle balance visibility
  const toggleBalanceVisibility = () => {
    // Play beep sound on button click
    const audio = new Audio('/beep.mp3');
    audio.play().catch(e => console.log("Audio play error:", e));
    setIsBalanceHidden(!isBalanceHidden);
  };
  
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-card hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Your Wallet</h2>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleBalanceVisibility}
              className="hover:bg-primary/10 rounded-full"
            >
              {isBalanceHidden ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </Button>
          </div>
          
          <div className="mb-4">
            <span className="text-muted-foreground text-sm">Total Balance</span>
            <div className="text-3xl font-bold mt-1 flex items-center">
              {isBalanceHidden ? 
                "••••••" : 
                formatCurrency(totalBalance)
              }
            </div>
          </div>
          
          <div className="flex gap-2 mt-auto">
            <Button 
              onClick={handleDeposit} 
              className="flex items-center gap-2 bg-primary rounded-lg py-2 px-4 flex-1 justify-center hover:opacity-90 transition-all animate-pulse-on-hover"
            >
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">Deposit</span>
            </Button>
            <Button
              onClick={handleSend}
              className="flex items-center gap-2 bg-secondary/80 rounded-lg py-2 px-4 flex-1 justify-center hover:bg-secondary transition-all animate-pulse-on-hover"
            >
              <Send className="h-4 w-4" />
              <span className="text-sm font-medium">Send</span>
            </Button>
          </div>
        </div>
      </Card>
      
      <Card className="p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {mockTransactions.slice(0, 4).map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-3 border-b border-border/50 last:border-0 hover:bg-secondary/20 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  transaction.type === 'buy' 
                    ? 'bg-crypto-positive/20 text-crypto-positive' 
                    : transaction.type === 'sell'
                    ? 'bg-crypto-negative/20 text-crypto-negative'
                    : 'bg-blue-500/20 text-blue-500'
                }`}>
                  {transaction.type === 'buy' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down">
                      <path d="M12 5v14"/>
                      <path d="m19 12-7 7-7-7"/>
                    </svg>
                  ) : transaction.type === 'sell' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up">
                      <path d="m12 19-7-7 7-7"/>
                      <path d="M5 12h14"/>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-send">
                      <path d="m22 2-7 20-4-9-9-4Z"/>
                      <path d="M22 2 11 13"/>
                    </svg>
                  )}
                </div>
                
                <div>
                  <div className="font-medium capitalize">{transaction.type} {transaction.asset}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{new Date(transaction.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium">
                  {isBalanceHidden ? 
                    "••••" : 
                    `${transaction.type === 'buy' ? '+' : transaction.type === 'sell' ? '-' : ''}
                    ${transaction.amount} ${transaction.asset}`
                  }
                </div>
                <div className="text-xs text-muted-foreground">
                  {isBalanceHidden ? "••••" : formatCurrency(transaction.total)}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <Button variant="ghost" className="w-full mt-4 py-2 text-sm font-medium text-primary hover:underline">
          View all transactions
        </Button>
      </Card>
      
      <Card className="p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
        <h3 className="text-lg font-semibold mb-4">Your Assets</h3>
        <div className="space-y-4">
          {mockWalletAssets.map((asset) => (
            <div 
              key={asset.id}
              className="flex items-center justify-between p-3 bg-secondary/40 rounded-lg hover:bg-secondary/60 transition-colors"
            >
              <div className="flex items-center gap-3">
                <CoinIcon symbol={asset.symbol} size="sm" />
                <div>
                  <div className="font-medium">{asset.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {isBalanceHidden ? "••••" : `${asset.amount} ${asset.symbol}`}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium">{isBalanceHidden ? "••••" : formatCurrency(asset.valueUSD)}</div>
                <div 
                  className={`text-xs ${asset.profitLossPercentage >= 0 
                    ? 'text-crypto-positive' 
                    : 'text-crypto-negative'}`}
                >
                  {asset.profitLossPercentage >= 0 ? '+' : ''}
                  {asset.profitLossPercentage.toFixed(2)}%
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
