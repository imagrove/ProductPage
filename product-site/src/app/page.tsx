import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to Product Store
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            Discover quality products with excellent customer service. Shop now and enjoy fast shipping worldwide.
          </p>
          <Link
            href="/products"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Products</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Sample Product 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
                alt="Premium Headphones"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Premium Headphones</h3>
                <p className="text-gray-600 mb-4">High-quality wireless headphones with noise cancellation.</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">$199.99</span>
                  <button
                    className="snipcart-add-item bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    data-item-id="headphones-001"
                    data-item-price="199.99"
                    data-item-description="Premium wireless headphones with noise cancellation"
                    data-item-image="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
                    data-item-name="Premium Headphones"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Sample Product 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop"
                alt="Smart Watch"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Smart Watch</h3>
                <p className="text-gray-600 mb-4">Advanced fitness tracking and notifications.</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">$299.99</span>
                  <button
                    className="snipcart-add-item bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    data-item-id="smartwatch-001"
                    data-item-price="299.99"
                    data-item-description="Advanced fitness tracking and notifications"
                    data-item-image="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop"
                    data-item-name="Smart Watch"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* Sample Product 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop"
                alt="Laptop Stand"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Laptop Stand</h3>
                <p className="text-gray-600 mb-4">Ergonomic aluminum laptop stand for better posture.</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">$79.99</span>
                  <button
                    className="snipcart-add-item bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    data-item-id="laptop-stand-001"
                    data-item-price="79.99"
                    data-item-description="Ergonomic aluminum laptop stand for better posture"
                    data-item-image="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop"
                    data-item-name="Laptop Stand"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600">Free worldwide shipping on all orders over $50.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">💎</div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">Carefully curated selection of premium products.</p>
            </div>
            <div className="p-6">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600">Multiple payment options including Alipay.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
