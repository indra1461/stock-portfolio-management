import { RootState } from '@/store/store';

export const selectQuotes = (state: RootState) => state.market.quotes;
export const selectMarketLoading = (state: RootState) => state.market.loading;  
export const selectMarketError = (state: RootState) => state.market.error;