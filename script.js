document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.nav__btn');
    const articles = document.querySelectorAll('.card');

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
