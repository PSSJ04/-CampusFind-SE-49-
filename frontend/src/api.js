const API_URL = import.meta.env.VITE_API_URL || 'https://campusfind-se-49-production.up.railway.app';

export const fetchItems = async (query = '') => {
  const response = await fetch(`${API_URL}/items${query}`);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch items');
  }
  return data;
};

export const createItem = async (itemData) => {
  const response = await fetch(`${API_URL}/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(itemData),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create item');
  }
  return data;
};

export const updateItemStatus = async (id, status) => {
  const response = await fetch(`${API_URL}/items/${id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || 'Failed to update status');
  }
  return data;
};

