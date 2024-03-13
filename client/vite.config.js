import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": "https://blog-website-git-main-tushar-pachouris-projects.vercel.app",
    },
  },
  plugins: [react()],
  // server:{
  //   proxy:{
  //     "/":'http://localhost:8080'
  //   }
  // }
});
