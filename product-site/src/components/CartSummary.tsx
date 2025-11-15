// components/CartSummary.tsx
'use client';

import { useEffect, useState } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CartSummary() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Listen for Snipcart events
    const updateCart = () => {
      if (window.Snipcart) {
        const cart = window.Snipcart.store.getState().cart;
        const items = cart.items.items.map((item: any) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
        }));
        setCartItems(items);
        setTotal(cart.total);
      }
    };

    // Initial cart update
    updateCart();

    // Listen for cart changes
    document.addEventListener('snipcart.cart.updated', updateCart);
    document.addEventListener('snipcart.item.added', updateCart);
    document.addEventListener('snipcart.item.removed', updateCart);

    return () => {
      document.removeEventListener('snipcart.cart.updated', updateCart);
      document.removeEventListener('snipcart.item.added', updateCart);
      document.removeEventListener('snipcart.item.removed', updateCart);
    };
  }, []);

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors z-50"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5 6m0 0h9M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6" />
        </svg>
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {itemCount}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-semibold">Shopping Cart</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {cartItems.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                          <p className="text-sm text-gray-500">${item.price} × {item.quantity}</p>
                        </div>
                        <p className="text-sm font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {cartItems.length > 0 && (
                <div className="border-t p-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-lg font-bold">${total.toFixed(2)}</span>
                  </div>
                  <button
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
                    onClick={() => {
                      window.Snipcart.api.theme.cart.open();
                      setIsOpen(false);
                    }}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}