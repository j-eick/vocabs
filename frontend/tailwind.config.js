/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      backdropBrightness: {
        25: ".25",
        80: ".8",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    // themes: ["light", "dark", "cupcake"],
    themes: false,
  },
};
