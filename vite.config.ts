import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solidPlugin()],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        dir: 'dist',
        entryFileNames: 'index.js',
        assetFileNames: 'index[extname]',
      },
    },
  },
});
