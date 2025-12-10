// Import the Layout component to wrap the page in a consistent layout
import Layout from '../../components/layout';

// Import helper functions from lib/posts
import { getAllRecipeIds, getRecipeData } from '../../lib/posts';

// Import Head component from Next.js to modify the <head> of the HTML page
import Head from 'next/head';

// Import utility CSS module for scoped styles
import utilStyles from '../../styles/utils.module.css';

// ------------------------------------------------------------
// This function runs at build time for static generation
// It fetches the data for a single recipe based on its ID
export async function getStaticProps({ params }) {
  // Fetch the recipe data for the given ID
  const recipeData = await getRecipeData(params.id);

  // Return the recipe data as props to the component
  return {
    props: {
      recipeData,
    },
  };
}

// ------------------------------------------------------------
// This function runs at build time to tell Next.js which dynamic routes to pre-render
export async function getStaticPaths() {
  // Get an array of all recipe IDs
  const paths = await getAllRecipeIds();

  // Return an object with all paths and fallback behavior
  return {
    paths,
    fallback: false,
  };
}

// ------------------------------------------------------------
// Default export: the Recipe component that renders a single recipe
export default function Recipe({ recipeData }) {
  return (
    <Layout>
      {/* Set the page title dynamically */}
      <Head>
        <title>{recipeData.recipe_name}</title>
      </Head>

      {/* Main content of the recipe */}
      <article>
        {/* Recipe name with extra-large heading style */}
        <h1 className={utilStyles.headingXl}>{recipeData.recipe_name}</h1>

        {/* Ingredients section */}
        <div>
          <h3>Ingredients</h3>
          <p>{recipeData.ingredients}</p>
        </div>

        {/* Post content if available */}
        {recipeData.post_content && (
          <div>
            <h3>Instructions</h3>
            <div dangerouslySetInnerHTML={{ __html: recipeData.post_content }} />
          </div>
        )}
      </article>
    </Layout>
  );
}
