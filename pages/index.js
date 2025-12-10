// Import the Head component from Next.js to modify the <head> of the HTML page (for titles, meta tags, etc.)
import Head from 'next/head';

// Import the Layout component and the siteTitle variable from the components folder
// Layout wraps pages in a consistent layout (header, footer, etc.)
// siteTitle can be used for setting the page title
import Layout, { siteTitle } from '../components/layout';

// Import utility CSS styles from a CSS module
// utilStyles contains classes like headingMd and padding1px that are scoped to this component
import utilStyles from '../styles/utils.module.css';

// Import the Link component from Next.js for client-side navigation between pages
import Link from 'next/link';

// Import the function getSortedRecipesData from lib/posts
// This function fetches all recipes and sorts them alphabetically
import { getSortedRecipesData } from '../lib/posts';
 
// This function runs at build time (SSG) and fetches the recipe data for the page
export async function getStaticProps() {
  // Call getSortedRecipesData to get an array of all recipes
  const allRecipesData = await getSortedRecipesData();
  
  // Return the recipe data as props to the Home component
  return {
    props: {
      allRecipesData, // This will be passed to the Home component as a prop
    },
  };
}

// Default export: the main Home component that renders the homepage
// It receives allRecipesData as a prop from getStaticProps
export default function Home({ allRecipesData }) {
  return (
    // Wrap the page in the Layout component
    // The "home" prop may trigger a different layout or styling for the homepage
    <Layout home>
 
      {/* A section of the page with some spacing and medium-sized heading styles */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        
        {/* Page heading */}
        <h2 className={utilStyles.headingLg}>Some of my Favorite Recipes.</h2>
        
        {/* Unordered list of recipes */}
        <ul className={utilStyles.list}>
          {/* Loop over each recipe in allRecipesData */}
          {allRecipesData.map((recipe) => (
            // Each list item must have a unique key (ID) for React
            <li className={utilStyles.listItem} key={recipe.ID}>
              
              {/* Link to the dynamic recipe page using Next.js Link */}
              <Link href={`/recipes/${recipe.ID}`}>{recipe.recipe_name}</Link>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
