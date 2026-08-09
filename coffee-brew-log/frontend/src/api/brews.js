const BASE = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/api/brews`
  : '/api/brews';

export async function fetchBrews(method = '') {
  const url = method ? `${BASE}?method=${encodeURIComponent(method)}` : BASE;
  const res = await fetch(url);
  if (!res.ok) throw new Error('Failed to fetch brews');
  return res.json();
}

export async function createBrew(data) {
  const res = await fetch(BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

export async function updateBrew(id, data) {
  const res = await fetch(`${BASE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

export async function deleteBrew(id) {
  const res = await fetch(`${BASE}/${id}`, { method: 'DELETE' });
  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}
