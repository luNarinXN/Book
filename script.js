// Код для современного минималистичного сайта с книгой
// Основной модуль приложения
const App = (() => {
    // Состояние приложения
    const state = {
        currentPage: 'main',
        theme: 'dark',
        bookOpened: false,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
    
    // DOM элементы
    const elements = {
        themeToggle: null,
        themeToggleBook: null,
        backButton: null,
        backToMain: null,
        openBookButton: null,
        interactiveBook: null,
        mainPage: null,
        bookPage: null,
        prevPageBtn: null,
        nextPageBtn: null
    };
    
    // Инициализация приложения
    const init = () => {
        cacheElements();
        bindEvents();
        initTheme();
        initPageState();
        setupAccessibility();
        
        console.log('Приложение инициализировано. Тема:', state.theme);
    };
    
    // Кэширование DOM элементов
    const cacheElements = () => {
        elements.themeToggle = document.getElementById('theme-toggle');
        elements.themeToggleBook = document.getElementById('theme-toggle-book');
        elements.backButton = document.getElementById('back-button');
        elements.backToMain = document.getElementById('back-to-main');
        elements.openBookButton = document.getElementById('open-book-button');
        elements.interactiveBook = document.getElementById('interactive-book');
        elements.mainPage = document.getElementById('main-page');
        elements.bookPage = document.getElementById('book-page');
        elements.prevPageBtn = document.getElementById('prev-page');
        elements.nextPageBtn = document.getElementById('next-page');
    };
    
    // Настройка обработчиков событий
    const bindEvents = () => {
        // Переключение темы
        if (elements.themeToggle) {
            elements.themeToggle.addEventListener('click', toggleTheme);
        }
        
        if (elements.themeToggleBook) {
            elements.themeToggleBook.addEventListener('click', toggleTheme);
        }
        
        // Навигация
        if (elements.openBookButton) {
            elements.openBookButton.addEventListener('click', openBook);
        }
        
        if (elements.interactiveBook) {
            elements.interactiveBook.addEventListener('click', openBook);
        }
        
        if (elements.backButton) {
            elements.backButton.addEventListener('click', goBack);
        }
        
        if (elements.backToMain) {
            elements.backToMain.addEventListener('click', goBack);
        }
        
        // Навигация по страницам книги
        if (elements.prevPageBtn) {
            elements.prevPageBtn.addEventListener('click', goToPrevPage);
        }
        
        if (elements.nextPageBtn) {
            elements.nextPageBtn.addEventListener('click', goToNextPage);
        }
        
        // Обработка нажатия кнопки "Назад" в браузере
        window.addEventListener('popstate', handlePopState);
        
        // Обработка предпочтений пользователя по анимациям
        const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        motionMediaQuery.addEventListener('change', (e) => {
            state.prefersReducedMotion = e.matches;
        });
    };
    
    // Инициализация темы
    const initTheme = () => {
        // Проверяем сохранённую тему в localStorage
        const savedTheme = localStorage.getItem('theme');
        
        // Проверяем предпочтения системы
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Определяем тему: сначала сохранённая, затем системная
        if (savedTheme) {
            state.theme = savedTheme;
        } else if (systemPrefersDark) {
            state.theme = 'dark';
        } else {
            state.theme = 'light';
        }
        
        // Применяем тему
        applyTheme();
    };
    
    // Применение текущей темы
    const applyTheme = () => {
        if (state.theme === 'dark') {
            document.documentElement.classList.add('dark-theme');
        } else {
            document.documentElement.classList.remove('dark-theme');
        }
        
        // Сохраняем в localStorage
        localStorage.setItem('theme', state.theme);
    };
    
    // Переключение темы
    const toggleTheme = () => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark';
        applyTheme();
        
        // Анимация переключения
        if (!state.prefersReducedMotion) {
            document.documentElement.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                document.documentElement.style.transition = '';
            }, 300);
        }
    };
    
    // Инициализация состояния страницы
    const initPageState = () => {
        // Проверяем URL для определения текущей страницы
        const path = window.location.pathname;
        const hash = window.location.hash;
        
        // Если URL содержит /book или #book, открываем страницу книги
        if (path.includes('book') || hash === '#book') {
            openBookPage(false); // Без анимации при загрузке
            updateHistory('book', false); // Обновляем историю без события
        }
    };
    
    // Открытие книги (с анимацией)
    const openBook = () => {
        if (state.bookOpened) return;
        
        // Добавляем класс для анимации открытия книги
        if (elements.interactiveBook && !state.prefersReducedMotion) {
            elements.interactiveBook.classList.add('book--opened');
            
            // Ждём завершения анимации и переходим на страницу книги
            setTimeout(() => {
                openBookPage(true);
                updateHistory('book', true);
            }, 800);
        } else {
            // Без анимации
            openBookPage(true);
            updateHistory('book', true);
        }
    };
    
    // Открытие страницы книги
    const openBookPage = (withAnimation = true) => {
        state.currentPage = 'book';
        state.bookOpened = true;
        
        // Переключаем видимость страниц
        if (elements.mainPage) {
            elements.mainPage.classList.remove('active');
        }
        
        if (elements.bookPage) {
            if (withAnimation && !state.prefersReducedMotion) {
                // Анимация появления страницы книги
                setTimeout(() => {
                    elements.bookPage.classList.add('active');
                }, 100);
            } else {
                elements.bookPage.classList.add('active');
            }
        }
        
        // Показываем кнопку "Назад" в шапке
        if (elements.backButton) {
            elements.backButton.style.display = 'block';
        }
    };
    
    // Возврат на главную
    const goBack = () => {
        if (state.currentPage !== 'book') return;
        
        // Закрываем книгу с анимацией
        if (elements.interactiveBook && !state.prefersReducedMotion) {
            elements.interactiveBook.classList.remove('book--opened');
        }
        
        // Переходим на главную страницу
        closeBookPage();
        updateHistory('main', true);
    };
    
    // Закрытие страницы книги
    const closeBookPage = () => {
        state.currentPage = 'main';
        state.bookOpened = false;
        
        // Переключаем видимость страниц
        if (elements.bookPage) {
            elements.bookPage.classList.remove('active');
        }
        
        if (elements.mainPage) {
            elements.mainPage.classList.add('active');
        }
        
        // Скрываем кнопку "Назад" в шапке
        if (elements.backButton) {
            elements.backButton.style.display = 'none';
        }
    };
    
    // Обработка навигации по истории браузера
    const handlePopState = (event) => {
        // Определяем, на какую страницу произошёл переход
        const path = window.location.pathname;
        const hash = window.location.hash;
        
        if (path.includes('book') || hash === '#book') {
            // Переход на страницу книги
            if (state.currentPage !== 'book') {
                openBookPage(true);
            }
        } else {
            // Переход на главную страницу
            if (state.currentPage !== 'main') {
                // Закрываем книгу с анимацией
                if (elements.interactiveBook && !state.prefersReducedMotion) {
                    elements.interactiveBook.classList.remove('book--opened');
                }
                closeBookPage();
            }
        }
    };
    
    // Обновление истории браузера
    const updateHistory = (page, pushState = true) => {
        if (pushState) {
            if (page === 'book') {
                // Используем hash для имитации отдельной страницы
                history.pushState({ page: 'book' }, '', '#book');
            } else {
                // Возвращаемся к основному URL
                history.pushState({ page: 'main' }, '', window.location.pathname);
            }
        }
    };
    
    // Навигация по страницам книги (заглушка для демонстрации)
    const goToPrevPage = () => {
        // В реальном приложении здесь была бы логика перехода к предыдущей странице
        alert('Это демонстрационная версия. В реальном приложении здесь будет переход к предыдущей странице книги.');
    };
    
    const goToNextPage = () => {
        // В реальном приложении здесь была бы логика перехода к следующей странице
        alert('Это демонстрационная версия. В реальном приложении здесь будет переход к следующей странице книги.');
    };
    
    // Настройка доступности
    const setupAccessibility = () => {
        // Улучшаем фокус для интерактивных элементов
        const interactiveElements = document.querySelectorAll('button, [tabindex]');
        
        interactiveElements.forEach(el => {
            el.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    el.click();
                }
            });
        });
        
        // Добавляем aria-label для интерактивных элементов, у которых нет текста
        const iconButtons = document.querySelectorAll('.theme-toggle');
        iconButtons.forEach(btn => {
            if (!btn.getAttribute('aria-label')) {
                btn.setAttribute('aria-label', 'Переключить тему');
            }
        });
    };
    
    // Публичные методы
    return {
        init,
        getState: () => ({ ...state }),
        openBook,
        goBack,
        toggleTheme
    };
})();

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', App.init);
