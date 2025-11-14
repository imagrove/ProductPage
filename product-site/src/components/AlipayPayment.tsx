// components/AlipayPayment.tsx
'use client';

import { useState } from 'react';
import { createAlipayOrder, checkPaymentStatus } from '@/lib/alipay';

interface AlipayPaymentProps {
  orderData: {
    orderId: string;
    amount: number;
    currency: string;
    subject: string;
  };
  onPaymentComplete: (result: any) => void;
}

export default function AlipayPayment({ orderData, onPaymentComplete }: AlipayPaymentProps) {
  const [loading, setLoading] = useState(false);
  const [qrCode, setQrCode] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<string>('pending');

  const handleAlipayPayment = async () => {
    setLoading(true);
    try {
      const paymentResponse = await createAlipayOrder(orderData);
      
      if (paymentResponse.success) {
        setQrCode(paymentResponse.qrCode || '');
        
        // 开始轮询支付状态
        pollPaymentStatus(orderData.orderId);
      } else {
        console.error('Failed to create Alipay order:', paymentResponse.error);
      }
    } catch (error) {
      console.error('Alipay payment creation failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const pollPaymentStatus = async (orderId: string) => {
    const maxAttempts = 60; // 5 minutes (5 seconds * 60)
    let attempts = 0;
    
    const interval = setInterval(async () => {
      attempts++;
      const status = await checkPaymentStatus(orderId);
      setPaymentStatus(status);
      
      if (status === 'success' || status === 'paid') {
        clearInterval(interval);
        onPaymentComplete({ success: true, orderId });
      } else if (status === 'failed' || status === 'cancelled') {
        clearInterval(interval);
        onPaymentComplete({ success: false, orderId });
      } else if (attempts >= maxAttempts) {
        clearInterval(interval);
        setPaymentStatus('timeout');
      }
    }, 5000); // Check every 5 seconds
  };

  return (
    <div className="alipay-payment-container bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Alipay Payment</h3>
      
      {!qrCode ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">
            Click the button below to generate a QR code for Alipay payment.
          </p>
          <button 
            onClick={handleAlipayPayment}
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Generating QR Code...' : 'Pay with Alipay'}
          </button>
        </div>
      ) : (
        <div className="text-center">
          <div className="qr-code-container mb-4">
            <img 
              src={qrCode} 
              alt="Alipay Payment QR Code" 
              className="mx-auto max-w-xs"
            />
          </div>
          <p className="text-sm text-gray-600 mb-2">
            Scan this QR code with your Alipay app to complete the payment.
          </p>
          <div className="payment-status">
            {paymentStatus === 'pending' && (
              <p className="text-blue-600">⏳ Waiting for payment...</p>
            )}
            {paymentStatus === 'processing' && (
              <p className="text-yellow-600">🔄 Processing payment...</p>
            )}
            {paymentStatus === 'success' && (
              <p className="text-green-600">✅ Payment successful!</p>
            )}
            {paymentStatus === 'failed' && (
              <p className="text-red-600">❌ Payment failed. Please try again.</p>
            )}
            {paymentStatus === 'timeout' && (
              <p className="text-orange-600">⏰ Payment timeout. Please try again.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}