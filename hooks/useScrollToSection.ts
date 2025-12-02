import { useCallback, useState } from 'react'
import type { ScrollToSectionHook } from '@/types/hooks'
import { scrollToElement } from '@/lib/utils'

export const useScrollToSection = (): ScrollToSectionHook => {
  const [isScrolling, setIsScrolling] = useState(false)

  const scrollToSection = useCallback((sectionId: string, options?: ScrollToOptions) => {
    console.log('113001 - useScrollToSection called with sectionId:', sectionId)
    
    // 移除可能存在的'#'前缀
    const cleanSectionId = sectionId.replace('#', '')
    console.log('113001 - Cleaned sectionId:', cleanSectionId)
    
    const targetSection = document.getElementById(cleanSectionId)
    console.log('113001 - Target section found:', targetSection)
    
    if (targetSection) {
      setIsScrolling(true)
      console.log('113001 - Set isScrolling to true')

      // 使用utils中的scrollToElement函数实现平滑滚动
      scrollToElement(targetSection, {
        behavior: 'smooth',
        block: 'start',
        ...options,
      })
      console.log('113001 - scrollToElement called')

      // 监听滚动完成
      const handleScrollEnd = () => {
        console.log('113001 - Scroll end detected')
        setIsScrolling(false)
        window.removeEventListener('scroll', handleScrollEnd)
      }

      // 设置滚动完成检测
      setTimeout(() => {
        window.addEventListener('scroll', handleScrollEnd, { once: true })
        console.log('113001 - Added scroll end listener')
      }, 100)
    } else {
      console.log('113001 - Target section not found for id:', cleanSectionId)
    }
  }, [])

  return {
    scrollToSection,
    isScrolling,
  }
}
