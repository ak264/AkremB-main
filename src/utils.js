/**
 * Format a date into a readable string
 * @param {Date} date The date to format
 * @returns {string} The formatted date string
 */
export function formatDate(date) {
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Convert a string to a URL-friendly slug
 * @param {string} text The text to slugify
 * @returns {string} The slugified text
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Safely convert a date to ISO string, handling invalid dates
 * @param {Date|string} date The date to convert
 * @returns {string} ISO string or fallback string
 */
export function safeISOString(date) {
  try {
    // Make sure it's a Date object
    const dateObj = date instanceof Date ? date : new Date(date);
    
    // Verify it's a valid date
    if (isNaN(dateObj.getTime())) {
      return new Date().toISOString(); // Fallback to current date
    }
    
    return dateObj.toISOString();
  } catch (error) {
    console.error("Error converting date to ISO string:", error);
    return new Date().toISOString(); // Fallback to current date
  }
}

/**
 * Fetch repository details from GitHub
 * @param {string} repoPath Repository path in the format 'username/repo'
 * @returns {Promise<object>} Repository details
 */
export async function getRepositoryDetails(repoPath) {
  try {
    // Use fetch API to get repository information from GitHub
    const [owner, repo] = repoPath.split('/');
    const response = await fetch(`https://api.github.com/repos/${repoPath}`);
    
    if (!response.ok) {
      console.error(`Error fetching repo ${repoPath}: ${response.statusText}`);
      return { description: '', gitHubLink: `https://github.com/${repoPath}` };
    }
    
    const data = await response.json();
    
    return {
      description: data.description || '',
      gitHubLink: data.html_url,
      stars: data.stargazers_count,
      forks: data.forks_count,
      lastUpdate: data.updated_at
    };
  } catch (error) {
    console.error(`Error fetching repository details for ${repoPath}:`, error);
    // Return basic information even if the fetch fails
    return { 
      description: '', 
      gitHubLink: `https://github.com/${repoPath}`
    };
  }
}

/**
 * Filter out draft content in production
 * @param {Array} posts Array of blog posts
 * @returns {Array} Filtered array of posts
 */
export function filterDraftContent(posts) {
  const isProduction = import.meta.env.PROD;
  
  return posts.filter(post => {
    // In production, filter out drafts
    if (isProduction && post.data.draft) {
      return false;
    }
    return true;
  });
}