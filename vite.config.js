import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,        // Listen on all interfaces, not just localhost
    port: 3000,
    watch: {
      usePolling: true // Ensures file changes are detected even in WSL or Docker
    },
    hmr: {
      protocol: 'ws',     // Use WebSocket
      host: 'localhost',  // Ensure it matches what you use in browser
      port: 3000
    }
  }
});
