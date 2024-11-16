const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://backend:3000';

export const fetchData = async () => {
  const response = await fetch(`${API_URL}/endpoint`);
  const data = await response.json();
  return data;
};
