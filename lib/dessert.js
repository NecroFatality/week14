import got from 'got';

const API_BASE = 'https://dev-cs55-13-test.pantheonsite.io/wp-json/myplugin/v1';

export async function getAllDessertIds() {
  try {
    const items = await got(`${API_BASE}/desserts`).json();
    return items.map(item => ({
      params: { id: item.ID.toString() },
    }));
  } catch (error) {
    console.warn('Desserts endpoint not available:', error.message);
    return [];
  }
}

export async function getSortedDessertData() {
  try {
    const items = await got(`${API_BASE}/desserts`).json();
    return items.sort((a, b) => {
      const nameA = a.recipe_name || a.post_title || '';
      const nameB = b.recipe_name || b.post_title || '';
      return nameA.localeCompare(nameB);
    });
  } catch (error) {
    console.warn('Desserts endpoint not available:', error.message);
    return [];
  }
}

export async function getDessertData(id) {
  const items = await got(`${API_BASE}/desserts`).json();
  const item = items.find(item => item.ID.toString() === id);
  if (!item) throw new Error(`Dessert item with ID ${id} not found`);
  return item;
}
