// app/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import { getProducts, mockProducts, Product } from '@/lib/products';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        // Try to fetch products from TinaCMS
        const tinaProducts = await getProducts();
        
        // If TinaCMS returns empty or fails, use mock products
        const productsToShow = tinaProducts.length > 0 ? tinaProducts : mockProducts;
        setProducts(productsToShow);
      } catch (error) {
        console.error('Failed to load products from TinaCMS, using mock data:', error);
        setProducts(mockProducts);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12">Our Products</h1>
        
        {products.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}