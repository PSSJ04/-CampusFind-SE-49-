import React, { useState } from 'react';
import { updateItemStatus } from '../api';
import { MapPin, Calendar, CheckCircle, Package, Phone } from 'lucide-react';

export default function ItemCard({ item, onStatusChange }) {
  const [loading, setLoading] = useState(false);
  const isLost = item.type === 'Lost';
  const isResolved = item.status !== 'Active';

  const handleResolve = async () => {
    if (!window.confirm(`Mark "${item.name}" as ${isLost ? 'Returned' : 'Claimed'}?`)) return;
    setLoading(true);
    try {
      const newStatus = isLost ? 'Returned' : 'Claimed';
      const updated = await updateItemStatus(item._id, newStatus);
      if (onStatusChange) {
        onStatusChange(updated);
      }
    } catch (err) {
      alert('Could not update status. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : '';

  return (
    <div className={`glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:border-indigo-500/30 group flex flex-col ${isResolved ? 'opacity-75' : ''}`}>
      {/* Image or Placeholder */}
      {item.imageUrl ? (
        <div className="h-48 w-full overflow-hidden relative">
          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${isLost ? 'bg-red-500/90 text-white border-red-400' : 'bg-emerald-500/90 text-white border-emerald-400'} shadow-lg backdrop-blur-md`}>
              {item.type}
            </span>
          </div>
        </div>
      ) : (
        <div className={`h-48 w-full flex items-center justify-center relative ${isLost ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
          <Package size={48} className={isLost ? 'text-red-500/30' : 'text-emerald-500/30'} />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${isLost ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>
              {item.type}
            </span>
          </div>
        </div>
      )}

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white leading-tight line-clamp-2">{item.name}</h3>
          <span className={`shrink-0 ml-3 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border ${isResolved ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border-amber-500/30'}`}>
            {item.status}
          </span>
        </div>

        <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-1">{item.description}</p>

        <div className="space-y-2 mb-6 text-sm text-slate-300 bg-slate-900/40 p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-indigo-400" />
            <span className="truncate">{item.location}</span>
          </div>
          {formattedDate && (
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-indigo-400" />
              <span>{formattedDate}</span>
            </div>
          )}
          {item.contactInfo && (
            <div className="flex items-center gap-2">
              <Phone size={16} className="text-indigo-400" />
              <span className="truncate">{item.contactInfo}</span>
            </div>
          )}
        </div>

        {!isResolved && (
          <button 
            onClick={handleResolve}
            disabled={loading}
            className="w-full py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-600 disabled:opacity-50"
          >
            <CheckCircle size={16} />
            {loading ? 'Updating...' : `Mark as ${isLost ? 'Returned' : 'Claimed'}`}
          </button>
        )}
      </div>
    </div>
  );
}

