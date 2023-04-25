import { defineConfig,loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath,URL } from 'url'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { UserConfig, ConfigEnv } from 'vite'
import AutoImport from 'unplugin-auto-import/vite' //自动引入ref,reactive等等等

export default defineConfig(({ command, mode }: ConfigEnv): UserConfig => {
  // console.log(fileURLToPath(new URL('./src', import.meta.url)));
  return {
    plugins: [
      vue(),
      vueJsx(),
      AutoImport({
        imports: [
          'vue',
          'vue-router',
          'pinia',
          {
            axios: [
              ['default', 'axios'] // import { default as axios } from 'axios',
            ]
          }
        ],
      }),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        'components': fileURLToPath(new URL('./src/components', import.meta.url)),
        'assets': fileURLToPath(new URL('./src/assets', import.meta.url)),
        'structure': fileURLToPath(new URL('./src/components/indexStructure', import.meta.url)),
        'custom': fileURLToPath(new URL('./src/components/customComponents', import.meta.url)),
      }
    },
    server: {
      host: true,
      port: 5731,
      open:true,
    }
  }
})
//     resolve: {
//       alias: {
//         // 别名配置
//         // 键必须以斜线开始和结束
//         '@': resolve(__dirname, 'src'),
//         components: resolve(__dirname, './src/components'),
//         assets: resolve(__dirname, './src/assets'),
//         '#': resolve(__dirname, 'types'),
//         build: resolve(__dirname, 'build')
//       }
//     },
//   }
// })

