/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,js,ts,tsx,jsx}"],
  theme: {
    extend: {
      backdropBrightness: {
        25: ".25",
        80: ".8",
      },
      boxShadow: {
        bottomRight: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
        line: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    // themes: ["light", "dark", "cupcake"],
    themes: false,
  },
};
