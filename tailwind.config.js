/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'selector',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        white:{
          DEFAULT:'#fff',
          layout:'#1da8e8',
          card:'#F1F2F4',
        },
        black:{
          DEFAULT: '#0f172a',
          lg: '#161618',
          btn: '#262626',
          btnInsert: '#0f172a',
          input: '#1e293b',
          card: '#121b29',
        },
        blue:{
          DEFAULT: '#1da8e8',
        },
        theme:{
          DEFAULT: '#1da8e8',
          bg: '#320071',
          btn: '#1da8e8',
        }
      }
    },
  },
}

