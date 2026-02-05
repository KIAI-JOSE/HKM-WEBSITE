import React, { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { api } from '../services/api';

const Gallery: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Photos');

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const items = await api.getGallery();
        setGalleryItems(items);
      } catch (err) {
        setError('Failed to load gallery items');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  // Get unique categories from gallery items
  const categories = ['All Photos', ...Array.from(new Set(galleryItems.map(item => item.category)))];
  
  // Filter items based on selected category
  const filteredItems = selectedCategory === 'All Photos' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === selectedCategory);
  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="bg-church-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Media Gallery</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Highlights from our services, events, and community life.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Categories */}
        {!loading && !error && (
          <div className="flex flex-wrap justify-center gap-2 mb-10 font-nav">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-church-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-church-600" />
            <span className="ml-2 text-gray-600">Loading gallery...</span>
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-600">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-sm cursor-pointer break-inside-avoid">
                <div className="aspect-square">
                   <img 
                      src={item.imageUrl} 
                      alt={item.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://picsum.photos/seed/gallery_fallback/600/600';
                      }}
                   />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                   <span className="text-church-400 text-xs font-bold uppercase tracking-wider mb-1 font-nav">{item.category}</span>
                   <h3 className="text-white text-lg font-bold font-serif">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filteredItems.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p>No gallery items found{selectedCategory !== 'All Photos' ? ` in "${selectedCategory}"` : ''}.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;