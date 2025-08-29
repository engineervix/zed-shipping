/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'oneworld-pink': '#be185d', // Darker shade of pink
        'oneworld-pink-light': '#ec4899', // Original pink for accents
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Tailwind's CSS reset to avoid conflicts with PrimeVue
  },
}
