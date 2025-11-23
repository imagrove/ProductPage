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
          <h1 className="text-2xl font-bold text-gray-900 mb-4">未找到该产品</h1>
          <p className="text-gray-600">您查找的产品不存在。</p>
        </div>
      </div>
    );
  }

  // 使用客户端组件来支持TinaCMS编辑
  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.image ? [product.image] : undefined,
    sku: product.sku,
    url: `${site}/products/${product.slug}`,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'CNY',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
    },
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductPageClient product={product} slug={slug} />
    </>
  );
}