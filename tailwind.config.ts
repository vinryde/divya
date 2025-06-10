import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "320px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      fontFamily: {
        sans: ["Mona Sans", "serif"],
      },
      colors: {
        primary: "#0D0E09",
        primaryWhite: "#ffffff",
        darkOrange: "#FA481C",
        darkBlue: "#5765FB",
        darkYellow: "#FCD100",
        lightYellow: "#DED1C1",
        darkColor: "#0C0C0C",
        darkGray: "#262626",
      },
     
    },
  },
  plugins: [],
} satisfies Config;
