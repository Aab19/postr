/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
const fontFamily = defaultTheme.fontFamily;
fontFamily['sans'] = [
  'Satoshi', // <-- amulya is a default sans font now
  'system-ui',
  // <-- you may provide more font fallbacks here
];

module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/screens/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './<custom-folder>/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: fontFamily,
    },
  },
  plugins: [],
};
