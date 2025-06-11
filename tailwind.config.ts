import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // New font families for our final theme.
      fontFamily: {
        sans: ['var(--font-roboto-mono)'], // Clean body font
        display: ['var(--font-lobster)'],   // Expressive headline font
        logo: ['var(--font-bungee-shade)'],// Unique logo font
      },
      colors: {
        // Your new sophisticated, retro color palette
        background: '#FFFAEC',     // Light Cream
        foreground: '#3D3D3D',     // Charcoal Gray (for text)
        border: '#F5ECD5',         // Darker Cream (for panels/borders)
        'subtle-text': '#8A8A8A', // A muted gray for secondary text

        primary: {
          DEFAULT: '#578E7E',     // Muted Teal/Green
          hover: '#4A786B'        // Darker teal for hover
        },
      },
    },
  },
  plugins: [],
};
export default config;