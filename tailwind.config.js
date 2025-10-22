/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // enables dark mode toggle via 'class'
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
