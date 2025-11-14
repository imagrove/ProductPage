// app/cart/page.tsx
'use client';

export default function CartPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>
        
        <div className="max-w-4xl mx-auto">
          <div className="snipcart-cart-summary">
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-semibold mb-4">Your Shopping Cart</h2>
              <p className="text-gray-600 mb-6">
                Review your items and proceed to checkout when you're ready.
              </p>
              <button 
                className="snipcart-checkout bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
          
          {/* Snipcart will inject the cart content here */}
          <div id="snipcart-cart-content" className="mt-8">
            <p className="text-center text-gray-500">
              Cart contents will appear here when you add items.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}