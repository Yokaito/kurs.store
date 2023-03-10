/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  optimizeFonts: true,
  experimental: {
    adjustFontFallbacks: true,
  },
  compiler: {
    styledComponents: {
      displayName: true,
      namespace: 'kurs',
    },
  },
}

module.exports = nextConfig
