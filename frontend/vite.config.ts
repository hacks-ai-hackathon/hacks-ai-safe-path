import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";

export default defineConfig({
  resolve: {
    alias: [
    {
        find: "@widgets",
        replacement: path.resolve(__dirname, "src/widgets"),
      },
    {
        find: "@pages",
        replacement: path.resolve(__dirname, "src/pages"),
      },
    {
        find: "@ui",
        replacement: path.resolve(__dirname, "src/ui"),
      },
    {
        find: "@app",
        replacement: path.resolve(__dirname, "src/app"),
      },
    {
        find: "@store",
        replacement: path.resolve(__dirname, "src/store"),
    },
    {
        find: "fonts",
        replacement: path.resolve(__dirname, "public/fonts"),
      }
    ],
  },
  plugins: [react()],
})
