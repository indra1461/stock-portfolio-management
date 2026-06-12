"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectWatchlist } from "@/features/watchlist/watchlistSelectors";
import { removeFromWatchlist } from "@/features/watchlist/watchlistSlice";
import { toast } from "react-toastify";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Header from "@/components/layout/Header";

export default function WatchlistPage() {
  const watchlist = useAppSelector(selectWatchlist);
  const dispatch = useAppDispatch();

  function handleRemove(symbol: string, exchange: string) {
    dispatch(removeFromWatchlist({ symbol, exchange }));
    toast.info(`${symbol} removed from watchlist`, {
      position: "top-right",
      autoClose: 2000,
    });
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-white">
        <Header />

        {/* Page header */}
        <div className="border-b border-slate-800/60 px-6 py-8">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">My Watchlist</h1>
                <p className="text-xs text-slate-500 mt-0.5">Track your favourite stocks</p>
              </div>
            </div>

            {watchlist.length > 0 && (
              <span className="text-sm font-medium text-slate-400 bg-slate-800/80 border border-slate-700 rounded-full px-3.5 py-1">
                {watchlist.length} stock{watchlist.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="max-w-5xl mx-auto px-6 py-8">
          {watchlist.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-28 gap-5 text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center">
                <svg className="w-8 h-8 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <div>
                <p className="text-slate-300 font-semibold text-base">Your watchlist is empty</p>
                <p className="text-slate-500 text-sm mt-1.5 max-w-xs">
                  Search for stocks and hit <span className="text-emerald-400 font-medium">+ Add</span> to start tracking them here.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {watchlist.map((stock) => (
                <div
                  key={`${stock.symbol}-${stock.exchange}`}
                  className="group relative bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 transition-all duration-200 hover:shadow-xl hover:shadow-black/40"
                >
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-emerald-500/4 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />

                  <div className="flex items-start justify-between mb-3">
                    <span className="inline-flex items-center bg-emerald-500/10 border border-emerald-500/20 rounded-lg px-2.5 py-1 text-sm font-bold text-emerald-400 font-mono tracking-wide">
                      {stock.symbol}
                    </span>
                    <button
                      onClick={() => handleRemove(stock.symbol, stock.exchange)}
                      title="Remove from watchlist"
                      className="opacity-0 group-hover:opacity-100 w-7 h-7 flex items-center justify-center rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all duration-150"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>

                  <p className="text-sm font-medium text-slate-200 leading-snug truncate mb-4" title={stock.instrument_name}>
                    {stock.instrument_name}
                  </p>

                  <span className="inline-flex text-[10px] font-semibold uppercase tracking-wider text-slate-500 bg-slate-800 border border-slate-700/60 rounded px-2 py-0.5">
                    {stock.exchange}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
