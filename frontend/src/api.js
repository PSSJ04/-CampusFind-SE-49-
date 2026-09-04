const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const fetchItems = async (query = '') => {
  const response = await fetch(`${API_URL}/items${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }
  return response.json();
};

export const createItem = async (itemData) => {
  const response = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  });
  if (!response.ok) {
    throw new Error('Failed to create item');
  }
  return response.json();
};

export const updateItemStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/items/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) {
    throw new Error('Failed to update status');
  }
  return response.json();
};
