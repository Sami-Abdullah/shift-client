/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'https://ferrum-server.onrender.com/:path*',
      },
    ];
  },
};

export default nextConfig; 