import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, MapPin, Phone } from 'lucide-react';
import { CHURCH_ADDRESS, CHURCH_EMAIL, CHURCH_NAME, CHURCH_PHONE, SOCIAL_LINKS, GOOGLE_MAPS_URL } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-church-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand & Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-brand font-bold tracking-wider uppercase">{CHURCH_NAME}</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              A place of worship, community, and spiritual growth. Join us as we walk in faith and serve in love.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href={SOCIAL_LINKS.FACEBOOK} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href={SOCIAL_LINKS.INSTAGRAM} className="text-gray-400 hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href={SOCIAL_LINKS.YOUTUBE} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-3 font-nav">
              <li><Link to="/about" className="hover:text-white transition-colors">Our History</Link></li>
              <li><Link to="/statement-of-faith" className="hover:text-white transition-colors">Statement of Faith</Link></li>
              <li><Link to="/sermons" className="hover:text-white transition-colors">Latest Sermons</Link></li>
              <li><Link to="/events" className="hover:text-white transition-colors">Upcoming Events</Link></li>
              <li><Link to="/give" className="hover:text-white transition-colors">Ways to Give</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Visit Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-church-500 flex-shrink-0" />
                <a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-left">
                  {CHURCH_ADDRESS}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-church-500 flex-shrink-0" />
                <span>{CHURCH_PHONE}</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-church-500 flex-shrink-0" />
                <span>{CHURCH_EMAIL}</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white text-sm font-bold tracking-wider uppercase mb-4">Stay Connected</h3>
            <p className="text-sm text-gray-400 mb-4">Subscribe to our weekly newsletter for updates and devotionals.</p>
            <form className="flex flex-col gap-2" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className="bg-church-800 border-none text-white px-4 py-2 rounded focus:ring-2 focus:ring-church-500 placeholder-gray-500 font-nav"
              />
              <button type="submit" className="bg-church-600 hover:bg-church-500 text-white px-4 py-2 rounded font-medium transition-colors font-nav">
                Subscribe
              </button>
            </form>
          </div>

        </div>
        
        <div className="mt-12 pt-8 border-t border-church-800 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} {CHURCH_NAME}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;