'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CheckoutModal from '@/components/CheckoutModal';
import ProductCard from '@/components/ProductCard';
import { IProduct } from '@/models/Product';
import { formatPrice } from '@/lib/utils';
import { ShoppingCart, Minus, Plus, Download, Video, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import Zoom from 'react-medium-image-zoom';
import axios from 'axios';
import toast from 'react-hot-toast';
import 'swiper/css';
import 'swiper/css/navigation';
import 'react-medium-image-zoom/dist/styles.css';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [product, setProduct] = useState<IProduct | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [forYouProducts, setForYouProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'specifications' | 'description'>('description');
  const { addItem } = useCartStore();

  useEffect(() => {
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/products?limit=1000');
      
      if (response.data.success) {
        const foundProduct = response.data.data.find((p: IProduct) => p.slug === slug);
        if (foundProduct) {
          setProduct(foundProduct);
          
          // Get related products from same category
          const related = response.data.data
            .filter((p: IProduct) => p.category === foundProduct.category && p._id !== foundProduct._id)
            .slice(0, 5);
          setRelatedProducts(related);
          
          // Get "for you" products (featured or top rated)
          const forYou = response.data.data
            .filter((p: IProduct) => (p.isFeatured || p.isTopRated) && p._id !== foundProduct._id)
            .slice(0, 8);
          setForYouProducts(forYou);
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast.success(`Added ${quantity} item(s) to cart!`);
  };

  const handleBuyNow = () => {
    if (product) {
      setIsModalOpen(true);
    }
  };

  const handleBuyClick = (prod: IProduct) => {
    setSelectedProduct(prod);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!product) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
            <a href="/" className="btn-primary">
              Back to Home
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-white">
        <div className="container py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-6">
            <a href="/" className="hover:text-primary">Home</a>
            <span className="mx-2">/</span>
            <a href={`/category/${product.category}`} className="hover:text-primary capitalize">
              {product.category}
            </a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 rounded-xl p-6">
            {/* Left: Product Images Gallery - Main Image + Horizontal Thumbnails */}
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-4">
                {/* Main Image with Zoom */}
                <div className="bg-white rounded-2xl border border-gray-300 overflow-hidden w-full h-[400px]">
                  <Zoom>
                    <img
                      src={product.images[selectedImage] || product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </Zoom>
                </div>
                
                {/* Horizontal Thumbnails */}
                {product.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 border-2 rounded-lg overflow-hidden transition-all ${
                          selectedImage === index ? 'border-primary ring-2 ring-primary/30' : 'border-gray-200 hover:border-gray-400'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-20 h-20 object-cover bg-white"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Right: Product Details */}
            <div className="lg:col-span-3">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              {/* Category */}
              <div className="mb-4">
                <a href={`/category/${product.category}`} className="font-medium text-primary hover:underline capitalize">
                  {product.category}
                </a>
              </div>

              <hr className="mb-4" />

              {/* Short Description */}
              {product.shortDescription && (
                <div className="mb-6">
                  <p className="text-gray-700 text-base leading-relaxed">{product.shortDescription}</p>
                </div>
              )}

              {/* Additional Action Buttons - After Description */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                {product.brochureUrl && (
                  <a
                    href={product.brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary py-2 text-sm flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download Brochure
                  </a>
                )}
                
                {product.videoUrl && (
                  <a
                    href={product.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary py-2 text-sm flex items-center justify-center gap-2"
                  >
                    <Video className="w-4 h-4" />
                    Watch Video
                  </a>
                )}
                
                {product.whatsappNumber && (
                  <a
                    href={`https://wa.me/${product.whatsappNumber.replace(/[^0-9]/g, '')}?text=Hi, I'm interested in ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary py-2 text-sm flex items-center justify-center gap-2 bg-green-500 text-white hover:bg-green-600"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp Enquiry
                  </a>
                )}
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>

              {/* Quantity Selector and Price in One Row */}
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                {/* Price - Left Side */}
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.comparePrice && product.comparePrice > product.price && (
                    <>
                      <span className="text-2xl text-gray-500 line-through">
                        {formatPrice(product.comparePrice)}
                      </span>
                      <span className="bg-red-500 text-white px-3 py-1 rounded text-sm font-medium">
                        {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>

                {/* Quantity Selector - Left Side (Flex Start) */}
                <div>
                  <h3 className="font-semibold mb-2">Quantity</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      disabled={quantity >= product.stock}
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Action Buttons - Same Width */}
              <div className="space-y-3">
                <div className="flex gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={product.stock === 0}
                    className="flex-1 py-3 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button
                    onClick={handleBuyNow}
                    disabled={product.stock === 0}
                    className="flex-1 btn-primary py-3 text-lg disabled:opacity-50"
                  >
                    Buy Now
                  </button>
                </div>
              </div>

              {/* Product Meta */}
              {product.sku && (
                <div className="mt-6 pt-6 border-t border-gray-200 text-sm">
                  <div className="flex gap-2">
                    <span className="text-gray-600">SKU:</span>
                    <span className="font-medium">{product.sku}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Full Width: Specifications & Description */}
          <div className="rounded-xl p-6 mt-8">
            {/* Tabs - Centered */}
            <div className="border-b border-gray-200 mb-6">
              <div className="flex gap-8 justify-center">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`pb-4 px-2 font-semibold text-lg transition-colors border-b-2 ${
                    activeTab === 'description'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Description
                </button>
                <button
                  onClick={() => setActiveTab('specifications')}
                  className={`pb-4 px-2 font-semibold text-lg transition-colors border-b-2 ${
                    activeTab === 'specifications'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Specifications
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="prose max-w-none">
              {activeTab === 'description' && (
                <div dangerouslySetInnerHTML={{ __html: product.description }} />
              )}
              {activeTab === 'specifications' && (
                <div>
                  {product.specifications ? (
                    <div 
                      dangerouslySetInnerHTML={{ __html: product.specifications }} 
                      className="specifications-content"
                    />
                  ) : (
                    <p className="text-gray-500 text-center py-8">No specifications available for this product.</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Related Products Slider */}
          {relatedProducts.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Related Products</h2>
              <div className="group">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  spaceBetween={24}
                  slidesPerView={1}
                  navigation={{
                    nextEl: '.related-products-swiper-button-next',
                    prevEl: '.related-products-swiper-button-prev',
                  }}
                  autoplay={{ delay: 3000 }}
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                    1280: { slidesPerView: 5 },
                  }}
                >
                  {relatedProducts.map((relatedProduct) => (
                    <SwiperSlide key={relatedProduct._id}>
                      <ProductCard
                        product={relatedProduct}
                        onBuyClick={handleBuyClick}
                      />
                    </SwiperSlide>
                  ))}
                  <div className="related-products-swiper-button-prev !text-gray-900 !w-10 !h-10 after:!text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="related-products-swiper-button-next !text-gray-900 !w-10 !h-10 after:!text-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </Swiper>
              </div>
            </div>
          )}

          {/* For You Products Section */}
          {forYouProducts.length > 0 && (
            <div className="mt-12">
              <div className="relative mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-black relative inline-block pb-3">
                  For You
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-black"></span>
                </h2>
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-300"></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {forYouProducts.map((forYouProduct) => (
                  <ProductCard
                    key={forYouProduct._id}
                    product={forYouProduct}
                    onBuyClick={handleBuyClick}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {(selectedProduct || product) && (
        <CheckoutModal
          product={selectedProduct || product!}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedProduct(null);
          }}
        />
      )}
    </>
  );
}
