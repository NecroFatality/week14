// Import the Head component from Next.js to modify the <head> of the HTML page (for titles, meta tags, etc.)
import Head from 'next/head';

// Import the Date component from the components folder to format and display dates
import Date from '../components/date';

// Import the Layout component and the siteTitle variable from the components folder
// Layout wraps pages in a consistent layout (header, footer, etc.)
// siteTitle can be used for setting the page title
import Layout, { siteTitle } from '../components/layout';

// Import utility CSS styles from a CSS module
// utilStyles contains classes like headingMd and padding1px that are scoped to this component
import utilStyles from '../styles/utils.module.css';

// Import the Link component from Next.js for client-side navigation between pages
import Link from 'next/link';

// Import the function getSortedPostsData from lib/posts
// This function fetches all blog/recipe posts and sorts them by date or some other criteria
import { getSortedPostsData } from '../lib/posts';
 
// This function runs at build time (SSG) and fetches the post data for the page
export async function getStaticProps() {
  // Call getSortedPostsData to get an array of all posts
  const allPostsData = await getSortedPostsData();
  
  // Return the post data as props to the Home component
  return {
    props: {
      allPostsData, // This will be passed to the Home component as a prop
    },
  };
}

// Default export: the main Home component that renders the homepage
// It receives allPostsData as a prop from getStaticProps
export default function Home({ allPostsData }) {
  return (
    // Wrap the page in the Layout component
    // The "home" prop may trigger a different layout or styling for the homepage
    <Layout home>
 
      {/* A section of the page with some spacing and medium-sized heading styles */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        
        {/* Page heading */}
        <h2 className={utilStyles.headingLg}>Some of my Favorite Recipes.</h2>
        
        {/* Unordered list of posts */}
        <ul className={utilStyles.list}>
          {/* Loop over each post in allPostsData */}
          {allPostsData.map(({ id, date, title }) => (
            // Each list item must have a unique key (id) for React
            <li className={utilStyles.listItem} key={id}>
              
              {/* Link to the dynamic post page using Next.js Link */}
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              
              {/* Display the post date in smaller, lighter text */}
              <small className={utilStyles.lightText}>
                {/* Use the Date component to format the date */}
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
