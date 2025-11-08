'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { IBlog } from '@/models/Blog';
import { Calendar, User, Tag, Share2 } from 'lucide-react';
import axios from 'axios';
import Head from 'next/head';

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/blogs');
      
      if (response.data.success) {
        const foundBlog = response.data.data.find((b: IBlog) => b.slug === slug);
        if (foundBlog) {
          setBlog(foundBlog);
          
          // Get related blogs
          const related = response.data.data
            .filter((b: IBlog) => b._id !== foundBlog._id)
            .slice(0, 3);
          setRelatedBlogs(related);
        }
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  const shareOnSocial = (platform: string) => {
    const url = window.location.href;
    const title = blog?.title || '';
    
    const shareUrls: Record<string, string> = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      twitter: `https://twitter.com/intent/tweet?url=${url}&text=${title}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      whatsapp: `https://wa.me/?text=${title} ${url}`,
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
            <a href="/news-updates" className="btn-primary">
              Back to News & Updates
            </a>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{blog.metaTitle || blog.title}</title>
        <meta name="description" content={blog.metaDescription || blog.shortDescription} />
        <meta name="keywords" content={blog.metaKeywords || ''} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.shortDescription} />
        <meta property="og:image" content={blog.metaImage || blog.image} />
        <meta property="og:type" content="article" />
      </Head>

      <Header />
      
      <main className="min-h-screen bg-gray-50">
        <div className="container py-8">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-600 mb-6">
            <a href="/" className="hover:text-primary">Home</a>
            <span className="mx-2">/</span>
            <a href="/news-updates" className="hover:text-primary">News & Updates</a>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{blog.title}</span>
          </div>

          {/* Blog Post */}
          <article className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Featured Image */}
            <div className="h-96 overflow-hidden bg-gray-200">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="p-8 md:p-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {blog.title}
              </h1>

              {/* Meta Info */}
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
                <div className="flex items-center gap-2 text-gray-600">
                  <User className="w-5 h-5" />
                  <span>{blog.author}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {blog.publishedAt
                      ? new Date(blog.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'N/A'}
                  </span>
                </div>
              </div>

              {/* Blog Content */}
              <div 
                className="prose prose-lg max-w-none mb-8"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex items-center gap-2 mb-8 flex-wrap">
                  <Tag className="w-5 h-5 text-gray-600" />
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Share Buttons */}
              <div className="pt-8 border-t border-gray-200">
                <div className="flex items-center gap-4">
                  <span className="font-semibold text-gray-700 flex items-center gap-2">
                    <Share2 className="w-5 h-5" />
                    Share:
                  </span>
                  <button
                    onClick={() => shareOnSocial('facebook')}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                  >
                    Facebook
                  </button>
                  <button
                    onClick={() => shareOnSocial('twitter')}
                    className="px-4 py-2 bg-sky-500 text-white rounded hover:bg-sky-600 text-sm"
                  >
                    Twitter
                  </button>
                  <button
                    onClick={() => shareOnSocial('linkedin')}
                    className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 text-sm"
                  >
                    LinkedIn
                  </button>
                  <button
                    onClick={() => shareOnSocial('whatsapp')}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-sm"
                  >
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </article>

          {/* Related Blogs */}
          {relatedBlogs.length > 0 && (
            <div className="mt-12">
              <h2 className="text-3xl font-bold mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedBlogs.map((relatedBlog) => (
                  <a
                    key={relatedBlog._id}
                    href={`/news-updates/${relatedBlog.slug}`}
                    className="card overflow-hidden group"
                  >
                    <div className="h-40 overflow-hidden bg-gray-200">
                      <img
                        src={relatedBlog.image}
                        alt={relatedBlog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedBlog.shortDescription}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
