/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './App.tsx', './components/**/*.tsx', './pages/**/*.tsx'],
  theme: {
    extend: {
      colors: { brandBlack: '#000000', brandRed: '#EE1D23', charcoal: '#161616' },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      keyframes: { revealUp: { from: { transform: 'translateY(24px)', opacity: '0' }, to: { transform: 'none', opacity: '1' } } },
      animation: { 'reveal-up': 'revealUp 0.9s cubic-bezier(0.16,1,0.3,1) both' },
    },
  },
  plugins: [],
};
