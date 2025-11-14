// lib/alipay.ts
export interface AlipayOrderData {
  orderId: string;
  amount: number;
  currency: string;
  subject: string;
  description?: string;
}

export interface AlipayResponse {
  success: boolean;
  qrCode?: string;
  paymentUrl?: string;
  error?: string;
}

export async function createAlipayOrder(orderData: AlipayOrderData): Promise<AlipayResponse> {
  try {
    const response = await fetch('/api/alipay/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error('Failed to create Alipay order');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating Alipay order:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

export async function checkPaymentStatus(orderId: string): Promise<string> {
  try {
    const response = await fetch(`/api/alipay/status?orderId=${orderId}`);
    const data = await response.json();
    return data.status;
  } catch (error) {
    console.error('Error checking payment status:', error);
    return 'error';
  }
}

export function verifyAlipaySignature(params: URLSearchParams): boolean {
  // 实际应用中需要实现完整的签名验证逻辑
  // 这里返回true作为示例
  return true;
}