'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import CheckoutModal from '@/components/CheckoutModal';
import { IProduct } from '@/models/Product';
import axios from 'axios';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchProducts();
    }
  }, [slug]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/products?category=${slug}&limit=1000`);
      
      if (response.data.success) {
        setProducts(response.data.data);
        if (response.data.data.length > 0) {
          setCategoryName(response.data.data[0].category);
        }
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuyClick = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        <div className="container py-12">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold capitalize inline-block relative after:content-[''] after:block after:w-2/5 after:h-1 after:bg-black after:mt-4 after:mx-auto">
              {categoryName || slug}
            </h1>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onBuyClick={handleBuyClick}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No products found in this category.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {selectedProduct && (
        <CheckoutModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
