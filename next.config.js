/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  env: {
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.API_ENDPOINT}/:path*`,
      }
    ]
  }
}

module.exports = nextConfig
