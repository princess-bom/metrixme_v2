// Performance optimization utilities for Matrix Me

class PerformanceManager {
    constructor() {
        this.observers = new Map();
        this.lazyElements = new Set();
        this.measurementCache = new Map();
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupResizeObserver();
        this.optimizeAnimations();
        this.preloadCriticalAssets();
    }

    // Intersection Observer for lazy loading
    setupIntersectionObserver() {
        if (!('IntersectionObserver' in window)) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadLazyElement(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        this.observers.set('intersection', observer);
    }

    // Resize Observer for responsive adjustments
    setupResizeObserver() {
        if (!('ResizeObserver' in window)) return;

        const observer = new ResizeObserver((entries) => {
            this.throttle(() => {
                entries.forEach(entry => {
                    this.handleResize(entry.target, entry.contentRect);
                });
            }, 16);
        });

        this.observers.set('resize', observer);
    }

    // Optimize animations based on device capabilities
    optimizeAnimations() {
        const isLowEndDevice = this.isLowEndDevice();
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (isLowEndDevice || prefersReducedMotion) {
            document.documentElement.style.setProperty('--animation-duration', '0.1s');
            document.documentElement.style.setProperty('--transition-duration', '0.1s');
        }
    }

    // Preload critical assets
    preloadCriticalAssets() {
        const criticalAssets = [
            '/assets/data/quiz-ko.json',
            '/assets/data/quiz-en.json',
            '/assets/js/ascii-art.js'
        ];

        criticalAssets.forEach(asset => {
            this.preloadAsset(asset);
        });
    }

    // Preload individual asset
    preloadAsset(url) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = url.endsWith('.json') ? 'fetch' : 'script';
        if (url.endsWith('.json')) {
            link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
    }

    // Lazy load elements
    addLazyElement(element) {
        this.lazyElements.add(element);
        this.observers.get('intersection')?.observe(element);
    }

    loadLazyElement(element) {
        if (element.dataset.src) {
            element.src = element.dataset.src;
        }
        if (element.dataset.content) {
            element.innerHTML = element.dataset.content;
        }
        this.lazyElements.delete(element);
    }

    // Throttle function for performance
    throttle(func, delay) {
        let timeoutId;
        let lastExecTime = 0;
        
        return function (...args) {
            const currentTime = Date.now();
            
            if (currentTime - lastExecTime > delay) {
                func.apply(this, args);
                lastExecTime = currentTime;
            } else {
                clearTimeout(timeoutId);
                timeoutId = setTimeout(() => {
                    func.apply(this, args);
                    lastExecTime = Date.now();
                }, delay - (currentTime - lastExecTime));
            }
        };
    }

    // Debounce function for performance
    debounce(func, delay) {
        let timeoutId;
        
        return function (...args) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func.apply(this, args), delay);
        };
    }

    // Check if device is low-end
    isLowEndDevice() {
        // Check memory (if available)
        if (navigator.deviceMemory && navigator.deviceMemory < 4) {
            return true;
        }

        // Check CPU cores (if available)
        if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
            return true;
        }

        // Check connection (if available)
        if (navigator.connection) {
            const connection = navigator.connection;
            if (connection.saveData || 
                connection.effectiveType === 'slow-2g' || 
                connection.effectiveType === '2g') {
                return true;
            }
        }

        return false;
    }

    // Handle resize events
    handleResize(element, rect) {
        // ASCII art responsive adjustment
        if (element.classList.contains('ascii-art')) {
            const fontSize = this.calculateOptimalFontSize(rect.width);
            element.style.fontSize = fontSize + 'px';
        }

        // Terminal container adjustment
        if (element.classList.contains('terminal-container')) {
            this.adjustTerminalSize(element, rect);
        }
    }

    // Calculate optimal font size for ASCII art
    calculateOptimalFontSize(containerWidth) {
        const baseSize = 12;
        const scaleFactor = containerWidth / 800; // 800px as reference
        return Math.max(8, Math.min(16, baseSize * scaleFactor));
    }

    // Adjust terminal size
    adjustTerminalSize(element, rect) {
        const isSmallScreen = rect.width < 600;
        element.classList.toggle('small-screen', isSmallScreen);
    }

    // Measure performance
    measurePerformance(name, fn) {
        const start = performance.now();
        const result = fn();
        const end = performance.now();
        
        this.measurementCache.set(name, end - start);
        console.log(`${name}: ${end - start}ms`);
        
        return result;
    }

    // Get cached measurement
    getMeasurement(name) {
        return this.measurementCache.get(name);
    }

    // Resource hints
    addResourceHints() {
        const hints = [
            { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
            { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
        ];

        hints.forEach(hint => {
            const link = document.createElement('link');
            Object.assign(link, hint);
            document.head.appendChild(link);
        });
    }

    // Clean up observers
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        this.lazyElements.clear();
        this.measurementCache.clear();
    }
}

// Web Vitals monitoring
class WebVitalsMonitor {
    constructor() {
        this.metrics = {};
        this.init();
    }

    init() {
        this.observeCLS();
        this.observeFID();
        this.observeFCP();
        this.observeLCP();
        this.observeTTFB();
    }

    // Cumulative Layout Shift
    observeCLS() {
        if (!('PerformanceObserver' in window)) return;

        const observer = new PerformanceObserver((list) => {
            let clsValue = 0;
            for (const entry of list.getEntries()) {
                if (!entry.hadRecentInput) {
                    clsValue += entry.value;
                }
            }
            this.metrics.cls = clsValue;
        });

        observer.observe({ type: 'layout-shift', buffered: true });
    }

    // First Input Delay
    observeFID() {
        if (!('PerformanceObserver' in window)) return;

        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                this.metrics.fid = entry.processingStart - entry.startTime;
            }
        });

        observer.observe({ type: 'first-input', buffered: true });
    }

    // First Contentful Paint
    observeFCP() {
        if (!('PerformanceObserver' in window)) return;

        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    this.metrics.fcp = entry.startTime;
                }
            }
        });

        observer.observe({ type: 'paint', buffered: true });
    }

    // Largest Contentful Paint
    observeLCP() {
        if (!('PerformanceObserver' in window)) return;

        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                this.metrics.lcp = entry.startTime;
            }
        });

        observer.observe({ type: 'largest-contentful-paint', buffered: true });
    }

    // Time to First Byte
    observeTTFB() {
        if (window.performance && window.performance.timing) {
            const timing = window.performance.timing;
            this.metrics.ttfb = timing.responseStart - timing.navigationStart;
        }
    }

    getMetrics() {
        return this.metrics;
    }
}

// Initialize performance management
const performanceManager = new PerformanceManager();
const webVitalsMonitor = new WebVitalsMonitor();

// Export for use in other modules
window.PerformanceManager = performanceManager;
window.WebVitalsMonitor = webVitalsMonitor;