export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        f1red: '#E10600',
        f1dark: '#15151E',
        f1darker: '#0D0D13',
        f1gray: '#38383F',
        f1light: '#F5F5F5',
      },
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'sans-serif'],
        body: ['"Barlow"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
