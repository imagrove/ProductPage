'use client';

import React from 'react';
import Image from 'next/image';

export default function About() {
  return (
    <div className="space-y-20">
      {/* Banner Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">关于我们</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            专注于智能硬件展示解决方案，为您的产品创造最佳展示效果
          </p>
        </div>
      </section>

      {/* Company Introduction */}
      <section className="container-fluid">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="fade-in">
              <Image 
                src="https://via.placeholder.com/600x400?text=公司简介" 
                alt="公司简介" 
                width={600} 
                height={400} 
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
            <div className="space-y-6 fade-in">
              <h2 className="text-3xl font-bold text-gray-800">公司简介</h2>
              <p className="text-gray-600 text-lg">
                智能展馆科技有限公司成立于2015年，是一家专注于智能硬件展示解决方案的高新技术企业。我们致力于为客户提供高品质、创新的产品展示系统，帮助企业提升品牌形象和产品价值。
              </p>
              <p className="text-gray-600 text-lg">
                凭借多年的行业经验和技术积累，我们已经为众多知名企业提供了专业的智能展馆解决方案，涵盖展览展示、品牌推广、产品发布等多个领域。
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-primary mb-2">8+</div>
                  <div className="text-gray-600">行业经验</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-primary mb-2">200+</div>
                  <div className="text-gray-600">成功案例</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-primary mb-2">50+</div>
                  <div className="text-gray-600">专业团队</div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg text-center">
                  <div className="text-4xl font-bold text-primary mb-2">98%</div>
                  <div className="text-gray-600">客户满意度</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Vision */}
      <section className="container-fluid bg-gray-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-lg shadow-soft fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">我们的使命</h3>
              <p className="text-gray-600 text-lg">
                通过创新的智能硬件展示技术，为客户创造价值，帮助企业提升品牌影响力和产品竞争力，推动行业的数字化转型。
              </p>
            </div>
            <div className="bg-white p-10 rounded-lg shadow-soft fade-in">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">我们的愿景</h3>
              <p className="text-gray-600 text-lg">
                成为全球领先的智能展馆解决方案提供商，通过持续创新和优质服务，引领行业发展，为客户创造极致的产品展示体验。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="container-fluid">
        <div className="container mx-auto">
          <h2 className="section-title">专业团队</h2>
          <p className="section-subtitle">
            我们拥有一支经验丰富、技术精湛的专业团队，致力于为客户提供最佳的智能展馆解决方案
          </p>
          <div className="grid-responsive">
            <div className="card text-center fade-in">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <Image src="https://via.placeholder.com/300x300?text=CEO" alt="CEO" width={300} height={300} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">张明</h3>
                <p className="text-primary mb-3">创始人 & CEO</p>
                <p className="text-gray-600 mb-4">
                  拥有15年智能硬件行业经验，曾任职于多家知名科技企业，带领团队不断创新发展。
                </p>
              </div>
            </div>
            <div className="card text-center fade-in">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <Image src="https://via.placeholder.com/300x300?text=CTO" alt="CTO" width={300} height={300} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">李婷</h3>
                <p className="text-primary mb-3">首席技术官</p>
                <p className="text-gray-600 mb-4">
                  人工智能博士，10年智能交互技术研发经验，负责公司技术战略和产品研发。
                </p>
              </div>
            </div>
            <div className="card text-center fade-in">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <Image src="https://via.placeholder.com/300x300?text=设计总监" alt="设计总监" width={300} height={300} className="w-full h-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-1">王强</h3>
                <p className="text-primary mb-3">设计总监</p>
                <p className="text-gray-600 mb-4">
                  国际知名设计师，专注于用户体验和交互设计，作品曾获多项国际设计大奖。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="container-fluid bg-gray-100">
        <div className="container mx-auto">
          <h2 className="section-title">合作伙伴</h2>
          <p className="section-subtitle">
            我们与众多知名企业建立了长期稳定的合作关系，共同发展，共创未来
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="bg-white p-6 rounded-lg shadow-soft flex items-center justify-center fade-in">
                <div className="text-gray-400 text-lg font-bold">合作伙伴 {item}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}