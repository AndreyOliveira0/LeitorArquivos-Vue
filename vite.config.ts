import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';  // Importa o plugin para Vue
import path from 'path';

export default defineConfig({
  root: path.resolve(__dirname, 'src/frontend'),
  plugins: [vue()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  resolve: {
    extensions: ['.js', '.ts', '.vue', '.html'],
    alias: {
      '@': path.resolve(__dirname, 'src/frontend'),
      // Substitui o módulo nativo por um módulo vazio
      //'@rollup/rollup-linux-x64-gnu': path.resolve(__dirname, 'src/frontend/empty-module.js'),
    },
  },
  build: {
    outDir: path.resolve(__dirname, 'dist/frontend'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'src/frontend/main.js'),
      //external: (id) => id.includes('@rollup'),
    },
  },
});
