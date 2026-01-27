import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#4A2E1F", // Brun châtaigne profond (fumage, bois, affinage)
          light: "#5C3D2E",   // Brun plus clair
          dark: "#3A2318",    // Brun très foncé
        },
        accent: {
          DEFAULT: "#3F5D44", // Vert maquis corse (nature, authenticité)
          light: "#5A7A5E",   // Vert plus clair
          dark: "#2F4633",    // Vert foncé
        },
        charcuterie: {
          DEFAULT: "#8B2F2F", // Rouge charcuterie (viande affinée, gourmandise)
          light: "#A84444",   // Rouge plus clair
          dark: "#6B2424",    // Rouge foncé
        },
        ivory: "#F4EFEA",     // Ivoire chaud (papier ancien, étiquettes)
        wood: "#D6C4A3",      // Beige bois clair (planches, marchés)
        charcoal: "#1F1F1F",  // Noir charbon doux (texte)
      },
    },
  },
  plugins: [],
};
export default config;
