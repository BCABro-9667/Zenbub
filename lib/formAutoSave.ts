/**
 * Form Auto-Save Utility
 * Automatically saves and restores form data to/from localStorage
 */

export const FORM_STORAGE_KEYS = {
  PRODUCT_FORM: 'zanbu_product_form_draft',
  CATEGORY_FORM: 'zanbu_category_form_draft',
  BANNER_FORM: 'zanbu_banner_form_draft',
  BLOG_FORM: 'zanbu_blog_form_draft',
  ORDER_FORM: 'zanbu_order_form_draft',
  LEAD_FORM: 'zanbu_lead_form_draft',
};

/**
 * Save form data to localStorage
 */
export const saveFormDraft = (key: string, data: any) => {
  if (typeof window === 'undefined') return;
  
  try {
    const draftData = {
      data,
      timestamp: Date.now(),
      version: '1.0',
    };
    localStorage.setItem(key, JSON.stringify(draftData));
  } catch (error) {
    console.error('Error saving form draft:', error);
  }
};

/**
 * Load form data from localStorage
 */
export const loadFormDraft = (key: string, maxAge: number = 1000 * 60 * 60 * 24): any | null => {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = localStorage.getItem(key);
    if (!stored) return null;

    const { data, timestamp } = JSON.parse(stored);
    const age = Date.now() - timestamp;

    // Check if draft is too old
    if (age > maxAge) {
      clearFormDraft(key);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error loading form draft:', error);
    return null;
  }
};

/**
 * Clear form draft from localStorage
 */
export const clearFormDraft = (key: string) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error('Error clearing form draft:', error);
  }
};

/**
 * Check if form draft exists
 */
export const hasFormDraft = (key: string): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    return false;
  }
};

/**
 * Auto-save hook for React forms
 * Usage: useFormAutoSave(FORM_STORAGE_KEYS.PRODUCT_FORM, formData, setFormData);
 */
export const useFormAutoSave = (
  key: string,
  formData: any,
  setFormData: (data: any) => void,
  delay: number = 1000
) => {
  const { useEffect, useRef } = require('react');

  // Load draft on mount
  useEffect(() => {
    const draft = loadFormDraft(key);
    if (draft && Object.keys(draft).length > 0) {
      const shouldRestore = window.confirm(
        'Found unsaved changes. Would you like to restore them?'
      );
      if (shouldRestore) {
        setFormData(draft);
      } else {
        clearFormDraft(key);
      }
    }
  }, []);

  // Auto-save on changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (formData && Object.keys(formData).length > 0) {
        saveFormDraft(key, formData);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [formData, key, delay]);

  // Clear draft on unmount (optional - keep for next session)
  // Uncomment if you want to clear on component unmount
  // useEffect(() => {
  //   return () => clearFormDraft(key);
  // }, []);
};

/**
 * Temporary image storage (don't upload until form submission)
 */
export const TEMP_IMAGE_STORAGE = {
  KEY: 'zanbu_temp_images',

  save: (images: string[]) => {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.setItem(TEMP_IMAGE_STORAGE.KEY, JSON.stringify(images));
    } catch (error) {
      console.error('Error saving temp images:', error);
    }
  },

  load: (): string[] => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = sessionStorage.getItem(TEMP_IMAGE_STORAGE.KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error loading temp images:', error);
      return [];
    }
  },

  clear: () => {
    if (typeof window === 'undefined') return;
    try {
      sessionStorage.removeItem(TEMP_IMAGE_STORAGE.KEY);
    } catch (error) {
      console.error('Error clearing temp images:', error);
    }
  },
};
