import React, { useEffect, useRef, useState } from 'react';

/**
 * OptimizedImage - Компонент для оптимизированных изображений на мобильных
 * Поддерживает:
 * - Lazy loading
 * - Responsive srcset для разных разрешений
 * - Placeholder во время загрузки
 * - Обработка ошибок
 */
export const OptimizedImage = ({
  src,
  alt,
  className = '',
  width,
  height,
  srcSet,
  sizes,
  placeholder = true,
  onLoad,
  onError,
  loading = 'lazy'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (!imgRef.current) return;

    // Поддержка для браузеров без встроенной поддержки lazy loading
    if ('IntersectionObserver' in window && loading === 'lazy') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src;
              if (img.dataset.srcset) {
                img.srcSet = img.dataset.srcset;
              }
              observer.unobserve(img);
            }
          });
        },
        { rootMargin: '50px' }
      );
      observer.observe(imgRef.current);

      return () => {
        if (observer) observer.disconnect();
      };
    }
  }, [loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    console.error(`Failed to load image: ${src}`);
    onError?.();
  };

  return (
    <div className={`optimized-image-wrapper ${isLoaded ? 'loaded' : 'loading'}`}>
      <img
        ref={imgRef}
        src={loading === 'lazy' ? undefined : src}
        data-src={loading === 'lazy' ? src : undefined}
        data-srcset={loading === 'lazy' && srcSet ? srcSet : undefined}
        srcSet={loading === 'eager' ? srcSet : undefined}
        sizes={sizes}
        alt={alt}
        width={width}
        height={height}
        className={`optimized-image ${className}`}
        loading={loading}
        onLoad={handleLoad}
        onError={handleError}
      />
      {placeholder && !isLoaded && (
        <div className="image-placeholder" aria-hidden="true" />
      )}
    </div>
  );
};

/**
 * MobileOptimizer - Утилита для инициализации мобильных оптимизаций
 */
export const MobileOptimizer = {
  /**
   * Инициализирует мобильные оптимизации
   */
  init() {
    this.setupDevicePixelRatio();
    this.optimizeScrolling();
    this.fixIOSInputZoom();
    this.addTouchOptimizations();
  },

  /**
   * Определяет DPI экрана и загружает соответствующие ресурсы
   */
  setupDevicePixelRatio() {
    const dpr = window.devicePixelRatio || 1;
    document.documentElement.setAttribute('data-dpr', Math.ceil(dpr));
  },

  /**
   * Оптимизирует производительность скроллинга
   */
  optimizeScrolling() {
    // Используем passive listeners для улучшения производительности
    let ticking = false;
    let lastScrollY = 0;

    const updateScrollPosition = () => {
      lastScrollY = window.scrollY;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollPosition);
        ticking = true;
      }
    }, { passive: true });
  },

  /**
   * Исправляет проблему зума при фокусе на input полях в iOS
   */
  fixIOSInputZoom() {
    const inputs = document.querySelectorAll('input, textarea, select');
    inputs.forEach((input) => {
      if (input.type !== 'range') {
        input.style.fontSize = '16px';
      }
    });

    // Добавляем обработчик для новых элементов
    document.addEventListener('input', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        e.target.style.fontSize = '16px';
      }
    });
  },

  /**
   * Добавляет оптимизации для touch устройств
   */
  addTouchOptimizations() {
    const isTouchDevice = () => {
      return (
        ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0)
      );
    };

    if (isTouchDevice()) {
      document.documentElement.classList.add('touch-device');

      // Добавляет visual feedback при нажатии
      document.addEventListener('touchstart', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
          e.target.classList.add('active');
        }
      }, { passive: true });

      document.addEventListener('touchend', (e) => {
        if (e.target.tagName === 'BUTTON' || e.target.tagName === 'A') {
          e.target.classList.remove('active');
        }
      }, { passive: true });
    }
  },

  /**
   * Проверяет поддержку определенной фичи
   */
  supports(feature) {
    const checks = {
      webp: () => {
        const canvas = document.createElement('canvas');
        return canvas.toDataURL('image/webp').indexOf('image/webp') === 5;
      },
      imageSet: () => CSS.supports('background-image', 'image-set(url(test.jpg) 1x)'),
      lazyLoading: () => 'loading' in HTMLImageElement.prototype,
      intersectionObserver: () => 'IntersectionObserver' in window,
      mediaQuery: () => window.matchMedia('(prefers-color-scheme: dark)').media !== 'not all',
    };

    return checks[feature]?.() ?? false;
  },

  /**
   * Логирует информацию о устройстве для отладки
   */
  debug() {
    console.group('📱 Mobile Device Info');
    console.log('Viewport Width:', window.innerWidth);
    console.log('Viewport Height:', window.innerHeight);
    console.log('Device Pixel Ratio:', window.devicePixelRatio);
    console.log('Touch Device:', this.supports('intersectionObserver') ? 'Likely yes' : 'No');
    console.log('Lazy Loading Supported:', this.supports('lazyLoading'));
    console.log('Intersection Observer:', this.supports('intersectionObserver'));
    console.log('WebP Support:', this.supports('webp'));
    console.log('Color Scheme:', window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    console.groupEnd();
  }
};

export default OptimizedImage;
