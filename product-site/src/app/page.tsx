import Link from 'next/link';

export default function Home() {
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Product Store",
    "description": "Discover quality products with excellent customer service. Shop now and enjoy fast shipping worldwide.",
    "url": "https://your-domain.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://your-domain.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    },
    "sameAs": [
      "https://twitter.com/yourstore",
      "https://facebook.com/yourstore"
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 sm:py-20 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            Welcome to Product Store
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto px-2">
            Discover quality products with excellent customer service. Shop now and enjoy fast shipping worldwide.
          </p>
          <Link
            href="/products"
            className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Sample Product 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop"
                alt="Premium Headphones"
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Premium Headphones</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">High-quality wireless headphones with noise cancellation.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">$199.99</span>
                  <button
                    className="snipcart-add-item bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
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
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop"
                alt="Smart Watch"
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Smart Watch</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">Advanced fitness tracking and notifications.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">$299.99</span>
                  <button
                    className="snipcart-add-item bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
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
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop"
                alt="Laptop Stand"
                className="w-full h-48 sm:h-56 object-cover"
              />
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold mb-2">Laptop Stand</h3>
                <p className="text-gray-600 mb-4 text-sm sm:text-base">Ergonomic aluminum laptop stand for better posture.</p>
                <div className="flex justify-between items-center">
                  <span className="text-xl sm:text-2xl font-bold text-gray-900">$79.99</span>
                  <button
                    className="snipcart-add-item bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base"
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
          
          <div className="text-center mt-8 sm:mt-12">
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12">Why Choose Us?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🚚</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Fast Shipping</h3>
              <p className="text-gray-600 text-sm sm:text-base">Free worldwide shipping on all orders over $50.</p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">💎</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600 text-sm sm:text-base">Carefully curated selection of premium products.</p>
            </div>
            <div className="p-4 sm:p-6">
              <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">🛡️</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm sm:text-base">Multiple payment options including Alipay.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
