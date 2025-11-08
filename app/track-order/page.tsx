'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Search, Package, Truck, CheckCircle, XCircle, Clock, MapPin, Phone, Mail, Calendar } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { formatPrice } from '@/lib/utils';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
  items: OrderItem[];
  totalAmount: number;
  status: string;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderNumber.trim()) {
      toast.error('Please enter an order number');
      return;
    }

    setLoading(true);
    setNotFound(false);
    setOrder(null);

    try {
      const response = await axios.get('/api/orders');
      
      if (response.data.success) {
        const foundOrder = response.data.data.find(
          (o: Order) => o.orderNumber.toLowerCase() === orderNumber.toLowerCase().trim()
        );

        if (foundOrder) {
          setOrder(foundOrder);
          toast.success('Order found!');
        } else {
          setNotFound(true);
          toast.error('Order not found. Please check your order number.');
        }
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      toast.error('Failed to track order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'cancelled':
        return <XCircle className="w-6 h-6 text-red-600" />;
      case 'shipped':
        return <Truck className="w-6 h-6 text-blue-600" />;
      case 'processing':
        return <Clock className="w-6 h-6 text-yellow-600" />;
      default:
        return <Package className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      processing: 'bg-blue-100 text-blue-800 border-blue-200',
      shipped: 'bg-purple-100 text-purple-800 border-purple-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200',
    };
    return colors[status.toLowerCase()] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getStatusSteps = (currentStatus: string) => {
    const steps = [
      { name: 'Order Placed', status: 'pending' },
      { name: 'Processing', status: 'processing' },
      { name: 'Shipped', status: 'shipped' },
      { name: 'Delivered', status: 'delivered' },
    ];

    const statusOrder = ['pending', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus.toLowerCase());

    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }));
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <Package className="w-16 h-16 mx-auto mb-6 text-primary" />
              <h1 className="text-5xl font-bold text-gray-900 mb-6">Track Your Order</h1>
              <p className="text-xl text-gray-700">
                Enter your order number to track your shipment and view order details
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleTrackOrder} className="bg-white rounded-2xl shadow-lg p-8">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Order Number
                </label>
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Enter your order number (e.g., ORD-12345)"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-primary px-8 py-3 flex items-center gap-2 disabled:opacity-50"
                  >
                    <Search className="w-5 h-5" />
                    {loading ? 'Tracking...' : 'Track Order'}
                  </button>
                </div>
                <p className="mt-3 text-sm text-gray-500">
                  You can find your order number in your confirmation email
                </p>
              </form>
            </div>
          </div>
        </section>

        {/* Order Not Found */}
        {notFound && (
          <section className="py-8">
            <div className="container">
              <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-xl p-8 text-center">
                <XCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Not Found</h2>
                <p className="text-gray-600">
                  We couldn&apos;t find an order with that number. Please check your order number and try again.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Order Details */}
        {order && (
          <section className="py-8 pb-16">
            <div className="container">
              <div className="max-w-5xl mx-auto space-y-6">
                {/* Order Status Card */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">
                        Order {order.orderNumber}
                      </h2>
                      <p className="text-gray-600">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </p>
                    </div>
                    <div className={`px-6 py-3 rounded-full border-2 font-semibold ${getStatusColor(order.status)}`}>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <span className="capitalize">{order.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress Tracker */}
                  {order.status.toLowerCase() !== 'cancelled' && (
                    <div className="mt-8">
                      <div className="flex items-center justify-between relative">
                        <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200 -z-10" />
                        <div 
                          className="absolute top-5 left-0 h-1 bg-black transition-all duration-500 -z-10"
                          style={{ 
                            width: `${(getStatusSteps(order.status).filter(s => s.completed).length - 1) / (getStatusSteps(order.status).length - 1) * 100}%` 
                          }}
                        />
                        
                        {getStatusSteps(order.status).map((step, index) => (
                          <div key={index} className="flex flex-col items-center relative">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                              step.completed 
                                ? 'bg-black text-white' 
                                : 'bg-gray-200 text-gray-500'
                            }`}>
                              {step.completed ? (
                                <CheckCircle className="w-6 h-6" />
                              ) : (
                                <div className="w-3 h-3 rounded-full bg-gray-400" />
                              )}
                            </div>
                            <p className={`text-sm font-medium ${
                              step.completed ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {step.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Customer Information */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Customer Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Package className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Name</p>
                          <p className="font-medium text-gray-900">{order.customer.name}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium text-gray-900">{order.customer.email}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Phone</p>
                          <p className="font-medium text-gray-900">{order.customer.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                        <div>
                          <p className="text-sm text-gray-500">Delivery Address</p>
                          <p className="font-medium text-gray-900">
                            {order.customer.address}<br />
                            {order.customer.city}, {order.customer.state} {order.customer.zipCode}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white rounded-2xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Method</span>
                        <span className="font-medium text-gray-900 capitalize">{order.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Items</span>
                        <span className="font-medium text-gray-900">{order.items.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date</span>
                        <span className="font-medium text-gray-900">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated</span>
                        <span className="font-medium text-gray-900">
                          {new Date(order.updatedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-900">Total Amount</span>
                          <span className="text-2xl font-bold text-primary">{formatPrice(order.totalAmount)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        {item.image && (
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-20 h-20 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{item.name}</h4>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900">{formatPrice(item.price)}</p>
                          <p className="text-sm text-gray-600">
                            Subtotal: {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
