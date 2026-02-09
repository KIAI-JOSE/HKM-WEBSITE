import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Loader2 } from 'lucide-react';
import { Event } from '../types';
import { api } from '../services/api';

const Events: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await api.getEvents();
        setEvents(data);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-church-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Events Calendar</h1>
          <p className="text-xl text-gray-300 max-w-3xl">Stay up to date with what's happening at HKM Ministries. From worship nights to outreach, there's a place for you to connect.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
           <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin text-church-600 mb-3" />
            <p>Loading upcoming events...</p>
          </div>
        ) : (
          <div className="space-y-8 animate-in fade-in duration-500">
            {events.map((event) => (
              <div key={event.id} className="flex flex-col md:flex-row bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                {/* Date Box (Desktop) */}
                <div className="hidden md:flex flex-col items-center justify-center w-32 bg-church-50 border-r border-gray-100 p-4 text-center shrink-0">
                  <span className="text-sm font-bold text-gray-500 uppercase tracking-wider font-nav">Upcoming</span>
                  <Calendar className="w-8 h-8 text-church-600 my-2" />
                </div>

                {/* Image */}
                <div className="md:w-64 h-48 md:h-auto shrink-0 relative">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="md:hidden absolute top-4 left-4 bg-white/95 px-3 py-1 rounded shadow text-sm font-bold font-nav">
                    Upcoming
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{event.title}</h3>
                  
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-church-500" />
                      <span className="font-medium">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-church-500" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-church-500" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-6">{event.description}</p>
                  
                  <div className="mt-auto">
                    <button className="bg-church-600 hover:bg-church-700 text-white px-6 py-2 rounded-md text-sm font-medium transition-colors font-nav">
                      Register / RSVP
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center pt-10">
              <p className="text-gray-500 italic">More events coming soon. Stay tuned!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Events;