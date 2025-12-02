// 样式工具函数

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * 合并Tailwind类名，避免冲突
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 容器样式
 */
export const containerStyles = {
  base: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  narrow: 'max-w-4xl mx-auto px-4 sm:px-6 lg:px-8',
  wide: 'max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8',
}

/**
 * 间距样式
 */
export const spacingStyles = {
  section: {
    base: 'py-16 sm:py-20 lg:py-24',
    large: 'py-20 sm:py-24 lg:py-32',
    small: 'py-12 sm:py-16 lg:py-20',
  },
  element: {
    base: 'mb-8',
    large: 'mb-12',
    small: 'mb-4',
  },
}

/**
 * 文本样式
 */
export const textStyles = {
  heading: {
    h1: 'text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900',
    h2: 'text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900',
    h3: 'text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900',
    h4: 'text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900',
  },
  body: {
    base: 'text-base text-gray-600 leading-relaxed',
    large: 'text-lg sm:text-xl text-gray-600 leading-relaxed',
    small: 'text-sm text-gray-600 leading-relaxed',
  },
}

/**
 * 卡片样式
 */
export const cardStyles = {
  base: 'bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300',
  elevated: 'bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-0',
  interactive:
    'bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer transform hover:-translate-y-1',
}

/**
 * 按钮样式
 */
export const buttonStyles = {
  base: 'inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2',
  variants: {
    primary: 'bg-primary-600 hover:bg-primary-700 text-white focus:ring-primary-500',
    secondary: 'bg-secondary-600 hover:bg-secondary-700 text-white focus:ring-secondary-500',
    outline:
      'border border-gray-300 hover:border-gray-400 text-gray-700 hover:text-gray-900 focus:ring-gray-500',
  },
  sizes: {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  },
}

/**
 * 渐变样式
 */
export const gradientStyles = {
  primary: 'bg-gradient-to-r from-primary-500 to-accent-500',
  secondary: 'bg-gradient-to-r from-secondary-500 to-green-500',
  blue: 'bg-gradient-to-r from-blue-500 to-blue-600',
  purple: 'bg-gradient-to-r from-purple-500 to-purple-600',
  green: 'bg-gradient-to-r from-green-500 to-green-600',
  orange: 'bg-gradient-to-r from-orange-500 to-orange-600',
  yellow: 'bg-gradient-to-r from-yellow-500 to-yellow-600',
}

/**
 * 动画样式
 */
export const animationStyles = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.4 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  },
}

/**
 * 网格布局样式
 */
export const gridStyles = {
  base: 'grid gap-6',
  columns: {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  },
}

/**
 * 工具函数：生成响应式类名
 */
export function responsiveClass(
  base: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string,
): string {
  return cn(base, sm && `sm:${sm}`, md && `md:${md}`, lg && `lg:${lg}`, xl && `xl:${xl}`)
}

/**
 * 工具函数：生成动画类名
 */
export function animationClass(
  type: keyof typeof animationStyles,
  delay?: number,
  duration?: number,
): string {
  return cn(`animate-${type}`, delay && `delay-${delay}`, duration && `duration-${duration}`)
}
