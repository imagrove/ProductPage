import { useState, useEffect, useCallback } from 'react'
import type { ScrollHook, ScrollOptions } from '@/types/hooks'

// 节流函数
function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number,
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function (this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export const useScroll = (options?: ScrollOptions): ScrollHook => {
  const [scrollY, setScrollY] = useState(0)
  const [scrollX, setScrollX] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    // 检查是否在浏览器环境中
    if (typeof window === 'undefined') return

    const currentScrollY = window.scrollY
    const currentScrollX = window.scrollX

    setScrollY(currentScrollY)
    setScrollX(currentScrollX)

    // 判断滚动方向
    let direction: 'up' | 'down' | null = null
    if (currentScrollY > lastScrollY) {
      direction = 'down'
    } else if (currentScrollY < lastScrollY) {
      direction = 'up'
    }
    setScrollDirection(direction)

    setLastScrollY(currentScrollY)
    setIsScrolling(true)

    // 调用自定义回调
    options?.onScroll?.(currentScrollY, currentScrollX, direction)

    // 设置滚动结束检测
    setTimeout(() => {
      setIsScrolling(false)
    }, 100)
  }, [lastScrollY, options])

  useEffect(() => {
    // 检查是否在浏览器环境中
    if (typeof window === 'undefined') return

    const throttledScroll = options?.throttle
      ? throttle(handleScroll, options.throttle)
      : handleScroll

    window.addEventListener('scroll', throttledScroll, { passive: true })

    // 初始化滚动位置
    handleScroll()

    return () => {
      window.removeEventListener('scroll', throttledScroll)
    }
  }, [handleScroll, options?.throttle])

  return {
    scrollY,
    scrollX,
    scrollDirection,
    isScrolling,
  }
}
