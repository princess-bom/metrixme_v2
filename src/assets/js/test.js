// Test suite for Matrix Me application
class TestRunner {
    constructor() {
        this.tests = [];
        this.results = [];
    }

    addTest(name, testFn) {
        this.tests.push({ name, testFn });
    }

    async runTests() {
        console.log('🧪 Running Matrix Me Tests...\n');
        
        for (const test of this.tests) {
            try {
                const start = performance.now();
                await test.testFn();
                const end = performance.now();
                
                this.results.push({
                    name: test.name,
                    status: 'PASS',
                    duration: end - start
                });
                
                console.log(`✅ ${test.name} - PASSED (${(end - start).toFixed(2)}ms)`);
            } catch (error) {
                this.results.push({
                    name: test.name,
                    status: 'FAIL',
                    error: error.message
                });
                
                console.error(`❌ ${test.name} - FAILED: ${error.message}`);
            }
        }
        
        this.printSummary();
    }

    printSummary() {
        const passed = this.results.filter(r => r.status === 'PASS').length;
        const failed = this.results.filter(r => r.status === 'FAIL').length;
        
        console.log('\n📊 Test Summary:');
        console.log(`✅ Passed: ${passed}`);
        console.log(`❌ Failed: ${failed}`);
        console.log(`📝 Total: ${this.results.length}`);
        
        if (failed === 0) {
            console.log('\n🎉 All tests passed!');
        }
    }
}

// Initialize test runner
const testRunner = new TestRunner();

// Test 1: Terminal initialization
testRunner.addTest('Terminal Engine Initialization', async () => {
    const terminal = document.getElementById('terminal');
    if (!terminal) {
        throw new Error('Terminal element not found');
    }
    
    if (typeof TerminalEngine === 'undefined') {
        throw new Error('TerminalEngine class not loaded');
    }
    
    const engine = new TerminalEngine(terminal);
    if (!engine.initialize) {
        throw new Error('TerminalEngine missing initialize method');
    }
});

// Test 2: Quiz data loading (Vite JSON import 방식)
testRunner.addTest('Quiz Data Loading', async () => {
    try {
        console.log('Testing Vite JSON import for quiz data...');
        
        // Vite JSON import 방식으로 테스트
        const [koModule, enModule] = await Promise.all([
            import('../../assets/data/quiz-ko.json'),
            import('../../assets/data/quiz-en.json')
        ]);
        
        const koData = koModule.default;
        const enData = enModule.default;
        
        if (!koData || !enData) {
            throw new Error('Quiz data modules failed to load');
        }
        
        if (!koData.questions || !enData.questions) {
            throw new Error('Quiz data missing questions');
        }
        
        if (koData.questions.length !== 20 || enData.questions.length !== 20) {
            throw new Error('Quiz should have exactly 20 questions');
        }
        
        console.log('Vite JSON import test successful');
    } catch (error) {
        throw new Error(`Quiz data loading failed: ${error.message}`);
    }
});

// Test 3: ASCII Art data
testRunner.addTest('ASCII Art Data', async () => {
    const response = await fetch('/assets/js/ascii-art.js');
    if (!response.ok) {
        throw new Error('ASCII art file not accessible');
    }
    
    const asciiContent = await response.text();
    if (!asciiContent.includes('asciiArt')) {
        throw new Error('ASCII art data not found');
    }
});

// Test 4: CSS loading
testRunner.addTest('CSS Files Loading', async () => {
    const cssFiles = [
        '/assets/css/terminal.css',
        '/assets/css/mobile.css',
        '/assets/css/accessibility.css'
    ];
    
    for (const file of cssFiles) {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`CSS file ${file} not accessible`);
        }
    }
});

// Test 5: Service Worker
testRunner.addTest('Service Worker Registration', async () => {
    if (!('serviceWorker' in navigator)) {
        throw new Error('Service Worker not supported');
    }
    
    try {
        const registration = await navigator.serviceWorker.register('/sw.js');
        if (!registration) {
            throw new Error('Service Worker registration failed');
        }
    } catch (error) {
        throw new Error(`Service Worker error: ${error.message}`);
    }
});

// Test 6: PWA Manifest
testRunner.addTest('PWA Manifest', async () => {
    const response = await fetch('/manifest.json');
    if (!response.ok) {
        throw new Error('PWA manifest not accessible');
    }
    
    const manifest = await response.json();
    if (!manifest.name || !manifest.short_name) {
        throw new Error('PWA manifest missing required fields');
    }
});

// Test 7: Responsive Design
testRunner.addTest('Responsive Design', async () => {
    const mobileCSS = await fetch('/assets/css/mobile.css');
    if (!mobileCSS.ok) {
        throw new Error('Mobile CSS not accessible');
    }
    
    const cssContent = await mobileCSS.text();
    if (!cssContent.includes('@media')) {
        throw new Error('Mobile CSS missing media queries');
    }
});

// Test 8: Accessibility Features
testRunner.addTest('Accessibility Features', async () => {
    const accessibilityCSS = await fetch('/assets/css/accessibility.css');
    if (!accessibilityCSS.ok) {
        throw new Error('Accessibility CSS not accessible');
    }
    
    const cssContent = await accessibilityCSS.text();
    if (!cssContent.includes('focus') || !cssContent.includes('sr-only')) {
        throw new Error('Accessibility CSS missing key features');
    }
});

// Test 9: Performance Script
testRunner.addTest('Performance Optimization', async () => {
    const perfScript = await fetch('/assets/js/performance.js');
    if (!perfScript.ok) {
        throw new Error('Performance script not accessible');
    }
    
    const scriptContent = await perfScript.text();
    if (!scriptContent.includes('PerformanceManager') || !scriptContent.includes('WebVitalsMonitor')) {
        throw new Error('Performance script missing core classes');
    }
});

// Test 10: Language Support
testRunner.addTest('Language Support', async () => {
    const pages = [
        '/ko/quiz/',
        '/ko/result/',
        '/en/quiz/',
        '/en/result/'
    ];
    
    for (const page of pages) {
        const response = await fetch(page);
        if (!response.ok) {
            throw new Error(`Page ${page} not accessible`);
        }
    }
});

// Run tests when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add test button to page
    const testButton = document.createElement('button');
    testButton.textContent = 'Run Tests';
    testButton.style.position = 'fixed';
    testButton.style.top = '10px';
    testButton.style.right = '10px';
    testButton.style.zIndex = '9999';
    testButton.style.padding = '10px';
    testButton.style.background = '#00FF00';
    testButton.style.color = '#000';
    testButton.style.border = 'none';
    testButton.style.borderRadius = '4px';
    testButton.style.cursor = 'pointer';
    testButton.style.fontFamily = 'monospace';
    
    testButton.addEventListener('click', () => {
        testRunner.runTests();
    });
    
    document.body.appendChild(testButton);
});

// Export for manual testing
window.TestRunner = testRunner;