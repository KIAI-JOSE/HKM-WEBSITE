import React from 'react';
import { BookOpen, User, Calendar } from 'lucide-react';
import { BLOG_POSTS } from '../constants';

const Blog: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-church-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Blog & Devotionals</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Weekly inspiration, teachings, and updates to help you grow in your faith walk.</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-8">
        <div className="space-y-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
              <div className="md:flex">
                <div className="md:w-1/3 h-48 md:h-auto relative">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:p-8 md:w-2/3 flex flex-col">
                  <div className="flex items-center gap-2 text-xs font-bold text-church-600 uppercase mb-3 font-nav">
                    <span className="bg-church-50 px-2 py-1 rounded">{post.category}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 font-serif hover:text-church-700 cursor-pointer">{post.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                  
                  <div className="mt-auto flex items-center justify-between text-sm text-gray-500 font-nav">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1"><User size={14} /> {post.author}</span>
                      <span className="flex items-center gap-1"><Calendar size={14} /> {post.date}</span>
                    </div>
                    <button className="text-church-600 font-semibold hover:underline flex items-center gap-1">
                      Read More <BookOpen size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        
        {/* Pagination Placeholder */}
        <div className="flex justify-center mt-12 gap-2 font-nav">
           <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 disabled:opacity-50">Previous</button>
           <button className="px-4 py-2 bg-church-600 text-white rounded hover:bg-church-700">1</button>
           <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">2</button>
           <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">3</button>
           <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">Next</button>
        </div>
      </div>
    </div>
  );
};

export default Blog;