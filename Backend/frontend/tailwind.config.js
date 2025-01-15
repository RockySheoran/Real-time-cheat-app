/** @type {import('tailwindcss').Config} */
const plugin = require('tailwind-scrollbar');
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      // colors: {
      //   scrollbarTrack: '#eef7fc',
      //   scrollbarThumb: '#4a5568',
      //   scrollbarHoverThumb: '#2d3748',
      // },
      // borderRadius: {
      //   'full': '50px',
      // },
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require('daisyui'),
  ],
 
  
}