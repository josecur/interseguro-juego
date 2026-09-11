/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "surface": "#F4F7FB",
        "surface-card": "#FFFFFF",
        "primary-navy": "#042C6C",
        "azul-interseguro": "#0A6AF5",
        "blanco-nube": "#E6F1F9",
        "azul-1": "#80DFFF",
        "azul-2": "#3BA2F7",
        "azul-3": "#074EAB",
        "azul-4": "#042C6C",
        "vibrant-magenta": "#F32682",
        "accent-amber": "#FEF3C7",
        "border-subtle": "#E2E8F0"
      },
      fontFamily: {
        body: ["Plus Jakarta Sans", "Inter", "sans-serif"],
        headline: ["Space Grotesk", "Plus Jakarta Sans", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      }
    },
  },
  plugins: [],
}
