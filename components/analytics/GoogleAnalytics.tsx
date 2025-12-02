'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

// Google Analytics 事件类型定义
interface GAEvent {
  action: string
  category?: string
  label?: string
  value?: number
  [key: string]: any
}

// 自定义维度定义
interface CustomDimensions {
  projectType?: string
  formSubmitted?: boolean
  pageSection?: string
  userType?: string
}

/**
 * 增强版 Google Analytics 组件
 * 提供页面浏览、事件追踪、转化目标等高级功能
 */
export default function GoogleAnalytics() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // 检查是否在生产环境
  const isProduction = process.env.NEXT_PUBLIC_ENV === 'pro'
  const gaId = process.env.NEXT_PUBLIC_GA_ID

  // 初始化 GA4
  useEffect(() => {
    if (!isProduction || !gaId || typeof window === 'undefined') return

    // 配置 GA4
    window.gtag?.('config', gaId, {
      page_title: document.title,
      page_location: window.location.href,
      // 自定义配置
      send_page_view: true,
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
    })
  }, [isProduction, gaId])

  // 页面浏览追踪
  useEffect(() => {
    if (!isProduction || !gaId || typeof window === 'undefined') return

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
    
    // 发送页面浏览事件
    window.gtag?.('event', 'page_view', {
      page_title: document.title,
      page_location: window.location.origin + url,
      page_path: url,
      // 自定义维度
      project_type: getProjectTypeFromPath(pathname),
      user_type: 'new_visitor', // 可以根据实际情况调整
    })
  }, [pathname, searchParams, isProduction, gaId])

  return null
}

/**
 * 发送自定义事件到 Google Analytics
 */
export function sendGAEvent(event: GAEvent) {
  if (typeof window === 'undefined' || !window.gtag) return

  const isProduction = process.env.NEXT_PUBLIC_ENV === 'pro'
  if (!isProduction) {
    console.log('📊 GA Event (开发环境):', event)
    return
  }

  window.gtag('event', event.action, {
    event_category: event.category,
    event_label: event.label,
    value: event.value,
    ...event,
  })
}

/**
 * 发送转化事件
 */
export function sendConversionEvent(conversionId: string, value?: number) {
  if (typeof window === 'undefined' || !window.gtag) return

  const isProduction = process.env.NEXT_PUBLIC_ENV === 'pro'
  if (!isProduction) {
    console.log('🎯 转化事件 (开发环境):', { conversionId, value })
    return
  }

  window.gtag('event', 'conversion', {
    send_to: conversionId,
    value: value,
    currency: 'USD',
  })
}

/**
 * 设置用户属性
 */
export function setUserProperties(properties: Record<string, any>) {
  if (typeof window === 'undefined' || !window.gtag) return

  const isProduction = process.env.NEXT_PUBLIC_ENV === 'pro'
  if (!isProduction) {
    console.log('👤 用户属性 (开发环境):', properties)
    return
  }

  window.gtag('set', 'user_properties', properties)
}

/**
 * 设置自定义维度
 */
export function setCustomDimensions(dimensions: CustomDimensions) {
  if (typeof window === 'undefined' || !window.gtag) return

  const isProduction = process.env.NEXT_PUBLIC_ENV === 'pro'
  if (!isProduction) {
    console.log('📈 自定义维度 (开发环境):', dimensions)
    return
  }

  // 将自定义维度映射到 GA4 参数
  const gaDimensions: Record<string, any> = {}
  
  if (dimensions.projectType) {
    gaDimensions['project_type'] = dimensions.projectType
  }
  if (dimensions.formSubmitted !== undefined) {
    gaDimensions['form_submitted'] = dimensions.formSubmitted
  }
  if (dimensions.pageSection) {
    gaDimensions['page_section'] = dimensions.pageSection
  }
  if (dimensions.userType) {
    gaDimensions['user_type'] = dimensions.userType
  }

  window.gtag('set', gaDimensions)
}

/**
 * 根据路径获取项目类型
 */
function getProjectTypeFromPath(pathname: string): string {
  if (pathname.includes('/contact')) return 'contact_form'
  if (pathname.includes('/products')) return 'product_page'
  if (pathname.includes('/solutions')) return 'solution_page'
  return 'home_page'
}

/**
 * 预定义的事件类型
 */
export const GAEvents = {
  // 表单相关事件
  FORM_SUBMIT: 'form_submit',
  FORM_START: 'form_start',
  FORM_ERROR: 'form_error',
  
  // 用户交互事件
  CLICK: 'click',
  SCROLL: 'scroll',
  DOWNLOAD: 'download',
  
  // 业务相关事件
  CONTACT_REQUEST: 'contact_request',
  PRODUCT_VIEW: 'product_view',
  SOLUTION_VIEW: 'solution_view',
  
  // 转化事件
  LEAD_GENERATED: 'lead_generated',
  CONVERSION: 'conversion',
} as const