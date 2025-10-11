// Плавная прокрутка для навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Изменение навигации при скролле
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(44, 62, 80, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '#2c3e50';
        navbar.style.backdropFilter = 'none';
    }
});

// Обработка формы
document.querySelector('.contact-form')?.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Сообщение отправлено! Спасибо за ваше сообщение.');
    this.reset();
});

// Функция для открытия книги
function openBook(bookId) {
    if (bookId === 'book1') {
        window.location.href = 'book1.html';
    } else {
        alert('Эта книга скоро будет доступна для чтения!');
    }
}
