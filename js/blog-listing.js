/* Niks Blog CMS - Blog Listing Logic */
import { state } from './state.js';
import { initCommon, formatDate, escapeHtml } from './common.js';

let currentCategory = 'All';
let searchTimeout;

document.addEventListener('DOMContentLoaded', () => {
    initCommon(state);

    const params = new URLSearchParams(window.location.search);
    const initialQuery = params.get('q');
    const initialCategory = params.get('category');

    if (initialQuery) {
        const searchInput = document.getElementById('blogSearch');
        if (searchInput) searchInput.value = initialQuery;
    }

    if (initialCategory) {
        currentCategory = initialCategory;
    }

    renderCategories();
    renderPosts();
    updateResultsMeta();
    initFilters();
});

function updateResultsMeta() {
    const meta = document.getElementById('blogResultsMeta');
    if (!meta) return;
    const count = getFilteredPosts().length;
    const label = currentCategory !== 'All' ? ` in ${currentCategory}` : '';
    meta.textContent = `${count} article${count === 1 ? '' : 's'}${label}`;
}

function renderCategories() {
    const container = document.getElementById('categoryFilters');
    if (!container) return;

    const categories = ['All', ...state.data.categories];

    container.innerHTML = categories.map(cat => `
        <button class="btn ${cat === currentCategory ? 'btn-primary' : 'btn-glass'}" data-category="${escapeHtml(cat)}">
            ${escapeHtml(cat)}
        </button>
    `).join('');

    container.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
            currentCategory = btn.dataset.category;
            renderCategories();
            renderPosts();
            updateResultsMeta();
        });
    });
}

function getFilteredPosts() {
    const query = document.getElementById('blogSearch')?.value.trim() || '';
    let posts = state.getPosts();

    if (currentCategory !== 'All') {
        posts = posts.filter(p => p.category === currentCategory);
    }

    if (query) {
        posts = state.searchPosts(query).filter(p =>
            currentCategory === 'All' || p.category === currentCategory
        );
    }

    const sort = document.getElementById('sortSelect')?.value || 'newest';
    posts = [...posts];

    if (sort === 'newest') posts.sort((a, b) => new Date(b.date) - new Date(a.date));
    else if (sort === 'oldest') posts.sort((a, b) => new Date(a.date) - new Date(b.date));
    else if (sort === 'popular') posts.sort((a, b) => (b.views || 0) - (a.views || 0));

    return posts;
}

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
                <div style="display: flex; gap: 0.5rem; margin-bottom: 1rem;">
                    <span class="badge">${category}</span>
                    <span style="font-size: 0.8rem; color: var(--text-secondary);">${readTime} read</span>
                </div>
                <h3 style="margin-bottom: 1rem;">
                    <a href="post.html?id=${encodeURIComponent(post.id)}">${title}</a>
                </h3>
                <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 1.5rem; flex: 1;">
                    ${excerpt}
                </p>
                <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 1.5rem; border-top: 1px solid var(--glass-border);">
                    <div style="display: flex; align-items: center; gap: 0.75rem;">
                        <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8rem;">
                            ${initial}
                        </div>
                        <span style="font-size: 0.9rem; font-weight: 500;">${author}</span>
                    </div>
                    <span style="font-size: 0.8rem; color: var(--text-secondary);">${formatDate(post.date)}</span>
                </div>
            </div>
        </article>
    `;
}

function renderPosts() {
    const grid = document.getElementById('blogGrid');
    if (!grid) return;

    const posts = getFilteredPosts();

    if (posts.length === 0) {
        grid.innerHTML = `<div class="empty-state" style="grid-column: 1/-1;">
            <i class="fas fa-search"></i>
            <h3>No stories found</h3>
            <p>Try a different search term or <a href="blog.html" style="color: var(--accent);">browse all categories</a>.</p>
        </div>`;
        return;
    }

    grid.innerHTML = posts.map(renderPostCard).join('');
    updateResultsMeta();
}

function initFilters() {
    const searchInput = document.getElementById('blogSearch');
    const sortSelect = document.getElementById('sortSelect');

    searchInput?.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(renderPosts, 300);
    });

    sortSelect?.addEventListener('change', renderPosts);
}
