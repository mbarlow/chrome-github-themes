# Contributing to Chrome GitHub Themes

Thank you for your interest in contributing to Chrome GitHub Themes! This guide will help you get started with development and explain our contribution process.

## 🚀 Getting Started

### Prerequisites

- **Node.js 16+**: For development tools
- **Chrome Browser**: Latest stable version
- **Git**: For version control
- **Text Editor**: VS Code recommended with extensions:
  - ESLint
  - Prettier
  - CSS/SCSS IntelliSense

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/yourusername/chrome-github-themes.git
   cd chrome-github-themes
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Generate Icons**
   ```bash
   npm run generate-icons
   ```

4. **Load Extension in Chrome**
   - Open `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked"
   - Select the project directory

5. **Test on GitHub**
   - Navigate to any GitHub page
   - Click the extension icon
   - Verify themes work correctly

## 🎨 Adding New Themes

### Theme Development Process

1. **Research the Theme**
   - Find official color specifications
   - Identify key colors (background, text, accent, etc.)
   - Test in your IDE to understand the feel

2. **Create Theme CSS**
   ```bash
   # Create new theme file
   touch themes/my-theme.css
   ```

3. **Theme Structure**
   ```css
   /* themes/my-theme.css */
   @import url('base.css');

   :root {
     /* Primary colors */
     --gh-bg-primary: #background-color;
     --gh-bg-secondary: #secondary-bg;
     --gh-bg-tertiary: #tertiary-bg;

     /* Text colors */
     --gh-fg-primary: #text-color;
     --gh-fg-secondary: #secondary-text;
     --gh-fg-tertiary: #tertiary-text;

     /* Border colors */
     --gh-border: #border-color;
     --gh-border-muted: #muted-border;

     /* Accent colors */
     --gh-accent: #accent-color;
     --gh-accent-rgb: r, g, b; /* RGB values for transparency */

     /* Status colors */
     --gh-error: #error-color;
     --gh-success: #success-color;
     --gh-warning: #warning-color;
   }

   /* Optional: Theme-specific overrides */
   .pl-c { color: #comment-color !important; }
   .pl-k { color: #keyword-color !important; }
   /* ... more syntax highlighting */
   ```

4. **Add to Popup Interface**
   
   **Update popup.html:**
   ```html
   <!-- Add new theme card -->
   <div class="theme-card" data-theme="my-theme">
     <div class="theme-preview my-theme-preview">
       <div class="preview-header"></div>
       <div class="preview-content">
         <div class="preview-line"></div>
         <div class="preview-line short"></div>
         <div class="preview-line"></div>
       </div>
     </div>
     <div class="theme-info">
       <h3 class="theme-name">My Theme</h3>
       <p class="theme-description">Theme description</p>
     </div>
   </div>
   ```

   **Update popup.css:**
   ```css
   /* Add theme preview styles */
   .my-theme-preview {
     background-color: #background-color;
   }

   .my-theme-preview .preview-header {
     background-color: #header-bg;
   }

   .my-theme-preview .preview-line {
     background-color: #text-color;
   }

   .my-theme-preview .preview-line:nth-child(2) {
     background-color: #accent-color;
   }
   ```

   **Update popup.js:**
   ```javascript
   // Add to THEMES object
   const THEMES = {
     // ... existing themes
     'my-theme': {
       name: 'My Theme',
       description: 'Theme description'
     }
   };
   ```

5. **Test Thoroughly**
   - Repository pages
   - Pull requests
   - Issues
   - Code files
   - Settings pages
   - Search results

### Theme Quality Guidelines

- **Contrast**: Ensure good readability (WCAG AA compliance)
- **Consistency**: Colors should feel cohesive
- **GitHub Coverage**: Test on all major GitHub features
- **Performance**: Keep CSS efficient, avoid complex selectors
- **Authenticity**: Match original theme colors accurately

## 🐛 Bug Fixes

### Bug Report Process

1. **Search Existing Issues**: Check if already reported
2. **Reproduce**: Confirm the bug exists
3. **Document**: Clear steps to reproduce
4. **Fix**: Create targeted solution
5. **Test**: Verify fix works without breaking other features

### Common Bug Categories

- **CSS Conflicts**: GitHub updates breaking themes
- **Browser Compatibility**: Different behavior across browsers
- **Performance Issues**: Slow theme application
- **Storage Problems**: Settings not persisting

## 📝 Code Standards

### JavaScript Style

```javascript
// Use modern ES6+ features
const themeManager = new ThemeManager();

// Async/await for promises
async function loadTheme() {
  try {
    const theme = await getStoredTheme();
    return theme;
  } catch (error) {
    console.error('Failed to load theme:', error);
  }
}

// Clear error handling
chrome.storage.sync.get(['theme'], (result) => {
  if (chrome.runtime.lastError) {
    console.error(chrome.runtime.lastError);
    return;
  }
  // Handle result
});
```

### CSS Style

```css
/* Use CSS custom properties */
:root {
  --primary-color: #value;
}

/* Important for overriding GitHub styles */
.selector {
  property: var(--custom-property) !important;
}

/* Group related selectors */
.header,
.header-old {
  background: var(--bg-color) !important;
}
```

### Documentation

- **Comments**: Explain complex logic
- **JSDoc**: For function documentation
- **README**: Keep updated with changes
- **Commit Messages**: Clear and descriptive

## 🧪 Testing

### Manual Testing Checklist

- [ ] Extension loads without errors
- [ ] All themes apply correctly
- [ ] Theme switching works instantly
- [ ] Settings persist across sessions
- [ ] Works on all GitHub page types:
  - [ ] Repository home
  - [ ] File browser
  - [ ] Code files
  - [ ] Pull requests
  - [ ] Issues
  - [ ] Actions
  - [ ] Settings
  - [ ] Profile pages

### Browser Testing

- [ ] Chrome (latest)
- [ ] Edge (latest)
- [ ] Brave
- [ ] Opera (if applicable)

### Performance Testing

- [ ] Theme application speed (<10ms)
- [ ] Memory usage reasonable (<10MB)
- [ ] No console errors
- [ ] No network requests

## 🔄 Pull Request Process

### Before Submitting

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/theme-name
   git checkout -b fix/bug-description
   ```

2. **Make Changes**
   - Follow code standards
   - Test thoroughly
   - Update documentation

3. **Commit Changes**
   ```bash
   git add .
   git commit -m "Add: New theme support for ThemeName"
   git push origin feature/theme-name
   ```

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New theme
- [ ] Feature enhancement
- [ ] Documentation update

## Testing
- [ ] Tested on multiple GitHub pages
- [ ] Verified theme switching works
- [ ] No console errors
- [ ] Settings persist correctly

## Screenshots
[Add screenshots if applicable]

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No breaking changes
```

### Review Process

1. **Automated Checks**: Linting, formatting
2. **Manual Review**: Code quality, functionality
3. **Testing**: Reviewer tests changes
4. **Approval**: Merge when ready

## 📦 Release Process

### Version Numbering

- **Major** (1.0.0): Breaking changes
- **Minor** (0.1.0): New features
- **Patch** (0.0.1): Bug fixes

### Release Checklist

- [ ] Update version in `manifest.json`
- [ ] Update `package.json` version
- [ ] Create changelog entry
- [ ] Test all functionality
- [ ] Create release build
- [ ] Submit to Chrome Web Store

## 🤝 Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Focus on constructive feedback
- Help newcomers learn
- Credit theme creators appropriately

### Communication

- **Issues**: For bug reports and feature requests
- **Discussions**: For questions and ideas
- **Pull Requests**: For code contributions
- **Email**: For private matters

### Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Extension credits

## 📚 Resources

### Development Resources

- [Chrome Extension Documentation](https://developer.chrome.com/docs/extensions/)
- [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [GitHub CSS Selectors](https://primer.style/)

### Design Resources

- [Color Palette Generators](https://coolors.co/)
- [Contrast Checkers](https://webaim.org/resources/contrastchecker/)
- [Theme Inspiration](https://github.com/topics/color-scheme)

### Testing Tools

- [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools)
- [Extension Reload](https://chrome.google.com/webstore/detail/extensions-reloader/fimgfedafeadlieiabdeeaodndnlbhid)

## 🆘 Getting Help

- **Stuck on development?** Create a discussion
- **Found a bug?** Open an issue
- **Need clarification?** Comment on existing issues
- **Want to chat?** Check our community channels

---

Thank you for contributing to Chrome GitHub Themes! Every contribution makes the extension better for developers worldwide. 🎉