import { defineConfig } from "vite";

export default defineConfig({
  // Expone /videos/* tanto al ejecutar Vite localmente como en Docker.
  publicDir: "../videos",
});
