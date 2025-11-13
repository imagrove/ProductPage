'use client';

import React, { useState } from 'react';
import Image from 'next/image';
  
function Products() {
  const [activeCategory, setActiveCategory] = useState('all');

  // 产品数据
  const products = [
    {
      id: 1,
      name: '智能展馆多媒体中控系统',
      category: 'control',
      description: '基于ESP32技术的高性能、高可靠的展馆设备集中控制解决方案。',
      features: ['精细设备控制', '独立群组运行', '灵活群组集成', '高性能播放终端'],
      image: 'https://via.placeholder.com/600x400?text=智能+展馆+中控+系统',
    },
    {
      id: 2,
      name: 'ESP32智能控制面板',
      category: 'control',
      description: '采用ESP32芯片的高性能触摸控制面板，支持多设备控制和场景切换。',
      features: ['7英寸高清触摸屏', 'WiFi + BLE双重通信', 'IP65防水防尘', '支持离线运行'],
      image: 'https://via.placeholder.com/600x400?text=ESP32+控制面板',
    },
    {
      id: 3,
      name: '智能投影系统',
      category: 'display',
      description: '支持几何校正和边缘融合的高性能投影系统，适用于各类展览展示场所。',
      features: ['4K超高清分辨率', '自动几何校正', '多机联动控制', '激光光源，寿命长'],
      image: 'https://via.placeholder.com/600x400?text=智能+投影+系统',
    },
    {
      id: 4,
      name: '嵌入式播放终端',
      category: 'terminal',
      description: '基于Linux的高性能嵌入式播放器，内置GPU硬件加速和H5页面渲染功能。',
      features: ['支持4K视频解码', '硬件加速渲染', '7x24小时稳定运行', '远程内容更新'],
      image: 'https://via.placeholder.com/600x400?text=嵌入式+播放+终端',
    },
    {
      id: 5,
      name: '平板控制应用',
      category: 'app',
      description: '专为展览管理人员设计的平板电脑控制应用，支持多展项集中管理。',
      features: ['直观的可视化界面', '多级权限管理', '场景一键切换', '实时监控设备状态'],
      image: 'https://via.placeholder.com/600x400?text=平板+控制+应用',
    },
    {
      id: 6,
      name: '智能设备控制模块',
      category: 'control',
      description: '用于控制各类展览设备的智能模块，支持多种通信协议。',
      features: ['继电器电源控制', 'RS232串口控制', '红外信号发射', 'WiFi远程控制'],
      image: 'https://via.placeholder.com/600x400?text=智能+设备+控制+模块',
    },
  ];

  // 过滤产品
  const filteredProducts = activeCategory === 'all' 
    ? products 
    : products.filter(product => product.category === activeCategory);

  // 打开咨询表单
  const openConsultationForm = () => {
    // 这里可以实现打开咨询表单的逻辑
    alert('咨询表单功能将在后续开发中实现');
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      {/* Banner Section */}
      <header className="bg-gradient-to-r from-[#1a5276] to-[#3498db] text-white py-16 px-4 text-center rounded-lg mb-12">
        <h1 className="text-3xl md:text-4xl font-bold mb-4 font-sans">产品中心</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          探索我们的智能展馆多媒体中控系统产品系列
        </p>
      </header>

      {/* Product Categories */}
      <div className="product-categories flex justify-center flex-wrap gap-4 mb-12">
        <button 
          className={`category-btn px-5 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${activeCategory === 'all' ? 'bg-[#1a5276] text-white border-[#1a5276]' : 'bg-white text-gray-700 border border-gray-300'}`}
          onClick={() => setActiveCategory('all')}
        >
          全部产品
        </button>
        <button 
          className={`category-btn px-5 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${activeCategory === 'control' ? 'bg-[#1a5276] text-white border-[#1a5276]' : 'bg-white text-gray-700 border border-gray-300'}`}
          onClick={() => setActiveCategory('control')}
        >
          控制系统
        </button>
        <button 
          className={`category-btn px-5 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${activeCategory === 'display' ? 'bg-[#1a5276] text-white border-[#1a5276]' : 'bg-white text-gray-700 border border-gray-300'}`}
          onClick={() => setActiveCategory('display')}
        >
          显示设备
        </button>
        <button 
          className={`category-btn px-5 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${activeCategory === 'terminal' ? 'bg-[#1a5276] text-white border-[#1a5276]' : 'bg-white text-gray-700 border border-gray-300'}`}
          onClick={() => setActiveCategory('terminal')}
        >
          播放终端
        </button>
        <button 
          className={`category-btn px-5 py-2 rounded-full text-sm md:text-base transition-all duration-300 ${activeCategory === 'app' ? 'bg-[#1a5276] text-white border-[#1a5276]' : 'bg-white text-gray-700 border border-gray-300'}`}
          onClick={() => setActiveCategory('app')}
        >
          移动应用
        </button>
      </div>

      {/* Products List */}
      <div className="product-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="product-card rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            data-category={product.category}
          >
            <div className="h-56 bg-gray-200 flex items-center justify-center">
              <Image 
                src={product.image} 
                alt={product.name} 
                width={600} 
                height={400} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="product-name text-xl font-bold mb-3 text-[#1a5276]">{product.name}</h3>
              <p className="product-description text-gray-600 mb-4">
                {product.description}
              </p>
              <ul className="product-features mb-6 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#3498db] font-bold mr-2">✓</span>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="product-actions flex gap-3">
                <a 
                  href="#" 
                  className="product-btn btn-primary flex-1 py-2 px-4 bg-gradient-to-r from-[#1a5276] to-[#3498db] text-white rounded-md text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                >
                  查看详情
                </a>
                <button 
                  className="product-btn btn-secondary flex-1 py-2 px-4 bg-gray-100 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition-colors"
                  onClick={openConsultationForm}
                >
                  咨询
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 产品优势 */}
      <section className="mb-16">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-[#1a5276] pb-3 border-b-2 border-[#f4d03f]">产品优势</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="feature-card p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <h4 className="text-xl font-semibold mb-3 text-[#1a5276]">技术领先</h4>
            <p className="text-gray-600">
              基于ESP32技术平台，采用最新的物联网通信技术，确保系统的稳定性和扩展性。
            </p>
          </div>
          <div className="feature-card p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <h4 className="text-xl font-semibold mb-3 text-[#1a5276]">易于部署</h4>
            <p className="text-gray-600">
              模块化设计，即插即用，无需复杂的网络布线，大幅降低施工难度和成本。
            </p>
          </div>
          <div className="feature-card p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300">
            <h4 className="text-xl font-semibold mb-3 text-[#1a5276]">高效管理</h4>
            <p className="text-gray-600">
              集中式管理平台，实时监控设备状态，快速响应异常情况，提高运营效率。
            </p>
          </div>
        </div>
      </section>

      {/* 联系我们 */}
      <section className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#1a5276] pb-3 border-b-2 border-[#f4d03f]">联系我们</h2>
        <p className="text-gray-600 max-w-3xl mx-auto mb-8">
          如果您对我们的产品有任何疑问或需要定制解决方案，请随时联系我们的销售团队。
        </p>
        <button 
          className="consultation-btn bg-gradient-to-r from-[#1a5276] to-[#3498db] text-white px-8 py-3 rounded-full text-lg font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          onClick={openConsultationForm}
        >
          立即咨询
        </button>
      </section>
    </div>
  );
}

export default Products;