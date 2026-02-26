import got from 'got';

const API_BASE = 'https://dev-cs55-13-test.pantheonsite.io/wp-json/myplugin/v1';

export async function getAllDinnerSlugs() {
  const items = await got(`${API_BASE}/dinner`).json();
  return items.map(item => ({
    params: { slug: item.slug },
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

export async function getDinnerData(slug) {
  const items = await got(`${API_BASE}/dinner`).json();
  const item = items.find(item => item.slug === slug);
  if (!item) throw new Error(`Dinner item with slug ${slug} not found`);
  return item;
}

