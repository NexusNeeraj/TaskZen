/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors used in the project
      colors:{
        primary: "#2B85FF",
        secondary: "#EF863E",
        success: "#48BB78",
        warning: "#E9C46A",
        danger: "#F53F52",
        info: "#A0D3E8",
      },
    },
  },
  plugins: [],
}

