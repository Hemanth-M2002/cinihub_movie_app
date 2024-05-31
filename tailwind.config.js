/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage:theme =>({
        'net-bg':"url('/src/images/netbackground.png')",
      }),
    },
  },
  plugins: [],
}