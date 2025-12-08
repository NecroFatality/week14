// Import the Layout component to wrap the page in a consistent layout (header, footer, etc.)
import Layout from '../../components/layout';

// Import helper functions from lib/posts
// getAllPostIds() returns an array of all post IDs (used for dynamic paths)
// getPostData() fetches the content of a specific post based on its ID
import { getAllPostIds, getPostData } from '../../lib/posts';

// Import Head component from Next.js to modify the <head> of the HTML page (for titles, meta tags, etc.)
import Head from 'next/head';

// Import utility CSS module for scoped styles
import utilStyles from '../../styles/utils.module.css';

// Import Date component to format and display dates consistently
import Date from '../../components/date';

// ------------------------------------------------------------
// This function runs at build time for static generation
// It fetches the data for a single post based on its ID
export async function getStaticProps({ params }) {
  // Fetch the post data for the given ID (params.id comes from the URL)
  const postData = await getPostData(params.id);

  // Return the post data as props to the component
  return {
    props: {
      postData, // Will be passed to the Post component
    },
  };
}

// ------------------------------------------------------------
// This function runs at build time to tell Next.js which dynamic routes to pre-render
export async function getStaticPaths() {
  // Get an array of all post IDs
  const paths = await getAllPostIds();

  // Return an object with all paths and fallback behavior
  return {
    paths,          // Array of paths like [{ params: { id: 'ssg-ssr' } }, ...]
    fallback: false // false means any path not returned here will 404
  };
}

// ------------------------------------------------------------
// Default export: the Post component that renders a single blog/recipe post
export default function Post({ postData }) {
  return (
    // Wrap the page in Layout for consistent header/footer
    <Layout>
      
      {/* Modify the HTML <head> to set the page title dynamically */}
      <Head>
        <title>{postData.title}</title>
      </Head>
      
      {/* Main content of the post */}
      <article>
        
        {/* Post title with extra-large heading style */}
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        
        {/* Post date in lighter, smaller text */}
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        
        {/* Post content rendered as HTML */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
