/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        stone: {
          50: '#fafaf9',
          100: '#f5f5f4',
          200: '#e7e5e4',
          500: '#78716c',
          600: '#57534e',
          700: '#44403c',
          800: '#292524',
          900: '#1c1917',
          950: '#0c0a09',
        },
      },
      spacing: {
        'fib-3': '0.75rem',
        'fib-5': '1.25rem',
        'fib-8': '2rem',
        'fib-13': '3.25rem',
        'fib-21': '5.25rem',
      },
      maxWidth: {
        '4k': '1600px',
      },
    },
  },
  plugins: [],
};

