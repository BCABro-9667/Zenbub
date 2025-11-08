'use client';

import { useState } from 'react';
import { X, Minus, Plus } from 'lucide-react';
import { IProduct } from '@/models/Product';
import { formatPrice, generateOrderNumber } from '@/lib/utils';
import toast from 'react-hot-toast';
import axios from 'axios';

interface CheckoutModalProps {
  product: IProduct;
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ product, isOpen, onClose }: CheckoutModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [fetchingPincode, setFetchingPincode] = useState(false);
  const [pincodeAutoFilled, setPincodeAutoFilled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    notes: '',
  });

  if (!isOpen) return null;

  const totalPrice = product.price * quantity;

  const handleIncrement = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Auto-fetch city and state when pincode is 6 digits
    if (name === 'zipCode' && value.length === 6) {
      fetchPincodeDetails(value);
    }
  };

  const fetchPincodeDetails = async (pincode: string) => {
    setFetchingPincode(true);
    setPincodeAutoFilled(false);
    try {
      const response = await axios.get(`/api/pincode?pincode=${pincode}`);
      
      if (response.data.success) {
        setFormData(prev => ({
          ...prev,
          city: response.data.data.city || '',
          state: response.data.data.state || '',
        }));
        setPincodeAutoFilled(true);
        toast.success('Location details fetched successfully!');
      } else {
        setPincodeAutoFilled(false);
        toast.error('Invalid PIN code. Please enter city and state manually.');
      }
    } catch (error) {
      console.error('Error fetching pincode details:', error);
      setPincodeAutoFilled(false);
      toast.error('Failed to fetch location details. Please enter manually.');
    } finally {
      setFetchingPincode(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const orderData = {
        items: [
          {
            product: product._id,
            name: product.name,
            price: product.price,
            quantity,
            image: product.images[0] || '',
          },
        ],
        customer: formData,
        totalAmount: totalPrice,
        paymentMethod: 'cod',
      };

      const response = await axios.post('/api/orders', orderData);
      
      if (response.data.success) {
        toast.success('Order placed successfully!');
        onClose();
        setFormData({
          name: '',
          email: '',
          phone: '',
          address: '',
          city: '',
          state: '',
          zipCode: '',
          notes: '',
        });
        setQuantity(1);
      }
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div className="fixed inset-0 bg-black opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">Complete Your Order</h2>

            {/* Product Details */}
            <div className="flex gap-4 mb-6 p-4 bg-gray-50 rounded-lg">
              {product.images && product.images.length > 0 && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-24 h-24 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-primary font-bold text-xl">{formatPrice(product.price)}</p>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleDecrement}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-xl font-semibold w-12 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={handleIncrement}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-sm text-gray-500 ml-2">
                  (Stock: {product.stock})
                </span>
              </div>
            </div>

            {/* Order Form */}
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone *</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="input-field"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">PIN Code *</label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleChange}
                    required
                    maxLength={6}
                    placeholder="Enter 6-digit PIN code"
                    className="input-field"
                  />
                  {fetchingPincode && (
                    <p className="text-xs text-blue-600 mt-1">Fetching location details...</p>
                  )}
                </div>
              </div>

              {/* City and State in one row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">City *</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    readOnly={pincodeAutoFilled}
                    className={`input-field ${
                      pincodeAutoFilled ? 'bg-gray-50 cursor-not-allowed' : ''
                    }`}
                    placeholder={pincodeAutoFilled ? 'Auto-filled from PIN' : 'Enter city'}
                  />
                  {pincodeAutoFilled && (
                    <p className="text-xs text-green-600 mt-1">✓ Auto-filled</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">State *</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    required
                    readOnly={pincodeAutoFilled}
                    className={`input-field ${
                      pincodeAutoFilled ? 'bg-gray-50 cursor-not-allowed' : ''
                    }`}
                    placeholder={pincodeAutoFilled ? 'Auto-filled from PIN' : 'Enter state'}
                  />
                  {pincodeAutoFilled && (
                    <p className="text-xs text-green-600 mt-1">✓ Auto-filled</p>
                  )}
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Address *</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-1">Order Notes (Optional)</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  rows={3}
                  className="input-field resize-none"
                />
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total Amount:</span>
                  <span className="text-primary">{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Payment Method: Cash on Delivery (COD)</p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3 text-lg disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
