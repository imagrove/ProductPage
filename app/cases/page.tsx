'use client';

import React, { useState } from 'react';
import Image from 'next/image';

// 案例数据类型定义
type CaseCategory = 'museum' | 'enterprise' | 'science' | 'culture';

interface CaseStudy {
  id: number;
  name: string;
  category: CaseCategory;
  year: string;
  description: string;
  imageUrl: string;
}

// 客户反馈类型定义
interface Testimonial {
  id: number;
  content: string;
  author: string;
  position: string;
}

// 案例数据
const caseStudies: CaseStudy[] = [
  {
    id: 1,
    name: '国家博物馆数字化改造项目',
    category: 'museum',
    year: '2022年',
    description: '为国家博物馆提供智能展馆多媒体中控系统，实现了20个展厅的设备集中控制和智能化管理。',
    imageUrl: 'https://via.placeholder.com/600x400?text=国家+博物馆+数字化+改造'
  },
  {
    id: 2,
    name: '科技企业展厅项目',
    category: 'enterprise',
    year: '2023年',
    description: '为某知名科技企业打造现代化展厅，集成了多媒体展示、互动体验和智能控制系统。',
    imageUrl: 'https://via.placeholder.com/600x400?text=科技+企业+展厅'
  },
  {
    id: 3,
    name: '科技馆互动展区项目',
    category: 'science',
    year: '2023年',
    description: '为科技馆打造沉浸式互动展区，通过智能中控系统实现多设备联动和场景切换。',
    imageUrl: 'https://via.placeholder.com/600x400?text=科技馆+互动+展区'
  },
  {
    id: 4,
    name: '文化艺术中心项目',
    category: 'culture',
    year: '2022年',
    description: '为文化艺术中心提供多媒体展示解决方案，支持各类文化活动和艺术展览的灵活举办。',
    imageUrl: 'https://via.placeholder.com/600x400?text=文化+艺术中心'
  },
  {
    id: 5,
    name: '汽车品牌体验中心项目',
    category: 'enterprise',
    year: '2023年',
    description: '为知名汽车品牌打造数字化体验中心，集成了多媒体展示、互动体验和智能导览系统。',
    imageUrl: 'https://via.placeholder.com/600x400?text=汽车+品牌+体验+中心'
  },
  {
    id: 6,
    name: '历史博物馆项目',
    category: 'museum',
    year: '2021年',
    description: '为历史博物馆提供智能化改造，实现文物展示的数字化和互动化，提升观众体验。',
    imageUrl: 'https://via.placeholder.com/600x400?text=历史+博物馆'
  }
];

// 客户反馈数据
const testimonials: Testimonial[] = [
  {
    id: 1,
    content: '"智能展馆多媒体中控系统极大地提升了我们博物馆的运营效率，系统稳定可靠，操作简便，观众体验也得到了显著提升。"',
    author: '张馆长',
    position: '国家博物馆'
  },
  {
    id: 2,
    content: '"感谢团队为我们打造的现代化展厅解决方案，系统的灵活性和可扩展性让我们能够快速响应不同的展示需求。"',
    author: '李经理',
    position: '科技企业'
  }
];

// 分类选项
const categories = [
  { id: 'all', label: '全部案例' },
  { id: 'museum', label: '博物馆' },
  { id: 'enterprise', label: '企业展厅' },
  { id: 'science', label: '科技馆' },
  { id: 'culture', label: '文化馆' }
];

export default function CasesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [showModal, setShowModal] = useState<boolean>(false);

  // 筛选案例
  const filteredCases = selectedCategory === 'all' 
    ? caseStudies 
    : caseStudies.filter(caseStudy => caseStudy.category === selectedCategory);

  // 切换分类
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  // 打开咨询模态框
  const openConsultationForm = () => {
    setShowModal(true);
  };

  // 关闭咨询模态框
  const closeConsultationForm = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <header>
        <h1>项目案例</h1>
        <p>探索我们的成功案例，了解智能展馆多媒体中控系统的实际应用</p>
      </header>

      <div className="content">
        {/* 案例分类 */}
        <div className="case-categories">
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* 案例展示 */}
        <div className="case-grid">
          {filteredCases.map(caseStudy => (
            <div key={caseStudy.id} className="case-card" data-category={caseStudy.category}>
              <div className="case-image-container">
                <Image 
                  src={caseStudy.imageUrl} 
                  alt={caseStudy.name} 
                  className="case-image"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <div className="case-info">
                <h3 className="case-name">{caseStudy.name}</h3>
                <div className="case-meta">
                  <span key={`category-${caseStudy.id}`}>{categories.find(c => c.id === caseStudy.category)?.label}</span>
                  <span key={`year-${caseStudy.id}`}>{caseStudy.year}</span>
                </div>
                <p className="case-description">{caseStudy.description}</p>
                <a href="#" className="case-btn">查看详情</a>
              </div>
            </div>
          ))}
        </div>

        {/* 客户反馈 */}
        <section>
          <h2>客户反馈</h2>
          <div className="testimonials">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="testimonial-card">
                <div className="testimonial-content">
                  <p>{testimonial.content}</p>
                  <div className="testimonial-author">
                    <strong>{testimonial.author}</strong> - {testimonial.position}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 咨询部分 */}
        <section>
          <h2>联系我们</h2>
          <p>如果您对我们的项目案例有任何疑问，或者需要定制解决方案，请随时联系我们的团队。</p>
          <button className="consultation-btn" onClick={openConsultationForm}>立即咨询</button>
        </section>
      </div>

      {/* 咨询模态框 */}
      {showModal && (
        <div id="consultation-modal" className="modal" onClick={closeConsultationForm}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close" onClick={closeConsultationForm}>&times;</span>
            <h3>咨询我们</h3>
            <form id="consultation-form" action="https://formspree.io/f/xknljwjd" method="POST">
              <input type="hidden" name="_subject" value="新的产品咨询！" />
              <input type="hidden" name="_captcha" value="true" />
              <div className="form-group">
                <label htmlFor="name">姓名 *</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="country-code">国家/地区代码 *</label>
                <input type="text" id="country-code" name="country-code" placeholder="例如：86（中国）" required />
              </div>
              <div className="form-group">
                <label htmlFor="phone-number">电话号码 *</label>
                <input type="tel" id="phone-number" name="phone-number" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">电子邮箱</label>
                <input type="email" id="email" name="email" />
              </div>
              <div className="form-group">
                <label htmlFor="message">咨询内容 *</label>
                <textarea id="message" name="message" rows={5} required></textarea>
              </div>
              <button type="submit" className="submit-btn">提交</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}