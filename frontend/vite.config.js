import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      '@tensorflow/tfjs',
      '@tensorflow-models/coco-ssd',
    ],
    esbuildOptions: {
      // CommonJS modules ko ESM mein convert karo
      define: {
        global: 'globalThis',
        module: '{}',
      },
    },
  },
  define: {
    // Browser mein 'module' undefined hota hai — yeh fix karta hai
    'typeof module': '"object"',
    'module.exports': '({})',
  },
})