import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,      // 👈 allow external access
    port: 5173,      // 👈 or any port you prefer
  },

})
