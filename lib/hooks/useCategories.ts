import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { ICategory } from '@/models/Category';
import { CACHE_KEYS, saveToLocalStorage, getFromLocalStorage } from '@/lib/queryClient';
import toast from 'react-hot-toast';

const fetchCategories = async (): Promise<ICategory[]> => {
  // Try localStorage first
  const cached = getFromLocalStorage(CACHE_KEYS.CATEGORIES);
  
  if (cached) {
    return cached;
  }

  const response = await axios.get('/api/categories');
  
  if (response.data.success) {
    // Save to localStorage
    saveToLocalStorage(CACHE_KEYS.CATEGORIES, response.data.data);
    return response.data.data;
  }
  
  throw new Error('Failed to fetch categories');
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 10, // 10 minutes (categories change less frequently)
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (category: Partial<ICategory>) => {
      const response = await axios.post('/api/categories', category);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category created successfully');
    },
    onError: () => {
      toast.error('Failed to create category');
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: Partial<ICategory> }) => {
      const response = await axios.put(`/api/categories/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category updated successfully');
    },
    onError: () => {
      toast.error('Failed to update category');
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete(`/api/categories/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete category');
    },
  });
};
