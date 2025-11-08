import { QueryClient } from '@tanstack/react-query';

// Create a client with custom configuration
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 30, // 30 minutes (formerly cacheTime)
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      retry: 1,
    },
  },
});

// LocalStorage cache utilities
export const CACHE_KEYS = {
  PRODUCTS: 'zanbu_products_cache',
  CATEGORIES: 'zanbu_categories_cache',
  ORDERS: 'zanbu_orders_cache',
  BANNERS: 'zanbu_banners_cache',
  BLOGS: 'zanbu_blogs_cache',
};

export const saveToLocalStorage = (key: string, data: any) => {
  if (typeof window !== 'undefined') {
    try {
      const cacheData = {
        data,
        timestamp: Date.now(),
      };
      localStorage.setItem(key, JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }
};

export const getFromLocalStorage = (key: string, maxAge: number = 1000 * 60 * 5) => {
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(key);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        if (age < maxAge) {
          return data;
        }
        // Remove stale cache
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error('Error reading from localStorage:', error);
    }
  }
  return null;
};

export const clearCache = (key?: string) => {
  if (typeof window !== 'undefined') {
    if (key) {
      localStorage.removeItem(key);
    } else {
      // Clear all Zanbu caches
      Object.values(CACHE_KEYS).forEach(cacheKey => {
        localStorage.removeItem(cacheKey);
      });
    }
  }
};
