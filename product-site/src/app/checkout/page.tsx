// app/checkout/page.tsx
'use client';

import PaymentMethods from '@/components/PaymentMethods';
import { useState } from 'react';

export default function CheckoutPage() {
  // 模拟订单数据 - 实际应用中应该从购物车状态获取
  const [orderData] = useState({
    orderId: 'ORDER-' + Date.now(),
    amount: 199.99,
    currency: 'USD',
    subject: 'Product Store Purchase'
  });

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${orderData.amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping:</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-semibold">
                    <span>Total:</span>
                    <span>${orderData.amount.toFixed(2)}</span>
                  </div>
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