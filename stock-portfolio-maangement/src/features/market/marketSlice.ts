import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { MarketState, MarketQuote } from "./marketTypes";

const initialState: MarketState = {
  quotes: [],
  loading: false,
  error: null,
};

const marketSlice = createSlice({
  name: "market",
  initialState,
    reducers: {
        fetchQuotesStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fethQuotesSuccess: (state, action: PayloadAction<MarketQuote[]>) => {
            state.quotes = action.payload;
            state.loading = false;
        },
        fetchQuotesFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.loading = false;
        },
    },
});

export const {fetchQuotesStart, fethQuotesSuccess, fetchQuotesFailure} = marketSlice.actions;
export default marketSlice.reducer;