// app/products/page.tsx
'use client';

import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';

interface Product {
  title: string;
  description: string;
  price: number;
  image: string;
  sku: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟产品数据 - 在实际应用中，这里会从TinaCMS获取数据
    const mockProducts: Product[] = [
      {
        title: "Premium Headphones",
        description: "High-quality wireless headphones with noise cancellation and premium sound quality.",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop",
        sku: "headphones-001"
      },
      {
        title: "Smart Watch",
        description: "Advanced fitness tracking, heart rate monitoring, and smartphone notifications.",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=300&fit=crop",
        sku: "smartwatch-001"
      },
      {
        title: "Laptop Stand",
        description: "Ergonomic aluminum laptop stand for better posture and cooling.",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=300&fit=crop",
        sku: "laptop-stand-001"
      },
      {
        title: "Wireless Mouse",
        description: "Precision wireless mouse with ergonomic design and long battery life.",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=300&fit=crop",
        sku: "mouse-001"
      },
      {
        title: "Bluetooth Speaker",
        description: "Portable Bluetooth speaker with rich sound and waterproof design.",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=300&fit=crop",
        sku: "speaker-001"
      },
      {
        title: "Phone Case",
        description: "Durable phone case with military-grade protection and sleek design.",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1601593346740-925612772716?w=400&h=300&fit=crop",
        sku: "case-001"
      }
    ];

    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
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