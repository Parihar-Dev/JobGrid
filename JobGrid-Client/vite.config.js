import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': 'https://jobgrid-d5gg.onrender.com',
    },
  },
  plugins: [tailwindcss(), react()],
})
