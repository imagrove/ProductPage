'use client'

import { motion } from 'framer-motion'
import { useScrollToSection, useMobileMenu, useScroll } from '@/hooks'
import { PlayIcon } from '@/components/ui/MinimalIcons'

// 导航项配置
const navItems = [
  { id: 'hero', label: '首页', href: '#hero' },
  { id: 'pain-points', label: '常见挑战', href: '#pain-points' },
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
      className={`navbar fixed left-0 right-0 top-0 z-50 bg-white transition-all duration-300 ${scrollY > 0 ? 'shadow-lg' : ''}`}
    >
      <div className='container h-full'>
        <div className='flex h-full items-center justify-between'>
          {/* Logo - 根据UI设计文档 */}
          <motion.div 
            whileHover={{ scale: 1.05 }} 
            className='flex items-center space-x-3'
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-primary-600'>
              <PlayIcon className='h-7 w-7 text-white' />
            </div>
            <div>
              <h1 className='font-display text-2xl font-bold text-gray-800'>多媒体播控系统</h1> {/* 主标题 - font-bold */}
              <p className='hidden text-sm font-medium text-gray-600 sm:block'>专业定制服务商</p> {/* 次级标题 - font-medium */}
            </div>
          </motion.div>

          {/* 桌面导航 - 根据UI设计文档 */}
          <nav className='hidden items-center space-x-8 desktop:flex'>
            {navItems.map(item => (
              <motion.a
                key={item.id}
                href={item.href}
                onClick={e => {
                  e.preventDefault()
                  handleScrollToSection(item.id)
                }}
                className={`relative px-0 py-3 text-base font-semibold transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'text-primary-600' 
                    : 'text-gray-700 hover:text-primary-500'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId='activeIndicator'
                    className='absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600'
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* 移动端菜单按钮 - 根据UI设计文档 */}
          <motion.button
            className='mobile-menu-toggle rounded-lg p-3 text-gray-800 transition-all duration-200 hover:bg-gray-100 hover:text-primary-500 desktop:hidden'
            onClick={toggleMenu}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' strokeWidth={2}>
              {isMenuOpen ? (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              ) : (
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M4 6h16M4 12h16M4 18h16'
                />
              )}
            </svg>
          </motion.button>
        </div>

        {/* 移动端菜单 - 根据UI设计文档 */}
        <div className={`nav-menu desktop:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <nav className='mt-4 space-y-2 border-t border-gray-200 py-4'>
            {navItems.map(item => (
              <a
                key={item.id}
                href={item.href}
                onClick={e => {
                  e.preventDefault()
                  handleScrollToSection(item.id)
                }}
                className={`block rounded-lg px-4 py-3 text-base font-medium transition-all duration-200 ${
                  activeSection === item.id 
                    ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-primary-500'
                }`}
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
