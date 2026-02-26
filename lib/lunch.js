import got from 'got';

const API_BASE = 'https://dev-cs55-13-test.pantheonsite.io/wp-json/myplugin/v1';

export async function getAllLunchSlugs() {
  const items = await got(`${API_BASE}/lunch`).json();
  return items.map(item => ({
    params: { slug: item.slug },
  }));
}

export async function getSortedLunchData() {
  const items = await got(`${API_BASE}/lunch`).json();
  return items.sort((a, b) => {
    const nameA = a.recipe_name || a.post_title || '';
    const nameB = b.recipe_name || b.post_title || '';
    return nameA.localeCompare(nameB);
  });
}

export async function getLunchData(slug) {
  const items = await got(`${API_BASE}/lunch`).json();
  const item = items.find(item => item.slug === slug);
  if (!item) throw new Error(`Lunch item with slug ${slug} not found`);
  return item;
}

