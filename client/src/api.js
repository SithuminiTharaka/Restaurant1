const API_URL = '/api/restaurants';

export const getRestaurants = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const getRestaurant = async (id) => {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
};

export const createRestaurant = async (restaurant) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(restaurant),
  });
  return response.json();
};

export const updateRestaurant = async (id, restaurant) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(restaurant),
  });
  return response.json();
};

export const deleteRestaurant = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
