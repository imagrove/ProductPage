'use client';

import React from 'react';
import ContactForm from '../../components/ContactForm';

export default function Contact() {
  return (
    <div className="space-y-16">
      {/* Banner Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">联系我们</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            无论您有任何问题或需求，都可以通过以下方式联系我们
          </p>
        </div>
      </section>

      {/* Contact Info and Form */}
      <section className="container-fluid">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="fade-in">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">联系方式</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">电话</h3>
                    <p className="text-gray-600">400-123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">邮箱</h3>
                    <p className="text-gray-600">contact@smart-exhibition.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">地址</h3>
                    <p className="text-gray-600">上海市浦东新区科技园区88号智能大厦15层</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">工作时间</h3>
                    <p className="text-gray-600">周一至周五: 9:00 - 18:00
                    周六: 10:00 - 16:00
                    周日: 休息</p>
                  </div>
                </div>
              </div>
              
              {/* Map */}
              <div className="mt-12">
                <h3 className="font-semibold text-lg mb-4">我们的位置</h3>
                <div className="h-64 bg-gray-200 rounded-lg overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    地图将在这里显示
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg fade-in">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">发送留言</h2>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="container-fluid bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="section-title">关注我们</h2>
          <p className="section-subtitle">
            关注我们的社交媒体账号，获取最新产品和公司动态
          </p>
          <div className="flex justify-center gap-8 mt-8">
            {['facebook', 'twitter', 'instagram', 'linkedin', 'youtube'].map((social) => (
                <a href="#" key={social} className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors fade-in">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </a>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="container-fluid bg-primary text-white">
        <div className="container mx-auto text-center py-16">
          <h2 className="text-3xl font-bold mb-6">订阅我们的新闻通讯</h2>
          <p className="text-xl opacity-90 max-w-2xl mx-auto mb-8">
            订阅我们的新闻通讯，获取最新产品和服务信息
          </p>
          <div className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="您的邮箱地址"
              className="px-4 py-3 bg-white/20 text-white placeholder-white/70 rounded-l-md focus:outline-none focus:ring-2 focus:ring-white flex-grow w-full"
            />
            <button className="bg-white text-primary px-6 py-3 rounded-r-md hover:bg-white/90 transition-colors">
              订阅
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}