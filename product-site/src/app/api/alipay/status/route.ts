import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get('orderId');

    if (!orderId) {
      return NextResponse.json(
        { error: 'Order ID is required' },
        { status: 400 }
      );
    }

    // Mock payment status for development
    // In production, this would query Alipay's API to get the actual payment status
    const mockPaymentStatus = {
      success: true,
      orderId: orderId,
      status: 'TRADE_SUCCESS', // Possible values: WAIT_BUYER_PAY, TRADE_SUCCESS, TRADE_CLOSED, TRADE_FINISHED
      tradeNo: `2024${Date.now()}`,
      buyerUserId: '2088102175953034',
      buyerLogonId: '159****5620',
      totalAmount: '99.00',
      currency: 'USD',
      timestamp: new Date().toISOString(),
      message: 'Payment completed successfully',
    };

    // Simulate different payment statuses based on orderId for testing
    const orderIdNum = parseInt(orderId.replace(/\D/g, ''));
    if (orderIdNum % 3 === 0) {
      mockPaymentStatus.status = 'TRADE_SUCCESS';
      mockPaymentStatus.message = 'Payment completed successfully';
    } else if (orderIdNum % 3 === 1) {
      mockPaymentStatus.status = 'WAIT_BUYER_PAY';
      mockPaymentStatus.message = 'Waiting for buyer payment';
    } else {
      mockPaymentStatus.status = 'TRADE_CLOSED';
      mockPaymentStatus.message = 'Payment timeout or cancelled';
    }

    return NextResponse.json(mockPaymentStatus);
  } catch (error) {
    console.error('Error checking Alipay payment status:', error);
    return NextResponse.json(
      { error: 'Failed to check payment status' },
      { status: 500 }
    );
  }
}

// Handle POST requests for payment notifications (webhook)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, tradeStatus, tradeNo } = body;

    if (!orderId || !tradeStatus) {
      return NextResponse.json(
        { error: 'Order ID and trade status are required' },
        { status: 400 }
      );
    }

    // In production, verify the signature and process the notification
    console.log(`Received Alipay notification for order ${orderId}:`, tradeStatus);

    // Process different trade statuses
    switch (tradeStatus) {
      case 'TRADE_SUCCESS':
        // Payment successful - update order status, send confirmation email, etc.
        console.log(`Payment successful for order ${orderId}`);
        break;
      case 'TRADE_CLOSED':
        // Payment closed - update order status
        console.log(`Payment closed for order ${orderId}`);
        break;
      case 'TRADE_FINISHED':
        // Payment finished - order completed
        console.log(`Payment finished for order ${orderId}`);
        break;
      default:
        console.log(`Unknown trade status: ${tradeStatus} for order ${orderId}`);
    }

    // Return success to Alipay
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error processing Alipay notification:', error);
    return NextResponse.json(
      { error: 'Failed to process notification' },
      { status: 500 }
    );
  }
}