'use client';

import { TinaCMS, TinaProvider as BaseTinaProvider } from 'tinacms';
import { client } from '../../tina/__generated__/client';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function TinaProvider({ children }: { children: React.ReactNode }) {
  const [cms, setCms] = useState<TinaCMS | null>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (pathname && pathname.startsWith('/admin')) {
    return <>{children}</>;
  }

  useEffect(() => {
    // 只在客户端初始化TinaCMS
    if (typeof window !== 'undefined') {
      // 检查是否在admin路径下
      const isAdminPath = pathname.includes('/admin');
      const isProductRoute = pathname.startsWith('/products/');
      const viaQuery = searchParams.get('edit') === '1' || searchParams.get('tina') === '1';
      const viaEnv = process.env.NEXT_PUBLIC_TINA_ENABLE === 'true';
      const isEmbedded = window.self !== window.top;
      const enabled = isAdminPath || isEmbedded || ((viaQuery || viaEnv) && isProductRoute);
      const showSidebar = isAdminPath || isEmbedded;

      if (enabled || showSidebar) {
        const tinaCMS = new TinaCMS({
          client,
          enabled,
          sidebar: showSidebar,
        });
        setCms(tinaCMS);
      } else {
        setCms(null);
      }
    }
  }, [pathname, searchParams]);

  if (!cms) {
    return <>{children}</>;
  }

  return (
    <BaseTinaProvider cms={cms}>
      {children}
    </BaseTinaProvider>
  );
}