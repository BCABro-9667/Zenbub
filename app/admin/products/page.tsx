'use client';

import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { IProduct } from '@/models/Product';
import { ICategory } from '@/models/Category';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Editor } from '@tinymce/tinymce-react';
import { Pencil, Trash2, Plus, Upload, X, Image as ImageIcon, Link2 } from 'lucide-react';
import { generateSlug } from '@/lib/utils';
import { FORM_STORAGE_KEYS, saveFormDraft, loadFormDraft, clearFormDraft } from '@/lib/formAutoSave';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const [imageUrl, setImageUrl] = useState('');
  const editorRef = useRef<any>(null);
  const specsEditorRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    shortDescription: '',
    description: '',
    specifications: '',
    price: 0,
    comparePrice: 0,
    category: '',
    stock: 0,
    sku: '',
    brochureUrl: '',
    videoUrl: '',
    whatsappNumber: '',
    images: [] as string[],
    isFeatured: false,
    isTopRated: false,
    isTopSale: false,
    isActive: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
  });

  // Auto-save form data to localStorage
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (showModal && formData.name) {
        saveFormDraft(FORM_STORAGE_KEYS.PRODUCT_FORM, formData);
      }
    }, 1000); // Save after 1 second of inactivity

    return () => clearTimeout(timeoutId);
  }, [formData, showModal]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [productsRes, categoriesRes] = await Promise.all([
        axios.get('/api/products?limit=1000'),
        axios.get('/api/categories'),
      ]);

      if (productsRes.data.success) setProducts(productsRes.data.data);
      if (categoriesRes.data.success) setCategories(categoriesRes.data.data);
    } catch (error) {
      toast.error('Failed to fetch data');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use formData directly since we're now using controlled editors
      const productData = {
        ...formData,
        // Ensure empty strings for optional fields instead of undefined
        shortDescription: formData.shortDescription || '',
        specifications: formData.specifications || '',
        brochureUrl: formData.brochureUrl || '',
        videoUrl: formData.videoUrl || '',
        whatsappNumber: formData.whatsappNumber || '',
      };

      console.log('Submitting product data:', productData);
      console.log('Short Description:', productData.shortDescription);
      console.log('Brochure URL:', productData.brochureUrl);
      console.log('Video URL:', productData.videoUrl);
      console.log('WhatsApp:', productData.whatsappNumber);
      console.log('Specifications:', productData.specifications);

      if (editingProduct) {
        const response = await axios.put(`/api/products/${editingProduct._id}`, productData);
        console.log('Update response:', response.data);
        toast.success('Product updated successfully');
      } else {
        const response = await axios.post('/api/products', productData);
        console.log('Create response:', response.data);
        toast.success('Product created successfully');
      }

      setShowModal(false);
      resetForm(); // This will clear the draft
      fetchData();
    } catch (error: any) {
      console.error('Error saving product:', error);
      console.error('Error response:', error.response?.data);
      toast.error('Failed to save product: ' + (error.response?.data?.error || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`/api/products/${id}`);
      toast.success('Product deleted successfully');
      fetchData();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const handleEdit = (product: IProduct) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      shortDescription: product.shortDescription || '',
      description: product.description,
      specifications: product.specifications || '',
      price: product.price,
      comparePrice: product.comparePrice || 0,
      category: product.category,
      stock: product.stock,
      sku: product.sku || '',
      brochureUrl: product.brochureUrl || '',
      videoUrl: product.videoUrl || '',
      whatsappNumber: product.whatsappNumber || '',
      images: product.images,
      isFeatured: product.isFeatured,
      isTopRated: product.isTopRated,
      isTopSale: product.isTopSale,
      isActive: product.isActive,
      metaTitle: (product as any).metaTitle || '',
      metaDescription: (product as any).metaDescription || '',
      metaKeywords: (product as any).metaKeywords || '',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      name: '',
      slug: '',
      shortDescription: '',
      description: '',
      specifications: '',
      price: 0,
      comparePrice: 0,
      category: '',
      stock: 0,
      sku: '',
      brochureUrl: '',
      videoUrl: '',
      whatsappNumber: '',
      images: [],
      isFeatured: false,
      isTopRated: false,
      isTopSale: false,
      isActive: true,
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
    });
    setEditingProduct(null);
    clearFormDraft(FORM_STORAGE_KEYS.PRODUCT_FORM); // Clear draft
  };

  // Load draft when opening modal
  const handleOpenModal = () => {
    const draft = loadFormDraft(FORM_STORAGE_KEYS.PRODUCT_FORM);
    if (draft) {
      const shouldRestore = window.confirm("Found unsaved changes. Would you like to restore them?");
      if (shouldRestore) {
        setFormData(draft);
      }
    }
    setShowModal(true);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const uploadPromises = Array.from(files).map(async (file) => {
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('folder', 'products');

      const response = await axios.post('/api/upload', formDataUpload);
      return response.data.data.url;
    });

    try {
      const uploadedUrls = await Promise.all(uploadPromises);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedUrls],
      }));
      toast.success(`${uploadedUrls.length} image(s) uploaded successfully`);
    } catch (error) {
      toast.error('Failed to upload images');
    }
  };

  const handleAddImageUrl = () => {
    if (!imageUrl.trim()) {
      toast.error('Please enter a valid image URL');
      return;
    }
    
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, imageUrl.trim()],
    }));
    setImageUrl('');
    toast.success('Image URL added successfully');
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSetPrimaryImage = (index: number) => {
    setFormData((prev) => {
      const newImages = [...prev.images];
      const [primaryImage] = newImages.splice(index, 1);
      return {
        ...prev,
        images: [primaryImage, ...newImages],
      };
    });
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => {
            resetForm();
            handleOpenModal();
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Stock</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {products.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4">
                  {product.images?.[0] ? (
                    <div className="relative">
                      <img src={product.images[0]} alt={product.name} className="w-16 h-16 object-cover rounded" />
                      {product.images.length > 1 && (
                        <span className="absolute -bottom-1 -right-1 bg-primary text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                          +{product.images.length - 1}
                        </span>
                      )}
                    </div>
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 font-medium">{product.name}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">${product.price}</td>
                <td className="px-6 py-4">{product.stock}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-800">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(product._id!)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full Screen Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
          <div className="min-h-screen">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                  </h2>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <form onSubmit={handleSubmit}>
                <div className="flex gap-8">
                  {/* Left Column - Form Fields (70%) */}
                  <div className="w-[70%] space-y-8">
                    {/* Basic Information Section */}
                    <div className="bg-white shadow rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">Basic Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Product Name *</label>
                          <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => {
                              setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) });
                            }}
                            required
                            className="input-field"
                            placeholder="Enter product name"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Category *</label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            required
                            className="input-field"
                          >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                              <option key={cat._id} value={cat.slug}>
                                {cat.name}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">SKU</label>
                          <input
                            type="text"
                            value={formData.sku}
                            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                            className="input-field"
                            placeholder="Product SKU"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">WhatsApp Number</label>
                          <input
                            type="text"
                            value={formData.whatsappNumber}
                            onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                            placeholder="+91XXXXXXXXXX"
                            className="input-field"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Pricing Section */}
                    <div className="bg-white shadow rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">Pricing & Inventory</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Price *</label>
                          <input
                            type="number"
                            value={formData.price}
                            onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                            required
                            min="0"
                            step="0.01"
                            className="input-field"
                            placeholder="0.00"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Compare Price</label>
                          <input
                            type="number"
                            value={formData.comparePrice}
                            onChange={(e) => setFormData({ ...formData, comparePrice: Number(e.target.value) })}
                            min="0"
                            step="0.01"
                            className="input-field"
                            placeholder="0.00"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Stock *</label>
                          <input
                            type="number"
                            value={formData.stock}
                            onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                            required
                            min="0"
                            className="input-field"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Description Section */}
                    <div className="bg-white shadow rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">Product Description</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Short Description</label>
                          <textarea
                            value={formData.shortDescription}
                            onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                            rows={2}
                            className="input-field resize-none"
                            placeholder="Brief product description..."
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Full Description *</label>
                          <Editor
                            key={`desc-${editingProduct?._id || 'new'}`}
                            onInit={(evt, editor) => (editorRef.current = editor)}
                            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                            init={{
                              height: 400,
                              menubar: false,
                              plugins: 'anchor autolink charmap codesample emoticons link lists searchreplace table visualblocks wordcount',
                              toolbar: 'undo redo | blocks fontsize | bold italic underline strikethrough | link table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                            }}
                            value={formData.description}
                            onEditorChange={(content) => setFormData({ ...formData, description: content })}
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Specifications (Optional)</label>
                          <Editor
                            key={`spec-${editingProduct?._id || 'new'}`}
                            onInit={(evt, editor) => (specsEditorRef.current = editor)}
                            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                            init={{
                              height: 300,
                              menubar: false,
                              plugins: 'anchor autolink charmap lists table visualblocks',
                              toolbar: 'undo redo | blocks | bold italic | table | numlist bullist | removeformat',
                            }}
                            value={formData.specifications}
                            onEditorChange={(content) => setFormData({ ...formData, specifications: content })}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Media Section */}
                    <div className="bg-white shadow rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">Media & Resources</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Brochure URL</label>
                          <input
                            type="url"
                            value={formData.brochureUrl}
                            onChange={(e) => setFormData({ ...formData, brochureUrl: e.target.value })}
                            placeholder="https://example.com/brochure.pdf"
                            className="input-field"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Video URL</label>
                          <input
                            type="url"
                            value={formData.videoUrl}
                            onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                            placeholder="https://youtube.com/watch?v=..."
                            className="input-field"
                          />
                        </div>
                      </div>
                      
                      {/* Upload Method Toggle */}
                      <div className="mb-4">
                        <div className="flex gap-2 mb-3">
                          <button
                            type="button"
                            onClick={() => setUploadMethod('file')}
                            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              uploadMethod === 'file'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <Upload className="w-4 h-4 inline mr-2" />
                            Upload File
                          </button>
                          <button
                            type="button"
                            onClick={() => setUploadMethod('url')}
                            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                              uploadMethod === 'url'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                          >
                            <Link2 className="w-4 h-4 inline mr-2" />
                            Image URL
                          </button>
                        </div>

                        {uploadMethod === 'file' ? (
                          <>
                            <label className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                              <Upload className="w-5 h-5 text-gray-400" />
                              <span className="text-sm text-gray-600">Upload Images (Multiple)</span>
                              <input 
                                type="file" 
                                onChange={handleImageUpload} 
                                accept="image/*" 
                                multiple
                                className="hidden" 
                              />
                            </label>
                            <div className="mt-2 space-y-1">
                              <p className="text-xs text-gray-500">You can select multiple images at once. First image will be the primary image.</p>
                              <p className="text-xs text-blue-600 font-medium">📐 Recommended: 800x800px or 1200x1200px (Square) | Max size: 5MB | Format: JPG, PNG, WebP</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex gap-2">
                              <input
                                type="url"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="input-field flex-1"
                                onKeyPress={(e) => {
                                  if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleAddImageUrl();
                                  }
                                }}
                              />
                              <button
                                type="button"
                                onClick={handleAddImageUrl}
                                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                              >
                                Add
                              </button>
                            </div>
                            <div className="mt-2 space-y-1">
                              <p className="text-xs text-gray-500">Paste the direct URL of the image and click Add</p>
                              <p className="text-xs text-blue-600 font-medium">📐 Use high-quality images (800x800px or 1200x1200px recommended)</p>
                            </div>
                          </>
                        )}
                      </div>

                      {/* Image Gallery Grid */}
                      {formData.images.length > 0 ? (
                        <div className="grid grid-cols-4 gap-3">
                          {formData.images.map((img, idx) => (
                            <div 
                              key={idx} 
                              className="relative group rounded-lg overflow-hidden border-2 border-gray-200 hover:border-primary transition-colors"
                            >
                              <img 
                                src={img} 
                                alt={`Product ${idx + 1}`} 
                                className="w-full h-32 object-cover" 
                              />
                              
                              {/* Primary Badge */}
                              {idx === 0 && (
                                <div className="absolute top-2 left-2 bg-primary text-white text-xs px-2 py-1 rounded font-medium">
                                  Primary
                                </div>
                              )}

                              {/* Hover Actions */}
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                                {idx !== 0 && (
                                  <button
                                    type="button"
                                    onClick={() => handleSetPrimaryImage(idx)}
                                    className="bg-white text-gray-700 px-3 py-1 rounded text-xs font-medium hover:bg-gray-100"
                                    title="Set as primary"
                                  >
                                    Set Primary
                                  </button>
                                )}
                                <button
                                  type="button"
                                  onClick={() => handleRemoveImage(idx)}
                                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                                  title="Remove image"
                                >
                                  <X className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Image Number */}
                              <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded">
                                {idx + 1}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                          <ImageIcon className="w-12 h-12 text-gray-300 mb-3" />
                          <p className="text-sm text-gray-500">No images uploaded yet</p>
                          <p className="text-xs text-gray-400 mt-1">Upload images using the button above</p>
                        </div>
                      )}
                    </div>

                    {/* SEO Section */}
                    <div className="bg-white shadow rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">SEO Settings</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Meta Title</label>
                          <input
                            type="text"
                            value={formData.metaTitle}
                            onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                            className="input-field"
                            placeholder="Enter meta title for SEO (recommended: 50-60 characters)"
                            maxLength={60}
                          />
                          <p className="text-xs text-gray-500 mt-1">{formData.metaTitle.length}/60 characters</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Meta Description</label>
                          <textarea
                            value={formData.metaDescription}
                            onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                            rows={3}
                            className="input-field resize-none"
                            placeholder="Enter meta description for search engines (recommended: 150-160 characters)"
                            maxLength={160}
                          />
                          <p className="text-xs text-gray-500 mt-1">{formData.metaDescription.length}/160 characters</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2 text-gray-700">Meta Keywords</label>
                          <input
                            type="text"
                            value={formData.metaKeywords}
                            onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                            className="input-field"
                            placeholder="keyword1, keyword2, keyword3"
                          />
                          <p className="text-xs text-gray-500 mt-1">Separate keywords with commas</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column - Quick Info & Settings (30%) */}
                  <div className="w-[30%] space-y-6">
                    {/* Quick Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 sticky top-24">
                      <h4 className="font-semibold text-gray-900 mb-4">Quick Summary</h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="text-gray-600 mb-1">Product Name</p>
                          <p className="font-medium text-gray-900">{formData.name || 'Not set'}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Category</p>
                          <p className="font-medium text-gray-900 capitalize">{formData.category || 'Not selected'}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Price</p>
                          <p className="font-medium text-gray-900">₹{formData.price || 0}</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Stock</p>
                          <p className="font-medium text-gray-900">{formData.stock || 0} units</p>
                        </div>
                        <div>
                          <p className="text-gray-600 mb-1">Images</p>
                          <p className="font-medium text-gray-900">{formData.images.length} uploaded</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Product Settings */}
                    <div className="bg-white shadow rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900">Product Settings</h3>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isFeatured}
                            onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <span className="text-sm font-medium text-gray-700">Featured Product</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isTopRated}
                            onChange={(e) => setFormData({ ...formData, isTopRated: e.target.checked })}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <span className="text-sm font-medium text-gray-700">Top Rated</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isTopSale}
                            onChange={(e) => setFormData({ ...formData, isTopSale: e.target.checked })}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <span className="text-sm font-medium text-gray-700">Top Sale</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isActive}
                            onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                            className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
                          />
                          <span className="text-sm font-medium text-gray-700">Active</span>
                        </label>
                      </div>
                    </div>

                    {/* Help Tips */}
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h4 className="font-semibold text-blue-900 mb-2">💡 Tips</h4>
                      <ul className="text-xs text-blue-800 space-y-2">
                        <li>• Use high-quality square images</li>
                        <li>• First image is the primary image</li>
                        <li>• Fill SEO fields for better ranking</li>
                        <li>• Set compare price for discounts</li>
                        <li>• Mark featured products wisely</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 -mx-4 sm:-mx-6 lg:-mx-8">
                  <div className="max-w-7xl mx-auto flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetForm();
                      }}
                      className="btn-secondary px-8"
                    >
                      Cancel
                    </button>
                    <button type="submit" disabled={loading} className="btn-primary px-8">
                      {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Create Product'}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}