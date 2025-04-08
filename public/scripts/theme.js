// This script runs immediately when loading any page to set the correct theme
function applyTheme() {
  const theme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}

// Apply theme immediately
applyTheme();

// Also listen for storage changes (in case theme is changed in another tab)
window.addEventListener('storage', (event) => {
  if (event.key === 'theme') {
    applyTheme();
  }
});
