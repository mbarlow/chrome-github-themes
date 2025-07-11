// Content script for Chrome GitHub Themes extension
// Handles theme CSS injection and switching on GitHub pages

let currentThemeLink = null;

// Initialize theme injection
function initTheme() {
  // Get saved theme from storage
  chrome.storage.sync.get(['selectedTheme'], (result) => {
    const theme = result.selectedTheme || 'gruvbox-dark';
    injectTheme(theme);
  });
}

// Inject theme CSS into the page
function injectTheme(themeName) {
  // Remove existing theme link if present
  if (currentThemeLink) {
    currentThemeLink.remove();
    currentThemeLink = null;
  }

  // Don't inject if theme is 'default' (GitHub's original theme)
  if (themeName === 'default') {
    return;
  }

  // Create new link element for theme CSS
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.type = 'text/css';
  link.href = chrome.runtime.getURL(`themes/${themeName}.css`);
  link.id = 'github-theme-css';

  // Add to document head
  const head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(link);

  currentThemeLink = link;
}

// Listen for theme change messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'themeChanged') {
    injectTheme(request.theme);
    sendResponse({ success: true });
  }
});

// Listen for storage changes (alternative method)
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.selectedTheme) {
    injectTheme(changes.selectedTheme.newValue);
  }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTheme);
} else {
  initTheme();
}

// Re-apply theme when navigating within GitHub (SPA behavior)
let lastUrl = location.href;
new MutationObserver(() => {
  const url = location.href;
  if (url !== lastUrl) {
    lastUrl = url;
    // Small delay to let GitHub render the page
    setTimeout(initTheme, 100);
  }
}).observe(document, { subtree: true, childList: true });
