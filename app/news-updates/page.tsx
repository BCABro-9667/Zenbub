'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { IBlog } from '@/models/Blog';
import { Calendar, User, Tag } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';

export default function NewsUpdatesPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

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
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-50">
        {/* Page Heading */}
        <section className="py-8 bg-white">
          <div className="container text-center">
            <h1 className="text-3xl font-bold text-gray-900 inline-block relative mx-auto after:content-[''] after:block after:w-2/5 after:h-1 after:bg-black after:mx-auto after:mt-2">News & Updates</h1>
          </div>
        </section>

        <div className="bg-gray-100 py-4">
          <div className="container">
            <div className="text-center">
              <p className="text-gray-600">
                View our latest projects and updates in{' '}
                <a href="/gallery" className="text-primary font-semibold hover:underline">
                  our gallery
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="container py-12">
          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link
                  key={blog._id}
                  href={`/news-updates/${blog.slug}`}
                  className="card overflow-hidden group"
                >
                  {/* Blog Image */}
                  <div className="h-48 overflow-hidden bg-gray-200">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Blog Content */}
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {blog.shortDescription}
                    </p>

                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{blog.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {blog.publishedAt
                            ? new Date(blog.publishedAt).toLocaleDateString()
                            : 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    {blog.tags && blog.tags.length > 0 && (
                      <div className="flex items-center gap-2 mt-4 flex-wrap">
                        {blog.tags.slice(0, 3).map((tag, index) => (
                          <span
                            key={index}
                            className="bg-primary/10 text-primary px-2 py-1 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-4 text-primary font-semibold group-hover:underline">
                      Read More →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No blog posts found.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}