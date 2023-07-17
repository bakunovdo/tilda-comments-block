/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade-in 1s ease-in-out 0.3s',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', top: '-12px' },
          '100%': { opacity: '1', top: '12px' },
        },
      },
    },
  },
  plugins: [],
};
