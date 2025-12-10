// Import Head component from Next.js to modify the <head> of the HTML page
import Head from 'next/head';

// Import the Layout component and siteTitle from the components folder
import Layout, { siteTitle } from '../../components/layout';

// Import utility CSS styles
import utilStyles from '../../styles/utils.module.css';

// Import Link component from Next.js for client-side navigation
import Link from 'next/link';

// Import the function to get all recipes from lib/posts
import { getSortedRecipesData } from '../../lib/posts';

// This function runs at build time (SSG) and fetches the recipe data
export async function getStaticProps() {
  // Call getSortedRecipesData to get an array of all recipes
  const allRecipesData = await getSortedRecipesData();

  // Return the recipe data as props to the Recipes component
  return {
    props: {
      allRecipesData,
    },
  };
}

// Default export: the Recipes component that renders the recipes list page
export default function Recipes({ allRecipesData }) {
  return (
    <Layout home>
      {/* Set the page title */}
      <Head>
        <title>All Recipes | {siteTitle}</title>
      </Head>

      {/* Main content section */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        {/* Page heading */}
        <h2 className={utilStyles.headingLg}>All Recipes</h2>

        {/* List of recipes */}
        <ul className={utilStyles.list}>
          {allRecipesData.map((recipe) => (
            <li className={utilStyles.listItem} key={recipe.ID}>
              {/* Link to the individual recipe page */}
              <Link href={`/recipes/${recipe.ID}`}>
                {recipe.recipe_name}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

