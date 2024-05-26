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
      colors: {
        darkGreen: '#075e54',
        tealGreen: '#128c7e',
        lightGreen: '#25d366',
        mintGreen: '#dcf8c6',
        lightBeige: '#ece5dd',
      }
    },
  },
  plugins: [],
}