import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 정적 랜딩 페이지 — Vercel 이 프레임워크(Vite) 자동 감지, output = dist
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
  },
})
