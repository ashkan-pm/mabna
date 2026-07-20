/** @type {import('stylelint').Config} */
const stylelintConfig = {
  extends: ['stylelint-config-standard-scss'],

  referenceFiles: {
    files: ['src/app/globals.scss'],
    customSyntax: 'postcss-scss'
  },

  rules: {
    'no-unknown-custom-properties': true
  }
}

export default stylelintConfig
