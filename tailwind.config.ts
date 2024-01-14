import { type Config } from "tailwindcss"
// import defaultConfig from "tailwindcss/stubs/config.full"
import { fontFamily } from "tailwindcss/defaultTheme"
import daisyui, { type Config as DaisyUIConfig } from 'daisyui'

const customConfig: Config & {
  daiysui?: DaisyUIConfig
} = {
  content: ["./src/**/*.tsx"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [daisyui],
  corePlugins: {
    // 这个配置选项，相当于 normalize.css 初始化样式
    // 参考 https://tailwindcss.com/docs/preflight
    // preflight: false,
  },
}

// export const finalConfig = {
// ...defaultConfig
// }

export default customConfig satisfies Config;
