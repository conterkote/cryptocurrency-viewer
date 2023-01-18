/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors : {
        'dark-sub' : '#222531',
        'dark-main' : '#0B0E11',
        'colorful-1' : '#0DAFD3',
        'colorful-2' : '#9A33FE',
      },
      borderOpacity : ['active']
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
