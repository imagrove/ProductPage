'use client'

import { useEffect } from 'react'

export default function PerformanceMonitor() {
  useEffect(() => {
    // 性能监控
    if ('PerformanceObserver' in window) {
      // 监控Largest Contentful Paint (LCP)
      const lcpObserver = new PerformanceObserver(entryList => {
        const entries = entryList.getEntries()
        const lastEntry = entries[entries.length - 1]
        if (lastEntry) {
          console.log('LCP:', lastEntry.startTime)
        }
      })
      lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true })

      // 监控First Input Delay (FID)
      const fidObserver = new PerformanceObserver(entryList => {
        const entries = entryList.getEntries()
        entries.forEach((entry: any) => {
          const processingStart = entry.processingStart || entry.startTime
          console.log('FID:', processingStart - entry.startTime)
        })
      })
      fidObserver.observe({ type: 'first-input', buffered: true })

      // 监控Cumulative Layout Shift (CLS)
      const clsObserver = new PerformanceObserver(entryList => {
        let clsValue = 0
        entryList.getEntries().forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            clsValue += (entry as any).value || 0
          }
        })
        console.log('CLS:', clsValue)
      })
      clsObserver.observe({ type: 'layout-shift', buffered: true })
    }

    // 页面加载时间监控
    const navigationTiming = performance.getEntriesByType(
      'navigation',
    )[0] as PerformanceNavigationTiming
    if (navigationTiming) {
      console.log('页面加载时间:', {
        DNS查询时间: navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart,
        TCP连接时间: navigationTiming.connectEnd - navigationTiming.connectStart,
        请求响应时间: navigationTiming.responseEnd - navigationTiming.requestStart,
        DOM解析时间:
          navigationTiming.domContentLoadedEventEnd - navigationTiming.domContentLoadedEventStart,
        页面完全加载时间:
          navigationTiming.loadEventEnd - (navigationTiming as any).navigationStart || 0,
      })
    }
  }, [])

  return null
}
