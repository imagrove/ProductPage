// app/api/alipay/notify/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const params = new URLSearchParams(body);
    
    // 获取支付宝回调参数
    const out_trade_no = params.get('out_trade_no');
    const trade_status = params.get('trade_status');
    const total_amount = params.get('total_amount');
    const sign = params.get('sign');
    
    // 验证签名（实际应用中需要实现签名验证逻辑）
    const isValidSignature = await verifyAlipaySignature(params);
    
    if (!isValidSignature) {
      return NextResponse.json({ 
        success: false, 
        message: 'Invalid signature' 
      }, { status: 400 });
    }
    
    // 处理支付状态
    if (trade_status === 'TRADE_SUCCESS' || trade_status === 'TRADE_FINISHED') {
      // 更新订单状态
      await updateOrderStatus(out_trade_no!, 'paid', parseFloat(total_amount!));
      
      // 通知Snipcart更新订单状态
      await notifySnipcartOrder(out_trade_no!, 'completed');
      
      return NextResponse.json({ 
        success: true, 
        message: 'Payment processed successfully' 
      });
    }
    
    return NextResponse.json({ 
      success: false, 
      message: 'Payment not successful' 
    });
    
  } catch (error) {
    console.error('Alipay notification error:', error);
    return NextResponse.json({ 
      success: false, 
      message: 'Internal server error' 
    }, { status: 500 });
  }
}

// 验证支付宝签名（简化版本）
async function verifyAlipaySignature(params: URLSearchParams): Promise<boolean> {
  // 实际应用中需要实现完整的签名验证逻辑
  // 这里返回true作为示例
  return true;
}

// 更新订单状态
async function updateOrderStatus(orderId: string, status: string, amount: number): Promise<void> {
  // 实际应用中需要连接数据库更新订单状态
  console.log(`Updating order ${orderId} to status: ${status}, amount: ${amount}`);
}

// 通知Snipcart更新订单
async function notifySnipcartOrder(orderId: string, status: string): Promise<void> {
  // 实际应用中需要调用Snipcart API更新订单状态
  console.log(`Notifying Snipcart about order ${orderId} status: ${status}`);
}