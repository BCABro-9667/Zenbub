import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IOrder } from '@/models/Order';
import { CACHE_KEYS, saveToLocalStorage, getFromLocalStorage } from '@/lib/queryClient';
import toast from 'react-hot-toast';

const fetchOrders = async (): Promise<IOrder[]> => {
  // Try localStorage first (with shorter cache time for orders)
  const cached = getFromLocalStorage(CACHE_KEYS.ORDERS, 1000 * 60 * 2); // 2 minutes
  
  if (cached) {
    return cached;
  }

  const response = await axios.get('/api/orders');
  
  if (response.data.success) {
    // Save to localStorage
    saveToLocalStorage(CACHE_KEYS.ORDERS, response.data.data);
    return response.data.data;
  }
  
  throw new Error('Failed to fetch orders');
};

export const useOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 2, // 2 minutes (orders change frequently)
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (order: Partial<IOrder>) => {
      const response = await axios.post('/api/orders', order);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order created successfully');
    },
    onError: () => {
      toast.error('Failed to create order');
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<IOrder> }) => {
      const response = await axios.put(`/api/orders/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order updated successfully');
    },
    onError: () => {
      toast.error('Failed to update order');
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/orders/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success('Order deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete order');
    },
  });
};
