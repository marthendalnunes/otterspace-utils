/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ipfs.io',
        port: '',
        pathname: '/ipfs/**'
      },
      {
        protocol: 'https',
        hostname: '**.ipfs.nftstorage.link',
        port: '',
        pathname: '**'
      }
    ]
  }
}

module.exports = nextConfig
