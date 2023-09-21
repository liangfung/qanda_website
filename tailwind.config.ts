import type { Config } from 'tailwindcss'
import plugin from "tailwindcss/plugin"

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        divider: 'rgb(var(--divider-rgb))',
        theme: 'rgb(var(--theme-rgb))'
      }
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      // gradient background helper plugins
      addUtilities({
        ".flex-center": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        },
      });
    }),
  ],
}
export default config
