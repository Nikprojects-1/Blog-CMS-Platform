/* Niks Blog CMS - Admin Dashboard */
import { state } from './state.js';
import { formatDate, escapeHtml, configureMarked } from './common.js';

let editingPostId = null;

const TAB_LABELS = {
    overview: 'Admin Overview',
    posts: 'All Stories',
    users: 'Users',
    comments: 'Comments',
    settings: 'Settings'
};

document.addEventListener('DOMContentLoaded', () => {
    if (!state.isAuthenticated()) {
        window.location.href = '../auth/login.html';
        return;
    }

    if (!state.isAdmin()) {
        window.location.href = '../user/dashboard.html';
        return;
    }

    configureMarked();
    initDashboard();
    initTabs();
    initEditor();
    initLogout();
});

function formatNumber(num) {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'k' : num;
}

function initDashboard() {
    const posts = state.getPosts();
    const users = state.data.users || [];
    const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
    const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);

    document.getElementById('statViews').textContent = formatNumber(totalViews);
    document.getElementById('statPosts').textContent = posts.length;
    document.getElementById('statUsers').textContent = users.length;
    document.getElementById('statLikes').textContent = formatNumber(totalLikes);

    renderRecentActivity(posts);
    renderAdminPosts();
    renderUsers(users);
    renderComments();
    renderSettings();
}

function renderRecentActivity(posts) {
    const list = document.getElementById('recentActivityList');
    if (!list) return;

    const activities = [];

    posts.slice(0, 5).forEach(post => {
        activities.push({
            text: `"${post.title}" — ${formatNumber(post.views || 0)} views`,
            date: post.date
        });
    });

    state.getAllComments().slice(0, 3).forEach(c => {
        activities.push({
            text: `New comment on "${c.postTitle}" by ${c.author}`,
            date: c.date
        });
    });

    if (activities.length === 0) {
        list.innerHTML = '<p style="padding: 1rem; color: var(--text-secondary);">No recent activity.</p>';
        return;
    }

    list.innerHTML = activities.map(a => `
        <div style="padding: 1rem; border-bottom: 1px solid var(--glass-border);">
            ${escapeHtml(a.text)}
            <span style="display: block; font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">${formatDate(a.date)}</span>
        </div>
    `).join('');
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

            document.getElementById('tabTitle').textContent = TAB_LABELS[tab] || tab;
            createBtn.style.display = tab === 'posts' || tab === 'overview' ? 'inline-flex' : 'none';
        });
    });
}

function renderAdminPosts() {
    const list = document.getElementById('postsList');
    if (!list) return;

    const posts = state.getPosts();
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
            if (confirm('Are you sure you want to delete this story?')) {
                state.deletePost(btn.dataset.id);
                initDashboard();
            }
        });
    });
}

function renderUsers(users) {
    const list = document.getElementById('usersList');
    if (!list) return;

    if (users.length === 0) {
        list.innerHTML = '<p style="padding: 2rem; text-align: center; color: var(--text-secondary);">No users registered.</p>';
        return;
    }

    list.innerHTML = users.map(user => {
        const storyCount = state.getUserStoryCount(user);
        const role = user.role || 'user';
        const roleBadge = role === 'admin'
            ? '<span class="badge" style="border-color: var(--primary); color: var(--primary);">admin</span>'
            : `<span class="badge">${escapeHtml(role)}</span>`;

        return `
        <div class="user-table-row">
            <div style="display: flex; align-items: center; gap: 0.75rem;">
                <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">
                    ${escapeHtml((user.username || 'U').charAt(0).toUpperCase())}
                </div>
                <div>
                    <div style="font-weight: 600;">${escapeHtml(user.username || '—')}</div>
                    ${user.joinedAt ? `<div style="font-size: 0.8rem; color: var(--text-secondary);">Joined ${formatDate(user.joinedAt)}</div>` : ''}
                </div>
            </div>
            <div style="font-size: 0.9rem;">${escapeHtml(user.email)}</div>
            <div>${roleBadge}</div>
            <div style="font-weight: 600;">${storyCount}</div>
            <div style="display: flex; align-items: center; justify-content: space-between; gap: 0.5rem;">
                <span style="font-size: 0.8rem; color: var(--text-secondary); font-family: monospace;">${escapeHtml(user.id)}</span>
                ${role !== 'admin' ? `<button type="button" class="toolbar-btn delete-user" data-id="${escapeHtml(user.id)}" title="Delete user" style="color: #ef4444;"><i class="fas fa-trash"></i></button>` : ''}
            </div>
        </div>
    `;
    }).join('');

    list.querySelectorAll('.delete-user').forEach(btn => {
        btn.addEventListener('click', () => {
            const user = state.data.users.find(u => u.id === btn.dataset.id);
            if (!user || user.role === 'admin') return;
            if (!confirm(`Delete all data for "${user.username}"? This cannot be undone.`)) return;
            state.deleteUserByQuery(user.username);
            initDashboard();
        });
    });
}

function renderComments() {
    const list = document.getElementById('commentsList');
    if (!list) return;

    const comments = state.getAllComments();

    if (comments.length === 0) {
        list.innerHTML = '<p style="padding: 2rem; text-align: center; color: var(--text-secondary);">No comments on the platform yet.</p>';
        return;
    }

    list.innerHTML = comments.map(c => `
        <div style="padding: 1rem; border-bottom: 1px solid var(--glass-border);">
            <div style="display: flex; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-bottom: 0.5rem;">
                <span style="font-weight: 600;">${escapeHtml(c.author)}</span>
                <span style="font-size: 0.85rem; color: var(--text-secondary);">${formatDate(c.date)}</span>
            </div>
            <p style="color: var(--text-primary); margin-bottom: 0.5rem;">${escapeHtml(c.content)}</p>
            <a href="../post.html?id=${encodeURIComponent(c.postId)}" style="font-size: 0.85rem; color: var(--accent);">
                on "${escapeHtml(c.postTitle)}"
            </a>
        </div>
    `).join('');
}

function renderSettings() {
    const el = document.getElementById('settingsCategories');
    if (el) {
        el.textContent = (state.data.categories || []).join(', ');
    }
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

        const currentUser = state.getCurrentUser();
        const postData = {
            title,
            category,
            content,
            excerpt: content.split('\n')[0].replace(/^#+\s*/, '').substring(0, 100) + '...',
            author: currentUser?.username || 'Nikhil Kashyap',
            authorId: currentUser?.id,
            thumbnail: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=800',
            readTime: Math.ceil(content.split(/\s+/).length / 200) + ' min',
            tags: []
        };

        if (editingPostId) {
            state.updatePost(editingPostId, postData);
        } else {
            state.addPost(postData);
        }

        document.getElementById('editorModal').style.display = 'none';
        editingPostId = null;
        initDashboard();
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
    const logout = () => {
        state.logout();
        window.location.href = '../index.html';
    };

    document.getElementById('logoutBtn')?.addEventListener('click', () => {
        if (confirm('Logout and return to the main website?')) {
            logout();
        }
    });

    const user = state.getCurrentUser();
    if (user) {
        const logo = document.querySelector('aside .logo');
        if (logo) {
            logo.innerHTML = `Niks CMS<br><span style="font-size: 0.75rem; color: var(--accent); font-weight: 500;">@${escapeHtml(user.username)} · Admin</span>`;
        }
    }
}
