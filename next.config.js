const withGraphql = require('next-plugin-graphql')

module.exports = withGraphql({
  target: 'serverless',
  images: {
    domains: ['https://donate.fneinternacional.org'],
  },
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
})
