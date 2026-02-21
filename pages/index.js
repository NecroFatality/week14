import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import styles from '../styles/Home.module.css';
import Link from 'next/link';

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
              href={`/${basePath}/${recipe.ID}`}
              key={recipe.ID}
              className={styles.recipeCard}
            >
              <span className={styles.recipeName}>
                {recipe.recipe_name || recipe.post_title}
              </span>
              {recipe.ingredients && (
                <span className={styles.ingredientPreview}>
                  {recipe.ingredients.split(',').slice(0, 3).join(', ')}...
                </span>
              )}
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

      <MealSection
        title="Breakfast"
        emoji="🌅"
        recipes={breakfastRecipes}
        basePath="breakfast"
        colorClass={styles.breakfast}
      />

      <MealSection
        title="Lunch"
        emoji="☀️"
        recipes={lunchRecipes}
        basePath="lunch"
        colorClass={styles.lunch}
      />

      <MealSection
        title="Dinner"
        emoji="🌙"
        recipes={dinnerRecipes}
        basePath="dinner"
        colorClass={styles.dinner}
      />

      <MealSection
        title="Dessert"
        emoji="🍰"
        recipes={dessertRecipes}
        basePath="dessert"
        colorClass={styles.dessert}
      />
    </Layout>
  );
}
