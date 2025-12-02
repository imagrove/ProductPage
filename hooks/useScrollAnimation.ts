import { useState, useEffect, useRef, useCallback } from 'react'
import type { ScrollAnimationHook } from '@/types/hooks'

export const useScrollAnimation = (options?: {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}): ScrollAnimationHook => {
  const [isInView, setIsInView] = useState(false)
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries

      if (!entry) return

      if (entry.isIntersecting) {
        setIsInView(true)

        // 计算进入视口的进度
        const intersectionRatio = entry.intersectionRatio
        setProgress(Math.min(1, Math.max(0, intersectionRatio)))

        // 如果设置为触发一次，则停止观察
        if (options?.triggerOnce && observerRef.current) {
          observerRef.current.unobserve(entry.target)
        }
      } else {
        setIsInView(false)
        setProgress(0)
      }
    },
    [options?.triggerOnce],
  )

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: options?.rootMargin || '0px',
      threshold: options?.threshold !== undefined ? options.threshold : 0.1,
    })

    observerRef.current = observer

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      observerRef.current = null
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [handleIntersection, options?.rootMargin, options?.threshold])

  return {
    ref,
    isInView,
    progress,
  }
}
