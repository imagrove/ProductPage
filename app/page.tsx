'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/sections/Header'
import Hero from '@/components/sections/Hero'
import PainPoints from '@/components/sections/PainPoints'
import Solution from '@/components/sections/Solution'
import Advantages from '@/components/sections/Advantages'
import CaseStudies from '@/components/sections/CaseStudies'
import ServiceProcess from '@/components/sections/ServiceProcess'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { useScrollDetection, useScrollToTop } from '@/hooks'

// 页面组件
export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)
  const sectionIds = [
    'hero',
    'pain-points',
    'solution',
    'advantages',
    'case-studies',
    'service-process',
    'contact',
  ]
  const { activeSection } = useScrollDetection(sectionIds)
  const { scrollToTop } = useScrollToTop()

  useEffect(() => {
    // 模拟加载完成
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  // 加载状态
  if (isLoading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className='text-center'
        >
          <div className='mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600'></div>
          <h2 className='text-xl font-semibold text-gray-700'>多媒体播控系统</h2>
          <p className='mt-2 text-gray-500'>正在加载...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className='min-h-screen'
      >
        {/* 导航栏 */}
        <Header activeSection={activeSection} />

        {/* 主要内容区域 */}
        <main>
          {/* 英雄区域 */}
          <section id='hero' className='hero-gradient'>
            <Hero />
          </section>

          {/* 常见挑战 */}
          <section id='pain-points' className='bg-white'>
            <PainPoints />
          </section>

          {/* 解决方案 */}
          <section id='solution' className='bg-gray-50'>
            <Solution />
          </section>

          {/* 核心优势 */}
          <section id='advantages' className='bg-white'>
            <Advantages />
          </section>

          {/* 成功案例 */}
          <section id='case-studies' className='bg-gray-50'>
            <CaseStudies />
          </section>

          {/* 服务流程 */}
          <section id='service-process' className='bg-white'>
            <ServiceProcess />
          </section>

          {/* 咨询入口 */}
          <section id='contact' className='bg-gradient-to-br from-primary-500 to-secondary-600'>
            <Contact />
          </section>
        </main>

        {/* 页脚 */}
        <Footer />

        {/* 回到顶部按钮 */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => scrollToTop()}
          className='fixed bottom-8 right-8 z-50 rounded-full bg-primary-600 p-3 text-white shadow-lg transition-all duration-300 hover:bg-primary-700'
        >
          <svg className='h-6 w-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 15l7-7 7 7' />
          </svg>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  )
}
