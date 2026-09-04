import React, { useState } from 'react';
import { updateItemStatus } from '../api';

export default function ItemCard({ item, onStatusChange }) {
  const [loading, setLoading] = useState(false);
  const isLost = item.type === 'Lost';
  const isResolved = item.status !== 'Active';

  const handleResolve = async () => {
    if (!window.confirm(`Mark "${item.name}" as ${isLost ? 'Returned' : 'Claimed'}?`)) return;
    setLoading(true);
    try {
      const updated = await updateItemStatus(item._id, isLost ? 'Returned' : 'Claimed');
      onStatusChange?.(updated);
    } catch {
      alert('Could not update status. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const formattedDate = item.date
    ? new Date(item.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
    : '';

  return (
    <article className={`card overflow-hidden ${isResolved ? 'opacity-70' : ''}`}>
      {item.imageUrl ? (
        <img src={item.imageUrl} alt={item.name} className="h-40 w-full object-cover" />
      ) : null}

      <div className="p-4">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="text-lg font-semibold">{item.name}</h3>
          <span className={`badge ${isLost ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {item.type}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-500">{item.status}</p>
        <p className="mt-2 text-sm text-gray-600">{item.description}</p>
        <ul className="mt-3 space-y-1 text-sm text-gray-700">
          <li>Location: {item.location}</li>
          {formattedDate && <li>Date: {formattedDate}</li>}
          {item.contactInfo && <li>Contact: {item.contactInfo}</li>}
        </ul>
        {!isResolved && (
          <button onClick={handleResolve} disabled={loading} className="btn btn-outline mt-4 w-full">
            {loading ? 'Updating...' : `Mark as ${isLost ? 'Returned' : 'Claimed'}`}
          </button>
        )}
      </div>
    </article>
  );
}
