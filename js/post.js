/* Niks Blog CMS - Single Post Logic */
import { state } from './state.js';
import { initCommon, formatDate, escapeHtml, configureMarked, throttleRAF } from './common.js';

let currentPostId = null;

document.addEventListener('DOMContentLoaded', () => {
    initCommon(state);
    configureMarked();
    loadPost();
    initReadingProgress();
    initShareButtons();
    initCommentForm();
});

function loadPost() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    if (!id) {
        window.location.href = 'index.html';
        return;
    }

    const post = state.getPostById(id);
    if (!post) {
        window.location.href = 'index.html';
        return;
    }

    currentPostId = id;

    document.title = `${post.title} | Niks Blog CMS`;

    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.name = 'description';
        document.head.appendChild(metaDesc);
    }
    metaDesc.content = post.excerpt || post.title;

    document.getElementById('postTitle').textContent = post.title;
    const breadcrumbTitle = document.getElementById('breadcrumbTitle');
    if (breadcrumbTitle) {
        breadcrumbTitle.textContent = post.title.length > 48
            ? post.title.slice(0, 48) + '…'
            : post.title;
    }
    document.getElementById('postCategory').textContent = post.category;
    document.getElementById('postDate').textContent = formatDate(post.date);
    document.getElementById('postReadTime').textContent = post.readTime;
    document.getElementById('postAuthor').textContent = post.author;
    document.getElementById('authorAvatar').textContent = post.author.charAt(0);
    document.getElementById('postBanner').src = post.thumbnail;
    document.getElementById('postBanner').alt = post.title;

    const contentArea = document.getElementById('postContent');
    contentArea.innerHTML = marked.parse(post.content);

    if (typeof hljs !== 'undefined') {
        hljs.highlightAll();
    }

    generateTOC(contentArea);
    renderComments(post.comments || []);
    state.incrementViews(id);

    const user = state.getCurrentUser();
    if (user && !state.isAdmin()) {
        state.addToReadingHistory(user.id, post);
    }

    initBookmarkButton(post, user);
}

function initBookmarkButton(post, user) {
    if (!user) return;

    const sharePanel = document.querySelector('.toc-sidebar .glass-panel:nth-of-type(2)');
    if (!sharePanel) return;

    const shareRow = sharePanel.querySelector('div[style*="display: flex"]');
    if (!shareRow || sharePanel.querySelector('.bookmark-btn')) return;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'btn btn-glass bookmark-btn';
    btn.style.flex = '1';
    btn.title = 'Save story';
    const saved = state.isBookmarked(user.id, post.id);
    btn.innerHTML = saved
        ? '<i class="fas fa-bookmark"></i>'
        : '<i class="far fa-bookmark"></i>';

    btn.addEventListener('click', () => {
        const isNowSaved = state.toggleBookmark(user.id, post);
        btn.innerHTML = isNowSaved
            ? '<i class="fas fa-bookmark"></i>'
            : '<i class="far fa-bookmark"></i>';
    });

    shareRow.appendChild(btn);
}

function generateTOC(contentArea) {
    const toc = document.getElementById('toc');
    const headings = contentArea.querySelectorAll('h2, h3');

    if (headings.length === 0) {
        toc.innerHTML = '<p style="color: var(--text-secondary); font-size: 0.8rem;">No headings available.</p>';
        return;
    }

    toc.innerHTML = Array.from(headings).map((h, i) => {
        const id = `heading-${i}`;
        h.id = id;
        return `<a href="#${id}" class="toc-link" style="padding-left: ${h.tagName === 'H3' ? '2rem' : '1rem'}">${escapeHtml(h.textContent)}</a>`;
    }).join('');

    const tocLinks = toc.querySelectorAll('.toc-link');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                tocLinks.forEach(link => link.classList.remove('active'));
                const activeLink = Array.from(tocLinks).find(l => l.getAttribute('href') === `#${entry.target.id}`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }, { rootMargin: '-100px 0px -400px 0px' });

    headings.forEach(h => observer.observe(h));
}

function initReadingProgress() {
    const progressBar = document.getElementById('progressBar');
    if (!progressBar) return;

    window.addEventListener('scroll', throttleRAF(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        progressBar.style.width = scrolled + '%';
    }), { passive: true });
}

function renderComments(comments) {
    const list = document.getElementById('commentList');
    const count = document.getElementById('commentCount');
    count.textContent = comments.length;

    if (comments.length === 0) {
        list.innerHTML = '<div style="text-align: center; color: var(--text-secondary);">No comments yet. Be the first to share your thoughts!</div>';
        return;
    }

    list.innerHTML = comments.map(c => {
        const author = escapeHtml(c.author || 'Anonymous Reader');
        const initial = author.charAt(0) || 'U';
        const content = escapeHtml(c.content);
        const date = formatDate(c.date || new Date().toISOString());

        return `
        <div class="comment-item">
            <div style="display: flex; gap: 1rem; margin-bottom: 0.5rem;">
                <div style="width: 32px; height: 32px; border-radius: 50%; background: var(--accent); display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 0.8rem;">
                    ${initial}
                </div>
                <div>
                    <div style="font-weight: 600; font-size: 0.95rem;">${author}</div>
                    <div style="font-size: 0.8rem; color: var(--text-secondary);">${date}</div>
                </div>
            </div>
            <p style="color: var(--text-primary);">${content}</p>
        </div>
    `;
    }).join('');
}

function initCommentForm() {
    const form = document.getElementById('commentForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!currentPostId) return;

        const textarea = form.querySelector('textarea');
        const content = textarea?.value.trim();
        if (!content) return;

        const user = state.getCurrentUser();
        const author = user?.username || 'Anonymous Reader';
        const comment = state.addComment(currentPostId, content, author);

        if (comment) {
            const post = state.getPostById(currentPostId);
            renderComments(post.comments || []);
            textarea.value = '';
        }
    });
}

function initShareButtons() {
    const sharePanel = document.querySelector('.toc-sidebar .glass-panel:nth-of-type(2)');
    if (!sharePanel) return;

    const buttons = sharePanel.querySelectorAll('button');
    const [twitterBtn, linkedinBtn, copyBtn] = buttons;
    const shareUrl = encodeURIComponent(window.location.href);
    const shareTitle = encodeURIComponent(document.getElementById('postTitle')?.textContent || '');

    twitterBtn?.addEventListener('click', () => {
        window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, '_blank', 'noopener,noreferrer');
    });

    linkedinBtn?.addEventListener('click', () => {
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`, '_blank', 'noopener,noreferrer');
    });

    copyBtn?.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            alert('Link copied to clipboard!');
        } catch {
            alert('Could not copy link. Please copy the URL from your browser.');
        }
    });
}
