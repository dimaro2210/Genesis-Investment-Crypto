
import { FC } from "react";

interface CoinIconProps {
  symbol: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const symbolColors: Record<string, string> = {
  BTC: "bg-crypto-bitcoin",
  ETH: "bg-crypto-ethereum",
  LTC: "bg-crypto-litecoin",
  XRP: "bg-crypto-ripple",
  ADA: "bg-crypto-cardano",
};

const sizes = {
  sm: "w-6 h-6 text-xs",
  md: "w-8 h-8 text-sm",
  lg: "w-10 h-10 text-base",
};

export const CoinIcon: FC<CoinIconProps> = ({ symbol, size = 'md', className = '' }) => {
  const bgColor = symbolColors[symbol] || "bg-gray-500";
  const sizeClasses = sizes[size];

  return (
    <div className={`${sizeClasses} ${bgColor} ${className} rounded-full flex items-center justify-center text-white font-bold`}>
      {symbol}
    </div>
  );
};
