#!/usr/bin/env tsx

/**
 * TypeScript 类型检查脚本
 * 用于验证所有 hooks 的类型定义是否正确
 */

import { useFormValidation } from '@/hooks/useFormValidation'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { useScrollToSection } from '@/hooks/useScrollToSection'
import { useMobileMenu } from '@/hooks/useMobileMenu'
import { useScroll } from '@/hooks/useScroll'
import { useScrollToTop } from '@/hooks/useScrollToTop'
import { useScrollDetection } from '@/hooks/useScrollDetection'

import type {
  FormValidationHook,
  ScrollAnimationHook,
  ScrollToSectionHook,
  MobileMenuHook,
  ScrollHook,
  ScrollToTopHook,
  ScrollDetectionHook,
} from '@/types/hooks'

// 测试用例函数 - 这些函数仅用于类型检查，不会实际执行
const testUseFormValidation = (): FormValidationHook => {
  return useFormValidation({
    initialValues: {
      projectType: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      companyName: '',
      projectDescription: '',
      budgetRange: '',
      timeline: '',
      additionalInfo: '',
    },
  })
}

const testUseScrollAnimation = (): ScrollAnimationHook => {
  return useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '0px',
  })
}

const testUseScrollToSection = (): ScrollToSectionHook => {
  return useScrollToSection()
}

const testUseMobileMenu = (): MobileMenuHook => {
  return useMobileMenu({
    breakpoint: 768,
    menuSelector: '.nav-menu',
    toggleSelector: '.mobile-menu-toggle',
  })
}

const testUseScroll = (): ScrollHook => {
  return useScroll({
    throttle: 100,
    onScroll: (scrollY: number, scrollX: number, direction: 'up' | 'down' | null) => {
      console.log('Scrolling:', { scrollY, scrollX, direction })
    },
  })
}

const testUseScrollToTop = (): ScrollToTopHook => {
  return useScrollToTop({
    threshold: 100,
    behavior: 'smooth',
  })
}

const testUseScrollDetection = (): ScrollDetectionHook => {
  return useScrollDetection(['section1', 'section2'], {
    threshold: 0.5,
    offset: 0,
  })
}

// 类型兼容性测试
const testTypeCompatibility = () => {
  console.log('🔍 开始类型兼容性检查...')

  // 测试返回值类型
  const formValidation = testUseFormValidation()
  const scrollAnimation = testUseScrollAnimation()
  const scrollToSection = testUseScrollToSection()
  const mobileMenu = testUseMobileMenu()
  const scroll = testUseScroll()
  const scrollToTop = testUseScrollToTop()
  const scrollDetection = testUseScrollDetection()

  // 验证每个hook的返回类型
  const tests = [
    {
      name: 'useFormValidation',
      hook: formValidation,
      requiredProps: ['validateForm', 'clearErrors', 'errors'],
    },
    {
      name: 'useScrollAnimation',
      hook: scrollAnimation,
      requiredProps: ['ref', 'isInView', 'progress'],
    },
    {
      name: 'useScrollToSection',
      hook: scrollToSection,
      requiredProps: ['scrollToSection', 'isScrolling'],
    },
    {
      name: 'useMobileMenu',
      hook: mobileMenu,
      requiredProps: ['isOpen', 'toggleMenu', 'closeMenu', 'openMenu'],
    },
    {
      name: 'useScroll',
      hook: scroll,
      requiredProps: ['scrollY', 'scrollX', 'scrollDirection', 'isScrolling'],
    },
    { name: 'useScrollToTop', hook: scrollToTop, requiredProps: ['scrollToTop', 'isVisible'] },
    {
      name: 'useScrollDetection',
      hook: scrollDetection,
      requiredProps: ['activeSection', 'sectionProgress', 'isSectionInView'],
    },
  ]

  let passed = 0
  let failed = 0

  tests.forEach(test => {
    const hasAllProps = test.requiredProps.every(prop => prop in test.hook)

    if (hasAllProps) {
      console.log(`✅ ${test.name} - 类型检查通过`)
      passed++
    } else {
      console.log(`❌ ${test.name} - 类型检查失败`)
      failed++
    }
  })

  console.log('\n📊 类型检查结果:')
  console.log(`✅ 通过: ${passed}`)
  console.log(`❌ 失败: ${failed}`)
  console.log(`📈 成功率: ${((passed / tests.length) * 100).toFixed(1)}%`)

  if (failed === 0) {
    console.log('\n🎉 所有 hooks 类型检查通过!')
    process.exit(0)
  } else {
    console.log('\n⚠️  存在类型检查失败的项目')
    process.exit(1)
  }
}

// 运行测试
if (require.main === module) {
  testTypeCompatibility()
}

export { testTypeCompatibility }
