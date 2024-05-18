/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'reddit-sans': ["Reddit Sans", "sans-serif"],
        'freeman': ["Freeman", "sans-serif"]
      },
    },
  },
  plugins: [],
}