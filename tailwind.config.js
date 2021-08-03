module.exports = {
  purge: {
    content: [
      './components/**/*.{vue,js}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
    ],
    options: {
      // safelist: [/(from|via|to|border|bg|text)-(.*)-(\\d{1}0{1,2})/]
      // safelist: [/^(from|via|to|border|bg|text)-(.*)-(\\d{1}0{1,2})/]
      // safelist: [/^(from|via|to|border|bg|text)-(.*)-(\\d{1}0{1,2})/]
      // safelist: [/^(from|via|to|border|bg|text)-(.*)-(\\d{1}0{1,2})/]
      safelist: [/^(from|via|to|border|bg|text)-(.*)-(\\d{1}0{1,2})/]
      // safelist: [/^bg-/]
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
