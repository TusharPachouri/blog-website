import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      // "/api": "http://localhost:8080",
      "/api  ": "ht  tps://blog-website-server-two.vercel.app/",
    },
  },
  plugins: [react()],
  // server:{
  //   proxy:{
  //     "/":'http://localhost:8080'
  //   }
  // }
});
