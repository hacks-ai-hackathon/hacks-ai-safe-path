import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint'
import path from "path"

const bindPath = (src: string) => path.resolve(__dirname, src);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
  alias: {
    '@/widgets': bindPath('src/widgets'),
    '@/app': bindPath('src/app'),
    '@/ui': bindPath('src/ui'),
    '@/store': bindPath('src/store'),
    '@/api': bindPath('src/api'),
  }
}
})
