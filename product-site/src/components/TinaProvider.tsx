'use client';

import { TinaCMS, TinaProvider as BaseTinaProvider } from 'tinacms';
import { client } from '../../tina/__generated__/client';
import { useEffect, useState } from 'react';

export default function TinaProvider({ children }: { children: React.ReactNode }) {
  const [cms, setCms] = useState<TinaCMS | null>(null);

  useEffect(() => {
    // 只在客户端初始化TinaCMS
    if (typeof window !== 'undefined') {
      // 检查是否在admin路径下
      const isAdminPath = window.location.pathname.includes('/admin');
      
      const tinaCMS = new TinaCMS({
        client,
        enabled: isAdminPath, // 如果在admin路径下则启用
        sidebar: isAdminPath, // 如果在admin路径下则显示侧边栏
      });
      
      setCms(tinaCMS);
    }
  }, []);

  if (!cms) {
    return <>{children}</>;
  }

  return (
    <BaseTinaProvider cms={cms}>
      {children}
    </BaseTinaProvider>
  );
}