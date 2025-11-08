'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { useOrders } from '@/lib/hooks/useOrders';
import { IOrder } from '@/models/Order';
import { ILead } from '@/models/Lead';
import { formatPrice } from '@/lib/utils';
import { Eye } from 'lucide-react';
import axios from 'axios';

export default function AdminDashboardPage() {
  const [leads, setLeads] = useState<ILead[]>([]);
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
  });

  // Fetch orders using TanStack Query
  const { data: allOrders = [] } = useOrders();
  const recentOrders = allOrders.slice(0, 5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [leadsRes, productsRes, categoriesRes] = await Promise.all([
        axios.get('/api/leads'),
        axios.get('/api/products?limit=1000'),
        axios.get('/api/categories'),
      ]);

      if (leadsRes.data.success) {
        setLeads(leadsRes.data.data.slice(0, 5)); // Get recent 5 leads
      }

      setStats({
        products: productsRes.data.success ? productsRes.data.data.length : 0,
        categories: categoriesRes.data.success ? categoriesRes.data.data.length : 0,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-8">Welcome to Zanbu Admin</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Products</h3>
          <p className="text-3xl font-bold text-primary">{stats.products}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Orders</h3>
          <p className="text-3xl font-bold text-green-600">{allOrders.length}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Categories</h3>
          <p className="text-3xl font-bold text-blue-600">{stats.categories}</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-gray-600 text-sm font-medium mb-2">Total Leads</h3>
          <p className="text-3xl font-bold text-purple-600">{leads.length}</p>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Leads</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {leads.length > 0 ? (
              leads.map((lead) => (
                <div key={lead._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{lead.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{lead.email}</p>
                      <p className="text-sm text-gray-500 mt-1">{lead.phone}</p>
                      {lead.message && (
                        <p className="text-sm text-gray-700 mt-2 line-clamp-2">{lead.message}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <span className="text-xs text-gray-500">
                        {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>No leads yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div key={order._id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">#{order.orderNumber}</h3>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{order.customer.name}</p>
                      <p className="text-sm text-gray-500 mt-1">{order.items.length} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-primary">{formatPrice(order.totalAmount)}</p>
                      <span className="text-xs text-gray-500 mt-1 block">
                        {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                <p>No orders yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
