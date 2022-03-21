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
    // See https://github.com/airgap-it/beacon-sdk/issues/277#issuecomment-1057567050
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: "globalThis",
        },
      },
    },
    resolve: {
      alias: {
        // dedupe @airgap/beacon-sdk because of an error with Vite and events
        // When these lines are commented, the dev server doesn't start, and gives the following error:
        // matrix-client/MatrixClientEventEmitter.js:1:9: ERROR: No matching export in "browser-external:events" for import "EventEmitter"
        // However, even with this, I run into an error at runtime in matrix-client/MatrixClientEventEmitter
        // Class extends value undefined is not a constructor or null
        // at MatrixClientEvent.ts:3:34 at MatrixClientEventEmitter.ts:11:47

        // See: https://github.com/ecadlabs/taquito/issues/882#issuecomment-999753605
        // Original comment: I almost have no idea why it needs `cjs` on dev and `esm` on build, but this is how it works 🤷‍♂️
        "@airgap/beacon-sdk": path.resolve(__dirname, `./node_modules/@airgap/beacon-sdk/dist/${isBuild ? "esm" : "cjs"}/index.js`),
        // polyfills
        "readable-stream": "vite-compatible-readable-stream",
        stream: "vite-compatible-readable-stream",
      },
    },
  })
}
