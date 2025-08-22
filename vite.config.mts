import { defineConfig } from "vite";
import { redwood } from "rwsdk/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // ref: https://docs.rwsdk.com/guides/frontend/tailwind/
  environments: {
    ssr: {}
  },
  plugins: [
    cloudflare({
      viteEnvironment: { name: "worker" },
    }),
    tailwindcss(),
    redwood(),
  ],
  // TODO: add ref to explain why we need this
  // server: {
  //   allowedHosts: ["polar.dcgg.dev", "polar-website.dev-765.workers.dev"],
  // },
  optimizeDeps: {
    exclude: [
      'drizzle-kit',
      'bun',
    ],
  },
  build: {
    rollupOptions: {
      external: [
        /^drizzle-kit/,
        /^bun$/,
        /drizzle\.config/,
      ],
    },
  },
});


