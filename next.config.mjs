/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Keep existing webpack config
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  // Update assetPrefix configuration
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
};

export default nextConfig;
