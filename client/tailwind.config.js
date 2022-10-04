/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      Averta: ['Averta'],
      Poppin: ['Poppins']
    }, 
    extend: {
        colors: {
          blue: '#6e41f9',
          dark: '#373b4d'
        }
    },
  },
  plugins: [],
}
