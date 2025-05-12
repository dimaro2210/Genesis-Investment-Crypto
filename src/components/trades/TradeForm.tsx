
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { formatCurrency, mockCryptocurrencies } from "@/utils/mockData";
import { CoinIcon } from "../ui/CoinIcon";
import { useToast } from "@/components/ui/use-toast";
import { ArrowDownUp } from "lucide-react";

type OrderType = "buy" | "sell";
type OrderMode = "market" | "limit";

export function TradeForm() {
  const { toast } = useToast();
  const [selectedCoin, setSelectedCoin] = useState(mockCryptocurrencies[0]);
  const [orderType, setOrderType] = useState<OrderType>("buy");
  const [orderMode, setOrderMode] = useState<OrderMode>("market");
  const [amount, setAmount] = useState<string>("");
  const [price, setPrice] = useState<string>(selectedCoin.currentPrice.toString());
  const [useMax, setUseMax] = useState<boolean>(false);
  
  // Calculate total based on amount and price
  const total = parseFloat(amount || "0") * parseFloat(price || "0");
  
  // Handle coin selection
  const handleCoinChange = (coinId: string) => {
    const coin = mockCryptocurrencies.find((c) => c.id === coinId);
    if (coin) {
      setSelectedCoin(coin);
      setPrice(coin.currentPrice.toString());
    }
  };
  
  // Handle order submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to trade",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: `${orderType === "buy" ? "Buy" : "Sell"} Order Placed`,
      description: `${orderType === "buy" ? "Bought" : "Sold"} ${amount} ${selectedCoin.symbol} at ${formatCurrency(parseFloat(price))} each`,
      variant: "default",
    });
    
    // Reset form
    setAmount("");
    setUseMax(false);
  };
  
  return (
    <Card className="p-6">
      <div className="flex flex-col">
        <h2 className="text-xl font-semibold mb-6">Quick Trade</h2>
        
        <form onSubmit={handleSubmit}>
          {/* Coin Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Select Asset</label>
            <select
              value={selectedCoin.id}
              onChange={(e) => handleCoinChange(e.target.value)}
              className="w-full bg-secondary/70 border border-border rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
            >
              {mockCryptocurrencies.map((coin) => (
                <option key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol})
                </option>
              ))}
            </select>
          </div>
          
          {/* Order Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Order Type</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`p-3 rounded-lg flex items-center justify-center ${
                  orderType === "buy"
                    ? "bg-crypto-positive text-white"
                    : "bg-secondary/70 hover:bg-secondary"
                }`}
                onClick={() => setOrderType("buy")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-down-circle mr-2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m8 12 4 4 4-4"/>
                  <path d="M12 8v8"/>
                </svg>
                Buy
              </button>
              <button
                type="button"
                className={`p-3 rounded-lg flex items-center justify-center ${
                  orderType === "sell"
                    ? "bg-crypto-negative text-white"
                    : "bg-secondary/70 hover:bg-secondary"
                }`}
                onClick={() => setOrderType("sell")}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-up-circle mr-2">
                  <circle cx="12" cy="12" r="10"/>
                  <path d="m16 12-4-4-4 4"/>
                  <path d="M12 16V8"/>
                </svg>
                Sell
              </button>
            </div>
          </div>
          
          {/* Order Mode Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Order Mode</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={`p-3 rounded-lg flex items-center justify-center ${
                  orderMode === "market"
                    ? "bg-primary text-white"
                    : "bg-secondary/70 hover:bg-secondary"
                }`}
                onClick={() => {
                  setOrderMode("market");
                  setPrice(selectedCoin.currentPrice.toString());
                }}
              >
                Market
              </button>
              <button
                type="button"
                className={`p-3 rounded-lg flex items-center justify-center ${
                  orderMode === "limit"
                    ? "bg-primary text-white"
                    : "bg-secondary/70 hover:bg-secondary"
                }`}
                onClick={() => setOrderMode("limit")}
              >
                Limit
              </button>
            </div>
          </div>
          
          {/* Price Input (shown only for limit orders) */}
          {orderMode === "limit" && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Price per {selectedCoin.symbol}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-muted-foreground">
                  $
                </div>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-secondary/70 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  placeholder="0.00"
                  step="0.01"
                  min="0"
                />
              </div>
              <div className="flex justify-between mt-1">
                <button
                  type="button"
                  className="text-xs text-muted-foreground hover:text-primary"
                  onClick={() => setPrice((parseFloat(price) * 0.99).toFixed(2))}
                >
                  -1%
                </button>
                <button
                  type="button"
                  className="text-xs text-muted-foreground hover:text-primary"
                  onClick={() => setPrice(selectedCoin.currentPrice.toString())}
                >
                  Current: {formatCurrency(selectedCoin.currentPrice)}
                </button>
                <button
                  type="button"
                  className="text-xs text-muted-foreground hover:text-primary"
                  onClick={() => setPrice((parseFloat(price) * 1.01).toFixed(2))}
                >
                  +1%
                </button>
              </div>
            </div>
          )}
          
          {/* Amount Input */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium">Amount</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground">Max: 1.0000</span>
                <button
                  type="button"
                  className={`text-xs px-2 py-1 rounded ${
                    useMax ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground"
                  }`}
                  onClick={() => {
                    setUseMax(!useMax);
                    setAmount(useMax ? "" : "1.0000");
                  }}
                >
                  MAX
                </button>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => {
                    setAmount(e.target.value);
                    setUseMax(false);
                  }}
                  className="w-full px-4 py-3 bg-secondary/70 border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                  placeholder="0.00"
                  step="0.0001"
                  min="0"
                />
                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                  <span className="text-muted-foreground">{selectedCoin.symbol}</span>
                </div>
              </div>
              <button
                type="button"
                className="bg-secondary/70 p-3 rounded-lg hover:bg-secondary"
              >
                <ArrowDownUp className="h-5 w-5" />
              </button>
            </div>
            <div className="flex justify-between mt-1">
              <button
                type="button"
                className="text-xs text-muted-foreground hover:text-primary"
                onClick={() => setAmount("0.25")}
              >
                25%
              </button>
              <button
                type="button"
                className="text-xs text-muted-foreground hover:text-primary"
                onClick={() => setAmount("0.5")}
              >
                50%
              </button>
              <button
                type="button"
                className="text-xs text-muted-foreground hover:text-primary"
                onClick={() => setAmount("0.75")}
              >
                75%
              </button>
              <button
                type="button"
                className="text-xs text-muted-foreground hover:text-primary"
                onClick={() => setAmount("1")}
              >
                100%
              </button>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="bg-secondary/50 rounded-lg p-4 mb-6">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Order Type</span>
              <span className="text-sm font-medium capitalize">
                {orderMode} {orderType}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Price</span>
              <span className="text-sm font-medium">
                {formatCurrency(parseFloat(price || "0"))}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-muted-foreground">Amount</span>
              <span className="text-sm font-medium">
                {parseFloat(amount || "0").toFixed(4)} {selectedCoin.symbol}
              </span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Total</span>
                <span className="text-sm font-medium">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg font-medium ${
              orderType === "buy"
                ? "bg-crypto-positive hover:opacity-90"
                : "bg-crypto-negative hover:opacity-90"
            } text-white transition-opacity`}
          >
            {orderType === "buy" ? "Buy" : "Sell"} {selectedCoin.symbol}
          </button>
        </form>
      </div>
    </Card>
  );
}
