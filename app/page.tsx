'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTina } from 'tinacms/dist/react';

// 为window对象扩展TinaCMS类型
declare global {
  interface Window {
    tinacms?: any;
  }
}

// 简单的TinaCMS初始化逻辑
const initializeTinaCMS = () => {
  if (typeof window !== 'undefined' && !window.tinacms) {
    // 正确初始化TinaCMS，使用符合TypeScript类型的配置
    import('tinacms').then(({ TinaCMS }) => {
      try {
        // 创建基本的TinaCMS实例，只使用clientId
        const cms = new TinaCMS({
          clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID || '',
        });
        
        // 尝试配置媒体存储（如果API支持）
        if (typeof cms.registerMediaStore === 'function') {
          try {
            // 尝试注册媒体存储
            cms.registerMediaStore({
              name: 'tina',
              mediaRoot: 'public/assets',
              publicFolder: 'public',
            });
          } catch (mediaError) {
            console.warn('无法注册媒体存储:', mediaError);
          }
        }
        
        // 尝试设置token（如果API支持）
        if (process.env.TINA_TOKEN) {
          try {
            if (cms.api && typeof cms.api.setToken === 'function') {
              cms.api.setToken(process.env.TINA_TOKEN);
            }
          } catch (tokenError) {
            console.warn('无法设置token:', tokenError);
          }
        }
        
        // 将cms实例挂载到window对象
        window.tinacms = cms;
        
        console.log('TinaCMS 初始化成功');
      } catch (initError) {
        console.error('TinaCMS 初始化失败:', initError);
        
        // 降级方案：如果初始化失败，提供基本功能
        window.tinacms = {
          enable: () => {
            console.log('TinaCMS编辑功能测试');
            // 这是开发环境下的模拟功能，完整的内容编辑功能请通过/admin页面访问
            alert('编辑功能演示已触发。这是开发环境下的模拟功能，完整的内容编辑功能请通过 http://localhost:3000/admin 页面访问，然后点击"内容预览（编辑模式）"按钮。');
          },
        };
      }
    }).catch(error => {
      console.error('TinaCMS模块加载失败:', error);
      
      // 降级方案：如果模块加载失败，提供基本功能
      window.tinacms = {
        enable: () => {
          console.log('TinaCMS编辑功能测试');
          alert('编辑功能演示已触发。这是开发环境下的模拟功能，完整的内容编辑功能请通过 http://localhost:3000/admin 页面访问，然后点击"内容预览（编辑模式）"按钮。');
        },
      };
    });
  }
};

import './globals.css';

// 首页内容接口定义
interface Feature {
  title: string;
  content: string;
}

interface HomeData {
  title: string;
  overview: string;
  architecture: string;
  features: Feature[];
  techFeatures: Feature[];
}

const HomeContent = () => {
  const [showModal, setShowModal] = useState(false);
  
  // 页面加载时初始化TinaCMS
  useEffect(() => {
    // 立即开始初始化TinaCMS，不要等待用户点击编辑按钮
    console.log('页面加载中，开始初始化TinaCMS...');
    initializeTinaCMS();
    
    // 如果是编辑模式，确保TinaCMS已准备好
    if (typeof window !== 'undefined') {
      const isEditMode = new URLSearchParams(window.location.search).has('edit');
      if (isEditMode) {
        console.log('检测到编辑模式，确保TinaCMS初始化完成');
        // 等待一段时间确保TinaCMS初始化完成
        setTimeout(() => {
          if (!window.tinacms) {
            console.warn('编辑模式下TinaCMS初始化延迟，再次尝试初始化');
            initializeTinaCMS();
          }
        }, 1000);
      }
    }
  }, []);
  
  // 打开咨询表单
  const openConsultationForm = () => {
    setShowModal(true);
    document.body.style.overflow = 'hidden';
  };
  
  // 关闭咨询表单
  const closeConsultationForm = () => {
    setShowModal(false);
    document.body.style.overflow = 'auto';
  };
  
  // 表单提交处理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    
    // 获取表单数据
    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      countryCode: (form.elements.namedItem('country-code') as HTMLInputElement).value,
      phoneNumber: (form.elements.namedItem('phone-number') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    // 简单的表单验证
    if (!formData.name || !formData.phoneNumber || !formData.message) {
      alert('请填写所有必填字段（姓名、电话和咨询内容）');
      return;
    }

    // 国家代码验证
    const countryCodeRegex = /^[1-9]\d{0,3}$/;
    if (!countryCodeRegex.test(formData.countryCode)) {
      alert('请输入有效的国家代码，例如：1、44、86 等');
      return;
    }

    // 电话号码验证
    const phoneNumberRegex = /^\d{6,14}$/;
    if (!phoneNumberRegex.test(formData.phoneNumber.replace(/\s+/g, ''))) {
      alert('请输入有效的电话号码（6-14位数字）');
      return;
    }

    // 邮箱验证（如果填写了邮箱）
    if (formData.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('请输入有效的邮箱地址');
        return;
      }
    }

    // 显示成功消息
    alert('感谢您的咨询！我们会尽快与您联系。');
    form.reset();
    closeConsultationForm();
  };

  // 检测是否处于编辑模式
  const isEditMode = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('edit');

  // 使用TinaCMS获取首页内容
  const tinaData = useTina({
    query: `query {
      getHomeDocument(relativePath: "index.mdx") {
        data {
          title
          overview
          architecture
          features {
            title
            content
          }
          techFeatures {
            title
            content
          }
        }
      }
    }`,
    variables: {},
    data: {
      getHomeDocument: {
        data: {
          title: '智能展馆多媒体中控系统',
          overview: '',
          architecture: '',
          features: [],
          techFeatures: []
        }
      }
    }
  });

  // 如果处于编辑模式，添加编辑按钮到页面
  React.useEffect(() => {
    if (isEditMode && typeof window !== 'undefined') {
      // 创建编辑按钮
      const editButton = document.createElement('button');
      editButton.innerText = '编辑内容';
      editButton.style.position = 'fixed';
      editButton.style.bottom = '20px';
      editButton.style.right = '20px';
      editButton.style.zIndex = '9999';
      editButton.style.padding = '10px 20px';
      editButton.style.backgroundColor = '#3b82f6';
      editButton.style.color = 'white';
      editButton.style.border = 'none';
      editButton.style.borderRadius = '5px';
      editButton.style.cursor = 'pointer';
      editButton.style.fontSize = '16px';
      editButton.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
      
      // 点击按钮时初始化并启用TinaCMS编辑器
      editButton.onclick = async () => {
        try {
          // 首先确保TinaCMS已经初始化
          if (!window.tinacms) {
            initializeTinaCMS();
            // 等待TinaCMS初始化完成
            await new Promise(resolve => setTimeout(resolve, 500));
          }
          
          // 检查TinaCMS实例是否存在并且有enable方法
          if (window.tinacms) {
            if (typeof window.tinacms.enable === 'function') {
              // 调用enable方法启用编辑器
              window.tinacms.enable();
            } else if (window.tinacms.mediaStore && typeof window.tinacms.mediaStore.enable === 'function') {
              // 尝试使用mediaStore的enable方法
              window.tinacms.mediaStore.enable();
            } else {
              // 如果都没有enable方法，尝试使用其他方式激活编辑模式
              console.log('尝试激活编辑模式...');
              
              // 检查是否有TinaCMS相关的编辑器组件可以激活
              const editorElements = document.querySelectorAll('[data-tina-editor]');
              if (editorElements.length > 0) {
                editorElements.forEach(el => {
                  el.setAttribute('data-tina-active', 'true');
                });
                alert('编辑模式已激活！请检查页面内容是否可编辑。');
              } else {
                alert('编辑模式已激活，请尝试直接点击页面上的内容进行编辑。');
              }
            }
          } else {
            console.error('TinaCMS未正确初始化');
            alert('TinaCMS初始化失败，请刷新页面重试或通过/admin页面访问完整编辑功能。');
          }
        } catch (error) {
          console.error('启用TinaCMS编辑器时出错:', error);
          alert('启用编辑器时出错: ' + (error instanceof Error ? error.message : String(error)));
        }
      };
      
      // 将按钮添加到页面
      document.body.appendChild(editButton);
      
      // 组件卸载时移除按钮
      return () => {
        if (editButton.parentNode) {
          document.body.removeChild(editButton);
        }
      };
    }
  }, [isEditMode]);
  
  // 解构首页数据
  const homeData = tinaData?.data?.getHomeDocument?.data || {
    title: '智能展馆多媒体中控系统',
    overview: '',
    architecture: '',
    features: [],
    techFeatures: []
  };
  
  const { 
    title, 
    overview, 
    architecture, 
    features, 
    techFeatures 
  } = homeData as HomeData;
  
  return (
    <div className="container">
      <style jsx>{`
        :root {
          --primary-color: #1a5276;
          --secondary-color: #3498db;
          --accent-color: #f4d03f;
          --text-color: #333333;
          --light-bg: #faf9f7;
          --border-color: #e0e0e0;
          --heading-font: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          --body-font: "Helvetica Neue", Arial, sans-serif;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: var(--body-font);
          color: var(--text-color);
          line-height: 1.6;
          background-color: var(--light-bg);
          padding: 0;
          margin: 0;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-color: white;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
        }

        header {
          background: linear-gradient(
            135deg,
            var(--primary-color),
            var(--secondary-color)
          );
          color: white;
          text-align: center;
          padding: 60px 20px;
          margin-bottom: 40px;
          border-radius: 8px;
        }

        h1 {
          font-family: var(--heading-font);
          font-size: 2.8rem;
          margin-bottom: 15px;
          font-weight: 700;
        }

        h2 {
          font-family: var(--heading-font);
          color: var(--primary-color);
          font-size: 2.2rem;
          margin-top: 40px;
          margin-bottom: 20px;
          padding-bottom: 10px;
          border-bottom: 2px solid var(--accent-color);
        }

        h3 {
          font-family: var(--heading-font);
          color: var(--secondary-color);
          font-size: 1.6rem;
          margin-top: 30px;
          margin-bottom: 15px;
        }

        p {
          margin-bottom: 15px;
          font-size: 1.05rem;
        }

        ul {
          margin-left: 20px;
          margin-bottom: 20px;
        }

        li {
          margin-bottom: 8px;
        }

        .feature-list {
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          margin: 30px 0;
        }

        .feature-card {
          flex: 1 1 300px;
          padding: 20px;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: #f9f9f9;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .feature-card h4 {
          color: var(--primary-color);
          margin-bottom: 10px;
          font-size: 1.3rem;
        }

        hr {
          border: none;
          height: 1px;
          background-color: var(--border-color);
          margin: 40px 0;
        }

        .spec-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          margin: 30px 0;
        }

        .spec-section {
          padding: 20px;
          border-radius: 8px;
          background-color: #f9f9f9;
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 2rem;
          }

          h2 {
            font-size: 1.8rem;
          }

          h3 {
            font-size: 1.4rem;
          }

          .container {
            padding: 15px;
          }

          header {
            padding: 40px 15px;
          }
        }

        /* 咨询按钮样式 */
        .consultation-btn {
          background: linear-gradient(
            135deg,
            var(--primary-color),
            var(--secondary-color)
          );
          color: white;
          border: none;
          padding: 12px 30px;
          font-size: 16px;
          border-radius: 25px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(26, 82, 118, 0.3);
        }

        .consultation-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(26, 82, 118, 0.4);
        }

        /* 模态框样式 */
        .modal {
          display: block;
          position: fixed;
          z-index: 1000;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .modal-content {
          background-color: white;
          margin: 5% auto;
          padding: 30px;
          border-radius: 10px;
          width: 90%;
          max-width: 500px;
          position: relative;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
          cursor: pointer;
          line-height: 1;
        }

        .close:hover {
          color: #000;
        }

        /* 表单样式 */
        .form-group {
          margin-bottom: 20px;
          text-align: left;
        }

        .form-group label {
          display: block;
          margin-bottom: 5px;
          font-weight: 500;
          color: #333;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border: 1px solid var(--border-color);
          border-radius: 5px;
          font-size: 14px;
          box-sizing: border-box;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary-color);
          box-shadow: 0 0 5px rgba(26, 82, 118, 0.3);
        }

        .submit-btn {
          background: linear-gradient(
            135deg,
            var(--primary-color),
            var(--secondary-color)
          );
          color: white;
          border: none;
          padding: 12px 30px;
          font-size: 16px;
          border-radius: 5px;
          cursor: pointer;
          width: 100%;
          transition: all 0.3s ease;
        }

        .submit-btn:hover {
          background: linear-gradient(
            135deg,
            var(--secondary-color),
            var(--primary-color)
          );
        }

        /* 响应式调整 */
        @media (max-width: 768px) {
          .modal-content {
            margin: 10% auto;
            padding: 20px;
            width: 95%;
          }
        }
      `}</style>
      
      <header>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">{title}</h1>
        </header>

      <section>
        <h2>产品概述</h2>
        <div style={{ position: 'relative' }}>
            <div dangerouslySetInnerHTML={{ __html: overview }} />
          </div>
      </section>

      <section>
        <h2>系统架构</h2>
        <div style={{ position: 'relative' }}>
            <div dangerouslySetInnerHTML={{ __html: architecture }} />
          </div>
      </section>

      <section>
        <h2>主要功能</h2>
        
        {features.length > 0 ? (
          <div className="feature-list">
            {features.map((feature: Feature, index: number) => (
              <div key={index} className="feature-card">
                <h4>{feature.title}</h4>
                <div dangerouslySetInnerHTML={{ __html: feature.content }} />
              </div>
            ))}
          </div>
        ) : (
          <p>暂无功能信息</p>
        )}
      </section>

      <section>
        <h2>技术特色</h2>
        
        {techFeatures.length > 0 ? (
          <div className="feature-list">
            {techFeatures.map((techFeature: Feature, index: number) => (
              <div key={index} className="feature-card">
                <h4>{techFeature.title}</h4>
                <div dangerouslySetInnerHTML={{ __html: techFeature.content }} />
              </div>
            ))}
          </div>
        ) : (
          <div className="feature-list">
            <div className="feature-card">
              <h4>智能分布式网络</h4>
              <ul>
                <li>
                  自组织网络：设备能够自动发现并连接到群组，简化安装和配置流程
                </li>
                <li>
                  即插即用扩展：支持设备的热插拔和自动识别，便于系统维护和升级
                </li>
                <li>
                  快速集成中央系统：需要集中控制时，可迅速接入中央服务器，实现跨群组管理
                </li>
              </ul>
            </div>

            <div className="feature-card">
              <h4>精细控制与权限管理</h4>
              <ul>
                <li>
                  多协议兼容：同时支持RS232串口、USB HID、蓝牙HID、继电器等多种控制协议
                </li>
                <li>
                  设备状态实时监控：实时监测各设备的运行状态，提供故障预警和报警功能
                </li>
                <li>
                  多级权限控制：基于角色的访问控制，支持管理员、操作员等不同级别的权限设置
                </li>
                <li>
                  操作日志记录：详细记录所有操作，便于系统审计和问题追溯
                </li>
              </ul>
            </div>
          </div>
        )}
      </section>

      <section>
        <h2>应用场景</h2>
        <ul>
          <li>
            <strong>数字展馆与博物馆</strong>：为各类展览提供精细化的设备控制和高质量的媒体展示，通过独立群组运行确保展览的稳定性，同时支持多展项的集中管理，提升观众体验和管理效率。
          </li>
          <li>
            <strong>企业展厅与品牌中心</strong>：提供企业形象和产品的全方位展示解决方案，支持一键切换不同展示场景，实现对所有设备的精细控制，通过多级权限管理确保系统安全。
          </li>
          <li>
            <strong>临时展览与活动空间</strong>：对于需要快速部署的临时展览，系统的独立群组运行能力和快速集成特性尤为重要，可在无外网环境下正常工作，同时支持灵活的设备扩展。
          </li>
          <li>
            <strong>异形投影与沉浸式空间</strong>：针对非标准投影面，系统内置的几何校正功能和高性能渲染能力，能够实现精准的图像还原，创造沉浸式的展示体验。
          </li>
        </ul>
      </section>

      <section>
        <h2>产品优势</h2>
        <ol>
          <li data-tina-field="content-product-advantages.item1">
            <strong>独立运行与集中管理兼备</strong>：每个展项可独立运行，确保基础功能稳定；又能快速集成到中央系统，实现统一管理
          </li>
          <li data-tina-field="content-product-advantages.item2">
            <strong>全方位设备精细控制</strong>：覆盖从电源开关到软件控制、内容播放的完整控制链条，实现真正的一键式管理
          </li>
          <li data-tina-field="content-product-advantages.item3">
            <strong>高性能媒体处理</strong>：基于Linux的嵌入式播放器配合GPU硬件加速，确保高清内容和复杂H5页面的流畅播放
          </li>
          <li data-tina-field="content-product-advantages.item4">
            <strong>几何校正专业能力</strong>：内置专业的画面几何校正功能，解决异形投影面的图像失真问题
          </li>
          <li data-tina-field="content-product-advantages.item5">
            <strong>灵活部署与扩展</strong>：支持从单一展项到大型展览馆的灵活扩展，适应不同规模和需求的展览场景
          </li>
        </ol>
      </section>

      <section>
        <h2>系统规格</h2>

        <div className="spec-grid">
          <div className="spec-section">
            <h3>硬件规格</h3>
            <ul>
              <li><strong>主控设备</strong>：</li>
              <ul>
                <li>ESP32双核处理器，支持BLE 5.0和WiFi 4/5</li>
                <li>触摸控制面板，提供直观的操作界面</li>
              </ul>
              <li><strong>控制节点</strong>：</li>
              <ul>
                <li>ESP32继电器模块：控制电源开关和通断</li>
                <li>ESP32 RS232模块：支持标准串口设备通信</li>
                <li>ESP32 HID模块：模拟键盘鼠标操作</li>
              </ul>
              <li><strong>播放终端</strong>：</li>
              <ul>
                <li>基于高性能SoC的Linux嵌入式播放器</li>
                <li>内置GPU加速和硬件视频解码器</li>
                <li>支持4K/8K内容播放</li>
                <li>存储容量不低于128GB</li>
                <li>支持多HDMI输出，每接口支持4K分辨率</li>
              </ul>
              <li><strong>接口规格</strong>：</li>
              <ul>
                <li>控制接口：RS232、USB、蓝牙、WiFi</li>
                <li>音频输出：3.5mm音频接口</li>
                <li>电源要求：支持220V交流输入</li>
              </ul>
            </ul>
          </div>

          <div className="spec-section">
            <h3>软件规格</h3>
            <ul>
              <li><strong>操作系统</strong>：Linux嵌入式系统</li>
              <li><strong>核心功能</strong>：</li>
              <ul>
                <li>内置画面几何校正算法</li>
                <li>支持复杂H5页面渲染</li>
                <li>硬件加速的媒体播放</li>
              </ul>
              <li><strong>通信协议</strong>：</li>
              <ul>
                <li>本地通信：BLE GATT</li>
                <li>网络通信：MQTT、WiFi</li>
              </ul>
              <li><strong>权限管理</strong>：基于角色的多级权限控制</li>
              <li><strong>移动控制</strong>：支持平板电脑APP集中控制</li>
            </ul>
          </div>
        </div>
      </section>

      {/* 咨询区域 */}
      <section
        id="consultation-section"
        style={{ margin: '60px 0', textAlign: 'center' }}
      >
        <h2>联系我们</h2>
        <p style={{ marginBottom: '30px', color: '#666' }}>
          如果您对我们的产品感兴趣或有任何疑问，请随时联系我们，我们将为您提供专业的咨询服务。
        </p>

        <button
          id="consultation-btn"
          className="consultation-btn"
          onClick={openConsultationForm}
        >
          立即咨询
        </button>
      </section>

      {/* 咨询表单弹窗 */}
      {showModal && (
        <div 
          id="consultation-modal" 
          className="modal"
          onClick={closeConsultationForm}
        >
          <div 
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <span 
              className="close" 
              onClick={closeConsultationForm}
            >
              &times;
            </span>
            <h3>产品咨询</h3>
            <form
              onSubmit={handleSubmit}
              id="consultation-form"
            >
              <input type="hidden" name="_subject" value="新的产品咨询！" />
              <input type="hidden" name="_captcha" value="true" />
              
              <div className="form-group">
                <label htmlFor="name">姓名 *</label>
                <input type="text" id="name" name="name" required />
              </div>

              <div className="form-group">
                <label>电话号码 *</label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <div
                    style={{
                      flex: '0 0 auto',
                      fontSize: '16px',
                      fontWeight: 500,
                      color: '#333',
                    }}
                  >
                    +
                  </div>
                  <div style={{ flex: '0 0 100px' }}>
                    <input
                      type="text"
                      id="country-code"
                      name="country-code"
                      placeholder="国家代码"
                      required
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div style={{ flex: '1' }}>
                    <input
                      type="tel"
                      id="phone-number"
                      name="phone-number"
                      placeholder="电话号码"
                      required
                      style={{ width: '100%' }}
                    />
                  </div>
                </div>
                <small style={{ color: '#666', fontSize: '12px' }}>
                  例如：+1 1234567890 或 +44 1234567890
                </small>
              </div>

              <div className="form-group">
                <label htmlFor="email">邮箱地址</label>
                <input type="email" id="email" name="email" />
              </div>

              <div className="form-group">
                <label htmlFor="message">咨询内容 *</label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn">
                提交咨询
              </button>
            </form>
          </div>
        </div>
      )}

      <hr />

      <footer>
        <p style={{ textAlign: 'center', color: '#666', fontStyle: 'italic' }}>
          智能展馆多媒体中控系统，为您的展览空间提供全方位的智能解决方案，助力打造令人难忘的参观体验。
        </p>
      </footer>
    </div>
  );
};

export default function HomePage() {
  return (
    <HomeContent />
  );
}