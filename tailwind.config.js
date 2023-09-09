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
      borderWidth: {
        '5': '5px',
        '6': '6px',
        '7': '7px',
        '8': '8px',
      },
      borderRadius: {
        'large': '12px',
        '4xl':'1.75rem',
        '5xl':'2rem',
        '6xl':'2.25rem',
        '7xl':'2.5rem',
        '8xl':'2.75rem',
        '9xl':'3rem',
      },
    },
  },
  plugins: [],
}

