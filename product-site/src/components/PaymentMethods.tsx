// components/PaymentMethods.tsx
'use client';

import { useState } from 'react';
import AlipayPayment from './AlipayPayment';

interface PaymentMethodsProps {
  orderData: {
    orderId: string;
    amount: number;
    currency: string;
    subject: string;
  };
}

export default function PaymentMethods({ orderData }: PaymentMethodsProps) {
  const [selectedMethod, setSelectedMethod] = useState<string>('snipcart');
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [paymentResult, setPaymentResult] = useState<any>(null);

  const handlePaymentComplete = (result: any) => {
    setPaymentComplete(true);
    setPaymentResult(result);
  };

  if (paymentComplete) {
    return (
      <div className="payment-result bg-white p-6 rounded-lg shadow-md text-center">
        {paymentResult.success ? (
          <div className="success-message">
            <div className="text-6xl mb-4">🎉</div>
            <h3 className="text-xl font-semibold text-green-600 mb-2">Payment Successful!</h3>
            <p className="text-gray-600 mb-4">
              Your order has been processed successfully. Thank you for your purchase!
            </p>
            <p className="text-sm text-gray-500">
              Order ID: {paymentResult.orderId}
            </p>
          </div>
        ) : (
          <div className="error-message">
            <div className="text-6xl mb-4">❌</div>
            <h3 className="text-xl font-semibold text-red-600 mb-2">Payment Failed</h3>
            <p className="text-gray-600 mb-4">
              There was an issue processing your payment. Please try again or contact support.
            </p>
            <button
              onClick={() => {
                setPaymentComplete(false);
                setPaymentResult(null);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="payment-methods bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Choose Payment Method</h3>
      
      <div className="space-y-4 mb-6">
        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment-method"
            value="snipcart"
            checked={selectedMethod === 'snipcart'}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="mr-3"
          />
          <div className="flex-1">
            <div className="font-medium">Credit/Debit Card</div>
            <div className="text-sm text-gray-500">Secure payment via Snipcart</div>
          </div>
          <div className="text-2xl">💳</div>
        </label>

        <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-gray-50">
          <input
            type="radio"
            name="payment-method"
            value="alipay"
            checked={selectedMethod === 'alipay'}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="mr-3"
          />
          <div className="flex-1">
            <div className="font-medium">Alipay</div>
            <div className="text-sm text-gray-500">Pay with Alipay (支付宝)</div>
          </div>
          <div className="text-2xl">💰</div>
        </label>
      </div>

      {selectedMethod === 'snipcart' && (
        <div className="snipcart-checkout-section">
          <p className="text-gray-600 mb-4">
            You will be redirected to our secure payment gateway to complete your purchase.
          </p>
          <button 
            className="snipcart-checkout w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue to Payment
          </button>
        </div>
      )}

      {selectedMethod === 'alipay' && (
        <AlipayPayment 
          orderData={orderData}
          onPaymentComplete={handlePaymentComplete}
        />
      )}
    </div>
  );
}