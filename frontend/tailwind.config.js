/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#f0f7f4',
          100: '#dbece3',
          200: '#b8dbc9',
          300: '#89c3a6',
          400: '#52b788',
          500: '#2d6a4f',
          600: '#1b4332',
          700: '#143628',
          800: '#081c15',
          900: '#040d0a',
        },
        earth: {
          50: '#fdfbf7',
          100: '#f7f2ea',
          200: '#ede0ce',
          300: '#dda15e',
          400: '#bc6c25',
          500: '#99582a',
          600: '#6f3d1b',
        },
        leaf: {
          light: '#74c69d',
          DEFAULT: '#52b788',
          dark: '#40916c',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
        'card-soft': '0 4px 20px -2px rgba(45, 106, 79, 0.08)',
        'glow-green': '0 0 25px -5px rgba(82, 183, 136, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      }
    },
  },
  plugins: [],
}
