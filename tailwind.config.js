/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#000000", // Text color
          bg: "#FFFFFF", // Background color
        },
        secondary: {
          DEFAULT: "#000000", // Text color
          bg: "#FBFCFD", // Background color
        },
        accent: {
          light: "#FFD133",
          dark: "#3357FF",
        },
        background: "#FFFFFF",
        foreground: "#FBFCFD",
      },
      fontFamily: {
        archivo: ["Archivo"],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["responsive", "hover", "focus", "active"],
      textColor: ["responsive", "hover", "focus", "active"],
    },
  },
  plugins: [],
};
