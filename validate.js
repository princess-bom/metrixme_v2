#!/usr/bin/env node

// Matrix Me Project Validation Script
const fs = require('fs');
const path = require('path');

class ProjectValidator {
    constructor() {
        this.errors = [];
        this.warnings = [];
        this.passed = [];
        this.basePath = path.join(__dirname, 'src');
    }

    log(message, type = 'info') {
        const timestamp = new Date().toISOString();
        const prefix = type === 'error' ? '❌' : type === 'warning' ? '⚠️' : '✅';
        console.log(`${prefix} [${timestamp}] ${message}`);
    }

    checkFileExists(filePath, required = true) {
        const fullPath = path.join(this.basePath, filePath);
        const exists = fs.existsSync(fullPath);
        
        if (exists) {
            this.passed.push(`File exists: ${filePath}`);
            this.log(`File exists: ${filePath}`);
        } else {
            const message = `Missing file: ${filePath}`;
            if (required) {
                this.errors.push(message);
                this.log(message, 'error');
            } else {
                this.warnings.push(message);
                this.log(message, 'warning');
            }
        }
        
        return exists;
    }

    checkFileContent(filePath, requiredContent, description) {
        const fullPath = path.join(this.basePath, filePath);
        
        if (!fs.existsSync(fullPath)) {
            this.errors.push(`Cannot check content: ${filePath} does not exist`);
            return false;
        }

        try {
            const content = fs.readFileSync(fullPath, 'utf8');
            const hasContent = Array.isArray(requiredContent) 
                ? requiredContent.some(req => content.includes(req))
                : content.includes(requiredContent);

            if (hasContent) {
                this.passed.push(`Content check passed: ${description}`);
                this.log(`Content check passed: ${description}`);
            } else {
                this.errors.push(`Content check failed: ${description}`);
                this.log(`Content check failed: ${description}`, 'error');
            }

            return hasContent;
        } catch (error) {
            this.errors.push(`Error reading file ${filePath}: ${error.message}`);
            this.log(`Error reading file ${filePath}: ${error.message}`, 'error');
            return false;
        }
    }

    validateProjectStructure() {
        this.log('🔍 Validating project structure...');

        // Core HTML files
        const htmlFiles = [
            'index.html',
            'ko/quiz/index.html',
            'ko/result/index.html',
            'en/quiz/index.html',
            'en/result/index.html'
        ];

        htmlFiles.forEach(file => this.checkFileExists(file));

        // CSS files
        const cssFiles = [
            'assets/css/terminal.css',
            'assets/css/mobile.css',
            'assets/css/accessibility.css'
        ];

        cssFiles.forEach(file => this.checkFileExists(file));

        // JavaScript files
        const jsFiles = [
            'assets/js/terminal.js',
            'assets/js/typing.js',
            'assets/js/quiz.js',
            'assets/js/ascii-art.js',
            'assets/js/performance.js',
            'assets/js/test.js'
        ];

        jsFiles.forEach(file => this.checkFileExists(file));

        // Data files
        const dataFiles = [
            'assets/data/quiz-ko.json',
            'assets/data/quiz-en.json'
        ];

        dataFiles.forEach(file => this.checkFileExists(file));

        // PWA files
        const pwaFiles = [
            'manifest.json',
            'sw.js'
        ];

        pwaFiles.forEach(file => this.checkFileExists(file));

        // Icon files (optional)
        const iconFiles = [
            'assets/icons/icon.svg',
            'assets/icons/icon-generator.html'
        ];

        iconFiles.forEach(file => this.checkFileExists(file, false));
    }

    validateContent() {
        this.log('📝 Validating content...');

        // Check main HTML structure
        this.checkFileContent('index.html', [
            'Matrix Me',
            'lang="ko"',
            'terminal-container',
            'language-options'
        ], 'Main HTML structure');

        // Check Korean quiz page
        this.checkFileContent('ko/quiz/index.html', [
            'lang="ko"',
            'AI 유형 진단',
            'terminal-container'
        ], 'Korean quiz page');

        // Check English quiz page
        this.checkFileContent('en/quiz/index.html', [
            'lang="en"',
            'AI Personality',
            'terminal-container'
        ], 'English quiz page');

        // Check CSS files
        this.checkFileContent('assets/css/terminal.css', [
            'terminal-container',
            'neon',
            '--text-primary'
        ], 'Terminal CSS');

        this.checkFileContent('assets/css/mobile.css', [
            '@media',
            'max-width',
            'min-width'
        ], 'Mobile CSS');

        this.checkFileContent('assets/css/accessibility.css', [
            'focus',
            'sr-only',
            'prefers-reduced-motion'
        ], 'Accessibility CSS');

        // Check JavaScript files
        this.checkFileContent('assets/js/terminal.js', [
            'TerminalEngine',
            'class',
            'initialize'
        ], 'Terminal JS');

        this.checkFileContent('assets/js/quiz.js', [
            'QuizEngine',
            'calculateResult',
            'class'
        ], 'Quiz JS');

        this.checkFileContent('assets/js/ascii-art.js', [
            'asciiArt',
            'ko',
            'en'
        ], 'ASCII Art JS');

        // Check quiz data
        this.checkFileContent('assets/data/quiz-ko.json', [
            'questions',
            'personality_types',
            'scoring'
        ], 'Korean quiz data');

        this.checkFileContent('assets/data/quiz-en.json', [
            'questions',
            'personality_types',
            'scoring'
        ], 'English quiz data');

        // Check PWA files
        this.checkFileContent('manifest.json', [
            'Matrix Me',
            'short_name',
            'icons'
        ], 'PWA manifest');

        this.checkFileContent('sw.js', [
            'CACHE_NAME',
            'install',
            'fetch'
        ], 'Service Worker');
    }

    validateConfiguration() {
        this.log('⚙️ Validating configuration...');

        // Check package.json
        const packageJsonPath = path.join(__dirname, 'package.json');
        if (fs.existsSync(packageJsonPath)) {
            try {
                const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
                
                if (packageJson.scripts && packageJson.scripts.build) {
                    this.passed.push('Build script configured');
                    this.log('Build script configured');
                } else {
                    this.errors.push('Build script not configured');
                    this.log('Build script not configured', 'error');
                }

                if (packageJson.scripts && packageJson.scripts.dev) {
                    this.passed.push('Dev script configured');
                    this.log('Dev script configured');
                } else {
                    this.warnings.push('Dev script not configured');
                    this.log('Dev script not configured', 'warning');
                }
            } catch (error) {
                this.errors.push(`Error parsing package.json: ${error.message}`);
                this.log(`Error parsing package.json: ${error.message}`, 'error');
            }
        } else {
            this.errors.push('package.json not found');
            this.log('package.json not found', 'error');
        }

        // Check netlify.toml
        const netlifyTomlPath = path.join(__dirname, 'netlify.toml');
        if (fs.existsSync(netlifyTomlPath)) {
            this.passed.push('Netlify configuration exists');
            this.log('Netlify configuration exists');
        } else {
            this.warnings.push('Netlify configuration missing');
            this.log('Netlify configuration missing', 'warning');
        }

        // Check vite.config.js
        const viteConfigPath = path.join(__dirname, 'vite.config.js');
        if (fs.existsSync(viteConfigPath)) {
            this.passed.push('Vite configuration exists');
            this.log('Vite configuration exists');
        } else {
            this.warnings.push('Vite configuration missing');
            this.log('Vite configuration missing', 'warning');
        }
    }

    generateReport() {
        this.log('📊 Generating validation report...');

        const totalChecks = this.passed.length + this.errors.length + this.warnings.length;
        const successRate = Math.round((this.passed.length / totalChecks) * 100);

        console.log('\n' + '='.repeat(60));
        console.log('📋 MATRIX ME PROJECT VALIDATION REPORT');
        console.log('='.repeat(60));
        console.log(`📊 Total Checks: ${totalChecks}`);
        console.log(`✅ Passed: ${this.passed.length}`);
        console.log(`⚠️  Warnings: ${this.warnings.length}`);
        console.log(`❌ Errors: ${this.errors.length}`);
        console.log(`🎯 Success Rate: ${successRate}%`);
        console.log('='.repeat(60));

        if (this.errors.length > 0) {
            console.log('\n❌ ERRORS:');
            this.errors.forEach(error => console.log(`  • ${error}`));
        }

        if (this.warnings.length > 0) {
            console.log('\n⚠️  WARNINGS:');
            this.warnings.forEach(warning => console.log(`  • ${warning}`));
        }

        console.log('\n🎉 VALIDATION COMPLETE!');
        
        if (this.errors.length === 0) {
            console.log('✅ Project is ready for deployment!');
        } else {
            console.log('❌ Please fix the errors before deployment.');
        }

        return this.errors.length === 0;
    }

    run() {
        console.log('🚀 Starting Matrix Me Project Validation...\n');
        
        this.validateProjectStructure();
        this.validateContent();
        this.validateConfiguration();
        
        return this.generateReport();
    }
}

// Run validation
const validator = new ProjectValidator();
const isValid = validator.run();

process.exit(isValid ? 0 : 1);