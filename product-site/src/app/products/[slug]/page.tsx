// app/products/[slug]/page.tsx
import { getProductBySlug, mockProducts } from '@/lib/products';
import ProductPageClient from '@/components/ProductPageClient';

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

  // 使用客户端组件来支持TinaCMS编辑
  return <ProductPageClient product={product} slug={slug} />;
}