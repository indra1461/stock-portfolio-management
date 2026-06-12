export interface marketIndex{
    symbol:string;
    name:string;
    price:number;
    change:number;
    percent_change:number;
}

export interface MarketQuote {
  symbol: string;
  name: string;
  close: string;
  change: string;
  percent_change: string;
}

export interface MarketState {
  quotes: MarketQuote[];
  loading: boolean;
  error: string | null;
}