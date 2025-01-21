import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['phaser'], // Ensure Phaser is included in the optimized dependencies
  },
  resolve: {
    alias: {
      phaser: 'phaser/dist/phaser.js', // Use Phaser's ES module version
    },
  },
  server: {
    port: 1234,
  },
  base: './', // Ensure paths are relative for GitHub Pages
});
