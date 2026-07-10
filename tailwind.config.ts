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
      colors: {
        ink: {
          50: '#faf9f6',
          100: '#f3f1eb',
          200: '#e5e1d8',
          300: '#c9c2b5',
          400: '#a69c89',
          500: '#867d6a',
          600: '#6b6356',
          700: '#564f45',
          800: '#48433b',
          900: '#1a1a1a',
          950: '#0d0d0d',
        },
        vermilion: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#c53d43',
          600: '#9b2c2c',
          700: '#7f2727',
          800: '#6b2727',
          900: '#5a2525',
        },
        indigo: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#4f46e5',
          600: '#4338ca',
          700: '#3730a3',
          800: '#312e81',
          900: '#1e1b4b',
          DEFAULT: '#4f46e5',
          foreground: '#ffffff',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#34c759',
          600: '#16a34a',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#f59e0b',
          600: '#d97706',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
        },
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'Georgia', 'serif'],
        display: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Space Grotesk', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'brush-stroke': 'brushStroke 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'ink-spread': 'inkSpread 1.2s ease-out forwards',
        'paper-flip': 'paperFlip 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'fade-in-elegant': 'fadeInElegant 0.8s ease-out forwards',
        'float-gentle': 'floatGentle 6s ease-in-out infinite',
        'slide-in-right': 'slideInRight 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        'accordion-down': 'accordionDown 0.2s ease-out',
        'accordion-up': 'accordionUp 0.2s ease-out',
      },
      keyframes: {
        brushStroke: {
          '0%': { clipPath: 'inset(0 100% 0 0)', opacity: '0' },
          '100%': { clipPath: 'inset(0 0 0 0)', opacity: '1' },
        },
        inkSpread: {
          '0%': { transform: 'scale(0.8)', opacity: '0', filter: 'blur(4px)' },
          '50%': { opacity: '0.6', filter: 'blur(2px)' },
          '100%': { transform: 'scale(1)', opacity: '1', filter: 'blur(0)' },
        },
        paperFlip: {
          '0%': { transform: 'rotateY(90deg)', opacity: '0' },
          '100%': { transform: 'rotateY(0)', opacity: '1' },
        },
        fadeInElegant: {
          '0%': { opacity: '0', transform: 'translateY(20px)', filter: 'blur(2px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        accordionDown: {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        accordionUp: {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      backgroundImage: {
        'paper-texture': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"100\" viewBox=\"0 0 100 100\"%3E%3Cpath d=\"M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\" fill=\"%23e5e1d8\" fill-opacity=\"0.3\" fill-rule=\"evenodd\"/%3E%3C/svg%3E')",
      },
      boxShadow: {
        'ink': '0 4px 20px rgba(26, 26, 26, 0.08)',
        'ink-lg': '0 8px 40px rgba(26, 26, 26, 0.12)',
        'ink-xl': '0 12px 60px rgba(26, 26, 26, 0.16)',
        'vermilion-glow': '0 0 30px rgba(197, 61, 67, 0.2)',
      },
    },
  },
  plugins: [],
};
export default config;
