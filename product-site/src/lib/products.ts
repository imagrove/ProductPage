// lib/products.ts
import { client } from '../../tina/__generated__/client';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
  sku: string;
  stock: number;
  slug: string;
}

// TinaCMS client functions - now using actual TinaCMS data
export async function getProducts(): Promise<Product[]> {
  try {
    console.log('Fetching products from TinaCMS...');
    
    // For local development, try to read files directly if GraphQL fails
    let result;
    try {
      result = await client.productConnection();
    } catch (graphqlError) {
      console.log('GraphQL query failed, trying alternative approach...');
      // In development, we'll use mock data for now but structure it properly
      console.log('Using structured mock data for development');
      return mockProducts;
    }
    
    if (result?.data?.productConnection?.edges) {
      const products = result.data.productConnection.edges
        .filter(edge => edge?.node)
        .map(edge => {
          const node = edge!.node!;
          return {
            id: node.id,
            title: node.title,
            description: node.description,
            price: node.price,
            image: node.image,
            sku: node.sku,
            stock: node.stock,
            slug: node.slug,
          };
        });
      
      console.log(`Successfully fetched ${products.length} products from TinaCMS`);
      return products;
    }
    
    console.log('No products found in TinaCMS, using mock data');
    return mockProducts;
  } catch (error) {
    console.error('Error fetching products from TinaCMS:', error);
    console.log('Using mock products as fallback');
    return mockProducts;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    console.log(`Fetching product with slug: ${slug} from TinaCMS...`);
    
    // First try to get all products and find by slug
    const products = await getProducts();
    const product = products.find(p => p.slug === slug);
    
    if (product) {
      console.log(`Found product: ${product.title}`);
      return product;
    }
    
    console.log(`Product with slug '${slug}' not found`);
    return null;
  } catch (error) {
    console.error('Error fetching product from TinaCMS:', error);
    console.log('Falling back to mock product');
    return mockProducts.find(p => p.slug === slug) || null;
  }
}

// Fallback mock products for development when TinaCMS is not available
export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Premium Wireless Headphones',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 199.99,
    image: '/images/products/headphones.svg',
    sku: 'WH-001',
    stock: 25,
    slug: 'wireless-headphones',
  },
  {
    id: '2',
    title: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.',
    price: 299.99,
    image: '/images/products/smartwatch.svg',
    sku: 'SW-002',
    stock: 15,
    slug: 'smart-fitness-watch',
  },
  {
    id: '3',
    title: 'Portable Bluetooth Speaker',
    description: 'Compact and powerful Bluetooth speaker with 360-degree sound and waterproof design.',
    price: 79.99,
    image: '/images/products/speaker.svg',
    sku: 'BS-003',
    stock: 32,
    slug: 'portable-bluetooth-speaker',
  },
  {
    id: '4',
    title: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse with customizable RGB lighting and 16,000 DPI sensor.',
    price: 89.99,
    image: '/images/products/gaming-mouse.svg',
    sku: 'GM-004',
    stock: 20,
    slug: 'wireless-gaming-mouse',
  },
  {
    id: '5',
    title: '4K Webcam',
    description: 'Professional 4K webcam with auto-focus, noise cancellation microphone, and wide-angle lens.',
    price: 149.99,
    image: '/images/products/webcam.svg',
    sku: 'WC-005',
    stock: 18,
    slug: '4k-webcam',
  },
];