'use client'

import { useState, useEffect, useCallback } from 'react'
import type { ScrollDetectionHook } from '@/types/hooks'
import { throttle } from '@/lib/utils'

export const useScrollDetection = (
  sections: string[],
  options?: { offset?: number; threshold?: number },
): ScrollDetectionHook => {
  const [activeSection, setActiveSection] = useState<string>(sections[0] || '')
  const [sectionProgress, setSectionProgress] = useState<Record<string, number>>({})

  const isSectionInView = useCallback(
    (sectionId: string): boolean => {
      const element = document.getElementById(sectionId)
      if (!element) return false

      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const offset = options?.offset || 0
      const threshold = options?.threshold || 0.3

      return (
        rect.top <= windowHeight * threshold + offset &&
        rect.bottom >= windowHeight * (1 - threshold) - offset
      )
    },
    [options?.offset, options?.threshold],
  )

  const calculateSectionProgress = useCallback((sectionId: string): number => {
    const element = document.getElementById(sectionId)
    if (!element) return 0

    const rect = element.getBoundingClientRect()
    const windowHeight = window.innerHeight
    const elementHeight = rect.height

    // 计算元素在视口中的可见比例
    const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0)
    const progress = Math.max(0, Math.min(1, visibleHeight / elementHeight))

    return progress
  }, [])

  const handleScroll = useCallback(() => {
    // 更新活动区域
    for (const sectionId of sections) {
      if (isSectionInView(sectionId)) {
        setActiveSection(prev => (prev !== sectionId ? sectionId : prev))
        break
      }
    }

    // 更新区域进度
    const newProgress: Record<string, number> = {}
    sections.forEach(sectionId => {
      newProgress[sectionId] = calculateSectionProgress(sectionId)
    })
    setSectionProgress(prev => {
      // 只有当进度有显著变化时才更新
      const hasSignificantChange = sections.some(
        sectionId => Math.abs((prev[sectionId] || 0) - (newProgress[sectionId] || 0)) > 0.05,
      )
      return hasSignificantChange ? newProgress : prev
    })
  }, [sections, isSectionInView, calculateSectionProgress])

  useEffect(() => {
    const throttledScroll = throttle(handleScroll, 50) // 减少节流时间以提高响应性

    window.addEventListener('scroll', throttledScroll, { passive: true })
    window.addEventListener('resize', throttledScroll, { passive: true })

    // 初始化检测
    handleScroll()

    return () => {
      window.removeEventListener('scroll', throttledScroll)
      window.removeEventListener('resize', throttledScroll)
    }
  }, [sections, handleScroll]) // 添加handleScroll依赖

  return {
    activeSection,
    sectionProgress,
    isSectionInView,
  }
}
