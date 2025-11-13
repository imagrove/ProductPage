import React, { ReactNode, Suspense } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GoogleAnalytics from './google-analytics';

// 导入全局样式
import './globals.css';

interface RootLayoutProps {
  children: ReactNode;
}

export const metadata = {
  title: '智能展馆多媒体中控系统 - 产品描述',
  description: '提供高品质的智能硬件展示解决方案，为您的产品创造最佳展示效果。',
};

export default function RootLayout({
  children,
}: RootLayoutProps) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content={metadata.description} />
        <title>{metadata.title}</title>
      </head>
      <body className="bg-gray-50">
        {/* 集成Google Analytics */}
        <GoogleAnalytics />
        
        <Suspense fallback={<div>加载中...</div>}>
          <Navbar />
          <main className="min-h-screen">
            {children}
          </main>
        </Suspense>
        <Footer />
        
        {/* Snipcart integration - 暂时注释掉，等待有效的API密钥
        <div id="snipcart" data-api-key="YOUR_SNIPCART_TEST_KEY" style={{ display: 'none' }}></div>
        <script src="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.js" async></script>
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.2.1/default/snipcart.css" />
        */}
      </body>
    </html>
  );
}