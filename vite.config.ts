import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/ultimate-react-hook-form',
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@/Assets', replacement: '/src/assets' },
      { find: '@/Components', replacement: '/src/components' },
      { find: '@', replacement: '/src' },
      { find: '~', replacement: '/tests' }
    ],
  }
})
