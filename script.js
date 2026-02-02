document.addEventListener('DOMContentLoaded', () => {

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    const scrollSections = document.querySelectorAll('.scroll-section');
    scrollSections.forEach(section => {
        observer.observe(section);
    });

    // Mobile Navbar State (Optional future enhancement, currently not needed for minimal design)
    // could add simple toggle if we added a burger menu.

    console.log("Portfolio Loaded. Animation Engine Active.");
});
