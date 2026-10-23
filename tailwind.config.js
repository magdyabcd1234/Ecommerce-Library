/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['IBM Plex Sans Arabic', 'DM Sans', 'sans-serif'],
      },
      colors: {
        ink: '#10100f',
        panel: '#181817',
        muted: '#a6a69f',
        lime: '#d3f36b',
      },
    },
  },
  plugins: [],
}
