'use client';
import { useState } from 'react';
import Link from 'next/link';
import ContactCTASection from '@/components/ContactCTASection';

type CaseCategory = 'all' | 'museum' | 'enterprise' | 'science' | 'culture';

type ShowcaseCase = {
  title: string;
  description: string;
  image: string;
  category: Exclude<CaseCategory, 'all'>;
  year: string;
  slug?: string;
};

const showcaseCases: ShowcaseCase[] = [
  {
    title: '国家博物馆数字化改造项目',
    description: '为国家博物馆提供智能展馆中控系统，实现 20 个展厅集中控制与智能管理。',
    image: '/images/products/webcam.svg',
    category: 'museum',
    year: '2022年',
    slug: 'digital-museum',
  },
  {
    title: '科技企业展厅项目',
    description: '打造现代化展厅，集成多媒体展示、互动体验与智能控制系统。',
    image: '/images/products/smartwatch.svg',
    category: 'enterprise',
    year: '2023年',
    slug: 'brand-center',
  },
  {
    title: '科技馆互动展区项目',
    description: '沉浸式互动展区，通过智能中控实现多设备联动与场景切换。',
    image: '/images/products/gaming-mouse.svg',
    category: 'science',
    year: '2023年',
    slug: 'event-space',
  },
  {
    title: '文化艺术中心项目',
    description: '多媒体展示解决方案，支持各类文化活动与艺术展览的灵活举办。',
    image: '/images/products/speaker.svg',
    category: 'culture',
    year: '2022年',
  },
  {
    title: '汽车品牌体验中心项目',
    description: '打造数字化体验中心，集成互动展示与智能导览系统。',
    image: '/images/products/headphones.svg',
    category: 'enterprise',
    year: '2023年',
  },
  {
    title: '历史博物馆项目',
    description: '文物展示数字化与互动化，智能化改造提升观众体验。',
    image: '/images/products/webcam.svg',
    category: 'museum',
    year: '2021年',
  },
];

export default function CasesPage() {
  const [active, setActive] = useState<CaseCategory>('all');
  const categories: { key: CaseCategory; label: string }[] = [
    { key: 'all', label: '全部案例' },
    { key: 'museum', label: '博物馆' },
    { key: 'enterprise', label: '企业展厅' },
    { key: 'science', label: '科技馆' },
    { key: 'culture', label: '文化馆' },
  ];
  const filtered = showcaseCases.filter((c) => active === 'all' || c.category === active);

  const categoryLabel = (cat: ShowcaseCase['category']) =>
    cat === 'museum' ? '博物馆' : cat === 'enterprise' ? '企业展厅' : cat === 'science' ? '科技馆' : '文化馆';

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">项目案例</h1>
          <p className="text-lg opacity-90">探索我们的成功案例，了解智能展馆多媒体中控系统的实际应用</p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl py-10">
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((c) => (
            <button
              key={c.key}
              onClick={() => setActive(c.key)}
              className={`px-4 py-2 rounded-full border transition-all text-sm ${
                active === c.key
                  ? 'bg-blue-700 border-blue-700 text-white'
                  : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((c, i) => (
            <div key={i} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow">
              <div className="overflow-hidden h-56 bg-gray-50">
                <img src={c.image} alt={c.title} className="w-full h-full object-contain p-6 transition-transform duration-500 hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">{c.title}</h3>
                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>{categoryLabel(c.category)}</span>
                  <span>{c.year}</span>
                </div>
                <p className="text-gray-700 mb-4">{c.description}</p>
                <div>
                  <Link href={c.slug ? `/cases/${c.slug}` : '#'} className="inline-block px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700">查看详情</Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">客户反馈</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-700 mb-3">“智能展馆多媒体中控系统极大地提升了我们博物馆的运营效率，系统稳定可靠，操作简便，观众体验也得到了显著提升。”</p>
              <div className="text-sm text-gray-600"><strong>张馆长</strong> - 国家博物馆</div>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-700 mb-3">“感谢团队为我们打造的现代化展厅解决方案，系统的灵活性和可扩展性让我们能够快速响应不同的展示需求。”</p>
              <div className="text-sm text-gray-600"><strong>李经理</strong> - 科技企业</div>
            </div>
          </div>
        </section>

        <ContactCTASection className="mt-8" />
      </div>
    </div>
  );
}