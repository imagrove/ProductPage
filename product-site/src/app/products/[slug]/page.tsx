// app/products/[slug]/page.tsx
import { getProductBySlug, mockProducts } from '@/lib/products';
import ProductImage from '@/components/ProductImage';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  
  // Try to get product from TinaCMS, fallback to mock data
  let product = await getProductBySlug(slug);
  
  if (!product) {
    // Fallback to mock products for development
    product = mockProducts.find(p => p.slug === slug) || null;
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <ProductImage
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
              <p className="text-lg text-gray-600">{product.description}</p>
            </div>

            <div className="border-t border-b py-4">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-gray-900">${product.price}</span>
                <span className="text-sm text-gray-500">SKU: {product.sku}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">Stock:</span>
                <span className={`text-sm font-medium ${
                  product.stock && product.stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.stock && product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                </span>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed snipcart-add-item"
                data-item-id={product.sku}
                data-item-price={product.price}
                data-item-description={product.description}
                data-item-image={product.image}
                data-item-name={product.title}
                disabled={!product.stock || product.stock <= 0}
              >
                {!product.stock || product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>
            </div>

            {/* Product Description */}
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Product Details</h3>
              <p className="text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• High-quality materials and construction</li>
                <li>• Modern design and functionality</li>
                <li>• Perfect for everyday use</li>
                <li>• Excellent value for money</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}