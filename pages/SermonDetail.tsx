import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User, Tag, Play, ExternalLink } from 'lucide-react';
import { Sermon } from '../types';
import { api } from '../services/api';

const SermonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSermon = async () => {
      try {
        if (id) {
          const foundSermon = await api.getSermon(id);
          if (foundSermon) {
            setSermon(foundSermon);
          } else {
            setError('Sermon not found');
          }
        }
      } catch (err) {
        setError('Failed to load sermon');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSermon();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-church-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading sermon...</p>
        </div>
      </div>
    );
  }

  if (error || !sermon) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Sermon Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The sermon you\'re looking for doesn\'t exist.'}</p>
          <Link to="/sermons" className="text-church-600 hover:text-church-800 font-medium">
            ← Back to Sermons
          </Link>
        </div>
      </div>
    );
  }

  const getVideoEmbedUrl = (url: string) => {
    if (!url) return null;
    
    // YouTube URL conversion
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // YouTube short URL
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    
    // Vimeo URL conversion
    if (url.includes('vimeo.com/')) {
      const videoId = url.split('vimeo.com/')[1]?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    
    return url; // Return as-is if not recognized
  };

  const embedUrl = getVideoEmbedUrl(sermon.videoUrl || '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link 
            to="/sermons" 
            className="inline-flex items-center text-church-600 hover:text-church-800 font-medium mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Sermons
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 font-serif mb-2">
                {sermon.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-2">
                  <User size={16} />
                  <span>{sermon.speaker}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(sermon.date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}</span>
                </div>
                {sermon.series && (
                  <div className="text-church-600 font-medium">
                    Series: {sermon.series}
                  </div>
                )}
              </div>
            </div>
            
            {sermon.videoUrl && (
              <div className="flex gap-3">
                {embedUrl && (
                  <button 
                    onClick={() => document.getElementById('video-player')?.scrollIntoView({ behavior: 'smooth' })}
                    className="flex items-center gap-2 px-4 py-2 bg-church-600 text-white rounded-lg hover:bg-church-700 transition-colors"
                  >
                    <Play size={16} />
                    Watch Now
                  </button>
                )}
                <a 
                  href={sermon.videoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <ExternalLink size={16} />
                  Open Original
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Video Player */}
        {embedUrl && (
          <div id="video-player" className="mb-8">
            <div className="aspect-video bg-black rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={embedUrl}
                title={sermon.title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {/* Thumbnail if no video */}
        {!embedUrl && sermon.thumbnail && (
          <div className="mb-8">
            <img 
              src={sermon.thumbnail} 
              alt={sermon.title}
              className="w-full aspect-video object-cover rounded-lg shadow-lg"
            />
            {sermon.videoUrl && (
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-yellow-800">
                  <strong>Video Available:</strong> 
                  <a 
                    href={sermon.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-2 text-church-600 hover:text-church-800 underline"
                  >
                    Watch on external platform
                  </a>
                </p>
              </div>
            )}
          </div>
        )}

        {/* Topics */}
        {sermon.topics && sermon.topics.length > 0 && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Tag size={16} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Topics:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sermon.topics.map((topic, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-church-100 text-church-800 rounded-full text-sm font-medium"
                >
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Sermon Content Placeholder */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 font-serif">About This Sermon</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-600 leading-relaxed">
              This sermon "{sermon.title}" was delivered by {sermon.speaker} as part of the {sermon.series || 'sermon'} series. 
              Join us as we explore the depths of God's word and discover how it applies to our daily lives.
            </p>
            
            {/* Note: In a full implementation, you would fetch the full sermon content from TinaCMS */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-blue-800 text-sm">
                <strong>Note:</strong> Full sermon notes and transcript will be available here. 
                This content can be managed through the TinaCMS admin panel.
              </p>
            </div>
          </div>
        </div>

        {/* Related Sermons */}
        <div className="mt-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6 font-serif">More from this Series</h3>
          <div className="text-center py-8 text-gray-500">
            <p>Related sermons will appear here</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SermonDetail;