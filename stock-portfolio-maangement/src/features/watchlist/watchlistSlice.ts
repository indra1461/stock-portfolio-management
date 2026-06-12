import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {WatchlistState, WatchlistStock} from "./watchlistTypes";

const initialState: WatchlistState = {
    stocks: [],
};

const watchlistSlice = createSlice({
    name: "watchlist",
    initialState,
    reducers: {
        addToWatchlist(state, action: PayloadAction<WatchlistStock>) {

            console.log(
    "Reducer Fired",
    action.payload
  );
            const exists = state.stocks.some(item => item.symbol === action.payload.symbol && item.exchange === action.payload.exchange);
            if(exists) {console.log("Already Exists");  return;}
            const stock = action.payload;
            state.stocks.push(stock);
              console.log(
    "After Push",
    state.stocks
  );
        },
        removeFromWatchlist(state, action: PayloadAction<{symbol: string; exchange: string }>) {
        state.stocks = state.stocks.filter(stock => !(
        stock.symbol === action.payload.symbol &&
        stock.exchange === action.payload.exchange
    ));
    },
    setWatchlist: ( state,action) => {
 state.stocks =action.payload;
}
    }
    
});

export const { addToWatchlist, removeFromWatchlist, setWatchlist } = watchlistSlice.actions;
export default watchlistSlice.reducer;