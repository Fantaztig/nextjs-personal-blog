module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: {
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
    ],
    options: {
      whitelistPatterns: [/.*fa.*/],
      defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || [],
    }
  },
  theme: {

    fontFamily: {
      mono: ['Fira Code', 'monospace'],
      display: ['Fira Code', 'monospace'],
      body: ['Fira Code', 'monospace'],
    },
    extend: {
      colors: {
        'ruuk-gray': {
          default: '#867e79',
          100: '#f2f1f0',
          200: '#d7d4d2',
          300: '#bcb7b5',
          400: "#a19a97",
          500: "#867e79",
          600: "#68625e",
          700: "#4a4643",
          800: "#2d2a28",
          900: "#0f0e0d",
        },
      }
    },
  },
  variants: {},
  plugins: [],
}
