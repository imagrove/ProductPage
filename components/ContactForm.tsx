'use client';

import React, { useState } from 'react';
import { customEvent } from '../app/google-analytics';

interface ContactFormProps {
  className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ className = '' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  // 从环境变量获取Formspree表单ID
  const FORMSPREE_FORM_ID = process.env.NEXT_PUBLIC_FORMSPREE_FORM_ID;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    
    // 清除之前的错误状态
    if (submitStatus === 'error') {
      setSubmitStatus('idle');
      setErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // 验证Formspree表单ID是否配置
      if (!FORMSPREE_FORM_ID) {
        throw new Error('表单服务未配置，请稍后再试');
      }
      
      // 使用Formspree提交表单
      const response = await fetch(`https://formspree.io/f/${FORMSPREE_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setSubmitStatus('success');
        
        // 记录表单提交事件到Google Analytics
        customEvent({
          name: 'contact_form_submitted',
          params: {
            subject: formData.subject || '无主题',
            form_location: window.location.pathname,
          }
        });
        
        // 重置表单
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || '提交失败，请稍后重试');
      }
    } catch (error) {
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : '网络错误，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // 添加表单字段验证
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <form onSubmit={handleSubmit} className={className}>
      {submitStatus === 'success' && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-md">
          <p className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            感谢您的留言！我们会尽快与您联系。
          </p>
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-md">
          <p className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errorMessage || '提交失败，请稍后重试。'}
          </p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
            姓名 *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${submitStatus === 'error' && !formData.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}`}
            placeholder="请输入您的姓名"
          />
        </div>
        
        <div>
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            邮箱 *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${submitStatus === 'error' && (!formData.email || !validateEmail(formData.email)) ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}`}
            placeholder="请输入您的邮箱"
          />
          {submitStatus === 'error' && formData.email && !validateEmail(formData.email) && (
            <span className="mt-1 text-sm text-red-600">请输入有效的邮箱地址</span>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <label htmlFor="subject" className="block text-gray-700 font-medium mb-2">
          主题
        </label>
        <input
          type="text"
          id="subject"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all"
          placeholder="请输入留言主题"
        />
      </div>
      
      <div className="mt-6">
        <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
          留言内容 *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className={`w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all resize-none ${submitStatus === 'error' && !formData.message ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'}`}
          placeholder="请输入您的留言内容"
        />
      </div>
      
      <div className="mt-8">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-primary text-white px-8 py-3 rounded-md hover:bg-primary/90 transition-all duration-300 flex items-center justify-center gap-2 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-1 ${isSubmitting ? 'opacity-70 cursor-not-allowed shadow-sm hover:translate-y-0' : ''}`}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              提交中...
            </>
          ) : (
            '提交留言'
          )}
        </button>
      </div>
      
      {/* 表单服务未配置时显示提示 */}
      {!FORMSPREE_FORM_ID && process.env.NODE_ENV === 'development' && (
        <div className="mt-4 text-sm text-gray-500 bg-yellow-50 p-3 rounded-md border border-yellow-200">
          <p>提示：请在环境变量中配置NEXT_PUBLIC_FORMSPREE_FORM_ID以启用表单提交功能。</p>
        </div>
      )}
    </form>
  );
};

export default ContactForm;