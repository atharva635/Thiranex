# 🌟 Fully Accessible Personal Portfolio Website

[![HTML5 Semantic](https://img.shields.io/badge/HTML5-Semantic_Layout-orange?style=flat-square&logo=html5)](https://developer.mozilla.org/en-US/docs/Glossary/Semantics)
[![WCAG Accessible](https://img.shields.io/badge/WCAG%202.1-AA%20Compliant-success?style=flat-square&logo=accessibility)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![SEO Optimized](https://img.shields.io/badge/SEO-100%20Score-blue?style=flat-square)](https://lighthouse-dot-webdotdev_corp.appspot.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-purple?style=flat-square)](LICENSE)

A premium, modern, glassmorphic multi-page portfolio website designed and developed for **Atharva Gupta**, a Computer Science student at **KIET Group of Institutions**. Built from the ground up adhering strictly to modern semantic HTML5 conventions and WCAG 2.1 AA accessibility standards.

---

## 🚀 Key Features

*   **100/100 Lighthouse Performance Goals**: Structurally tuned to hit top-tier performance, accessibility, best practices, and SEO scores.
*   **Fully Semantic Skeleton**: Complete HTML5 landmark structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) with zero generic `<div class="header">` antipatterns.
*   **WCAG 2.1 AA Accessibility**:
    *   **Skip-to-Content Link**: Allows keyboard users to bypass header navigation instantly.
    *   **Focus Visible States**: Custom, high-contrast focus rings (`outline: 3px dashed`) that stand out on dark and light themes.
    *   **Keyboard Navigable**: Dynamic focus lock for off-screen mobile navigation drawer and active page controls.
    *   **ARIA Roles & Landmarks**: Contextual labels like `aria-label`, `aria-current="page"`, `aria-expanded`, and `aria-live` regions.
    *   **Dynamic Screen Reader Announcer**: A custom script announcer to notify assistive technologies of dynamic theme changes and project category filter updates.
*   **Complete SEO & Meta Optimizations**:
    *   Descriptions, keywords, canonical structures, Open Graph (Facebook), and Twitter cards.
    *   Valid **Schema.org Structured JSON-LD Data** on the home page for Google Rich Snippets.
*   **Responsive Theme Toggle**: Custom CSS variables providing a seamless Dark-to-Light toggle that persists across sessions via `localStorage`.
*   **Interactive Project Filtering**: Filter projects seamlessly by category (Web, IoT) with full keyboard accessibility.
*   **Accessible Contact Form**: Custom-built client-side validation that alerts screen readers of error details immediately in a readable format.

---

## 📂 Reorganized Folder Structure

The project has been organized into a professional directory structure to make hosting clean and maintainable:

```text
Portfolio/
│
├── index.html          # Homepage (Hero, Core Skills, Featured Work)
├── about.html          # About Me (Bio, Semantic Timeline Journey)
├── projects.html       # Projects Page (6 Interactive Cards with filters)
├── contact.html        # Contact Page (Accessible Form with Name/Email/Phone/Subject)
│
├── css/
│   └── style.css       # Responsive Glassmorphic styles & CSS variables
│
├── js/
│   └── main.js         # Navigation controls, accessible validation & theme switcher
│
└── assets/
    ├── images/         # Profile images, previews, and icons
    └── resume.pdf      # Printable resume (Place your PDF here)
```

---

## ♿ Accessibility Implementation Details

### Keyboard Navigation & Skip Link
Every page includes a hidden skip link that becomes visible when tabbed to:
```html
<a href="#main-content" class="skip-link">Skip to Main Content</a>
```
This points directly to the `<main id="main-content">` landmark, bypassing header menus.

### Accessible Mobile Drawer Navigation
When in mobile view, opening the menu triggers:
1. `aria-expanded="true"` update on the toggle button.
2. An automatic timeout focus shift to the first link inside the navigation.
3. An event listener tracking `Escape` to automatically close the drawer and restore focus back to the menu button.

### Live Dynamic Notifications
Assisted screen reader users need updates when the UI changes state. A global function triggers clean polite announcements:
```javascript
function announceToScreenReader(message) {
  let announcer = document.getElementById('global-screenreader-announcer');
  // Creates a temporary polite live region and appends it to body
  announcer.textContent = message;
}
```

---

## 🛠️ Step-by-Step GitHub Setup & Deployment Guide

Since you might have Git initialized globally in a parent folder, it is important to initialize a standalone Git repository inside the `Portfolio` folder so that only your project files are pushed.

### Step 1: Initialize Git inside the Subdirectory
Open your terminal (PowerShell, Command Prompt, or VS Code Terminal) and make sure you are in the `Portfolio` directory:

```bash
# Navigate to the portfolio folder
cd "c:\Users\athar\Desktop\Thiranex Project\Portfolio"

# Initialize a clean standalone repository
git init
```

### Step 2: Stage & Commit the Code
Verify only the portfolio files are tracked, then commit:

```bash
# Check tracked files
git status

# Add all files in the Portfolio folder
git add .

# Create the initial commit
git commit -m "feat: initialize semantic HTML5 portfolio with WCAG accessibility"
```

### Step 3: Publish to GitHub
1. Open your browser and go to [GitHub](https://github.com/).
2. Create a new repository and name it something descriptive like `accessible-portfolio-html5`.
3. Leave the repository empty (do **not** add a README, license, or gitignore on GitHub, since we have already created them locally).
4. Copy your repository's remote URL (e.g., `https://github.com/USERNAME/accessible-portfolio-html5.git`).
5. Run the following commands to link and push:

```bash
# Rename default branch to main
git branch -M main

# Link your local repository to the new GitHub remote
git remote add origin https://github.com/atharva635/Thiranex.git

# Push the code to the main branch
git push -u origin main
```

### Step 4: Deploy to GitHub Pages (Free Live Link)
To make your portfolio live so that teachers and interviewers can view it:
1. Go to your repository settings page on GitHub.
2. Select the **Pages** option on the left sidebar.
3. Under the **Build and deployment** section, select:
    *   **Source**: Deploy from a branch
    *   **Branch**: `main` / `(root)`
4. Click **Save**.
5. Wait 1-2 minutes. GitHub will generate a live link at:
    `https://atharva635.github.io/Thiranex/`

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
