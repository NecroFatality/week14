import got from 'got';

const API_BASE = 'https://dev-cs55-13-test.pantheonsite.io/wp-json/myplugin/v1';

export async function getAllDinnerIds() {
  const items = await got(`${API_BASE}/dinner`).json();
  return items.map(item => ({
    params: { id: item.ID.toString() },
  }));
}

export async function getSortedDinnerData() {
  const items = await got(`${API_BASE}/dinner`).json();
  return items.sort((a, b) => {
    const nameA = a.recipe_name || a.post_title || '';
    const nameB = b.recipe_name || b.post_title || '';
    return nameA.localeCompare(nameB);
  });
}

export async function getDinnerData(id) {
  const items = await got(`${API_BASE}/dinner`).json();
  const item = items.find(item => item.ID.toString() === id);
  if (!item) throw new Error(`Dinner item with ID ${id} not found`);
  return item;
}

