/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{html,js,ts,tsx,jsx}"],
    theme: {
        extend: {
            backdropBrightness: {
                25: ".25",
                80: ".8",
            },
            blur: {
                smm: "8px",
                smmm: "10px",
                kl: "14px",
            },
            borderWidth: {
                3: "3px",
            },
            boxShadow: {
                bottomRight: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                line: "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
                22: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            },
            colors: {
                mattBlue: "#6A9AB0",
                mattBlue2: "#80b0c5",
            },
            keyframes: {
                fadeIn: {
                    "0%": { opacity: "0%" },
                    "100%": { opacity: "100%" },
                },
            },
            animation: {
                fadeIn: "fadeIn .25s ease-in-out",
                "fadeIn-createVocabForm": "fadeIn .5s ease-in-out",
            },
        },
    },
    plugins: [require("daisyui")],
    daisyui: {
        // themes: ["light", "dark", "cupcake"],
        themes: false,
    },
};
