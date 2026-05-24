# Niks Blog CMS

A modern, professional blogging platform built with **HTML**, **CSS**, and **vanilla JavaScript (ES modules)**. It features a public reading experience, user dashboards for readers/writers, and a full admin panel for platform management — all powered by **localStorage** (no backend server required).

![Platform](https://img.shields.io/badge/Stack-HTML%20%7C%20CSS%20%7C%20JS-blue)
![Storage](https://img.shields.io/badge/Data-localStorage-orange)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Features

### Public website
- **Homepage** — hero, live stats, category browse, featured & editor's picks
- **Explore** — search, filter by category, sort (newest / oldest / popular)
- **Article pages** — Markdown rendering, syntax highlighting, table of contents, comments, bookmarks
- **Dark / light theme** toggle
- **Responsive** layout with mobile navigation
- **Newsletter** signup (stored locally)

### User dashboard (`user/dashboard.html`)
- Reading history & saved stories
- Write, edit, and delete **your own** posts (Markdown editor)
- Profile overview with stats
- Starter data seeded on registration

### Admin panel (`admin/dashboard.html`)
- Platform-wide analytics (views, posts, users, likes)
- Manage **all** stories (create, edit, delete)
- View **all registered users**
- Moderate comments across posts
- Separate login flow (admin section on login page)

---

## Quick start

### Option 1 — VS Code Live Server (recommended)

1. Install [Visual Studio Code](https://code.visualstudio.com/)
2. Install the **Live Server** extension (`ritwickdey.LiveServer`)
3. Open this project folder in VS Code
4. Right-click `index.html` → **Open with Live Server**
5. Browser opens at `http://127.0.0.1:5500` (port may vary)

### Option 2 — Python local server

```bash
cd "path/to/chat app"
python -m http.server 8080
```

Open: **http://localhost:8080**

### Option 3 — Node.js `serve`

```bash
npx serve .
```

Open the URL shown in the terminal.

> **Important:** Do not open HTML files directly as `file://` — ES modules and some APIs work best over `http://localhost`.

---

## Default accounts

| Role  | How to sign in |
|-------|----------------|
| **User** | Register at `auth/register.html` — redirects to user dashboard |
| **Admin** | Login page → click **"Are you an admin?"** → enter your admin credentials |

Admin credentials are configured in `js/state.js` (not displayed on the login page for security).

---

## Project structure

```
chat app/
├── index.html              # Homepage
├── blog.html               # Explore all articles
├── post.html               # Single article view
├── auth/
│   ├── login.html          # User + admin login
│   ├── register.html       # New user registration
│   └── forgot-password.html
├── user/
│   └── dashboard.html      # Reader / writer dashboard
├── admin/
│   └── dashboard.html      # Administrator panel
├── css/
│   ├── style.css           # Global design system
│   └── dashboard.css       # Dashboard layouts
├── js/
│   ├── state.js            # Data layer (localStorage)
│   ├── common.js           # Shared UI (nav, theme, toast)
│   ├── app.js              # Homepage logic
│   ├── blog-listing.js     # Explore page logic
│   ├── post.js             # Article page logic
│   ├── user-dashboard.js   # User dashboard logic
│   └── admin.js            # Admin panel logic
├── docs/
│   ├── PROJECT_GUIDE.md    # Full documentation (Markdown)
│   └── Niks_Blog_CMS_Guide.pdf   # PDF guide (VS Code + architecture)
└── README.md               # This file
```

---

## How it works

### Data storage (`js/state.js`)

All content lives in the browser's **localStorage**:

| Key | Purpose |
|-----|---------|
| `niks_blog_data` | Posts, users, categories, authors |
| `niks_current_user` | Logged-in session (password never stored) |
| `niks_theme` | Dark / light preference |
| `niks_reading_{userId}` | Per-user reading history |
| `niks_bookmarks_{userId}` | Per-user saved articles |
| `niks_newsletter` | Newsletter emails |

On first visit, sample posts and an admin user are initialized automatically.

### Authentication flow

```
Register / Login
       ↓
state.login() or state.register()
       ↓
Session saved (role: user | admin)
       ↓
Redirect → user/dashboard.html  OR  admin/dashboard.html
```

### Article rendering

Posts are written in **Markdown**. On `post.html`, content is parsed with **marked.js** and code blocks are highlighted with **highlight.js**.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 |
| Styling | CSS3 (custom design system, glassmorphism) |
| Logic | JavaScript ES6 modules |
| Markdown | [marked](https://marked.js.org/) (CDN) |
| Syntax highlighting | [highlight.js](https://highlightjs.org/) (CDN) |
| Icons / fonts | Font Awesome, Google Fonts (Outfit) |
| Persistence | localStorage + sessionStorage |

**No** React, Node backend, or database required to run the project.

---

## VS Code setup (detailed)

See **`docs/PROJECT_GUIDE.md`** or **`docs/Niks_Blog_CMS_Guide.pdf`** for:

- Step-by-step VS Code installation
- Live Server configuration
- Page-by-page walkthrough
- Architecture diagrams
- Troubleshooting

### Recommended extensions

- **Live Server** — local development server
- **HTML CSS Support** — class/id completion
- **ESLint** (optional) — JavaScript linting
- **Prettier** (optional) — code formatting

### Workspace tips

1. Set Live Server port in VS Code settings if `5500` is busy
2. Use **Split Editor** to view HTML + JS side by side
3. Clear site data: DevTools → Application → Local Storage → clear `niks_*` keys to reset

---

## Generating the PDF guide

If you need to regenerate the documentation PDF:

```bash
cd docs
python generate-pdf.py
```

Output: `docs/Niks_Blog_CMS_Guide.pdf`

---

## Browser support

- Chrome / Edge (recommended)
- Firefox
- Safari

Requires ES modules and localStorage support.

---

## Resetting data

To restore factory defaults:

1. Open DevTools (`F12`)
2. **Application** → **Local Storage**
3. Delete all keys starting with `niks_`
4. Refresh the page

---

## Security notes

This is a **front-end demo** project:

- Passwords are stored in plain text in localStorage (not suitable for production)
- Admin credentials are in source code — change them in `state.js` before deployment
- No server-side validation

For production, replace localStorage with a secure API and hashed passwords.

---

## Author

**Niks Blog CMS** — built as a modern publishing platform demo.

---

## License

MIT License — free to use, modify, and distribute.
