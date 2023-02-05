/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'dark-yellow': '#f1ece1'
      },
      minHeight: {
        'screen-nav': 'calc(100vh - 96px)'
      },
      screens: {
        xs: '480px'
      }
    }
  },
  plugins: []
}
