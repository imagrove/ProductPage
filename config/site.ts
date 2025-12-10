// 站点配置信息
import { TargetIcon, TrophyIcon, RocketIcon, ShieldIcon, PuzzleIcon } from '@/components/ui/MinimalIcons'

export const siteConfig = {
  // 基本信息
  name: '多媒体播控系统',
  description: '专业的多媒体播控系统定制服务，为数字展馆、博物馆、企业展厅提供先进的技术解决方案',
  url: 'https://multimedia-control-system.com',

  // SEO配置
  seo: {
    title: '多媒体播控系统 - 专业定制解决方案',
    description: '10年+行业经验，为您的多媒体播控系统提供专业可靠的技术保障',
    keywords: ['多媒体播控', '展馆系统', '定制解决方案', '数字展馆', '博物馆技术'],
    author: '多媒体播控系统团队',
    ogImage: '/og-image.jpg',
  },

  // 社交媒体
  social: {
    twitter: '@multimedia_control',
    github: 'multimedia-control-system',
    linkedin: 'multimedia-control-system',
  },

  // 联系信息
  contact: {
    email: 'contact@multimedia-control-system.com',
    phone: '+86-400-123-4567',
    address: '中国北京市朝阳区科技园区',
  },

  // 导航菜单
  navigation: [
    { label: '首页', href: '/' },
    { label: '解决方案', href: '/solutions' },
    { label: '核心优势', href: '/advantages' },
    { label: '成功案例', href: '/cases' },
    { label: '联系我们', href: '/contact' },
  ],

  // 动画配置
  animations: {
    duration: {
      fast: 0.3,
      normal: 0.6,
      slow: 0.9,
    },
    easing: 'easeOut',
    viewport: {
      once: true,
      margin: '-50px',
    },
  },

  // 响应式断点
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536,
  },

  // 主题配置
  theme: {
    colors: {
      primary: {
        50: '#f0f9ff',
        100: '#e0f2fe',
        500: '#0ea5e9',
        600: '#0284c7',
        900: '#0c4a6e',
      },
      secondary: {
        100: '#f0fdf4',
        200: '#dcfce7',
        500: '#22c55e',
        600: '#16a34a',
      },
      gray: {
        50: '#f9fafb',
        100: '#f3f4f6',
        200: '#e5e7eb',
        600: '#4b5563',
        700: '#374151',
        900: '#111827',
      },
    },
    spacing: {
      container: 'max-w-7xl mx-auto',
      section: 'py-24 lg:py-32',
    },
  },
}

// 特性配置
export const featuresConfig = {
  advantages: [
    {
      title: '深度定制能力',
      description: '提供从需求分析到售后支持的全流程定制服务',
      icon: TargetIcon,
    },
    {
      title: '丰富项目经验',
      description: '服务多个行业领域，具备丰富的展馆多媒体项目经验',
      icon: TrophyIcon,
    },
    {
      title: '技术领先优势',
      description: '基于先进技术架构，确保系统长期稳定运行',
      icon: RocketIcon,
    },
  ],

  techFeatures: [
    {
      title: '模块化架构',
      description: '灵活组合，按需定制',
      icon: PuzzleIcon,
    },
    {
      title: '高性能渲染',
      description: 'WebGL硬件加速，流畅体验',
      icon: RocketIcon,
    },
    {
      title: '安全稳定',
      description: '多重保障，可靠运行',
      icon: ShieldIcon,
    },
    {
      title: '快速部署',
      description: '专业团队，高效实施',
      icon: RocketIcon,
    },
  ],
}

// 性能配置
export const performanceConfig = {
  // 图片优化
  images: {
    quality: 80,
    formats: ['webp', 'avif'],
    sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  // 资源优化
  resources: {
    preload: ['/fonts/inter-var.woff2'],
    prefetch: ['/api/contact'],
  },

  // 缓存策略
  cache: {
    static: 31536000, // 1年
    dynamic: 86400, // 1天
    api: 3600, // 1小时
  },
}
