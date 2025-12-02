'use client'

import { motion } from 'framer-motion'
import { useScrollToSection } from '@/hooks'

export default function Hero() {
  const { scrollToSection } = useScrollToSection()

  // 动画变体 - 优化性能
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className='flex min-h-screen items-center justify-center pb-16 pt-20'>
      <div className='container'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='mx-auto max-w-6xl text-center'
        >
          {/* 主标题 */}
          <motion.h1
            variants={itemVariants}
            className='mb-6 font-display text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl xl:text-7xl'
          >
            全场景多媒体播控系统
            <span className='block bg-gradient-to-r from-primary-700 via-accent-600 to-primary-700 bg-clip-text text-transparent'>
              专业定制解决方案
            </span>
          </motion.h1>

          {/* 副标题 */}
          <motion.p
            variants={itemVariants}
            className='mx-auto mb-8 max-w-4xl text-xl leading-relaxed text-gray-600 sm:text-2xl lg:text-3xl'
          >
            提供一站式技术解决方案
          </motion.p>

          {/* 特色标签 */}
          <motion.div variants={itemVariants} className='mb-12 flex flex-wrap justify-center gap-4'>
            {['10 年+行业经验', '全流程定制开发', '稳定可靠交付', '24/7 技术支持'].map(
              (tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.8 }}
                  className='inline-flex items-center rounded-full border border-gray-200 bg-white/80 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm backdrop-blur-sm'
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  <svg
                    className='mr-2 h-4 w-4 text-primary-500'
                    fill='currentColor'
                    viewBox='0 0 20 20'
                  >
                    <path
                      fillRule='evenodd'
                      d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                      clipRule='evenodd'
                    />
                  </svg>
                  {tag}
                </motion.span>
              ),
            )}
          </motion.div>

          {/* 行动按钮 */}
          <motion.div
            variants={itemVariants}
            className='mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row'
          >
            <motion.button
              onClick={() => scrollToSection('contact')}
              className='transform rounded-lg bg-gradient-to-r from-primary-700 to-primary-800 px-10 py-4 text-lg font-medium text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-primary-800 hover:to-primary-900 hover:shadow-xl active:scale-95'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              立即咨询方案
            </motion.button>

            <motion.button
              onClick={() => scrollToSection('solution')}
              className='transform rounded-lg border border-primary-200 bg-white px-10 py-4 text-lg font-medium text-primary-600 shadow-sm transition-all duration-300 hover:scale-105 hover:border-primary-300 hover:shadow-md active:scale-95'
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              了解解决方案
            </motion.button>
          </motion.div>

          {/* 多媒体演示预览 */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className='group relative mb-12 overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-br from-primary-50 via-white to-accent-50 p-8 shadow-2xl lg:p-12'
            whileHover={{ scale: 1.02, shadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            <div className='relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-r from-blue-500/20 to-purple-500/20'>
              {/* 动态网格背景 - 优化性能 */}
              <div className='absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>

              {/* 加载占位符 */}
              <div className='absolute inset-0 animate-pulse bg-gray-100 opacity-0 transition-opacity duration-300 group-hover:opacity-0'></div>

              <div className='relative z-10 text-center'>
                <motion.div
                  className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-accent-500 shadow-lg'
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <svg
                    className='h-8 w-8 text-white'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={2}
                      d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </motion.div>
                <motion.p
                  className='mb-2 font-medium text-gray-700'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  多媒体系统演示预览
                </motion.p>
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className='mt-2 rounded-lg bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-primary-700 hover:to-primary-800 hover:shadow-xl'
                >
                  播放演示
                </motion.button>
              </div>
            </div>
            {/* 动态背景效果 */}
            <div className='absolute inset-0 bg-gradient-to-r from-primary-500/5 via-accent-500/5 to-primary-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>
          </motion.div>

          {/* 滚动指示器 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
            className='absolute bottom-8 left-1/2 -translate-x-1/2 transform'
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className='flex flex-col items-center text-gray-400'
            >
              <span className='mb-2 text-sm'>向下滚动</span>
              <svg className='h-5 w-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M19 14l-7 7m0 0l-7-7m7 7V3'
                />
              </svg>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
