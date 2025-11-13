'use client';

import { useEffect, useState } from 'react';
import { customEvent } from './google-analytics';

// Snipcart产品类型定义
export interface SnipcartProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  quantity?: number;
  customFields?: Array<{
    name: string;
    type: string;
    required?: boolean;
    options?: string[];
    value?: string;
  }>;
}

// 检查是否支持window对象
const isBrowser = typeof window !== 'undefined';

// 添加到购物车函数
export const addToCart = (product: SnipcartProduct) => {
  if (!isBrowser || !window.Snipcart || !window.Snipcart.api?.cart?.items?.add) {
    console.warn('Snipcart尚未加载');
    return;
  }
  
  try {
    // 类型安全地添加到购物车
    window.Snipcart.api.cart.items.add({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      description: product.description,
      quantity: product.quantity || 1,
      customFields: product.customFields || [],
    } as const);
    
    // 记录添加购物车事件到Google Analytics
    customEvent({
      name: 'add_to_cart',
      params: {
        product_id: product.id,
        product_name: product.name,
        price: product.price,
        quantity: product.quantity || 1,
      }
    });
    
    return true;
  } catch (error) {
    console.error('添加到购物车失败:', error);
    return false;
  }
};

// 打开购物车函数
export const openCart = () => {
  if (!isBrowser || !window.Snipcart) {
    console.warn('Snipcart尚未加载');
    return;
  }
  
  try {
    window.Snipcart.api.modal.open();
    
    // 记录打开购物车事件到Google Analytics
    customEvent({
      name: 'cart_view',
      params: {
        timestamp: new Date().toISOString(),
      }
    });
  } catch (error) {
    console.error('打开购物车失败:', error);
  }
};

// 关闭购物车函数
export const closeCart = () => {
  if (!isBrowser || !window.Snipcart) {
    console.warn('Snipcart尚未加载');
    return;
  }
  
  try {
    window.Snipcart.api.modal.close();
  } catch (error) {
    console.error('关闭购物车失败:', error);
  }
};

// 获取购物车项目数量
export const getCartItemsCount = (): number => {
  if (!isBrowser || !window.Snipcart) {
    return 0;
  }
  
  try {
    return window.Snipcart.api.cart.getItemsCount();
  } catch (error) {
    console.error('获取购物车数量失败:', error);
    return 0;
  }
};

// 清空购物车
export const clearCart = () => {
  if (!isBrowser || !window.Snipcart) {
    console.warn('Snipcart尚未加载');
    return;
  }
  
  try {
    window.Snipcart.api.cart.clear();
  } catch (error) {
    console.error('清空购物车失败:', error);
  }
};

// 购物车状态钩子
export const useSnipcart = () => {
  const [itemsCount, setItemsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    if (!isBrowser) {
      setIsLoading(false);
      setError('不支持的环境');
      return;
    }
    
    // 等待Snipcart加载完成
    const waitForSnipcart = () => {
      if (window.Snipcart) {
        // 初始化购物车数量
        setItemsCount(window.Snipcart.api.cart.getItemsCount());
        setIsLoading(false);
        
        // 监听购物车变化事件
        window.Snipcart.events.on('cart.closed', () => {
          setItemsCount(window.Snipcart.api.cart.getItemsCount());
        });
        
        window.Snipcart.events.on('cart.ready', () => {
          setItemsCount(window.Snipcart.api.cart.getItemsCount());
        });
        
        window.Snipcart.events.on('item.added', () => {
          setItemsCount(window.Snipcart.api.cart.getItemsCount());
        });
        
        window.Snipcart.events.on('item.removed', () => {
          setItemsCount(window.Snipcart.api.cart.getItemsCount());
        });
        
        window.Snipcart.events.on('item.quantityChanged', () => {
          setItemsCount(window.Snipcart.api.cart.getItemsCount());
        });
        
        return true;
      }
      
      // 如果Snipcart还未加载，延迟重试
      setTimeout(() => {
        waitForSnipcart();
      }, 500);
      
      return false;
    };
    
    // 设置超时，避免无限等待
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setError('Snipcart加载超时');
      }
    }, 10000);
    
    waitForSnipcart();
    
    // 清理函数
    return () => {
      clearTimeout(timeoutId);
      
      if (window.Snipcart) {
        try {
          window.Snipcart.events.off('cart.closed');
          window.Snipcart.events.off('cart.ready');
          window.Snipcart.events.off('item.added');
          window.Snipcart.events.off('item.removed');
          window.Snipcart.events.off('item.quantityChanged');
        } catch (e) {
          console.error('清理Snipcart事件监听器失败:', e);
        }
      }
    };
  }, [isLoading]);
  
  return {
    itemsCount,
    isLoading,
    error,
    addToCart,
    openCart,
    closeCart,
    clearCart,
  };
};

// 声明Snipcart全局类型，避免TypeScript错误
declare global {
  interface Window {
    Snipcart: {
      api: {
        cart: {
          items: {
            add: (product: SnipcartProduct) => void;
          };
          getItemsCount: () => number;
          clear: () => void;
        };
        modal: {
          open: () => void;
          close: () => void;
        };
      };
      events: {
        on: (event: string, callback: () => void) => void;
        off: (event: string, callback?: () => void) => void;
      };
    };
  }
};