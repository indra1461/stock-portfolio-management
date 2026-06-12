import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/auth/authSlice";
import marketReducer from "@/features/market/marketSlice";
import searchReducer from "@/features/search/searchSlice";
import WatchlistReducer from "@/features/watchlist/watchlistSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    market: marketReducer,
    search: searchReducer,
    watchlist: WatchlistReducer,
    
  },
});

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;


