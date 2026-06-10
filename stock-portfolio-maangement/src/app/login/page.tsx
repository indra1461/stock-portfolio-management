import LoginForm from '@/features/auth/LoginForm';
import React from 'react';

const page = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
            <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">StockPortfolio</h1>
          <p className="text-slate-400 text-sm mt-1">Sign in to manage your investments</p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default page;
