import Layout from '../../components/layout';
import VideoEmbed from '../../components/VideoEmbed';
import { getAllLunchIds, getLunchData } from '../../lib/lunch';
import Head from 'next/head';
import styles from '../../styles/Recipe.module.css';

export async function getStaticProps({ params }) {
  const recipeData = await getLunchData(params.id);
  return {
    props: { recipeData },
    revalidate: 60, // ISR - regenerate every 60 seconds
  };
}

export async function getStaticPaths() {
  const paths = await getAllLunchIds();
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

export default function LunchRecipe({ recipeData }) {
  const name = recipeData.recipe_name || recipeData.post_title;
  const ingredientsList = parseIngredients(recipeData.ingredients);
  const stepsList = parseSteps(recipeData.steps);

  return (
    <Layout>
      <Head>
        <title>{`${name} | Lunch`}</title>
      </Head>

      <article className={styles.recipeArticle}>
        <header className={styles.recipeHeader}>
          <span className={styles.mealBadge}>☀️ Lunch</span>
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

        {recipeData.video_link && (
          <VideoEmbed url={recipeData.video_link} />
        )}
      </article>
    </Layout>
  );
}

