module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#185ADB',
          50: '#B4CAF7',
          100: '#A1BEF5',
          200: '#7DA4F1',
          300: '#588AED',
          400: '#3371E9',
          500: '#185ADB',
          600: '#1245A8',
          700: '#0D3076',
          800: '#071C43',
          900: '#020711',
        },
        secondary: {
          DEFAULT: '#FFC947',
          50: '#FFFFFF',
          100: '#FFF9EA',
          200: '#FFEDC1',
          300: '#FFE199',
          400: '#FFD570',
          500: '#FFC947',
          600: '#FFB90F',
          700: '#D69700',
          800: '#9E6F00',
          900: '#664800',
        },
      },
    },
  },
  plugins: [],
};
