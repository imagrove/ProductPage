/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/index.html', destination: '/', permanent: true },
      { source: '/products.html', destination: '/products', permanent: true },
      { source: '/product1.html', destination: '/products', permanent: true },
      { source: '/about.html', destination: '/about', permanent: true },
      { source: '/contact.html', destination: '/contact', permanent: true },
      { source: '/cases.html', destination: '/cases', permanent: true },
    ];
  },
};

export default nextConfig;
