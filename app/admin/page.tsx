'use client';

import React, { Suspense } from 'react';

const AdminContent = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">管理面板</h1>
      <p className="text-gray-600 mb-8">此管理页面目前正在开发中</p>
    </div>
  );
};

export default function AdminPage() {
  return (
    <Suspense fallback={<div>加载管理页面...</div>}>
      <AdminContent />
    </Suspense>
  );
}

// 页面内容将在客户端渲染