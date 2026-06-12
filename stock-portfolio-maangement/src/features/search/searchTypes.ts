export interface StockSearchResult {
  symbol: string;
  instrument_name: string;
  exchange: string;
}

export interface SearchState {
  results: StockSearchResult[];
  loading: boolean;
  error: string | null;
}