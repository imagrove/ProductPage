// components/ProductCard.tsx
import Link from 'next/link';
import ProductImage from './ProductImage';

interface ProductCardProps {
  product: {
    title: string;
    description: string;
    price: number;
    image: string;
    sku: string;
    stock?: number;
    slug?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <ProductImage
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.slug ? (
            <Link href={`/products/${product.slug}`} className="hover:text-blue-600 transition-colors">
              {product.title}
            </Link>
          ) : (
            product.title
          )}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <button
            className="snipcart-add-item bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            data-item-id={product.sku}
            data-item-price={product.price}
            data-item-description={product.description}
            data-item-image={product.image}
            data-item-name={product.title}
            disabled={product.stock !== undefined && product.stock <= 0}
          >
            {product.stock !== undefined && product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
          </button>
        </div>
        {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
          <p className="text-sm text-orange-600 mt-2">Only {product.stock} left in stock!</p>
        )}
      </div>
    </div>
  );
}