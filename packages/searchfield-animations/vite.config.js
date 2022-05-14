import { defineConfig } from 'vite'
import path from 'node:path';
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/lib/index.jsx'),
      name: 'searchfield-animations',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
            globals: {
                react: 'React',
                'react-dom': 'ReactDOM',
            },
        },
    },
  }
})
