// Dynamic Portfolio Enhancements for GitHub Pages
// This script adds dynamic functionality without requiring server-side hosting

class DynamicPortfolio {
    constructor() {
        this.initializeFeatures();
        this.setupEventListeners();
    }

    // 🚀 Dynamic GitHub Projects Integration
    async fetchGitHubProjects() {
        try {
            const response = await fetch('https://api.github.com/users/sksazid01/repos');
            const repos = await response.json();
            
            // Filter and sort repositories
            const filteredRepos = repos
                .filter(repo => !repo.fork && !repo.archived)
                .sort((a, b) => b.stargazers_count - a.stargazers_count)
                .slice(0, 6); // Top 6 repositories
            
            this.updateProjectsSection(filteredRepos);
            this.createGitHubStats(repos);
            
        } catch (error) {
            console.log('GitHub API rate limit reached, using fallback data');
            this.loadFallbackProjects();
        }
    }

    updateProjectsSection(repos) {
        const projectsContainer = document.querySelector('#projects .grid');
        if (!projectsContainer) return;

        const dynamicProjects = repos.map(repo => this.createProjectCard(repo)).join('');
        
        // Add dynamic projects after existing ones
        const dynamicSection = document.createElement('div');
        dynamicSection.className = 'col-span-full mt-8';
        dynamicSection.innerHTML = `
            <h3 class="text-2xl font-bold text-center mb-8 text-gray-800 dark:text-white">
                🔥 Live GitHub Projects
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${dynamicProjects}
            </div>
        `;
        
        projectsContainer.appendChild(dynamicSection);
    }

    createProjectCard(repo) {
        const topics = repo.topics?.slice(0, 3) || [];
        const lastUpdated = new Date(repo.updated_at).toLocaleDateString();
        
        return `
            <div class="dynamic-project-card bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:scale-105">
                <div class="flex items-start justify-between mb-4">
                    <h4 class="text-lg font-semibold text-gray-800 dark:text-white truncate">${repo.name}</h4>
                    <div class="flex items-center gap-2 text-sm text-gray-500">
                        <span class="flex items-center gap-1">
                            ⭐ ${repo.stargazers_count}
                        </span>
                        <span class="flex items-center gap-1">
                            🍴 ${repo.forks_count}
                        </span>
                    </div>
                </div>
                
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    ${repo.description || 'No description available'}
                </p>
                
                <div class="flex flex-wrap gap-2 mb-4">
                    ${repo.language ? `<span class="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-xs">${repo.language}</span>` : ''}
                    ${topics.map(topic => `<span class="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs">${topic}</span>`).join('')}
                </div>
                
                <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">Updated: ${lastUpdated}</span>
                    <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" 
                       class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-xs hover:shadow-md transition-all">
                        View Code
                    </a>
                </div>
            </div>
        `;
    }

    // 📊 Real-time GitHub Stats
    async createGitHubStats(repos) {
        const stats = {
            totalRepos: repos.length,
            totalStars: repos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
            totalForks: repos.reduce((sum, repo) => sum + repo.forks_count, 0),
            languages: this.getTopLanguages(repos),
            lastCommit: this.getRecentActivity(repos)
        };

        this.addStatsWidget(stats);
    }

    getTopLanguages(repos) {
        const languages = {};
        repos.forEach(repo => {
            if (repo.language) {
                languages[repo.language] = (languages[repo.language] || 0) + 1;
            }
        });
        
        return Object.entries(languages)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5);
    }

    getRecentActivity(repos) {
        const recent = repos
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))[0];
        
        return recent ? new Date(recent.updated_at).toLocaleDateString() : 'N/A';
    }

    addStatsWidget(stats) {
        const aboutSection = document.querySelector('#about .max-w-6xl');
        if (!aboutSection) return;

        const statsWidget = document.createElement('div');
        statsWidget.className = 'mt-12 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8';
        statsWidget.innerHTML = `
            <h3 class="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                📈 Live GitHub Stats
            </h3>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div class="text-center">
                    <div class="text-3xl font-bold text-blue-600 dark:text-blue-400">${stats.totalRepos}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Repositories</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-green-600 dark:text-green-400">${stats.totalStars}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Stars Earned</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-purple-600 dark:text-purple-400">${stats.totalForks}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Forks</div>
                </div>
                <div class="text-center">
                    <div class="text-3xl font-bold text-orange-600 dark:text-orange-400">${stats.languages.length}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400">Languages</div>
                </div>
            </div>
            
            <div class="mt-6 text-center">
                <div class="flex flex-wrap justify-center gap-2">
                    ${stats.languages.map(([lang, count]) => 
                        `<span class="px-3 py-1 bg-white dark:bg-gray-700 rounded-full text-sm font-medium shadow-sm">
                            ${lang} (${count})
                        </span>`
                    ).join('')}
                </div>
                <p class="text-sm text-gray-500 mt-2">Last activity: ${stats.lastCommit}</p>
            </div>
        `;

        aboutSection.appendChild(statsWidget);
    }

    // 🎯 Dynamic Visitor Counter
    async initializeVisitorCounter() {
        try {
            const response = await fetch('https://api.countapi.xyz/hit/sksazid-portfolio/visits');
            const data = await response.json();
            this.displayVisitorCount(data.value);
        } catch (error) {
            // Fallback to localStorage counter
            const visits = parseInt(localStorage.getItem('portfolio-visits') || '0') + 1;
            localStorage.setItem('portfolio-visits', visits.toString());
            this.displayVisitorCount(visits);
        }
    }

    displayVisitorCount(count) {
        const footer = document.querySelector('footer .max-w-6xl');
        if (!footer) return;

        const visitorWidget = document.createElement('div');
        visitorWidget.className = 'text-center mt-4 p-3 bg-blue-50 dark:bg-gray-800 rounded-lg';
        visitorWidget.innerHTML = `
            <p class="text-sm text-gray-600 dark:text-gray-400">
                👥 Portfolio Views: <span class="font-bold text-blue-600 dark:text-blue-400">${count.toLocaleString()}</span>
            </p>
        `;

        footer.insertBefore(visitorWidget, footer.lastElementChild);
    }

    // 📧 Dynamic Contact Form with External Service
    enhanceContactForm() {
        const contactForm = document.querySelector('#contact form');
        if (!contactForm) return;

        // Add Formspree integration
        contactForm.action = 'https://formspree.io/f/xjkwpwgr'; // Replace with your Formspree endpoint
        contactForm.method = 'POST';

        // Add dynamic feedback
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            submitButton.innerHTML = '⏳ Sending...';
            submitButton.disabled = true;

            try {
                const formData = new FormData(contactForm);
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    this.showFormFeedback('✅ Message sent successfully!', 'success');
                    contactForm.reset();
                } else {
                    this.showFormFeedback('❌ Failed to send message. Please try again.', 'error');
                }
            } catch (error) {
                this.showFormFeedback('❌ Network error. Please try again later.', 'error');
            }

            submitButton.innerHTML = originalText;
            submitButton.disabled = false;
        });
    }

    showFormFeedback(message, type) {
        const feedback = document.createElement('div');
        feedback.className = `mt-4 p-4 rounded-lg ${type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`;
        feedback.textContent = message;

        const form = document.querySelector('#contact form');
        form.appendChild(feedback);

        setTimeout(() => feedback.remove(), 5000);
    }

    // 🌐 Dynamic Content Loading
    async loadDynamicContent() {
        try {
            // Load latest blog posts from GitHub Issues (as blog)
            await this.loadBlogPosts();
            
            // Load coding activity
            await this.loadCodingActivity();
            
        } catch (error) {
            console.log('External content loading failed, using static content');
        }
    }

    async loadBlogPosts() {
        try {
            const response = await fetch('https://api.github.com/repos/sksazid01/portfolio-blog/issues?state=open&labels=blog');
            const issues = await response.json();
            
            if (issues.length > 0) {
                this.createBlogSection(issues.slice(0, 3));
            }
        } catch (error) {
            console.log('Blog posts not available');
        }
    }

    createBlogSection(posts) {
        const contactSection = document.querySelector('#contact');
        if (!contactSection) return;

        const blogSection = document.createElement('section');
        blogSection.className = 'py-20 px-4 sm:px-6 lg:px-8 bg-gray-50/50 dark:bg-gray-900/50';
        blogSection.innerHTML = `
            <div class="max-w-6xl mx-auto">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-bold mb-4">
                        <span class="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                            📝 Latest Blog Posts
                        </span>
                    </h2>
                    <p class="text-xl text-gray-600 dark:text-gray-400">
                        Thoughts, tutorials, and insights from my development journey
                    </p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    ${posts.map(post => this.createBlogCard(post)).join('')}
                </div>
            </div>
        `;

        contactSection.parentNode.insertBefore(blogSection, contactSection);
    }

    createBlogCard(post) {
        const date = new Date(post.created_at).toLocaleDateString();
        const preview = post.body ? post.body.substring(0, 150) + '...' : 'Click to read more...';

        return `
            <div class="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                <h3 class="text-xl font-semibold mb-3 text-gray-800 dark:text-white">${post.title}</h3>
                <p class="text-gray-600 dark:text-gray-400 text-sm mb-4">${preview}</p>
                <div class="flex items-center justify-between">
                    <span class="text-xs text-gray-500">${date}</span>
                    <a href="${post.html_url}" target="_blank" rel="noopener noreferrer"
                       class="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-4 py-2 rounded-full text-sm hover:shadow-md transition-all">
                        Read More
                    </a>
                </div>
                <div class="flex flex-wrap gap-2 mt-3">
                    ${post.labels.map(label => 
                        `<span class="px-2 py-1 bg-${label.color}/20 text-${label.color} rounded-full text-xs">${label.name}</span>`
                    ).join('')}
                </div>
            </div>
        `;
    }

    // ⚡ Real-time Features
    initializeRealTimeFeatures() {
        // Dynamic time display
        this.updateCurrentTime();
        setInterval(() => this.updateCurrentTime(), 60000); // Update every minute

        // Typing animation for hero section
        this.initializeTypingAnimation();

        // Dynamic skill progress bars
        this.animateSkillBars();

        // Live weather widget (optional)
        this.addWeatherWidget();
    }

    updateCurrentTime() {
        const timeElement = document.createElement('div');
        timeElement.className = 'fixed top-4 right-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg text-sm font-medium z-40';
        
        const now = new Date();
        const time = now.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            timeZone: 'Asia/Dhaka'
        });
        
        timeElement.innerHTML = `🇧🇩 ${time} (Dhaka)`;

        // Remove existing time display
        const existing = document.querySelector('.current-time');
        if (existing) existing.remove();
        
        timeElement.className += ' current-time';
        document.body.appendChild(timeElement);
    }

    initializeTypingAnimation() {
        const heroTitle = document.querySelector('#home h1 span');
        if (!heroTitle) return;

        const texts = [
            'Md Ahasanul Haque',
            'Full Stack Developer',
            'Problem Solver',
            'Tech Enthusiast'
        ];

        let currentIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const typeText = () => {
            const currentText = texts[currentIndex];
            
            if (isDeleting) {
                heroTitle.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                heroTitle.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                setTimeout(() => { isDeleting = true; }, 2000);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentIndex = (currentIndex + 1) % texts.length;
            }

            setTimeout(typeText, isDeleting ? 50 : 100);
        };

        // Start typing animation after initial load
        setTimeout(typeText, 2000);
    }

    async addWeatherWidget() {
        try {
            // Using a free weather API (replace with your preferred service)
            const response = await fetch('https://api.openweathermap.org/data/2.5/weather?q=Sylhet,BD&appid=demo&units=metric');
            const data = await response.json();
            
            if (data.main) {
                this.displayWeatherWidget(data);
            }
        } catch (error) {
            // Weather widget is optional, fail silently
            console.log('Weather data not available');
        }
    }

    displayWeatherWidget(data) {
        const widget = document.createElement('div');
        widget.className = 'fixed bottom-4 left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg z-40';
        widget.innerHTML = `
            <div class="flex items-center gap-3">
                <div class="text-2xl">${this.getWeatherIcon(data.weather[0].main)}</div>
                <div>
                    <div class="font-semibold text-gray-800 dark:text-white">${Math.round(data.main.temp)}°C</div>
                    <div class="text-xs text-gray-600 dark:text-gray-400">Sylhet, BD</div>
                </div>
            </div>
        `;

        document.body.appendChild(widget);
    }

    getWeatherIcon(condition) {
        const icons = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️'
        };
        return icons[condition] || '🌤️';
    }

    // 🎨 Dynamic Theme Enhancements
    enhanceThemeSystem() {
        // Add theme persistence
        const savedTheme = localStorage.getItem('portfolio-theme');
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        }

        // Enhanced theme toggle
        const themeButton = document.querySelector('button[title="Toggle Sound Effects"]')?.nextElementSibling;
        if (themeButton) {
            themeButton.addEventListener('click', () => {
                const isDark = document.documentElement.classList.toggle('dark');
                localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
                
                // Add smooth transition effect
                document.body.style.transition = 'background-color 0.3s ease';
                setTimeout(() => {
                    document.body.style.transition = '';
                }, 300);
            });
        }

        // Auto theme based on system preference
        if (!savedTheme) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDark) {
                document.documentElement.classList.add('dark');
            }
        }
    }

    // 🔄 Initialize all features
    async initializeFeatures() {
        console.log('🚀 Initializing dynamic portfolio features...');

        // Core dynamic features
        await this.fetchGitHubProjects();
        await this.initializeVisitorCounter();
        this.enhanceContactForm();
        
        // Real-time enhancements
        this.initializeRealTimeFeatures();
        this.enhanceThemeSystem();
        
        // Content loading
        await this.loadDynamicContent();

        console.log('✅ Dynamic features initialized successfully!');
    }

    setupEventListeners() {
        // Intersection Observer for animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fade-in-up');
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        // Enhanced scroll effects
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;

        // Parallax effect for hero section
        const hero = document.querySelector('#home');
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }

        // Dynamic navbar background
        const navbar = document.querySelector('header');
        if (navbar) {
            if (scrolled > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }
    }

    // Fallback data for offline mode
    loadFallbackProjects() {
        const fallbackProjects = [
            {
                name: 'Portfolio-Website',
                description: 'Modern React portfolio with dynamic features',
                html_url: 'https://github.com/sksazid01/portfolio',
                language: 'JavaScript',
                stargazers_count: 15,
                forks_count: 3,
                updated_at: new Date().toISOString(),
                topics: ['react', 'portfolio', 'tailwind']
            },
            {
                name: 'Restaurant-Management',
                description: 'Android app for restaurant order management',
                html_url: 'https://github.com/sksazid01/restaurant-app',
                language: 'Java',
                stargazers_count: 8,
                forks_count: 2,
                updated_at: new Date().toISOString(),
                topics: ['android', 'java', 'sqlite']
            }
        ];

        this.updateProjectsSection(fallbackProjects);
    }
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new DynamicPortfolio();
    });
} else {
    new DynamicPortfolio();
}

// Add custom CSS for enhanced animations
const dynamicStyles = `
    <style>
        .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }
        
        .dynamic-project-card {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .dynamic-project-card:hover {
            transform: translateY(-8px) scale(1.02);
            box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }
        
        header.scrolled {
            background: rgba(255, 255, 255, 0.98) !important;
            backdrop-filter: blur(20px);
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .dark header.scrolled {
            background: rgba(17, 24, 39, 0.98) !important;
        }
        
        .current-time {
            animation: slideInFromRight 0.5s ease-out;
        }
        
        @keyframes slideInFromRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        /* Enhanced hover effects */
        .enhanced-hover {
            transition: all 0.3s ease;
        }
        
        .enhanced-hover:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        /* Pulse animation for active elements */
        .pulse-glow {
            animation: pulseGlow 2s infinite;
        }
        
        @keyframes pulseGlow {
            0%, 100% {
                box-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
            }
            50% {
                box-shadow: 0 0 20px rgba(59, 130, 246, 0.8);
            }
        }
    </style>
`;

document.head.insertAdjacentHTML('beforeend', dynamicStyles);

// Export for external use
window.DynamicPortfolio = DynamicPortfolio;
