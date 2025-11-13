'use client';
import { useState } from 'react';
import Image from 'next/image';

const About = () => {
  const [showModal, setShowModal] = useState(false);

  const openConsultationForm = () => {
    setShowModal(true);
  };

  const closeConsultationForm = () => {
    setShowModal(false);
  };

  const teamMembers = [
    {
      id: 1,
      name: '张三',
      title: '技术总监',
      description: '拥有10年智能控制系统开发经验，曾主导多个大型展馆项目的技术方案设计和实施。',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: '李四',
      title: '产品经理',
      description: '专注于用户体验研究和产品设计，致力于打造符合客户需求的智能展馆产品。',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: '王五',
      title: '项目经理',
      description: '负责项目规划、协调和管理，确保项目按时高质量完成，客户满意度达到100%。',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const timelineItems = [
    {
      id: 1,
      date: '2010年',
      content: '公司成立，专注于展览展示行业技术服务。',
    },
    {
      id: 2,
      date: '2013年',
      content: '推出第一代展馆多媒体控制系统，获得市场认可。',
    },
    {
      id: 3,
      date: '2016年',
      content: '完成A轮融资，扩大研发团队，加速产品创新。',
    },
    {
      id: 4,
      date: '2018年',
      content: '推出基于ESP32技术的新一代智能展馆多媒体中控系统。',
    },
    {
      id: 5,
      date: '2021年',
      content: '成功实施100+大型展馆项目，服务客户遍布全球。',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-white min-h-screen">
      <header className="bg-gradient-to-r from-[#1a5276] to-[#3498db] text-white text-center py-15 px-4 rounded-lg mb-10">
        <h1 className="text-4xl font-bold mb-4">关于我们</h1>
        <p className="text-xl">专业的智能展馆解决方案提供商</p>
      </header>

      <div className="content">
        <section>
          <h2 className="text-3xl font-bold text-[#1a5276] mb-6 pb-2 border-b-2 border-[#f4d03f]">公司简介</h2>
          <p className="mb-4 text-lg">
            我们是一家专注于智能展馆多媒体中控系统研发、生产和销售的高科技企业。凭借多年的行业经验和技术积累，我们致力于为各类展览馆、博物馆、企业展厅等场所提供专业的智能化解决方案。
          </p>
          <p className="mb-4 text-lg">
            我们的核心团队由行业资深专家组成，拥有丰富的项目实施经验和创新研发能力。通过不断技术创新和产品优化，我们已成功为众多国内外客户提供了高质量的产品和服务，赢得了广泛的市场认可。
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#1a5276] mt-10 mb-6 pb-2 border-b-2 border-[#f4d03f]">我们的使命</h2>
          <p className="text-lg mb-6">
            通过创新技术，打造智能、高效、便捷的展馆多媒体控制体验，助力客户提升展览效果和运营效率，为观众带来沉浸式的参观体验。
          </p>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#1a5276] mt-10 mb-6 pb-2 border-b-2 border-[#f4d03f]">我们的愿景</h2>
          <p className="text-lg mb-6">
            成为全球领先的智能展馆解决方案提供商，引领行业技术发展方向，推动展览展示行业的数字化、智能化转型。
          </p>
        </section>

        <section className="team-section mt-10 mb-12">
          <h2 className="text-3xl font-bold text-[#1a5276] mb-6 pb-2 border-b-2 border-[#f4d03f]">核心团队</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div key={member.id} className="team-member text-center p-6 rounded-lg bg-gray-50 transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg">
                <div className="flex justify-center mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={150}
                    height={150}
                    className="member-photo rounded-full object-cover border-4 border-white shadow"
                  />
                </div>
                <h4 className="member-name text-xl font-semibold text-[#1a5276] mb-2">{member.name}</h4>
                <p className="member-title text-[#3498db] mb-4">{member.title}</p>
                <p className="text-gray-700">{member.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 mb-12">
          <h2 className="text-3xl font-bold text-[#1a5276] mb-6 pb-2 border-b-2 border-[#f4d03f]">发展历程</h2>
          <div className="timeline relative max-w-1200 mx-auto before:content-[''] before:absolute before:w-2 before:bg-[#3498db] before:top-0 before:bottom-0 before:left-1/2 before:-ml-1">
            {timelineItems.map((item, index) => (
              <div 
                key={item.id} 
                className={`timeline-item relative mb-10 w-1/2 px-10 ${index % 2 === 0 ? 'left-0' : 'left-1/2'}`}
              >
                <div className={`timeline-content p-5 bg-white rounded-lg shadow-md ${index % 2 === 0 ? 'border-l-4 border-[#3498db]' : 'border-r-4 border-[#3498db] border-l-0'}`}>
                  <div className="timeline-date font-semibold text-[#1a5276] mb-3">{item.date}</div>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-[#1a5276] mt-10 mb-6 pb-2 border-b-2 border-[#f4d03f]">联系我们</h2>
          <p className="text-lg mb-6">
            如果您对我们的公司或产品有任何疑问，欢迎随时联系我们。我们将竭诚为您提供专业的咨询和服务。
          </p>
          <button
            onClick={openConsultationForm}
            className="consultation-btn bg-gradient-to-r from-[#1a5276] to-[#3498db] text-white px-8 py-3 rounded-full font-medium hover:shadow-lg transition-all transform hover:-translate-y-1"
          >
            立即咨询
          </button>
        </section>
      </div>

      {/* 咨询模态框 */}
      {showModal && (
        <div id="consultation-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={closeConsultationForm}>
          <div className="modal-content bg-white rounded-lg p-8 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-[#1a5276]">咨询我们</h3>
              <button onClick={closeConsultationForm} className="close text-gray-500 hover:text-gray-700 text-2xl">
                &times;
              </button>
            </div>
            <form id="consultation-form" action="https://formspree.io/f/xknljwjd" method="POST">
              <div className="form-group mb-4">
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">姓名 *</label>
                <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a5276] focus:border-transparent" />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="country-code" className="block text-gray-700 font-medium mb-2">国家/地区代码 *</label>
                <input type="text" id="country-code" name="country-code" placeholder="例如：86（中国）" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a5276] focus:border-transparent" />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="phone-number" className="block text-gray-700 font-medium mb-2">电话号码 *</label>
                <input type="tel" id="phone-number" name="phone-number" required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a5276] focus:border-transparent" />
              </div>
              <div className="form-group mb-4">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">电子邮箱</label>
                <input type="email" id="email" name="email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a5276] focus:border-transparent" />
              </div>
              <div className="form-group mb-6">
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">咨询内容 *</label>
                <textarea id="message" name="message" rows={5} required className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1a5276] focus:border-transparent"></textarea>
              </div>
              <button type="submit" className="submit-btn w-full bg-gradient-to-r from-[#1a5276] to-[#3498db] text-white py-3 rounded-md font-medium hover:shadow-md transition-shadow">
                提交
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default About;