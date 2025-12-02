// 全局类型声明文件

// 扩展Window接口
declare global {
  interface Window {
    // Google Analytics
    gtag?: (...args: any[]) => void

    // 自定义全局变量
    __APP_CONFIG__?: {
      version: string
      environment: 'development' | 'production' | 'test'
      apiBaseUrl: string
    }

    // 性能监控
    __PERFORMANCE_MARKS__?: Record<string, number>

    // 错误监控
    __ERROR_HANDLER__?: (error: Error) => void
  }

  // 扩展Document接口
  interface Document {
    // 浏览器特定方法
    mozCancelFullScreen?: () => void
    webkitExitFullscreen?: () => void
    msExitFullscreen?: () => void
  }

  // 扩展HTMLElement接口
  interface HTMLElement {
    // 全屏相关方法
    mozRequestFullScreen?: () => void
    webkitRequestFullscreen?: () => void
    msRequestFullscreen?: () => void

    // 触摸事件相关
    ontouchstart?: ((this: HTMLElement, ev: TouchEvent) => any) | null
    ontouchmove?: ((this: HTMLElement, ev: TouchEvent) => any) | null
    ontouchend?: ((this: HTMLElement, ev: TouchEvent) => any) | null
  }

  // 扩展CSSStyleDeclaration接口
  interface CSSStyleDeclaration {
    // 浏览器特定CSS属性
    webkitOverflowScrolling?: string
    msOverflowStyle?: string
    scrollbarWidth?: string
  }

  // 扩展Navigator接口
  interface Navigator {
    // 设备信息
    userAgentData?: {
      brands: Array<{ brand: string; version: string }>
      mobile: boolean
      platform: string
    }

    // 连接信息
    connection?: {
      effectiveType: 'slow-2g' | '2g' | '3g' | '4g'
      saveData: boolean
      downlink: number
      rtt: number
    }

    // 语言相关
    languages?: readonly string[]
  }

  // 扩展Performance接口
  interface Performance {
    memory?: {
      usedJSHeapSize: number
      totalJSHeapSize: number
      jsHeapSizeLimit: number
    }
  }

  // 扩展Console接口
  interface Console {
    // 自定义控制台方法
    debug?: (...args: any[]) => void
    table?: (tabularData?: any, properties?: string[]) => void
    timeStamp?: (label?: string) => void
  }
}

// 模块类型声明
declare module '*.css' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.scss' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.sass' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.less' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.styl' {
  const content: { [className: string]: string }
  export default content
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >

  const src: string
  export default src
}

declare module '*.png' {
  const content: string
  export default content
}

declare module '*.jpg' {
  const content: string
  export default content
}

declare module '*.jpeg' {
  const content: string
  export default content
}

declare module '*.gif' {
  const content: string
  export default content
}

declare module '*.webp' {
  const content: string
  export default content
}

declare module '*.ico' {
  const content: string
  export default content
}

declare module '*.bmp' {
  const content: string
  export default content
}

declare module '*.json' {
  const content: any
  export default content
}

declare module '*.md' {
  const content: string
  export default content
}

declare module '*.mdx' {
  const content: any
  export default content
}

declare module '*.txt' {
  const content: string
  export default content
}

declare module '*.xml' {
  const content: string
  export default content
}

declare module '*.csv' {
  const content: string
  export default content
}

declare module '*.yaml' {
  const content: any
  export default content
}

declare module '*.yml' {
  const content: any
  export default content
}

// 第三方库类型声明
declare module 'react' {
  // React 18 并发特性
  interface Root {
    render(children: React.ReactNode): void
    unmount(): void
  }

  function createRoot(
    container: Element | DocumentFragment,
    options?: {
      identifierPrefix?: string
      onRecoverableError?: (error: Error) => void
    },
  ): Root
}

declare module 'next' {
  // Next.js 扩展
  interface NextPageContext {
    // 自定义上下文属性
    locale?: string
    defaultLocale?: string
    domains?: Array<{ domain: string; defaultLocale: string }>
  }

  interface NextApiRequest {
    // 自定义API请求属性
    user?: any
    session?: any
    cookies?: Record<string, string>
  }

  interface NextApiResponse {
    // 自定义API响应方法
    json(data: any): void
    status(code: number): NextApiResponse
    send(data: any): void
    redirect(url: string): void
  }
}

// 环境变量类型声明
interface ProcessEnv {
  // 公共环境变量
  NODE_ENV: 'development' | 'production' | 'test'
  PUBLIC_URL: string

  // API配置
  NEXT_PUBLIC_API_BASE_URL: string
  NEXT_PUBLIC_API_TIMEOUT: string

  // 认证配置
  NEXT_PUBLIC_AUTH_DOMAIN: string
  NEXT_PUBLIC_AUTH_CLIENT_ID: string
  NEXT_PUBLIC_AUTH_REDIRECT_URI: string

  // 分析工具
  NEXT_PUBLIC_GA_TRACKING_ID: string
  NEXT_PUBLIC_HOTJAR_ID: string
  NEXT_PUBLIC_SENTRY_DSN: string

  // 功能开关
  NEXT_PUBLIC_ENABLE_ANALYTICS: string
  NEXT_PUBLIC_ENABLE_PWA: string
  NEXT_PUBLIC_ENABLE_OFFLINE: string
}

// 自定义错误类型
declare class AppError extends Error {
  code: string
  status: number
  details?: any

  constructor(message: string, code?: string, status?: number, details?: any)
}

// 自定义事件类型
interface CustomEventMap {
  'app:error': CustomEvent<{ error: Error; context?: any }>
  'app:notification': CustomEvent<{
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    duration?: number
  }>
  'app:theme-change': CustomEvent<{ theme: 'light' | 'dark' }>
  'app:language-change': CustomEvent<{ language: string }>
  'app:route-change': CustomEvent<{
    from: string
    to: string
    type: 'push' | 'replace' | 'back' | 'forward'
  }>
}

declare global {
  // 扩展Window事件类型
  interface Window {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (event: CustomEventMap[K]) => void,
      options?: boolean | AddEventListenerOptions,
    ): void

    removeEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (event: CustomEventMap[K]) => void,
      options?: boolean | EventListenerOptions,
    ): void

    dispatchEvent<K extends keyof CustomEventMap>(event: CustomEventMap[K]): boolean
  }

  // 扩展Document事件类型
  interface Document {
    addEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (event: CustomEventMap[K]) => void,
      options?: boolean | AddEventListenerOptions,
    ): void

    removeEventListener<K extends keyof CustomEventMap>(
      type: K,
      listener: (event: CustomEventMap[K]) => void,
      options?: boolean | EventListenerOptions,
    ): void

    dispatchEvent<K extends keyof CustomEventMap>(event: CustomEventMap[K]): boolean
  }
}

// 导出空对象以确保这是一个模块
export {}
