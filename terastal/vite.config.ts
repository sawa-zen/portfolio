import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  // local ip からもアクセスできるようにする
  server: {
    host: '0.0.0.0'
  },
  plugins: [tsconfigPaths(), react()],
  css: {
    modules: {
      localsConvention: 'dashes',
    }
  }
})
