// Код для современного минималистичного сайта с книгой
// Основной модуль приложения
const App = (() => {
    // Состояние приложения
    const state = {
        currentPage: 'main',
        theme: 'dark',
        bookOpened: false,
        descriptionOpened: false,
        prefersReducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches
    };
    
    // DOM элементы
    const elements = {
        themeToggle: null,
        themeToggleBook: null,
        themeToggleDescription: null,
        backButton: null,
        backToMain: null,
        backToMainFromDescription: null,
        openBookButton: null,
        interactiveBook: null,
        mainPage: null,
        bookDescriptionPage: null,
        bookPage: null,
        prevPageBtn: null,
        nextPageBtn: null,
        comingSoonBook: null,
        comingSoonButton: null,
        readBookButton: null
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
        elements.themeToggleDescription = document.getElementById('theme-toggle-description');
        elements.backButton = document.getElementById('back-button');
        elements.backToMain = document.getElementById('back-to-main');
        elements.backToMainFromDescription = document.getElementById('back-to-main-from-description');
        elements.openBookButton = document.getElementById('open-book-button');
        elements.interactiveBook = document.getElementById('interactive-book');
        elements.mainPage = document.getElementById('main-page');
        elements.bookDescriptionPage = document.getElementById('book-description-page');
        elements.bookPage = document.getElementById('book-page');
        elements.prevPageBtn = document.getElementById('prev-page');
        elements.nextPageBtn = document.getElementById('next-page');
        elements.comingSoonBook = document.getElementById('coming-soon-book');
        elements.comingSoonButton = document.getElementById('coming-soon-button');
        elements.readBookButton = document.getElementById('read-book-button');
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
        
        if (elements.themeToggleDescription) {
            elements.themeToggleDescription.addEventListener('click', toggleTheme);
        }
        
        // Навигация
        if (elements.openBookButton) {
            elements.openBookButton.addEventListener('click', openBookDescription);
        }
        
        if (elements.interactiveBook) {
            elements.interactiveBook.addEventListener('click', openBookDescription);
        }
        
        if (elements.backButton) {
            elements.backButton.addEventListener('click', goBackFromBook);
        }
        
        if (elements.backToMain) {
            elements.backToMain.addEventListener('click', goBackFromBook);
        }
        
        if (elements.backToMainFromDescription) {
            elements.backToMainFromDescription.addEventListener('click', goBackFromDescription);
        }
        
        // Кнопка "Читать книгу" на странице описания
        if (elements.readBookButton) {
            elements.readBookButton.addEventListener('click', openBookContent);
        }
        
        // Вторая книга (скоро будет доступно)
        if (elements.comingSoonBook) {
            elements.comingSoonBook.addEventListener('click', showComingSoonMessage);
        }
        
        if (elements.comingSoonButton) {
            elements.comingSoonButton.addEventListener('click', showComingSoonMessage);
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
        } else if (hash === '#description') {
            openBookDescriptionPage(false);
            updateHistory('description', false);
        }
    };
    
    // Открытие описания книги
    const openBookDescription = () => {
        if (state.descriptionOpened) return;
        
        openBookDescriptionPage(true);
        updateHistory('description', true);
    };
    
    // Открытие страницы описания книги
    const openBookDescriptionPage = (withAnimation = true) => {
        state.currentPage = 'description';
        state.descriptionOpened = true;
        
        // Переключаем видимость страниц
        if (elements.mainPage) {
            elements.mainPage.classList.remove('active');
        }
        
        if (elements.bookDescriptionPage) {
            if (withAnimation && !state.prefersReducedMotion) {
                // Анимация появления страницы описания
                setTimeout(() => {
                    elements.bookDescriptionPage.classList.add('active');
                }, 100);
            } else {
                elements.bookDescriptionPage.classList.add('active');
            }
        }
        
        // Показываем кнопку "Назад" в шапке
        if (elements.backButton) {
            elements.backButton.style.display = 'block';
        }
    };
    
    // Открытие контента книги (с анимацией)
    const openBookContent = () => {
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
        if (elements.bookDescriptionPage) {
            elements.bookDescriptionPage.classList.remove('active');
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
    
    // Возврат из книги на главную
    const goBackFromBook = () => {
        if (state.currentPage !== 'book') return;
        
        // Закрываем книгу с анимацией
        if (elements.interactiveBook && !state.prefersReducedMotion) {
            elements.interactiveBook.classList.remove('book--opened');
        }
        
        // Переходим на главную страницу
        closeBookPage();
        updateHistory('main', true);
    };
    
    // Возврат из описания на главную
    const goBackFromDescription = () => {
        if (state.currentPage !== 'description') return;
        
        closeDescriptionPage();
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
    
    // Закрытие страницы описания
    const closeDescriptionPage = () => {
        state.currentPage = 'main';
        state.descriptionOpened = false;
        
        // Переключаем видимость страниц
        if (elements.bookDescriptionPage) {
            elements.bookDescriptionPage.classList.remove('active');
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
                // Сначала открываем описание, если мы на главной
                if (state.currentPage === 'main') {
                    openBookDescriptionPage(true);
                    // Затем открываем книгу
                    setTimeout(() => {
                        openBookContent();
                    }, 100);
                } else {
                    openBookPage(true);
                }
            }
        } else if (hash === '#description') {
            // Переход на страницу описания
            if (state.currentPage !== 'description') {
                openBookDescriptionPage(true);
            }
        } else {
            // Переход на главную страницу
            if (state.currentPage === 'book') {
                // Закрываем книгу с анимацией
                if (elements.interactiveBook && !state.prefersReducedMotion) {
                    elements.interactiveBook.classList.remove('book--opened');
                }
                closeBookPage();
            } else if (state.currentPage === 'description') {
                closeDescriptionPage();
            }
        }
    };
    
    // Обновление истории браузера
    const updateHistory = (page, pushState = true) => {
        if (pushState) {
            if (page === 'book') {
                // Используем hash для имитации отдельной страницы
                history.pushState({ page: 'book' }, '', '#book');
            } else if (page === 'description') {
                history.pushState({ page: 'description' }, '', '#description');
            } else {
                // Возвращаемся к основному URL
                history.pushState({ page: 'main' }, '', window.location.pathname);
            }
        }
    };
    
    // Показать сообщение "Скоро будет доступно"
    const showComingSoonMessage = () => {
        // Создаем всплывающее сообщение
        const message = document.createElement('div');
        message.className = 'coming-soon-message';
        message.innerHTML = `
            <div class="coming-soon-message__content">
                <h3>Скоро будет доступно!</h3>
                <p>Книга "Теневые Тропы" находится в разработке.</p>
                <p>Следите за обновлениями!</p>
                <button class="coming-soon-message__close">Закрыть</button>
            </div>
        `;
        
        document.body.appendChild(message);
        
        // Показываем сообщение с анимацией
        setTimeout(() => {
            message.classList.add('coming-soon-message--visible');
        }, 10);
        
        // Обработка закрытия
        const closeBtn = message.querySelector('.coming-soon-message__close');
        closeBtn.addEventListener('click', () => {
            message.classList.remove('coming-soon-message--visible');
            setTimeout(() => {
                if (message.parentNode) {
                    message.parentNode.removeChild(message);
                }
            }, 300);
        });
        
        // Закрытие по клику вне сообщения
        message.addEventListener('click', (e) => {
            if (e.target === message) {
                message.classList.remove('coming-soon-message--visible');
                setTimeout(() => {
                    if (message.parentNode) {
                        message.parentNode.removeChild(message);
                    }
                }, 300);
            }
        });
        
        // Закрытие по клавише Escape
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                message.classList.remove('coming-soon-message--visible');
                setTimeout(() => {
                    if (message.parentNode) {
                        message.parentNode.removeChild(message);
                    }
                }, 300);
                document.removeEventListener('keydown', handleEscape);
            }
        };
        
        document.addEventListener('keydown', handleEscape);
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
        openBookDescription,
        openBookContent,
        goBackFromBook,
        goBackFromDescription,
        toggleTheme,
        showComingSoonMessage
    };
})();

// Инициализация приложения после загрузки DOM
document.addEventListener('DOMContentLoaded', App.init);
