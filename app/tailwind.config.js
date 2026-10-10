/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        mata: '#0e241d',
        folha: '#234a3d',
        oliva: '#b9c62e',
        ouro: '#dcb44e',
        creme: '#ede8d7',
        linho: '#d9d4bf',
      },
      fontFamily: {
        display: ['"Newsreader Variable"', 'Georgia', 'serif'],
        sans: ['"Instrument Sans Variable"', 'system-ui', 'sans-serif'],
        mono: ['"Instrument Sans Variable"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
