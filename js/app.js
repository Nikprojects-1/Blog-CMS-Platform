/* Niks Blog CMS - Main Application Logic */
import { state } from './state.js';
import { initCommon, formatDate, escapeHtml, isValidEmail, formatNumber, showToast } from './common.js';

document.addEventListener('DOMContentLoaded', () => {
    initCommon(state);
    renderSiteStats();
    renderCategoryPills();
    renderFeaturedPosts();
    renderEditorsPicks();
    renderAuthors();
    initNewsletter();
    initMainSearch();
});

function renderPostCard(post) {
    const title = escapeHtml(post.title);
    const excerpt = escapeHtml(post.excerpt);
    const category = escapeHtml(post.category);
    const author = escapeHtml(post.author);
    const readTime = escapeHtml(post.readTime);
    const initial = author.charAt(0) || '?';

    return `
        <article class="glass-card blog-card animate-fade">
            <img src="${escapeHtml(post.thumbnail)}" alt="${title}" class="blog-card-img" loading="lazy" decoding="async">
            <div class="blog-card-content">
                <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
                    <span class="badge">${category}</span>
                    <span class="text-muted" style="font-size: 0.8rem;">${readTime} read</span>
                </div>
                <h3 style="margin-bottom: 1rem; font-size: 1.15rem;">
                    <a href="post.html?id=${encodeURIComponent(post.id)}">${title}</a>
                </h3>
                <p class="text-muted" style="font-size: 0.95rem; margin-bottom: 1.5rem; flex: 1; line-height: 1.65;">
                    ${excerpt}
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid var(--glass-border);">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div class="author-avatar">${initial}</div>
                        <span style="font-size: 0.9rem; font-weight: 500;">${author}</span>
                    </div>
                    <span class="text-muted" style="font-size: 0.8rem;">${formatDate(post.date)}</span>
                </div>
            </div>
        </article>
    `;
}

function renderSiteStats() {
    const stats = state.getSiteStats();
    const map = {
        statPosts: stats.posts,
        statAuthors: stats.authors,
        statReaders: formatNumber(stats.readers),
        statViews: formatNumber(stats.totalViews)
    };
    Object.entries(map).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el) el.textContent = val;
    });
}

function renderCategoryPills() {
    const container = document.getElementById('categoryPills');
    if (!container) return;

    const categories = state.data.categories || [];
    container.innerHTML = categories.map(cat => `
        <a href="blog.html?category=${encodeURIComponent(cat)}" class="category-pill">
            <i class="fas fa-tag"></i> ${escapeHtml(cat)}
        </a>
    `).join('');
}

function renderFeaturedPosts() {
    const grid = document.getElementById('featuredGrid');
    if (!grid) return;

    const posts = [...state.getPosts()]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    grid.innerHTML = posts.length
        ? posts.map(renderPostCard).join('')
        : emptyHtml('No featured stories yet', 'Check back soon for new articles.');
}

function renderEditorsPicks() {
    const grid = document.getElementById('editorsPicksGrid');
    if (!grid) return;

    const posts = [...state.getPosts()]
        .sort((a, b) => (b.views || 0) - (a.views || 0))
        .slice(0, 6);

    grid.innerHTML = posts.length
        ? posts.map(renderPostCard).join('')
        : emptyHtml('No stories available', 'Browse the blog to discover content.');
}

function emptyHtml(title, message) {
    return `<div class="empty-state" style="grid-column: 1 / -1;">
        <i class="fas fa-newspaper"></i>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(message)}</p>
    </div>`;
}

function renderAuthors() {
    const grid = document.getElementById('authorsGrid');
    const authors = state.data.topAuthors || [];
    if (!grid) return;

    grid.innerHTML = authors.map(author => `
        <div class="glass-card" style="padding: 2rem; text-align: center;">
            <div class="author-avatar author-avatar-lg">${escapeHtml(author.avatar)}</div>
            <h3 style="margin: 1rem 0 0.25rem;">${escapeHtml(author.name)}</h3>
            <p style="color: var(--accent); font-weight: 600; font-size: 0.9rem; margin-bottom: 1rem;">${escapeHtml(author.role)}</p>
            <p class="text-muted" style="font-size: 0.85rem; margin-bottom: 1.5rem;">
                <i class="fas fa-users"></i> ${escapeHtml(author.followers)} readers
            </p>
            <a href="blog.html" class="btn btn-glass" style="width: 100%; justify-content: center;">View stories</a>
        </div>
    `).join('');
}

function initMainSearch() {
    const searchInput = document.getElementById('mainSearch');
    if (!searchInput) return;

    const searchPanel = searchInput.closest('.search-bar') || searchInput.closest('.glass-panel');
    const searchBtn = searchPanel?.querySelector('.btn-primary');

    const goToSearch = () => {
        const query = searchInput.value.trim();
        window.location.href = query
            ? `blog.html?q=${encodeURIComponent(query)}`
            : 'blog.html';
    };

    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            goToSearch();
        }
    });

    searchBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        goToSearch();
    });
}

function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput?.value.trim() || '';

        if (!isValidEmail(email)) {
            showToast('Please enter a valid email address.');
            return;
        }

        const subscribers = JSON.parse(localStorage.getItem('niks_newsletter') || '[]');
        if (!subscribers.includes(email)) {
            subscribers.push(email);
            localStorage.setItem('niks_newsletter', JSON.stringify(subscribers));
        }

        showToast('You are subscribed! Watch your inbox for weekly highlights.');
        form.reset();
    });
}
