/** @type {import('tailwindcss').Config} */
// import avatar from "./src/images/review.svg"
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      'sm': '500px',
      "xl": "1440px",
      "md": "1024px"
    },
    extend: {
      colors: {
        default: "#EF525D",
      },
      backgroundImage: {
        'review': 'url("/src/images/review.svg")',
        'close': 'url("/src/images/close.svg")',
        'review-hover': 'url("/src/images/review-hover.svg")',
      },
    },
  },
  plugins: [],
}

