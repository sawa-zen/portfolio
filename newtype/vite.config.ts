import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  // local ip からもアクセスできるようにする
  server: {
    host: '0.0.0.0'
  },
  plugins: [react()],
  css: {
    modules: {
      localsConvention: 'dashes',
    }
  }
})
