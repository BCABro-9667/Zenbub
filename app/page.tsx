'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeroSlider from '@/components/HeroSlider';
import CategoryCircles from '@/components/CategoryCircles';
import ProductSection from '@/components/ProductSection';
import ProductOfTheMonth from '@/components/ProductOfTheMonth';
import Testimonials from '@/components/Testimonials';
import CheckoutModal from '@/components/CheckoutModal';
import ProductCard from '@/components/ProductCard';
import { IProduct } from '@/models/Product';
import { ICategory } from '@/models/Category';
import { useProducts } from '@/lib/hooks/useProducts';
import { useCategories } from '@/lib/hooks/useCategories';

// Component for section titles with the requested styling
const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <div className="relative mb-8">
    <h2 className="text-3xl font-semibold text-gray-800 relative inline-block pb-3">
      {children}
      <span className="absolute bottom-0 left-0 w-24 h-1 bg-black"></span>
    </h2>
    <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
  </div>
);

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Default categories to show when database is empty
  const defaultCategories: ICategory[] = [
    { _id: 'default-1', name: 'Gullaks', slug: 'gullaks', icon: '🪙', image: '', description: '', isActive: true },
    { _id: 'default-2', name: 'Locker Safe', slug: 'locker-safe', icon: '🔒', image: '', description: '', isActive: true },
    { _id: 'default-3', name: 'Home Appliances', slug: 'home-appliances', icon: '🏠', image: '', description: '', isActive: true },
    { _id: 'default-4', name: 'Office Appliance', slug: 'office-appliance', icon: '🖨️', image: '', description: '', isActive: true },
    { _id: 'default-5', name: 'Tables Drawer', slug: 'tables-drawer', icon: '🗄️', image: '', description: '', isActive: true },
    { _id: 'default-6', name: 'Trolleys', slug: 'trolleys', icon: '🛒', image: '', description: '', isActive: true },
  ];

  // Fetch data using TanStack Query with caching
  const { data: fetchedCategories = [], isLoading: categoriesLoading } = useCategories();
  const categories = fetchedCategories.length > 0 ? fetchedCategories : defaultCategories;
  const { data: featuredProducts = [], isLoading: featuredLoading } = useProducts({ featured: true, limit: 8 });
  const { data: topRatedProducts = [], isLoading: topRatedLoading } = useProducts({ topRated: true, limit: 8 });
  const { data: topSaleProducts = [], isLoading: topSaleLoading } = useProducts({ topSale: true, limit: 8 });
  const { data: recentProducts = [], isLoading: recentLoading } = useProducts({ limit: 8 });

  // Check if any data is still loading
  const isLoading = categoriesLoading || featuredLoading || topRatedLoading || topSaleLoading || recentLoading;

  const handleBuyClick = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  // Show loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute inset-0 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute inset-0 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-lg font-medium text-gray-900">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      
      <main>
        {/* Hero Slider */}
        <HeroSlider />

        {/* Categories Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container">
            <div className="relative mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 relative inline-block pb-3">
                Shop by Category
                <span className="absolute bottom-0 left-0 w-20 sm:w-24 h-1 bg-black"></span>
              </h2>
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
            </div>
            <CategoryCircles categories={categories} />
          </div>
        </section>

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container">
              <SectionTitle>Featured Products</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredProducts.slice(0, 3).map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onBuyClick={handleBuyClick}
                  />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Product of the Month */}
        {topRatedProducts.length > 0 && (
          <ProductOfTheMonth
            product={topRatedProducts[0]}
            onBuyClick={handleBuyClick}
          />
        )}

        {/* Top Rated Products */}
        {topRatedProducts.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container">
              <SectionTitle>Top Rated Products</SectionTitle>
              <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
                {topRatedProducts.map((product) => (
                  <div key={product._id} className="flex-shrink-0 w-[280px]">
                    <ProductCard
                      product={product}
                      onBuyClick={handleBuyClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Best Sellers */}
        {topSaleProducts.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container">
              <SectionTitle>Best Sellers</SectionTitle>
              <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
                {topSaleProducts.map((product) => (
                  <div key={product._id} className="flex-shrink-0 w-[280px]">
                    <ProductCard
                      product={product}
                      onBuyClick={handleBuyClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Dual Image Banner - Boy and Girl */}
        <section className="w-full py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Boy Image - Left */}
              <div className="rounded-2xl overflow-hidden shadow-lg h-full">
                <img 
                  src="https://res.cloudinary.com/dxtyioftt/image/upload/v1762593038/boy_aqgllj.png" 
                  alt="Boy Collection" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Girl Image - Right */}
              <div className="rounded-2xl overflow-hidden shadow-lg h-full">
                <img 
                  src="https://res.cloudinary.com/dxtyioftt/image/upload/v1762593039/girls_r9lnek.png" 
                  alt="Girl Collection" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        {recentProducts.length > 0 && (
          <section className="py-12 bg-white">
            <div className="container">
              <SectionTitle>New Arrivals</SectionTitle>
              <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
                {recentProducts.map((product) => (
                  <div key={product._id} className="flex-shrink-0 w-[280px]">
                    <ProductCard
                      product={product}
                      onBuyClick={handleBuyClick}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Testimonials */}
        <Testimonials />

        {/* Custom Appliance Request */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Side - Content */}
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Custom Home & Office Appliances</h2>
                <p className="text-gray-700 mb-4">
                  Looking for specialized appliances tailored to your specific needs? Our team of experts can help you design and manufacture custom solutions for your home or office.
                </p>
                <p className="text-gray-700 mb-4">
                  Whether you need a unique storage solution, specialized equipment, or a custom-built appliance, we can create exactly what you need.
                </p>
                <div className="space-y-4 mt-8">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Tailored Solutions</h3>
                      <p className="text-gray-600">Custom designs to fit your exact requirements</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Expert Consultation</h3>
                      <p className="text-gray-600">Professional guidance from our experienced team</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Quality Assurance</h3>
                      <p className="text-gray-600">Premium materials and craftsmanship guaranteed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Form */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Request a Quote</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                      Describe Your Requirements
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Tell us about the custom appliance you need..."
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full btn-primary py-3"
                  >
                    Send Request
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Checkout Modal */}
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