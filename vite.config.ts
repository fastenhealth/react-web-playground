import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['@fastenhealth/fasten-stitch-element-react'],
  },
  build: {
    commonjsOptions: {
      include: [/fasten-stitch-element-react/, /node_modules/],
    },
  },
});
