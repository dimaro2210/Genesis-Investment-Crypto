
import { Card } from "@/components/ui/card";
import { formatCurrency, mockTransactions, mockWalletAssets } from "@/utils/mockData";
import { Clock, Download, Send, Wallet } from "lucide-react";
import { CoinIcon } from "../ui/CoinIcon";

export function WalletCard() {
  // Calculate total balance
  const totalBalance = mockWalletAssets.reduce((sum, asset) => sum + asset.valueUSD, 0);
  
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-card">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Your Wallet</h2>
            <Wallet className="h-6 w-6" />
          </div>
          
          <div className="mb-4">
            <span className="text-muted-foreground text-sm">Total Balance</span>
            <div className="text-3xl font-bold mt-1">{formatCurrency(totalBalance)}</div>
          </div>
          
          <div className="flex gap-2 mt-auto">
            <button className="flex items-center gap-2 bg-primary rounded-lg py-2 px-4 flex-1 justify-center hover:opacity-90 transition-opacity">
              <Download className="h-4 w-4" />
              <span className="text-sm font-medium">Deposit</span>
            </button>
            <button className="flex items-center gap-2 bg-secondary/80 rounded-lg py-2 px-4 flex-1 justify-center hover:bg-secondary transition-colors">
              <Send className="h-4 w-4" />
              <span className="text-sm font-medium">Send</span>
            </button>
          </div>
        </div>
      </Card>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
        <div className="space-y-4">
          {mockTransactions.slice(0, 4).map((transaction) => (
            <div 
              key={transaction.id}
              className="flex items-center justify-between p-3 border-b border-border/50 last:border-0"
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
                  {transaction.type === 'buy' ? '+' : transaction.type === 'sell' ? '-' : ''}
                  {transaction.amount} {transaction.asset}
                </div>
                <div className="text-xs text-muted-foreground">
                  {formatCurrency(transaction.total)}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 py-2 text-sm font-medium text-primary hover:underline">
          View all transactions
        </button>
      </Card>
      
      <Card className="p-6">
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
                    {asset.amount} {asset.symbol}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="font-medium">{formatCurrency(asset.valueUSD)}</div>
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
