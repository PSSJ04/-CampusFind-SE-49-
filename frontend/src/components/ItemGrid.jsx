// frontend/src/components/ItemGrid.jsx
import React, { useEffect, useState } from 'react';
import { fetchItems } from '../api/items';
import ItemCard from './ItemCard';

export default function ItemGrid({ filters = {} }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadItems = async () => {
    setLoading(true);
    try {
      const data = await fetchItems(filters);
      setItems(data);
      setError(null);
    } catch (err) {
      setError('Failed to load items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filters)]);

  // Called by ItemCard after a successful status update
  const handleStatusChange = (updatedItem) => {
    setItems(prev =>
      prev.map(i => (i._id === updatedItem._id ? updatedItem : i))
      // OR to remove instantly instead of greying out:
      // prev.filter(i => i._id !== updatedItem._id)
    );
  };

  if (loading) return <p>Loading items...</p>;
  if (error) return <p className="error">{error}</p>;
  if (items.length === 0) return <p>No items found.</p>;

  return (
    <div className="item-grid">
      {items.map(item => (
        <ItemCard key={item._id} item={item} onStatusChange={handleStatusChange} />
      ))}
    </div>
  );
}