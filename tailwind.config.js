/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        patagonia: {
          dark: '#070C12',
          slate: '#0F172A',
          card: '#131F2E',
          border: '#1E293B',
          teal: '#00A896',
          tealHover: '#028090',
          amber: '#E07A5F',
          gold: '#D4AF37',
          ice: '#F0FDF4'
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
