
// Mock cryptocurrency data for development
export interface Cryptocurrency {
  id: string;
  name: string;
  symbol: string;
  currentPrice: number;
  priceChange24h: number;
  priceChangePercentage24h: number;
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  logoUrl: string;
  sparklineData: number[];
}

export interface WalletAsset {
  id: string;
  name: string;
  symbol: string;
  amount: number;
  valueUSD: number;
  averageBuyPrice: number;
  profitLoss: number;
  profitLossPercentage: number;
  logoUrl: string;
}

export interface Transaction {
  id: string;
  type: 'buy' | 'sell' | 'transfer';
  asset: string;
  amount: number;
  price: number;
  total: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
}

// Generate random sparkline data
const generateSparklineData = (length: number = 24): number[] => {
  return Array.from({ length }, () => Math.random() * 20 + 80);
};

// Mock cryptocurrencies
export const mockCryptocurrencies: Cryptocurrency[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    currentPrice: 58362.41,
    priceChange24h: 1256.34,
    priceChangePercentage24h: 2.15,
    marketCap: 1123456789012,
    volume24h: 32456789012,
    circulatingSupply: 19218100,
    logoUrl: '/bitcoin.png',
    sparklineData: generateSparklineData(),
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    currentPrice: 3156.78,
    priceChange24h: -78.45,
    priceChangePercentage24h: -2.43,
    marketCap: 378912345678,
    volume24h: 18234567890,
    circulatingSupply: 120123456,
    logoUrl: '/ethereum.png',
    sparklineData: generateSparklineData(),
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    currentPrice: 0.5483,
    priceChange24h: 0.0234,
    priceChangePercentage24h: 4.27,
    marketCap: 19234567890,
    volume24h: 1234567890,
    circulatingSupply: 35123456789,
    logoUrl: '/cardano.png',
    sparklineData: generateSparklineData(),
  },
  {
    id: 'binancecoin',
    name: 'Binance Coin',
    symbol: 'BNB',
    currentPrice: 422.56,
    priceChange24h: 12.34,
    priceChangePercentage24h: 2.92,
    marketCap: 67891234567,
    volume24h: 2345678901,
    circulatingSupply: 161337536,
    logoUrl: '/binance.png',
    sparklineData: generateSparklineData(),
  },
  {
    id: 'solana',
    name: 'Solana',
    symbol: 'SOL',
    currentPrice: 125.78,
    priceChange24h: 5.67,
    priceChangePercentage24h: 4.73,
    marketCap: 54321987654,
    volume24h: 5678901234,
    circulatingSupply: 432198765,
    logoUrl: '/solana.png',
    sparklineData: generateSparklineData(),
  },
  {
    id: 'ripple',
    name: 'XRP',
    symbol: 'XRP',
    currentPrice: 0.5678,
    priceChange24h: -0.0123,
    priceChangePercentage24h: -2.12,
    marketCap: 28765432198,
    volume24h: 1987654321,
    circulatingSupply: 50123456789,
    logoUrl: '/xrp.png',
    sparklineData: generateSparklineData(),
  }
];

// Mock wallet assets with zero balances for new accounts
export const mockWalletAssets: WalletAsset[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    symbol: 'BTC',
    amount: 0,
    valueUSD: 0,
    averageBuyPrice: 0,
    profitLoss: 0,
    profitLossPercentage: 0,
    logoUrl: '/bitcoin.png',
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    symbol: 'ETH',
    amount: 0,
    valueUSD: 0,
    averageBuyPrice: 0,
    profitLoss: 0,
    profitLossPercentage: 0,
    logoUrl: '/ethereum.png',
  },
  {
    id: 'cardano',
    name: 'Cardano',
    symbol: 'ADA',
    amount: 0,
    valueUSD: 0,
    averageBuyPrice: 0,
    profitLoss: 0,
    profitLossPercentage: 0,
    logoUrl: '/cardano.png',
  },
];

// Mock transactions with current dates (2025)
export const mockTransactions: Transaction[] = [
  {
    id: 'tx1',
    type: 'buy',
    asset: 'BTC',
    amount: 0.25,
    price: 56789.12,
    total: 14197.28,
    date: '2025-05-10T14:32:10Z',
    status: 'completed',
  },
  {
    id: 'tx2',
    type: 'sell',
    asset: 'ETH',
    amount: 1.5,
    price: 2987.65,
    total: 4481.48,
    date: '2025-05-08T09:12:45Z',
    status: 'completed',
  },
  {
    id: 'tx3',
    type: 'buy',
    asset: 'ADA',
    amount: 5000,
    price: 0.52,
    total: 2600.00,
    date: '2025-05-05T11:23:15Z',
    status: 'completed',
  },
  {
    id: 'tx4',
    type: 'transfer',
    asset: 'BTC',
    amount: 0.1,
    price: 57123.45,
    total: 5712.35,
    date: '2025-05-01T16:42:30Z',
    status: 'completed',
  },
  {
    id: 'tx5',
    type: 'buy',
    asset: 'ETH',
    amount: 2.5,
    price: 3012.78,
    total: 7531.95,
    date: '2025-04-28T10:15:20Z',
    status: 'completed',
  },
];

// Formatter for currency
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

// Formatter for compact numbers (1.2K, 1.2M, etc)
export const formatCompactNumber = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(value);
};

// Formatter for percentages
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
};
