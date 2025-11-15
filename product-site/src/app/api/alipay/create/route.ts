// app/api/alipay/create/route.ts
import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

// 支付宝配置
const alipayConfig = {
  appId: process.env.ALIPAY_APP_ID,
  privateKey: process.env.ALIPAY_PRIVATE_KEY,
  publicKey: process.env.ALIPAY_PUBLIC_KEY,
  gatewayUrl: process.env.NEXT_PUBLIC_ALIPAY_GATEWAY_URL || 'https://openapi.alipay.com/gateway.do',
  signType: 'RSA2',
  charset: 'UTF-8',
  format: 'JSON',
  version: '1.0',
  productCode: 'OVERSEAS_MBARCODE_PAY',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, amount, currency, subject, description } = body;

    // 验证必要参数
    if (!orderId || !amount || !currency || !subject) {
      return NextResponse.json({
        success: false,
        error: 'Missing required parameters'
      }, { status: 400 });
    }

    // 构建支付宝请求参数
    const bizContent = {
      out_trade_no: orderId,
      total_amount: amount.toString(),
      subject: subject,
      body: description || subject,
      product_code: alipayConfig.productCode,
      currency: currency,
      timeout_express: '30m',
    };

    // 构建公共请求参数
    const publicParams = {
      app_id: alipayConfig.appId,
      method: 'alipay.trade.precreate',
      format: alipayConfig.format,
      charset: alipayConfig.charset,
      sign_type: alipayConfig.signType,
      timestamp: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
      version: alipayConfig.version,
      biz_content: JSON.stringify(bizContent),
    };

    // 生成签名
    const sign = generateSign(publicParams, alipayConfig.privateKey!);
    
    // 构建最终请求参数
    const requestParams = {
      ...publicParams,
      sign: sign,
    };

    // 模拟支付宝响应（实际应用中需要调用真实API）
    const mockResponse = {
      alipay_trade_precreate_response: {
        code: '10000',
        msg: 'Success',
        out_trade_no: orderId,
        qr_code: `https://qr.alipay.com/mock-${orderId}`,
      },
      sign: 'mock-sign-' + Date.now(),
    };

    // 实际API调用示例（需要真实环境）
    /*
    const response = await fetch(alipayConfig.gatewayUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: new URLSearchParams(requestParams).toString(),
    });

    const result = await response.json();
    */

    const response = mockResponse.alipay_trade_precreate_response;

    if (response.code === '10000') {
      return NextResponse.json({
        success: true,
        qrCode: response.qr_code,
        orderId: response.out_trade_no,
      });
    } else {
      return NextResponse.json({
        success: false,
        error: response.msg || 'Payment creation failed',
      }, { status: 400 });
    }

  } catch (error) {
    console.error('支付宝订单创建失败:', error);
    return NextResponse.json({
      success: false,
      error: 'Internal server error',
    }, { status: 500 });
  }
}

// 生成RSA签名
function generateSign(params: any, privateKey: string): string {
  // 参数排序
  const sortedParams = Object.keys(params)
    .filter(key => key !== 'sign' && params[key] !== undefined && params[key] !== '')
    .sort()
    .map(key => `${key}=${params[key]}`)
    .join('&');

  // 实际应用中需要使用真实的RSA私钥签名
  // 这里使用模拟签名
  return 'mock-rsa-sign-' + crypto.createHash('sha256').update(sortedParams + privateKey).digest('hex');
}