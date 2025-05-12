
import { Card } from "@/components/ui/card";
import { CoinIcon } from "@/components/ui/CoinIcon";
import { formatCurrency, formatPercentage, mockCryptocurrencies } from "@/utils/mockData";
import { ArrowDown, ArrowUp } from "lucide-react";

export function MarketOverview() {
  return (
    <Card className="p-6">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Market Overview</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left font-medium text-muted-foreground text-sm">Asset</th>
                <th className="pb-3 text-right font-medium text-muted-foreground text-sm">Price</th>
                <th className="pb-3 text-right font-medium text-muted-foreground text-sm">24h Change</th>
                <th className="pb-3 text-right font-medium text-muted-foreground text-sm hidden sm:table-cell">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {mockCryptocurrencies.map((crypto) => (
                <tr 
                  key={crypto.id} 
                  className="border-b border-border/50 hover:bg-secondary/20 transition-colors"
                >
                  <td className="py-3">
                    <div className="flex items-center gap-3">
                      <CoinIcon symbol={crypto.symbol} size="sm" />
                      <div>
                        <div className="font-medium">{crypto.name}</div>
                        <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-right font-medium">
                    {formatCurrency(crypto.currentPrice)}
                  </td>
                  <td className="py-3 text-right">
                    <div className={`inline-flex items-center gap-1 ${crypto.priceChangePercentage24h >= 0 
                      ? 'text-crypto-positive' 
                      : 'text-crypto-negative'}`}>
                      {crypto.priceChangePercentage24h >= 0 ? (
                        <ArrowUp className="h-3 w-3" />
                      ) : (
                        <ArrowDown className="h-3 w-3" />
                      )}
                      <span>{formatPercentage(Math.abs(crypto.priceChangePercentage24h))}</span>
                    </div>
                  </td>
                  <td className="py-3 text-right hidden sm:table-cell text-muted-foreground">
                    {formatCurrency(crypto.marketCap)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Card>
  );
}
