// Hooks相关类型定义

import { RefObject } from 'react'

// useFormValidation Hook类型
export interface FormValidationHook {
  errors: Record<string, string>
  validateForm: (data: Record<string, any>) => boolean
  clearErrors: () => void
}

export interface FormValidationOptions {
  initialValues?: Record<string, any>
  validationRules?: Record<string, (value: any) => string | null>
}

// useScroll Hook类型
export interface ScrollHook {
  scrollY: number
  scrollX: number
  scrollDirection: 'up' | 'down' | null
  isScrolling: boolean
}

export interface ScrollOptions {
  throttle?: number
  onScroll?: (scrollY: number, scrollX: number, direction: 'up' | 'down' | null) => void
}

// useScrollAnimation Hook类型
export interface ScrollAnimationHook {
  ref: RefObject<HTMLElement>
  isInView: boolean
  progress: number
}

export interface ScrollAnimationOptions {
  threshold?: number
  triggerOnce?: boolean
  rootMargin?: string
}

// useScrollDetection Hook类型
export interface ScrollDetectionHook {
  activeSection: string
  sectionProgress: Record<string, number>
  isSectionInView: (sectionId: string) => boolean
}

export interface ScrollDetectionOptions {
  sections: string[]
  offset?: number
  threshold?: number
}

// useScrollToSection Hook类型
export interface ScrollToSectionHook {
  scrollToSection: (sectionId: string, options?: ScrollToOptions) => void
  isScrolling: boolean
}

// useScrollToTop Hook类型
export interface ScrollToTopHook {
  isVisible: boolean
  scrollToTop: (options?: ScrollToOptions) => void
}

export interface ScrollToTopOptions {
  threshold?: number
  behavior?: ScrollBehavior
}

// useMobileMenu Hook类型
export interface MobileMenuHook {
  isOpen: boolean
  toggleMenu: () => void
  closeMenu: () => void
  openMenu: () => void
}

// useIntersectionObserver Hook类型
export interface IntersectionObserverHook {
  ref: RefObject<HTMLElement>
  isIntersecting: boolean
  entry?: IntersectionObserverEntry
}

export interface IntersectionObserverOptions {
  threshold?: number | number[]
  root?: Element | Document | null
  rootMargin?: string
  freezeOnceVisible?: boolean
}

// useLocalStorage Hook类型
export interface LocalStorageHook<T> {
  value: T
  setValue: (value: T) => void
  removeValue: () => void
}

export interface LocalStorageOptions<T> {
  defaultValue?: T
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
}

// useDebounce Hook类型
export interface DebounceHook<T> {
  debouncedValue: T
  isDebouncing: boolean
}

export interface DebounceOptions {
  delay?: number
  leading?: boolean
  trailing?: boolean
}

// useThrottle Hook类型
export interface ThrottleHook<T> {
  throttledValue: T
  isThrottling: boolean
}

export interface ThrottleOptions {
  delay?: number
  leading?: boolean
  trailing?: boolean
}

// useMediaQuery Hook类型
export interface MediaQueryHook {
  matches: boolean
}

export interface MediaQueryOptions {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

// useClickOutside Hook类型
export interface ClickOutsideHook {
  ref: RefObject<HTMLElement>
}

export interface ClickOutsideOptions {
  handler: (event: MouseEvent | TouchEvent) => void
  events?: string[]
}

// useKeyPress Hook类型
export interface KeyPressHook {
  keyPressed: boolean
}

export interface KeyPressOptions {
  targetKey: string
  eventType?: 'keydown' | 'keyup' | 'keypress'
}

// useWindowSize Hook类型
export interface WindowSizeHook {
  width: number
  height: number
}

// useDocumentTitle Hook类型
export interface DocumentTitleHook {
  setTitle: (title: string) => void
}

// useOnlineStatus Hook类型
export interface OnlineStatusHook {
  isOnline: boolean
}

// useCopyToClipboard Hook类型
export interface CopyToClipboardHook {
  isCopied: boolean
  copy: (text: string) => Promise<boolean>
}

// useFetch Hook类型
export interface FetchHook<T> {
  data: T | null
  loading: boolean
  error: Error | null
  refetch: () => void
}

export interface FetchOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: any
  cache?: 'default' | 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached'
  credentials?: 'include' | 'same-origin' | 'omit'
  mode?: 'cors' | 'no-cors' | 'same-origin'
}

// useToggle Hook类型
export interface ToggleHook {
  value: boolean
  toggle: () => void
  setTrue: () => void
  setFalse: () => void
}

// useCounter Hook类型
export interface CounterHook {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
  setCount: (value: number) => void
}

export interface CounterOptions {
  initialValue?: number
  min?: number
  max?: number
  step?: number
}
