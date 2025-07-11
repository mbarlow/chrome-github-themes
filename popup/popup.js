// Popup JavaScript for Chrome GitHub Themes Extension
// Handles theme selection, storage, and UI interactions

class ThemeManager {
  constructor() {
    this.currentTheme = 'gruvbox-dark';
    this.statusElement = document.getElementById('status');
    this.statusText = this.statusElement.querySelector('.status-text');
    this.themeGrid = document.getElementById('themeGrid');

    this.init();
  }

  async init() {
    try {
      // Load current theme from storage
      await this.loadCurrentTheme();

      // Set up event listeners
      this.setupEventListeners();

      // Update UI to reflect current theme
      this.updateUI();

      this.setStatus('Ready', 'default');
    } catch (error) {
      console.error('Failed to initialize theme manager:', error);
      this.setStatus('Failed to load', 'error');
    }
  }

  async loadCurrentTheme() {
    return new Promise((resolve) => {
      chrome.storage.sync.get(['selectedTheme'], (result) => {
        this.currentTheme = result.selectedTheme || 'gruvbox-dark';
        resolve();
      });
    });
  }

  setupEventListeners() {
    // Add click listeners to theme cards
    const themeCards = this.themeGrid.querySelectorAll('.theme-card');
    themeCards.forEach(card => {
      card.addEventListener('click', (e) => {
        const theme = card.dataset.theme;
        this.selectTheme(theme);
      });

      // Add keyboard navigation
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const theme = card.dataset.theme;
          this.selectTheme(theme);
        }
      });

      // Make cards focusable
      card.setAttribute('tabindex', '0');
    });

    // Add keyboard navigation between cards
    this.setupKeyboardNavigation();
  }

  setupKeyboardNavigation() {
    const themeCards = Array.from(this.themeGrid.querySelectorAll('.theme-card'));

    themeCards.forEach((card, index) => {
      card.addEventListener('keydown', (e) => {
        let newIndex = index;

        switch (e.key) {
          case 'ArrowRight':
            newIndex = (index + 1) % themeCards.length;
            break;
          case 'ArrowLeft':
            newIndex = (index - 1 + themeCards.length) % themeCards.length;
            break;
          case 'ArrowDown':
            newIndex = Math.min(index + 2, themeCards.length - 1);
            break;
          case 'ArrowUp':
            newIndex = Math.max(index - 2, 0);
            break;
          default:
            return;
        }

        if (newIndex !== index) {
          e.preventDefault();
          themeCards[newIndex].focus();
        }
      });
    });
  }

  async selectTheme(themeName) {
    if (themeName === this.currentTheme) {
      return; // Theme already selected
    }

    try {
      this.setStatus('Applying theme...', 'loading');

      // Save theme to storage
      await this.saveTheme(themeName);

      // Update current theme
      this.currentTheme = themeName;

      // Update UI
      this.updateUI();

      // Notify content scripts about theme change
      await this.notifyThemeChange(themeName);

      this.setStatus('Theme applied successfully', 'success');

      // Reset status after 2 seconds
      setTimeout(() => {
        this.setStatus('Ready', 'default');
      }, 2000);

    } catch (error) {
      console.error('Failed to apply theme:', error);
      this.setStatus('Failed to apply theme', 'error');

      // Reset status after 3 seconds
      setTimeout(() => {
        this.setStatus('Ready', 'default');
      }, 3000);
    }
  }

  async saveTheme(themeName) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set({ selectedTheme: themeName }, () => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else {
          resolve();
        }
      });
    });
  }

  async notifyThemeChange(themeName) {
    try {
      // Get all GitHub tabs
      const tabs = await this.getGitHubTabs();

      // Send message to each tab
      const promises = tabs.map(tab =>
        chrome.tabs.sendMessage(tab.id, {
          action: 'themeChanged',
          theme: themeName
        }).catch(() => {
          // Ignore errors for inactive tabs
        })
      );

      await Promise.all(promises);
    } catch (error) {
      console.error('Failed to notify tabs about theme change:', error);
    }
  }

  async getGitHubTabs() {
    return new Promise((resolve) => {
      chrome.tabs.query({ url: 'https://github.com/*' }, (tabs) => {
        resolve(tabs || []);
      });
    });
  }

  updateUI() {
    // Remove active class from all cards
    const themeCards = this.themeGrid.querySelectorAll('.theme-card');
    themeCards.forEach(card => {
      card.classList.remove('active');
    });

    // Add active class to current theme card
    const activeCard = this.themeGrid.querySelector(`[data-theme="${this.currentTheme}"]`);
    if (activeCard) {
      activeCard.classList.add('active');
    }
  }

  setStatus(message, type = 'default') {
    this.statusText.textContent = message;

    // Remove all status classes
    this.statusElement.className = 'status';

    // Add new status class
    if (type !== 'default') {
      this.statusElement.classList.add(type);
    }
  }
}

// Theme data for reference
const THEMES = {
  'default': {
    name: 'Default',
    description: "GitHub's original theme"
  },
  'gruvbox-dark': {
    name: 'Gruvbox Dark',
    description: 'Retro groove color scheme'
  },
  'molokai': {
    name: 'Molokai',
    description: 'Dark theme inspired by Monokai'
  },
  'catppuccin-mocha': {
    name: 'Catppuccin',
    description: 'Soothing pastel theme'
  },
  'solarized-dark': {
    name: 'Solarized Dark',
    description: 'Precision colors for machines'
  },
  'nord': {
    name: 'Nord',
    description: 'Arctic, north-bluish color palette'
  }
};

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});

// Handle extension messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getThemes') {
    sendResponse({ themes: THEMES });
  }
});

// Add error handling for unhandled promise rejections
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
});
