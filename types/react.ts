// React组件相关类型定义

import { ReactNode } from 'react'

export interface ChildrenProps {
  children: ReactNode
}

export interface ClassNameProps {
  className?: string
}

export interface BaseComponentProps extends ChildrenProps, ClassNameProps {}

// 按钮组件类型
export interface ButtonProps extends ClassNameProps {
  onClick?: () => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

// 输入框组件类型
export interface InputProps extends ClassNameProps {
  type?: 'text' | 'email' | 'tel' | 'password' | 'number'
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  required?: boolean
  disabled?: boolean
  error?: string
}

// 表单组件类型
export interface FormProps extends ClassNameProps {
  onSubmit?: (data: Record<string, any>) => void
  onReset?: () => void
}

// 模态框组件类型
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean
  onClose: () => void
  title?: string
}

// 卡片组件类型
export interface CardProps extends BaseComponentProps {
  title?: string
  subtitle?: string
  image?: string
}

// 导航组件类型
export interface NavigationItem {
  label: string
  href: string
  icon?: string
}

export interface NavigationProps extends ClassNameProps {
  items: NavigationItem[]
  activeItem?: string
  onItemClick?: (item: NavigationItem) => void
}

// 分页组件类型
export interface PaginationProps extends ClassNameProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

// 加载状态组件类型
export interface LoadingProps extends ClassNameProps {
  size?: 'sm' | 'md' | 'lg'
  type?: 'spinner' | 'dots' | 'skeleton'
}

// 错误边界组件类型
export interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export interface ErrorBoundaryProps extends ChildrenProps {
  fallback?: ReactNode
}
