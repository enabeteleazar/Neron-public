import { defineConfig } from 'vite';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        enLigne: resolve(__dirname, 'en-ligne.html'),
        community: resolve(__dirname, 'community.html'),
        box: resolve(__dirname, 'box.html'),
        mentionsLegales: resolve(__dirname, 'mentions-legales.html'),
        confidentialite: resolve(__dirname, 'confidentialite.html'),
        cgu: resolve(__dirname, 'cgu.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
  },
});
