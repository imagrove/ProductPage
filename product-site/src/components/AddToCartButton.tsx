'use client';

import { useCallback, useEffect, useState } from 'react';

interface AddToCartButtonProps {
  id: string;
  price: number;
  description: string;
  image: string;
  name: string;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export default function AddToCartButton({ id, price, description, image, name, disabled, className, children }: AddToCartButtonProps) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  useEffect(() => {
    if (status === 'idle') return;
    const t = setTimeout(() => setStatus('idle'), 2500);
    return () => clearTimeout(t);
  }, [status]);

  const onAdd = useCallback(async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    const payload = {
      id,
      name,
      price,
      url: (typeof window !== 'undefined' ? window.location.href : `/${id}`),
      description,
      image,
      quantity: 1,
    } as any;
    try {
      const anyWindow = window as any;
      const ensureCartClosed = () => {
        if (anyWindow?.Snipcart?.api?.theme?.cart?.close) {
          anyWindow.Snipcart.api.theme.cart.close();
        }
      };
      if (anyWindow?.Snipcart?.events?.on) {
        anyWindow.Snipcart.events.on('cart.opened', ensureCartClosed);
      }
      const addWithApi = async () => {
        if (anyWindow?.Snipcart?.api?.cart?.items?.add) {
          await anyWindow.Snipcart.api.cart.items.add(payload);
        } else if (anyWindow?.Snipcart?.api?.cart?.addItem) {
          await anyWindow.Snipcart.api.cart.addItem(payload, { openCart: false });
        } else {
          throw new Error('Snipcart API not available');
        }
        ensureCartClosed();
        setTimeout(ensureCartClosed, 50);
        setTimeout(ensureCartClosed, 300);
        setStatus('success');
      };

      if (anyWindow?.Snipcart?.api?.cart?.addItem) {
        await addWithApi();
      } else {
        const start = Date.now();
        await new Promise<void>((resolve, reject) => {
          const int = setInterval(async () => {
            if (anyWindow?.Snipcart?.api?.cart?.items?.add || anyWindow?.Snipcart?.api?.cart?.addItem) {
              clearInterval(int);
              try {
                await addWithApi();
                resolve();
              } catch (err) {
                reject(err);
              }
            } else if (Date.now() - start > 5000) {
              clearInterval(int);
              reject(new Error('Snipcart not ready'));
            }
          }, 200);
        });
      }
    } catch {
      setStatus('error');
    }
  }, [id, price, description, image, name, disabled]);

  return (
    <>
      <button
        onClick={onAdd}
        disabled={disabled}
        className={className || 'bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'}
      >
        {children || 'Add to Cart'}
      </button>
      {status !== 'idle' && (
        <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-md shadow-lg text-white ${status === 'success' ? 'bg-green-600' : 'bg-red-600'}`} role="alert" aria-live="polite">
          {status === 'success' ? '已添加到购物车' : '添加失败，请重试'}
        </div>
      )}
    </>
  );
}