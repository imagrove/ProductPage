'use client';

import React from 'react';
import Image from 'next/image';
import { useSnipcart } from '../snipcart-config';
  
function Products() {
  const { addToCart } = useSnipcart();

  // 产品数据
  const products = [
    {
      id: 1,
      name: '智能互动展示屏',
      price: 19999,
      description: '高清触控显示屏，支持多点触控，提供沉浸式互动体验。',
      image: 'https://via.placeholder.com/400x300?text=智能展示屏',
    },
    {
      id: 2,
      name: 'AR增强现实展示柜',
      price: 29999,
      description: '结合AR技术，让产品展示更加生动立体，提升用户体验。',
      image: 'https://via.placeholder.com/400x300?text=AR展示柜',
    },
    {
      id: 3,
      name: '360°互动投影系统',
      price: 39999,
      description: '360度全景投影，全方位展示产品细节，创造震撼视觉效果。',
      image: 'https://via.placeholder.com/400x300?text=互动投影',
    },
    {
      id: 4,
      name: '智能语音导览系统',
      price: 15999,
      description: '基于AI的智能语音导览系统，提供个性化的产品解说服务。',
      image: 'https://via.placeholder.com/400x300?text=语音导览',
    },
    {
      id: 5,
      name: '数字签名墙',
      price: 25999,
      description: '交互式数字签名墙，支持多人同时签名，适合展会活动使用。',
      image: 'https://via.placeholder.com/400x300?text=数字签名墙',
    },
    {
      id: 6,
      name: 'VR虚拟展厅解决方案',
      price: 49999,
      description: '完整的VR虚拟展厅解决方案，让产品展示不受空间限制。',
      image: 'https://via.placeholder.com/400x300?text=VR展厅',
    },
  ];

  return (
    <div className="space-y-16">
      {/* Banner Section */}
      <section className="bg-gradient-primary text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">产品中心</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            探索我们的智能展馆解决方案，为您的产品创造最佳展示效果
          </p>
        </div>
      </section>

      {/* Products List */}
      <section className="container-fluid">
        <div className="container mx-auto">
          <div className="grid-responsive">
            {products.map((product) => (
              <div key={product.id} className="card fade-in">
                <div className="h-64 bg-gray-200 flex items-center justify-center">
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    width={400} 
                    height={300} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-primary font-bold text-xl">¥{product.price}</span>
                    <button 
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                      onClick={() => addToCart({
                        id: product.id.toString(),
                        name: product.name,
                        price: product.price,
                        description: product.description,
                        image: product.image
                      })}
                    >
                      添加到购物车
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="container-fluid bg-gray-100">
        <div className="container mx-auto">
          <h2 className="section-title">产品分类</h2>
          <p className="section-subtitle">
            我们提供多种类型的智能展馆解决方案，满足不同场景的需求
          </p>
          <div className="grid-responsive">
            <div className="card p-8 text-center fade-in">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">触控交互系列</h3>
              <p className="text-gray-600 mb-6">
                包括智能触控屏、互动茶几等多种触控交互产品，提供流畅的用户体验。
              </p>
              <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                了解更多
              </button>
            </div>
            <div className="card p-8 text-center fade-in">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">AR/VR体验系列</h3>
              <p className="text-gray-600 mb-6">
                结合增强现实和虚拟现实技术，创造沉浸式的产品展示体验。
              </p>
              <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                了解更多
              </button>
            </div>
            <div className="card p-8 text-center fade-in">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-4">投影展示系列</h3>
              <p className="text-gray-600 mb-6">
                包括360度投影、互动投影等多种投影技术，创造震撼的视觉效果。
              </p>
              <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors">
                了解更多
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-fluid">
        <div className="container mx-auto">
          <h2 className="section-title">常见问题</h2>
          <p className="section-subtitle">
            关于我们产品的常见问题解答，帮助您更好地了解我们的解决方案
          </p>
          <div className="max-w-3xl mx-auto space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="border border-gray-200 rounded-lg overflow-hidden fade-in">
                <button className="w-full text-left px-6 py-4 bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center">
                  <span className="font-semibold text-lg">问题 {item}：如何选择适合我的智能展馆解决方案？</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="px-6 py-4 bg-white">
                  <p className="text-gray-600">
                    选择智能展馆解决方案需要考虑多个因素，包括展示空间大小、预算、目标受众、展示内容类型等。我们的专业团队会根据您的具体需求，为您提供定制化的解决方案。
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Products;