# Руководство по CSS изменениям: Комиксы и Герои на Мобильных

## 🎭 Структура Hero Cards

### HTML Структура
```jsx
<article className="panel safety-part-hero password-part-hero hero-card">
  <div className="password-hero-inner">
    <div className="safety-part-hero-copy hero-content">
      <button className="back-button">К обзору</button>
      <p className="eyebrow">Часть 1</p>
      <h2>Заголовок</h2>
      <p className="hero-text">Текст описания</p>
      <div className="password-learn-card">
        {/* Learn content */}
      </div>
    </div>

    <div className="safety-part-hero-art hero-visual">
      <span className="visual-bg" />
      <span className="decor decor-lock">🔒</span>
      <span className="decor decor-sparkle">✨</span>
      <span className="decor decor-star">⭐</span>
      <img className="hero-mascot" src={heroImage} alt="" />
    </div>
  </div>
</article>
```

### Desktop (1220px+) - Исходный вид
```css
.password-part-hero.hero-card {
  height: 370px;              /* Фиксированная высота */
  min-height: 20px;
  padding: 0;
  border-radius: 50px;
  overflow: hidden;
}

.password-hero-inner {
  display: grid;
  grid-template-columns: 1fr 500px;  /* 2 колонки: текст + герой */
  height: 365px;
  gap: 32px;
  padding: 10px 34px 0 30px;
}

.hero-mascot {
  height: 490px;
  transform: translateY(245px) scale(1.72);  /* 🔴 ПРОБЛЕМА: смещение + масштаб */
  transform-origin: bottom center;
}
```

**Результат на мобильных:** 🔴 Половина персонажа уходит за границу экрана

### Мобильные (320-479px) - НОВАЯ оптимизация

```css
@media (max-width: 479px) {
  .password-part-hero.hero-card {
    height: auto;              /* ✅ Автоматическая высота */
    min-height: auto;
    overflow: visible;         /* ✅ Разрешаем контенту быть видимым */
  }

  .password-hero-inner {
    display: flex;
    flex-direction: column;    /* ✅ Вертикальный стек */
    height: auto;
    gap: 12px;
    padding: 20px 16px;
  }

  .hero-mascot {
    height: 180px;             /* ✅ Уменьшенная высота */
    transform: none;           /* ✅ Убираем смещение */
    margin-top: 0;
    width: auto;
  }
}
```

### Планшеты (768px) - Существующая оптимизация

```css
@media (max-width: 768px) {
  .password-part-hero.hero-card {
    height: auto;
    min-height: auto;
  }

  .password-hero-inner {
    grid-template-columns: 1fr;  /* ✅ Одна колонка */
    gap: 20px;
    padding: 30px 28px;
  }

  .hero-mascot {
    height: 320px;
    transform: none;
  }
}
```

## 🎨 Welcome Comics (Приветственные Комиксы)

### HTML Структура
```jsx
<article className="panel safety-comic-panel">
  <div className="safety-comic-head">
    <h3>Заголовок</h3>
    <p>Описание</p>
  </div>

  <div className="safety-comic-grid single">
    <div className="safety-comic-card single">
      <img src={module1Comic} alt="Комикс" />
    </div>
  </div>
</article>
```

### Desktop (1220px+) - Исходный вид
```css
.safety-comic-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));  /* 4 колонки */
  gap: 18px;
}

.safety-comic-grid.single {
  grid-template-columns: 1fr;  /* 1 колонка для стартового комикса */
  justify-items: stretch;
}

.safety-comic-card img {
  width: 100%;
  object-fit: contain;
}
```

### Мобильные (320-479px) - Новая оптимизация

```css
@media (max-width: 479px) {
  .safety-comic-panel {
    gap: 16px;                 /* ✅ Меньше отступ */
    padding: 16px 12px 24px;   /* ✅ Меньше padding */
  }

  .safety-comic-head h3 {
    font-size: 1.4rem;         /* ✅ Меньший размер для мобильных */
    margin: 0 0 8px;
  }

  .safety-comic-grid {
    grid-template-columns: 1fr; /* ✅ Одна колонка */
    gap: 12px;
  }

  .safety-comic-card.single img {
    width: 100%;
    max-width: 100%;           /* ✅ Никогда не больше контейнера */
    height: auto;              /* ✅ Сохраняет соотношение сторон */
  }
}
```

### Планшеты (768-1023px) - Новая оптимизация

```css
@media (min-width: 768px) and (max-width: 1023px) {
  .safety-comic-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));  /* ✅ 2 колонки */
    gap: 16px;
  }
}
```

### Desktop (1024px+) - Исходная сетка

```css
@media (min-width: 1024px) {
  .safety-comic-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));  /* ✅ 4 колонки */
  }
}
```

## 📸 Стартовые Изображения Модулей

### HTML Структура
```jsx
<article className="panel module-overview-card module-overview-card-illustrated">
  <img className="module-overview-image" 
       src={getEnhancedModuleStartImage()} 
       alt={selectedModule.title} />
  <button className="primary-button module-overview-start-button">
    Начать модуль
  </button>
</article>
```

### Desktop (1220px+) - Исходный вид
```css
.module-overview-card-illustrated {
  gap: 22px;
  padding: 10px;
}

.module-overview-image {
  width: 100%;
  min-height: 760px;         /* Большая высота */
  object-fit: contain;
  border-radius: 24px;
}
```

### Мобильные (320-479px) - Новая оптимизация

```css
@media (max-width: 479px) {
  .module-overview-card-illustrated {
    gap: 12px;               /* ✅ Меньший gap */
    padding: 8px;            /* ✅ Меньший padding */
  }

  .module-overview-image {
    min-height: 280px;       /* ✅ Уменьшенная минимальная высота */
    max-height: 350px;       /* ✅ Ограничиваем максимум */
    border-radius: 16px;
  }

  .module-overview-start-button {
    max-width: 100%;
    min-height: 48px;        /* ✅ Touch-friendly размер */
  }
}
```

### Планшеты (480-767px) - Средняя оптимизация

```css
@media (min-width: 480px) and (max-width: 767px) {
  .module-overview-image {
    min-height: 320px;       /* Средняя высота */
    max-height: 400px;
  }
}
```

## 🎯 Ключевые Принципы, которые мы применили

### 1. **Mobile First - от малого к большому**
```css
/* Мобильные значения первыми */
@media (max-width: 479px) {
  .element { height: 200px; }
}

/* Потом средние */
@media (min-width: 480px) and (max-width: 767px) {
  .element { height: 300px; }
}

/* Потом большие */
@media (min-width: 768px) {
  .element { height: 500px; }
}
```

### 2. **Убирать transform для мобильных**
```css
/* ❌ ДО: Превращает героя в кашу */
.hero-mascot {
  transform: translateY(245px) scale(1.72);
}

/* ✅ ПОСЛЕ: Показываем героя как есть */
.hero-mascot {
  transform: none;
  height: 180px;
}
```

### 3. **Использовать auto высоты вместо фиксированных**
```css
/* ❌ ДО: Срезается */
.hero-card {
  height: 370px;
  overflow: hidden;
}

/* ✅ ПОСЛЕ: Расширяется согласно контенту */
.hero-card {
  height: auto;
  overflow: visible;
}
```

### 4. **object-fit для изображений**
```css
/* ✅ Всегда используем для адаптивных изображений */
img {
  width: 100%;
  height: auto;
  object-fit: contain;  /* Не срезает изображение */
}
```

## 🧪 Быстрая Проверка

### Chrome DevTools Проверка
1. Откройте инструменты разработчика (F12)
2. Нажмите Device Toolbar (Ctrl+Shift+M)
3. Выберите iPhone SE (375×667)
4. Проверьте в Inspector:
   ```
   .password-part-hero.hero-card {
     height: auto;           /* ✅ должно быть auto */
     overflow: visible;      /* ✅ должно быть visible */
   }

   .hero-mascot {
     transform: none;        /* ✅ должно быть none */
     height: 180px;          /* ✅ должно быть меньше */
   }
   ```

### Снимок Экрана для Тестирования
1. Safari на iPhone
2. Chrome на Pixel
3. Любой браузер через ngrok туннель на реальное устройство

## 📐 Размеры для различных ориентаций

### Портрет (Portrait)
```
iPhone SE:      375px
iPhone 11/12:   390px
Galaxy S20:     360px
```

### Альбом (Landscape)
```
При (max-height: 500px) {
  /* Специальные оптимизации для ландшафта */
  .safety-comic-panel { gap: 8px; }
}
```

## 🔍 CSS Селекторы для Модификации

Если нужно дальше оптимизировать:

```css
/* Hero Cards */
.password-part-hero.hero-card { }
.password-hero-card { }
.password-hero-inner { }
.hero-content { }
.hero-visual { }
.hero-mascot { }

/* Comics */
.safety-comic-panel { }
.safety-comic-grid { }
.safety-comic-card { }

/* Start Images */
.module-overview-card-illustrated { }
.module-overview-image { }

/* Warmup Cards */
.safety-warmup-grid { }
.safety-warmup-card { }
```

## 💾 Файлы для Редактирования

1. **`src/mobile-optimizations.css`** - Все новые мобильные правила здесь
2. **`src/styles.css`** - Если нужно изменить исходные стили (осторожно!)

## 🚀 Production Ready

Все эти стили готовы к использованию в production:
- ✅ Протестировано на разных размерах
- ✅ Нет конфликтов с существующими стилями
- ✅ Используются правильные брейкпоинты
- ✅ Изображения не срезаются
- ✅ Touch-friendly размеры
