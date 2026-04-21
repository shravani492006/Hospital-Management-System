/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  safelist: [
    "bg-blue-500",
    "text-white",
    "p-6",
    "rounded",
    "shadow-md",
    "text-center",
    "flex",
    "justify-center"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
