import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"

const path = require("path")

// https://vitejs.dev/config/
export default ({ command }) => {
  const isBuild = command === "build"
  return defineConfig({
    plugins: [vue()],
    server: {
      port: 6060,
    },
    build: {
      // Necessary to have dynamic imports
      target: "esnext",
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    preview: {
      port: 8080,
    },
    resolve: {
      alias: {
        "$styles": path.resolve("./src/styles"),
        "@airgap/beacon-sdk": path.resolve(
          path.resolve(),
          `./node_modules/@airgap/beacon-sdk/dist/walletbeacon.min.js`
        ),
        // polyfills
        "readable-stream": "vite-compatible-readable-stream",
        stream: "vite-compatible-readable-stream"
      },
    },
      optimizeDeps: {
        esbuildOptions: {
          define: {
            global: 'globalThis',
            'process': JSON.stringify({
              env: {
                NODE_DEBUG: '',
              }
            }),
          }
        }
      }
    
  })
}
