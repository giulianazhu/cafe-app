/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // duration, delay, timing, iteration, direction, name
      animation: {
        'loading-bar-1': '0.5s linear infinite alternate loading',
        'loading-bar-2': '0.5s 0.15s linear infinite alternate loading',
        'loading-bar-3': '0.5s 0.3s linear infinite alternate loading',
        // 'scrolling-text': '10s scrollText linear infinite',
      },
      keyframes: {
        loading: {
          '0%': { marginTop: '3rem', marginBottom: '0rem' },
          '100%': { marginTop: '0rem', marginBottom: '3rem' },
        },
        scrolling: {
          // '0%': { top: 0 },
          // '100%': { top: '-100%' },
        },
      },
      // prettier-ignore
      screens: {
      'xs': '27rem', //432px
      'sm': '40rem', //640
      'md': '48rem', //768
      'lg': '64rem', //1024
      'xl': '80rem', //1280
      '2xl': '96rem', //1536
      'hz': {'raw': '(orientation: landscape)'}
    },
      //
    },
    plugins: [],
  },
};
