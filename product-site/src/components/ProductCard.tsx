// components/ProductCard.tsx
import Link from 'next/link';
import ProductImage from './ProductImage';
import AddToCartButton from './AddToCartButton';

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
        {product.slug && (
          <div className="mb-4">
            <Link href={`/products/${product.slug}`} className="inline-block bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors text-sm">
              查看详情
            </Link>
          </div>
        )}
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <AddToCartButton
            id={product.sku}
            price={product.price}
            description={product.description}
            image={product.image}
            name={product.title}
            disabled={product.stock !== undefined && product.stock <= 0}
          >
            {product.stock !== undefined && product.stock <= 0 ? '缺货' : '加入购物车'}
          </AddToCartButton>
        </div>
        {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
          <p className="text-sm text-orange-600 mt-2">库存紧张，仅剩 {product.stock} 件</p>
        )}
      </div>
    </div>
  );
}