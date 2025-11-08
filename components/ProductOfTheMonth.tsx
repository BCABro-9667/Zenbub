'use client';

import Link from 'next/link';
import { IProduct } from '@/models/Product';
import { formatPrice } from '@/lib/utils';

interface ProductOfTheMonthProps {
  product: IProduct;
  onBuyClick: (product: IProduct) => void;
}

export default function ProductOfTheMonth({ product, onBuyClick }: ProductOfTheMonthProps) {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container">
        <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
            <div>
              <h2 className="text-3xl font-bold mb-4">Product of the Month</h2>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{product.name}</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Premium cutting-edge industrial materials. Features advanced cooling system, AI state management for cutting depth, and nano-materials for optimal performance.
              </p>
              <div className="mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-gray-900">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && product.comparePrice > product.price && (
                    <span className="text-xl text-gray-400 line-through">
                      {formatPrice(product.comparePrice)}
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => onBuyClick(product)}
                className="bg-black hover:bg-gray-800 text-white px-8 py-3 rounded font-medium transition-colors"
              >
                View Details
              </button>
            </div>
            <div className="flex items-center justify-center">
              {product.images && product.images.length > 0 ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-auto max-h-80 object-contain rounded-lg"
                />
              ) : (
                <div className="w-full h-80 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-400">No Image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
