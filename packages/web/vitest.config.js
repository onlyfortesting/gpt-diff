import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte({ hot: !process.env.VITEST })],
  setupFiles: ['./vitest-setup.js'],
  test: {
    alias: [{ find: /^svelte$/, replacement: 'svelte/internal' }],
    globals: true,
    environment: 'jsdom',
  },
})
