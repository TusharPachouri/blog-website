import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  // server:{
  //   proxy:{
  //     "/":'http://localhost:8080'
  //   }
  // }
});
