document.addEventListener('DOMContentLoaded', () => {

    // Theme Toggle Logic (Day/Night)
    const themeToggle = document.getElementById('theme-toggle');
    const iconSun = document.getElementById('theme-icon-sun');
    const iconMoon = document.getElementById('theme-icon-moon');
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    
    const applyTheme = (theme) => {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            iconMoon.style.display = 'none';
            iconSun.style.display = 'inline-block';
        } else {
            document.documentElement.removeAttribute('data-theme');
            iconSun.style.display = 'none';
            iconMoon.style.display = 'inline-block';
        }
    };
    
    // Apply on load
    applyTheme(savedTheme);
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            applyTheme(newTheme);
            localStorage.setItem('portfolio-theme', newTheme);
        });
    }

    // Mobile Navbar Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Trigger skill bar animations if any exist in this section by setting their width
                const progressFills = entry.target.querySelectorAll('.progress-fill');
                if (progressFills.length > 0) {
                    progressFills.forEach(fill => {
                        const targetWidth = fill.getAttribute('data-width');
                        if(targetWidth) {
                            fill.style.width = targetWidth;
                        }
                    });
                }
                
                // Optional: Stop observing once animated
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Observe all scroll-reveal elements
    const scrollElements = document.querySelectorAll('.scroll-reveal');
    scrollElements.forEach(el => observer.observe(el));

    // Stagger children animations
    const staggerContainers = document.querySelectorAll('.stagger-children');
    staggerContainers.forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            child.style.transitionDelay = `${index * 0.15}s`;
        });
    });

    // Typing Effect for Hero Name
    const heroName = document.querySelector('.hero-name');
    if (heroName) {
        // preserve the innerHTML allowing elements like <br>
        const originalHTML = heroName.innerHTML.trim();
        heroName.innerHTML = '';
        heroName.classList.add('typing-active');
        
        let i = 0;
        let isTag = false;
        let currentText = '';

        // Start typing immediately
        setTimeout(() => {
            const typingInterval = setInterval(() => {
                if (i < originalHTML.length) {
                    let char = originalHTML.charAt(i);

                    // Skip through HTML tags entirely at once so <br> isn't typed out letter by letter
                    if (char === '<') {
                        isTag = true;
                    }
                    
                    currentText += char;
                    
                    if (char === '>') {
                        isTag = false;
                    }

                    if (!isTag) {
                        heroName.innerHTML = currentText;
                    }
                    i++;
                } else {
                    heroName.innerHTML = originalHTML; // Ensure the final state is perfect
                    clearInterval(typingInterval);
                }
            }, 80); // Speed of typing
        }, 100);
    }

    console.log("Portfolio Loaded. Animation Engine Active.");
});
