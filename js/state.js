/* Niks Blog CMS - State Management & Data */

const INITIAL_DATA = {
    posts: [
        {
            id: '1',
            title: 'Exploring the Future of Web Development with AI',
            excerpt: 'How AI is reshaping the way we write code and build digital experiences in 2026. From autonomous components to predictive UI.',
            content: '# Exploring the Future of Web Development with AI\n\nArtificial Intelligence is no longer just a buzzword in the development world. In 2026, we are seeing a massive shift towards **AI-augmented engineering**.\n\n## The Rise of Predictive UI\nImagine an interface that adapts to the user before they even click. Predictive UI uses historical data to pre-render states that the user is likely to visit next.\n\n```javascript\nconst predictNextState = (userData) => {\n  // Logic to determine user intent\n  return AI.model.predict(userData);\n};\n```\n\n## Autonomous Components\nComponents are now being designed to self-heal and optimize. If an API endpoint fails, the component can automatically switch to a fallback state or suggest a cached version.\n\n![AI Development](https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800)\n\n### Why it matters?\n1. Reduced Boilerplate\n2. Higher Accessibility\n3. Dynamic Personalization',
            author: 'Nikhil Kashyap',
            category: 'Technology',
            tags: ['AI', 'WebDev', 'Future'],
            thumbnail: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800',
            date: '2026-05-20',
            readTime: '5 min',
            views: 4520,
            likes: 612,
            comments: []
        },
        {
            id: '2',
            title: 'Mastering Glassmorphism in Modern UI Design',
            excerpt: 'A deep dive into creating stunning translucent interfaces that users love. Learn the secrets of background-blur and layering.',
            content: '# Mastering Glassmorphism\n\nGlassmorphism is a UI trend that emphasizes translucent backgrounds and multi-layered hierarchies.\n\n## Creating the Effect\nThe secret lies in the CSS `backdrop-filter` property.\n\n```css\n.glass-panel {\n    background: rgba(255, 255, 255, 0.1);\n    backdrop-filter: blur(10px);\n    border: 1px solid rgba(255, 255, 255, 0.2);\n}\n```\n\n### Best Practices\n- **Contrast is Key**: Ensure your text is readable against blurred backgrounds.\n- **Subtle Borders**: Use a semi-transparent white border to give the edge a "glass-like" shine.\n- **Depth**: Layer multiple glass elements to create a sense of 3D space.',
            author: 'Sarah Chen',
            category: 'Design',
            tags: ['UI', 'UX', 'DesignTrends'],
            thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
            date: '2026-05-18',
            readTime: '8 min',
            views: 2890,
            likes: 492,
            comments: []
        },
        {
            id: '3',
            title: 'The Rise of Clean Architecture in Javascript',
            excerpt: 'Why modularity and separation of concerns are critical for scalable frontend apps in the modern era of web applications.',
            content: '# Clean Architecture\n\nScalability in frontend applications starts with a solid foundation. Clean architecture decouples your logic from the framework.\n\n## Dependency Rule\nThe most important rule is that dependencies must only point inwards.\n\n1. **Entities**: Business logic\n2. **Use Cases**: Application logic\n3. **Interface Adapters**: Controllers, Presenters\n4. **Frameworks & Drivers**: UI, Database\n\n### Implementation Example\nAlways use interfaces to communicate between layers to ensure you can swap out libraries without breaking the core logic.',
            author: 'Alex River',
            category: 'Development',
            tags: ['JS', 'Architecture', 'BestPractices'],
            thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800',
            date: '2026-05-15',
            readTime: '12 min',
            views: 3100,
            likes: 510,
            comments: []
        },
        {
            id: '4',
            title: '10 Productivity Hacks for Remote Developers',
            excerpt: 'How to stay focused and maintain a healthy work-life balance while working from home. Tested by seasoned remote engineers.',
            content: '# Productivity Hacks\n\nWorking remotely offers freedom, but requires discipline. Here are 10 hacks used by top-tier engineers.\n\n### 1. The Pomodoro Technique\nWork for 25 minutes, rest for 5. It keeps your brain fresh.\n\n### 2. Time Blocking\nSchedule your deep work blocks in advance and stick to them.\n\n### 3. Dedicated Workspace\nNever work from bed. Your brain needs a physical boundary between work and life.\n\n![Remote Office](https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800)',
            author: 'Jason Smyth',
            category: 'Lifestyle',
            tags: ['Productivity', 'RemoteWork'],
            thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800',
            date: '2026-05-22',
            readTime: '6 min',
            views: 1540,
            likes: 245,
            comments: []
        },
        {
            id: '5',
            title: 'Understanding Web3 and the Decentralized Future',
            excerpt: 'An entry-level guide to blockchain, smart contracts, and what comes next for the web beyond centralized servers.',
            content: '# Understanding Web3\n\nWeb3 is the next evolution of the internet, characterized by decentralization, blockchain technologies, and token-based economics.\n\n## Key Concepts\n- **DAOs**: Decentralized Autonomous Organizations.\n- **Smart Contracts**: Self-executing code on the blockchain.\n- **NFTs**: Digital ownership of unique assets.\n\n### The Future\nWe are moving away from data silos and towards a user-owned internet.',
            author: 'Nikhil Kashyap',
            category: 'Technology',
            tags: ['Web3', 'Blockchain', 'Crypto'],
            thumbnail: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800',
            date: '2026-05-24',
            readTime: '10 min',
            views: 4200,
            likes: 820,
            comments: []
        },
        {
            id: '6',
            title: 'The Art of Minimalist Living in a Digital Age',
            excerpt: 'Finding peace through decluttering both your physical workspace and your digital life.',
            content: '# Minimalist Living\n\nIn an age of constant notifications, minimalism is a superpower.\n\n## Digital Declutter\n- Unsubscribe from unnecessary emails.\n- Delete apps you haven\'t used in 30 days.\n- Turn off non-essential notifications.\n\n> "Simplicity is the ultimate sophistication." — Leonardo da Vinci',
            author: 'Jason Smyth',
            category: 'Lifestyle',
            tags: ['Minimalism', 'MentalHealth'],
            thumbnail: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&q=80&w=800',
            date: '2026-05-24',
            readTime: '5 min',
            views: 1200,
            likes: 180,
            comments: []
        },
        {
            id: '7',
            title: 'React vs Vue: A 2026 Comparison',
            excerpt: 'The ultimate showdown between the two giants of frontend development in the current ecosystem.',
            content: '# React vs Vue\n\nBoth frameworks have matured significantly. Here is where they stand today.\n\n## React Server Components\nReact has fully embraced server-side execution, making it the king of enterprise-scale apps.\n\n## Vue\'s Simplicity\nVue continues to win on developer experience with its intuitive API and fast compilation times.',
            author: 'Alex River',
            category: 'Development',
            tags: ['React', 'Vue', 'Frontend'],
            thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=800',
            date: '2026-05-23',
            readTime: '9 min',
            views: 3800,
            likes: 420,
            comments: []
        },
        {
            id: '8',
            title: 'Scaling Startups with Modern DevOps',
            excerpt: 'How to automate your infrastructure and deployment pipelines for rapid growth and reliability.',
            content: '# Modern DevOps\n\nAutomation is the key to scaling. Use infrastructure as code (IaC) to manage your cloud resources.\n\n## Tools of the Trade\n- Terraform\n- GitHub Actions\n- Kubernetes\n\n### The Workflow\nCommit, Test, Deploy. Repeat.',
            author: 'Alex River',
            category: 'Business',
            tags: ['DevOps', 'Startups', 'Cloud'],
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
            date: '2026-05-21',
            readTime: '11 min',
            views: 2400,
            likes: 310,
            comments: []
        },
        {
            id: '9',
            title: 'The Future of Cybersecurity in the Quantum Era',
            excerpt: 'How quantum computing will challenge our current encryption standards and the steps we must take to secure the data of tomorrow.',
            content: '# Quantum Cybersecurity\n\nQuantum computers pose a significant threat to classical encryption (RSA, ECC). In 2026, we are entering the era of Post-Quantum Cryptography (PQC).\n\n## The Threat\nQuantum algorithms can solve the mathematical problems that protect our bank accounts and private data in seconds.\n\n## The Solution\nLattice-based cryptography is the current frontrunner for quantum-resistant algorithms.',
            author: 'Nikhil Kashyap',
            category: 'Technology',
            tags: ['Security', 'Quantum', 'Future'],
            thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
            date: '2026-05-10',
            readTime: '15 min',
            views: 5600,
            likes: 915,
            comments: []
        },
        {
            id: '10',
            title: 'Growth Marketing Strategies for Indieland',
            excerpt: 'How to build a sustainable user base for your indie project without a massive advertising budget.',
            content: '# Indie Growth Marketing\n\nMarketing for indies is about building in public and creating genuine connections.\n\n### 1. Build in Public\nShare your journey on Twitter and LinkedIn. People buy from people, not companies.\n\n### 2. SEO Content\nWrite helpful guides like this one to attract organic traffic.',
            author: 'Sarah Chen',
            category: 'Business',
            tags: ['Marketing', 'IndieHackers'],
            thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
            date: '2026-05-08',
            readTime: '7 min',
            views: 3120,
            likes: 423,
            comments: []
        },
        {
            id: '11',
            title: 'Introduction to Generative Design',
            excerpt: 'Exploring how algorithms are being used to create optimized, organic-looking architecture and products.',
            content: '# Generative Design\n\nGenerative design is a design process that uses algorithms to generate a range of solutions that meet a set of constraints.\n\n![Design](https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800)\n\n### Applications\n- Aerospace components\n- Furniture design\n- Generative art',
            author: 'Sarah Chen',
            category: 'Design',
            tags: ['GenerativeDesign', 'AI', 'Art'],
            thumbnail: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
            date: '2026-05-05',
            readTime: '9 min',
            views: 2400,
            likes: 310,
            comments: []
        },
        {
            id: '12',
            title: 'Data Science with Python: A 2026 Roadmap',
            excerpt: 'The essential libraries and techniques you need to know to become a data scientist in the current market.',
            content: '# Data Science Roadmap\n\nPython continues to dominate the data science landscape. Here is what you need to master in 2026.\n\n## 1. Deep Learning\nPyTorch and JAX are the industry standards for training custom models.\n\n## 2. Data Engineering\nScaling data pipelines with DuckDB and Polars.',
            author: 'Alex River',
            category: 'Technology',
            tags: ['Python', 'DataScience', 'AI'],
            thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
            date: '2026-05-01',
            readTime: '13 min',
            views: 4800,
            likes: 720,
            comments: []
        },
        {
            id: '13',
            title: 'Mental Health in the Tech Industry',
            excerpt: 'Breaking the silence on burnout and stress in high-pressure development environments.',
            content: '# Mental Health in Tech\n\nBurnout is real. Here is how to spot the signs and take action.\n\n### Signs of Burnout\n- Chronic fatigue\n- Reduced professional efficacy\n- Cynicism toward work\n\n### Self-Care\nSet boundaries. Turn off Slack after hours.',
            author: 'Jason Smyth',
            category: 'Lifestyle',
            tags: ['MentalHealth', 'Wellness', 'TechLife'],
            thumbnail: 'https://images.unsplash.com/photo-1499209974431-9dac3adaf471?auto=format&fit=crop&q=80&w=800',
            date: '2026-04-28',
            readTime: '6 min',
            views: 5200,
            likes: 1100,
            comments: []
        },
        {
            id: '14',
            title: 'The Impact of 5G on Mobile Web Experiences',
            excerpt: 'How ultra-fast connectivity is changing the way we design and build mobile applications.',
            content: '# 5G and the Mobile Web\n\nWith 5G becoming the standard, we can now deliver high-fidelity experiences on mobile that were previously impossible.\n\n## Real-time Rendering\nCloud-based rendering for complex 3D scenes on low-power mobile devices.',
            author: 'Nikhil Kashyap',
            category: 'Technology',
            tags: ['5G', 'Mobile', 'WebDev'],
            thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800',
            date: '2026-04-25',
            readTime: '5 min',
            views: 2900,
            likes: 420,
            comments: []
        },
        {
            id: '15',
            title: 'Sustainable Architecture in the Modern World',
            excerpt: 'Redesigning our cities to be more eco-friendly and energy-efficient.',
            content: '# Sustainable Architecture\n\nBuildings account for a large portion of carbon emissions. We must design with sustainability in mind.\n\n## Green Materials\n- Recycled steel\n- Cross-laminated timber\n- Bamboo',
            author: 'Sarah Chen',
            category: 'Design',
            tags: ['Sustainability', 'Architecture', 'Eco'],
            thumbnail: 'https://images.unsplash.com/photo-1518005020251-098c18765ba1?auto=format&fit=crop&q=80&w=800',
            date: '2026-04-20',
            readTime: '8 min',
            views: 1800,
            likes: 290,
            comments: []
        },
        {
            id: '16',
            title: 'Mastering the Git Workflow in Large Teams',
            excerpt: 'Strategies for managing complex codebases with hundreds of contributors.',
            content: '# Advanced Git Workflow\n\nGit Flow vs Trunk-Based Development. Which one should your team use?\n\n### Trunk-Based Development\nFaster releases, fewer merge conflicts, but requires high test coverage.',
            author: 'Alex River',
            category: 'Development',
            tags: ['Git', 'DevOps', 'Teams'],
            thumbnail: 'https://images.unsplash.com/photo-1556075798-4825dfabb16e?auto=format&fit=crop&q=80&w=800',
            date: '2026-04-15',
            readTime: '10 min',
            views: 6300,
            likes: 850,
            comments: []
        },
        {
            id: '17',
            title: 'The Psychology of Color in UI/UX Design',
            excerpt: 'How different colors evoke different emotions and influence user behavior.',
            content: '# Color Psychology\n\nBlue for trust, Red for urgency, Green for growth. How do you choose your palette?\n\n### Accessible Colors\nAlways ensure high contrast for better visibility.',
            author: 'Sarah Chen',
            category: 'Design',
            tags: ['ColorTheory', 'UI', 'Psychology'],
            thumbnail: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&q=80&w=800',
            date: '2026-04-10',
            readTime: '7 min',
            views: 4200,
            likes: 670,
            comments: []
        },
        {
            id: '18',
            title: 'Building Inclusive Communities Online',
            excerpt: 'Creating safe and welcoming spaces for people from all backgrounds to connect and share.',
            content: '# Inclusive Communities\n\nCommunity is the heart of the internet. How do we make sure everyone feels welcome?\n\n### Moderation Patterns\nProactive moderation and clear codes of conduct.',
            author: 'Jason Smyth',
            category: 'Lifestyle',
            tags: ['Community', 'Inclusion', 'Social'],
            thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
            date: '2026-04-05',
            readTime: '6 min',
            views: 2100,
            likes: 380,
            comments: []
        },
        {
            id: '19',
            title: 'The Power of Storytelling in Product Development',
            excerpt: 'Why narrative is the key to building products that people truly connect with.',
            content: '# Narrative-Driven Design\n\nDon\'t just build features, tell a story. Users respond to narratives that solve their problems.',
            author: 'Nikhil Kashyap',
            category: 'Business',
            tags: ['Product', 'Storytelling', 'Strategy'],
            thumbnail: 'https://images.unsplash.com/photo-1512486133939-0c84eca01b22?auto=format&fit=crop&q=80&w=800',
            date: '2026-04-01',
            readTime: '9 min',
            views: 3500,
            likes: 490,
            comments: []
        },
        {
            id: '20',
            title: 'Navigating Your Career in the AI Era',
            excerpt: 'How to adapt and thrive in an ever-evolving job market shifted by automation.',
            content: '# AI Career Strategy\n\nAdaptability is the new stability. Focus on the skills that AI cannot easily replicate: Creativity, Emotional Intelligence, and Strategic Thinking.',
            author: 'Jason Smyth',
            category: 'Lifestyle',
            tags: ['Career', 'AI', 'FutureOfWork'],
            thumbnail: 'https://images.unsplash.com/photo-1454165833762-b196565460a8?auto=format&fit=crop&q=80&w=800',
            date: '2026-03-28',
            readTime: '11 min',
            views: 7800,
            likes: 1240,
            comments: []
        }
    ],
    categories: ['Technology', 'Design', 'Development', 'Lifestyle', 'Business'],
    topAuthors: [
        { name: 'Nikhil Kashyap', followers: '12.4k', avatar: 'N', role: 'Architect' },
        { name: 'Sarah Chen', followers: '8.2k', avatar: 'S', role: 'UI Lead' },
        { name: 'Alex River', followers: '5.1k', avatar: 'A', role: 'DevOps' },
        { name: 'Jason Smyth', followers: '3.9k', avatar: 'J', role: 'Writer' }
    ],
    users: [
        { id: 'admin', username: 'Admin', role: 'admin', email: 'admin@gmail.com', password: 'admin@123' }
    ]
};

const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin@123';

class BlogState {
    constructor() {
        this.init();
    }

    init() {
        const stored = localStorage.getItem('niks_blog_data');
        if (!stored) {
            localStorage.setItem('niks_blog_data', JSON.stringify(INITIAL_DATA));
            this.data = structuredClone(INITIAL_DATA);
            return;
        }

        try {
            this.data = JSON.parse(stored);
            if (!this.data?.posts || !Array.isArray(this.data.posts)) {
                throw new Error('Invalid blog data');
            }
        } catch {
            localStorage.setItem('niks_blog_data', JSON.stringify(INITIAL_DATA));
            this.data = structuredClone(INITIAL_DATA);
        }

        this._ensureAdminUser();

        // Migration: ensure posts have comments array
        let migrated = false;
        this.data.posts.forEach(post => {
            if (!Array.isArray(post.comments)) {
                post.comments = [];
                migrated = true;
            }
        });
        if (migrated) this.save();

        this._ensureEditorialContent();
        this._removeUserData('harshadip');
    }

    _ensureEditorialContent() {
        const extras = [
            {
                id: '21',
                title: 'Building a Professional Blog in 2026: A Practical Guide',
                excerpt: 'From choosing your stack to publishing your first story — a step-by-step guide for creators who want a polished, reader-first experience.',
                content: '# Building a Professional Blog in 2026\n\nA professional publication starts with clarity: who you write for, what problems you solve, and how readers discover your work.\n\n## Start with structure\n\n- Define 3–5 core categories\n- Write a consistent author bio\n- Use clear headlines and excerpts\n\n## Publish with confidence\n\nMarkdown, previews, and organized dashboards help you focus on ideas — not tooling.',
                author: 'Nikhil Kashyap',
                category: 'Business',
                tags: ['Publishing', 'Guide', 'Creators'],
                thumbnail: 'https://images.unsplash.com/photo-1456324504439-367cee3b3a32?auto=format&fit=crop&q=80&w=800',
                date: '2026-05-25',
                readTime: '7 min',
                views: 2100,
                likes: 340,
                comments: []
            },
            {
                id: '22',
                title: 'UX Writing: How Great Products Speak to Users',
                excerpt: 'Microcopy, error messages, and onboarding flows — why the words inside your product matter as much as the interface.',
                content: '# UX Writing\n\nGreat UX writing is invisible. Users complete tasks without friction because the language guides them.\n\n## Principles\n\n1. **Be concise** — one idea per sentence\n2. **Be human** — avoid jargon where possible\n3. **Be consistent** — same terms across the product',
                author: 'Sarah Chen',
                category: 'Design',
                tags: ['UX', 'Writing', 'Product'],
                thumbnail: 'https://images.unsplash.com/photo-1586717791821-3f44a399ba4f?auto=format&fit=crop&q=80&w=800',
                date: '2026-05-26',
                readTime: '6 min',
                views: 1850,
                likes: 290,
                comments: []
            },
            {
                id: '23',
                title: 'TypeScript Best Practices for Maintainable Apps',
                excerpt: 'Strict typing, shared interfaces, and folder structure patterns that keep frontend codebases scalable as teams grow.',
                content: '# TypeScript Best Practices\n\nTypeScript pays off when conventions are shared across the team.\n\n```typescript\ninterface Post {\n  id: string;\n  title: string;\n  publishedAt: string;\n}\n```\n\nInvest in types at boundaries: API responses, form state, and shared utilities.',
                author: 'Alex River',
                category: 'Development',
                tags: ['TypeScript', 'Frontend', 'BestPractices'],
                thumbnail: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?auto=format&fit=crop&q=80&w=800',
                date: '2026-05-26',
                readTime: '9 min',
                views: 3200,
                likes: 510,
                comments: []
            }
        ];

        let added = false;
        extras.forEach(post => {
            if (!this.data.posts.some(p => p.id === post.id)) {
                this.data.posts.unshift(post);
                added = true;
            }
        });
        if (added) this.save();
    }

    getSiteStats() {
        const posts = this.getPosts();
        const users = (this.data.users || []).filter(u => u.role !== 'admin');
        const totalViews = posts.reduce((sum, p) => sum + (p.views || 0), 0);
        return {
            posts: posts.length,
            authors: users.length + (this.data.topAuthors?.length || 0),
            readers: Math.max(users.length * 120, posts.length * 85),
            totalViews
        };
    }

    _userMatchesQuery(user, query) {
        if (!user || !query) return false;
        const q = query.toLowerCase();
        return [user.username, user.email, user.id]
            .filter(Boolean)
            .some(value => String(value).toLowerCase().includes(q));
    }

    _purgeUserLocalData(userId) {
        if (!userId) return;
        localStorage.removeItem(this._userStorageKey(userId, 'reading'));
        localStorage.removeItem(this._userStorageKey(userId, 'bookmarks'));
    }

    deleteUserByQuery(query) {
        const users = this.data.users.filter(u => this._userMatchesQuery(u, query));
        if (users.length === 0) return 0;

        users.forEach(user => {
            this.data.posts = this.data.posts.filter(
                p => p.authorId !== user.id && p.author !== user.username
            );

            this.data.posts.forEach(post => {
                if (!post.comments) return;
                post.comments = post.comments.filter(
                    c => !this._userMatchesQuery({ username: c.author, email: c.author }, query)
                );
            });

            this._purgeUserLocalData(user.id);
        });

        this.data.users = this.data.users.filter(u => !this._userMatchesQuery(u, query));

        const session = this.getCurrentUser();
        if (session && this._userMatchesQuery(session, query)) {
            this.logout();
        }

        const rememberEmail = localStorage.getItem('niks_remember_email');
        if (rememberEmail && rememberEmail.toLowerCase().includes(query.toLowerCase())) {
            localStorage.removeItem('niks_remember_email');
        }

        try {
            const subscribers = JSON.parse(localStorage.getItem('niks_newsletter') || '[]');
            const filtered = subscribers.filter(
                email => !String(email).toLowerCase().includes(query.toLowerCase())
            );
            if (filtered.length !== subscribers.length) {
                localStorage.setItem('niks_newsletter', JSON.stringify(filtered));
            }
        } catch { /* ignore */ }

        this.save();
        return users.length;
    }

    _removeUserData(query) {
        this.deleteUserByQuery(query);
    }

    save() {
        try {
            localStorage.setItem('niks_blog_data', JSON.stringify(this.data));
        } catch (err) {
            console.error('Failed to save blog data:', err);
        }
    }

    _sanitizeUser(user) {
        if (!user) return null;
        const { password, ...safeUser } = user;
        return safeUser;
    }

    _ensureAdminUser() {
        if (!this.data.users) this.data.users = [];

        let admin = this.data.users.find(u => u.role === 'admin');
        if (!admin) {
            admin = this.data.users.find(u => u.id === 'admin');
        }

        if (!admin) {
            this.data.users.push({
                id: 'admin',
                username: 'Admin',
                role: 'admin',
                email: ADMIN_EMAIL,
                password: ADMIN_PASSWORD
            });
            this.save();
            return;
        }

        admin.email = ADMIN_EMAIL;
        admin.password = ADMIN_PASSWORD;
        admin.role = 'admin';
        admin.username = admin.username || 'Admin';
        this.save();
    }

    getUserStoryCount(user) {
        return this.getPostsByUser(user).length;
    }

    // Post Methods
    getPosts() {
        return this.data.posts;
    }

    getPostById(id) {
        return this.data.posts.find(p => p.id === id);
    }

    addPost(post) {
        post.id = Date.now().toString();
        post.date = new Date().toISOString().split('T')[0];
        if (!Array.isArray(post.comments)) post.comments = [];
        if (!Array.isArray(post.tags)) post.tags = [];
        this.data.posts.unshift(post);
        this.save();
        return post;
    }

    updatePost(id, updatedData) {
        const index = this.data.posts.findIndex(p => p.id === id);
        if (index !== -1) {
            this.data.posts[index] = { ...this.data.posts[index], ...updatedData };
            this.save();
        }
    }

    deletePost(id) {
        this.data.posts = this.data.posts.filter(p => p.id !== id);
        this.save();
    }

    // Search and Filter
    searchPosts(query) {
        const q = query.toLowerCase();
        return this.data.posts.filter(p => 
            p.title.toLowerCase().includes(q) || 
            p.excerpt.toLowerCase().includes(q) ||
            p.tags.some(t => t.toLowerCase().includes(q))
        );
    }

    filterByCategory(category) {
        if (!category || category === 'All') return this.data.posts;
        return this.data.posts.filter(p => p.category === category);
    }

    addComment(postId, content, author = 'Anonymous Reader') {
        const post = this.getPostById(postId);
        if (!post || !content?.trim()) return null;

        const comment = {
            id: Date.now().toString(),
            content: content.trim(),
            author,
            date: new Date().toISOString()
        };
        post.comments.push(comment);
        this.save();
        return comment;
    }

    incrementViews(postId) {
        const viewedKey = `niks_viewed_${postId}`;
        if (sessionStorage.getItem(viewedKey)) return;

        const post = this.getPostById(postId);
        if (!post) return;

        post.views = (post.views || 0) + 1;
        this.save();
        sessionStorage.setItem(viewedKey, '1');
    }

    // Authentication
    login(email, password) {
        const user = this.data.users.find(u => u.email === email && u.password === password);
        if (user) {
            const safeUser = this._sanitizeUser(user);
            localStorage.setItem('niks_current_user', JSON.stringify(safeUser));
            return safeUser;
        }
        return null;
    }

    logout() {
        localStorage.removeItem('niks_current_user');
    }

    register(userData) {
        if (this.data.users.some(u => u.email === userData.email)) {
            return null;
        }

        const newUser = {
            id: Date.now().toString(),
            role: 'user',
            joinedAt: new Date().toISOString().split('T')[0],
            ...userData
        };
        this.data.users.push(newUser);
        this.save();
        this.seedUserStarterData(newUser);
        const safeUser = this._sanitizeUser(newUser);
        localStorage.setItem('niks_current_user', JSON.stringify(safeUser));
        return safeUser;
    }

    _seededFlagKey(userId) {
        return `niks_seeded_${userId}`;
    }

    seedUserStarterData(user) {
        if (!user || user.role === 'admin') return;

        const posts = [...this.getPosts()].sort((a, b) => new Date(b.date) - new Date(a.date));
        if (posts.length === 0) return;

        const daysAgo = (n) => new Date(Date.now() - n * 86400000).toISOString();

        const readPosts = posts.slice(0, 3);
        const history = readPosts.map((post, i) => ({
            postId: post.id,
            title: post.title,
            thumbnail: post.thumbnail,
            date: daysAgo(i + 1)
        }));
        localStorage.setItem(this._userStorageKey(user.id, 'reading'), JSON.stringify(history));

        const bookmarkSources = [posts[0], posts[2] || posts[1]].filter(Boolean);
        const uniqueBookmarks = [...new Map(bookmarkSources.map(p => [p.id, p])).values()];
        const bookmarks = uniqueBookmarks.map((post, i) => ({
            postId: post.id,
            title: post.title,
            thumbnail: post.thumbnail,
            date: daysAgo(i)
        }));
        localStorage.setItem(this._userStorageKey(user.id, 'bookmarks'), JSON.stringify(bookmarks));

        if (this.getPostsByUser(user).length === 0) {
            const sampleThumb = posts[0]?.thumbnail
                || 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800';

            this.addUserPost(user, {
                title: `Getting Started — A Note from ${user.username}`,
                category: 'Lifestyle',
                content: `# Welcome to Niks Blog\n\nHi, I'm **${user.username}**. I just joined Niks Blog CMS and I'm excited to read and share stories here.\n\n## What I'm exploring\n\n- Technology and design articles\n- Tips for productive remote work\n- Community discussions in the comments\n\nThanks for stopping by — more stories coming soon!`,
                excerpt: `Hi, I'm ${user.username}. I just joined Niks Blog and I'm excited to read and share stories here.`,
                thumbnail: sampleThumb,
                readTime: '3 min',
                tags: ['Welcome', 'Introduction']
            });
        }

        localStorage.setItem(this._seededFlagKey(user.id), '1');
    }

    ensureUserStarterData(user) {
        if (!user || user.role === 'admin') return;

        if (localStorage.getItem(this._seededFlagKey(user.id))) return;

        const hasActivity =
            this.getReadingHistory(user.id).length > 0 ||
            this.getBookmarks(user.id).length > 0 ||
            this.getPostsByUser(user).length > 0;

        if (hasActivity) {
            localStorage.setItem(this._seededFlagKey(user.id), '1');
            return;
        }

        this.seedUserStarterData(user);
    }

    getCurrentUser() {
        const stored = localStorage.getItem('niks_current_user');
        if (!stored) return null;
        try {
            const session = JSON.parse(stored);
            const fresh = this.data.users.find(
                u => u.id === session.id || u.email === session.email
            );
            if (fresh) {
                const safeUser = this._sanitizeUser(fresh);
                localStorage.setItem('niks_current_user', JSON.stringify(safeUser));
                return safeUser;
            }
            return session;
        } catch {
            localStorage.removeItem('niks_current_user');
            return null;
        }
    }

    isAuthenticated() {
        return !!this.getCurrentUser();
    }

    isAdmin() {
        const user = this.getCurrentUser();
        return user?.role === 'admin' || user?.email === ADMIN_EMAIL;
    }

    getDashboardPath(relativeToAuth = false) {
        const prefix = relativeToAuth ? '..' : '';
        if (!this.isAuthenticated()) {
            return `${prefix}auth/login.html`;
        }
        return this.isAdmin()
            ? `${prefix}admin/dashboard.html`
            : `${prefix}user/dashboard.html`;
    }

    getPostsByUser(user) {
        if (!user) return [];
        return this.data.posts.filter(p =>
            p.authorId === user.id || p.author === user.username
        );
    }

    getAllComments() {
        const items = [];
        this.data.posts.forEach(post => {
            (post.comments || []).forEach(comment => {
                items.push({ ...comment, postId: post.id, postTitle: post.title });
            });
        });
        return items.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    _userStorageKey(userId, key) {
        return `niks_${key}_${userId}`;
    }

    getReadingHistory(userId) {
        try {
            return JSON.parse(localStorage.getItem(this._userStorageKey(userId, 'reading')) || '[]');
        } catch {
            return [];
        }
    }

    addToReadingHistory(userId, post) {
        if (!userId || !post) return;
        const history = this.getReadingHistory(userId).filter(h => h.postId !== post.id);
        history.unshift({
            postId: post.id,
            title: post.title,
            thumbnail: post.thumbnail,
            date: new Date().toISOString()
        });
        localStorage.setItem(
            this._userStorageKey(userId, 'reading'),
            JSON.stringify(history.slice(0, 20))
        );
    }

    getBookmarks(userId) {
        try {
            return JSON.parse(localStorage.getItem(this._userStorageKey(userId, 'bookmarks')) || '[]');
        } catch {
            return [];
        }
    }

    isBookmarked(userId, postId) {
        return this.getBookmarks(userId).some(b => b.postId === postId);
    }

    toggleBookmark(userId, post) {
        if (!userId || !post) return false;
        let bookmarks = this.getBookmarks(userId);
        const exists = bookmarks.some(b => b.postId === post.id);
        if (exists) {
            bookmarks = bookmarks.filter(b => b.postId !== post.id);
        } else {
            bookmarks.unshift({
                postId: post.id,
                title: post.title,
                thumbnail: post.thumbnail,
                date: new Date().toISOString()
            });
        }
        localStorage.setItem(this._userStorageKey(userId, 'bookmarks'), JSON.stringify(bookmarks));
        return !exists;
    }

    deleteUserPost(postId, user) {
        const post = this.getPostById(postId);
        if (!post || !user) return false;
        if (post.authorId !== user.id && post.author !== user.username) return false;
        this.deletePost(postId);
        return true;
    }

    addUserPost(user, postData) {
        const post = {
            ...postData,
            authorId: user.id,
            author: user.username,
            tags: postData.tags || [],
            comments: [],
            views: 0,
            likes: 0
        };
        return this.addPost(post);
    }

    updateUserPost(postId, user, updatedData) {
        const post = this.getPostById(postId);
        if (!post || !user) return false;
        if (post.authorId !== user.id && post.author !== user.username) return false;
        this.updatePost(postId, updatedData);
        return true;
    }
}

const state = new BlogState();
export default state;
export { state };
