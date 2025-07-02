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
          layout:'#11b1c9',
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
          DEFAULT: '#11b1c9',
        },
        theme:{
          DEFAULT: '#11b1c9',
          bg: '#320071',
          btn: '#1cbad1',
        }
      }
    },
  },
}

