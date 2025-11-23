// app/products/page.tsx
'use client';

import { useEffect, useState } from 'react';
import ContactModal from '@/components/ContactModal';
import Link from 'next/link';
import { getProducts, Product } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import ContactCTASection from '@/components/ContactCTASection';

type ShowcaseItem = {
  title: string;
  description: string;
  image: string;
  features: string[];
  category: 'control' | 'display' | 'terminal' | 'app';
  slug?: string;
};

const showcaseProducts: ShowcaseItem[] = [
  {
    title: '智能展馆多媒体中控系统',
    description: '基于 ESP32 的高性能、高可靠的展馆设备集中控制解决方案。',
    image: '/images/products/webcam.svg',
    features: ['精细设备控制', '独立群组运行', '灵活群组集成', '高性能播放终端'],
    category: 'control',
    slug: '4k-webcam',
  },
  {
    title: 'ESP32 智能控制面板',
    description: '高性能触控控制面板，支持多设备控制和场景切换。',
    image: '/images/products/smartwatch.svg',
    features: ['7 英寸触摸屏', 'WiFi + BLE 通信', 'IP65 防水防尘', '支持离线运行'],
    category: 'control',
    slug: 'smart-fitness-watch',
  },
  {
    title: '智能投影系统',
    description: '支持几何校正与边缘融合的高性能投影系统。',
    image: '/images/products/gaming-mouse.svg',
    features: ['4K 超高清', '自动几何校正', '多机联动', '激光光源'],
    category: 'display',
    slug: 'wireless-gaming-mouse',
  },
  {
    title: '嵌入式播放终端',
    description: 'Linux 播放器，内置 GPU 加速与 H5 页面渲染。',
    image: '/images/products/speaker.svg',
    features: ['4K 视频解码', '硬件加速渲染', '7x24 稳定运行', '远程内容更新'],
    category: 'terminal',
    slug: 'portable-bluetooth-speaker',
  },
  {
    title: '平板控制应用',
    description: '面向管理人员的集中控制应用，支持多展项管理。',
    image: '/images/products/headphones.svg',
    features: ['可视化界面', '多级权限管理', '场景一键切换', '设备状态监控'],
    category: 'app',
    slug: 'wireless-headphones',
  },
  {
    title: '智能设备控制模块',
    description: '支持多协议的设备控制模块，适配多种展览设备。',
    image: '/images/products/webcam.svg',
    features: ['继电器电源控制', 'RS232 串口', '红外发射', 'WiFi 远程控制'],
    category: 'control',
    slug: 'wireless-gaming-mouse',
  },
];

export default function ProductsPage() {
  const [active, setActive] = useState<'all' | ShowcaseItem['category']>('all');
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    getProducts().then(setProducts).catch(() => setProducts([]));
  }, []);

  const categories: { key: 'all' | ShowcaseItem['category']; label: string }[] = [
    { key: 'all', label: '全部产品' },
    { key: 'control', label: '控制系统' },
    { key: 'display', label: '显示设备' },
    { key: 'terminal', label: '播放终端' },
    { key: 'app', label: '移动应用' },
  ];

  const filtered = products.filter((p: any) => active === 'all' || p.category === active);

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-3">产品中心</h1>
          <p className="text-lg opacity-90">探索我们的智能展馆多媒体中控系统产品系列</p>
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p: any) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">产品优势</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-3">技术领先</h4>
              <p className="text-gray-700">基于 ESP32 平台与现代物联网通信技术，兼顾稳定性与扩展性。</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-3">易于部署</h4>
              <p className="text-gray-700">模块化设计，即插即用，降低施工难度与成本。</p>
            </div>
            <div className="bg-white rounded-lg shadow p-6">
              <h4 className="text-lg font-semibold text-blue-700 mb-3">高效管理</h4>
              <p className="text-gray-700">集中管理平台，设备状态可视与快速响应提升运营效率。</p>
            </div>
          </div>
        </section>

        <ContactCTASection className="mt-8" />
      </div>
    </div>
  );
}