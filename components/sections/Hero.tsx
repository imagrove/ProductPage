'use client'

import { motion } from 'framer-motion'
import { useScrollToSection } from '@/hooks'
import { useState, useEffect } from 'react'
import { CheckIcon, PlayIcon } from '@/components/ui/MinimalIcons'

export default function Hero() {
  const { scrollToSection } = useScrollToSection()
  const [showVideo, setShowVideo] = useState(true)
  const [videoKey, setVideoKey] = useState(0) // 用于强制重播
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // 页面加载后直接显示视频并尝试自动播放
  useEffect(() => {
    // 设置一个延迟，确保页面完全加载后再显示视频
    const timer = setTimeout(() => {
      setShowVideo(true)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // 监听视频播放状态
  useEffect(() => {
    // 重置播放状态
    setIsVideoPlaying(false)
    
    // 模拟视频播放检测 - 在实际应用中，这应该通过视频事件监听器实现
    const checkVideoPlayback = () => {
      // 这里可以添加实际的视频播放状态检测逻辑
      // 例如：视频元素的 paused 属性
      setIsVideoPlaying(true)
    }

    if (showVideo) {
      const playbackTimer = setTimeout(checkVideoPlayback, 1500)
      
      return () => clearTimeout(playbackTimer)
    }
  }, [showVideo])

  // 动画变体 - 优化性能
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    },
  }

  const handlePlayVideo = () => {
    setShowVideo(true)
    setVideoKey(prev => prev + 1)
  }

  return (
    <section className='flex min-h-screen items-center justify-center pb-16 pt-24 bg-white'>
      <div className='container'>
        <motion.div
          variants={containerVariants}
          initial='hidden'
          animate='visible'
          className='mx-auto max-w-6xl text-center'
        >
          {/* 主标题 - 根据UI设计文档 h1: 48px/1.2, 字重700 */}
          <motion.h1
            variants={itemVariants}
            className='mb-8 font-display text-4xl font-bold leading-tight text-gray-800 sm:text-5xl lg:text-6xl xl:text-7xl'
          >
            多媒体播控一站式解决方案
          </motion.h1>

          {/* 特色标签 - 根据UI设计文档 */}
          <motion.div variants={itemVariants} className='mb-16 flex flex-wrap justify-center gap-6'>
            {['10 年+行业经验', '全流程定制开发', '稳定可靠交付', '7×24小时技术支持'].map(
              (tag, index) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.8, duration: 0.2, ease: "easeOut" }}
                  className='inline-flex items-center rounded-full border border-gray-200 bg-white px-6 py-3 text-base font-semibold text-gray-700 shadow-md'
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <CheckIcon className='mr-3 h-5 w-5 text-primary-600' />
                  {tag}
                </motion.span>
              ),
            )}
          </motion.div>

          {/* 行动按钮 - 根据UI设计文档 */}
          <motion.div
            variants={itemVariants}
            className='mb-16 flex flex-col items-center justify-center gap-6 sm:flex-row'
          >
            <motion.button
              onClick={() => scrollToSection('contact')}
              className='rounded-lg bg-primary-600 px-12 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:bg-primary-700 hover:shadow-xl active:scale-98'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              立即咨询
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('solution')}
              className='rounded-lg border-2 border-primary-600 bg-white px-12 py-4 text-lg font-semibold text-primary-600 shadow-lg transition-all duration-200 hover:bg-primary-50 hover:shadow-xl active:scale-98'
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              了解方案
            </motion.button>
          </motion.div>

          {/* 多媒体演示预览 - 根据UI设计文档 */}
          <motion.div variants={itemVariants} className='relative'>
            <div className='relative mx-auto max-w-5xl overflow-hidden rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 shadow-lg'>
              {/* 视频播放器 */}
              <div className='aspect-video bg-gray-900'>
                {showVideo ? (
                  <iframe
                    key={videoKey}
                    src={`https://player.bilibili.com/player.html?bvid=BV1Cm2kBVEd9&vd_source=99efd5b2b7c66214eaf3bfc18a284cab&high_quality=1&autoplay=1&page=1&muted=0`}
                    className='h-full w-full'
                    title='展馆多媒体播控系统演示视频'
                    allow="autoplay; fullscreen"
                    referrerPolicy="no-referrer"
                    sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  />
                ) : (
                  <div className='flex h-full w-full items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100'>
                    <div className='text-center'>
                      <div className='mb-6 flex justify-center'>
                        <PlayIcon className='h-20 w-20 text-primary-500' />
                      </div>
                      <button
                        onClick={handlePlayVideo}
                        className='rounded-lg bg-primary-600 px-10 py-4 text-lg font-semibold text-white transition-all duration-200 hover:bg-primary-700 hover:shadow-lg'
                      >
                        点击播放演示视频
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* 视频控制栏 */}
              <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8'>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center space-x-6'>
                    <button
                      onClick={() => setShowVideo(!showVideo)}
                      className='flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30 hover:scale-105'
                    >
                      {showVideo ? (
                        <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 20 20'>
                          <path
                            fillRule='evenodd'
                            d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z'
                            clipRule='evenodd'
                          />
                        </svg>
                      ) : (
                        <svg className='h-6 w-6' fill='currentColor' viewBox='0 0 20 20'>
                          <path
                            fillRule='evenodd'
                            d='M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z'
                            clipRule='evenodd'
                          />
                        </svg>
                      )}
                    </button>
                    <span className='text-base font-semibold text-white'>展馆多媒体播控系统演示</span>
                  </div>
                  <div className='flex items-center space-x-4'>
                    <button
                      onClick={() => setVideoKey(prev => prev + 1)}
                      className='rounded-lg bg-white/20 px-6 py-3 text-base font-medium text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30 hover:scale-105'
                    >
                      重播
                    </button>
                    <a
                      href='https://www.bilibili.com/video/BV1Cm2kBVEd9/?share_source=copy_web&vd_source=99efd5b2b7c66214eaf3bfc18a284cab'
                      target='_blank'
                      rel='noopener noreferrer'
                      className='rounded-lg bg-primary-600 px-6 py-3 text-base font-medium text-white transition-all duration-200 hover:bg-primary-700 hover:shadow-lg'
                    >
                      观看高清版
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}