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
          layout:'#0255a2',
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
          DEFAULT: '#0255a2',
        },
        theme:{
          DEFAULT: '#0255a2',
          bg: '#320071',
          btn: '#0255a2',
        }
      }
    },
  },
}

