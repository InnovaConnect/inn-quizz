/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/components/**/*.tsx',
    './src/pages/**/*.tsx',
    './src/app.tsx',
    './index.html'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif']
      }
    }
  },
  plugins: []
};
