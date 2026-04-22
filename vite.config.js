import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.js'],   // ← THIS is the missing piece
    globals: true,                         // ← THIS enables global expect()
    coverage: {
  provider: 'v8',
  reporter: ['lcov', 'text'],
  reportsDirectory: './coverage',
  exclude: [
    // SonarQube-style exclusions
    '**/coverage/**',          // generated reports
    '**/dist/**',              // build output
    '**/node_modules/**',      // dependencies
    '**/*.test.*',             // test files
    '**/setupTests.*',         // test setup
    '**/*.config.*',           // config files (vite.config.js, etc.)
    '**/main.jsx',             // Vite entry point
    '**/*.css',                // static assets
    '**/*.html',               // static HTML
  ]
},
  },
})