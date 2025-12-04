/* CSS-переменные для тем */
:root {
    /* Светлая тема (по умолчанию) */
    --color-bg: #f8f9fa;
    --color-surface: rgba(255, 255, 255, 0.85);
    --color-surface-solid: #ffffff;
    --color-text: #212529;
    --color-text-secondary: #6c757d;
    --color-accent: #212529;
    --color-border: rgba(0, 0, 0, 0.1);
    --color-shadow: rgba(0, 0, 0, 0.08);
    --color-overlay: rgba(0, 0, 0, 0.4);
    --gradient-primary: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
    --transition-base: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    --transition-fast: all 0.2s ease;
    --shadow-sm: 0 2px 8px var(--color-shadow);
    --shadow-md: 0 8px 32px var(--color-shadow);
    --shadow-lg: 0 16px 64px var(--color-shadow);
    --border-radius: 12px;
    --glass-blur: blur(10px);
    --spacing-unit: 8px;
}

/* Тёмная тема */
.theme-dark {
    --color-bg: #121212;
    --color-surface: rgba(30, 30, 30, 0.85);
    --color-surface-solid: #1e1e1e;
    --color-text: #e9ecef;
    --color-text-secondary: #adb5bd;
    --color-accent: #f8f9fa;
    --color-border: rgba(255, 255, 255, 0.1);
    --color-shadow: rgba(0, 0, 0, 0.3);
    --color-overlay: rgba(0, 0, 0, 0.7);
    --gradient-primary: linear-gradient(135deg, #121212 0%, #1a1a1a 100%);
}

/* Базовые стили */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    font-size: 16px;
    scroll-behavior: smooth;
}

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: var(--color-bg);
    color: var(--color-text);
    line-height: 1.6;
    min-height: 100vh;
    transition: var(--transition-base);
    overflow-x: hidden;
}

/* Адаптация для prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
    }
}

/* Контейнер */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 calc(var(--spacing-unit) * 2);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
}

/* Шапка */
.header {
    padding: calc(var(--spacing-unit) * 3) 0;
    position: relative;
    z-index: 100;
}

.header__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.logo {
    font-size: 1.5rem;
    font-weight: 600;
    letter-spacing: -0.5px;
    color: var(--color-text);
}

/* Переключатель темы */
.theme-toggle {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--color-surface);
    backdrop-filter: var(--glass-blur);
    border: 1px solid var(--color-border);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: var(--transition-fast);
    position: relative;
    overflow: hidden;
}

.theme-toggle:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.theme-toggle:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
}

.theme-toggle__icon {
    font-size: 1.2rem;
    position: absolute;
    transition: var(--transition-base);
}

.theme-toggle__icon--sun {
    opacity: 1;
}

.theme-toggle__icon--moon {
    opacity: 0;
    transform: rotate(-90deg);
}

.theme-dark .theme-toggle__icon--sun {
    opacity: 0;
    transform: rotate(90deg);
}

.theme-dark .theme-toggle__icon--moon {
    opacity: 1;
    transform: rotate(0);
}

/* Основной контент */
.main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: calc(var(--spacing-unit) * 4) 0;
}

/* Герой секция */
.hero {
    text-align: center;
    margin-bottom: calc(var(--spacing-unit) * 8);
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.hero__title {
    font-size: 3.5rem;
    font-weight: 700;
    letter-spacing: -1px;
    margin-bottom: calc(var(--spacing-unit) * 2);
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
}

.hero__description {
    font-size: 1.125rem;
    color: var(--color-text-secondary);
    line-height: 1.7;
}

/* Контейнер книги */
.book-container {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 800px;
    perspective: 2000px;
}

/* Стили книги */
.book {
    position: relative;
    width: 100%;
    height: 500px;
    transform-style: preserve-3d;
    transition: transform 1.2s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform-origin: left center;
    margin-bottom: calc(var(--spacing-unit) * 6);
}

/* Обложка книги */
.book__cover {
    position: absolute;
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    cursor: pointer;
}

.book__spine {
    position: absolute;
    left: 0;
    top: 0;
    width: 20px;
    height: 100%;
    background: linear-gradient(90deg, var(--color-text) 0%, var(--color-text-secondary) 100%);
    transform: rotateY(-90deg) translateX(-10px);
    border-radius: 2px 0 0 2px;
}

.book__front {
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--color-surface);
    backdrop-filter: var(--glass-blur);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    padding: calc(var(--spacing-unit) * 6);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: var(--shadow-lg);
    transition: var(--transition-fast);
}

.book__front:hover {
    transform: translateY(-8px);
    box-shadow: var(--shadow-lg), 0 32px 64px var(--color-shadow);
}

.book__title {
    font-size: 3rem;
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: calc(var(--spacing-unit) * 2);
}

.book__subtitle {
    font-size: 1.25rem;
    color: var(--color-text-secondary);
    font-weight: 400;
    letter-spacing: 2px;
    text-transform: uppercase;
}

.book__decor {
    width: 120px;
    height: 4px;
    background: var(--color-text);
    margin-top: calc(var(--spacing-unit) * 4);
    opacity: 0.3;
}

/* Контент книги (скрытая страница) */
.book__content {
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--color-surface-solid);
    border-radius: var(--border-radius);
    padding: calc(var(--spacing-unit) * 6);
    transform: rotateY(180deg);
    backface-visibility: hidden;
    overflow-y: auto;
    box-shadow: var(--shadow-lg);
    opacity: 0;
    transition: opacity 0.6s ease 0.3s;
}

.book--open .book__content {
    opacity: 1;
}

.book__page {
    height: 100%;
    display: flex;
    flex-direction: column;
}

.book__page-title {
    font-size: 2.5rem;
    font-weight: 600;
    margin-bottom: calc(var(--spacing-unit) * 4);
    color: var(--color-text);
    position: relative;
    padding-bottom: calc(var(--spacing-unit) * 2);
}

.book__page-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 60px;
    height: 3px;
    background: var(--color-text);
    opacity: 0.2;
}

.book__page p {
    margin-bottom: calc(var(--spacing-unit) * 3);
    color: var(--color-text-secondary);
    line-height: 1.8;
}

.book__actions {
    margin-top: auto;
    padding-top: calc(var(--spacing-unit) * 4);
}

/* Кнопки */
.btn {
    padding: calc(var(--spacing-unit) * 2) calc(var(--spacing-unit) * 4);
    border: none;
    border-radius: var(--border-radius);
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition-fast);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: calc(var(--spacing-unit) * 2);
    text-decoration: none;
    position: relative;
    overflow: hidden;
}

.btn:focus {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
}

.btn--primary {
    background: var(--color-accent);
    color: var(--color-bg);
    box-shadow: var(--shadow-sm);
}

.btn--primary:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
}

.btn--secondary {
    background: transparent;
    color: var(--color-text);
    border: 1px solid var(--color-border);
}

.btn--secondary:hover {
    background: var(--color-surface);
    transform: translateY(-2px);
}

.btn__icon {
    transition: transform 0.3s ease;
}

.btn:hover .btn__icon {
    transform: translateX(4px);
}

.book__open-btn {
    position: absolute;
    bottom: calc(var(--spacing-unit) * -6);
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
}

/* Затемнение фона */
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--color-overlay);
    backdrop-filter: blur(4px);
    opacity: 0;
    visibility: hidden;
    transition: var(--transition-base);
    z-index: 999;
}

.overlay--active {
    opacity: 1;
    visibility: visible;
}

/* Состояния книги */
.book--open {
    transform: rotateY(-180deg) translateX(100px);
}

.book--open .book__front {
    box-shadow: none;
}

/* Подвал */
.footer {
    padding: calc(var(--spacing-unit) * 4) 0;
    text-align: center;
    color: var(--color-text-secondary);
    font-size: 0.875rem;
    border-top: 1px solid var(--color-border);
    margin-top: auto;
}

.footer__content {
    max-width: 600px;
    margin: 0 auto;
}

.footer__hint {
    margin-top: calc(var(--spacing-unit) * 2);
    opacity: 0.7;
    font-size: 0.75rem;
}

/* Адаптивность */
@media (max-width: 768px) {
    .hero__title {
        font-size: 2.5rem;
    }
    
    .book {
        height: 400px;
    }
    
    .book__title {
        font-size: 2.5rem;
    }
    
    .book--open {
        transform: rotateY(-180deg) translateX(50px);
    }
}

@media (max-width: 480px) {
    .container {
        padding: 0 var(--spacing-unit);
    }
    
    .hero__title {
        font-size: 2rem;
    }
    
    .book {
        height: 350px;
    }
    
    .book__front {
        padding: calc(var(--spacing-unit) * 4);
    }
    
    .book__content {
        padding: calc(var(--spacing-unit) * 4);
    }
    
    .book__page-title {
        font-size: 2rem;
    }
    
    .btn {
        padding: calc(var(--spacing-unit) * 1.5) calc(var(--spacing-unit) * 3);
    }
}

/* Состояние когда книгу нельзя открыть (загрузка) */
.book-container--loading .book {
    pointer-events: none;
    opacity: 0.7;
}

/* Анимация для кнопки при наведении на книгу */
.book:hover ~ .book__open-btn {
    transform: translateX(-50%) scale(1.05);
}

/* Специальные стили для book.html */
body.book-page {
    background: var(--color-bg);
}

body.book-page .book-container {
    transform: scale(0.9);
}

/* Улучшение доступности для фокуса */
:focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
    border-radius: 2px;
}

/* Скрытие элементов для скринридеров */
.visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
}
