import { enumToJson } from 'shared/utils/enum';
import colors from 'web/src/styles/colors';

module.exports = {
  content: [
    '../../packages/shared/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ...enumToJson(colors),
      },
    },
  },
  plugins: [],
};
