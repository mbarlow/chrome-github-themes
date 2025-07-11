# Installation & Testing Guide

This guide will help you install and test the Chrome GitHub Themes extension, whether you're a user wanting to install it or a developer wanting to contribute.

## 🚀 For Users

### Install from Chrome Web Store (Coming Soon)

1. Visit the Chrome Web Store
2. Search for "Chrome GitHub Themes"
3. Click "Add to Chrome"
4. Navigate to GitHub and start theming!

### Manual Installation (Current Method)

1. **Download the Extension**
   ```bash
   git clone https://github.com/yourusername/chrome-github-themes.git
   cd chrome-github-themes
   ```

2. **Prepare Icons** (Optional)
   ```bash
   # Generate SVG icons
   node generate-icons.js
   
   # Convert to PNG (requires ImageMagick, Inkscape, or rsvg-convert)
   ./convert-icons.sh
   ```

3. **Load in Chrome**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top-right)
   - Click "Load unpacked"
   - Select the `chrome-github-themes` folder
   - Extension should appear in your toolbar

4. **Start Using**
   - Visit any GitHub page (e.g., `https://github.com`)
   - Click the extension icon in your toolbar
   - Select a theme from the popup
   - Enjoy your new GitHub experience!

## 🛠️ For Developers

### Development Setup

1. **Prerequisites**
   ```bash
   # Check versions
   node --version  # Should be 16+
   npm --version   # Should be 8+
   google-chrome --version  # Latest stable
   ```

2. **Clone and Setup**
   ```bash
   git clone https://github.com/yourusername/chrome-github-themes.git
   cd chrome-github-themes
   npm install
   ```

3. **Generate Assets**
   ```bash
   # Generate extension icons
   npm run generate-icons
   
   # Convert SVG to PNG (optional but recommended)
   ./convert-icons.sh
   ```

4. **Load Extension**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the project root directory

### Development Workflow

1. **Make Changes**
   - Edit CSS files in `themes/`
   - Modify popup in `popup/`
   - Update content scripts in `content/`

2. **Test Changes**
   - Go to `chrome://extensions/`
   - Click the refresh icon on the extension
   - Test on GitHub pages

3. **Debug Issues**
   - Right-click extension icon → "Inspect popup"
   - Open DevTools on GitHub pages
   - Check Console for errors

## 🧪 Testing Checklist

### Basic Functionality

- [ ] Extension loads without errors
- [ ] Icon appears in Chrome toolbar
- [ ] Popup opens when clicking icon
- [ ] All themes are visible in popup
- [ ] Theme selection works instantly
- [ ] Settings persist after browser restart

### Theme Testing

Test each theme on these GitHub pages:

- [ ] **Repository Home** (`github.com/user/repo`)
  - [ ] File tree displays correctly
  - [ ] README renders properly
  - [ ] Repository stats visible

- [ ] **Code Files** (`github.com/user/repo/blob/main/file.js`)
  - [ ] Syntax highlighting works
  - [ ] Line numbers visible
  - [ ] Code is readable

- [ ] **Pull Requests** (`github.com/user/repo/pull/123`)
  - [ ] Diff view works
  - [ ] Comments display correctly
  - [ ] Status checks visible

- [ ] **Issues** (`github.com/user/repo/issues/123`)
  - [ ] Issue content readable
  - [ ] Labels display correctly
  - [ ] Timeline events visible

- [ ] **Actions** (`github.com/user/repo/actions`)
  - [ ] Workflow runs visible
  - [ ] Logs are readable
  - [ ] Status indicators work

- [ ] **Settings** (`github.com/settings`)
  - [ ] Form controls styled
  - [ ] Navigation works
  - [ ] Text is readable

### Cross-Browser Testing

- [ ] **Chrome** (Latest stable)
- [ ] **Edge** (Latest stable)
- [ ] **Brave** (Latest stable)
- [ ] **Opera** (If using Chromium)

### Performance Testing

- [ ] **Theme Application Speed**
  - Themes should apply in <10ms
  - No visible delay when switching

- [ ] **Memory Usage**
  - Extension should use <10MB RAM
  - No memory leaks after extended use

- [ ] **Network Impact**
  - No external network requests
  - All resources loaded locally

## 🐛 Troubleshooting

### Common Issues

**Extension not loading:**
```bash
# Check for errors in extension management page
# Look for manifest.json syntax errors
# Verify all required files exist
```

**Themes not applying:**
```bash
# Check browser console for CSS errors
# Verify GitHub pages are detected
# Try refreshing the GitHub page
```

**Popup not opening:**
```bash
# Check for JavaScript errors
# Verify popup.html loads correctly
# Try reloading the extension
```

**Icons not displaying:**
```bash
# Generate PNG versions of icons
./convert-icons.sh

# Or use online converter for SVG files
# Place PNG files in assets/icons/
```

### Debug Commands

**View Extension Logs:**
```bash
# Open chrome://extensions/
# Click "Details" on the extension
# Click "Inspect views: background page"
```

**Debug Popup:**
```bash
# Right-click extension icon
# Select "Inspect popup"
# View console for errors
```

**Debug Content Scripts:**
```bash
# Open GitHub page
# Press F12 to open DevTools
# Look for extension-related errors
```

### Performance Debugging

**Check CSS Application:**
```javascript
// In browser console on GitHub page
console.time('theme-check');
document.querySelector('#github-theme-css');
console.timeEnd('theme-check');
```

**Monitor Memory Usage:**
```bash
# Open chrome://extensions/
# Click "Details" on extension
# View memory usage in task manager
```

## 📝 File Structure Reference

```
chrome-github-themes/
├── manifest.json              # Extension configuration
├── background/
│   └── service-worker.js     # Background processes
├── content/
│   └── theme-injector.js     # Theme application logic
├── popup/
│   ├── popup.html           # Theme selection UI
│   ├── popup.css            # Popup styling
│   └── popup.js             # Popup functionality
├── themes/
│   ├── base.css             # Common GitHub overrides
│   ├── gruvbox-dark.css     # Individual theme files
│   ├── molokai.css
│   ├── catppuccin-mocha.css
│   ├── solarized-dark.css
│   └── nord.css
├── assets/
│   └── icons/               # Extension icons (SVG/PNG)
└── docs/
    └── README.md            # Detailed documentation
```

## 🚀 Distribution

### Building for Distribution

```bash
# Clean build
npm run clean

# Create distribution package
npm run build

# Package for Chrome Web Store
npm run package
```

### Chrome Web Store Submission

1. **Prepare Assets**
   - Extension ZIP file
   - Store listing images
   - Detailed description
   - Privacy policy

2. **Submit for Review**
   - Upload to Chrome Web Store Developer Dashboard
   - Fill in store listing details
   - Submit for review

3. **Publication**
   - Review process takes 1-3 days
   - Address any feedback
   - Extension goes live after approval

## 💡 Tips for Success

### Development Tips

- **Use Live Reload**: Refresh extension after each change
- **Test Early**: Verify themes on multiple GitHub pages
- **Keep It Simple**: Avoid complex CSS selectors
- **Performance First**: Optimize for speed and memory

### Testing Tips

- **Multiple Accounts**: Test with different GitHub account types
- **Various Repositories**: Test on public, private, and enterprise repos
- **Different Themes**: Ensure all themes work consistently
- **Edge Cases**: Test on complex pages with lots of content

### Debugging Tips

- **Browser DevTools**: Essential for CSS debugging
- **Extension DevTools**: Check background script logs
- **Console Logging**: Add strategic console.log statements
- **Network Tab**: Verify no external requests

## 🆘 Getting Help

If you encounter issues:

1. **Check Documentation**: Review this guide and docs/README.md
2. **Search Issues**: Look for similar problems on GitHub
3. **Create Issue**: Report bugs with detailed reproduction steps
4. **Join Discussions**: Ask questions in GitHub Discussions

---

**Happy theming! 🎨**