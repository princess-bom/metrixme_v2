import { defineConfig } from 'vite'

export default defineConfig({
  root: 'src',
  base: './',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: 'src/index.html',
        'ko-quiz': 'src/ko/quiz/index.html',
        'ko-result': 'src/ko/result/index.html',
        'ko-share': 'src/ko/share/index.html',
        'en-quiz': 'src/en/quiz/index.html',
        'en-result': 'src/en/result/index.html',
        'en-share': 'src/en/share/index.html'
      }
    }
  },
  server: {
    port: 3100,
    host: true,
    // SPA 라우팅 지원 - 클린 URL 처리
    historyApiFallback: {
      rewrites: [
        // ShareId 기반 결과 페이지
        { from: /^\/ko\/result\/[A-Za-z0-9]+$/, to: '/ko/result/index.html' },
        { from: /^\/en\/result\/[A-Za-z0-9]+$/, to: '/en/result/index.html' },
        // ShareId 기반 공유 페이지
        { from: /^\/ko\/share\/[A-Za-z0-9]+$/, to: '/ko/share/index.html' },
        { from: /^\/en\/share\/[A-Za-z0-9]+$/, to: '/en/share/index.html' }
      ]
    }
  },
  preview: {
    port: 3000,
    host: true
  }
})