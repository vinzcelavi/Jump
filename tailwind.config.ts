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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes: {
        loader: {
          '0%': { inset: '0 35px 0 0' },
          '50%': { inset: '0 0 0 0' },
          '100%': { inset: '0 0 0 35px' }
        }
      },
      animation: {
        loader: 'loader 0.75s infinite alternate'
      }
    },
  },
  plugins: [],
};
export default config;
