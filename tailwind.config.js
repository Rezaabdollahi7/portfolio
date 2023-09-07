/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        favblue: {
          25: '#284be582;',
          50: '#284be5;',
          100: '#232a60',
        },
      },
    },
  },
  plugins: [],
}

