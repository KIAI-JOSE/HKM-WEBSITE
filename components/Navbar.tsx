import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart, Video, MapPin, User } from 'lucide-react';
import { LOGO_URL, CHURCH_NAME } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const isActive = (path: string) => location.pathname === path ? 'text-church-600 font-bold' : 'text-gray-600 hover:text-church-600';

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar (Optional, good for Member Login) */}
      <div className="bg-church-900 text-white text-xs py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-end items-center font-nav">
          <Link to="/login" className="flex items-center gap-1 hover:text-church-500 transition-colors">
            <User size={12} /> Member Portal Login
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
              <img className="h-12 w-auto object-contain" src={LOGO_URL} alt={CHURCH_NAME} />
              <span className="hidden md:block font-brand font-bold text-xl text-church-900 tracking-tight">HKM Ministries</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 font-nav">
            <Link to="/" className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/')}`}>Home</Link>
            <Link to="/about" className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/about')}`}>About</Link>
            <Link to="/sermons" className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/sermons')}`}>Sermons</Link>
            <Link to="/events" className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/events')}`}>Events</Link>
            <Link to="/blog" className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/blog')}`}>Blog</Link>
            <Link to="/gallery" className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/gallery')}`}>Gallery</Link>
            <Link to="/contact" className={`px-2 py-2 rounded-md text-sm font-medium transition-colors ${isActive('/contact')}`}>Contact</Link>
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4 font-nav">
             <Link to="/contact" className="hidden xl:flex items-center gap-1 text-gray-600 hover:text-church-600 text-sm font-medium">
                <MapPin size={16} /> Plan a Visit
             </Link>
             <Link to="/sermons" className="hidden xl:flex items-center gap-1 text-gray-600 hover:text-church-600 text-sm font-medium">
                <Video size={16} /> Watch Live
             </Link>
            <Link to="/give" className="flex items-center gap-2 bg-church-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-church-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              <Heart size={16} className="text-red-200 fill-current" />
              Give Now
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-church-500"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 font-nav" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-church-600 hover:bg-gray-50">Home</Link>
            <Link to="/about" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-church-600 hover:bg-gray-50">About Us</Link>
            <Link to="/sermons" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-church-600 hover:bg-gray-50">Sermons</Link>
            <Link to="/events" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-church-600 hover:bg-gray-50">Events</Link>
            <Link to="/blog" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-church-600 hover:bg-gray-50">Blog</Link>
            <Link to="/gallery" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-church-600 hover:bg-gray-50">Gallery</Link>
            <Link to="/contact" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-church-600 hover:bg-gray-50">Contact</Link>
            <Link to="/login" onClick={closeMenu} className="block px-3 py-2 rounded-md text-base font-medium text-church-600 hover:bg-church-50">Member Login</Link>
            
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-1 gap-3">
                <Link to="/give" onClick={closeMenu} className="flex justify-center items-center gap-2 w-full bg-church-600 text-white px-4 py-3 rounded-md text-base font-medium hover:bg-church-700">
                    <Heart size={18} /> Give Now
                </Link>
                 <Link to="/sermons" onClick={closeMenu} className="flex justify-center items-center gap-2 w-full bg-gray-100 text-church-900 px-4 py-3 rounded-md text-base font-medium hover:bg-gray-200">
                    <Video size={18} /> Watch Live
                </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;