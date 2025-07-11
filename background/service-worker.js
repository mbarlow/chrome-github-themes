// Background service worker for Chrome GitHub Themes extension
// Handles extension initialization and messaging

// Extension installation/update handler
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Set default theme on first install
    chrome.storage.sync.set({
      selectedTheme: 'gruvbox-dark'
    });
  }
});

// Handle messages from content scripts and popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getTheme') {
    // Get current theme from storage
    chrome.storage.sync.get(['selectedTheme'], (result) => {
      sendResponse({ theme: result.selectedTheme || 'gruvbox-dark' });
    });
    return true; // Required for async response
  }

  if (request.action === 'setTheme') {
    // Save new theme selection
    chrome.storage.sync.set({
      selectedTheme: request.theme
    }, () => {
      sendResponse({ success: true });
    });
    return true; // Required for async response
  }
});

// Handle storage changes to notify active tabs
chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.selectedTheme) {
    // Notify all GitHub tabs about theme change
    chrome.tabs.query({ url: 'https://github.com/*' }, (tabs) => {
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
          action: 'themeChanged',
          theme: changes.selectedTheme.newValue
        }).catch(() => {
          // Ignore errors for inactive tabs
        });
      });
    });
  }
});
