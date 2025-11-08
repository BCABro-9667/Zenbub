'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import axios from 'axios';
import { Filter } from 'lucide-react';

interface IGallery {
  _id: string;
  title: string;
  description?: string;
  imageUrl: string;
  category?: string;
  isActive: boolean;
  createdAt: string;
}

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<IGallery[]>([]);
  const [filteredGalleries, setFilteredGalleries] = useState<IGallery[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  useEffect(() => {
    // Filter galleries based on selected category
    if (selectedCategory === 'all') {
      setFilteredGalleries(galleries);
    } else {
      setFilteredGalleries(galleries.filter(gallery => gallery.category === selectedCategory));
    }
  }, [selectedCategory, galleries]);

  const fetchGalleries = async () => {
    try {
      const response = await axios.get('/api/gallery?isActive=true');
      if (response.data.success) {
        setGalleries(response.data.data);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(response.data.data.map((item: IGallery) => item.category).filter(Boolean))
        ) as string[];
        setCategories(uniqueCategories);
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
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
            <h1 className="text-3xl font-bold text-gray-900 inline-block relative mx-auto after:content-[''] after:block after:w-2/5 after:h-1 after:bg-black after:mx-auto after:mt-2">
              Our Gallery
            </h1>
          </div>
        </section>

        <div className="container py-12">
          {/* Category Filter */}
          {categories.length > 0 && (
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Filter className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700 font-medium">Filter by category:</span>
              </div>
              
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-primary text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  All
                </button>
                
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          ) : filteredGalleries.length > 0 ? (
            <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
              {filteredGalleries.map((gallery) => (
                <div 
                  key={gallery._id} 
                  className="break-inside-avoid bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    <img 
                      src={gallery.imageUrl} 
                      alt={gallery.title} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900 mb-1">{gallery.title}</h3>
                    {gallery.category && (
                      <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mb-2">
                        {gallery.category}
                      </span>
                    )}
                    {gallery.description && (
                      <p className="text-gray-600 text-sm">
                        {gallery.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">No gallery images found.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}