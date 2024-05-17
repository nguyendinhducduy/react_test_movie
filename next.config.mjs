/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'media.themoviedb.org',
                port: '',
            },
        ],
    },
};

export default nextConfig;
