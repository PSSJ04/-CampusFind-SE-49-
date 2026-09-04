// frontend/src/components/ItemCard.jsx
import React, { useState } from 'react';
import { updateItemStatus } from '../api/items';

export default function ItemCard({ item, onStatusChange }) {
  const [loading, setLoading] = useState(false);
  const isResolved = item.status !== 'Active';

  const handleResolve = async () => {
    if (!window.confirm(`Mark "${item.name}" as Claimed/Returned?`)) return;
    setLoading(true);
    try {
      const newStatus = item.type === 'Lost' ? 'Returned' : 'Claimed';
      const updated = await updateItemStatus(item._id, newStatus);
      onStatusChange(updated);
    } catch (err) {
      alert('Could not update status. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`item-card ${isResolved ? 'item-card--resolved' : ''}`}>
      {isResolved && <span className="badge badge--resolved">Resolved</span>}

      {item.imageUrl && (
        <img src={item.imageUrl} alt={item.name} className="item-card__image" />
      )}

      <div className="item-card__body">
        <h3>{item.name}</h3>
        <p><strong>{item.type}</strong> · {item.location}</p>
        <p>{new Date(item.date).toLocaleDateString()}</p>
        <p className="item-card__desc">{item.description}</p>
        <p className="item-card__contact">Contact: {item.contactInfo}</p>
      </div>

      {!isResolved && (
        <button
          className="item-card__btn"
          onClick={handleResolve}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Mark as Claimed/Returned'}
        </button>
      )}
    </div>
  );
}