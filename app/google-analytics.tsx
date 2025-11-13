'use client';

import Script from 'next/script';
import { useEffect } from 'react';

// Google Analytics 跟踪ID
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID;

// 页面视图事件类型定义
interface PageViewEvent {
  page_path: string;
  page_title: string;
  page_location: string;
}

// 自定义事件类型定义
interface CustomEvent {
  name: string;
  params: Record<string, string | number | boolean | undefined>;
}

// Google Analytics 数据层类型定义
interface GtagEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
}

// 检查是否支持window对象
const isBrowser = typeof window !== 'undefined';

// 页面视图记录函数
export const pageview = ({ page_path, page_title, page_location }: PageViewEvent) => {
  if (!isBrowser || !GA_TRACKING_ID) return;
  
  window.gtag('config', GA_TRACKING_ID, {
    page_path,
    page_title,
    page_location,
  });
};

// 事件记录函数
export const event = ({
  action,
  category,
  label,
  value,
}: GtagEvent) => {
  if (!isBrowser || !GA_TRACKING_ID) return;
  
  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};

// 自定义事件记录函数
export const customEvent = ({ name, params }: CustomEvent) => {
  if (!isBrowser || !GA_TRACKING_ID) return;
  
  window.gtag('event', name, params);
};

// Google Analytics 组件
export default function GoogleAnalytics() {
  // 移除usePathname和useSearchParams，改用客户端方式处理
  
  useEffect(() => {
    // 只在客户端执行
    if (!isBrowser) return;
    
    // 初始页面视图跟踪
    if (GA_TRACKING_ID) {
      pageview({
        page_path: window.location.pathname + window.location.search,
        page_title: document.title,
        page_location: window.location.href,
      });
    }
    
    // 监听popstate事件（处理浏览器前进/后退）
    const handlePopState = () => {
      if (GA_TRACKING_ID) {
        pageview({
          page_path: window.location.pathname + window.location.search,
          page_title: document.title,
          page_location: window.location.href,
        });
      }
    };
    
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // 如果没有配置GA跟踪ID，不加载GA脚本
  if (!GA_TRACKING_ID) {
    return null;
  }

  return (
    <>
      {/* Google tag (gtag.js) - 基本配置 */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id="gtag-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', { send_page_view: false });
          `,
        }}
      />
    </>
  );
}

// 声明全局类型，避免TypeScript错误
declare global {
  interface Window {
    gtag: (command: string, ...args: (string | Record<string, unknown>)[]) => void;
    dataLayer: Array<Record<string, unknown>>;
  }
}