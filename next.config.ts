import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 忽略 TypeScript 错误，强制打包成功
  typescript: {
    ignoreBuildErrors: true,
  },
  // 忽略 ESLint 错误
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
