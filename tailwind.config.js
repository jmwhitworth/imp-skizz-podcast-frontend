/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './nuxt.config.ts',
    './components/*.{vue,js,ts,jsx,tsx}',
    './pages/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
      },
    },
  },
  plugins: [],
}
