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
  excerpt?: string;
  category?: string;
  published?: boolean;
}

// TinaCMS client functions - now using actual TinaCMS data
export async function getProducts(onlyPublished: boolean = true): Promise<Product[]> {
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
          const base: Product = {
            id: node.id,
            title: node.title,
            description: node.description,
            price: node.price,
            image: node.image,
            sku: node.sku,
            stock: node.stock,
            slug: node.slug,
            excerpt: (node as any).excerpt || (node.description ? String(node.description).slice(0, 120) : ''),
            category: (node as any).category,
            published: (node as any).published ?? true,
          };
          return base;
        });
      const filtered = onlyPublished ? products.filter(p => p.published) : products;
      console.log(`Successfully fetched ${products.length} products from TinaCMS`);
      return filtered;
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
    const products = await getProducts(false);
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
    id: 'p-ctrl-001',
    title: '智能展馆多媒体中控系统',
    description: '基于 ESP32 的高性能、高可靠的展馆设备集中控制解决方案。',
    excerpt: '高性能中控，集中管理展馆设备，支持群组与场景联动。',
    price: 9999,
    image: '/images/products/webcam.svg',
    sku: 'CTRL-001',
    stock: 10,
    slug: 'central-control-system',
    category: 'control',
    published: true,
  },
  {
    id: 'p-ctrl-002',
    title: 'ESP32 智能控制面板',
    description: '高性能触控控制面板，支持多设备控制和场景切换。',
    excerpt: '7 英寸触屏，WiFi+BLE 通信，IP65 防护，支持离线运行。',
    price: 2999,
    image: '/images/products/smartwatch.svg',
    sku: 'CTRL-002',
    stock: 30,
    slug: 'esp32-control-panel',
    category: 'control',
    published: true,
  },
  {
    id: 'p-disp-001',
    title: '智能投影系统',
    description: '支持几何校正与边缘融合的高性能投影系统。',
    excerpt: '4K 超清，自动几何校正，多机联动，激光光源。',
    price: 39999,
    image: '/images/products/gaming-mouse.svg',
    sku: 'DISP-001',
    stock: 8,
    slug: 'smart-projection-system',
    category: 'display',
    published: true,
  },
  {
    id: 'p-term-001',
    title: '嵌入式播放终端',
    description: 'Linux 播放器，内置 GPU 硬件加速与 H5 页面渲染。',
    excerpt: '支持 4K 解码，7x24 稳定运行，远程内容更新。',
    price: 5999,
    image: '/images/products/speaker.svg',
    sku: 'TERM-001',
    stock: 25,
    slug: 'embedded-player',
    category: 'terminal',
    published: true,
  },
  {
    id: 'p-app-001',
    title: '平板控制应用',
    description: '面向管理人员的集中控制应用，支持多展项管理。',
    excerpt: '可视化界面，多级权限，场景一键切换，设备状态监控。',
    price: 0,
    image: '/images/products/headphones.svg',
    sku: 'APP-001',
    stock: 9999,
    slug: 'tablet-control-app',
    category: 'app',
    published: true,
  },
  {
    id: 'p-ctrl-003',
    title: '智能设备控制模块',
    description: '支持多协议的设备控制模块，适配多种展览设备。',
    excerpt: '继电器电源控制、RS232、红外发射、WiFi 远程控制。',
    price: 1299,
    image: '/images/products/webcam.svg',
    sku: 'CTRL-003',
    stock: 40,
    slug: 'device-control-module',
    category: 'control',
    published: true,
  },
];