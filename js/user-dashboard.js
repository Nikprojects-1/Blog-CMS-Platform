/* Niks Blog CMS - User Dashboard */
import { state } from './state.js';
import { formatDate, escapeHtml, configureMarked } from './common.js';

let editingPostId = null;
let currentUser = null;

const TAB_LABELS = {
    overview: 'Welcome back',
    reading: 'Reading History',
    saved: 'Saved Stories',
    stories: 'My Stories',
    profile: 'My Profile'
};

document.addEventListener('DOMContentLoaded', () => {
    if (!state.isAuthenticated()) {
        window.location.href = '../auth/login.html';
        return;
    }

    if (state.isAdmin()) {
        window.location.href = '../admin/dashboard.html';
        return;
    }

    currentUser = state.getCurrentUser();
    state.ensureUserStarterData(currentUser);
    configureMarked();
    initTabs();
    initQuickActions();
    initDashboard();
    initEditor();
    initLogout();
});

function initQuickActions() {
    document.querySelectorAll('[data-go-tab]').forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.goTab;
            if (tab === 'stories') {
                document.getElementById('createNewPost')?.click();
                return;
            }
            document.querySelector(`.sidebar-tab[data-tab="${tab}"]`)?.click();
        });
    });
}

function formatNumber(num) {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num;
}

function initDashboard() {
    const reading = state.getReadingHistory(currentUser.id);
    const bookmarks = state.getBookmarks(currentUser.id);
    const myPosts = state.getPostsByUser(currentUser);
    const myViews = myPosts.reduce((sum, p) => sum + (p.views || 0), 0);

    document.getElementById('statRead').textContent = reading.length;
    document.getElementById('statSaved').textContent = bookmarks.length;
    document.getElementById('statMyPosts').textContent = myPosts.length;
    document.getElementById('statMyViews').textContent = formatNumber(myViews);

    document.getElementById('tabTitle').textContent = `Welcome, ${currentUser.username}`;
    document.getElementById('welcomeTitle').textContent = `Good to see you, ${currentUser.username}`;
    document.getElementById('welcomeMessage').textContent =
        reading.length > 0
            ? `You have ${reading.length} article${reading.length === 1 ? '' : 's'} in your reading history.`
            : 'Explore the blog to build your reading list and save favorites.';

    renderContinueReading(reading);
    renderReadingList(reading);
    renderSavedList(bookmarks);
    renderMyPosts(myPosts);
    renderProfile();
}

function renderContinueReading(reading) {
    const container = document.getElementById('continueReading');
    if (!container) return;

    if (reading.length === 0) {
        container.innerHTML = `<div class="empty-state">
            <i class="fas fa-book-open"></i>
            <h3>Nothing here yet</h3>
            <p><a href="../blog.html" style="color: var(--accent);">Browse stories</a> to start your reading journey.</p>
        </div>`;
        return;
    }

    container.innerHTML = reading.slice(0, 5).map(item => readingCardHtml(item)).join('');
}

function readingCardHtml(item) {
    const title = escapeHtml(item.title);
    return `
        <a href="../post.html?id=${encodeURIComponent(item.postId)}" class="reading-card" style="text-decoration: none; color: inherit;">
            <img src="${escapeHtml(item.thumbnail || '')}" alt="" loading="lazy">
            <div style="flex: 1;">
                <div style="font-weight: 600;">${title}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary);">Read ${formatDate(item.date)}</div>
            </div>
            <i class="fas fa-arrow-right" style="color: var(--text-secondary);"></i>
        </a>
    `;
}

function renderReadingList(reading) {
    const list = document.getElementById('readingList');
    if (!list) return;

    if (reading.length === 0) {
        list.innerHTML = `<div class="empty-state"><i class="fas fa-history"></i><h3>No reading history</h3><p>Stories you open will appear here.</p></div>`;
        return;
    }

    list.innerHTML = reading.map(item => readingCardHtml(item)).join('');
}

function renderSavedList(bookmarks) {
    const list = document.getElementById('savedList');
    if (!list) return;

    if (bookmarks.length === 0) {
        list.innerHTML = `<div class="empty-state"><i class="fas fa-bookmark"></i><h3>No saved stories</h3><p>Tap the bookmark icon on any article to save it here.</p></div>`;
        return;
    }

    list.innerHTML = bookmarks.map(item => {
        const title = escapeHtml(item.title);
        return `
            <div class="reading-card">
                <img src="${escapeHtml(item.thumbnail || '')}" alt="" loading="lazy">
                <div style="flex: 1;">
                    <a href="../post.html?id=${encodeURIComponent(item.postId)}" style="font-weight: 600; color: inherit;">${title}</a>
                    <div style="font-size: 0.85rem; color: var(--text-secondary);">Saved ${formatDate(item.date)}</div>
                </div>
                <button class="toolbar-btn remove-bookmark" data-id="${escapeHtml(item.postId)}" title="Remove" style="color: #ef4444;">
                    <i class="fas fa-bookmark-slash"></i>
                </button>
            </div>
        `;
    }).join('');

    list.querySelectorAll('.remove-bookmark').forEach(btn => {
        btn.addEventListener('click', () => {
            const post = state.getPostById(btn.dataset.id);
            if (post) state.toggleBookmark(currentUser.id, post);
            initDashboard();
        });
    });
}

function renderMyPosts(posts) {
    const list = document.getElementById('myPostsList');
    const createBtn = document.getElementById('createNewPost');
    if (!list) return;

    createBtn.style.display = 'inline-flex';

    if (posts.length === 0) {
        list.innerHTML = `<div class="empty-state" style="grid-column: 1 / -1;">
            <i class="fas fa-pen-nib"></i>
            <h3>No stories yet</h3>
            <p>Click <strong>Write Story</strong> to publish your first article.</p>
        </div>`;
        return;
    }

    list.innerHTML = posts.map(post => `
        <div class="post-row">
            <img src="${escapeHtml(post.thumbnail)}" alt="" style="width: 50px; height: 40px; border-radius: 4px; object-fit: cover;" loading="lazy">
            <div style="font-weight: 500;">${escapeHtml(post.title)}</div>
            <div><span class="badge">${escapeHtml(post.category)}</span></div>
            <div style="color: var(--text-secondary); font-size: 0.9rem;">${formatDate(post.date)}</div>
            <div style="display: flex; gap: 0.5rem;">
                <a href="../post.html?id=${encodeURIComponent(post.id)}" class="toolbar-btn" title="View"><i class="fas fa-eye"></i></a>
                <button class="toolbar-btn edit-post" data-id="${escapeHtml(post.id)}"><i class="fas fa-edit"></i></button>
                <button class="toolbar-btn delete-post" data-id="${escapeHtml(post.id)}" style="color: #ef4444;"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `).join('');

    list.querySelectorAll('.edit-post').forEach(btn => {
        btn.addEventListener('click', () => openEditor(btn.dataset.id));
    });
    list.querySelectorAll('.delete-post').forEach(btn => {
        btn.addEventListener('click', () => {
            if (confirm('Delete this story?')) {
                state.deleteUserPost(btn.dataset.id, currentUser);
                initDashboard();
            }
        });
    });
}

function renderProfile() {
    document.getElementById('profileName').textContent = currentUser.username;
    document.getElementById('profileEmail').textContent = currentUser.email;
    document.getElementById('profileRole').textContent = currentUser.role || 'user';
    document.getElementById('profileAvatar').textContent = (currentUser.username || 'U').charAt(0).toUpperCase();

    const sidebarLogo = document.querySelector('aside .logo');
    if (sidebarLogo) {
        sidebarLogo.innerHTML = `My Space<br><span style="font-size: 0.75rem; color: #06b6d4; font-weight: 500;">@${escapeHtml(currentUser.username)}</span>`;
    }
}

function initTabs() {
    const navItems = document.querySelectorAll('.sidebar-tab[data-tab]');
    const createBtn = document.getElementById('createNewPost');

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const tab = item.dataset.tab;

            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            document.querySelectorAll('.tab-content').forEach(c => c.style.display = 'none');
            document.getElementById(`tab-${tab}`).style.display = 'block';

            document.getElementById('tabTitle').textContent =
                tab === 'overview' ? `Welcome, ${currentUser.username}` : TAB_LABELS[tab];

            createBtn.style.display = tab === 'stories' ? 'inline-flex' : 'none';
        });
    });
}

function initEditor() {
    const btnCreate = document.getElementById('createNewPost');
    const btnClose = document.getElementById('closeEditor');
    const btnSave = document.getElementById('savePost');
    const inputMd = document.getElementById('markdownInput');
    const preview = document.getElementById('markdownPreview');

    btnCreate.addEventListener('click', () => openEditor());
    btnClose.addEventListener('click', () => {
        document.getElementById('editorModal').style.display = 'none';
        editingPostId = null;
    });

    inputMd.addEventListener('input', () => {
        preview.innerHTML = marked.parse(inputMd.value);
        if (typeof hljs !== 'undefined') hljs.highlightAll();
    });

    btnSave.addEventListener('click', () => {
        const title = document.getElementById('editTitle').value.trim();
        const category = document.getElementById('editCategory').value;
        const content = inputMd.value.trim();

        if (!title || !content) {
            alert('Please provide a title and content.');
            return;
        }

        const postData = {
            title,
            category,
            content,
            excerpt: content.split('\n')[0].replace(/^#+\s*/, '').substring(0, 100) + '...',
            thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
            readTime: Math.ceil(content.split(/\s+/).length / 200) + ' min',
            tags: []
        };

        if (editingPostId) {
            state.updateUserPost(editingPostId, currentUser, postData);
        } else {
            state.addUserPost(currentUser, postData);
        }

        document.getElementById('editorModal').style.display = 'none';
        editingPostId = null;
        initDashboard();

        document.querySelector('.sidebar-tab[data-tab="stories"]')?.click();
    });
}

function openEditor(postId = null) {
    editingPostId = postId;
    const modal = document.getElementById('editorModal');
    const titleInput = document.getElementById('editTitle');
    const mdInput = document.getElementById('markdownInput');
    const preview = document.getElementById('markdownPreview');
    const categorySelect = document.getElementById('editCategory');

    if (postId) {
        const post = state.getPostById(postId);
        if (!post || (post.authorId !== currentUser.id && post.author !== currentUser.username)) {
            alert('You can only edit your own stories.');
            return;
        }
        titleInput.value = post.title;
        mdInput.value = post.content;
        categorySelect.value = post.category;
    } else {
        titleInput.value = '';
        mdInput.value = '';
    }

    preview.innerHTML = marked.parse(mdInput.value || '');
    modal.style.display = 'flex';
}

function initLogout() {
    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        if (confirm('Logout and return to the main website?')) {
            state.logout();
            window.location.href = '../index.html';
        }
    });
}
