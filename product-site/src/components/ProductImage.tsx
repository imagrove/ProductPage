// components/ProductImage.tsx
'use client';

import { useState } from 'react';

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

export default function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleImageError = () => {
    if (!hasError) {
      setImageSrc('https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop');
      setHasError(true);
    }
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      className={className}
      onError={handleImageError}
    />
  );
}