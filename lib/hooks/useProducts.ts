import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IProduct } from '@/models/Product';
import { CACHE_KEYS, saveToLocalStorage, getFromLocalStorage } from '@/lib/queryClient';
import toast from 'react-hot-toast';

interface ProductsParams {
  category?: string;
  featured?: boolean;
  topRated?: boolean;
  topSale?: boolean;
  limit?: number;
}

const fetchProducts = async (params?: ProductsParams): Promise<IProduct[]> => {
  // Try localStorage first
  const cacheKey = `${CACHE_KEYS.PRODUCTS}_${JSON.stringify(params || {})}`;
  const cached = getFromLocalStorage(cacheKey);
  
  if (cached && cached.length > 0) {
    return cached;
  }

  const queryParams = new URLSearchParams();
  if (params?.category) queryParams.append('category', params.category);
  if (params?.featured) queryParams.append('featured', 'true');
  if (params?.topRated) queryParams.append('topRated', 'true');
  if (params?.topSale) queryParams.append('topSale', 'true');
  if (params?.limit) queryParams.append('limit', params.limit.toString());

  try {
    const response = await axios.get(`/api/products?${queryParams.toString()}`);
    
    if (response.data.success) {
      // Save to localStorage
      saveToLocalStorage(cacheKey, response.data.data);
      return response.data.data;
    }
    
    throw new Error('Failed to fetch products');
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const useProducts = (params?: ProductsParams) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => fetchProducts(params),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (product: Partial<IProduct>) => {
      const response = await axios.post('/api/products', product);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
    },
    onError: () => {
      toast.error('Failed to create product');
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<IProduct> }) => {
      const response = await axios.put(`/api/products/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
    },
    onError: () => {
      toast.error('Failed to update product');
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/products/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete product');
    },
  });
};
