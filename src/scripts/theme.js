// This script runs immediately when loading any page to set the correct theme
function applyTheme() {
  // Check if user has previously manually set a theme preference
  const storedTheme = localStorage.getItem('theme');
  // Check if user has a system preference
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  // Check if this is first visit (no stored theme)
  const isFirstVisit = storedTheme === null;
  
  // On first visit, use system preference
  // On subsequent visits, respect manual choice if available
  const theme = isFirstVisit 
    ? (systemPrefersDark ? 'dark' : 'light')
    : storedTheme;
  
  // Store the theme (even if it's system preference on first visit)
  if (isFirstVisit) {
    localStorage.setItem('theme', theme);
  }
  
  // Apply the theme
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Apply theme immediately
applyTheme();

// Listen for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  // Only automatically update if user hasn't manually set a preference
  const userHasManualPreference = localStorage.getItem('userHasManualPreference') === 'true';
  if (!userHasManualPreference) {
    const newTheme = event.matches ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme();
  }
});

// Also listen for storage changes (in case theme is changed in another tab)
window.addEventListener('storage', (event) => {
  if (event.key === 'theme') {
    applyTheme();
  }
});
