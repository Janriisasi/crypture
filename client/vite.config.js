import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // or whatever framework you're using
import postcssConfig from '@tailwindcss/postcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [postcssConfig, autoprefixer],
    },
  },
})