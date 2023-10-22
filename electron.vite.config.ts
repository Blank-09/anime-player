import { defineConfig, externalizeDepsPlugin } from 'electron-vite'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    // define: {
    //   'process.env.FLUENTFFMPEG_COV': false
    // }
    // },
    // resolve: {
    //   alias: {
    //     './lib-cov/fluent-ffmpeg': './lib/fluent-ffmpeg'
    //   }
    // }
  }
})
