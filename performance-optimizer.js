// Performance Optimization Script for TeenSalon
(function() {
    'use strict';
    
    // Optimize video loading
    function optimizeVideos() {
        const videos = document.querySelectorAll('video');
        videos.forEach(video => {
            // Set preload to none for better performance
            video.setAttribute('preload', 'none');
            video.setAttribute('loading', 'lazy');
            
            // Add click-to-play functionality
            video.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                } else {
                    video.pause();
                }
            });
            
            // Add loading indicator
            const loadingIndicator = document.createElement('div');
            loadingIndicator.className = 'video-loading';
            loadingIndicator.innerHTML = '<i class="fas fa-play"></i>';
            loadingIndicator.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 20px;
                border-radius: 50%;
                cursor: pointer;
                z-index: 10;
            `;
            
            video.parentElement.style.position = 'relative';
            video.parentElement.appendChild(loadingIndicator);
            
            video.addEventListener('loadeddata', function() {
                loadingIndicator.style.display = 'none';
            });
        });
    }
    
    // Optimize image loading
    function optimizeImages() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            // Add lazy loading if not present
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add decoding async
            img.setAttribute('decoding', 'async');
            
            // Add error handling
            img.addEventListener('error', function() {
                this.style.display = 'none';
            });
        });
    }
    
    // Defer non-critical scripts
    function deferScripts() {
        // Defer Font Awesome if not critical
        const fontAwesome = document.querySelector('link[href*="font-awesome"]');
        if (fontAwesome) {
            fontAwesome.setAttribute('media', 'print');
            fontAwesome.setAttribute('onload', 'this.media="all"');
        }
    }
    
    // Add intersection observer for lazy loading
    function setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }
    
    // Optimize third-party scripts
    function optimizeThirdPartyScripts() {
        // Defer Google Analytics
        if (typeof gtag !== 'undefined') {
            // Already deferred in HTML
        }
        
        // Defer Facebook Pixel
        if (typeof fbq !== 'undefined') {
            // Already deferred in HTML
        }
    }
    
    // Add performance monitoring
    function addPerformanceMonitoring() {
        // Monitor Core Web Vitals
        if ('PerformanceObserver' in window) {
            // Monitor LCP
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                console.log('LCP:', lastEntry.startTime);
            }).observe({ entryTypes: ['largest-contentful-paint'] });
            
            // Monitor FID
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('FID:', entry.processingStart - entry.startTime);
                });
            }).observe({ entryTypes: ['first-input'] });
            
            // Monitor CLS
            new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    console.log('CLS:', entry.value);
                });
            }).observe({ entryTypes: ['layout-shift'] });
        }
    }
    
    // Initialize optimizations when DOM is ready
    function init() {
        optimizeVideos();
        optimizeImages();
        deferScripts();
        setupLazyLoading();
        optimizeThirdPartyScripts();
        addPerformanceMonitoring();
    }
    
    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Run when page is fully loaded
    window.addEventListener('load', function() {
        // Additional optimizations after page load
        console.log('Page fully loaded - Performance optimizations active');
    });
    
})();
