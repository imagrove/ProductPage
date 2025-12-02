// Next.js相关类型定义

import { Metadata, Viewport } from 'next'

export interface PageMetadata extends Metadata {
  title: string
  description: string
  keywords?: string[]
  openGraph?: {
    title: string
    description: string
    images: string[]
    type: 'website' | 'article'
  }
  twitter?: {
    card: 'summary' | 'summary_large_image'
    title: string
    description: string
    images: string[]
  }
}

export interface PageViewport extends Viewport {
  themeColor?: string
  colorScheme?: 'light' | 'dark'
}

// 页面组件类型
export interface PageProps {
  params: Record<string, string>
  searchParams: Record<string, string | string[] | undefined>
}

// 布局组件类型
export interface LayoutProps {
  children: React.ReactNode
  params: Record<string, string>
}

// 错误页面类型
export interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

// 加载页面类型
export interface LoadingPageProps {
  // 加载页面特定属性
}

// 路由处理器类型
export interface RouteHandlerContext {
  params: Record<string, string>
}

export interface RouteHandlerResponse {
  status: number
  headers?: Record<string, string>
  body?: any
}

// 中间件类型
export interface MiddlewareRequest extends Request {
  nextUrl: URL
}

export interface MiddlewareResponse extends Response {
  // 中间件响应特定属性
}

// API路由类型
export interface ApiRequest extends Request {
  query: Record<string, string | string[]>
  body: any
}

export interface ApiResponse {
  json: (data: any) => void
  status: (code: number) => ApiResponse
}

// 图片优化类型
export interface ImageOptimizationConfig {
  quality?: number
  width?: number
  height?: number
  format?: 'webp' | 'avif' | 'jpeg' | 'png'
}

// 静态生成类型
export interface StaticGenerationParams {
  params: Record<string, string>
}

export interface StaticGenerationResult {
  props: Record<string, any>
  revalidate?: number | false
  notFound?: boolean
}

// 动态导入类型
export interface DynamicImportOptions {
  loading?: () => JSX.Element
  ssr?: boolean
}

// 国际化类型
export interface LocaleConfig {
  defaultLocale: string
  locales: string[]
}

export interface LocalizedPageProps extends PageProps {
  params: {
    locale: string
  } & Record<string, string>
}
