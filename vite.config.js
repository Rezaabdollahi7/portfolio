import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const root = dirname(fileURLToPath(import.meta.url));
const src = (p) => resolve(root, "src", p);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "#components": src("components"),
      "#constants": src("constants"),
      "#store": src("store"),
      "#hoc": src("hoc"),
      "#windows": src("windows"),
    },
  },
  build: {
    rollupOptions: {
      // The Persian page is its own HTML entry so /fa/ has Persian meta tags.
      input: {
        main: resolve(root, "index.html"),
        fa: resolve(root, "fa/index.html"),
      },
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          gsap: ["gsap", "@gsap/react"],
        },
      },
    },
  },
});
