'use client';

import { useTina } from 'tinacms/dist/react';
import ProductImage from '@/components/ProductImage';
import AddToCartButton from '@/components/AddToCartButton';

interface Product {
  title: string;
  description: string;
  price: number;
  image: string;
  sku: string;
  stock: number;
  slug: string;
}

interface ProductPageClientProps {
  product: Product;
  slug: string;
}

export default function ProductPageClient({ product: initialProduct, slug }: ProductPageClientProps) {
  // 使用TinaCMS的useTina钩子来实现编辑功能
  const { data: product } = useTina({
    query: `
      query GetProduct($relativePath: String!) {
        product(relativePath: $relativePath) {
          title
          description
          price
          image
          sku
          stock
          slug
        }
      }
    `,
    variables: { relativePath: `${slug}.md` },
    data: initialProduct,
  });

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-lg overflow-hiddscm-history-item:/Users/ljl_manage/GIT_SMART_HARDWARE_PROS/TARE-SOLO-PROS/ProductPage?%7B%22repositoryId%22%3A%22scm0%22%2C%22historyItemId%22%3A%22566ec6f60468b7056ffd90c383cfc648c017247f%22%2C%22historyItemParentId%22%3A%222bdca0f378540d271425ff724a7ddd67d7ae5980%22%2C%22historyItemDisplayId%22%3A%22566ec6f%22%7Den">
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
                <span className="text-sm text-gray-500">SKU：{product.sku}</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">库存：</span>
                <span className={`text-sm font-medium ${
                  product.stock && product.stock > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {product.stock && product.stock > 0 ? `有货（${product.stock} 件）` : '缺货'}
                </span>
              </div>

              <AddToCartButton
                id={product.sku}
                price={product.price}
                description={product.description}
                image={product.image}
                name={product.title}
                disabled={!product.stock || product.stock <= 0}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {!product.stock || product.stock <= 0 ? '缺货' : '加入购物车'}
              </AddToCartButton>
            </div>

            {/* Product Description */}
            <div className="prose prose-gray max-w-none">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">产品详情</h3>
              <p className="text-gray-600">
                {product.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">核心特性</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• 高品质材料与做工</li>
                <li>• 现代化设计与功能</li>
                <li>• 适合日常使用场景</li>
                <li>• 具有出色性价比</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}