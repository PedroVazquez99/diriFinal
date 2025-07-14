import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
const env = loadEnv(mode, process.cwd(), '')
  return {
    base: env.VITE_APP_BASE_URL || '/', // Ajusta la base según la variable
    build: {
      outDir: 'docs',
    },
    plugins: [react(), tailwindcss()],
  }
})

