import got from 'got';

const API_BASE = 'https://dev-cs55-13-test.pantheonsite.io/wp-json/myplugin/v1';

// Return all post IDs for dynamic routing
export async function getAllPostIds() {
  const posts = await got(`${API_BASE}/posts`).json();
  return posts.map(post => ({
    params: { id: post.id.toString() },
  }));
}

// Return all posts sorted by date
export async function getSortedPostsData() {
  const posts = await got(`${API_BASE}/posts`).json();
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Return single post by ID
export async function getPostData(id) {
  const post = await got(`${API_BASE}/posts/${id}`).json();
  return post;
}
