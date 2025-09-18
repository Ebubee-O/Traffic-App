import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    allowedHosts: ['7caccdff-c5e3-4a7d-a25b-d2bd203e1562-00-2wpjvlnex50ng.spock.replit.dev'],
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
});
