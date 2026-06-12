  "use client";
  import { useAppSelector } from "@/store/hooks";
  import {
    selectSearchResults,
    selectSearchLoading,
    selectSearchError,
  } from "@/features/search/searchSelectors";
  import {useAppDispatch } from "@/store/hooks";
  import { addToWatchlist, removeFromWatchlist } from "@/features/watchlist/watchlistSlice";
  import {toast} from "react-toastify";
  import { selectWatchlist }
  from "@/features/watchlist/watchlistSelectors";
  import {
  saveWatchlist
} from "@/app/utils/watchlistStorage";


  interface SearchResultsProps {
    query?: string;
  }

  export default function SearchResults({ query }: SearchResultsProps) {
    const watchlist =useAppSelector(selectWatchlist);
    const dispatch = useAppDispatch();
    const results = useAppSelector(selectSearchResults);
    const loading = useAppSelector(selectSearchLoading);
    const error = useAppSelector(selectSearchError);

    const watchlist3 =
 useAppSelector(
   state => state.watchlist.stocks
 );

console.log(
 "Dashboard Watchlist",
 watchlist3 
);

    if (!query?.trim() && !results.length && !loading && !error) return null;
    console.log(
 "Redux Watchlist",
 watchlist
);

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50">
        {/* Header bar */}
        <div className="px-3.5 py-2 border-b border-slate-800 flex items-center justify-between">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            {loading ? "Searching…" : results.length ? `${results.length} result${results.length > 1 ? "s" : ""}` : "No results"}
          </span>
          {results.length > 0 && (
            <span className="text-[10px] text-slate-600">↑↓ to navigate</span>
          )}
        </div>

        {/* Loading skeletons */}
        {loading && (
          <div className="p-2 space-y-1">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 px-2 py-2.5 rounded-lg animate-pulse">
                <div className="w-12 h-5 bg-slate-800 rounded-md" />
                <div className="flex-1 h-4 bg-slate-800 rounded w-2/3" />
                <div className="w-10 h-4 bg-slate-800 rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error */}
        {!loading && error && (
          <div className="flex items-center gap-2.5 px-4 py-4 text-red-400">
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && !results.length && query?.trim() && (
          <div className="flex flex-col items-center justify-center py-8 gap-2 text-slate-500">
            <svg className="w-7 h-7 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm">
              No stocks found for{" "}
              <span className="text-slate-400 font-medium">&ldquo;{query}&rdquo;</span>
            </p>
          </div>
        )}

        {/* Results list */}
        {!loading && !error && results.length > 0 && (
          <ul className="py-1.5 max-h-72 overflow-y-auto">
            {results.map((stock) => {const isAdded =watchlist.some(item =>item.symbol === stock.symbol && item.exchange === stock.exchange);
            return (
              <li  key={`${stock.symbol}-${stock.exchange}`}
  ><div className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800/60 transition-colors group">

    {/* Symbol */}
    <span className="flex-shrink-0 min-w-[52px] text-center bg-emerald-500/10 border border-emerald-500/20 rounded-md px-2 py-0.5 text-xs font-bold text-emerald-400 font-mono tracking-wide">
      {stock.symbol}
    </span>

    {/* Name */}
    <span className="flex-1 min-w-0 text-sm text-slate-300 truncate group-hover:text-white transition-colors">
      {stock.instrument_name}
    </span>

    {/* Exchange */}
    <span className="flex-shrink-0 text-[10px] font-medium text-slate-500 bg-slate-800 border border-slate-700 rounded px-1.5 py-0.5 uppercase tracking-wide">
      {stock.exchange}
    </span>

    {/* Add Button */}
    <button
  onClick={() => {
    if (isAdded) {
      dispatch(removeFromWatchlist({ symbol: stock.symbol, exchange: stock.exchange }));
      toast.info(`${stock.symbol} removed from   watchlist!`, {
        position: "top-right",
        autoClose: 2000,
      });
      const updated =
 watchlist.filter(
  item =>
   !(
    item.symbol === stock.symbol &&
    item.exchange === stock.exchange
   )
 );

saveWatchlist(
 updated
);
    } else {
      console.log(
 "Before Dispatch",
 stock
);
      dispatch(addToWatchlist(stock));
      const updated = [
 ...watchlist,
 stock
];

saveWatchlist(
 updated
);
      toast.success(`${stock.symbol} added to watchlist!`, {
        position: "top-right",
        autoClose: 2000,
      });
    }
  }}
  className={
    isAdded
    ? "bg-red-500 px-2 py-1 rounded text-xs"
    : "bg-emerald-500 px-2 py-1 rounded text-xs"
  }
  >

  {isAdded
    ? "- Remove"
    : "+ Add"}

  </button>

  </div>
              </li>
            )})}
          </ul>
        )} 

        {/* Footer */}
        {results.length > 0 && (
          <div className="px-3.5 py-2 border-t border-slate-800 flex items-center justify-between">
            <span className="text-[10px] text-slate-600">Click a result to view details</span>
            <kbd className="text-[10px] text-slate-600 bg-slate-800 border border-slate-700/60 rounded px-1.5 py-0.5 font-mono">esc</kbd>
          </div>
        )}
      </div>
    );
  }
