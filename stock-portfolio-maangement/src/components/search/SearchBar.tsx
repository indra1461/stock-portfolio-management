"use client";
import { useState, useEffect, useRef } from "react";
import { searchStocks } from "@/features/search/searchService";
import useDebounce from "@/hooks/useDebounce";
import { useAppDispatch } from "@/store/hooks";
import {
  searchStart,
  searchSuccess,
  searchFailure,
} from "@/features/search/searchSlice";
import SearchResults from "./SearchResults";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const dispatch = useAppDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    async function fetchStocks() {
      if (!debouncedQuery.trim()) {
        dispatch(searchSuccess([]));
        return;
      }
      try {
        dispatch(searchStart());
        const response = await searchStocks(debouncedQuery);
        dispatch(searchSuccess(response.data));
        
      } catch {
        dispatch(searchFailure("Search failed. Try again."));
      }
    }
    fetchStocks();
  }, [debouncedQuery, dispatch]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsFocused(true);
      }
      if (e.key === "Escape") {
        setIsFocused(false);
        inputRef.current?.blur();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  function handleClear() {
    setQuery("");
    dispatch(searchSuccess([]));
    inputRef.current?.focus();
  }

  const showResults = isFocused && query.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full">
      <div
        className={`flex items-center gap-2.5 bg-slate-800/70 border rounded-xl px-3.5 py-2.5 transition-all duration-200 ${
          isFocused
            ? "border-emerald-500/50 bg-slate-800 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/20"
            : "border-slate-700/80 hover:border-slate-600"
        }`}
      >
        {/* Search / Spinner icon */}
        <svg
          className={`w-4 h-4 flex-shrink-0 transition-colors ${isFocused ? "text-emerald-400" : "text-slate-500"}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>

        <input
          ref={inputRef}
          type="text"
          placeholder="Search stocks, symbols..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 outline-none min-w-0"
        />

        {/* Clear button */}
        {query && (
          <button
            onClick={handleClear}
            className="flex-shrink-0 w-4 h-4 flex items-center justify-center text-slate-500 hover:text-slate-300 transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}

        {/* Keyboard hint */}
        {!query && !isFocused && (
          <kbd className="hidden sm:flex items-center gap-0.5 text-[10px] text-slate-500 bg-slate-700/60 border border-slate-600/40 rounded px-1.5 py-0.5 font-mono flex-shrink-0 select-none">
            ⌘K
          </kbd>
        )}
      </div>

      {showResults && <SearchResults />}
    </div>
  );
};

export default SearchBar;
