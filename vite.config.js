import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 1234,
  },
  base: './', // Ensure paths are relative for GitHub Pages
});
