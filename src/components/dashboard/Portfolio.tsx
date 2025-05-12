
import { Card } from "@/components/ui/card";
import { CoinIcon } from "@/components/ui/CoinIcon";
import { formatCurrency, formatPercentage, mockWalletAssets } from "@/utils/mockData";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ArrowDown, ArrowUp } from "lucide-react";

export function Portfolio() {
  // Calculate total portfolio value
  const totalValue = mockWalletAssets.reduce((sum, asset) => sum + asset.valueUSD, 0);
  
  // Calculate total profit/loss
  const totalProfitLoss = mockWalletAssets.reduce((sum, asset) => sum + asset.profitLoss, 0);
  const totalProfitLossPercentage = (totalProfitLoss / (totalValue - totalProfitLoss)) * 100;
  
  // Prepare data for pie chart
  const chartData = mockWalletAssets.map((asset) => ({
    name: asset.symbol,
    value: asset.valueUSD,
  }));
  
  // Colors for pie chart
  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];
  
  return (
    <Card className="p-6">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mb-2">Your Portfolio</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">Total Balance</span>
            <div className="text-2xl font-semibold mt-1">
              {formatCurrency(totalValue)}
            </div>
            <div className={`flex items-center gap-1 mt-1 text-sm ${totalProfitLoss >= 0 
              ? 'text-crypto-positive' 
              : 'text-crypto-negative'}`}>
              {totalProfitLoss >= 0 ? (
                <ArrowUp className="h-3 w-3" />
              ) : (
                <ArrowDown className="h-3 w-3" />
              )}
              <span>{formatCurrency(Math.abs(totalProfitLoss))} ({totalProfitLossPercentage.toFixed(2)}%)</span>
            </div>
          </div>
          
          <div className="h-[120px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={50}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value: number) => [formatCurrency(value), 'Value']}
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                    borderColor: 'rgba(255,255,255,0.2)',
                    borderRadius: '8px' 
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="mt-4">
          <h3 className="text-sm font-medium mb-3">Assets</h3>
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
        </div>
      </div>
    </Card>
  );
}
