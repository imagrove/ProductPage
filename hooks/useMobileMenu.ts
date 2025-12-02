import { useState, useEffect, useCallback } from 'react'
import type { MobileMenuHook } from '@/types/hooks'

export const useMobileMenu = (options?: {
  breakpoint?: number
  menuSelector?: string
  toggleSelector?: string
}): MobileMenuHook => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  const openMenu = useCallback(() => {
    setIsOpen(true)
  }, [])

  // 监听窗口大小变化，在桌面端自动关闭菜单
  useEffect(() => {
    const handleResize = () => {
      const breakpoint = options?.breakpoint || 768
      if (window.innerWidth > breakpoint) {
        closeMenu()
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [closeMenu, options?.breakpoint])

  // 点击菜单外区域关闭菜单
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menuSelector = options?.menuSelector || '.nav-menu'
      const toggleSelector = options?.toggleSelector || '.mobile-menu-toggle'

      const menu = document.querySelector(menuSelector)
      const toggle = document.querySelector(toggleSelector)

      if (
        isOpen &&
        menu &&
        toggle &&
        !menu.contains(event.target as Node) &&
        !toggle.contains(event.target as Node)
      ) {
        closeMenu()
      }
    }

    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, closeMenu, options?.menuSelector, options?.toggleSelector])

  // ESC键关闭菜单
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        closeMenu()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, closeMenu])

  return {
    isOpen,
    toggleMenu,
    closeMenu,
    openMenu,
  }
}
