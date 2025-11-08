'use client';

import { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { IBlog } from '@/models/Blog';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Editor } from '@tinymce/tinymce-react';
import { Pencil, Trash2, Plus, Upload, Link2 } from 'lucide-react';
import { generateSlug } from '@/lib/utils';

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBlog, setEditingBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');
  const [metaUploadMethod, setMetaUploadMethod] = useState<'file' | 'url'>('file');
  const editorRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    author: '',
    shortDescription: '',
    content: '',
    image: '',
    metaImage: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
    tags: [] as string[],
    category: '',
    isActive: true,
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs');
      if (response.data.success) {
        setBlogs(response.data.data);
      }
    } catch (error) {
      toast.error('Failed to fetch blogs');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const blogData = {
        ...formData,
        content: editorRef.current?.getContent() || formData.content,
      };

      if (editingBlog) {
        await axios.put(`/api/blogs/${editingBlog._id}`, blogData);
        toast.success('Blog updated successfully');
      } else {
        await axios.post('/api/blogs', blogData);
        toast.success('Blog created successfully');
      }

      setShowModal(false);
      resetForm();
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to save blog');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;

    try {
      await axios.delete(`/api/blogs/${id}`);
      toast.success('Blog deleted successfully');
      fetchBlogs();
    } catch (error) {
      toast.error('Failed to delete blog');
    }
  };

  const handleEdit = (blog: IBlog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      slug: blog.slug,
      author: blog.author,
      shortDescription: blog.shortDescription,
      content: blog.content,
      image: blog.image,
      metaImage: blog.metaImage || '',
      metaTitle: blog.metaTitle || '',
      metaDescription: blog.metaDescription || '',
      metaKeywords: blog.metaKeywords || '',
      tags: blog.tags || [],
      category: blog.category || '',
      isActive: blog.isActive,
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      author: '',
      shortDescription: '',
      content: '',
      image: '',
      metaImage: '',
      metaTitle: '',
      metaDescription: '',
      metaKeywords: '',
      tags: [],
      category: '',
      isActive: true,
    });
    setEditingBlog(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'image' | 'metaImage') => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('folder', 'blogs');

    try {
      const response = await axios.post('/api/upload', uploadFormData);
      if (response.data.success) {
        setFormData({ ...formData, [field]: response.data.data.url });
        toast.success('Image uploaded successfully');
      }
    } catch (error) {
      toast.error('Failed to upload image');
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Blogs / News Updates</h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Blog Post
        </button>
      </div>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Image</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Author</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Published</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td className="px-6 py-4">
                  {blog.image && (
                    <img src={blog.image} alt={blog.title} className="w-20 h-12 object-cover rounded" />
                  )}
                </td>
                <td className="px-6 py-4 font-medium max-w-xs truncate">{blog.title}</td>
                <td className="px-6 py-4">{blog.author}</td>
                <td className="px-6 py-4 text-sm">
                  {blog.publishedAt ? new Date(blog.publishedAt).toLocaleDateString() : 'N/A'}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${blog.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {blog.isActive ? 'Published' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(blog)} className="text-blue-600 hover:text-blue-800">
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(blog._id!)} className="text-red-600 hover:text-red-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {blogs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No blogs found. Create your first blog post!
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50">
          <div className="flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 className="text-2xl font-bold mb-6">
                {editingBlog ? 'Edit Blog Post' : 'Add Blog Post'}
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-1">Blog Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value, slug: generateSlug(e.target.value) })}
                      required
                      className="input-field"
                      placeholder="Enter blog title..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Author *</label>
                    <input
                      type="text"
                      value={formData.author}
                      onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                      required
                      className="input-field"
                      placeholder="Author name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="input-field"
                      placeholder="e.g., Technology, News, Tips"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Short Description * (Max 350 characters)
                  </label>
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                    required
                    maxLength={350}
                    rows={3}
                    className="input-field resize-none"
                    placeholder="Brief description..."
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    {formData.shortDescription.length}/350 characters
                  </p>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Blog Content *</label>
                  <Editor
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    init={{
                      height: 400,
                      menubar: false,
                      plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
                      toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat',
                    }}
                    initialValue={formData.content}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Featured Image *</label>
                    
                    {/* Upload Method Toggle */}
                    <div className="flex gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setUploadMethod('file')}
                        className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                          uploadMethod === 'file'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Upload className="w-3 h-3 inline mr-1" />
                        Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => setUploadMethod('url')}
                        className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                          uploadMethod === 'url'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Link2 className="w-3 h-3 inline mr-1" />
                        URL
                      </button>
                    </div>

                    {uploadMethod === 'file' ? (
                      <input type="file" onChange={(e) => handleImageUpload(e, 'image')} accept="image/*" className="input-field" />
                    ) : (
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                        className="input-field"
                      />
                    )}
                    {formData.image && (
                      <img src={formData.image} alt="Preview" className="mt-2 w-full h-32 object-cover rounded" />
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">Meta Image (for SEO)</label>
                    
                    {/* Upload Method Toggle for Meta Image */}
                    <div className="flex gap-2 mb-2">
                      <button
                        type="button"
                        onClick={() => setMetaUploadMethod('file')}
                        className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                          metaUploadMethod === 'file'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Upload className="w-3 h-3 inline mr-1" />
                        Upload
                      </button>
                      <button
                        type="button"
                        onClick={() => setMetaUploadMethod('url')}
                        className={`flex-1 px-2 py-1 rounded text-xs font-medium transition-colors ${
                          metaUploadMethod === 'url'
                            ? 'bg-primary text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Link2 className="w-3 h-3 inline mr-1" />
                        URL
                      </button>
                    </div>

                    {metaUploadMethod === 'file' ? (
                      <input type="file" onChange={(e) => handleImageUpload(e, 'metaImage')} accept="image/*" className="input-field" />
                    ) : (
                      <input
                        type="url"
                        value={formData.metaImage}
                        onChange={(e) => setFormData({ ...formData, metaImage: e.target.value })}
                        placeholder="https://example.com/meta-image.jpg"
                        className="input-field"
                      />
                    )}
                    {formData.metaImage && (
                      <img src={formData.metaImage} alt="Meta Preview" className="mt-2 w-full h-32 object-cover rounded" />
                    )}
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <h3 className="font-semibold mb-3">SEO Settings</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Meta Title</label>
                      <input
                        type="text"
                        value={formData.metaTitle}
                        onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                        className="input-field"
                        placeholder="SEO title (defaults to blog title)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Meta Description</label>
                      <textarea
                        value={formData.metaDescription}
                        onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                        rows={2}
                        className="input-field resize-none"
                        placeholder="SEO description"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Meta Keywords (comma separated)</label>
                      <input
                        type="text"
                        value={formData.metaKeywords}
                        onChange={(e) => setFormData({ ...formData, metaKeywords: e.target.value })}
                        className="input-field"
                        placeholder="keyword1, keyword2, keyword3"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Tags (comma separated)</label>
                      <input
                        type="text"
                        value={formData.tags.join(', ')}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })}
                        className="input-field"
                        placeholder="tag1, tag2, tag3"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    />
                    <span className="text-sm font-medium">Publish (Make it visible on website)</span>
                  </label>
                </div>

                <div className="flex gap-3 justify-end">
                  <button type="button" onClick={() => { setShowModal(false); resetForm(); }} className="btn-secondary">
                    Cancel
                  </button>
                  <button type="submit" disabled={loading || !formData.image} className="btn-primary disabled:opacity-50">
                    {loading ? 'Saving...' : editingBlog ? 'Update' : 'Create'}
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
