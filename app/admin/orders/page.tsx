'use client';

import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { IOrder } from '@/models/Order';
import { useOrders, useUpdateOrder } from '@/lib/hooks/useOrders';
import toast from 'react-hot-toast';
import { formatPrice } from '@/lib/utils';
import { Eye, Download, Printer } from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function AdminOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);
  const [showModal, setShowModal] = useState(false);
  const printRef = useRef<HTMLDivElement>(null);

  // Fetch orders using TanStack Query
  const { data: orders = [], isLoading } = useOrders();
  const updateOrderMutation = useUpdateOrder();

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      await updateOrderMutation.mutateAsync({ 
        id: orderId, 
        data: { status: status as 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' } 
      });
    } catch (error) {
      toast.error('Failed to update order status');
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

  const handlePrint = () => {
    if (!selectedOrder) return;
    
    const printWindow = window.open('', '', 'width=800,height=600');
    if (!printWindow) return;

    const printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Order #${selectedOrder.orderNumber}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .header { text-align: center; margin-bottom: 30px; }
          .logo { font-size: 24px; font-weight: bold; color: #f97316; }
          .order-info { margin: 20px 0; }
          .section { margin: 20px 0; }
          .section h3 { border-bottom: 2px solid #f97316; padding-bottom: 5px; }
          table { width: 100%; border-collapse: collapse; margin: 10px 0; }
          th, td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #f97316; color: white; }
          .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
          .status { padding: 5px 10px; border-radius: 5px; display: inline-block; }
          .status.pending { background-color: #fef3c7; color: #92400e; }
          .status.processing { background-color: #dbeafe; color: #1e40af; }
          .status.shipped { background-color: #e9d5ff; color: #6b21a8; }
          .status.delivered { background-color: #d1fae5; color: #065f46; }
          .status.cancelled { background-color: #fee2e2; color: #991b1b; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo">ZANBU</div>
          <h2>Order Invoice</h2>
        </div>
        
        <div class="order-info">
          <p><strong>Order Number:</strong> ${selectedOrder.orderNumber}</p>
          <p><strong>Status:</strong> <span class="status ${selectedOrder.status}">${selectedOrder.status.toUpperCase()}</span></p>
          <p><strong>Date:</strong> ${selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleDateString() : 'N/A'}</p>
          <p><strong>Payment Method:</strong> ${selectedOrder.paymentMethod.toUpperCase()}</p>
        </div>

        <div class="section">
          <h3>Customer Information</h3>
          <p><strong>Name:</strong> ${selectedOrder.customer.name}</p>
          <p><strong>Email:</strong> ${selectedOrder.customer.email}</p>
          <p><strong>Phone:</strong> ${selectedOrder.customer.phone}</p>
          <p><strong>Address:</strong> ${selectedOrder.customer.address}, ${selectedOrder.customer.city}, ${selectedOrder.customer.state} ${selectedOrder.customer.zipCode}</p>
        </div>

        <div class="section">
          <h3>Order Items</h3>
          <table>
            <thead>
              <tr>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              ${selectedOrder.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.quantity}</td>
                  <td>${formatPrice(item.price)}</td>
                  <td>${formatPrice(item.price * item.quantity)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        ${selectedOrder.notes ? `
          <div class="section">
            <h3>Order Notes</h3>
            <p>${selectedOrder.notes}</p>
          </div>
        ` : ''}

        <div class="total">
          <p>Total Amount: ${formatPrice(selectedOrder.totalAmount)}</p>
        </div>
      </body>
      </html>
    `;

    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close();
    };
  };

  const handleDownloadPDF = () => {
    if (!selectedOrder) return;

    const doc = new jsPDF();
    
    // Add header
    doc.setFontSize(20);
    doc.setTextColor(249, 115, 22); // Primary color
    doc.text('ZANBU', 105, 15, { align: 'center' });
    
    doc.setFontSize(16);
    doc.setTextColor(0, 0, 0);
    doc.text('Order Invoice', 105, 25, { align: 'center' });
    
    // Order info
    doc.setFontSize(10);
    doc.text(`Order Number: ${selectedOrder.orderNumber}`, 20, 40);
    doc.text(`Status: ${selectedOrder.status.toUpperCase()}`, 20, 47);
    doc.text(`Date: ${selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleDateString() : 'N/A'}`, 20, 54);
    doc.text(`Payment Method: ${selectedOrder.paymentMethod.toUpperCase()}`, 20, 61);
    
    // Customer info
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('Customer Information', 20, 75);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text(`Name: ${selectedOrder.customer.name}`, 20, 82);
    doc.text(`Email: ${selectedOrder.customer.email}`, 20, 89);
    doc.text(`Phone: ${selectedOrder.customer.phone}`, 20, 96);
    doc.text(`Address: ${selectedOrder.customer.address}, ${selectedOrder.customer.city},`, 20, 103);
    doc.text(`${selectedOrder.customer.state} ${selectedOrder.customer.zipCode}`, 20, 110);
    
    // Order items table
    const tableData = selectedOrder.items.map(item => [
      item.name,
      item.quantity.toString(),
      formatPrice(item.price),
      formatPrice(item.price * item.quantity)
    ]);
    
    autoTable(doc, {
      startY: 120,
      head: [['Product', 'Quantity', 'Price', 'Total']],
      body: tableData,
      theme: 'striped',
      headStyles: { fillColor: [249, 115, 22] },
    });
    
    // Get the final Y position after the table
    const finalY = (doc as any).lastAutoTable.finalY || 120;
    
    // Notes if available
    if (selectedOrder.notes) {
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.text('Order Notes', 20, finalY + 15);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.text(selectedOrder.notes, 20, finalY + 22, { maxWidth: 170 });
    }
    
    // Total
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    const totalY = selectedOrder.notes ? finalY + 40 : finalY + 15;
    doc.text(`Total Amount: ${formatPrice(selectedOrder.totalAmount)}`, 20, totalY);
    
    // Save PDF
    doc.save(`Order_${selectedOrder.orderNumber}.pdf`);
    toast.success('PDF downloaded successfully');
  };

  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold mb-6">Orders</h1>

      {isLoading ? (
        <div className="text-center py-20">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Customer</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {orders.map((order) => (
                <tr key={order._id}>
                  <td className="px-6 py-4 font-medium">{order.orderNumber}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{order.customer.name}</div>
                      <div className="text-sm text-gray-600">{order.customer.email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4">{order.items.length}</td>
                  <td className="px-6 py-4 font-semibold">{formatPrice(order.totalAmount)}</td>
                  <td className="px-6 py-4">
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id!, e.target.value)}
                      className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(order.status)}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setShowModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedOrder && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg max-w-3xl w-full p-6">
              <h2 className="text-2xl font-bold mb-6">Order Details</h2>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Order Number</p>
                    <p className="font-semibold">{selectedOrder.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <span className={`inline-block px-3 py-1 rounded text-sm font-medium ${getStatusColor(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Customer Information</h3>
                  <div className="bg-gray-50 p-4 rounded">
                    <p><strong>Name:</strong> {selectedOrder.customer.name}</p>
                    <p><strong>Email:</strong> {selectedOrder.customer.email}</p>
                    <p><strong>Phone:</strong> {selectedOrder.customer.phone}</p>
                    <p><strong>Address:</strong> {selectedOrder.customer.address}, {selectedOrder.customer.city}, {selectedOrder.customer.state} {selectedOrder.customer.zipCode}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Order Items</h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center gap-4 bg-gray-50 p-4 rounded">
                        {item.image && (
                          <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total Amount:</span>
                    <span className="text-primary">{formatPrice(selectedOrder.totalAmount)}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Payment Method: {selectedOrder.paymentMethod.toUpperCase()}</p>
                </div>

                {selectedOrder.notes && (
                  <div>
                    <h3 className="font-semibold mb-2">Order Notes</h3>
                    <p className="bg-gray-50 p-4 rounded">{selectedOrder.notes}</p>
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-6">
                <button 
                  onClick={() => setShowModal(false)} 
                  className="btn-secondary"
                >
                  Close
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrint}
                    className="btn-secondary flex items-center gap-2"
                  >
                    <Printer className="w-4 h-4" />
                    Print
                  </button>
                  <button
                    onClick={handleDownloadPDF}
                    className="btn-primary flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
