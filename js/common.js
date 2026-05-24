/* Niks Blog CMS - Shared Page Logic */

export function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export function throttleRAF(fn) {
    let ticking = false;
    return (...args) => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            fn(...args);
            ticking = false;
        });
    };
}

export function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
    return String(num);
}

export function showToast(message, duration = 4000) {
    document.querySelector('.toast')?.remove();
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
}

export function initCommon(state) {
    initNavbar(state);
    initTheme();
    initMobileMenu();
    initFooterCategories(state);
}

function initMobileMenu() {
    const toggle = document.getElementById('menuToggle');
    const navLinks = document.querySelector('.nav-links');
    if (!toggle || !navLinks) return;

    toggle.style.display = '';
    toggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
        const icon = toggle.querySelector('i');
        if (icon) {
            icon.className = navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
        }
    });

    navLinks.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('click', () => navLinks.classList.remove('open'));
    });
}

function initFooterCategories(state) {
    const footer = document.getElementById('footerCategories');
    if (!footer || !state?.data?.categories) return;

    footer.innerHTML = state.data.categories.map(cat => `
        <li><a href="blog.html?category=${encodeURIComponent(cat)}" class="nav-link">${escapeHtml(cat)}</a></li>
    `).join('');
}

function initNavbar(state) {
    const navbar = document.getElementById('navbar');
    if (!navbar) return;
    
    // Dynamic Navigation items
    const navLinks = document.querySelector('.nav-links');
    if (navLinks && state) {
        updateNavbar(state, navLinks);
    }

    window.addEventListener('scroll', throttleRAF(() => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else if (!navbar.dataset.permanentScrolled) {
            navbar.classList.remove('scrolled');
        }
    }), { passive: true });

    if (!window.location.pathname.includes('index.html') && window.location.pathname !== '/') {
        navbar.classList.add('scrolled');
        navbar.dataset.permanentScrolled = "true";
    }
}

function resolveDashboardHref(state) {
    const path = window.location.pathname;
    const isInAuth = path.includes('auth/');
    const isInAdmin = path.includes('admin/');
    const isInUser = path.includes('user/');

    if (!state.isAuthenticated()) {
        return isInAuth ? 'login.html' : (isInAdmin || isInUser ? '../auth/login.html' : 'auth/login.html');
    }

    if (state.isAdmin()) {
        if (isInAdmin) return 'dashboard.html';
        if (isInAuth) return '../admin/dashboard.html';
        return 'admin/dashboard.html';
    }

    if (isInUser) return 'dashboard.html';
    if (isInAuth) return '../user/dashboard.html';
    return 'user/dashboard.html';
}

function updateNavbar(state, container) {
    const isAuth = state.isAuthenticated();
    const dashboardLink = container.querySelector('a[href*="dashboard.html"]');
    const authBtn = container.querySelector('a[href*="login.html"]');
    const dashHref = resolveDashboardHref(state);

    if (dashboardLink) {
        dashboardLink.style.display = isAuth ? 'block' : 'none';
        dashboardLink.href = dashHref;
        dashboardLink.textContent = state.isAdmin() ? 'Admin Panel' : 'My Dashboard';
    }

    if (authBtn) {
        if (isAuth) {
            const user = state.getCurrentUser();
            authBtn.innerHTML = `<i class="fas fa-user-circle"></i> ${escapeHtml(user.username)}`;
            authBtn.href = dashHref;

            const isInDashboard = window.location.pathname.includes('admin/') || window.location.pathname.includes('user/');
            const isInAuth = window.location.pathname.includes('auth/');

            if (!isInDashboard && !container.querySelector('.nav-logout')) {
                const logoutItem = document.createElement('a');
                logoutItem.href = '#';
                logoutItem.className = 'nav-link nav-logout';
                logoutItem.setAttribute('aria-label', 'Logout');
                logoutItem.style.color = '#ef4444';
                logoutItem.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
                logoutItem.onclick = (e) => {
                    e.preventDefault();
                    if (confirm('Logout?')) {
                        state.logout();
                        window.location.href = isInAuth ? '../index.html' : 'index.html';
                    }
                };
                container.appendChild(logoutItem);
            }
        } else {
            const isInAuth = window.location.pathname.includes('auth/');
            const isInAdmin = window.location.pathname.includes('admin/');
            authBtn.innerHTML = 'Login';
            authBtn.href = isInAuth ? 'login.html' : (isInAdmin ? '../auth/login.html' : 'auth/login.html');
        }
    }
}

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const body = document.body;
    const icon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('niks_theme') || 'dark';
    body.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme, icon);

    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('niks_theme', newTheme);
        updateThemeIcon(newTheme, icon);
    });
}

function updateThemeIcon(theme, icon) {
    if (!icon) return;
    if (theme === 'dark') {
        icon.className = 'fas fa-moon';
    } else {
        icon.className = 'fas fa-sun';
    }
}

export function formatDate(dateStr) {
    const date = new Date(dateStr);
    if (Number.isNaN(date.getTime())) return '';
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

export function configureMarked() {
    if (typeof marked === 'undefined') return;
    try {
        marked.setOptions({ breaks: true, mangle: false, headerIds: true });
        if (typeof marked.use === 'function') {
            marked.use({
                renderer: {
                    link({ href, title, tokens }) {
                        const text = this.parser.parseInline(tokens);
                        const safeHref = href && !/^\s*javascript:/i.test(href) ? href : '#';
                        const titleAttr = title ? ` title="${escapeHtml(title)}"` : '';
                        return `<a href="${escapeHtml(safeHref)}"${titleAttr} rel="noopener noreferrer" target="_blank">${text}</a>`;
                    }
                }
            });
        }
    } catch (err) {
        console.warn('Markdown configuration skipped:', err);
    }
}
