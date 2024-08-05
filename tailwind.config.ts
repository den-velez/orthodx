import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "440px",
      },
      fontSize: {
        h1: ["3rem", { lineHeight: "3.125rem" }],
        h2: ["2.5rem", { lineHeight: "2.625rem" }],
        h3: ["2rem", { lineHeight: "2.125rem" }],
        h4: ["1.5rem", { lineHeight: "1.625rem" }],
        h5: ["1.25rem", { lineHeight: "1.325rem" }],
        body: ["1rem", { lineHeight: "1.125rem" }],
        small: ["0.875rem", { lineHeight: "1rem" }],
        caption: ["0.625rem", { lineHeight: "0.875rem" }],
      },
      colors: {
        bgDark: {
          "090": "#111827",
          "080": "#202A37",
          "070": "#374151",
        },
        dark: {
          "100": "#000000",
          "080": "#333333",
        },
        light: {
          "090": "#f9f9f9",
        },
        msg: {
          error: "#d03803",
          success: "#118e66",
        },
        cta: {
          "100": "#2563eb",
          "090": "#1d4ed8",
        },
        ctaLight: {
          "090": "#bfdbfe",
          "080": "#c3ddfd",
        },
        ctaDark: {
          "090": "#233876",
          "080": "#1e3a8a",
        },
        txtBrand: {
          primary: "#3b82f6",
          "primary-hover": "#9061f9",
          secondary: "#A4CAFE",
          alternative: "#9ca3af",
        },
        txtDark: {
          "090": "#89919e",
        },
        txtLight: {
          "100": "#ffffff",
        },
      },
      gridTemplateColumns: {
        "16fr": "repeat(16, minmax(0, 1fr))",
      },
    },
  },
  plugins: [
    function ({ addUtilities }: PluginAPI) {
      addUtilities({
        ".no-spinner": {
          "-webkit-appearance": "none",
          "-moz-appearance": "textfield",
        },
        'input[type="number"]::-webkit-outer-spin-button': {
          "-webkit-appearance": "none",
        },
        'input[type="number"]::-webkit-inner-spin-button': {
          "-webkit-appearance": "none",
        },
      });
    },
  ],
};
export default config;
