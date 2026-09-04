import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import ItemCard from './components/ItemCard';
import { fetchItems } from './api';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce search input by 300ms to avoid unnecessary rapid requests
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim());
    }, 300);

    return () => clearTimeout(handler);
  }, [searchQuery]);

  // Fetch items whenever debouncedQuery changes
  useEffect(() => {
    let isCancelled = false;

    const loadItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const queryParam = debouncedQuery
          ? `?search=${encodeURIComponent(debouncedQuery)}`
          : '';
        const data = await fetchItems(queryParam);
        if (!isCancelled) {
          setItems(data);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Failed to load items:', err);
          setError('Could not connect to the backend server. Please make sure it is running on port 5000.');
        }
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadItems();

    return () => {
      isCancelled = true;
    };
  }, [debouncedQuery]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black text-xl shadow-md shadow-blue-200">
              CF
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 tracking-tight leading-none">
                CampusFind
              </h1>
              <p className="text-xs text-slate-500 font-medium">
                University Lost & Found Network
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Database
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Search Hero Section */}
        <div className="text-center max-w-2xl mx-auto mb-8 pt-4">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-3">
            Find Lost Items on Campus
          </h2>
          <p className="text-base text-slate-600 mb-6">
            Search reports across lecture halls, labs, libraries, and cafeterias.
          </p>

          {/* Function 2: Search Items Bar */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            isLoading={isLoading}
          />
        </div>

        {/* Results Header Info */}
        <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              {debouncedQuery ? `Search Results for "${debouncedQuery}"` : 'All Reported Items'}
            </h3>
            <span className="px-2 py-0.5 text-xs font-bold bg-slate-200 text-slate-700 rounded-full">
              {items.length}
            </span>
          </div>

          {debouncedQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline"
            >
              Clear Search
            </button>
          )}
        </div>

        {/* Error State */}
        {error && (
          <div className="p-4 mb-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center gap-3">
            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Loading State Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-white rounded-2xl border border-slate-100 p-5 shadow-xs animate-pulse"
              >
                <div className="h-5 w-20 bg-slate-200 rounded-full mb-4"></div>
                <div className="h-6 w-3/4 bg-slate-200 rounded mb-3"></div>
                <div className="h-4 w-1/2 bg-slate-200 rounded mb-2"></div>
                <div className="h-16 w-full bg-slate-100 rounded mb-4"></div>
                <div className="h-4 w-1/3 bg-slate-200 rounded"></div>
              </div>
            ))}
          </div>
        )}

        {/* Items Grid */}
        {!isLoading && items.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!isLoading && items.length === 0 && !error && (
          <div className="text-center py-16 px-4 bg-white rounded-2xl border border-dashed border-slate-200 max-w-md mx-auto my-8">
            <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h4 className="text-base font-bold text-slate-800 mb-1">
              No matching items found
            </h4>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              {debouncedQuery
                ? `We couldn't find any reports matching "${debouncedQuery}". Try searching with a broader keyword (e.g. "wallet" or "ID").`
                : 'There are no active lost or found reports yet.'}
            </p>
            {debouncedQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="inline-flex items-center px-4 py-2 text-xs font-semibold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-xl transition duration-150"
              >
                Reset Search
              </button>
            )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center text-xs text-slate-500">
          <p>© 2026 CampusFind — Sri Lankan University Lost and Found Platform.</p>
        </div>
      </footer>
    </div>
  );
}
