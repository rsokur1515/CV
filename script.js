// Language switching functionality
(function() {
    'use strict';
    
    const LANGUAGE_KEY = 'resume_language';
    const DEFAULT_LANGUAGE = 'ru';
    
    // Get current language from localStorage or default to 'ru'
    let currentLanguage = localStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE;
    
    // Initialize language on page load
    function initLanguage() {
        setLanguage(currentLanguage);
        updateLanguageButtons();
    }
    
    // Set language for all elements
    function setLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem(LANGUAGE_KEY, lang);
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
        
        // Update title
        const titleElement = document.querySelector('title');
        if (titleElement) {
            const titleRu = titleElement.getAttribute('data-lang-ru');
            const titleEn = titleElement.getAttribute('data-lang-en');
            if (lang === 'ru' && titleRu) {
                titleElement.textContent = titleRu;
            } else if (lang === 'en' && titleEn) {
                titleElement.textContent = titleEn;
            }
        }
        
        // Update all elements with data-lang attributes
        const elements = document.querySelectorAll('[data-lang-ru], [data-lang-en]');
        elements.forEach(element => {
            const ruText = element.getAttribute('data-lang-ru');
            const enText = element.getAttribute('data-lang-en');
            
            if (lang === 'ru' && ruText !== null) {
                element.textContent = ruText;
            } else if (lang === 'en' && enText !== null) {
                element.textContent = enText;
            }
        });
        
        // Update image alt attributes
        const images = document.querySelectorAll('[data-lang-ru-alt], [data-lang-en-alt]');
        images.forEach(img => {
            const ruAlt = img.getAttribute('data-lang-ru-alt');
            const enAlt = img.getAttribute('data-lang-en-alt');
            
            if (lang === 'ru' && ruAlt !== null) {
                img.setAttribute('alt', ruAlt);
            } else if (lang === 'en' && enAlt !== null) {
                img.setAttribute('alt', enAlt);
            }
        });
    }
    
    // Update language button states
    function updateLanguageButtons() {
        const buttons = document.querySelectorAll('.lang-btn');
        buttons.forEach(btn => {
            if (btn.getAttribute('data-lang') === currentLanguage) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Handle language button clicks
    function handleLanguageSwitch(event) {
        const target = event.target.closest('.lang-btn');
        if (!target) return;
        
        const lang = target.getAttribute('data-lang');
        if (lang && lang !== currentLanguage) {
            setLanguage(lang);
            updateLanguageButtons();
        }
    }
    
    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLanguage);
    } else {
        initLanguage();
    }
    
    // Add event listener for language switcher
    const languageSwitcher = document.querySelector('.language-switcher');
    if (languageSwitcher) {
        languageSwitcher.addEventListener('click', handleLanguageSwitch);
    }
})();

