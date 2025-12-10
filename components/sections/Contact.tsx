'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useFormValidation, useScrollToSection } from '@/hooks'
import { SuccessMessage } from '../common/SuccessMessage'
import { sendGAEvent, setCustomDimensions, GAEvents } from '@/components/analytics/GoogleAnalytics'
import { MessageIcon, CheckCircleIcon } from '@/components/ui/MinimalIcons'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    projectType: '',
    message: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const { errors, validateForm, clearErrors } = useFormValidation()
  const scrollToSection = useScrollToSection()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    // 特殊处理电话字段，无论name是phone还是tel都更新formData.phone
    if (name === 'phone' || name === 'tel') {
      setFormData(prev => ({
        ...prev,
        phone: value,
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }))
    }

    // 清除对应字段的错误信息
    const errorKey =
      name === 'name'
        ? 'contactName'
        : name === 'phone'
          ? 'contactPhone'
          : name === 'message'
            ? 'projectDesc'
            : name

    if (errors[errorKey as keyof typeof errors]) {
      clearErrors()
    }

    // 追踪表单交互事件
    if (name === 'projectType' && value) {
      sendGAEvent({
        action: GAEvents.CLICK,
        category: 'form_interaction',
        label: 'project_type_selected',
        project_type: value,
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // 表单验证
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors['contactName'] = '请输入您的姓名'
    }

    if (!formData.phone.trim()) {
      newErrors['contactPhone'] = '请输入联系电话'
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone)) {
      newErrors['contactPhone'] = '请输入有效的11位手机号码'
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors['email'] = '请输入有效的邮箱地址'
    }

    if (!formData.projectType) {
      newErrors['projectType'] = '请选择项目类型'
    }

    if (!formData.message.trim()) {
      newErrors['message'] = '请输入您的需求描述'
    }

    const isValid = validateForm({
      contactName: formData.name,
      contactPhone: formData.phone,
      projectDesc: formData.message,
    })

    if (!isValid) {
      // 追踪表单验证失败事件
      sendGAEvent({
        action: GAEvents.FORM_ERROR,
        category: 'form_validation',
        label: 'validation_failed',
        error_fields: Object.keys(errors).join(','),
      })
      return
    }

    setIsSubmitting(true)

    // 追踪表单开始提交事件
    sendGAEvent({
      action: GAEvents.FORM_START,
      category: 'form_submission',
      label: 'contact_form_start',
      project_type: formData.projectType || '未选择',
    })

    // 根据环境变量判断提交行为
    const isProduction = process.env.NEXT_PUBLIC_ENV === 'pro'

    if (isProduction) {
      // 生产环境：实际提交到Formspree
      try {
        // 更新隐藏字段的值
        const form = e.target as HTMLFormElement
        const subjectField = form.querySelector('input[name="_subject"]') as HTMLInputElement
        const replyToField = form.querySelector('input[name="_replyto"]') as HTMLInputElement
        
        if (subjectField) subjectField.value = `多媒体播控系统咨询 - ${formData.name}`
        if (replyToField) replyToField.value = formData.email || formData.phone

        // 让表单正常提交
        form.submit()
        
        // 提交成功后重置表单状态
        setTimeout(() => {
          setSubmitStatus('success')
          setShowSuccessMessage(true)
          
          // 追踪表单提交成功事件
          sendGAEvent({
            action: GAEvents.FORM_SUBMIT,
            category: 'form_submission',
            label: 'contact_form_success',
            project_type: formData.projectType || '未选择',
            lead_value: 1,
          })
          
          // 追踪转化事件
          sendGAEvent({
            action: GAEvents.LEAD_GENERATED,
            category: 'conversion',
            label: 'lead_generated',
            value: 1,
          })
          
          // 设置自定义维度
          setCustomDimensions({
            projectType: formData.projectType || '未选择',
            formSubmitted: true,
            userType: 'lead',
          })
          
          setFormData({
            name: '',
            phone: '',
            email: '',
            projectType: '',
            message: '',
          })
          setIsSubmitting(false)
        }, 1000)
        
      } catch (error) {
        setSubmitStatus('error')
        
        // 追踪表单提交失败事件
        sendGAEvent({
          action: GAEvents.FORM_ERROR,
          category: 'form_submission',
          label: 'contact_form_error',
          error_message: error instanceof Error ? error.message : 'Unknown error',
        })
        
        setIsSubmitting(false)
      }
    } else {
      // 开发环境：只打印日志，不实际提交
      console.log('开发环境表单提交日志（不实际提交到Formspree）:')
      console.log('表单数据:', {
        姓名: formData.name,
        电话: formData.phone,
        邮箱: formData.email,
        项目类型: formData.projectType,
        需求描述: formData.message,
      })
      console.log('邮件主题:', `多媒体播控系统咨询 - ${formData.name}`)
      console.log('电话:', formData.phone)
      // 开发环境：打印表单数据
      if (process.env.NODE_ENV === 'development') {
        console.log('邮箱:', formData.email)
        console.log('手机号:', formData.phone)
        console.log('姓名:', formData.name)
        console.log('项目类型:', formData.projectType)
        console.log('需求描述:', formData.message)
      }
      console.log('当前环境:', process.env.NEXT_PUBLIC_ENV || '未设置')
      
      // 模拟提交成功
      setTimeout(() => {
        setSubmitStatus('success')
        setShowSuccessMessage(true)
        
        // 开发环境也追踪事件（仅日志）
        sendGAEvent({
          action: GAEvents.FORM_SUBMIT,
          category: 'form_submission',
          label: 'contact_form_success_dev',
          project_type: formData.projectType || '未选择',
          lead_value: 1,
        })
        
        setFormData({
          name: '',
          phone: '',
          email: '',
          projectType: '',
          message: '',
        })
        setIsSubmitting(false)
        console.log('开发环境：表单提交模拟成功')
      }, 1000)
    }
  }

  // 项目类型选项
  const projectTypes = [
    '数字展馆/展厅',
    '企业展厅',
    '博物馆/美术馆',
    '商业中心',
    '教育机构',
    '游乐场',
    '其他',
  ]

  // 联系信息
  const contactInfo = [
    {
      icon: <MessageIcon className='h-6 w-6' color='white' />,
      title: '在线客服',
      value: '微信扫码咨询',
      description: '专业工程师在线解答',
    },
  ]

  return (
    <section id='contact' className='py-28 lg:py-36 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
      <div className='container'>
        {/* 章节标题 */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className='mb-24 text-center'
        >
          <h2 className='mb-6 text-center text-4xl font-bold text-white sm:text-5xl lg:text-6xl'>
            联系我们
          </h2>
        </motion.div>

        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16'>
          {/* 联系表单 */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: '-20px' }}
            className='rounded-xl border border-gray-200 bg-white p-8 shadow-md lg:p-10'
            whileHover={{ scale: 1.01 }}
          >
            <h3 className='mb-8 text-center text-3xl font-bold text-gray-800'>在线咨询表单</h3>

            {submitStatus === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className='py-12 text-center'
              >
                <div className='mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-green-100'>
                  <CheckCircleIcon className='h-10 w-10 text-primary-600' />
                </div>
                <h4 className='mb-2 text-xl font-semibold text-gray-800'>提交成功！</h4>
                <p className='mb-6 text-gray-600'>
                  我们已收到您的咨询信息，专业工程师将在24小时内与您联系。
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className='rounded-lg border border-primary-200 bg-white px-12 py-3 font-medium text-primary-600 shadow-md transition-all duration-300 hover:border-primary-300 hover:bg-primary-50 hover:shadow-lg hover:scale-102'
                >
                  继续咨询
                </button>
              </motion.div>
            ) : (
              <form 
                action='https://formspree.io/f/xgvpgzny' 
                method='POST'
                onSubmit={handleSubmit} 
                className='space-y-8'
              >
                <div className='grid grid-cols-1 gap-8 md:grid-cols-2'>
                  <div>
                    <label className='mb-2 block text-sm font-medium text-gray-600 mt-2'>姓名 <span className='text-red-500'>*</span></label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className={`h-12 w-full rounded-lg border px-4 text-base transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                        errors['contactName'] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder='请输入您的姓名'
                    />
                    {errors['contactName'] && (
                      <p className='mt-1 text-sm text-red-500'>{errors['contactName']}</p>
                    )}
                  </div>

                  <div>
                  <label className='mb-2 block text-sm font-medium text-gray-600 mt-2'>
                    联系电话 <span className='text-red-500'>*</span>
                  </label>
                  <input
                    type='tel'
                    name='phone'
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    pattern='[0-9]{11}'
                    title='请输入11位手机号码'
                    className={`h-12 w-full rounded-lg border px-4 text-base transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors['contactPhone'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder='请输入11位手机号码'
                  />
                  {errors['contactPhone'] && (
                    <p className='mt-1 text-sm text-red-500'>{errors['contactPhone']}</p>
                  )}
                </div>
                </div>

                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-600 mt-2'>邮箱</label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`h-12 w-full rounded-lg border px-4 text-base transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors['email'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder='请输入您的邮箱地址（可选）'
                  />
                  {errors['email'] && (
                    <p className='mt-1 text-sm text-red-500'>{errors['email']}</p>
                  )}
                </div>

                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-600 mt-2'>项目类型</label>
                  <select
                    name='projectType'
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className={`h-12 w-full rounded-lg border px-4 text-base transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors['projectType'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value=''>请选择项目类型</option>
                    {projectTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors['projectType'] && (
                    <p className='mt-1 text-sm text-red-500'>{errors['projectType']}</p>
                  )}
                </div>

                <div>
                  <label className='mb-2 block text-sm font-medium text-gray-600 mt-2'>需求描述 <span className='text-red-500'>*</span></label>
                  <textarea
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className={`min-h-[150px] w-full resize-none rounded-lg border px-4 py-3 text-base transition-all duration-200 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                      errors['projectDesc'] ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder='请详细描述您的项目需求、设备数量、控制场景等信息...'
                    required
                  />
                  {errors['projectDesc'] && (
                    <p className='mt-1 text-sm text-red-500'>{errors['projectDesc']}</p>
                  )}
                </div>

                {/* 隐藏字段用于Formspree配置 */}
                <input type='hidden' name='_subject' value={`多媒体播控系统咨询 - ${formData.name}`} />
                <input type='hidden' name='_replyto' value={formData.email || formData.phone} />
                <input type='hidden' name='_next' value='https://yourdomain.com/thank-you' />
                
                {/* 防骚扰设置 */}
                <input type='hidden' name='_gotcha' style={{display: 'none'}} />
                <input type='text' name='_honeypot' style={{display: 'none'}} tabIndex={-1} autoComplete='off' />
                <input type='hidden' name='_format' value='plain' />
                <input type='hidden' name='_language' value='zh' />

                <motion.button
                  type='submit'
                  disabled={isSubmitting}
                  className={`w-full rounded-lg py-3 text-base font-semibold text-white shadow-md transition-all duration-300 ${
                    isSubmitting
                      ? 'cursor-not-allowed bg-gray-600'
                      : 'bg-primary-600 hover:bg-primary-500 hover:shadow-lg'
                  }`}
                  whileHover={isSubmitting ? {} : { scale: 1.02 }}
                  whileTap={isSubmitting ? {} : { scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className='flex items-center justify-center'>
                      <div className='mr-3 h-6 w-6 animate-spin rounded-full border-2 border-white border-t-transparent'></div>
                      提交中...
                    </div>
                  ) : (
                    '立即咨询'
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>

          {/* 联系信息 */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className='space-y-8'
          >
            {/* 微信二维码 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className='rounded-2xl border border-gray-100 bg-white p-8 text-center shadow-lg'
            >
              <h4 className='mb-4 font-semibold text-gray-900'>微信扫码咨询</h4>

              {/* 微信二维码图片 */}
              <div className='mx-auto mb-4 flex h-40 w-40 items-center justify-center rounded-lg bg-white'>
                <Image
                  src="/images/qywx-qrcode.jpg"
                  alt="企业微信二维码"
                  width={160}
                  height={160}
                  className="rounded-lg object-cover"
                />
              </div>

              <p className='text-sm text-gray-600'>扫码对接技术专家，免费获取 1V1 项目评估与落地路径规划</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 成功消息提示 */}
      {showSuccessMessage && (
        <SuccessMessage
          message='提交成功！'
          subMessage='我们将在24小时内与您联系，为您提供定制化技术方案。'
          duration={3000}
          onClose={() => setShowSuccessMessage(false)}
        />
      )}
    </section>
  )
}
