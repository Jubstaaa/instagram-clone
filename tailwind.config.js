/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      screens: {
        DEFAULT: "100%",
        sm: "100%",
        lg: "975px",
        xl: "975px",
        "2xl": "975px",
      },
    },
    extend: {
      screens: {
        md: "876px",
      },
      colors: {
        brand: "#0095f6",
        facebook: "#385185",
        link: "#00376b",
        secondaryLink: "#8e8e8e",
        secondaryBorder: "#dbdbdb",
      },
      backgroundImage: {
        phone: "url('/public/img/phone.png')",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide"), require("tailwind-scrollbar")],
};
