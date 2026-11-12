import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Required for this GitHub Pages repository URL.
  // Change to '/' if the site later moves to a root custom domain.
  base: '/Testing-Union-Studio-Page/',
})