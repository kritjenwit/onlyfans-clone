/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "open-blue": "#00ADB5",
        "open-white": "#EEEEEE",
        "open-gray": "#3A4750",
        "open-dark": "#303841",
      },
    },
  },
  plugins: [],
}
