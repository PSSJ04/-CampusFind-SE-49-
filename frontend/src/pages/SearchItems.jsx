import React, { useState, useEffect } from 'react';
import { fetchItems, updateItemStatus } from '../api';
import { Search as SearchIcon, MapPin, Calendar, CheckCircle, Package, Phone, User, AlertCircle } from 'lucide-react';

const SLIIT_LOCATIONS = [
  'Main Library', 'Computing Faculty', 'Engineering Faculty', 
  'Business Faculty', 'Humanities & Sciences Faculty', 'Cafeteria',
  'Student Center', 'Auditorium', 'Ground Floor Lobby', 'Parking Area',
  'Sports Complex', 'Lab 1 - Computing', 'Lab 2 - Computing', 'Lab 3 - Computing',
  'Lecture Hall A', 'Lecture Hall B', 'Lecture Hall C', 'Other'
];

const SearchItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    location: ''
  });

  const loadItems = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.location) queryParams.append('location', filters.location);
      
      const queryStr = queryParams.toString() ? `?${queryParams.toString()}` : '';
      const data = await fetchItems(queryStr);
      setItems(data);
    } catch (err) {
      setError('Failed to load items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial load
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    loadItems();
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Trigger search automatically when dropdowns change
  useEffect(() => {
    if (filters.type !== '' || filters.location !== '') {
      loadItems();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.type, filters.location]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateItemStatus(id, newStatus);
      // Update local state
      setItems(items.map(item => item._id === id ? { ...item, status: newStatus } : item));
    } catch (err) {
      alert('Failed to update status');
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'Claimed':
      case 'Returned':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Active':
      default:
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute top-40 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
            Search <span className="gradient-text">Database</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            Find lost items or track items you've found across the SLIIT campus.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="glass-card rounded-2xl p-6 mb-12">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-6 relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <SearchIcon size={18} className="text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search by item name..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl pl-11 pr-4 py-3.5 text-sm text-white placeholder-slate-500 hover:border-slate-600 transition-all focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 outline-none"
              />
            </div>
            
            <div className="md:col-span-3">
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3.5 text-sm text-white appearance-none hover:border-slate-600 focus:border-indigo-500 transition-all outline-none"
              >
                <option value="">All Types (Lost & Found)</option>
                <option value="Lost">Lost Items</option>
                <option value="Found">Found Items</option>
              </select>
            </div>

            <div className="md:col-span-3">
              <select
                value={filters.location}
                onChange={(e) => handleFilterChange('location', e.target.value)}
                className="w-full bg-slate-800/60 border border-slate-700/50 rounded-xl px-4 py-3.5 text-sm text-white appearance-none hover:border-slate-600 focus:border-indigo-500 transition-all outline-none"
              >
                <option value="">All Locations</option>
                {SLIIT_LOCATIONS.map(loc => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
            </div>
          </form>
        </div>

        {/* Results Section */}
        {error && (
          <div className="flex items-center justify-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-2xl mb-8">
            <AlertCircle size={24} />
            <p>{error}</p>
          </div>
        )}

        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(n => (
              <div key={n} className="glass-card rounded-2xl p-6 h-80 animate-pulse flex flex-col">
                <div className="w-full h-40 bg-slate-800/50 rounded-xl mb-4" />
                <div className="h-6 bg-slate-800/50 rounded-md w-2/3 mb-3" />
                <div className="h-4 bg-slate-800/50 rounded-md w-full mb-2" />
                <div className="h-4 bg-slate-800/50 rounded-md w-4/5" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="glass-card rounded-2xl p-16 text-center">
            <div className="w-20 h-20 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
              <SearchIcon size={32} className="text-slate-500" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">No items found</h3>
            <p className="text-slate-400">Try adjusting your search filters or try a different keyword.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map(item => (
              <div key={item._id} className="glass-card rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 hover:border-indigo-500/30 group flex flex-col">
                {/* Image or Placeholder */}
                {item.imageUrl ? (
                  <div className="h-48 w-full overflow-hidden relative">
                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.type === 'Lost' ? 'bg-red-500/90 text-white border-red-400' : 'bg-emerald-500/90 text-white border-emerald-400'} shadow-lg backdrop-blur-md`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className={`h-48 w-full flex items-center justify-center relative ${item.type === 'Lost' ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
                    <Package size={48} className={item.type === 'Lost' ? 'text-red-500/30' : 'text-emerald-500/30'} />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${item.type === 'Lost' ? 'bg-red-500/20 text-red-400 border-red-500/30' : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'}`}>
                        {item.type}
                      </span>
                    </div>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white leading-tight line-clamp-2">{item.name}</h3>
                    <span className={`shrink-0 ml-3 px-2.5 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider border ${getStatusBadgeColor(item.status)}`}>
                      {item.status}
                    </span>
                  </div>

                  <p className="text-slate-400 text-sm mb-6 line-clamp-3 flex-1">{item.description}</p>

                  <div className="space-y-2 mb-6 text-sm text-slate-300 bg-slate-900/40 p-4 rounded-xl">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-indigo-400" />
                      <span className="truncate">{item.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-indigo-400" />
                      <span>{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={16} className="text-indigo-400" />
                      <span className="truncate">{item.contactInfo}</span>
                    </div>
                  </div>

                  {/* Actions based on status and type */}
                  {item.status === 'Active' && (
                    <button 
                      onClick={() => handleStatusUpdate(item._id, item.type === 'Lost' ? 'Returned' : 'Claimed')}
                      className="w-full py-2.5 rounded-xl text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center justify-center gap-2 border border-slate-700 hover:border-slate-600"
                    >
                      <CheckCircle size={16} />
                      Mark as {item.type === 'Lost' ? 'Returned to Owner' : 'Claimed by Owner'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchItems;
