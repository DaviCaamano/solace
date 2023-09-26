import colors from '../../apps/web/src/styles/tailwind/colors';
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    '../../packages/shared/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      xs: '320px',
      sm: '480px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors,
      fontFamily: {
        sans: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
        montserrat: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-montserrat)', ...defaultTheme.fontFamily.mono],
        serif: ['var(--font-droid)', ...defaultTheme.fontFamily.mono],
        droid: ['var(--font-droid)', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
};

/**
 * Recommended breakpoints from Browserstack for 2023
 * https://www.browserstack.com/guide/responsive-design-breakpoints
 * base: 0–319px
 * [xs] Mobile: 320px–479px
 * [sm]Tablet: 480px–767px
 * [md] Laptop: 768px–1023px
 * [lg] Desktop: 1024px–1279px
 * [xl] (TW default): 1280px and above
 * [2xl]: (TW default) 1536px
 */
