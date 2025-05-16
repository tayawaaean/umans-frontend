import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),svgr()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // External libraries into vendor chunk
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('@mui')) return 'vendor-mui';
            if (id.includes('dayjs')) return 'vendor-dayjs';
            if (id.includes('lodash')) return 'vendor-lodash';
            return 'vendor-other';
          }

          // Split large pages/components
          if (id.includes('/src/pages/')) {
            const name = id.split('/src/pages/')[1].split('/')[0];
            return `page-${name}`;
          }
        },
      },
    },
  },
})
