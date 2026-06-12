"use client";

import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { selectWatchlist } from "@/features/watchlist/watchlistSelectors";
import { logout } from "@/features/auth/authSlice";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Header from "@/components/layout/Header";

export default function ProfilePage() {
  const user = useAppSelector((state) => state.auth.user);
  const watchlist = useAppSelector(selectWatchlist);
  const dispatch = useAppDispatch();
  const router = useRouter();

  function handleLogout() {
    dispatch(logout());
    router.push("/login");
  }

  const initials = user?.name
    ?.split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) ?? "U";

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-white">
        <Header />

        {/* Page header */}
        <div className="border-b border-slate-800/60 px-6 py-8">
          <div className="max-w-3xl mx-auto flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Profile</h1>
              <p className="text-xs text-slate-500 mt-0.5">Your account details</p>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-6 py-8 space-y-4">

          {/* Avatar + name card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center gap-5">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center text-emerald-400 text-2xl font-bold shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-xl font-semibold text-white truncate">{user?.name ?? "—"}</p>
              <p className="text-sm text-slate-400 truncate mt-0.5">{user?.email ?? "—"}</p>
            </div>
          </div>

          {/* Info rows */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl divide-y divide-slate-800 overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-slate-400">Full name</span>
              <span className="text-sm font-medium text-white">{user?.name ?? "—"}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-slate-400">Email</span>
              <span className="text-sm font-medium text-white">{user?.email ?? "—"}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-slate-400">User ID</span>
              <span className="text-sm font-mono text-slate-300">#{user?.id ?? "—"}</span>
            </div>
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm text-slate-400">Watchlist stocks</span>
              <span className="text-sm font-medium text-emerald-400">
                {watchlist.length} stock{watchlist.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Logout */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-white">Sign out</p>
              <p className="text-xs text-slate-500 mt-0.5">You will be redirected to the login page.</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/20 text-sm font-medium text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
