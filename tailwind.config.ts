import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      screens: {
        xs: '480px',
      },
      colors: {
        brand: {
          blue: '#007aff',
          indigo: '#5856d6',
          purple: '#af52de',
          pink: '#ff2d55',
          orange: '#ff9500',
          yellow: '#ffcc00',
          teal: '#30b0c7',
          green: '#34c759',
          red: '#ff3b30',
        },
        apple: {
          black: '#000000',
          '900': '#1d1d1f',
          '800': '#2c2c2e',
          '700': '#48484a',
          '600': '#6e6e73',
          '500': '#86888a',
          '400': '#a1a1a6',
          '300': '#d2d2d7',
          '200': '#e8e8ed',
          '100': '#f5f5f7',
          '50': '#fbfbfd',
          white: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        hanzi: ['Noto Sans SC', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '32px',
        'pill': '980px',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      boxShadow: {
        'apple-sm': '0 2px 8px rgba(0,0,0,0.06)',
        'apple-md': '0 4px 16px rgba(0,0,0,0.08)',
        'apple-lg': '0 12px 32px rgba(0,0,0,0.12)',
        'apple-xl': '0 20px 48px rgba(0,0,0,0.16)',
      },
    },
  },
  plugins: [],
};
export default config;
