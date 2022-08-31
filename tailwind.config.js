/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},

    screens: {
      xs: { max: "420px" },

      sm: { max: "768px" },

      md: { max: "1024px" },

      lg: { max: "1280px" },

      xl: { max: "1440px" },

      xxl: { max: "1600px" },

      minxs: { min: "420px" },

      minsm: { min: "768px" },

      minmd: { min: "1024px" },

      minlg: { min: "1280px" },

      minxl: { min: "1440px" },

      minxxl: { min: "1600px" },
    },
  },

  plugins: [],
};
