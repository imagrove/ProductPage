'use client'

import { useState, useRef, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'

interface LazyImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  placeholder?: string
  priority?: boolean
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className = '',
  placeholder = '/images/placeholder.jpg',
  priority = false,
}: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(priority)
  const imgRef = useRef<HTMLImageElement>(null)

  // 使用useMemo优化观察器配置
  const observerOptions = useMemo(
    () => ({
      threshold: 0.01, // 降低阈值，更早触发
      rootMargin: priority ? '0px' : '200px 0px 200px 0px', // 增加提前加载距离
    }),
    [priority],
  )

  useEffect(() => {
    if (priority) {
      // 优先级图片立即加载
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) {
        setIsInView(true)
        observer.disconnect()
      }
    }, observerOptions)

    if (imgRef.current) {
      observer.observe(imgRef.current)
    }

    return () => observer.disconnect()
  }, [priority, observerOptions])

  // 预加载优化
  useEffect(() => {
    if (isInView && !isLoaded) {
      const img = new Image()
      img.src = src
      img.onload = () => setIsLoaded(true)
    }
  }, [isInView, src, isLoaded])

  return (
    <div ref={imgRef} className={`relative overflow-hidden ${className}`}>
      {/* 优化的占位符 */}
      {!isLoaded && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200'
          style={{ width, height }}
        >
          <div className='text-center text-gray-400'>
            <div className='mx-auto mb-1 h-4 w-4 animate-spin rounded-full border border-gray-300 border-t-primary-500'></div>
            <div className='text-xs'>加载中</div>
          </div>
        </motion.div>
      )}

      {/* 优化的图片加载 */}
      {isInView && (
        <motion.img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={`transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
          decoding='async'
          fetchPriority={priority ? 'high' : 'auto'}
        />
      )}
    </div>
  )
}
