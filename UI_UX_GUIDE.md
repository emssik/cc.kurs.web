# UI/UX Guide - Claude Code Kurs

Przewodnik po systemie stylów i komponentach UI/UX platformy edukacyjnej.

## 📁 Struktura plików

```
src/styles/
├── _variables.scss        # Zmienne (kolory, spacing, breakpoints)
├── _base.scss            # Reset i podstawowe style
├── _animations.scss      # Wszystkie animacje i transitions
├── main.scss             # Główny plik (importy + layout)
└── components/
    ├── _navbar.scss      # Header i footer
    ├── _hamburger.scss   # Menu mobile
    ├── _sidebar.scss     # Nawigacja lekcji
    ├── _lesson.scss      # Widok lekcji
    ├── _quiz.scss        # Testy
    ├── _progress.scss    # Progress bary
    ├── _path-detail.scss # Szczegóły ścieżki
    ├── _loading.scss     # Skeleton screens i loadery
    ├── _errors.scss      # Error states i toasts
    └── _mascot.scss      # Maskotka kursu
```

## 🎨 Design System

### Kolory

```scss
// Primary
$color-primary: #FF6B35;      // Pomarańczowy Claude
$color-secondary: #004E89;    // Granatowy
$color-accent: #F7931E;       // Złoty

// Ścieżki
$color-beginner: #4CAF50;     // Zielony
$color-intermediate: #FF9800; // Pomarańczowy
$color-advanced: #F44336;     // Czerwony

// Status
$color-success: #4CAF50;
$color-warning: #FFC107;
$color-error: #F44336;
$color-info: #2196F3;
```

### Spacing (4px grid)

```scss
$spacing-xs: 4px
$spacing-sm: 8px
$spacing-md: 16px
$spacing-lg: 24px
$spacing-xl: 32px
$spacing-2xl: 48px
$spacing-3xl: 64px
```

### Breakpoints

```scss
$breakpoint-mobile: 768px
$breakpoint-tablet: 1024px
$breakpoint-desktop: 1280px
```

## 🎭 Animacje

### Utility Classes

```html
<!-- Fade in -->
<div class="animate-fade-in">Zawartość</div>

<!-- Slide in -->
<div class="animate-slide-in-up">Z dołu</div>
<div class="animate-slide-in-down">Z góry</div>
<div class="animate-slide-in-left">Z lewej</div>
<div class="animate-slide-in-right">Z prawej</div>

<!-- Micro-interactions -->
<div class="animate-bounce">Odbija się</div>
<div class="animate-pulse">Pulsuje</div>

<!-- Staggered list -->
<ul class="stagger-animation">
  <li>Element 1 (0.1s)</li>
  <li>Element 2 (0.2s)</li>
  <li>Element 3 (0.3s)</li>
</ul>
```

### Hover Effects

```html
<!-- Podniesienie z cieniem -->
<div class="card hover-lift">...</div>

<!-- Powiększenie -->
<button class="btn hover-grow">Click</button>

<!-- Efekt błysku -->
<div class="card hover-shine">...</div>
```

## 📱 Responsywność

### Hamburger Menu

Menu automatycznie się pojawia na mobile (<768px).

**JavaScript API:**
```javascript
// Dostępne globalnie
window.HamburgerMenu.open();   // Otwórz menu
window.HamburgerMenu.close();  // Zamknij menu
window.HamburgerMenu.toggle(); // Przełącz
```

**Automatic features:**
- Zamyka się po kliknięciu linku
- Zamyka się przez ESC
- Zamyka się przy resize do desktop
- Blokuje scroll body gdy otwarte

### Touch Targets

Wszystkie interaktywne elementy mają minimum 44px wysokości (WCAG).

```scss
// Automatycznie dla przycisków
.btn {
  min-height: 44px;
}
```

## 🔄 Loading States

### Skeleton Screens

```html
<!-- Lekcja loading -->
<div class="skeleton-lesson">
  <div class="skeleton-heading"></div>
  <div class="skeleton-paragraph">
    <div class="skeleton-text"></div>
    <div class="skeleton-text"></div>
    <div class="skeleton-text"></div>
  </div>
  <div class="skeleton-image"></div>
</div>

<!-- Pojedyncze elementy -->
<div class="skeleton-text"></div>
<div class="skeleton-heading"></div>
<div class="skeleton-card"></div>
<div class="skeleton-circle"></div>
```

### Loading Indicators

```html
<!-- Spinner -->
<div class="spinner"></div>
<div class="spinner spinner-sm"></div>
<div class="spinner spinner-lg"></div>

<!-- Dots -->
<div class="loading-dots">
  <span class="dot"></span>
  <span class="dot"></span>
  <span class="dot"></span>
</div>

<!-- Progress bar -->
<div class="loading-bar">
  <div class="loading-bar-progress"></div>
</div>

<!-- Button loading -->
<button class="btn btn-primary btn-loading" disabled>
  Ładowanie...
</button>
```

## ❌ Error Handling

### Error Pages

```html
<!-- 404 -->
<div class="not-found-view">
  <div class="error-container">
    <div class="error-icon icon-404"></div>
    <h2 class="error-title">Nie znaleziono strony</h2>
    <p class="error-message">Sprawdź adres URL lub wróć do strony głównej.</p>
    <div class="error-actions">
      <a href="#/" class="btn btn-primary">Strona główna</a>
    </div>
  </div>
</div>

<!-- General error -->
<div class="error-view">
  <div class="error-container">
    <div class="error-icon icon-error"></div>
    <h2 class="error-title">Coś poszło nie tak</h2>
    <p class="error-message">Spróbuj odświeżyć stronę.</p>
    <div class="error-actions">
      <button class="btn btn-primary" onclick="location.reload()">
        Odśwież
      </button>
    </div>
  </div>
</div>
```

### Empty States

```html
<div class="empty-state">
  <div class="empty-icon icon-no-lessons"></div>
  <h3 class="empty-title">Brak ukończonych lekcji</h3>
  <p class="empty-message">
    Rozpocznij swoją przygodę z Claude Code już dziś!
  </p>
  <div class="empty-action">
    <a href="#/test" class="btn btn-primary">Rozpocznij test</a>
  </div>
</div>
```

### Inline Messages

```html
<!-- Error -->
<div class="error-message-inline">
  <span class="error-message-icon"></span>
  <p class="error-message-text">Coś poszło nie tak.</p>
</div>

<!-- Warning -->
<div class="error-message-inline error-message-warning">
  <span class="error-message-icon"></span>
  <p class="error-message-text">Uwaga: To działanie jest nieodwracalne.</p>
</div>

<!-- Success -->
<div class="error-message-inline error-message-success">
  <span class="error-message-icon"></span>
  <p class="error-message-text">Zapisano pomyślnie!</p>
</div>

<!-- Info -->
<div class="error-message-inline error-message-info">
  <span class="error-message-icon"></span>
  <p class="error-message-text">Wskazówka: Użyj skrótu Ctrl+S.</p>
</div>
```

### Toast Notifications

```html
<div class="toast toast-success">
  <span class="toast-icon">✓</span>
  <span class="toast-message">Lekcja ukończona!</span>
  <button class="toast-close" onclick="this.parentElement.remove()">×</button>
</div>
```

**JavaScript helper (do implementacji):**
```javascript
function showToast(message, type = 'info', duration = 3000) {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${getIcon(type)}</span>
    <span class="toast-message">${message}</span>
    <button class="toast-close">×</button>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-exit');
    setTimeout(() => toast.remove(), 250);
  }, duration);
}
```

## 🤖 Maskotka

### Podstawowe użycie

```html
<!-- Default (floating) -->
<div class="mascot-container mascot-animated">
  <img src="assets/mascot/mascot.png" alt="Claude Mascot" class="mascot">
</div>
```

### Wersje animowane

```html
<!-- Success (celebrating) -->
<div class="mascot-container mascot-success">
  <img src="assets/mascot/mascot.png" alt="Success!" class="mascot">
</div>

<!-- Error (confused) -->
<div class="mascot-container mascot-error">
  <img src="assets/mascot/mascot.png" alt="Error" class="mascot">
</div>

<!-- Thinking -->
<div class="mascot-container mascot-thinking">
  <img src="assets/mascot/mascot.png" alt="Thinking" class="mascot">
</div>

<!-- Wave (greeting) -->
<div class="mascot-container mascot-wave">
  <img src="assets/mascot/mascot.png" alt="Hello!" class="mascot">
</div>

<!-- Loading -->
<div class="mascot-container mascot-loader">
  <img src="assets/mascot/mascot.png" alt="Loading" class="mascot">
</div>
```

### Speech Bubble

```html
<div class="mascot-container">
  <img src="assets/mascot/mascot.png" alt="Mascot" class="mascot">
</div>
<div class="mascot-speech-bubble">
  <p class="speech-text">
    Świetna robota! Ukończyłeś pierwszą lekcję! 🎉
  </p>
</div>
```

### Rozmiary

```html
<div class="mascot-container mascot-sm">...</div>   <!-- 80px -->
<div class="mascot-container mascot-md">...</div>   <!-- 120px -->
<div class="mascot-container mascot-lg">...</div>   <!-- 200px -->
<div class="mascot-container mascot-xl">...</div>   <!-- 300px -->
```

## 🎨 Przyciski

### Warianty

```html
<!-- Primary -->
<button class="btn btn-primary">Primary</button>

<!-- Secondary -->
<button class="btn btn-secondary">Secondary</button>

<!-- Outline -->
<button class="btn btn-outline">Outline</button>

<!-- Disabled -->
<button class="btn btn-primary" disabled>Disabled</button>
```

### Rozmiary

```html
<button class="btn btn-sm">Small</button>
<button class="btn">Default</button>
<button class="btn btn-lg">Large</button>
<button class="btn btn-block">Block (full width)</button>
```

## ♿ Accessibility

### Focus States

Wszystkie interaktywne elementy mają widoczne focus states:
```scss
&:focus {
  outline: 2px solid $color-primary;
  outline-offset: 2px;
}
```

### Screen Reader Only

```html
<span class="sr-only">Tekst tylko dla czytników ekranu</span>
```

### Reduced Motion

System automatycznie respektuje preferencje użytkownika:
```scss
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

### ARIA Labels

```html
<!-- Hamburger menu -->
<button class="hamburger" aria-label="Menu" aria-expanded="false">
  ...
</button>

<!-- Navigation -->
<nav aria-label="Main navigation">
  ...
</nav>
```

## 🛠 Development

### Kompilacja SCSS

```bash
# Development (watch mode)
npm run dev

# Build (compressed)
npm run build

# Tylko SCSS (watch)
npm run sass:watch

# Tylko SCSS (build)
npm run sass:build
```

### Live Server

```bash
npm run serve  # Port 8080
```

## 📝 Best Practices

### 1. Mobile First
Zawsze projektuj najpierw dla mobile, potem rozszerzaj na desktop.

### 2. Touch Targets
Minimum 44px dla wszystkich interaktywnych elementów.

### 3. Loading States
Zawsze pokazuj skeleton screen lub loader podczas ładowania.

### 4. Error Handling
Używaj przyjaznych komunikatów błędów z ikonami.

### 5. Animacje
Używaj animacji oszczędnie - muszą mieć cel funkcjonalny.

### 6. Accessibility
Testuj z keyboard navigation i screen readerem.

### 7. Performance
Minimalizuj CSS, lazy load obrazy, używaj WebP.

## 🎯 To Do (Faza 7)

- [ ] Cross-browser testing
- [ ] Real device testing
- [ ] Wygenerować maskotki w Midjourney
- [ ] Accessibility audit z narzędziami
- [ ] Performance optimization
- [ ] Critical CSS inline
- [ ] JavaScript toast system
- [ ] Page transitions w router

## 📚 Zasoby

- [Sass Documentation](https://sass-lang.com/documentation)
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Can I Use](https://caniuse.com/)

---

**Version:** 1.0
**Last Updated:** 2025-10-30
**Status:** Production Ready
