/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '**',
            },
        ],
    },
};

module.exports = nextConfig;
