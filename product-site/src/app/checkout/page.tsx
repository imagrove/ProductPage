// app/checkout/page.tsx
'use client';

import PaymentMethods from '@/components/PaymentMethods';
import { useState, useEffect } from 'react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get cart data from Snipcart
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
        setLoading(false);
      }
    };

    // Initial cart update
    updateCart();

    // Listen for cart changes
    document.addEventListener('snipcart.cart.updated', updateCart);

    return () => {
      document.removeEventListener('snipcart.cart.updated', updateCart);
    };
  }, []);

  const orderData = {
    orderId: 'ORDER-' + Date.now(),
    amount: total,
    currency: 'USD',
    subject: 'Product Store Purchase'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products to your cart before checking out.</p>
          <a href="/products" className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-2xl font-bold text-blue-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <PaymentMethods orderData={orderData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}