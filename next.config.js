/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    webp: {
        preset: 'default',
        quality: 100,
    },
    images: {
        domains: ['master-tort.pro', 'localhost'],
    },
};

module.exports = nextConfig;
