/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // primary: "#11695D", // Your custom primary
        // primary:{
        //   hover:"#0f766e",
        //   medium:"#0d9488",
        //   light:"#14b8a6",
        // },
        primary: {
          DEFAULT: "#11695D", // used as text-primary, bg-primary, etc.
          hover: "#0f766e",
          base: "#0d9488",
          light: "#14b8a6",
        },
        // #0f766e
        // #0d9488
        // #14b8a6
        teal: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
        },
      },
      screens: {
        xs: "450px",
        sm: "580px",
        md: "650px",
        lg: "768px",
        xl: "1024px",
        "2xl": "1280px",
        "3xl": "1536px",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".scrollbar-hidden": {
          "scrollbar-width": "none", // For Firefox
          "&::-webkit-scrollbar": {
            display: "none", // For Chrome, Safari, and Edge
          },
        },
        ".scroll-smooth": {
          "scroll-behavior": "smooth",
        },
      });
    },
  ],
};
