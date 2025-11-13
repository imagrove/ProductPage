'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Navbar() {
  const pathname = usePathname() || '/';
  
  // 判断是否为当前路径的函数
  const isActivePath = (href: string) => {
    return pathname === href;
  };
  
  // 获取导航链接的样式
  const getLinkClassName = (href: string) => {
    const baseClasses = 'font-medium text-lg hover:text-primary transition-colors';
    const mobileClasses = 'py-2';
    
    if (isActivePath(href)) {
      // 激活状态：改变颜色并添加下划线
      return `${baseClasses} text-primary font-semibold relative ${mobileClasses} after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary after:transition-all`;
    }
    
    return `${baseClasses} text-gray-700 ${mobileClasses}`;
  };
  
  return React.createElement(
    'nav',
    { className: 'h-16 bg-white shadow-md sticky top-0 z-50' },
    React.createElement(
      'div',
      { className: 'container mx-auto px-4 h-full flex justify-between items-center' },
      React.createElement(
        Link,
        { href: '/', className: 'text-lg font-bold text-gray-800 flex items-center' },
        '智能展馆多媒体中控系统'
      ),
      React.createElement(
        'div',
        { className: 'hidden md:block h-full flex items-center' },
        React.createElement(
          'ul',
          { className: 'flex space-x-8 items-center' },
          React.createElement(
              'li',
              null,
              React.createElement(Link, { href: '/', className: getLinkClassName('/') }, '首页')
            ),
            React.createElement(
              'li',
              null,
              React.createElement(Link, { href: '/about', className: getLinkClassName('/about') }, '关于我们')
            ),
            React.createElement(
              'li',
              null,
              React.createElement(Link, { href: '/products', className: getLinkClassName('/products') }, '产品')
            ),
            React.createElement(
              'li',
              null,
              React.createElement(Link, { href: '/cases', className: getLinkClassName('/cases') }, '项目案例')
            ),
            React.createElement(
              'li',
              null,
              React.createElement(Link, { href: '/contact', className: getLinkClassName('/contact') }, '联系方式')
            )
        )
      ),
      React.createElement(
        'button',
        { 
          className: 'hamburger md:hidden text-gray-700 text-2xl',
          onClick: () => {},
          'aria-label': '打开菜单'
        },
        '☰'
      )
    )
  );

}

export default Navbar;