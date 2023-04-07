/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      colors : {
        'dark-sub' : '#222531',
        'dark-main' : '#11161a',
        'colorful-1' : '#0DAFD3',
        'colorful-2' : '#9A33FE',
      },
      display: ["group-hover"],
      borderOpacity : ['active']
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
      require('@tailwindcss/line-clamp')
  ],
}
