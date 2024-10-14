export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        generalsans: ['General Sans', 'sans-serif'],
        gotham: ['GothamBold', 'sans-serif'],
        gothamBook: ['GothamBook', 'sans-serif'],
        gothamMedium: ['GothamMedium', 'sans-serif'],
      },
      colors: {
        black: {
          DEFAULT: '#000',
          100: '#010103',
          200: '#0E0E10',
          300: '#1C1C21',
          500: '#3A3A49',
          600: '#1A1A1A',
        },
        white: {
          DEFAULT: '#FFFFFF',
          800: '#E4E4E6',
          700: '#D6D9E9',
          600: '#AFB0B6',
          500: '#62646C',
        },
        purple: {
          DEFAULT: '#8F00FF', 
          100: '#F3E5FF',      
          200: '#D1B3FF',      
          300: '#AF80FF',  
          400: '#8F4DFF', 
          500: '#8F00FF', 
          600: '#7500CC', 
          700: '#5B0099', 
          800: '#400066', 
          900: '#260033', 
        }
      },
      backgroundImage: {
        terminal: "url('/assets/terminal.png')",
      },
    },
  },
  plugins: [],
};
