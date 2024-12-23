/** @type {import('next').NextConfig} */
const nextConfig = {
typescript: {
    ignoreBuildErrors: true, // This will ignore TypeScript errors during build
  },
  eslint: {
    ignoreDuringBuilds: true, // This will ignore ESLint errors during build
  },
};

export default nextConfig;
