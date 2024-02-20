/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      "xl": "1440px",
      "md": "1024px"
    },
    extend: {
      colors: {
        default: "#EF525D",
      }
    },
  },
  plugins: [],
}

