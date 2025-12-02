/**
 * Next.js 性能优化配置
 * 针对多媒体播控系统网站的性能优化
 */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出
  output: 'export',
  trailingSlash: true,

  // 图片优化配置
  images: {
    unoptimized: true, // 静态导出时禁用图片优化
    domains: [], // 添加外部图片域名
    formats: ['image/webp', 'image/avif'], // 支持现代图片格式
  },

  // 实验性功能
  experimental: {
    optimizeCss: true, // 启用CSS优化
    optimizePackageImports: ['framer-motion'], // 优化特定包的导入
  },

  // 编译器优化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production', // 生产环境移除console
  },

  // 性能优化配置
  poweredByHeader: false, // 移除X-Powered-By头
  compress: true, // 启用Gzip压缩

  // 缓存配置
  onDemandEntries: {
    maxInactiveAge: 25 * 1000, // 减少页面缓存时间
    pagesBufferLength: 2, // 减少页面缓冲区
  },

  // 环境变量
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  // 重定向配置
  async redirects() {
    return [
      {
        source: '/old-path',
        destination: '/new-path',
        permanent: true,
      },
    ]
  },

  // 头部配置
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },
}

module.exports = withBundleAnalyzer(nextConfig)
