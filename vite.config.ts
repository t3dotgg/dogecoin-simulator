import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";

import { minifyHtml } from "vite-plugin-html";

export default defineConfig({
  plugins: [reactRefresh(), minifyHtml()],
});
