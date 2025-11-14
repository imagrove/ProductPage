'use client';

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">管理面板入口</h1>
        <p className="text-gray-600 mb-8">Tina CMS 配置已就绪，您可以访问以下功能：</p>
        <div className="flex flex-col gap-4 max-w-md mx-auto">
          <a href="/?edit=true" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            内容预览（编辑模式）
          </a>
          <a href="/" className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            返回首页
          </a>
        </div>
      </div>
    </div>
  );
}