import React from 'react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 公司信息 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xl">ZH</span>
              </div>
              <span className="text-xl font-bold text-white">智能展馆</span>
            </div>
            <p className="text-gray-400">
              专注于智能硬件展示解决方案，为客户提供高品质的产品和服务。
            </p>
          </div>

          {/* 快速链接 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">快速链接</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">首页</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white transition-colors">关于我们</Link></li>
              <li><Link href="/products" className="text-gray-400 hover:text-white transition-colors">产品</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">联系我们</Link></li>
            </ul>
          </div>

          {/* 联系方式 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">联系方式</h3>
            <ul className="space-y-2 text-gray-400">
              <li>电话：400-123-4567</li>
              <li>邮箱：contact@smart-exhibition.com</li>
              <li>地址：上海市浦东新区科技园区88号</li>
            </ul>
          </div>

          {/* 订阅 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">订阅我们</h3>
            <p className="text-gray-400 mb-4">
              订阅我们的新闻通讯，获取最新产品和服务信息。
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="您的邮箱地址"
                className="px-4 py-2 bg-gray-800 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary w-full"
              />
              <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors">
                订阅
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} 智能展馆科技有限公司. 保留所有权利.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;