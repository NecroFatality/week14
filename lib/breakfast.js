import got from 'got';

const API_BASE = 'https://dev-cs55-13-test.pantheonsite.io/wp-json/myplugin/v1';

export async function getAllBreakfastSlugs() {
  const items = await got(`${API_BASE}/breakfast`).json();
  return items.map(item => ({
    params: { slug: item.slug || item.ID.toString() },
  }));
}

export async function getSortedBreakfastData() {
  const items = await got(`${API_BASE}/breakfast`).json();
  return items.sort((a, b) => {
    const nameA = a.recipe_name || a.post_title || '';
    const nameB = b.recipe_name || b.post_title || '';
    return nameA.localeCompare(nameB);
  });
}

export async function getBreakfastData(slug) {
  const items = await got(`${API_BASE}/breakfast`).json();
  const item = items.find(item => item.slug === slug || item.ID.toString() === slug);
  if (!item) throw new Error(`Breakfast item with slug ${slug} not found`);
  return item;
}

