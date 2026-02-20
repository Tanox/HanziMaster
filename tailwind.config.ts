import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        paper: '#fdfbf7',
        vermilion: {
          50: '#fdf3f2', 100: '#fbe5e4', 200: '#f7cfcd', 300: '#f0aaa6', 400: '#e67872',
          500: '#bc221b', 600: '#a31d17', 700: '#8c1914', 800: '#751510', 900: '#5e110d',
        }
      },
      fontFamily: {
        hanzi: ['"Noto Serif SC"', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        stampPop: { '0%': { opacity: '0', transform: 'translate(-50%, -40%) scale(1.5)' }, '100%': { opacity: '1', transform: 'translate(-50%, -50%) scale(1)' } }
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'stamp': 'stampPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards'
      }
    }
  },
  plugins: [],
};
export default config;
