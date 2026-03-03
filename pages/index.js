import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { useState } from 'react';

import { getSortedBreakfastData } from '../lib/breakfast';
import { getSortedLunchData } from '../lib/lunch';
import { getSortedDinnerData } from '../lib/dinner';
import { getSortedDessertData } from '../lib/dessert';

export async function getStaticProps() {
  const breakfastRecipes = await getSortedBreakfastData();
  const lunchRecipes = await getSortedLunchData();
  const dinnerRecipes = await getSortedDinnerData();
  const dessertRecipes = await getSortedDessertData();

  return {
    props: {
      breakfastRecipes,
      lunchRecipes,
      dinnerRecipes,
      dessertRecipes,
    },
    revalidate: 60,
  };
}

function MealSection({ title, emoji, recipes, basePath, colorClass }) {
  return (
    <section className={`${styles.mealSection} ${colorClass}`}>
      <h2 className={styles.mealTitle}>
        <span className={styles.emoji}>{emoji}</span> {title}
      </h2>
      {recipes.length > 0 ? (
        <div className={styles.recipeGrid}>
          {recipes.map((recipe) => (
            <Link
              href={`/${basePath}/${recipe.slug || recipe.ID}`}
              key={recipe.slug || recipe.ID}
              className={styles.recipeCard}
            >
              <span className={styles.recipeName}>
                {recipe.recipe_name || recipe.post_title}
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <p className={styles.noRecipes}>No recipes yet. Add some in WordPress!</p>
      )}
    </section>
  );
}

export default function Home({ breakfastRecipes, lunchRecipes, dinnerRecipes, dessertRecipes }) {
  const [searchQuery, setSearchQuery] = useState('');

  const filterRecipes = (recipes) => {
    if (!searchQuery.trim()) return recipes;
    const query = searchQuery.toLowerCase();
    return recipes.filter(recipe => {
      const name = (recipe.recipe_name || recipe.post_title || '').toLowerCase();
      const ingredients = (recipe.ingredients || '').toLowerCase();
      return name.includes(query) || ingredients.includes(query);
    });
  };

  const filteredBreakfast = filterRecipes(breakfastRecipes);
  const filteredLunch = filterRecipes(lunchRecipes);
  const filteredDinner = filterRecipes(dinnerRecipes);
  const filteredDessert = filterRecipes(dessertRecipes);

  const totalResults = filteredBreakfast.length + filteredLunch.length + filteredDinner.length + filteredDessert.length;
  const isSearching = searchQuery.trim().length > 0;

  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={styles.intro}>
        <p className={styles.description}>
          Welcome to our family cookbook! Explore delicious recipes for every meal of the day.
        </p>
      </section>

      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search recipes by name or ingredient..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
          aria-label="Search recipes"
        />
        {isSearching && (
          <p className={styles.searchResults}>
            Found {totalResults} recipe{totalResults !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <MealSection
        title="Breakfast"
        emoji="🌅"
        recipes={filteredBreakfast}
        basePath="breakfast"
        colorClass={styles.breakfast}
      />

      <MealSection
        title="Lunch"
        emoji="☀️"
        recipes={filteredLunch}
        basePath="lunch"
        colorClass={styles.lunch}
      />

      <MealSection
        title="Dinner"
        emoji="🌙"
        recipes={filteredDinner}
        basePath="dinner"
        colorClass={styles.dinner}
      />

      <MealSection
        title="Dessert"
        emoji="🍰"
        recipes={filteredDessert}
        basePath="dessert"
        colorClass={styles.dessert}
      />
    </Layout>
  );
}
