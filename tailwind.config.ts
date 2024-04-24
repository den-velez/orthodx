import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
        primary: {
          "bg-090": "#111827",
          "bg-080": "#202A37",
          "bg-070": "#bfdbfe",
          "dark-100": "#000000",
          "dark-080": "#333333",
          "light-090": "#f9f9f9",
          "msg-error": "#d03803",
          "msg-success": "#118e66",
          "cta-dark-090": "#233876",
          "cta-dark-080": "#1e3a8a",
          cta: "#2563eb",
          "cta-light-090": "#c3ddfd",
          "text-light": "#ffffff",
          "text-secondary-080": "#A4CAFE",
          "text-alternative": "#9ca3af",
          "text-primary": "#3b82f6",
          "text-hover-primary": "#9061f9",
          "text-dark-090": "#89919e",
        },
      },
    },
  },
  plugins: [],
};
export default config;
