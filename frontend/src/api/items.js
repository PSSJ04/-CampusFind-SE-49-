// frontend/src/api/items.js
const BASE_URL = 'http://localhost:5000/api/items'; // adjust to your backend URL

export async function fetchItems(params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}${query ? `?${query}` : ''}`);
  if (!res.ok) throw new Error('Failed to fetch items');
  return res.json();
}

export async function updateItemStatus(id, status) {
  const res = await fetch(`${BASE_URL}/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update status');
  return res.json();
}