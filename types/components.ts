// 组件相关类型定义

export interface FeatureItem {
  title: string
  description: string
  icon: string
  features?: string[]
  gradient?: string
  color?: string
}

export interface TechFeature {
  title: string
  description: string
  icon: string
}

export interface NavigationItem {
  label: string
  href: string
  icon?: string
}

export interface ButtonConfig {
  text: string
  href: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export interface CardProps {
  title: string
  description: string
  icon?: string
  image?: string
  gradient?: string
  color?: string
  features?: string[]
}

export interface SectionConfig {
  title: string
  subtitle?: string
  description?: string
  features?: FeatureItem[]
  techFeatures?: TechFeature[]
  buttons?: ButtonConfig[]
}

export interface AnimationConfig {
  initial?: { opacity: number; y?: number; x?: number }
  whileInView?: { opacity: number; y?: number; x?: number }
  transition?: { duration: number; delay?: number }
  viewport?: { once: boolean; margin?: string }
}

export interface MotionProps {
  animation?: AnimationConfig
  className?: string
  children: React.ReactNode
}

export interface GridLayoutProps {
  items: FeatureItem[] | TechFeature[]
  columns?: number
  gap?: string
  animationDelay?: number
}
