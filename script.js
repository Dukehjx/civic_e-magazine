document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.nav__btn');
    const articles = document.querySelectorAll('.card');
    const langToggle = document.getElementById('lang-toggle');
    const body = document.body;

    // Load saved language preference
    const savedLang = localStorage.getItem('preferred-lang') || 'en';
    body.setAttribute('data-lang', savedLang);

    // Language toggle functionality
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = body.getAttribute('data-lang');
            const newLang = currentLang === 'en' ? 'zh' : 'en';
            body.setAttribute('data-lang', newLang);
            localStorage.setItem('preferred-lang', newLang);
        });
    }

    // Category filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');

            const category = button.getAttribute('data-category');

            articles.forEach(article => {
                if (category === 'all' || article.getAttribute('data-category') === category) {
                    article.style.display = 'flex';
                    // Optional: add fade-in animation
                    article.style.opacity = '0';
                    setTimeout(() => {
                        article.style.opacity = '1';
                        article.style.transition = 'opacity 0.5s ease';
                    }, 10);
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });
});
