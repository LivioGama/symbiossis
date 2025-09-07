const {withPlausibleProxy} = require('next-plausible')

/** @type {import('next').NextConfig} */
const nextConfig = {}

module.exports = withPlausibleProxy({
  customDomain: 'https://plausible.liviogama.com',
})(nextConfig)
