import React from 'react';
import { GALLERY_IMAGES } from '../constants';

const Gallery: React.FC = () => {
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
        <div className="flex flex-wrap justify-center gap-2 mb-10 font-nav">
          <button className="px-4 py-2 bg-church-600 text-white rounded-full text-sm font-medium">All Photos</button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">Worship</button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">Events</button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">Outreach</button>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-full text-sm font-medium transition-colors">Youth</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((item) => (
            <div key={item.id} className="group relative overflow-hidden rounded-lg shadow-sm cursor-pointer break-inside-avoid">
              <div className="aspect-square">
                 <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                 />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                 <span className="text-church-400 text-xs font-bold uppercase tracking-wider mb-1 font-nav">{item.category}</span>
                 <h3 className="text-white text-lg font-bold font-serif">{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;