import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: true // Esto asegura que las rutas de React funcionen correctamente
  } //revisar esto bien por qué no sé como se usa exactamente
})
