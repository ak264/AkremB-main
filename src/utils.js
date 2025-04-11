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
