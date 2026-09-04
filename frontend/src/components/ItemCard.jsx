import React from 'react';

export default function ItemCard({ item }) {
  const isLost = item.type === 'Lost';
  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow duration-200 p-5 flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide uppercase ${
                isLost
                  ? 'bg-rose-50 text-rose-700 border border-rose-200'
                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
              }`}
            >
              {item.type}
            </span>
            {item.category && item.category !== 'Other' && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                {item.category}
              </span>
            )}
          </div>

          <span
            className={`text-xs font-medium px-2 py-0.5 rounded ${
              item.status === 'Active'
                ? 'bg-blue-50 text-blue-700'
                : 'bg-slate-100 text-slate-500'
            }`}
          >
            {item.status}
          </span>
        </div>

        {/* Item Title */}
        <h3 className="text-lg font-bold text-slate-900 tracking-tight mb-2">
          {item.name}
        </h3>

        {/* Location & Date */}
        <div className="space-y-1.5 text-xs text-slate-500 mb-3">
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-slate-400 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <span className="truncate">{item.location}</span>
          </div>

          {formattedDate && (
            <div className="flex items-center gap-1.5">
              <svg
                className="w-4 h-4 text-slate-400 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>{formattedDate}</span>
            </div>
          )}
        </div>

        {/* Description */}
        {item.description && (
          <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
            {item.description}
          </p>
        )}
      </div>

      {/* Contact Footer */}
      {item.contactInfo && (
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span className="font-medium text-slate-400">Contact:</span>
          <span className="font-medium text-slate-700 truncate max-w-[200px]">
            {item.contactInfo}
          </span>
        </div>
      )}
    </div>
  );
}
