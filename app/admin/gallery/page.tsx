'use client';

import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { CloudUpload, Edit, Trash2, Eye, Plus, Link, Upload } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface IGallery {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function AdminGalleryPage() {
  const [galleries, setGalleries] = useState<IGallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploadMethod, setUploadMethod] = useState<'url' | 'upload'>('url');
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    category: '',
    isActive: true
  });

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const response = await axios.get('/api/gallery');
      if (response.data.success) {
        setGalleries(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
      toast.error('Failed to fetch galleries');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileUpload = async (file: File) => {
    setIsUploading(true);
    try {
      // Create form data for Cloudinary upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'zanbu_gallery'); // You'll need to set this in Cloudinary
      
      // Upload to Cloudinary
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      
      return response.data.secure_url;
    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const imageUrl = await handleFileUpload(file);
      setFormData({ ...formData, imageUrl });
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        // Update existing gallery
        await axios.put('/api/gallery', { id: editingId, ...formData });
        toast.success('Gallery updated successfully');
      } else {
        // Create new gallery
        await axios.post('/api/gallery', formData);
        toast.success('Gallery created successfully');
      }
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        imageUrl: '',
        category: '',
        isActive: true
      });
      setEditingId(null);
      setShowForm(false);
      
      // Refresh galleries
      fetchGalleries();
    } catch (error) {
      console.error('Error saving gallery:', error);
      toast.error('Failed to save gallery');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (gallery: IGallery) => {
    setFormData({
      title: gallery.title,
      description: gallery.description || '',
      imageUrl: gallery.imageUrl,
      category: gallery.category || '',
      isActive: gallery.isActive
    });
    setEditingId(gallery._id);
    setShowForm(true);
    setUploadMethod('url'); // Default to URL when editing
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this gallery item?')) return;

    try {
      await axios.delete(`/api/gallery?id=${id}`);
      toast.success('Gallery deleted successfully');
      fetchGalleries();
    } catch (error) {
      console.error('Error deleting gallery:', error);
      toast.error('Failed to delete gallery');
    }
  };

  const handleCancel = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      category: '',
      isActive: true
    });
    setEditingId(null);
    setShowForm(false);
    setUploadMethod('url');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gallery Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add New Image
        </button>
      </div>

      {showForm ? (
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6">
            {editingId ? 'Edit Gallery Image' : 'Add New Gallery Image'}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter image title"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter category (optional)"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Method
                </label>
                <div className="flex gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setUploadMethod('url')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                      uploadMethod === 'url' 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    <Link className="w-4 h-4" />
                    Image URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadMethod('upload')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                      uploadMethod === 'upload' 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white text-gray-700 border-gray-300'
                    }`}
                  >
                    <Upload className="w-4 h-4" />
                    Upload Image
                  </button>
                </div>
                
                {uploadMethod === 'url' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Image URL *
                    </label>
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                      placeholder="Enter image URL"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Upload Image *
                    </label>
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                    {isUploading && (
                      <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
                        Uploading...
                      </div>
                    )}
                  </div>
                )}
                
                {formData.imageUrl && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Image Preview</p>
                    <img 
                      src={formData.imageUrl} 
                      alt="Preview" 
                      className="w-32 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter description (optional)"
                ></textarea>
              </div>
              
              <div className="md:col-span-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>
            </div>
            
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading || (uploadMethod === 'upload' && !formData.imageUrl)}
                className="btn-primary py-2 px-6 flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Saving...
                  </>
                ) : (
                  <>
                    <CloudUpload className="w-5 h-5" />
                    {editingId ? 'Update Image' : 'Add Image'}
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={handleCancel}
                className="btn-secondary py-2 px-6"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : null}

      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Gallery Images</h2>
        </div>
        
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-600">Loading gallery images...</p>
          </div>
        ) : galleries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {galleries.map((gallery) => (
              <div key={gallery._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <img 
                    src={gallery.imageUrl} 
                    alt={gallery.title} 
                    className="w-full h-48 object-cover"
                  />
                  {!gallery.isActive && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                      Inactive
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-1">{gallery.title}</h3>
                  {gallery.category && (
                    <p className="text-sm text-gray-500 mb-2">Category: {gallery.category}</p>
                  )}
                  <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                    {gallery.description || 'No description'}
                  </p>
                  
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(gallery)}
                      className="flex-1 flex items-center justify-center gap-1 bg-blue-50 text-blue-600 hover:bg-blue-100 py-2 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                      <span className="text-sm">Edit</span>
                    </button>
                    
                    <button
                      onClick={() => handleDelete(gallery._id)}
                      className="flex-1 flex items-center justify-center gap-1 bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span className="text-sm">Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Eye className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No gallery images</h3>
            <p className="text-gray-500 mb-4">Get started by adding a new gallery image.</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              Add First Image
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}