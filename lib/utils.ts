// 通用工具函数库
import type {
  Nullable,
  Optional,
  Maybe,
  FunctionType,
  EventHandler,
  FormFieldValue,
  FormDataObject,
  FormValidationResult,
} from '@/types/utils'

/**
 * 类型守卫函数
 */
export const isDefined = <T>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined
}

export const isNull = (value: unknown): value is null => {
  return value === null
}

export const isUndefined = (value: unknown): value is undefined => {
  return value === undefined
}

export const isFunction = (value: unknown): value is FunctionType => {
  return typeof value === 'function'
}

export const isString = (value: unknown): value is string => {
  return typeof value === 'string'
}

export const isNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value)
}

export const isBoolean = (value: unknown): value is boolean => {
  return typeof value === 'boolean'
}

export const isObject = (value: unknown): value is Record<string, unknown> => {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
}

export const isArray = <T = any>(value: unknown): value is T[] => {
  return Array.isArray(value)
}

export const isEmpty = (value: unknown): boolean => {
  if (value === null || value === undefined) return true
  if (isString(value)) return value.trim() === ''
  if (isArray(value)) return value.length === 0
  if (isObject(value)) return Object.keys(value).length === 0
  return false
}

/**
 * 函数工具
 */
export const noop = (): void => {}

export const identity = <T>(value: T): T => value

export const constant =
  <T>(value: T): (() => T) =>
  () =>
    value

export const compose = <T>(...fns: FunctionType[]): FunctionType => {
  return fns.reduce(
    (f, g) =>
      (...args: any[]) =>
        f(g(...args)),
  )
}

export const debounce = <T extends FunctionType>(
  func: T,
  wait: number,
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), wait)
  }
}

export const throttle = <T extends FunctionType>(
  func: T,
  limit: number,
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean

  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// 优化的节流函数，支持立即执行和尾调用
export const advancedThrottle = <T extends FunctionType>(
  func: T,
  limit: number,
  options: { leading?: boolean; trailing?: boolean } = { leading: true, trailing: true },
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null
  let lastExecTime = 0
  let lastArgs: Parameters<T> | null = null

  return (...args: Parameters<T>) => {
    const now = Date.now()
    lastArgs = args

    if (options.leading && !timeoutId) {
      func(...args)
      lastExecTime = now
    }

    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        timeoutId = null
        if (options.trailing && lastArgs && now - lastExecTime >= limit) {
          func(...lastArgs)
          lastExecTime = Date.now()
        }
        lastArgs = null
      }, limit)
    }
  }
}

/**
 * 对象操作工具
 */
export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  const result = {} as Pick<T, K>
  keys.forEach(key => {
    if (key in obj) {
      result[key] = obj[key]
    }
  })
  return result
}

export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj }
  keys.forEach(key => {
    delete result[key]
  })
  return result
}

export const deepClone = <T>(obj: T): T => {
  if (obj === null || typeof obj !== 'object') return obj
  if (obj instanceof Date) return new Date(obj.getTime()) as T
  if (obj instanceof Array) return obj.map(item => deepClone(item)) as T

  const cloned = {} as T
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      cloned[key] = deepClone(obj[key])
    }
  }
  return cloned
}

export const merge = <T extends object, U extends object>(target: T, source: U): T & U => {
  return { ...target, ...source }
}

export const deepMerge = <T extends object, U extends object>(target: T, source: U): T & U => {
  const output = { ...target } as T & U

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
      const targetValue = target[key as keyof T]
      const sourceValue = source[key as keyof U]

      if (isObject(targetValue) && isObject(sourceValue)) {
        output[key as keyof (T & U)] = deepMerge(
          targetValue as object,
          sourceValue as object,
        ) as any
      } else {
        output[key as keyof (T & U)] = sourceValue as any
      }
    })
  }

  return output
}

/**
 * 数组操作工具
 */
export const unique = <T>(array: T[]): T[] => {
  return [...new Set(array)]
}

export const chunk = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size))
  }
  return chunks
}

export const groupBy = <T, K extends string | number | symbol>(
  array: T[],
  keyFn: (item: T) => K,
): Record<K, T[]> => {
  return array.reduce(
    (groups, item) => {
      const key = keyFn(item)
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(item)
      return groups
    },
    {} as Record<K, T[]>,
  )
}

export const flatten = <T>(arrays: T[][]): T[] => {
  return arrays.reduce((flat, array) => flat.concat(array), [])
}

/**
 * 字符串操作工具
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const camelCase = (str: string): string => {
  return str.replace(/[-_\s]+(.)?/g, (_, char) => (char ? char.toUpperCase() : ''))
}

export const snakeCase = (str: string): string => {
  return str.replace(/[A-Z]/g, char => `_${char.toLowerCase()}`)
}

export const kebabCase = (str: string): string => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * 表单验证工具
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^1[3-9]\d{9}$/
  return phoneRegex.test(phone)
}

export const validateRequired = (value: FormFieldValue): boolean => {
  if (value === null || value === undefined) return false
  if (isString(value)) return value.trim() !== ''
  if (isArray(value)) return value.length > 0
  return true
}

export const validateLength = (value: string, min?: number, max?: number): boolean => {
  const length = value.length
  if (min !== undefined && length < min) return false
  if (max !== undefined && length > max) return false
  return true
}

/**
 * 事件处理工具
 */
export const stopPropagation = (event: Event): void => {
  event.stopPropagation()
}

export const preventDefault = (event: Event): void => {
  event.preventDefault()
}

export const createEventHandler = <T extends Event>(
  handler: EventHandler<T>,
  options?: { stopPropagation?: boolean; preventDefault?: boolean },
): EventHandler<T> => {
  return (event: T) => {
    if (options?.stopPropagation) {
      event.stopPropagation()
    }
    if (options?.preventDefault) {
      event.preventDefault()
    }
    handler(event)
  }
}

/**
 * 性能监控工具
 */
export const measurePerformance = <T extends FunctionType>(fn: T, name: string): T => {
  return ((...args: Parameters<T>): ReturnType<T> => {
    const start = performance.now()
    const result = fn(...args)
    const end = performance.now()

    console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`)
    return result
  }) as T
}

export const createPerformanceMarker = (name: string) => {
  const start = performance.now()
  return () => {
    const end = performance.now()
    console.log(`[Performance] ${name}: ${(end - start).toFixed(2)}ms`)
  }
}

/**
 * 错误处理工具
 */
export const safeCall = <T extends FunctionType>(
  fn: T,
  fallback?: ReturnType<T>,
): ReturnType<T> | undefined => {
  try {
    return fn()
  } catch (error) {
    console.error('Error in safeCall:', error)
    return fallback
  }
}

export const withErrorHandling = <T extends FunctionType>(
  fn: T,
  errorHandler?: (error: Error) => void,
): T => {
  return ((...args: Parameters<T>): ReturnType<T> | undefined => {
    try {
      return fn(...args)
    } catch (error) {
      const handler = errorHandler || console.error
      handler(error as Error)
      return undefined
    }
  }) as T
}

/**
 * 浏览器相关工具
 */
export const isClient = typeof window !== 'undefined'

export const isServer = !isClient

export const getWindowSize = (): { width: number; height: number } => {
  if (!isClient) return { width: 0, height: 0 }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  }
}

export const getScrollPosition = (): { x: number; y: number } => {
  if (!isClient) return { x: 0, y: 0 }
  return {
    x: window.pageXOffset,
    y: window.pageYOffset,
  }
}

export const scrollToElement = (element: HTMLElement, options?: ScrollToOptions & { offset?: number }): void => {
  if (!isClient) return
  
  // 使用scrollIntoView方法，自动处理视口和元素位置的关系
  // block: 'start'确保元素顶部对齐视口顶部
  // behavior: 'smooth'实现平滑滚动
  element.scrollIntoView({
    behavior: options?.behavior || 'smooth',
    block: 'start',
    inline: 'nearest',
  })
  
  // 添加日志，便于调试
  console.log('113001 - scrollToElement called with scrollIntoView:', {
    elementId: element.id,
    behavior: options?.behavior || 'smooth',
    block: 'start',
    inline: 'nearest'
  })
}

/**
 * 本地存储工具
 */
export const storage = {
  get: <T>(key: string, defaultValue?: T): T | null => {
    if (!isClient) return defaultValue || null
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch {
      return defaultValue || null
    }
  },

  set: <T>(key: string, value: T): void => {
    if (!isClient) return
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error setting localStorage:', error)
    }
  },

  remove: (key: string): void => {
    if (!isClient) return
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  },

  clear: (): void => {
    if (!isClient) return
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Error clearing localStorage:', error)
    }
  },
}

/**
 * 日期时间工具
 */
export const formatDate = (date: Date, format: string = 'YYYY-MM-DD'): string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')

  return format
    .replace('YYYY', String(year))
    .replace('MM', month)
    .replace('DD', day)
    .replace('HH', hours)
    .replace('mm', minutes)
    .replace('ss', seconds)
}

export const parseDate = (dateString: string): Date | null => {
  const date = new Date(dateString)
  return isNaN(date.getTime()) ? null : date
}

export const isToday = (date: Date): boolean => {
  const today = new Date()
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  )
}
