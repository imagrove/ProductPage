// components/ProductCard.tsx
interface ProductCardProps {
  product: {
    title: string;
    description: string;
    price: number;
    image: string;
    sku: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold text-gray-900">${product.price}</span>
          <button
            className="snipcart-add-item bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            data-item-id={product.sku}
            data-item-price={product.price}
            data-item-description={product.description}
            data-item-image={product.image}
            data-item-name={product.title}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}