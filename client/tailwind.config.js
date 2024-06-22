/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        backgroundColor: "var(--backgroundColor)",
        primaryColor: "var(--primaryColor)",
        secondaryColor: "var(--secondaryColor)",
        secondaryBacgroundColor: "var(--secondaryBgColor)",
      },
    },
  },
  plugins: [],
};
