import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    ui: true,
    include: ['src/tests-backend/**/*.test.js', 'src/tests-backend/**/*.test.ts'],
  },
  
})
