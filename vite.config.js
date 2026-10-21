import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/') || id.includes('node_modules/react-router-dom/')) {
            return 'vendor-react'
          }
          if (id.includes('node_modules/@chakra-ui/') || id.includes('node_modules/@emotion/')) {
            return 'vendor-chakra'
          }
          if (id.includes('node_modules/motion/')) {
            return 'vendor-motion'
          }
          if (id.includes('node_modules/react-icons/')) {
            return 'vendor-icons'
          }
        }
      }
    },
    chunkSizeWarningLimit: 600
  }
})
