import { useEffect, useState } from 'react';
import { fetchItems } from '../api';
import FilterItems from './FilterItems';

function ItemsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ type: '', location: '', category: '' });
  const [items, setItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery.trim()) params.set('search', searchQuery.trim());
    if (filters.type) params.set('type', filters.type);
    if (filters.location) params.set('location', filters.location);
    if (filters.category) params.set('category', filters.category);

    const queryString = params.toString() ? `?${params.toString()}` : '';

    fetchItems(queryString)
      .then((data) => {
        setItems(data);
        setError(null);
      })
      .catch((err) => setError(err.message));
  }, [searchQuery, filters]);

  return (
    <section className="items-page">
      <div className="items-toolbar">
        <input
          type="search"
          placeholder="Search items..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          aria-label="Search items"
        />
        <FilterItems filters={filters} onChange={setFilters} />
      </div>

      {error && <p className="error">{error}</p>}

      <ul className="items-list">
        {items.map((item) => (
          <li key={item._id}>
            <strong>{item.name}</strong> — {item.type} — {item.category || 'Uncategorized'} — {item.location}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default ItemsPage;
