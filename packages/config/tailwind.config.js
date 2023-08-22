import { getEnumValues } from 'shared/utils/enum';
import colors from 'web/src/styles/colors';

module.exports = {
  content: [
    '../../packages/shared/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...getEnumValues(colors),
      },
    },
  },
  plugins: [],
};
