// components/ContactForm.tsx
'use client';

import { useState } from 'react';
import { useForm } from '@formspree/react';

export default function ContactForm() {
  const [state, formspreeSubmit] = useForm(process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || 'xgvpgzny');
  const [name, setName] = useState('');
  const [countryCode, setCountryCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!name.trim()) newErrors.name = '请输入姓名';
    if (!countryCode.trim() || !/^[1-9]\d{0,3}$/.test(countryCode)) newErrors.countryCode = '请输入有效国家代码（1-4位数字，且不以0开头）';
    const normalizedPhone = phoneNumber.replace(/\s+/g, '');
    if (!normalizedPhone || !/^\d{6,14}$/.test(normalizedPhone)) newErrors.phoneNumber = '请输入有效电话号码（6-14位数字）';
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = '请输入有效的邮箱地址';
    if (!message.trim()) newErrors.message = '请填写咨询内容';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;
    const form = e.currentTarget as HTMLFormElement;
    await formspreeSubmit(e);
  };

  if (state.succeeded) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800 mb-2">感谢您的咨询</h3>
        <p className="text-green-600">我们已收到您的信息，会尽快与您联系。</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="max-w-lg mx-auto space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 text-left">姓名 *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1 text-left">电话号码 *</label>
        <div className="flex items-center gap-2">
          <span className="px-3 py-2 border border-gray-300 rounded-md bg-gray-50">+</span>
          <input
            type="text"
            id="country-code"
            name="country-code"
            placeholder="国家代码"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            required
            className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="tel"
            id="phone-number"
            name="phone-number"
            placeholder="电话号码"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <p className="text-gray-500 text-xs mt-1 text-left">例如：+1 1234567890 或 +44 1234567890</p>
        {(errors.countryCode || errors.phoneNumber) && (
          <p className="text-red-600 text-sm mt-1">{errors.countryCode || errors.phoneNumber}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 text-left">邮箱地址（可选）</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1 text-left">公司名称（可选）</label>
        <input
          type="text"
          id="company"
          name="company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 text-left">咨询内容 *</label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {state.submitting ? '提交中...' : '提交咨询'}
      </button>

      {state.errors && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-red-600">提交失败，请稍后重试。</p>
        </div>
      )}
    </form>
  );
}