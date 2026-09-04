import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchItems } from '../api';
import ItemCard from '../components/ItemCard';

const SLIIT_LOCATIONS = [
  'Main Library', 'Computing Faculty', 'Engineering Faculty',
  'Business Faculty', 'Humanities & Sciences Faculty', 'Cafeteria',
  'Student Center', 'Auditorium', 'Ground Floor Lobby', 'Parking Area',
  'Sports Complex', 'Lab 1 - Computing', 'Lab 2 - Computing', 'Lab 3 - Computing',
  'Lecture Hall A', 'Lecture Hall B', 'Lecture Hall C', 'Other',
];

const ITEM_CATEGORIES = [
  'Electronics', 'Valuables', 'Documents', 'Clothing', 'Books/Stationery', 'ID Cards', 'Keys', 'Other',
];

const SearchItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({
    search: '',
    type: '',
    location: '',
    category: '',
  });

  const loadItems = async () => {
    setLoading(true);
    try {
      const queryParams = new URLSearchParams();
      if (filters.search) queryParams.append('search', filters.search);
      if (filters.type) queryParams.append('type', filters.type);
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.category) queryParams.append('category', filters.category);
      const queryStr = queryParams.toString() ? `?${queryParams.toString()}` : '';
      setItems(await fetchItems(queryStr));
      setError('');
    } catch {
      setError('Failed to load items. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters.type, filters.location, filters.category]);

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (updated) => {
    setItems((prev) => prev.map((item) => (item._id === updated._id ? updated : item)));
  };

  return (
    <div>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Search</h1>
          <p className="mt-1 text-sm text-gray-600">Browse lost and found listings.</p>
        </div>
        <Link to="/report" className="text-sm text-blue-600 hover:underline">New report</Link>
      </div>

      <form onSubmit={(e) => { e.preventDefault(); loadItems(); }} className="card mt-6 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-5">
        <input
          type="text"
          placeholder="Search by name or description"
          value={filters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="field lg:col-span-2"
        />
        <select value={filters.type} onChange={(e) => handleFilterChange('type', e.target.value)} className="field">
          <option value="">All types</option>
          <option value="Lost">Lost</option>
          <option value="Found">Found</option>
        </select>
        <select value={filters.location} onChange={(e) => handleFilterChange('location', e.target.value)} className="field">
          <option value="">All locations</option>
          {SLIIT_LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
        <select value={filters.category} onChange={(e) => handleFilterChange('category', e.target.value)} className="field">
          <option value="">All categories</option>
          {ITEM_CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" className="btn btn-primary sm:col-span-2 lg:col-span-5">Search</button>
      </form>

      {error && <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}

      {loading ? (
        <p className="mt-6 text-sm text-gray-500">Loading items...</p>
      ) : items.length === 0 ? (
        <div className="card mt-6 p-8 text-center">
          <p className="font-medium">No items found</p>
          <p className="mt-1 text-sm text-gray-600">Try a different keyword or filter.</p>
        </div>
      ) : (
        <>
          <p className="mt-6 text-sm text-gray-500">{items.length} listing{items.length === 1 ? '' : 's'}</p>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <ItemCard key={item._id} item={item} onStatusChange={handleStatusChange} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default SearchItems;
