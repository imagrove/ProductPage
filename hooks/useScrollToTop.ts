import { useCallback, useState, useEffect } from 'react'
import type { ScrollToTopHook } from '@/types/hooks'

export const useScrollToTop = (options?: {
  threshold?: number
  behavior?: ScrollBehavior
}): ScrollToTopHook => {
  const [isVisible, setIsVisible] = useState(false)

  const scrollToTop = useCallback(
    (scrollOptions?: ScrollToOptions) => {
      window.scrollTo({
        top: 0,
        behavior: options?.behavior || 'smooth',
        ...scrollOptions,
      })
    },
    [options?.behavior],
  )

  useEffect(() => {
    const handleScroll = () => {
      const threshold = options?.threshold || 300
      setIsVisible(window.scrollY > threshold)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    // 初始化检测
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [options?.threshold])

  return {
    isVisible,
    scrollToTop,
  }
}
