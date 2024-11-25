/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Bebas': ['Bebas Neue ', 'sans-serif'],
        'Epilogue': ['Epilogue', 'sans-serif'],
        'Ewert': ['Ewert', 'sans-serif'],
      },
    },
  },
  plugins: [],
}