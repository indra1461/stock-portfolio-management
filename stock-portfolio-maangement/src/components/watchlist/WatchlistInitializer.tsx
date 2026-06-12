"use client";

import {
 useEffect
} from "react";

import {
 useAppDispatch
} from "@/store/hooks";

import {
 setWatchlist
} from "@/features/watchlist/watchlistSlice";

import {
 getWatchlist
} from "@/app/utils/watchlistStorage";

export default function WatchlistInitializer() {

 const dispatch =
  useAppDispatch();

 useEffect(() => {

   const stocks =
    getWatchlist();

   dispatch(
    setWatchlist(
     stocks
    )
   );

 }, [dispatch]);

 return null;
}