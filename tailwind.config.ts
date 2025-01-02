import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0A0825", 
        buttonSelected: "#6D448A",
        buttonUnselected: "#2D0E41", 
        titles: "#D28FFF",
        textPrimary: "#D28FFF",
        textSecondary: "#6D448A", 
        accentWhite: "#FFFFFF",
      },
      animation: {
        spotlight: "spotlight 2s ease .75s 1 forwards",
        aurora: "aurora 60s linear infinite", 
      },
      keyframes: {
        spotlight: {
          "0%": {
            opacity: 0,
            transform: "translate(-72%, -62%) scale(0.5)",
          },
          "100%": {
            opacity: 1,
            transform: "translate(-50%,-40%) scale(1)",
          },
        },
        aurora: {
          from: {
            backgroundPosition: "50% 50%, 50% 50%", 
          },
          to: {
            backgroundPosition: "350% 50%, 350% 50%",
          },
        },
      },
      zIndex: {
        "100": "100", 
      },
    },
  },
  plugins: [
    function addVariablesForColors({
      addBase,
      theme,
    }: {
      addBase: (styles: Record<string, Record<string, string>>) => void;
      theme: (path: string) => Record<string, string | Record<string, string>>; 
    }) {
      const allColors = flattenColorPalette(theme("colors"));
      const newVars = Object.fromEntries(
        Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
      );

      addBase({
        ":root": newVars,
      });
    },
  ],
};

export default config;
