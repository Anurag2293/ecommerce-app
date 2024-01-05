/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // domains: ['i.dummyjson.com'],
        remotePatterns: [{
            protocol: 'https',
            hostname: 'i.dummyjson.com',
        }],
    }
}

module.exports = nextConfig
