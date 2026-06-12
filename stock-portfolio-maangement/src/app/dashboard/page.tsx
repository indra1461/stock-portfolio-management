"use client";

import { useAppSelector } from "@/store/hooks";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Header from "@/components/layout/Header";

export default function Dashboard() {
  const user = useAppSelector((state) => state.auth.user);

  function getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-950 text-white">
        <Header />
        <main className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-2xl font-bold text-white">
            {getGreeting()}, <span className="text-emerald-400">{user?.name ?? "Investor"}</span> 👋
          </h1>
          <p className="text-slate-400 text-sm mt-1">Here&apos;s your portfolio overview for today.</p>
        </main>
      </div>
    </ProtectedRoute>
  );
}
