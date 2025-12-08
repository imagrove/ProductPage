'use client'

import { motion } from 'framer-motion'
import { useScrollToSection } from '@/hooks'
import { useState } from 'react'

export default function Hero() {
  const { scrollToSection } = useScrollToSection()
  const [showVideo, setShowVideo] = useState(true)
  const [videoKey, setVideoKey] = useState(0) // 用于强制重播

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
              {/* 视频播放器 */}
              {showVideo ? (
                <div className="relative h-full w-full">
                  <iframe
                    key={videoKey}
                    src="https://player.bilibili.com/player.html?bvid=BV1dL4y177kZ&vd_source=0afccb388f9974d57e7fdf61618ed837&high_quality=1&autoplay=1&page=1"
                    scrolling="no"
                    style={{ border: 'none' }}
                    allowFullScreen
                    className="absolute inset-0 h-full w-full"
                    title="展馆多媒体播控系统演示视频"
                    allow="autoplay; fullscreen"
                    referrerPolicy="no-referrer"
                  ></iframe>
                  {/* 重播按钮 */}
                  <div className="absolute bottom-4 left-4 z-10">
                    <button
                      onClick={() => setVideoKey(prev => prev + 1)}
                      className="inline-flex items-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-primary-700 hover:shadow-xl"
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 5V1L7 6l5 5V7a6 6 0 0 1 6 6 6 6 0 0 1-6 6 6 6 0 0 1-6-6H4a8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8z"/>
                      </svg>
                      重播视频
                    </button>
                  </div>
                  
                  {/* 跳转到B站的覆盖层 */}
                  <div className="absolute bottom-4 right-4 z-10">
                    <a
                      href="https://www.bilibili.com/video/BV1Cm2kBVEd9/?share_source=copy_web&vd_source=99efd5b2b7c66214eaf3bfc18a284cab"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-lg bg-bilibili-blue px-4 py-2 text-sm font-medium text-white shadow-lg transition-all duration-300 hover:bg-bilibili-blue-dark hover:shadow-xl"
                    >
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18.71 3.29a1 1 0 0 0-1.42 0L9 11.59V8a1 1 0 0 0-2 0v8a1 1 0 0 0 1 1h8a1 1 0 0 0 0-2h-3.59l8.3-8.29a1 1 0 0 0 0-1.42z"/>
                      </svg>
                      前往B站观看高清版
                    </a>
                  </div>
                </div>
              ) : (
                <div 
                  className="absolute inset-0 flex cursor-pointer items-center justify-center"
                  onClick={() => setShowVideo(true)}
                >
                  {/* 视频预览图 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
                  
                  {/* 播放按钮 */}
                  <motion.div
                    className="relative z-10 text-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-accent-500 shadow-lg"
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
                      点击播放演示视频
                    </motion.p>
                    <motion.p
                      className='text-sm text-gray-500'
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.2 }}
                    >
                      展馆多媒体播控系统演示
                    </motion.p>
                  </motion.div>
                </div>
              )}
              
              {/* 动态网格背景 - 优化性能 */}
              <div className='absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px] opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>
            </div>
            {/* 动态背景效果 */}
            <div className='absolute inset-0 bg-gradient-to-r from-primary-500/5 via-accent-500/5 to-primary-500/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>
          </motion.div>


        </motion.div>
      </div>
    </section>
  )
}
