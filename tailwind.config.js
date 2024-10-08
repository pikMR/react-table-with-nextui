// tailwind.config.js
const { nextui } = require("@nextui-org/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // or you can use a glob pattern (multiple component styles)
    "./node_modules/@nextui-org/theme/dist/components/(date-picker|theme|modal|button|snippet|code|input|tabs|card|tooltip|select).js",
    // './src/pages/**/*.{js,ts,jsx,tsx}',
    // './src/components/**/*.{js,ts,jsx,tsx}',
    "./src/**/*.{js,jsx,ts,tsx}",

  ],
  theme: {
    extend: {},
  },
  darkMode: "class",
  plugins: [nextui()],
};
