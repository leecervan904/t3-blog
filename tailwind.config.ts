import { type Config } from "tailwindcss"
import colors from 'tailwindcss/colors'
// import defaultConfig from "tailwindcss/stubs/config.full"
import { fontFamily } from "tailwindcss/defaultTheme"
import daisyui, { type Config as DaisyUIConfig } from 'daisyui'
import themes from 'daisyui/src/theming/themes'

const customConfig: Config & {
  daiysui?: DaisyUIConfig
} = {
  content: ["./src/**/*.tsx"],
  darkMode: ['class'],
  theme: {
    colors: {
      ...colors,
      // 'my-primary': colors.red['500'],
      'my-primary': 'rgb(var(--color-primary) / <alpha-value>)',
      "primary-muted": "oklch(var(--primary-muted) / <alpha-value>)",
    },
    screens: {
      // ...defaultConfig.theme.screens,
      xs: '520px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [daisyui],
  daiysui: {
    // themes: [
    //   {
    //     light: {
    //       // importing the built-in 'light' theme
    //       // and setting the color values for '--primary-muted'
    //       // (numbers are HSL values)
    //       ...themes.light,
    //       "--primary-muted": "0 100% 50%", // set to color red
    //     },
    //   },
    // ],
    themes: ["cupcake", 'light', "dark", "cmyk"],
    // cupcake: {
    //   "color-scheme": "light",
    //   "primary": "#65c3c8",
    //   "secondary": "#ef9fbc",
    //   "accent": "#eeaf3a",
    //   "neutral": "#291334",
    //   "base-100": "#faf7f5",
    //   "base-200": "#efeae6",
    //   "base-300": "#e7e2df",
    //   "base-content": "#291334",
    //   "--rounded-btn": "1.9rem",
    //   "--tab-border": "2px",
    //   "--tab-radius": "0.7rem",
    // },
    // light: {
    //   "color-scheme": "light",
    //   "primary": "oklch(49.12% 0.3096 275.75)",
    //   "secondary": "oklch(69.71% 0.329 342.55)",
    //   "secondary-content": "oklch(98.71% 0.0106 342.55)",
    //   "accent": "oklch(76.76% 0.184 183.61)",
    //   "neutral": "#2B3440",
    //   "neutral-content": "#D7DDE4",
    //   "base-100": "oklch(100% 0 0)",
    //   "base-200": "#F2F2F2",
    //   "base-300": "#E5E6E6",
    //   "base-content": "#1f2937",
    // },
    // dark: {
    //   "color-scheme": "dark",
    //   "primary": "oklch(65.69% 0.196 275.75)",
    //   "secondary": "oklch(74.8% 0.26 342.55)",
    //   "accent": "oklch(74.51% 0.167 183.61)",
    //   "neutral": "#2a323c",
    //   "neutral-content": "#A6ADBB",
    //   "base-100": "#1d232a",
    //   "base-200": "#191e24",
    //   "base-300": "#15191e",
    //   "base-content": "#A6ADBB",
    // },
  },
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
