/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // 移除 images.unoptimized 配置，让Vercel处理图片优化
  // Next.js 15 默认启用 App Router，无需额外配置
  async rewrites() {
    return [
      {
        source: '/fc',
        destination: '/fc.html',
      },
    ]
  },
}

export default nextConfig
