import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "blue-600": "#2563EB",
        "purple-600": "#7C3AED",
      },
    },
  },
  plugins: [],
  darkMode: "class",
}

export default config
