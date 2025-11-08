'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ShoppingBag, Users, Target, Award, Truck, CreditCard, Gift, Star, RefreshCcw, MessageCircle, Package, TrendingUp, Shield, Clock, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* Page Heading */}
        <section className="py-8 bg-white">
          <div className="container text-center">
            <h1 className="text-3xl font-bold text-gray-900 inline-block relative mx-auto after:content-[''] after:block after:w-2/5 after:h-1 after:bg-black after:mx-auto after:mt-2">About Zanbu</h1>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-gray-700 mb-4">
                  Founded with a passion for bringing quality products to customers worldwide, 
                  Zanbu has grown from a small startup to a trusted e-commerce platform serving 
                  thousands of happy customers.
                </p>
                <p className="text-gray-700 mb-4">
                  We believe that shopping should be easy, enjoyable, and accessible to everyone. 
                  That&#39;s why we&#39;ve built a platform that combines the best products with 
                  exceptional customer service and competitive prices.
                </p>
                <p className="text-gray-700">
                  Our team works tirelessly to source the finest products, negotiate the best 
                  deals, and ensure that every order is delivered with care and attention to detail.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl h-96 flex items-center justify-center">
                <ShoppingBag className="w-32 h-32 text-primary" />
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingBag className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Quality First</h3>
                <p className="text-gray-600">
                  We handpick every product to ensure the highest quality standards for our customers.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Customer Focus</h3>
                <p className="text-gray-600">
                  Your satisfaction is our priority. We&#39;re here to serve you with dedication and care.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We constantly evolve to bring you the latest products and shopping experiences.
                </p>
              </div>

              <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">Trust & Integrity</h3>
                <p className="text-gray-600">
                  We build lasting relationships through honest business practices and transparency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">10K+</div>
                <div className="text-gray-600 font-medium">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">500+</div>
                <div className="text-gray-600 font-medium">Products</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600 font-medium">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-primary mb-2">99%</div>
                <div className="text-gray-600 font-medium">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Choose Zanbu?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Truck className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
                <p className="text-gray-600">
                  We ensure quick and reliable delivery to your doorstep with real-time tracking.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Secure Payment</h3>
                <p className="text-gray-600">
                  Shop with confidence using our secure payment options including Cash on Delivery.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Gift className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Best Prices</h3>
                <p className="text-gray-600">
                  Get competitive prices and amazing deals on all your favorite products.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Quality Assured</h3>
                <p className="text-gray-600">
                  Every product is carefully vetted to meet our strict quality standards.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <RefreshCcw className="w-6 h-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Easy Returns</h3>
                <p className="text-gray-600">
                  Not satisfied? We offer hassle-free returns and exchanges within 30 days.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageCircle className="w-6 h-6 text-pink-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
                <p className="text-gray-600">
                  Our customer support team is always ready to help you with any questions.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Products CTA Section */}
        <section className="py-16 bg-gradient-to-br from-orange-500 to-orange-600">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-white">
                <h2 className="text-4xl font-bold mb-6">Explore Our Products</h2>
                <p className="text-white/90 text-lg mb-6">
                  Discover our wide range of high-quality products carefully curated for you. 
                  From home appliances to office essentials, we have everything you need.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Package className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">500+ Premium Products</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">Latest Trending Items</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">100% Authentic Guarantee</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Clock className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-white/90">Fast & Reliable Delivery</span>
                  </div>
                </div>
                <a 
                  href="/shop" 
                  className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  Browse All Products
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <ShoppingBag className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">500+</div>
                    <div className="text-white/80 text-sm">Products</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Users className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">10K+</div>
                    <div className="text-white/80 text-sm">Customers</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">4.8/5</div>
                    <div className="text-white/80 text-sm">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Award className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-3xl font-bold text-white mb-1">99%</div>
                    <div className="text-white/80 text-sm">Satisfaction</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA Section */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Have Questions?</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Our team is here to help you. Get in touch with us for any inquiries, 
                custom orders, or product recommendations.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  Contact Us
                </a>
                <a 
                  href="/shop" 
                  className="inline-flex items-center justify-center gap-2 bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Start Shopping
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}