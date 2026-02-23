import Layout from '../../components/layout';
import VideoEmbed from '../../components/VideoEmbed';
import { getAllDessertIds, getDessertData } from '../../lib/dessert';
import Head from 'next/head';
import styles from '../../styles/Recipe.module.css';

export async function getStaticProps({ params }) {
  const recipeData = await getDessertData(params.id);
  return {
    props: { recipeData },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const paths = await getAllDessertIds();
  return { paths, fallback: 'blocking' };
}

function parseIngredients(ingredients) {
  if (!ingredients) return [];
  return ingredients.split(/[,\n]/).map(item => item.trim()).filter(item => item.length > 0);
}

function parseSteps(steps) {
  if (!steps) return [];
  return steps.split(/\d+\.\s*|\n/).map(item => item.trim()).filter(item => item.length > 0);
}

export default function DessertRecipe({ recipeData }) {
  const name = recipeData.recipe_name || recipeData.post_title;
  const ingredientsList = parseIngredients(recipeData.ingredients);
  const stepsList = parseSteps(recipeData.steps);

  return (
    <Layout>
      <Head>
        <title>{`${name} | Dessert`}</title>
      </Head>

      <article className={styles.recipeArticle}>
        <header className={styles.recipeHeader}>
          <span className={styles.mealBadge}>🍰 Dessert</span>
          <h1 className={styles.recipeTitle}>{name}</h1>
          {recipeData.difficulty && (
            <span className={styles.difficulty}>Difficulty: {recipeData.difficulty}</span>
          )}
        </header>

        {ingredientsList.length > 0 && (
          <section className={styles.ingredientsSection}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>🥗</span> Ingredients
            </h2>
            <ul className={styles.ingredientsList}>
              {ingredientsList.map((ingredient, index) => (
                <li key={index} className={styles.ingredientItem}>{ingredient}</li>
              ))}
            </ul>
          </section>
        )}

        {stepsList.length > 0 && (
          <section className={styles.stepsSection}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📝</span> Instructions
            </h2>
            <ol className={styles.stepsList}>
              {stepsList.map((step, index) => (
                <li key={index} className={styles.stepItem}>{step}</li>
              ))}
            </ol>
          </section>
        )}

        {stepsList.length === 0 && recipeData.post_content && (
          <section className={styles.stepsSection}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionIcon}>📝</span> Instructions
            </h2>
            <div className={styles.contentHtml} dangerouslySetInnerHTML={{ __html: recipeData.post_content }} />
          </section>
        )}

        {recipeData.link && (
          <VideoEmbed url={recipeData.link} />
        )}
      </article>
    </Layout>
  );
}
