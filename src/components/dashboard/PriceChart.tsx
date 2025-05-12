
import { Card } from "@/components/ui/card";
import { formatCurrency, mockCryptocurrencies } from "@/utils/mockData";
import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CoinIcon } from "../ui/CoinIcon";

interface TimeframeOption {
  label: string;
  value: string;
}

const timeframeOptions: TimeframeOption[] = [
  { label: '1H', value: '1h' },
  { label: '24H', value: '24h' },
  { label: '1W', value: '1w' },
  { label: '1M', value: '1m' },
  { label: '1Y', value: '1y' },
];

export function PriceChart() {
  const [selectedCoin, setSelectedCoin] = useState(mockCryptocurrencies[0]);
  const [timeframe, setTimeframe] = useState<string>('24h');
  
  // Generate chart data from sparkline data
  const chartData = selectedCoin.sparklineData.map((price, index) => ({
    time: index,
    price: price,
  }));
  
  // Generate chart for selected coin
  return (
    <Card className="p-6">
      <div className="flex flex-col h-full">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
          <div className="flex items-center gap-3 mb-4 sm:mb-0">
            <CoinIcon symbol={selectedCoin.symbol} size="md" />
            <div>
              <h2 className="text-xl font-semibold">
                {selectedCoin.name} Price Chart
              </h2>
              <p className="text-muted-foreground text-sm">
                {formatCurrency(selectedCoin.currentPrice)}
                <span 
                  className={`ml-2 ${selectedCoin.priceChangePercentage24h >= 0 
                    ? 'text-crypto-positive' 
                    : 'text-crypto-negative'}`}
                >
                  {selectedCoin.priceChangePercentage24h >= 0 ? '+' : ''}
                  {selectedCoin.priceChangePercentage24h.toFixed(2)}%
                </span>
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex">
              <select
                value={selectedCoin.id}
                onChange={(e) => {
                  const selected = mockCryptocurrencies.find(c => c.id === e.target.value);
                  if (selected) setSelectedCoin(selected);
                }}
                className="bg-secondary text-foreground px-3 py-1 rounded-md text-sm border border-border focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {mockCryptocurrencies.map((coin) => (
                  <option key={coin.id} value={coin.id}>{coin.symbol}</option>
                ))}
              </select>
            </div>
            
            <div className="flex rounded-md overflow-hidden border border-border">
              {timeframeOptions.map((option) => (
                <button
                  key={option.value}
                  className={`px-3 py-1 text-xs font-medium ${timeframe === option.value 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary text-foreground hover:bg-secondary/70'}`}
                  onClick={() => setTimeframe(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex-1 min-h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="rgba(255,255,255,0.3)" />
              <YAxis tick={{ fontSize: 12 }} stroke="rgba(255,255,255,0.3)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(15, 23, 42, 0.9)', 
                  borderColor: 'rgba(255,255,255,0.2)',
                  borderRadius: '8px' 
                }}
                formatter={(value: number) => [`${formatCurrency(value)}`, 'Price']}
                labelFormatter={(value: number) => `Time ${value}`}
              />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2} 
                dot={false} 
                activeDot={{ r: 6 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
