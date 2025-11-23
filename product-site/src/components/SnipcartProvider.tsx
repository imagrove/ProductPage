// components/SnipcartProvider.tsx
'use client';

import Script from 'next/script';
import { useEffect } from 'react';

interface SnipcartProviderProps {
  children: React.ReactNode;
}

export default function SnipcartProvider({ children }: SnipcartProviderProps) {
  useEffect(() => {
    const w = window as any;
    const close = () => {
      if (w?.Snipcart?.api?.theme?.cart?.close) {
        w.Snipcart.api.theme.cart.close();
      }
    };
    const closeAndClean = () => {
      if (location.hash && location.hash.startsWith('#/')) {
        history.replaceState(null, '', location.pathname + location.search);
      }
      close();
    };
    const createOverlay = () => {
      const id = 'snipcart-ext-overlay';
      if (document.getElementById(id)) return;
      const el = document.createElement('div');
      el.id = id;
      el.style.position = 'fixed';
      const hv = getComputedStyle(document.documentElement).getPropertyValue('--header-height');
      el.style.top = hv && hv.trim() !== '' ? hv : '0px';
      el.style.left = '0';
      el.style.width = '50vw';
      el.style.height = `calc(100vh - ${hv && hv.trim() !== '' ? hv : '0px'})`;
      el.style.zIndex = '2147483647';
      el.style.background = 'transparent';
      el.style.cursor = 'pointer';
      el.style.pointerEvents = 'auto';
      el.onclick = () => closeAndClean();
      document.body.appendChild(el);
    };
    const removeOverlay = () => {
      const el = document.getElementById('snipcart-ext-overlay');
      if (el && el.parentNode) el.parentNode.removeChild(el);
    };
    const onOpened = () => {
      const handler = (e: Event) => {
        const container = document.querySelector('#snipcart .snipcart-modal__container') as HTMLElement | null;
        const t = e.target as HTMLElement | null;
        if (!container) {
          closeAndClean();
          return;
        }
        if (t && container.contains(t)) return;
        if (t && t.closest('.snipcart-checkout')) {
          e.preventDefault();
          e.stopPropagation();
          closeAndClean();
          return;
        }
        const r = container.getBoundingClientRect();
        const x = (e as any).clientX ?? ((e as TouchEvent).touches?.[0]?.clientX);
        const y = (e as any).clientY ?? ((e as TouchEvent).touches?.[0]?.clientY);
        if (typeof x === 'number' && typeof y === 'number') {
          if (x < r.left || x > r.right || y < r.top || y > r.bottom) {
            closeAndClean();
          }
        } else {
          closeAndClean();
        }
      };
      document.addEventListener('mousedown', handler as any, true);
      document.addEventListener('touchstart', handler as any, true);
      document.addEventListener('click', handler as any, true);
      (w as any)._snipcartOutsideClickHandler = handler;
      const overlay = document.querySelector('#snipcart .snipcart-modal__overlay') as HTMLElement | null;
      if (overlay) {
        overlay.onclick = () => closeAndClean();
      }
      const keyHandler = (ev: KeyboardEvent) => {
        if (ev.key === 'Escape') {
          closeAndClean();
        }
      };
      document.addEventListener('keydown', keyHandler as any, true);
      (w as any)._snipcartKeyHandler = keyHandler;
      createOverlay();
    };
    const onClosed = () => {
      const h = (w as any)._snipcartOutsideClickHandler as any;
      if (h) {
        document.removeEventListener('mousedown', h, true);
        document.removeEventListener('touchstart', h, true);
        document.removeEventListener('click', h, true);
        (w as any)._snipcartOutsideClickHandler = null;
      }
      const kh = (w as any)._snipcartKeyHandler as any;
      if (kh) {
        document.removeEventListener('keydown', kh, true);
        (w as any)._snipcartKeyHandler = null;
      }
      removeOverlay();
    };
    const registerBus = () => {
      if (w?.Snipcart?.events?.on) {
        w.Snipcart.events.on('cart.opened', onOpened);
        w.Snipcart.events.on('cart.closed', onClosed);
      }
    };
    const registerDom = () => {
      document.addEventListener('snipcart.cart.opened', onOpened as EventListener);
      document.addEventListener('snipcart.cart.closed', onClosed as EventListener);
    };
    if (w?.Snipcart?.events?.on) {
      registerBus();
    } else {
      document.addEventListener('snipcart.ready', registerBus as EventListener, { once: true } as any);
    }
    registerDom();
    const globalClose = (e: Event) => {
      const container = document.querySelector('#snipcart .snipcart-modal__container') as HTMLElement | null;
      const t = e.target as HTMLElement | null;
      const open = !!container || (location.hash && location.hash.startsWith('#/'));
      if (!open) return;
      if (container && t && container.contains(t)) return;
      e.preventDefault();
      e.stopPropagation();
      if (location.hash && location.hash.startsWith('#/')) {
        history.replaceState(null, '', location.pathname + location.search);
      }
      if ((window as any)?.Snipcart?.api?.theme?.cart?.close) {
        (window as any).Snipcart.api.theme.cart.close();
      }
    };
    document.addEventListener('pointerdown', globalClose as EventListener, true);
    document.addEventListener('click', globalClose as EventListener, true);
    const onHash = () => {
      if (location.hash && location.hash.startsWith('#/')) {
        history.replaceState(null, '', location.pathname + location.search);
      }
    };
    window.addEventListener('hashchange', onHash as EventListener, true);
    return () => {
      onClosed();
      document.removeEventListener('snipcart.cart.opened', onOpened as EventListener);
      document.removeEventListener('snipcart.cart.closed', onClosed as EventListener);
      document.removeEventListener('pointerdown', globalClose as EventListener, true);
      document.removeEventListener('click', globalClose as EventListener, true);
      window.removeEventListener('hashchange', onHash as EventListener, true);
    };
  }, []);
  const apiKey = process.env.NEXT_PUBLIC_SNIPCART_API_KEY;
  const currency = process.env.NEXT_PUBLIC_SNIPCART_CURRENCY || 'USD';
  const disabled = process.env.NEXT_PUBLIC_DISABLE_SNIPCART === 'true';
  if (!apiKey || disabled) {
    return <>{children}</>;
  }
  return (
    <>
      <Script id="snipcart-settings" strategy="afterInteractive">
        {`window.SnipcartSettings = { currency: '${currency}', loadStrategy: 'onload', publicApiKey: '${apiKey}' };`}
      </Script>
      <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.0/default/snipcart.css" />
      <div id="snipcart" data-api-key={apiKey} hidden />
      <Script src="https://cdn.snipcart.com/themes/v3.0/default/snipcart.js" strategy="afterInteractive" />
      {children}
    </>
  );
}