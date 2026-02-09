import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Video, Heart, MapPin, Clock, Facebook, Youtube } from 'lucide-react';
import { FEATURED_SERMONS, UPCOMING_EVENTS, SOCIAL_LINKS, GOOGLE_MAPS_URL } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <div className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/seed/churchhero/1920/1080" 
            alt="Worship Service" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-church-900/90 via-church-900/60 to-transparent"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center px-4 space-y-6">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white leading-tight drop-shadow-lg">
            Welcome Home to <br/><span className="text-church-500 font-brand">HKM Ministries</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto font-light leading-relaxed">
            A place where faith meets life. Join us this Sunday to experience uplifting worship, powerful teaching, and a welcoming community.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6 font-nav">
            <Link to="/contact" className="w-full sm:w-auto px-8 py-3 bg-church-600 hover:bg-church-500 text-white rounded-full font-semibold transition-all shadow-lg text-center">
              Plan a Visit
            </Link>
            <Link to="/sermons" className="w-full sm:w-auto px-8 py-3 bg-white hover:bg-gray-100 text-church-900 rounded-full font-semibold transition-all shadow-lg flex items-center justify-center gap-2">
              <Video size={18} /> Watch Online
            </Link>
          </div>
        </div>
      </div>

      {/* Livestream Section (New) */}
      <section className="bg-church-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <span className="inline-block bg-red-600 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">LIVE</span>
              <h2 className="text-3xl font-serif font-bold">Join Our Live Service</h2>
              <p className="text-gray-300">Can't make it in person? Worship with us from anywhere in the world. Sundays starting at 9:00 AM.</p>
              <Link to="/sermons" className="inline-block text-church-500 font-semibold hover:text-white transition-colors">
                Watch previous broadcasts &rarr;
              </Link>
            </div>
            <div className="flex-1 w-full aspect-video bg-black rounded-lg overflow-hidden shadow-2xl relative group">
              <img src="https://picsum.photos/seed/live/800/450" alt="Live Stream Placeholder" className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <Youtube className="w-16 h-16 text-white" />
              </div>
              <div className="absolute bottom-4 left-4 text-sm font-bold">Waiting for next broadcast...</div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times & Location Bar */}
      <div className="bg-gray-50 py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            {/* Service Times */}
            <div className="flex flex-col items-center gap-2 p-4">
              <Clock className="w-8 h-8 text-church-600 mb-1" />
              <h3 className="font-bold text-lg font-serif text-church-900 mb-2">Service Times</h3>
              <div className="text-sm text-gray-600 space-y-3 w-full max-w-xs mx-auto">
                <div>
                   <span className="block font-bold text-church-800 uppercase text-xs tracking-wider mb-1">Sundays</span>
                   <div className="flex justify-between border-b border-gray-200 py-1"><span>Intercessory</span> <span>6:30 AM - 8:00 AM</span></div>
                   <div className="flex justify-between border-b border-gray-200 py-1"><span>Youth Service</span> <span>8:00 AM - 9:00 AM</span></div>
                   <div className="flex justify-between border-b border-gray-200 py-1"><span>1st Service</span> <span>9:00 AM - 11:00 AM</span></div>
                   <div className="flex justify-between py-1"><span>2nd Service</span> <span>11:00 AM - 1:00 PM</span></div>
                </div>
                <div>
                   <span className="block font-bold text-church-800 uppercase text-xs tracking-wider mb-1 mt-2">Weekdays</span>
                   <div className="flex justify-between border-b border-gray-200 py-1"><span>Wed Midweek</span> <span>4:00 PM - 7:00 PM</span></div>
                   <div className="flex justify-between py-1"><span>Fri Home Cells</span> <span>5:00 PM - 6:00 PM</span></div>
                </div>
              </div>
            </div>

            {/* Location */}
            <div className="flex flex-col items-center justify-start gap-2 p-4">
              <MapPin className="w-8 h-8 text-church-600 mb-1" />
              <h3 className="font-bold text-lg font-serif text-church-900">Our Location</h3>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-church-600 text-center px-4 max-w-xs mx-auto transition-colors">
                PXH3+P46, Utawala, Mihango near Twinkids Academy
              </a>
              <p className="text-gray-500 text-sm">Nairobi, Kenya</p>
              <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="mt-4 text-church-600 text-sm hover:text-church-900 underline underline-offset-4 font-nav">View on Google Maps</a>
            </div>

            {/* Giving */}
            <div className="flex flex-col items-center justify-start gap-2 p-4">
              <Heart className="w-8 h-8 text-church-600 mb-1" />
              <h3 className="font-bold text-lg font-serif text-church-900">Give Online</h3>
              <p className="text-gray-600 max-w-xs mx-auto">Support the mission and ministry through your generous giving.</p>
              <Link to="/give" className="mt-4 text-church-600 text-sm hover:text-church-900 underline underline-offset-4 font-nav">Donate Now</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Sermon Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-church-900 text-3xl font-serif font-bold">Latest Sermons</h2>
              <p className="text-gray-600 mt-2">Catch up on recent messages and teachings.</p>
            </div>
            <Link to="/sermons" className="text-church-600 font-medium hover:text-church-800 flex items-center gap-1 font-nav">
              View All Sermons <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_SERMONS.map((sermon) => (
              <Link key={sermon.id} to={`/sermon/${sermon.id}`} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group border border-gray-100">
                <div className="relative aspect-video overflow-hidden">
                  <img src={sermon.thumbnail} alt={sermon.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center pl-1 shadow-lg opacity-80 group-hover:opacity-100 transition-opacity">
                      <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-church-800 border-b-[8px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-semibold text-church-600 uppercase tracking-wide mb-2 font-nav">{sermon.date}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-church-700 transition-colors">{sermon.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{sermon.speaker}</p>
                  <div className="flex flex-wrap gap-2">
                    {sermon.topics.map(topic => (
                      <span key={topic} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md font-nav">{topic}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="text-church-900 text-3xl font-serif font-bold">Upcoming Events</h2>
              <p className="text-gray-600 mt-2">Get involved and connect with our community.</p>
            </div>
            <Link to="/events" className="text-church-600 font-medium hover:text-church-800 flex items-center gap-1 font-nav">
              View Full Calendar <Calendar size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {UPCOMING_EVENTS.slice(0, 2).map((event) => (
              <div key={event.id} className="flex flex-col md:flex-row bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all">
                <div className="md:w-2/5 h-48 md:h-auto relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-2 rounded-lg text-center shadow-sm">
                    <span className="block text-xs font-bold text-gray-500 uppercase font-nav">NOV</span>
                    <span className="block text-2xl font-bold text-church-900 font-serif">15</span>
                  </div>
                </div>
                <div className="p-6 md:p-8 flex flex-col justify-center flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                  <div className="space-y-1 mb-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2"><Clock size={14} /> {event.time}</div>
                    <div className="flex items-center gap-2"><MapPin size={14} /> {event.location}</div>
                  </div>
                  <p className="text-gray-600 mb-6 line-clamp-2">{event.description}</p>
                  <Link to="/events" className="inline-block text-church-600 font-semibold hover:underline font-nav">
                    Event Details &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Hub (New) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
           <div className="mb-10">
              <h2 className="text-church-900 text-3xl font-serif font-bold mb-4">Connect With Us</h2>
              <p className="text-gray-600">Follow @HKMMinistries on social media for daily inspiration and updates.</p>
              <div className="flex justify-center gap-4 mt-4">
                 <a href={SOCIAL_LINKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full font-bold text-sm hover:bg-blue-100 transition-colors"><Facebook size={18} /> Facebook</a>
                 <a href={SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-bold text-sm hover:bg-red-100 transition-colors"><Youtube size={18} /> YouTube</a>
              </div>
           </div>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square relative group overflow-hidden rounded-lg cursor-pointer">
                   <img src={`https://picsum.photos/seed/social${i}/400/400`} alt="Social Post" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Heart className="text-white fill-current" />
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Invitation Section */}
      <section className="py-24 bg-church-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-5xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">New here? We'd love to meet you.</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're new to the area or new to faith, we have a place for you. Plan your visit today and let us know you're coming!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 font-nav">
             <Link to="/contact" className="px-8 py-4 bg-church-500 hover:bg-church-400 text-white rounded-md font-bold text-lg transition-colors">
              Plan Your Visit
            </Link>
             <Link to="/about" className="px-8 py-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-church-900 rounded-md font-bold text-lg transition-colors">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;