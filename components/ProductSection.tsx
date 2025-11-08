'use client';

import ProductCard from './ProductCard';
import { IProduct } from '@/models/Product';

// Component for section titles with the requested styling
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mb-8">
    <h2 className="text-3xl font-semibold text-gray-800 relative inline-block pb-3">
      {children}
      <span className="absolute bottom-0 left-0 w-16 h-1 bg-black"></span>
    </h2>
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
  </div>
);

interface ProductSectionProps {
  title: string;
  products: IProduct[];
  onBuyClick: (product: IProduct) => void;
}

export default function ProductSection({ title, products, onBuyClick }: ProductSectionProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-12">
      <div className="container">
        <SectionTitle>{title}</SectionTitle>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onBuyClick={onBuyClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
}