/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // "/admin" is the path we would use in the reverse proxy, so change accordingly if you want to use some other path
  assetPrefix: isProd ? '/admin' : undefined,
}

module.exports = nextConfig
