import got from 'got';

const API_BASE = 'https://dev-cs55-13-test.pantheonsite.io/wp-json/myplugin/v1';

/**
 * Return all recipe IDs for dynamic routing
 */
export async function getAllRecipeIds() {
  const recipes = await got(`${API_BASE}/recipes`).json();

  return recipes.map(recipe => ({
    params: { id: recipe.ID.toString() }, // Use the PHP ID field
  }));
}

/**
 * Return all recipes sorted by recipe name
 * (or by date if you add a date field in WP)
 */
export async function getSortedRecipesData() {
  const recipes = await got(`${API_BASE}/recipes`).json();

  // Sort alphabetically by recipe_name
  return recipes.sort((a, b) => a.recipe_name.localeCompare(b.recipe_name));
}

/**
 * Return a single recipe by ID
 */
export async function getRecipeData(id) {
  const recipes = await got(`${API_BASE}/recipes`).json();

  // Find the recipe that matches the ID
  const recipe = recipes.find(recipe => recipe.ID.toString() === id);

  if (!recipe) {
    throw new Error(`Recipe with ID ${id} not found`);
  }

  return recipe;
}
