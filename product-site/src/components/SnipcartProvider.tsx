// components/SnipcartProvider.tsx
'use client';

import Script from 'next/script';

interface SnipcartProviderProps {
  children: React.ReactNode;
}

export default function SnipcartProvider({ children }: SnipcartProviderProps) {
  return (
    <>
      <Script
        src="https://cdn.snipcart.com/themes/v3.0/default/snipcart.js"
        strategy="lazyOnload"
      />
      <link
        rel="stylesheet"
        href="https://cdn.snipcart.com/themes/v3.0/default/snipcart.css"
      />
      <div
        id="snipcart"
        data-api-key={process.env.NEXT_PUBLIC_SNIPCART_API_KEY}
        hidden
      />
      {children}
    </>
  );
}