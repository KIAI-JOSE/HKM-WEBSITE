import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Book, Loader2 } from 'lucide-react';
import { api } from '../services/api';

const About: React.FC = () => {
  const [staff, setStaff] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const staffData = await api.getStaff();
        setStaff(staffData);
      } catch (error) {
        console.error('Failed to load staff:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaff();
  }, []);
  return (
    <div className="bg-white">
      {/* Header */}
      <div className="bg-church-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-church-900 mb-6">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            HKM Ministries International is a community of believers dedicated to worship, outreach, and discipleship.
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-church-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              To proclaim the Gospel of Jesus Christ <span className="text-church-600 font-medium">(Mark 16:15)</span>, disciple believers <span className="text-church-600 font-medium">(Matthew 28:19-20)</span>, and serve our community with love and compassion <span className="text-church-600 font-medium">(Galatians 5:13)</span>.
            </p>
            <h2 className="text-3xl font-serif font-bold text-church-900 mb-6">Our Vision</h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              To see a world transformed by the love of Christ <span className="text-church-600 font-medium">(2 Corinthians 5:17)</span>, where individuals and communities thrive spiritually, emotionally, and socially.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-church-100 rounded-xl transform rotate-2"></div>
            <img 
              src="https://picsum.photos/seed/mission/800/600" 
              alt="Community" 
              className="relative rounded-lg shadow-xl w-full"
            />
          </div>
        </div>
      </div>

      {/* Core Values Section */}
      <div className="bg-church-900 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-serif font-bold mb-4">Our Core Values</h2>
               <p className="text-gray-300 max-w-2xl mx-auto">The principles that guide our ministry and community life.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                'Love', 'Integrity', 'Compassion', 'Kingdom-Mindedness', 
                'Unity', 'Excellence', 'Faith', 'Service'
              ].map((value) => (
                 <div key={value} className="bg-white/10 backdrop-blur-md p-6 rounded-xl flex flex-col items-center justify-center text-center font-bold tracking-wide border border-white/10 hover:bg-white/20 hover:scale-105 transition-all duration-300 group">
                    <Star className="w-6 h-6 text-church-gold mb-2 group-hover:rotate-12 transition-transform" />
                    <span className="text-lg">{value}</span>
                 </div>
              ))}
            </div>
         </div>
      </div>

      {/* Beliefs */}
      <div className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif font-bold text-church-900 text-center mb-12">What We Believe</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-church-700 mb-4">The Bible</h3>
              <p className="text-gray-600">We believe the Bible is the inspired, infallible, and authoritative Word of God.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-church-700 mb-4">The Trinity</h3>
              <p className="text-gray-600">We believe in one God, eternally existent in three persons: Father, Son, and Holy Spirit.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-church-700 mb-4">Salvation</h3>
              <p className="text-gray-600">We believe salvation is a free gift of God through faith in Jesus Christ alone.</p>
            </div>
          </div>
          <div className="text-center">
             <Link to="/statement-of-faith" className="inline-flex items-center gap-2 bg-church-600 text-white px-8 py-3 rounded-full font-bold hover:bg-church-700 transition-colors font-nav">
               <Book size={18} /> Read Our Full Statement of Faith
             </Link>
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-serif font-bold text-church-900 text-center mb-12">Our Leadership Team</h2>
        
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-church-600" />
            <span className="ml-2 text-gray-600">Loading staff...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-10">
            {staff.map((member) => (
              <div key={member.id} className="text-center group">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden shadow-lg border-4 border-white group-hover:border-church-100 transition-colors">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://picsum.photos/seed/staff_fallback/400/400';
                    }}
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                <p className="text-church-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-500 text-sm max-w-xs mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        )}
        
        {!loading && staff.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <p>No staff members found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default About;