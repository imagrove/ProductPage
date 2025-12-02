// 项目通用类型定义

export interface ContactFormData {
  name: string
  phone: string
  projectType: string
  message: string
}

export interface FormErrors {
  projectType?: string
  contactName?: string
  contactPhone?: string
  projectDesc?: string
}

export interface ScrollSection {
  id: string
  label: string
}

export interface ProjectType {
  value: string
  label: string
}

export interface ContactInfo {
  icon: string
  title: string
  value: string
  description: string
}

export interface ServiceFeature {
  icon: string
  title: string
  description: string
}

export interface TechnologyStack {
  name: string
  description: string
  icon: string
}

export interface UseCase {
  title: string
  description: string
  image: string
  features: string[]
}

// 表单验证相关类型
export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  pattern?: RegExp
  message: string
}

export interface ValidationRules {
  [key: string]: ValidationRule
}

// 滚动相关类型
export interface ScrollPosition {
  x: number
  y: number
}

export interface ScrollOptions {
  behavior?: 'auto' | 'smooth'
  block?: 'start' | 'center' | 'end' | 'nearest'
  inline?: 'start' | 'center' | 'end' | 'nearest'
}

// 动画相关类型
export interface AnimationVariants {
  hidden: object
  visible: object
  exit?: object
}

export interface MotionConfig {
  initial: string
  animate: string
  exit?: string
  transition?: object
}
