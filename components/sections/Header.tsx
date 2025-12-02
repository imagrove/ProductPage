'use client'

import { motion } from 'framer-motion'
import { useScrollToSection, useMobileMenu, useScroll } from '@/hooks'

// 导航项配置
const navItems = [
  { id: 'hero', label: '首页', href: '#hero' },
  { id: 'pain-points', label: '客户痛点', href: '#pain-points' },
  { id: 'solution', label: '解决方案', href: '#solution' },
  { id: 'advantages', label: '核心优势', href: '#advantages' },
  { id: 'case-studies', label: '成功案例', href: '#case-studies' },
  { id: 'service-process', label: '服务流程', href: '#service-process' },
  { id: 'contact', label: '联系我们', href: '#contact' },
]

interface HeaderProps {
  activeSection: string
}

export default function Header({ activeSection }: HeaderProps) {
  const { scrollY } = useScroll()
  const { isOpen: isMenuOpen, toggleMenu, closeMenu } = useMobileMenu()
  const { scrollToSection } = useScrollToSection()

  const handleScrollToSection = (sectionId: string) => {
    console.log('113001 - Header handleScrollToSection called with sectionId:', sectionId)
    
    // 直接执行滚动，不延迟关闭菜单
    scrollToSection(sectionId)
    
    // 立即关闭菜单，不使用延迟
    closeMenu()
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`navbar fixed left-0 right-0 top-0 z-50 bg-white transition-all duration-300 ${
        scrollY > 0 ? 'py-3 shadow-lg' : 'py-4'
      }`}
    >
      <div className='container'>
        <div className='flex items-center justify-between'>
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.05 }} className='flex items-center space-x-3'>
            <div className='flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-r from-primary-500 to-primary-600'>
              <svg className='h-6 w-6 text-white' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' />
              </svg>
            </div>
            <div>
              <h1 className='font-display text-xl font-bold text-gray-900'>多媒体播控系统</h1>
              <p className='hidden text-xs text-gray-500 sm:block'>专业定制服务商</p>
            </div>
          </motion.div>

          {/* 桌面导航 */}
          <nav className='hidden items-center space-x-8 lg:flex'>
            {navItems.map(item => (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={e => {
                  e.preventDefault()
                  handleScrollToSection(item.id)
                }}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${activeSection === item.id ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId='activeIndicator'
                    className='absolute bottom-0 left-0 right-0 h-0.5 rounded-full bg-primary-600'
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* 移动端菜单按钮 */}
          <motion.button
            className='mobile-menu-toggle rounded-lg p-2 text-gray-600 transition-colors hover:bg-gray-100 hover:text-primary-600 lg:hidden'
            onClick={toggleMenu}
            whileTap={{ scale: 0.95 }}
          >
            <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              {isMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </motion.button>
        </div>

        {/* 移动端菜单 */}
        <div className={`nav-menu lg:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <nav className='mt-4 space-y-2 border-t border-gray-100 py-4'>
            {navItems.map(item => (
              <a
                key={item.id}
                href={item.href}
                onClick={e => {
                  e.preventDefault()
                  handleScrollToSection(item.id)
                }}
                className={`block rounded-lg px-4 py-3 text-base font-medium transition-colors duration-200 ${activeSection === item.id ? 'bg-primary-50 text-primary-600' : 'text-gray-600 hover:bg-gray-50 hover:text-primary-600'}`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </motion.header>
  )
}
