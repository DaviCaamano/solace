import { tailwindColors } from './tailwind';
import colors from '../../apps/web/src/styles/tailwind/colors';
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: [
    '../../packages/shared/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...tailwindColors(colors),
      },
      fontFamily: {
        sans: ['var(--font-montserrat)', ...defaultTheme.fontFamily.sans],
        mono: ['var(--font-montserrat)', ...defaultTheme.fontFamily.mono],
      },
    },
  },
  plugins: [],
};
