import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, PlayCircle, Loader2 } from 'lucide-react';
import { Sermon } from '../types';
import { api } from '../services/api';

const Sermons: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch data on component mount
  useEffect(() => {
    const fetchSermons = async () => {
      try {
        const data = await api.getSermons();
        setSermons(data);
      } catch (err) {
        setError('Failed to load sermons. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSermons();
  }, []);

  const filteredSermons = sermons.filter(sermon => 
    sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sermon.topics.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <div className="bg-church-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Sermon Library</h1>
          <p className="text-gray-300 max-w-2xl mx-auto">Access our archive of messages to help you grow in your walk with God.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by title, speaker, or topic..." 
              className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-church-500 focus:border-transparent font-sans"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-md transition-colors w-full md:w-auto justify-center font-nav font-medium">
            <Filter size={20} /> Filter
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-500">
            <Loader2 className="w-10 h-10 animate-spin text-church-600 mb-4" />
            <p>Loading sermons library...</p>
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="text-center py-20 text-red-500 bg-red-50 rounded-lg border border-red-100">
            <p>{error}</p>
          </div>
        )}

        {/* Data State */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSermons.map((sermon) => (
              <div key={sermon.id} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all overflow-hidden flex flex-col h-full group animate-in fade-in duration-500">
                <Link to={`/sermon/${sermon.id}`} className="relative aspect-video">
                  <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-white" />
                  </div>
                </Link>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-sm text-church-600 font-semibold mb-2 font-nav">{sermon.date}</div>
                  <Link to={`/sermon/${sermon.id}`}>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif hover:text-church-700 transition-colors">{sermon.title}</h3>
                  </Link>
                  <p className="text-gray-600 text-sm mb-4">Speaker: <span className="font-medium">{sermon.speaker}</span></p>
                  
                  <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                    <div className="flex gap-2">
                      {sermon.topics.slice(0, 2).map(t => (
                        <span key={t} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-nav">{t}</span>
                      ))}
                    </div>
                    <Link 
                      to={`/sermon/${sermon.id}`}
                      className="text-church-600 hover:text-church-800 font-medium text-sm font-nav"
                    >
                      Watch Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {!loading && !error && filteredSermons.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p>No sermons found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sermons;