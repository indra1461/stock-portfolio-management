import {RootState} from "@/store/store";

export const selectWatchlist = (state: RootState) => state.watchlist.stocks;
