import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  server: {
    proxy: {
      '/api': {
        target: 'https://caseport.onrender.com',
        changeOrigin: true,
        secure: false
      }
    }
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
