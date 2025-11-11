import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import ssr from 'vite-plugin-ssr/plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ssr()],
  // vite-plugin-ssr v0.4系の設定（prerenderを有効化）
  vitePluginSsr: {
    prerender: true,
  },
  server: {
    host: true,
    port: 5173,
    watch: {
      usePolling: true,
    },
    hmr: {
      host: 'localhost',
      clientPort: 5173,
    },
  },
})
