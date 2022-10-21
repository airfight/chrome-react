import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from "path";
import copy from "rollup-plugin-copy";

// https://vitejs.dev/config/
export default defineConfig({
  
  resolve: {

    alias: {

      "@": resolve(__dirname, "src"),

    },

  },

  plugins: [react(),
    copy({

      targets: [
        { src: "src/chromeconf/manifest.json", dest: "dist" },
        { src: "src/assets", dest: "dist" },
      ],

      hook: "writeBundle",

  })],

  build: {
    target: 'esnext',
    rollupOptions: {

      input: ["xp.html","index.html","src/page/home/home.jsx","src/chromeconf/background.js", "src/chromeconf/contentScript.js","src/chromeconf/injected.js"],

      output: {

        chunkFileNames: "[name].[hash].js",

        assetFileNames: "[name].[hash].[ext]",

        entryFileNames: "[name].js",

        dir: "dist",

      }

    }
  }
});
