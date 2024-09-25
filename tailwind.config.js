/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        dream: ["Dream Avenue", "serif"],
      },
      fontSize: {
        "sm-heading": ["18px", "28px"],
        "sm-sub-heading": ["16px", "24px"],
        "sm-body-text-bold": ["14px", "16px"],
        "sm-body-text": ["12px", "12px"],
        "sm-footer-text": ["10px", "10px"],

        "xl-heading": ["36px", "42px"],
        "xl-sub-heading": ["24px", "30px"],
        "xl-body-text-bold": ["16px", "20px"],
        "xl-body-text": ["14px", "16px"],
        "xl-footer-text": ["12px", "12px"],
      },
      colors: {
        primary: "#efba03",
        secondary: "#005250",
        accent: "#006B69",
        bgtext: "#FFFFFF",
        bgprimarylight: "#fefaf2",
        textPrimary: "#333333",
        textSecondary: "#7E7E7E",
        light: "#F8F8FF",
        dark: "#0C0C0C",
        customGray: 'rgba(51, 51, 51, 1)'
      },
      keyframes: {
        scroll: {
          "0%": {
            transform: "translateX(0)",
          },
          "100%": {
            transform: "translateX(-50.5%)",
          },
        },
        shimmer: {
          "100%": {
            transform: "translateX(100%)",
          },
        },
      },
      animation: {
        scroll: "scroll 36s linear infinite",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    // require("tailwindcss-content-visibility"),
  ],
};
