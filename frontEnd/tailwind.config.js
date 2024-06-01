/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'


  ],
  theme: {
    container: {
      center: true,
    },
    'heading': '#fffffe',
    extend: {
      colors: {
        'background': '#0f0e17',
        'secondary': '#f25f4c',
        'black':'#000000',
        'tertiary': '#e53170',
        'tertiary-hover': '#891D43',
        'deep-blue': '#1B1A2F',
        'blue':'#2394E8',
        'orange': '#ff8906',
        'orange-hover': '#B25F04',
        'paragraph': '#a7a9be',
        'heading': '#fffffe',
      }
    }
  },
  plugins: [
    require('flowbite/plugin')
]
}

