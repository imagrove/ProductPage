'use client';

import React from 'react';
import ContactForm from '../../components/ContactForm';

export default function Contact() {
  return (
    <div className="container max-w-1200 mx-auto px-5 py-0 my-0 bg-white shadow-[0_0_20px_rgba(0,0,0,0.1)] min-h-screen flex flex-col">
      {/* Header Section */}
      <header className="bg-gradient-to-r from-[#1a5276] to-[#3498db] text-white text-center py-[60px] px-5 mb-8 rounded-lg">
        <h1 className="text-[2.8rem] font-bold mb-4">联系我们</h1>
        <p className="text-xl opacity-90 max-w-2xl mx-auto">
          如果您对我们的产品和服务有任何疑问，请随时与我们联系
        </p>
      </header>

      <div className="content flex-1 py-8">

      {/* Contact Info and Form */}
      <div className="contact-container grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
            {/* Contact Information */}
            <div className="contact-info bg-[#f9f9f9] p-8 rounded-lg shadow-sm fade-in">
              <h3 className="text-2xl font-bold text-[#1a5276] mb-6">联系方式</h3>
              <p className="mb-6 text-gray-600">
                感谢您对我们的关注。无论您是需要产品咨询、技术支持还是商务合作，我们的团队都会为您提供专业、高效的服务。
              </p>
              
              <div className="contact-details">
                <div className="contact-item flex items-start gap-4">
                  <div className="contact-icon bg-gradient-to-r from-[#1a5276] to-[#3498db] w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                    🏢
                  </div>
                  <div className="contact-content">
                    <h4 className="font-semibold text-lg mb-1 text-[#1a5276]">公司地址</h4>
                    <p className="text-gray-600">北京市海淀区中关村科技园区8号楼</p>
                  </div>
                </div>
                
                <div className="contact-item flex items-start gap-4">
                  <div className="contact-icon bg-gradient-to-r from-[#1a5276] to-[#3498db] w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                    📞
                  </div>
                  <div className="contact-content">
                    <h4 className="font-semibold text-lg mb-1 text-[#1a5276]">电话咨询</h4>
                    <p className="text-gray-600">400-123-4567<br/>工作时间：周一至周五 9:00-18:00</p>
                  </div>
                </div>
                
                <div className="contact-item flex items-start gap-4">
                  <div className="contact-icon bg-gradient-to-r from-[#1a5276] to-[#3498db] w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-white">
                    ✉️
                  </div>
                  <div className="contact-content">
                    <h4 className="font-semibold text-lg mb-1 text-[#1a5276]">电子邮箱</h4>
                    <p className="text-gray-600">sales@example.com (销售咨询)<br/>support@example.com (技术支持)</p>
                  </div>
                </div>
              </div>
              
              {/* Social Media */}
              <div className="social-contact mt-8">
                <h4 className="font-semibold text-lg mb-4 text-[#1a5276]">关注我们</h4>
                <div className="social-links flex gap-4">
                  <a href="#" className="w-11 h-11 bg-gradient-to-r from-[#1a5276] to-[#3498db] rounded-full flex items-center justify-center text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    📱
                  </a>
                  <a href="#" className="w-11 h-11 bg-gradient-to-r from-[#1a5276] to-[#3498db] rounded-full flex items-center justify-center text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    🔹
                  </a>
                  <a href="#" className="w-11 h-11 bg-gradient-to-r from-[#1a5276] to-[#3498db] rounded-full flex items-center justify-center text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    💼
                  </a>
                  <a href="#" className="w-11 h-11 bg-gradient-to-r from-[#1a5276] to-[#3498db] rounded-full flex items-center justify-center text-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                    ▶️
                  </a>
                </div>
              </div>
              
              {/* Map */}
              <div className="map-container mt-8 rounded-lg overflow-hidden shadow-sm">
                <h4 className="font-semibold text-lg mb-4 text-[#1a5276]">地图位置</h4>
                <div className="map-placeholder w-full h-[250px] bg-gray-200">
                  <div className="w-full h-full flex items-center justify-center text-gray-500 p-4 text-center">
                    <p>地图加载中...<br /><br />实际使用时，这里将显示公司的地理位置地图。<br />北京市海淀区中关村科技园区8号楼</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="contact-form bg-white p-8 rounded-lg shadow-md fade-in">
              <h2 className="text-2xl font-bold text-[#1a5276] mb-6">联系我们</h2>
              <ContactForm />
            </div>
          </div>

      {/* FAQ Section */}
      <section className="my-12">
        <h2 className="text-2xl font-bold text-[#1a5276] mb-8 border-b-2 border-[#f4d03f] pb-2 inline-block">常见问题</h2>
        <div className="faq-container">
          <div className="faq-item mb-6">
            <h3 className="text-xl font-semibold mb-3 text-[#3498db]">如何获取产品报价？</h3>
            <p className="text-gray-600">
              您可以通过联系表单提交需求，或者直接拨打我们的销售热线400-123-4567，我们的销售团队会根据您的具体需求提供详细报价。
            </p>
          </div>
          
          <div className="faq-item mb-6">
            <h3 className="text-xl font-semibold mb-3 text-[#3498db]">产品支持哪些地区的服务？</h3>
            <p className="text-gray-600">
              我们的服务覆盖全国各地区，同时也支持海外项目的实施和维护。具体服务内容可以根据项目需求进行定制。
            </p>
          </div>
          
          <div className="faq-item mb-6">
            <h3 className="text-xl font-semibold mb-3 text-[#3498db]">售后服务包含哪些内容？</h3>
            <p className="text-gray-600">
              我们提供7×24小时技术支持热线、远程协助、定期维护保养、系统升级服务等全方位的售后支持，确保系统稳定运行。
            </p>
          </div>
          
          <div className="faq-item mb-6">
            <h3 className="text-xl font-semibold mb-3 text-[#3498db]">项目实施周期是多久？</h3>
            <p className="text-gray-600">
              项目实施周期根据项目规模和复杂程度而定，一般来说，小型项目1-2周，中型项目1-2个月，大型项目2-6个月。我们会在项目开始前提供详细的时间规划。
            </p>
          </div>
        </div>
      </section>
      
      </div>
    </div>
  );
}