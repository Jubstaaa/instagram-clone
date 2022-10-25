/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        md: "876px",
      },
      colors: {
        brand: "#0095f6",
        facebook: "#385185",
        link: "#00376b",
        secondaryLink: "#8e8e8e",
      },
      backgroundImage: {
        phone: "url('/public/img/phone.png')",
      },
    },
  },
  plugins: [],
};
