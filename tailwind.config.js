/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'off-white': '#F7F5EF',
        'vinho': '#3B0D17',
        'dourado': '#B89B72',
      },
      fontFamily: {
        'principal': ['Playfair Display', 'serif'],
        'apoio': ['Cinzel', 'serif'], 
      }
    },
  },
  plugins: [],
}