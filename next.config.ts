import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname:'images.unsplash.com',
      
      },{
        hostname: 'res.cloudinary.com'
      },
      {
        hostname: 'example.com'
      }
      
      
    ],
  },
  webpack(config){
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config
  }
};

export default nextConfig;
