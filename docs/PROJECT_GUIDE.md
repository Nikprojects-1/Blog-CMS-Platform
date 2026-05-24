# Niks Blog CMS — Project Guide

**Complete guide: VS Code setup, running the project, and how everything works**

Version 1.0 | Niks Blog CMS

---

## Table of contents

1. [Introduction](#1-introduction)
2. [System requirements](#2-system-requirements)
3. [Installing Visual Studio Code](#3-installing-visual-studio-code)
4. [Opening the project in VS Code](#4-opening-the-project-in-vs-code)
5. [Running the project (3 methods)](#5-running-the-project-3-methods)
6. [Project folder structure](#6-project-folder-structure)
7. [How the application works](#7-how-the-application-works)
8. [User roles and dashboards](#8-user-roles-and-dashboards)
9. [Data and localStorage](#9-data-and-localstorage)
10. [Page-by-page walkthrough](#10-page-by-page-walkthrough)
11. [JavaScript modules explained](#11-javascript-modules-explained)
12. [Troubleshooting](#12-troubleshooting)
13. [Tips for development](#13-tips-for-development)

---

## 1. Introduction

**Niks Blog CMS** is a full-featured blogging platform that runs entirely in the browser. It includes:

- A public website for reading articles
- User accounts with a personal dashboard
- An administrator panel for managing all content and users

There is **no database server**. All data is stored in the browser using **localStorage**, which makes setup very simple — you only need a local web server and a modern browser.

---

## 2. System requirements

| Requirement | Details |
|-------------|---------|
| Operating system | Windows 10/11, macOS, or Linux |
| Browser | Chrome, Edge, or Firefox (latest) |
| Editor | Visual Studio Code (recommended) |
| Optional | Python 3.x or Node.js for alternative servers |
| Disk space | ~5 MB (excluding editor) |
| Internet | Required once for CDN fonts/icons (offline works after cache) |

---

## 3. Installing Visual Studio Code

### Step 1 — Download VS Code

1. Go to https://code.visualstudio.com/
2. Click **Download for Windows** (or your OS)
3. Run the installer and follow the wizard
4. Check **"Add to PATH"** during installation (recommended)

### Step 2 — Install Live Server extension

1. Open VS Code
2. Click the **Extensions** icon in the left sidebar (or press `Ctrl+Shift+X`)
3. Search for **Live Server**
4. Install **Live Server** by **Ritwick Dey**
5. You will see a **Go Live** button in the bottom-right status bar when ready

### Step 3 — Optional extensions

| Extension | Purpose |
|-----------|---------|
| HTML CSS Support | Autocomplete for CSS classes |
| Prettier | Auto-format code |
| ESLint | JavaScript error checking |

---

## 4. Opening the project in VS Code

1. Launch **Visual Studio Code**
2. Menu: **File → Open Folder**
3. Navigate to your project folder (e.g. `chat app`)
4. Click **Select Folder**
5. The Explorer panel (left) shows all project files

You should see folders: `auth`, `admin`, `user`, `css`, `js`, and files like `index.html`.

---

## 5. Running the project (3 methods)

### Method A — Live Server (recommended for VS Code)

1. In the Explorer, find **`index.html`** in the project root
2. **Right-click** on `index.html`
3. Select **"Open with Live Server"**
4. Your default browser opens automatically
5. URL will look like: `http://127.0.0.1:5500/index.html`

**To stop the server:** Click **Port: 5500** in the VS Code status bar.

### Method B — Python HTTP server

1. Open terminal in VS Code: **Terminal → New Terminal** (`Ctrl+`` `)
2. Run:

```bash
python -m http.server 8080
```

3. Open browser: **http://localhost:8080**

### Method C — Node.js serve

```bash
npx serve .
```

Open the URL printed in the terminal.

### Why not double-click HTML files?

Opening files as `file:///C:/...` causes problems:

- ES module imports may be blocked
- Some browser security rules differ
- Live Server provides proper `http://` URLs

**Always use a local server.**

---

## 6. Project folder structure

```
chat app/
│
├── index.html          → Homepage (entry point)
├── blog.html           → All articles + filters
├── post.html           → Single article (?id=1)
│
├── auth/
│   ├── login.html      → User login + admin login toggle
│   ├── register.html   → Create new account
│   └── forgot-password.html
│
├── user/
│   └── dashboard.html  → Logged-in user hub
│
├── admin/
│   └── dashboard.html  → Administrator panel
│
├── css/
│   ├── style.css       → Global styles, navbar, cards
│   └── dashboard.css   → Sidebar dashboard layout
│
├── js/
│   ├── state.js        → Core data & auth (MOST IMPORTANT)
│   ├── common.js       → Navbar, theme, toast, mobile menu
│   ├── app.js          → Homepage
│   ├── blog-listing.js → Explore page
│   ├── post.js         → Article page
│   ├── user-dashboard.js
│   └── admin.js
│
└── docs/
    ├── PROJECT_GUIDE.md
    └── Niks_Blog_CMS_Guide.pdf
```

---

## 7. How the application works

### High-level architecture

```
┌─────────────────────────────────────────────────────────┐
│                     BROWSER (Client)                     │
├─────────────────────────────────────────────────────────┤
│  HTML Pages          JavaScript Modules      CSS         │
│  index, blog, post   state.js (data)        style.css   │
│  auth, dashboards    app, post, admin...    dashboard   │
├─────────────────────────────────────────────────────────┤
│              localStorage / sessionStorage               │
│  • Posts, users, categories                              │
│  • Login session                                       │
│  • Reading history, bookmarks per user                 │
└─────────────────────────────────────────────────────────┘
```

### Request flow (reading an article)

1. User clicks article on `blog.html`
2. Browser navigates to `post.html?id=5`
3. `post.js` loads and imports `state.js`
4. `state.getPostById('5')` reads from localStorage
5. Markdown content is converted to HTML via **marked.js**
6. Code blocks are highlighted via **highlight.js**
7. View count increments (once per session)

### No backend

Unlike WordPress or Node apps, there is:

- No API server
- No MySQL/MongoDB
- No PHP

Everything runs in the browser. Data persists only on **that browser/device** unless you export it.

---

## 8. User roles and dashboards

### Regular user (`role: 'user'`)

**Access:** Register or user login → `user/dashboard.html`

| Feature | Description |
|---------|-------------|
| Overview | Stats, continue reading, quick actions |
| Reading history | Last articles opened |
| Saved stories | Bookmarked posts |
| My stories | Create/edit own posts only |
| Profile | Account info |

### Administrator (`role: 'admin'`)

**Access:** Login page → "Are you an admin?" → admin credentials → `admin/dashboard.html`

| Feature | Description |
|---------|-------------|
| Overview | Platform stats, recent activity |
| All stories | CRUD on every post |
| All users | View registered accounts |
| Comments | See all comments site-wide |
| Settings | Site info |

---

## 9. Data and localStorage

### Main data object (`niks_blog_data`)

```json
{
  "posts": [ { "id", "title", "content", "author", ... } ],
  "users": [ { "id", "username", "email", "password", "role" } ],
  "categories": ["Technology", "Design", ...],
  "topAuthors": [ ... ]
}
```

### Session (`niks_current_user`)

Stores logged-in user **without password** for security.

### Per-user keys

- `niks_reading_{userId}` — reading history array
- `niks_bookmarks_{userId}` — saved posts array
- `niks_seeded_{userId}` — flag for starter content

### Reset all data

1. Press `F12` → **Application** tab
2. **Local Storage** → your site URL
3. Delete keys starting with `niks_`
4. Refresh page — factory data reloads

---

## 10. Page-by-page walkthrough

| Page | File | JS Module |
|------|------|-----------|
| Home | index.html | app.js |
| Explore | blog.html | blog-listing.js |
| Article | post.html?id=X | post.js |
| Login | auth/login.html | inline + state.js |
| Register | auth/register.html | inline + state.js |
| User dashboard | user/dashboard.html | user-dashboard.js |
| Admin panel | admin/dashboard.html | admin.js |

Every public page calls `initCommon(state)` from `common.js` for:
- Navigation (login vs dashboard link)
- Theme toggle
- Mobile menu
- Footer categories

---

## 11. JavaScript modules explained

### state.js — The brain

- `BlogState` class manages all data
- `getPosts()`, `addPost()`, `deletePost()`
- `login()`, `register()`, `logout()`
- `isAdmin()`, `getDashboardPath()`
- `seedUserStarterData()` for new users

### common.js — Shared UI

- `initCommon()` — entry for all pages
- `escapeHtml()` — XSS protection
- `showToast()` — notifications
- `configureMarked()` — safe Markdown links

### app.js — Homepage

- Renders featured posts, editor's picks, categories
- Live stats from `getSiteStats()`
- Search redirects to blog with query

---

## 12. Troubleshooting

| Problem | Solution |
|---------|----------|
| Blank page / modules error | Use Live Server, not file:// |
| Login does nothing | Check console (F12); clear localStorage |
| Admin can't access panel | Verify admin role in stored user data |
| Posts not showing | Reset `niks_blog_data` in DevTools |
| Port 5500 in use | Change Live Server port in VS Code settings |
| Styles broken offline | First load needs internet for CDN fonts |

---

## 13. Tips for development

1. **Edit posts in admin** — fastest way to test content
2. **Use DevTools Console** — `localStorage.getItem('niks_blog_data')`
3. **Test mobile** — DevTools → Toggle device toolbar (`Ctrl+Shift+M`)
4. **Change admin password** — edit `_ensureAdminUser()` in `state.js`
5. **Add new categories** — edit `INITIAL_DATA.categories` in `state.js`

---

## Quick reference — URLs when using Live Server

| Page | URL |
|------|-----|
| Home | http://127.0.0.1:5500/index.html |
| Explore | http://127.0.0.1:5500/blog.html |
| Login | http://127.0.0.1:5500/auth/login.html |
| Register | http://127.0.0.1:5500/auth/register.html |
| User dashboard | http://127.0.0.1:5500/user/dashboard.html |
| Admin panel | http://127.0.0.1:5500/admin/dashboard.html |

---

**End of guide** — Niks Blog CMS
