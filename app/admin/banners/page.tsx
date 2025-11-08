'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { IBanner } from '@/models/Banner';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Pencil, Trash2, Plus, Upload, Link2 } from 'lucide-react';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<IBanner[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<IBanner | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    buttonText: '',
    buttonLink: '/shop',
    order: 0,
    isActive: true,
  });

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get('/api/banners');
      if (response.data.success) {
        setBanners(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch banners');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingBanner) {
        await axios.put(`/api/banners/${editingBanner._id}`, formData);
        toast.success('Banner updated successfully');
      } else {
        await axios.post('/api/banners', formData);
        toast.success('Banner created successfully');
      }

      setShowModal(false);
      resetForm();
      fetchBanners();
    } catch (error) {
      toast.error('Failed to save banner');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;

    try {
      await axios.delete(`/api/banners/${id}`);
      toast.success('Banner deleted successfully');
      fetchBanners();
    } catch (error) {
      toast.error('Failed to delete banner');
    }
  };

  const handleEdit = (banner: IBanner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      description: banner.description,
      image: banner.image,
      buttonText: banner.buttonText,
      buttonLink: banner.buttonLink || '/shop',
      order: banner.order,
      isActive: banner.isActive,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: '',
      buttonText: '',
      buttonLink: '/shop',
      order: 0,
      isActive: true,
    });
    setEditingBanner(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('folder', 'banners');

    try {
      const response = await axios.post('/api/upload', uploadFormData);
      if (response.data.success) {
        setFormData({ ...formData, image: response.data.data.url });
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      toast.error('Failed to upload image');
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Hero Slider / Banners</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Banner
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {banners.map((banner) => (
              <tr key={banner._id}>
                <td className="px-6 py-4">
                  {banner.image && (
                    <img src={banner.image} alt={banner.title} className="w-24 h-16 object-cover rounded" />
                  )}
                </td>
                <td className="px-6 py-4 font-medium">{banner.title}</td>
                <td className="px-6 py-4 max-w-xs truncate">{banner.description}</td>
                <td className="px-6 py-4">{banner.order}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${banner.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {banner.isActive ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(banner)} className="text-blue-600 hover:text-blue-800">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(banner._id!)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {banners.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No banners found. Add your first banner to get started!
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editingBanner ? 'Edit Banner' : 'Add Banner'}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      required
                      placeholder="New Collection 2024"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Description *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows={2}
                      placeholder="Discover our latest arrivals"
                      className="input-field resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Button Text *</label>
                    <input
                      type="text"
                      value={formData.buttonText}
                      onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                      required
                      placeholder="Shop Now"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Button Link</label>
                    <input
                      type="text"
                      value={formData.buttonLink}
                      onChange={(e) => setFormData({ ...formData, buttonLink: e.target.value })}
                      placeholder="/shop"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Order (for sorting)</label>
                    <input
                      type="number"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: Number(e.target.value) })}
                      min="0"
                      className="input-field"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Banner Image *</label>
                    
                    {/* Upload Method Toggle */}
                    <div className="flex gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setUploadMethod('file')}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          uploadMethod === 'file'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Upload className="w-4 h-4 inline mr-1" />
                        Upload File
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadMethod('url')}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          uploadMethod === 'url'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Link2 className="w-4 h-4 inline mr-1" />
                        Image URL
                      </button>
                    </div>

                    {uploadMethod === 'file' ? (
                      <>
                        <input type="file" onChange={handleImageUpload} accept="image/*" className="input-field" />
                        <div className="mt-1 space-y-1">
                          <p className="text-xs text-blue-600 font-medium">📐 Recommended: 1920x600px (Desktop) or 1200x400px (Mobile-friendly) | Max size: 5MB | Format: JPG, PNG, WebP</p>
                          <p className="text-xs text-gray-500">Hero slider images should be wide format with a 3:1 aspect ratio for best display</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <input
                          type="url"
                          value={formData.image}
                          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                          placeholder="https://example.com/banner.jpg"
                          className="input-field"
                        />
                        <div className="mt-1 space-y-1">
                          <p className="text-xs text-gray-500">Paste the direct URL of the banner image</p>
                          <p className="text-xs text-blue-600 font-medium">📐 Recommended: 1920x600px (Desktop) or 1200x400px (Mobile-friendly) | Format: JPG, PNG, WebP</p>
                        </div>
                      </>
                    )}

                    {formData.image && (
                      <img src={formData.image} alt="Preview" className="mt-2 w-full h-32 object-cover rounded" />
                    )}
                  </div>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                    <span className="text-sm font-medium">Active</span>
                  </label>
                </div>

                <div className="flex gap-3 justify-end">
                  <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading || !formData.image} className="btn-primary disabled:opacity-50">
                    {loading ? 'Saving...' : editingBanner ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
