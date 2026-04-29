module.exports = {
  purge: [],
  content: [
    "./pages/**/*.{js,jsx,md,mdx,ts,tsx}",
    "./components/**/*.{js,jsx,md,mdx,ts,tsx}",
    "./app/**/*.{js,jsx,md,mdx,ts,tsx}",
    "./src/**/*.{js,jsx,md,mdx,ts,tsx}", // Adjust this path if your MDX files are elsewhere
  ],
  variants: {
    extend: {},
  },
  plugins: [],
}