/** @type {import('next').NextConfig} */
const nextConfig = {
  // 启用静态导出
  output: "export",
  // 确保URL路径正确
  trailingSlash: true,
  // 图片优化配置
  images: {
    unoptimized: true,
    domains: ["multimedia-control-system.com"],
    formats: ["image/webp", "image/avif"],
  },
  // 性能优化配置
  compress: true,
  // 禁用严格模式以避免开发时的重复渲染
  reactStrictMode: false,
  // 启用SWC编译器
  experimental: {
    // 禁用CSS优化以避免静态导出时的critters错误
    // optimizeCss: true,
    // 启用部分预渲染优化
    isrMemoryCacheSize: 50,
  },
  // 环境变量配置
  env: {
    SITE_URL: "https://multimedia-control-system.com",
    SITE_NAME: "多媒体播控系统",
  },
  // 构建优化
  compiler: {
    // 移除console.log
    removeConsole: process.env.NODE_ENV === "production",
    // 启用React优化
    reactRemoveProperties: process.env.NODE_ENV === "production",
  },
  // 性能优化头信息（需要在服务器层面配置）
  headers: async () => {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
