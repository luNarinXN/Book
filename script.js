/**
 * Монохромная библиотека - главный скрипт
 * Управление темами, анимацией книги и History API
 */

// Инициализация приложения
function initApp() {
    // Инициализация темы
    initTheme();
    
    // Инициализация книги
    initBook();
    
    // Инициализация обработчиков событий
    initEventListeners();
    
    // Проверка начального состояния (если мы на странице книги)
    checkInitialState();
}

// ==================== УПРАВЛЕНИЕ ТЕМАМИ ====================

function initTheme() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    
    // Проверяем сохранённую тему или системные предпочтения
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.classList.add('theme-dark');
        html.classList.remove('theme-light');
    } else {
        html.classList.add('theme-light');
        html.classList.remove('theme-dark');
    }
    
    // Обработчик переключателя темы
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('theme-dark');
    
    if (isDark) {
        html.classList.remove('theme-dark');
        html.classList.add('theme-light');
        localStorage.setItem('theme', 'light');
    } else {
        html.classList.remove('theme-light');
        html.classList.add('theme-dark');
        localStorage.setItem('theme', 'dark');
    }
}

// ==================== УПРАВЛЕНИЕ КНИГОЙ ====================

function initBook() {
    const book = document.getElementById('book');
    const openBtn = document.getElementById('openBookBtn');
    const closeBtn = document.getElementById('closeBookBtn');
    const overlay = document.getElementById('overlay');
    
    // Состояние книги
    window.bookState = {
        isOpen: false,
        isAnimating: false
    };
    
    // Функция открытия книги
    window.openBook = function(animate = true) {
        if (window.bookState.isAnimating) return;
        
        window.bookState.isAnimating = true;
        window.bookState.isOpen = true;
        
        const book = document.getElementById('book');
        const overlay = document.getElementById('overlay');
        
        // Показываем overlay
        overlay.classList.add('overlay--active');
        
        // Анимация открытия книги
        if (animate) {
            book.classList.add('book--open');
            
            // Изменяем URL с помощью History API
            history.pushState({ bookOpen: true }, '', '/book');
            
            // Обновляем состояние после анимации
            setTimeout(() => {
                window.bookState.isAnimating = false;
            }, 1200);
        } else {
            // Если анимация не нужна (при прямом заходе на /book)
            book.classList.add('book--open');
            book.style.transition = 'none';
            window.bookState.isAnimating = false;
            
            setTimeout(() => {
                book.style.transition = '';
            }, 100);
        }
    };
    
    // Функция закрытия книги
    window.closeBook = function(animate = true) {
        if (window.bookState.isAnimating) return;
        
        window.bookState.isAnimating = true;
        window.bookState.isOpen = false;
        
        const book = document.getElementById('book');
        const overlay = document.getElementById('overlay');
        
        // Скрываем overlay
        overlay.classList.remove('overlay--active');
        
        // Анимация закрытия книги
        if (animate) {
            book.classList.remove('book--open');
            
            // Возвращаемся назад в истории
            history.back();
            
            // Обновляем состояние после анимации
            setTimeout(() => {
                window.bookState.isAnimating = false;
            }, 1200);
        } else {
            // Если анимация не нужна
            book.classList.remove('book--open');
            window.bookState.isAnimating = false;
        }
    };
    
    // Обработчики событий для элементов книги
    if (openBtn) {
        openBtn.addEventListener('click', () => window.openBook(true));
    }
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => window.closeBook(true));
    }
    
    // Клик на overlay закрывает книгу
    if (overlay) {
        overlay.addEventListener('click', () => window.closeBook(true));
    }
    
    // Клик на обложку книги
    const bookCover = document.querySelector('.book__cover');
    if (bookCover) {
        bookCover.addEventListener('click', () => window.openBook(true));
    }
}

// ==================== ИСТОРИЯ И НАВИГАЦИЯ ====================

function initEventListeners() {
    // Обработка кнопки "Назад" браузера
    window.addEventListener('popstate', function(event) {
        // Если состояние содержит флаг открытой книги, закрываем её
        if (window.bookState.isOpen) {
            window.closeBook(true);
        }
    });
    
    // Обработка клавиши Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && window.bookState.isOpen) {
            window.closeBook(true);
        }
    });
}

// ==================== ПРОВЕРКА НАЧАЛЬНОГО СОСТОЯНИЯ ====================

function checkInitialState() {
    // Если мы уже на странице /book (при прямом заходе или обновлении)
    if (window.location.pathname.endsWith('/book') || 
        window.location.pathname.endsWith('/book.html') ||
        window.location.hash === '#book') {
        
        // Открываем книгу без анимации
        setTimeout(() => {
            if (typeof window.openBook === 'function') {
                window.openBook(false);
            }
        }, 100);
    }
}

// ==================== ОБРАБОТЧИКИ ДЛЯ REDUCED MOTION ====================

// Проверяем предпочтения пользователя по поводу анимаций
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
if (mediaQuery.matches) {
    // Отключаем плавные переходы
    document.documentElement.style.setProperty('--transition-base', 'none');
    document.documentElement.style.setProperty('--transition-fast', 'none');
}

// ==================== ИНИЦИАЛИЗАЦИЯ ПРИ ЗАГРУЗКЕ ====================

// Экспортируем функцию инициализации для глобального доступа
window.initApp = initApp;

// Запускаем инициализацию, если DOM уже загружен
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
