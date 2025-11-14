import { NextRequest, NextResponse } from 'next/server';

// 为TinaCMS API实现正确的路由处理
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  
  // 检查是否是预览请求
  if (url.pathname.includes('/preview')) {
    try {
      // 从查询参数中获取编辑模式标志
      const editMode = url.searchParams.get('edit');
      
      // 重定向到首页并带上编辑参数
      const redirectUrl = editMode 
        ? '/?edit=true'
        : '/';
      
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    } catch (error) {
      console.error('预览路由处理错误:', error);
      return NextResponse.json(
        { error: '预览功能暂时不可用' },
        { status: 500 }
      );
    }
  }
  
  // 其他API请求的处理
  return NextResponse.json({
    message: 'TinaCMS API endpoint',
    path: url.pathname,
    method: 'GET'
  });
}

export async function POST(request: NextRequest) {
  const url = new URL(request.url);
  
  // 处理其他POST请求
  return NextResponse.json({
    message: 'TinaCMS API endpoint',
    path: url.pathname,
    method: 'POST'
  });
}