import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { CHURCH_ADDRESS, CHURCH_EMAIL, CHURCH_PHONE, GOOGLE_MAPS_URL } from '../constants';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for contacting us! We will get back to you shortly.");
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="bg-church-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">Have a question? Need prayer? We're here for you.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-2 gap-16">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-3xl font-serif font-bold text-church-900 mb-8">Get in Touch</h2>
            <div className="space-y-8 mb-12">
              <div className="flex items-start gap-4">
                <div className="bg-church-100 p-3 rounded-lg text-church-600">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Visit Us</h3>
                  <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-church-600 transition-colors">
                    {CHURCH_ADDRESS}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-church-100 p-3 rounded-lg text-church-600">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Call Us</h3>
                  <p className="text-gray-600">{CHURCH_PHONE}</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-church-100 p-3 rounded-lg text-church-600">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Email Us</h3>
                  <p className="text-gray-600">{CHURCH_EMAIL}</p>
                </div>
              </div>
            </div>

            {/* Service Times Schedule */}
            <div className="bg-church-50 p-6 rounded-xl border border-church-100 mb-8">
               <div className="flex items-center gap-3 mb-4">
                  <Clock className="text-church-600" />
                  <h3 className="text-xl font-bold text-church-900 font-serif">Weekly Schedule</h3>
               </div>
               <div className="space-y-4 text-sm text-gray-700">
                 <div>
                   <h4 className="font-bold text-church-700 mb-2 uppercase text-xs tracking-wider">Sunday Services</h4>
                   <ul className="space-y-2">
                     <li className="flex justify-between border-b border-church-100 pb-1"><span>Intercessory</span> <span className="font-medium">6:30 AM - 8:00 AM</span></li>
                     <li className="flex justify-between border-b border-church-100 pb-1"><span>Youth Service</span> <span className="font-medium">8:00 AM - 9:00 AM</span></li>
                     <li className="flex justify-between border-b border-church-100 pb-1"><span>1st Service</span> <span className="font-medium">9:00 AM - 11:00 AM</span></li>
                     <li className="flex justify-between"><span>2nd Service</span> <span className="font-medium">11:00 AM - 1:00 PM</span></li>
                   </ul>
                 </div>
                 <div>
                   <h4 className="font-bold text-church-700 mb-2 uppercase text-xs tracking-wider pt-2">Weekday Services</h4>
                    <ul className="space-y-2">
                     <li className="flex justify-between border-b border-church-100 pb-1"><span>Wednesday Midweek</span> <span className="font-medium">4:00 PM - 7:00 PM</span></li>
                     <li className="flex justify-between"><span>Friday Home Cells</span> <span className="font-medium">5:00 PM - 6:00 PM</span></li>
                   </ul>
                 </div>
               </div>
            </div>

            {/* Google Map Integration */}
            <div className="w-full h-64 rounded-xl overflow-hidden shadow-md border border-gray-200">
              <iframe 
                src="https://maps.google.com/maps?q=Heavenly+God's+Kingdom+Ministry+Mihango&t=&z=15&ie=UTF8&iwloc=&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Church Location"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100 h-fit">
            <h2 className="text-2xl font-bold text-church-900 mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1 font-nav">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-church-500 focus:border-transparent outline-none transition-all"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 font-nav">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-church-500 focus:border-transparent outline-none transition-all"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1 font-nav">Subject</label>
                <select
                  id="subject"
                  name="subject"
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-church-500 focus:border-transparent outline-none transition-all"
                  value={formData.subject}
                  onChange={handleChange}
                >
                  <option value="">Select a topic</option>
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Prayer Request">Prayer Request</option>
                  <option value="Event Registration">Event Registration</option>
                  <option value="Pastoral Care">Pastoral Care</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1 font-nav">Message / Prayer Request</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:ring-2 focus:ring-church-500 focus:border-transparent outline-none transition-all resize-none"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="w-full bg-church-600 hover:bg-church-700 text-white font-bold py-3 rounded-md transition-colors flex items-center justify-center gap-2 font-nav">
                <Send size={18} /> Send Message
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Contact;