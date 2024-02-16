/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const {nextui} = require("@nextui-org/react");
module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    colors: {
      'green': {
        100: '#66d16a',
        200: '#4dc951',
        300: '#33c139',
        400: '#1aba20',
        500: '#00b207',
        600: '#00a006',
        700: '#008e06',
        800: '#007d05',
        900: '#006b04',
      }
  },
},
  plugins: [nextui(), require("daisyui")],
});

