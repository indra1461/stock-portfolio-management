export interface WatchlistStock {
  symbol: string;
  instrument_name: string;
  exchange: string;
}

export interface WatchlistState {
  stocks: WatchlistStock[];
}