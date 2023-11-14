/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
const colors = require("tailwindcss/colors")
module.exports = {
  content: [
    './src/**/*.{html,svelte}',
    '../web/src/**/*.{html,svelte}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Set font family
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      // Set theme colors (Required config!)
      colors: {
        primary: {
          ...colors.blue,
          DEFAULT: colors.blue['500'],
          focus: colors.blue['600'],
          content: colors.blue['50'],
        },
        accent: {
          ...colors.orange,
          DEFAULT: colors.orange['500'],
          focus: colors.orange['600'],
          content: colors.orange['50'],
        },
        neutral: {
          ...colors.neutral,
          DEFAULT: colors.neutral['700'],
          focus: colors.neutral['900'],
          content: colors.neutral['100'],
        },
        base: {
          ...colors.zinc,
          100: colors.zinc['800'],
          200: colors.zinc['900'],
          300: colors.zinc['950'],
          content: colors.zinc['100'],
        },
      },
      typography: (theme) => ({
        slate: {
          css: {
            '--tw-prose-body': theme('colors.gray.800'),
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
  ],
}
