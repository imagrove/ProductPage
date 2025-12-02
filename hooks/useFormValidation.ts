import { useState, useCallback } from 'react'
import type { FormValidationHook, FormValidationOptions } from '@/types/hooks'
import type { FormErrors } from '@/types'

export interface FormData {
  projectType?: string
  contactName: string
  contactPhone: string
  projectDesc: string
}

export const useFormValidation = (options?: FormValidationOptions): FormValidationHook => {
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = useCallback((data: Record<string, any>): boolean => {
    const newErrors: Record<string, string> = {}

    // 验证项目类型（选填项，不进行必填验证）
    // 项目类型为选填项，不进行必填验证

    // 验证联系人姓名
    if (!data['contactName']) {
      newErrors['contactName'] = '请输入联系人姓名'
    } else if (data['contactName'].length < 2) {
      newErrors['contactName'] = '姓名至少需要2个字符'
    }

    // 验证联系电话
    if (!data['contactPhone']) {
      newErrors['contactPhone'] = '请输入联系电话'
    } else if (!/^1[3-9]\d{9}$/.test(data['contactPhone'])) {
      newErrors['contactPhone'] = '请输入正确的手机号码'
    }

    // 验证项目描述
    if (!data['projectDesc']) {
      newErrors['projectDesc'] = '请输入项目描述'
    } else if (data['projectDesc'].length < 10) {
      newErrors['projectDesc'] = '项目描述至少需要10个字符'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [])

  const clearErrors = useCallback(() => {
    setErrors({})
  }, [])

  return {
    errors,
    validateForm,
    clearErrors,
  }
}
